import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
const source = readFileSync(new URL('../userscript/v2ex-plus.user.js', import.meta.url), 'utf8');
const fn = source.slice(source.indexOf('  function initMobileLayout()'), source.indexOf('  function markPageStructure('));
function fixture(mobile, existingId = '') {
  const classes = new Set();
  const content = { id: existingId, children: ['topic', 'replies'] };
  let icons = 0;
  const attrs = new Map();
  const menu = {
    querySelector: s => s === 'img.menu-guest' ? {} : icons ? {} : null,
    insertAdjacentHTML: () => icons++,
    hasAttribute: k => attrs.has(k), setAttribute: (k, v) => attrs.set(k, v),
  };
  const header = { querySelector: () => menu };
  const context = vm.createContext({
    docEl: { classList: { add: c => classes.add(c) } },
    document: {
      getElementById: id => id === 'site-header' ? mobile ? header : null : content.id === 'Main' ? content : null,
      querySelector: () => content,
    },
  });
  vm.runInContext(fn, context);
  return { run: () => context.initMobileLayout(), content, classes, icons: () => icons };
}
test('mobile initialization restores the shared root without moving children and is idempotent', () => {
  const f = fixture(true); const children = f.content.children;
  assert.equal(f.run(), true); f.run();
  assert.equal(f.content.id, 'Main'); assert.equal(f.content.children, children);
  assert.equal(f.icons(), 1); assert.ok(f.classes.has('v2p-mobile'));
});
test('desktop template is untouched and existing mobile root ids are preserved', () => {
  const desktop = fixture(false); assert.equal(desktop.run(), false);
  assert.equal(desktop.content.id, ''); assert.equal(desktop.classes.size, 0);
  const custom = fixture(true, 'custom'); custom.run(); assert.equal(custom.content.id, 'custom');
});
