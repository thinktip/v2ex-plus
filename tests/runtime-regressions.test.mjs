import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
const source = fs.readFileSync(new URL('../userscript/v2ex-plus.user.js', import.meta.url), 'utf8');
const popup = fs.readFileSync(new URL('../chrome/popup.js', import.meta.url), 'utf8');
function section(text, start, end) {
  const a = text.indexOf(start), b = text.indexOf(end, a);
  assert.ok(a >= 0 && b > a, start);
  return text.slice(a, b);
}
function deferred() { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; }
function previewHarness() {
  const requests = [];
  const context = vm.createContext({
    AbortController, transformEmojiTokens: x => x, FormData: class { append() {} },
    requestWithTimeout: (url, options) => { const request = { ...deferred(), options }; requests.push(request); return request.promise; },
    renderImageLinksInPreview() {}, replaceEmojiImagesWithHD() {}, console,
  });
  vm.runInContext(section(source, '  async function renderReplyPreview(', '  function renderImageLinksInPreview('), context);
  let id = 0;
  const state = { lastText: null, nextRequestId: () => ++id, currentRequestId: () => id };
  const preview = { innerHTML: '', dataset: {} };
  return { requests, state, preview, run: value => context.renderReplyPreview({ value }, preview, state) };
}
test('clearing a preview cancels its request and ignores a late response', async () => {
  const h = previewHarness(); const old = h.run('A');
  await h.run('');
  assert.equal(h.requests[0].options.signal.aborted, true);
  h.requests[0].resolve({ ok: true, text: async () => '<p>A</p>' }); await old;
  assert.match(h.preview.innerHTML, /没有可预览/);
});
test('A -> empty -> A fetches and displays A again', async () => {
  const h = previewHarness(); const first = h.run('A');
  h.requests[0].resolve({ ok: true, text: async () => '<p>A</p>' }); await first;
  await h.run(''); const again = h.run('A');
  assert.equal(h.requests.length, 2);
  h.requests[1].resolve({ ok: true, text: async () => '<p>A</p>' }); await again;
  assert.equal(h.preview.innerHTML, '<p>A</p>');
});
test('newest preview wins when requests complete out of order', async () => {
  const h = previewHarness(); const a = h.run('A'), b = h.run('B');
  h.requests[1].resolve({ ok: true, text: async () => '<p>B</p>' }); await b;
  h.requests[0].resolve({ ok: true, text: async () => '<p>A</p>' }); await a;
  assert.equal(h.preview.innerHTML, '<p>B</p>');
});
test('reply lookup recognizes folded content without taking a nested reply', () => {
  const ctx = vm.createContext({});
  vm.runInContext(section(source, '  function getContentCell(', '  function hideSingleMemberRef('), ctx);
  const content = { classList: { contains: name => name === 'reply_content' } };
  const td = { children: [content] }, table = { tBodies: [{ rows: [{ cells: [{}, {}, td] }] }] };
  assert.equal(ctx.getReplyContentEl(table), content);
  td.children = [{ classList: { contains: name => name === 'v2p-lite-long-reply' }, children: [content] }];
  assert.equal(ctx.getReplyContentEl(table), content);
  td.children = [{ classList: { contains: () => false }, children: [content] }];
  assert.equal(ctx.getReplyContentEl(table), null);
});
test('direct editor and extension bridge both insert raw image URLs', () => {
  const url = 'https://example.test/image.png'; let text = 'pending'; let handler;
  const doc = { getValue: () => text, setValue: value => { text = value; }, lastLine: () => 0, setCursor() {}, getLine: () => text };
  const editor = { getDoc: () => doc, getValue: () => text, setValue: value => { text = value; } };
  const ctx = vm.createContext({});
  vm.runInContext(section(source, '  function replaceTextInEditor(', '  function initTopicSidebarTools('), ctx);
  ctx.replaceTextInEditor(editor, 'pending', url); assert.equal(text, url);
  text = 'pending';
  const window = { editor, location: { origin: 'https://www.v2ex.com' }, addEventListener: (type, fn) => { handler = fn; } };
  vm.runInNewContext(fs.readFileSync(new URL('../chrome/page-bridge.js', import.meta.url), 'utf8'), { window, document: { documentElement: { dataset: {} } } });
  handler({ source: window, origin: window.location.origin, data: { source: 'v2p-content', type: 'v2p:write-editor', action: 'replace', find: 'pending', replace: url } });
  assert.equal(text, url);
});
function saveHarness(allowed) {
  let saved;
  const code = section(popup, 'async function saveSettings(', 'async function restoreDefaultNodeOrder(');
  const context = { console: { error() {} }, SETTINGS: new Proxy({}, { get: (_, name) => name }), selectedProvider: () => 'r2',
    isHttpsUrl: () => true, ensureEndpointPermission: async () => { if (!allowed) throw Error('denied'); },
    document: { querySelector: () => ({ hidden: false }) }, selectedTopicRowSpacing: () => 'standard', normalizeReplyLineHeight: x => x,
    normalizeContentCardRadius: x => x, storageSet: async values => { saved = values; }, showStatus() {} };
  for (const match of code.matchAll(/\b(\w+)\.(?:value|checked|removeAttribute|setAttribute)/g)) context[match[1]] = { value: '18', checked: true, removeAttribute() {}, setAttribute() {} };
  context.r2Endpoint.value = 'https://new.example/upload'; context.r2Token.value = 'TEST_TOKEN'; context.imgurClientId.value = '';
  vm.createContext(context); vm.runInContext(code, context);
  return { run: options => context.saveSettings(options), saved: () => saved };
}
test('denied R2 endpoint never saves a new token or provider, including later autosaves', async () => {
  const h = saveHarness(false);
  for (const requestPermission of [true, false]) {
    assert.equal(await h.run({ requestPermission }), false);
    for (const key of ['r2Endpoint', 'r2Token', 'imageHost']) assert.equal(key in h.saved(), false);
    assert.equal(h.saved().topicRowSpacing, 'standard');
  }
});
test('authorized R2 endpoint and token are committed in the same write', async () => {
  const h = saveHarness(true); assert.equal(await h.run({ requestPermission: true }), true);
  assert.equal(h.saved().r2Endpoint, 'https://new.example/upload');
  assert.equal(h.saved().r2Token, 'TEST_TOKEN'); assert.equal(h.saved().imageHost, 'r2');
});
function settingsHarness(get) {
  const context = vm.createContext({ isExtensionRuntime: () => true, chrome: { runtime: {}, storage: { local: { get } } }, console });
  vm.runInContext('let settingsSnapshot = null, settingsLoad = null, settingsRevision = 0;\n' + section(source, '  async function loadSettingsSnapshot(', '  async function readR2UploadToken('), context);
  return context;
}
test('parallel and subsequent settings reads share one bulk storage request', async () => {
  let reads = 0;
  const ctx = settingsHarness((keys, cb) => { reads++; assert.equal(keys, null); queueMicrotask(() => cb({ floor: false, spacing: 'compact' })); });
  const result = await Promise.all(Array.from({ length: 22 }, () => ctx.readUploadSetting('spacing', 'standard')));
  assert.ok(result.every(x => x === 'compact')); assert.equal(reads, 1);
  assert.equal(await ctx.readBooleanSetting('floor', true), false); assert.equal(reads, 1);
});
test('an invalidated in-flight settings read cannot restore stale values', async () => {
  const callbacks = []; const ctx = settingsHarness((keys, cb) => callbacks.push(cb));
  const old = ctx.readUploadSetting('spacing', 'standard');
  vm.runInContext('settingsRevision++; settingsLoad = null;', ctx);
  const fresh = ctx.readUploadSetting('spacing', 'standard');
  callbacks[1]({ spacing: 'relaxed' }); await fresh;
  callbacks[0]({ spacing: 'compact' });
  assert.equal(await old, 'relaxed');
});
function requestHarness(fetch) {
  const ctx = vm.createContext({ fetch, AbortController, DOMException, setTimeout, clearTimeout });
  vm.runInContext(section(source, '  async function requestWithTimeout(', '  async function getV2exOnce('), ctx);
  return ctx.requestWithTimeout;
}
test('deadline covers a stalled response body and aborts it', async () => {
  let aborted = false;
  const request = requestHarness(async (url, { signal }) => ({ ok: true, status: 200,
    text: () => new Promise((resolve, reject) => signal.addEventListener('abort', () => { aborted = true; reject(signal.reason); })) }));
  await assert.rejects(request('/test', {}, 10), error => error.name === 'TimeoutError'); assert.equal(aborted, true);
});
test('caller cancellation propagates to the request', async () => {
  const request = requestHarness((url, { signal }) => new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason))));
  const controller = new AbortController(); const pending = request('/test', { signal: controller.signal }); controller.abort();
  await assert.rejects(pending, error => error.name === 'AbortError');
});
test('completed response clears its deadline and preserves JSON parsing', async () => {
  let signal;
  const request = requestHarness(async (url, options) => { signal = options.signal; return { ok: true, status: 200, text: async () => '{"success":true}' }; });
  const response = await request('/test', {}, 10); assert.equal((await response.json()).success, true);
  await new Promise(resolve => setTimeout(resolve, 20)); assert.equal(signal.aborted, false);
});

