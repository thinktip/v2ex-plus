import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
const read = name => readFile(new URL('../' + name, import.meta.url), 'utf8');
const source = await read('userscript/v2ex-plus.user.js');
const settingsSource = source.slice(source.indexOf('  async function loadSettingsSnapshot('), source.indexOf('  async function readR2UploadToken('));
test('userscript defaults ignore legacy GM credentials and preferences', async () => {
  const context = vm.createContext({ isExtensionRuntime: () => false, GM_getValue: () => { throw Error('unexpected old setting'); } });
  vm.runInContext("let settingsSnapshot = null, settingsLoad = null, settingsRevision = 0;\n" + settingsSource, context);
  for (const value of ['imgur', '', 'standard', '18', '1.6', 'false', '82']) assert.equal(await context.readUploadSetting('key', value), value);
  for (const value of [true, false]) assert.equal(await context.readBooleanSetting('key', value), value);
});
test('native extension still reads configured preferences', async () => {
  const chrome = { runtime: {}, storage: { local: { get: (key, callback) => callback({ show: false, spacing: 'compact' }) } } };
  const context = vm.createContext({ isExtensionRuntime: () => true, chrome });
  vm.runInContext("let settingsSnapshot = null, settingsLoad = null, settingsRevision = 0;\n" + settingsSource, context);
  assert.equal(await context.readUploadSetting('spacing', 'standard'), 'compact');
  assert.equal(await context.readBooleanSetting('show', true), false);
});
test('runtime, CSS and versions agree across all extension outputs', async () => {
  const version = source.match(/^\/\/ @version\s+(\S+)/m)[1];
  const directories = ['chrome', 'safari/web-extension', 'safari/xcode/V2EX Plus/V2EX Plus Extension/Resources'];
  for (const directory of directories) {
    assert.equal(JSON.parse(await read(directory + '/manifest.json')).version, version);
    for (const file of ['lite.js','lite.css','page-bridge.js','preflight.js','popup.js','popup.html','popup.css']) {
      assert.equal(await read(directory + '/' + file), await read('chrome/' + file));
    }
  }
  assert.match(source, /@grant\s+none/);
  assert.ok(source.includes(await read('chrome/page-bridge.js').then(s => s.split('\n').filter(Boolean).map(s=>s.trim()).find(s=>s.includes('v2pWriteEditorBridge')))));
  new vm.Script(source);
});
