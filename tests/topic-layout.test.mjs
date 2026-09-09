import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../userscript/v2ex-plus.user.js", import.meta.url), "utf8");

test("topic content uses the full available card width", () => {
  assert.match(source, /#Main \.topic_content \{\s*max-width: none;/);
});

test("reply content keeps the readable line-length limit", () => {
  assert.match(source, /#Main \.reply_content \{\s*max-width: var\(--v2p-reading-measure\);/);
});
