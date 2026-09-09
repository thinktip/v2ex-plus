import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../userscript/v2ex-plus.user.js", import.meta.url), "utf8");

function extractFunction(name, nextName) {
  const start = source.indexOf(`  function ${name}(`);
  const end = source.indexOf(`\n  function ${nextName}(`, start);
  assert.notEqual(start, -1, `${name} should exist`);
  assert.notEqual(end, -1, `${name} should have a stable boundary`);
  return source.slice(start, end);
}

test("the balance row hides the original unread-notification link", () => {
  const initBalanceFooter = extractFunction("initBalanceFooter", "initMemberShortcuts");

  assert.match(initBalanceFooter, /if \(link !== balanceLink\)/);
  assert.doesNotMatch(initBalanceFooter, /link\.getAttribute\("href"\) !== "\/notifications"/);
  assert.match(initBalanceFooter, /link\.classList\.add\("v2p-lite-balance-extra"\)/);
  assert.match(source, /#Rightbar \.v2p-lite-balance-extra \{\s*display: none !important;/);
});

test("the bell remains the visible unread-notification entry point", () => {
  const initNotificationIndicator = extractFunction("initNotificationIndicator", "initCheckinIndicator");

  assert.match(initNotificationIndicator, /iconLink\.href = "\/notifications"/);
  assert.match(initNotificationIndicator, /badge\.textContent = unreadCount > 99 \? "99\+" : String\(unreadCount\)/);
});
