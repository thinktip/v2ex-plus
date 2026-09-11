# Offline color engine

lcms-wasm 1.0.5 from https://github.com/mattdesl/lcms-wasm (MIT), distributed through the pinned npm archive lcms-wasm-1.0.5.tgz. LittleCMS license is included separately.

`node scripts/embed-color-engine.mjs` embeds the JS factory, WASM bytes and license notices in the single userscript. The adapter removes ESM exports and replaces the unused import.meta URL; wasmBinary is supplied locally, so no script/engine network request is needed. No eval or dynamic JavaScript compilation is used. The engine is instantiated only for images with ICC profiles.

Upstream file SHA-256:

- lcms.min.js: `64a9de84e747063caf5fcf762285f6db04695177ed3e3409c616c7c5ceb47d2e`
- lcms.wasm: `dbcbee3fb3a49459a60bb6b29d6ab25fe7c219b0cc0c2b9579c0cc78f7390ddd`