test('Imgur uses the public default, honors custom IDs, and deletes with the upload ID', async () => {
  const requests = [];
  const context = vm.createContext({
    DEFAULT_IMGUR_CLIENT_ID: '58ede46d11fb61e', IMGUR_CLIENT_ID_KEY: 'id',
    FormData: class { append() {} },
    requestWithTimeout: async (url, options) => {
      requests.push({ url, options });
      return { ok: true, json: async () => ({ success: true, data: { link: 'https://i.imgur.com/test.png', deletehash: 'test-delete' } }) };
    },
    readUploadSetting: async () => 'changed-id',
  });
  vm.runInContext(section(source, '  async function uploadImageToImgur(', '  async function deleteUploadedImage('), context);
  vm.runInContext(section(source, '  async function deleteImgurImage(', '  function createImageUploadError('), context);
  for (const settings of [{}, { id: '  ' }, { id: ' custom-id ' }]) await context.uploadImageToImgur({}, settings);
  assert.deepEqual(requests.map(r => r.options.headers.Authorization), ['Client-ID 58ede46d11fb61e', 'Client-ID 58ede46d11fb61e', 'Client-ID custom-id']);
  const result = await context.uploadImageToImgur({}, { id: 'original-id' });
  await context.deleteImgurImage(result);
  assert.equal(requests.at(-1).options.headers.Authorization, 'Client-ID original-id');
  assert.equal(requests.at(-1).options.method, 'DELETE');
});

