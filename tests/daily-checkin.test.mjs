import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../userscript/v2ex-plus.user.js", import.meta.url), "utf8");
const popupHtml = await readFile(new URL("../chrome/popup.html", import.meta.url), "utf8");
const popupJs = await readFile(new URL("../chrome/popup.js", import.meta.url), "utf8");

function extractRunDailyCheckin() {
  const start = source.indexOf("  async function runDailyCheckin(");
  const end = source.indexOf("\n  function initNestedReplies()", start);
  assert.notEqual(start, -1, "runDailyCheckin should exist");
  assert.notEqual(end, -1, "runDailyCheckin should have a stable boundary");
  return source.slice(start, end).trim();
}

function createHarness({ alreadyCheckedIn = false, dailyState = "available", dailyResponseOk = true, balanceWait = null } = {}) {
  const requests = [];
  const marks = [];
  const cachedStates = [];
  const releasedLocks = [];
  const toasts = [];
  const states = {
    available: { signedIn: true, claimed: false, redeemUrl: "/mission/daily/redeem?once=123", days: null },
    availableWithoutSignout: { signedIn: false, claimed: false, redeemUrl: "/mission/daily/redeem?once=123", days: null },
    claimed: { signedIn: true, claimed: true, redeemUrl: null, days: "8" },
  };
  const responses = new Map([
    ["/mission/daily", [dailyState, "claimed"]],
    ["/mission/daily/redeem?once=123", ["redeemed"]],
    ["/balance", ["balance"]],
  ]);

  const deps = {
    getCurrentUserName: () => "alice",
    alreadyCheckedInToday: () => alreadyCheckedIn,
    readCachedCheckinState: () => null,
    isFreshCheckinState: () => false,
    acquireDailyCheckinLock: () => "lock-1",
    releaseDailyCheckinLock: (token) => releasedLocks.push(token),
    updateCheckinIndicator: () => undefined,
    cacheCheckinState: (...args) => cachedStates.push(args),
    markCheckedInToday: (...args) => marks.push(args),
    showLiteToast: (message) => toasts.push(message),
    parseDailyCheckinPage: (html) => states[html],
    requestWithTimeout: async (url) => {
      requests.push(url);
      if (url === "/balance" && balanceWait) return balanceWait;
      if (url === "/mission/daily" && !dailyResponseOk) {
        return { ok: false, status: 503, text: async () => "" };
      }
      const queue = responses.get(url);
      assert.ok(queue?.length, `unexpected request: ${url}`);
      const body = queue.shift();
      return { ok: true, text: async () => body };
    },
    console: { warn: () => undefined },
  };

  const factory = new Function(
    "deps",
    `
      const {
        getCurrentUserName, alreadyCheckedInToday, readCachedCheckinState,
        acquireDailyCheckinLock, releaseDailyCheckinLock,
        updateCheckinIndicator, cacheCheckinState, markCheckedInToday,
        showLiteToast, parseDailyCheckinPage, requestWithTimeout, console
      } = deps;
      let dailyCheckinRunning = false;
      ${extractRunDailyCheckin()}
      return runDailyCheckin;
    `,
  );

  return {
    run: factory(deps),
    requests,
    marks,
    cachedStates,
    releasedLocks,
    toasts,
  };
}

test("daily check-in is an unconditional page-open behavior", () => {
  assert.doesNotMatch(source, /AUTO_DAILY_CHECKIN_KEY/);
  assert.doesNotMatch(popupHtml, /auto-daily-checkin/);
  assert.doesNotMatch(popupJs, /autoDailyCheckin/);
});

test("daily check-in starts independently before page UI initialization", () => {
  assert.match(
    source,
    /onReady\(\(\) => \{\s*scheduleDailyCheckin\(\);\s*initializePage\(\);\s*\}\);/,
  );

  const initializeStart = source.indexOf("  function initializePage()");
  const initializeEnd = source.indexOf("\n  function normalizeMode", initializeStart);
  assert.notEqual(initializeStart, -1);
  assert.notEqual(initializeEnd, -1);
  assert.doesNotMatch(source.slice(initializeStart, initializeEnd), /scheduleDailyCheckin\(\)/);
});

test("first page open claims an available daily reward and verifies it", async () => {
  const harness = createHarness({ dailyState: "available" });

  await harness.run();

  assert.deepEqual(harness.requests, [
    "/mission/daily",
    "/mission/daily/redeem?once=123",
    "/mission/daily",
    "/balance",
  ]);
  assert.deepEqual(harness.marks, [["alice", { days: "8", coins: null }]]);
  assert.deepEqual(harness.cachedStates, []);
  assert.deepEqual(harness.releasedLocks, ["lock-1"]);
});

test("a redeem link is sufficient even when the daily page omits a signout link", async () => {
  const harness = createHarness({ dailyState: "availableWithoutSignout" });

  await harness.run();

  assert.deepEqual(harness.requests, [
    "/mission/daily",
    "/mission/daily/redeem?once=123",
    "/mission/daily",
    "/balance",
  ]);
  assert.deepEqual(harness.marks, [["alice", { days: "8", coins: null }]]);
});

test("a remote already-claimed result exits without redeeming", async () => {
  const harness = createHarness({ dailyState: "claimed" });

  await harness.run();

  assert.deepEqual(harness.requests, ["/mission/daily"]);
  assert.deepEqual(harness.marks, [["alice", { days: "8" }]]);
});

test("a local same-day success exits without a network request", async () => {
  const harness = createHarness({ alreadyCheckedIn: true });

  await harness.run();

  assert.deepEqual(harness.requests, []);
  assert.deepEqual(harness.marks, []);
});

test("an automatic check-in failure is visible instead of silent", async () => {
  const harness = createHarness({ dailyResponseOk: false });

  await harness.run({ notify: true });

  assert.deepEqual(harness.toasts, ["签到失败，请稍后重试"]);
  assert.deepEqual(harness.releasedLocks, ["lock-1"]);
});


test("confirmed daily reward is recorded while optional balance request is still pending", async () => {
  let finishBalance;
  const balanceWait = new Promise(resolve => { finishBalance = resolve; });
  const harness = createHarness({ balanceWait });
  const pending = harness.run();
  for (let i = 0; i < 20 && !harness.requests.includes("/balance"); i++) await Promise.resolve();
  assert.ok(harness.requests.includes("/balance"));
  assert.deepEqual(harness.marks, [["alice", { days: "8", coins: null }]]);
  finishBalance({ ok: false, status: 503, text: async () => "" });
  await pending;
  assert.deepEqual(harness.releasedLocks, ["lock-1"]);
});
