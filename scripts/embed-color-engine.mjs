// Rebuild the offline LittleCMS payload; no runtime CDN or dynamic JS evaluation.
import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
let js = await readFile(new URL('vendor/lcms-wasm/lcms.min.js', root), 'utf8');
js = js.replace(/export\{[\s\S]*$/, 'return xt;').replaceAll('import.meta.url', '"https://v2ex.invalid/bundled-lcms.js"');
const wasm = (await readFile(new URL('vendor/lcms-wasm/lcms.wasm', root))).toString('base64');
const licenses = await Promise.all(['LICENSE.md', 'LittleCMS-LICENSE.txt'].map(name => readFile(new URL('vendor/lcms-wasm/' + name, root), 'utf8')));
const notice = licenses.join('\n\n').split('\n').map(line => line.trimEnd()).join('\n');
const payload = `  // BEGIN BUNDLED COLOR ENGINE\n  /* lcms-wasm 1.0.5 / LittleCMS\n${notice}\n  */\n  function instantiateColorEngine() {\n    const instantiate = (() => {${js}})();\n    return instantiate({ wasmBinary: Uint8Array.from(atob("${wasm}"), c => c.charCodeAt(0)) });\n  }\n  // END BUNDLED COLOR ENGINE`;
const url = new URL('userscript/v2ex-plus.user.js', root);
let source = await readFile(url, 'utf8');
if (source.includes('  // BEGIN BUNDLED COLOR ENGINE')) source = source.replace(/  \/\/ BEGIN BUNDLED COLOR ENGINE[\s\S]*?  \/\/ END BUNDLED COLOR ENGINE/, () => payload);
else source = source.replace('  async function normalizeUploadImage(', payload + '\n\n  async function normalizeUploadImage(');
await writeFile(url, source);