test('touch navigation drag preserves mouse behavior, previews order and cancels safely', () => {
  const listeners = {}, calls = [], frames = new Map(); let frameId = 0, captured = null;
  const handle = { isConnected: true, addEventListener: (name, fn) => listeners[name] = fn,
    setPointerCapture: id => captured = id, hasPointerCapture: id => captured === id,
    releasePointerCapture: () => captured = null };
  const rows = [0, 1, 2].map(i => ({ getBoundingClientRect: () => ({ top: i * 40, height: 40 }) }));
  const list = { scrollTop: 0, querySelectorAll: () => rows, getBoundingClientRect: () => ({ top: 0, bottom: 120 }) };
  const context = vm.createContext({ requestAnimationFrame: fn => { frames.set(++frameId, fn); return frameId; }, cancelAnimationFrame: id => frames.delete(id) });
  vm.runInContext(section(source, '  function bindTouchNavDrag(', '  function openNavSettings('), context);
  context.bindTouchNavDrag(handle, rows[0], list, { start: () => calls.push('start'), preview: i => calls.push(i), finish: commit => calls.push(commit) });
  const emit = (name, y, extra = {}) => listeners[name]({ pointerId: 1, pointerType: 'touch', isPrimary: true, clientY: y, preventDefault() {}, ...extra });
  emit('pointerdown', 20, { pointerType: 'mouse' }); assert.equal(captured, null);
  emit('pointerdown', 20); emit('pointermove', 23); assert.deepEqual(calls, []);
  emit('pointermove', 110); assert.deepEqual(calls, ['start', 2]);
  frames.values().next().value(); assert.equal(list.scrollTop, 6);
  emit('pointerup', 110); assert.equal(calls.at(-1), true); assert.equal(captured, null);
  emit('pointerdown', 20); emit('pointermove', 60); emit('pointercancel', 60); assert.equal(calls.at(-1), false);
});

