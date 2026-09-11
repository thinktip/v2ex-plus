import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import { deflateSync } from 'node:zlib';
const source = readFileSync(new URL('../userscript/v2ex-plus.user.js', import.meta.url), 'utf8');
const fixture = name => new Uint8Array(readFileSync(new URL('./fixtures/color/' + name, import.meta.url)));
const context = vm.createContext({ Blob, File, Uint8Array, DataView, Map, WebAssembly, TextDecoder, TextEncoder, atob, setTimeout, clearTimeout, console, DecompressionStream, URL, window: {}, document: {},
  createImageUploadError: (message, userMessage) => Object.assign(new Error(message), { userMessage }),
});
vm.runInContext(source.slice(source.indexOf('  // BEGIN BUNDLED COLOR ENGINE'), source.indexOf('  async function normalizeUploadImage(')), context);
const profile = fixture('linear-rgb.icc');

test('offline LittleCMS maps linear mid-grey to sRGB rather than preserving dark raw samples', async () => {
  const cms = await context.instantiateColorEngine();
  const input = cms.cmsOpenProfileFromMem(profile, profile.length), output = cms.cmsCreate_sRGBProfile();
  const transform = cms.cmsCreateTransform(input, 262169, output, 262169, 1, 0);
  try {
    const result = cms.cmsDoTransform(transform, new Uint8Array([128,128,128,0,0,0,255,255,255]), 3);
    assert.ok(result[0] >= 187 && result[0] <= 189);
    assert.deepEqual(Array.from(result.slice(3)), [0,0,0,255,255,255]);
  } finally { cms.cmsDeleteTransform(transform); cms.cmsCloseProfile(input); cms.cmsCloseProfile(output); }
});

test('PNG extraction recovers ICC and removes it from decoder input', async () => {
  const original = new File([fixture('linear.png')], 'linear.png', { type: 'image/png' });
  const result = await context.extractUploadProfile(original);
  assert.deepEqual(Array.from(result.profile), Array.from(profile));
  assert.equal(await context.extractUploadProfile(new File([result.raw], 'raw.png', { type: 'image/png' })), null);
  const raw = new File([result.raw], 'raw.png', { type: 'image/png' });
  assert.equal(await context.convertUploadImageToSRGB(raw), raw);
});

function segment(index, count, bytes) {
  const payload = Buffer.concat([Buffer.from('ICC_PROFILE\0'), Buffer.from([index,count]), Buffer.from(bytes)]);
  const header = Buffer.from([255,226,0,0]);header.writeUInt16BE(payload.length+2,2);
  return Buffer.concat([header,payload]);
}
test('JPEG extraction reassembles out-of-order ICC segments without modifying frame/EXIF data', async () => {
  const original = new File([fixture('linear.jpg')], 'linear.jpg', { type: 'image/jpeg' });
  const parsed = await context.extractUploadProfile(original);
  const raw = new Uint8Array(await parsed.raw.arrayBuffer());
  const segments = [segment(2,2,profile.slice(200)), segment(1,2,profile.slice(0,200))];
  const file = new File([raw.slice(0,2), ...segments, raw.slice(2)], 'split.jpg', { type:'image/jpeg' });
  const result = await context.extractUploadProfile(file);
  assert.deepEqual(Array.from(result.profile), Array.from(profile));
  assert.deepEqual(new Uint8Array(await result.raw.arrayBuffer()),raw);
  const missing = new File([raw.slice(0,2), segments[0], raw.slice(2)], 'broken.jpg', {type:'image/jpeg'});
  await assert.rejects(context.convertUploadImageToSRGB(missing), e => /已停止上传/.test(e.userMessage));
  const duplicate = new File([raw.slice(0,2), segments[0],segments[0],raw.slice(2)], 'duplicate.jpg', {type:'image/jpeg'});
  await assert.rejects(context.extractUploadProfile(duplicate), /sequence/);
});

test('profile inflation is bounded and malformed PNG does not silently upload', async () => {
  await assert.rejects(context.inflateUploadProfile(deflateSync(Buffer.alloc(1024*1024+1))), /too large/);
  const corrupt = fixture('linear.png');new DataView(corrupt.buffer).setUint32(33,0x7fffffff);
  await assert.rejects(context.convertUploadImageToSRGB(new File([corrupt],'bad.png',{type:'image/png'})), e => /已停止上传/.test(e.userMessage));
});

test('conversion retains alpha, frees decoded resources and runs with compression disabled', async () => {
  let released = false, encoded;
  const rgba = new Uint8ClampedArray([128,128,128,255,128,64,32,128,0,0,0,0,255,255,255,255]);
  context.decodeImageForCanvas = async () => ({ width:2,height:2,source:{},release() { released=true; } });
  context.document.createElement = () => ({ getContext: () => ({
    drawImage() {}, getImageData: () => ({ data:rgba }), putImageData(image) { encoded=image.data.slice(); },
  }) });
  context.canvasToBlob = async () => new Blob([encoded],{type:'image/png'});
  context.normalizeUploadImage = async f => f;
  context.COMPRESS_IMAGES_KEY='compress';
  context.readUploadSetting=async (_,fallback) => fallback;
  vm.runInContext(source.slice(source.indexOf('  async function prepareImageForUpload('),source.indexOf('  async function decodeImageForCanvas(')),context);
  const result = await context.prepareImageForUpload(new File([fixture('linear.png')],'linear.png',{type:'image/png'}));
  assert.equal(result.colorConverted,true);
  assert.equal(result.compressed,false);
  assert.equal(result.file.type,'image/png');
  assert.ok(encoded[0] >= 187 && encoded[0] <= 189);
  assert.deepEqual([encoded[3],encoded[7],encoded[11],encoded[15]],[255,128,0,255]);
  assert.equal(released,true);
});