test('upload normalization trusts PNG bytes over MIME and extension without changing bytes', async () => {
  const context = vm.createContext({ File, Uint8Array });
  vm.runInContext(section(source, '  async function normalizeUploadImage(', '  async function prepareImageForUpload('), context);
  const data = new Uint8Array([137,80,78,71,13,10,26,10,0,0]);
  for (const [name,type] of [['photo.png',''],['photo.heic','image/heic'],['photo.bin','application/octet-stream']]) {
    const input = new File([data], name, { type });
    const output = await context.normalizeUploadImage(input);
    assert.equal(output.type, 'image/png'); assert.match(output.name, /\.png$/);
    assert.deepEqual(new Uint8Array(await output.arrayBuffer()), data);
  }
  const valid = new File([data], 'photo.png', { type: 'image/png' });
  assert.equal(await context.normalizeUploadImage(valid), valid);
});
test('HEIC conversion runs independently of compression and releases decoded resources', async () => {
  let released = false;
  const context = vm.createContext({ File, Uint8Array,
    decodeImageForCanvas: async () => ({ width: 2, height: 2, source: {}, release() { released = true; } }),
    document: { createElement: () => ({ getContext: () => ({ fillRect() {}, drawImage() {} }) }) },
    canvasToBlob: async () => new Blob(['jpeg'], { type: 'image/jpeg' }),
    createImageUploadError: (message, userMessage) => Object.assign(new Error(message), { userMessage }),
  });
  vm.runInContext(section(source, '  async function normalizeUploadImage(', '  async function prepareImageForUpload('), context);
  const output = await context.normalizeUploadImage(new File(['xxxxftypheic'], 'photo.png', { type: 'image/png' }));
  assert.equal(output.type, 'image/jpeg'); assert.equal(output.name, 'photo.jpg'); assert.equal(released, true);
  context.decodeImageForCanvas = async () => { throw new Error('unsupported'); };
  await assert.rejects(context.normalizeUploadImage(new File(['xxxxftypheic'], 'photo.heic')), error => /无法转换/.test(error.userMessage));
});

test('Imgur compression avoids WebP, preserves alpha, and keeps R2 WebP compression', async () => {
  for (const [host, type, transparent, expected] of [
    ['imgur', 'image/jpeg', false, 'image/jpeg'],
    ['imgur', 'image/png', false, 'image/jpeg'],
    ['imgur', 'image/png', true, 'image/png'],
    ['r2', 'image/png', true, 'image/webp'],
  ]) {
    let encodedType, released = false;
    const context = vm.createContext({
      File, console, COMPRESS_IMAGES_KEY: 'compress', COMPRESSION_QUALITY_KEY: 'quality', IMAGE_HOST_KEY: 'host',
      normalizeUploadImage: async f => f,
      readUploadSetting: async (key, fallback) => ({ compress: 'true', host })[key] ?? fallback,
      canCompressImage: () => true, isAnimatedPng: async () => false,
      decodeImageForCanvas: async () => ({ width: 2, height: 2, source: {}, release() { released = true; } }),
      document: { createElement: () => ({ getContext: () => ({ drawImage() {} }) }) },
      supportsCanvasWebPEncoding: () => true, pngHasTransparency: async () => transparent,
      canvasToBlob: async (_, outputType) => { encodedType = outputType; return new Blob(['tiny'], { type: outputType }); },
    });
    vm.runInContext(section(source, '  async function prepareImageForUpload(', '  async function decodeImageForCanvas('), context);
    const result = await context.prepareImageForUpload(new File(['x'.repeat(100)], 'test.png', { type }));
    assert.equal(encodedType, expected, `${host} ${type} alpha=${transparent}`);
    assert.equal(result.file.type, expected);
    assert.equal(result.compressed, true);
    assert.match(result.file.name, new RegExp('\\.' + ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' })[expected] + '$'));
    assert.equal(released, true);
  }
});
