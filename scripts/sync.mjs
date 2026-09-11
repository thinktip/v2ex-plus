import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryDirectory = path.resolve(scriptDirectory, "..");
const sourcePath = path.join(repositoryDirectory, "userscript", "v2ex-plus.user.js");
const outputDirectory = path.join(repositoryDirectory, "safari", "web-extension");
const cssPath = path.join(outputDirectory, "lite.css");
const runtimePath = path.join(outputDirectory, "lite.js");
const manifestPath = path.join(outputDirectory, "manifest.json");
const chromeDirectory = path.join(repositoryDirectory, "chrome");
const chromeCssPath = path.join(chromeDirectory, "lite.css");
const chromeRuntimePath = path.join(chromeDirectory, "lite.js");
const chromePreflightPath = path.join(chromeDirectory, "preflight.js");
const chromeManifestPath = path.join(chromeDirectory, "manifest.json");
const safariPreflightPath = path.join(outputDirectory, "preflight.js");
const iconNames = ["icon16.png", "icon32.png", "icon48.png", "icon128.png"];
const safariToolbarIconDirectory = path.join(repositoryDirectory, "safari", "assets");
const bridgeName = "page-bridge.js";
const popupNames = ["popup.html", "popup.css", "popup.js", "logo.svg"];
const resourceNames = [
  "lite.css",
  "lite.js",
  "manifest.json",
  "preflight.js",
  bridgeName,
  ...popupNames,
  ...iconNames,
];
const xcodeResourceDirectory = path.join(
  repositoryDirectory,
  "safari",
  "xcode",
  "V2EX Plus",
  "V2EX Plus Extension",
  "Resources",
);
const xcodeProjectPath = path.join(
  repositoryDirectory,
  "safari",
  "xcode",
  "V2EX Plus",
  "V2EX Plus.xcodeproj",
  "project.pbxproj",
);

const source = await readFile(sourcePath, "utf8");
const version = source.match(/^\/\/ @version\s+(\S+)$/m)?.[1];

if (!version) {
  throw new Error("Unable to read the Lite version from the userscript header.");
}

function readTemplateConstant(name) {
  const marker = `  const ${name} = \``;
  const start = source.indexOf(marker);

  if (start === -1) {
    throw new Error(`Unable to find ${name}.`);
  }

  const contentStart = start + marker.length;
  let cursor = contentStart;

  while (cursor < source.length) {
    if (source[cursor] === "\\") {
      cursor += 2;
      continue;
    }

    if (source[cursor] === "`") {
      const declarationEnd = source.indexOf(";", cursor);
      if (declarationEnd === -1) {
        throw new Error(`Unable to find the end of ${name}.`);
      }

      return {
        css: source.slice(contentStart, cursor),
        start,
        end: declarationEnd + 1,
      };
    }

    cursor += 1;
  }

  throw new Error(`Unterminated template literal for ${name}.`);
}

function removeExactlyOnce(text, value, label) {
  const start = text.indexOf(value);
  if (start === -1 || text.indexOf(value, start + value.length) !== -1) {
    throw new Error(`Expected exactly one ${label}.`);
  }
  return text.slice(0, start) + text.slice(start + value.length);
}

const styles = [readTemplateConstant("PREPAINT_STYLE"), readTemplateConstant("THEME_STYLE")];
let runtime = source;

for (const style of [...styles].sort((left, right) => right.start - left.start)) {
  runtime = runtime.slice(0, style.start) + runtime.slice(style.end);
}

runtime = removeExactlyOnce(
  runtime,
  "  injectStyle(PREPAINT_STYLE_ID, PREPAINT_STYLE);\n",
  "prepaint style injection",
);
runtime = removeExactlyOnce(
  runtime,
  "  injectStyle(STYLE_ID, THEME_STYLE);\n",
  "theme style injection",
);
runtime = runtime.replace(/^\/\/ ==UserScript==[\s\S]*?^\/\/ ==\/UserScript==\s*/m, "");
runtime = `// Generated from userscript/v2ex-plus.user.js ${version}. Do not edit directly.\n${runtime}`;

// --- Pre-JS fallback generation -------------------------------------------
// Safari applies manifest CSS before first paint but gives no such guarantee
// for content-script JS, so every class-gated theme rule can miss the first
// frame. For each rule gated on an explicit theme class we emit a copy that
// matches only while <html> carries NEITHER theme class (the pre-JS window):
//   - inside `@media (prefers-color-scheme: dark)`, so `auto` users get a
//     correct dark first paint with zero JS;
//   - with an extra `:has()` variant keyed off the server-rendered native
//     night toggle, so "forced dark on a light system" users are covered too.
// Once preflight.js/lite.js set a theme class these selectors stop matching.
const DARK_TOKEN = ".v2p-theme-dark-default";
const LIGHT_TOKEN = ".v2p-theme-light-default";
const PRE_JS_GUARD = `:not(${LIGHT_TOKEN}):not(${DARK_TOKEN})`;
const SERVER_NIGHT_PROBE = ':has(#Top img[src*="toggle-light"])';

function collectFallbackRules(cssText, token, extraGuard = "") {
  const stripped = cssText.replace(/\/\*[\s\S]*?\*\//g, "");
  const rules = [];
  let index = 0;

  while (index < stripped.length) {
    const braceStart = stripped.indexOf("{", index);
    if (braceStart === -1) break;

    const selector = stripped.slice(index, braceStart).trim();
    let depth = 1;
    let cursor = braceStart + 1;
    while (cursor < stripped.length && depth > 0) {
      if (stripped[cursor] === "{") depth += 1;
      else if (stripped[cursor] === "}") depth -= 1;
      cursor += 1;
    }
    const body = stripped.slice(braceStart + 1, cursor - 1);

    if (selector.startsWith("@")) {
      if (body.includes(token)) {
        throw new Error(
          `Found ${token} inside an at-rule; the pre-paint fallback generator only handles top-level rules.`,
        );
      }
    } else if (selector.includes(token)) {
      const fallbackSelector = selector
        .split(",")
        .map((part) =>
          part
            .trim()
            .replaceAll(".v2p-lite-prepaint", "")
            .replaceAll(token, `${PRE_JS_GUARD}${extraGuard}`),
        )
        .join(",\n");
      rules.push(`${fallbackSelector} {${body}}`);
    }

    index = cursor;
  }

  return rules;
}

const combinedCss = `${styles[0].css}\n${styles[1].css}`;
const darkFallbackRules = collectFallbackRules(combinedCss, DARK_TOKEN);
const lightFallbackRules = collectFallbackRules(combinedCss, LIGHT_TOKEN);
const serverNightFallbackRules = collectFallbackRules(combinedCss, DARK_TOKEN, SERVER_NIGHT_PROBE);

if (darkFallbackRules.length === 0 || lightFallbackRules.length === 0) {
  throw new Error("Pre-paint fallback generation found no theme-gated rules; check the theme CSS.");
}

const fallbackCss = [
  "/* Pre-JS first-paint fallback (generated). These rules mirror the class-gated",
  "   theme but only match while <html> has neither explicit theme class, i.e.",
  "   before preflight.js/lite.js have run. Safari injects this stylesheet ahead",
  "   of the content scripts, so the first frame follows the system scheme (or",
  "   the server-rendered native night state) instead of flashing light. */",
  "@media (prefers-color-scheme: dark) {",
  darkFallbackRules.join("\n\n"),
  "}",
  "",
  "@media (prefers-color-scheme: light) {",
  lightFallbackRules.join("\n\n"),
  "}",
  "",
  "/* Forced-dark users on a light system: the synced native night page carries",
  "   the toggle-light icon in #Top, which lets pure CSS pre-paint dark. */",
  serverNightFallbackRules.join("\n\n"),
].join("\n");

const css = [
  `/* Generated from userscript/v2ex-plus.user.js ${version}. Do not edit directly. */`,
  styles[0].css.trim(),
  styles[1].css.trim(),
  fallbackCss,
].join("\n\n") + "\n";

function createManifest(description) {
  return {
    manifest_version: 3,
    content_security_policy: { extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';" },
    name: "V2EX Plus",
    version,
    description,
    permissions: ["storage", "activeTab", "scripting"],
    optional_host_permissions: ["https://*/*"],
    host_permissions: [
      "https://v2ex.com/*",
      "https://*.v2ex.com/*",
      "https://upload-cloud.2smile.top/*",
      "https://api.imgur.com/*",
    ],
    action: {
      default_popup: "popup.html",
      default_title: "V2EX Plus 设置",
      default_icon: {
        16: "icon16.png",
        32: "icon32.png",
        48: "icon48.png",
        128: "icon128.png",
      },
    },
    content_scripts: [
      {
        matches: ["https://v2ex.com/*", "https://*.v2ex.com/*"],
        js: [bridgeName],
        run_at: "document_start",
        world: "MAIN",
      },
      {
        matches: ["https://v2ex.com/*", "https://*.v2ex.com/*"],
        css: ["lite.css"],
        js: ["preflight.js", "lite.js"],
        run_at: "document_start",
      },
    ],
    icons: {
      16: "icon16.png",
      32: "icon32.png",
      48: "icon48.png",
      128: "icon128.png",
    },
  };
}

const safariManifest = createManifest("Safari edition of V2EX Plus.");
const chromeManifest = createManifest("Chrome edition of V2EX Plus.");
await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  writeFile(cssPath, css, "utf8"),
  writeFile(runtimePath, runtime, "utf8"),
  writeFile(manifestPath, `${JSON.stringify(safariManifest, null, 2)}\n`, "utf8"),
  writeFile(chromeCssPath, css, "utf8"),
  writeFile(chromeRuntimePath, runtime, "utf8"),
  writeFile(chromeManifestPath, `${JSON.stringify(chromeManifest, null, 2)}\n`, "utf8"),
  copyFile(chromePreflightPath, safariPreflightPath),
  copyFile(path.join(chromeDirectory, bridgeName), path.join(outputDirectory, bridgeName)),
  ...popupNames.map((popupName) =>
    copyFile(path.join(chromeDirectory, popupName), path.join(outputDirectory, popupName)),
  ),
  ...iconNames.map((iconName) =>
    copyFile(
      path.join(safariToolbarIconDirectory, `toolbar-${iconName}`),
      path.join(outputDirectory, iconName),
    ),
  ),
]);

let updatedXcodeResources = false;
try {
  await access(xcodeResourceDirectory);
  const xcodeProject = await readFile(xcodeProjectPath, "utf8");
  const marketingVersionPattern = /MARKETING_VERSION = [^;]+;/g;
  const marketingVersions = xcodeProject.match(marketingVersionPattern) || [];
  if (marketingVersions.length === 0) {
    throw new Error("Unable to find MARKETING_VERSION in the Xcode project.");
  }
  const updatedXcodeProject = xcodeProject.replace(
    marketingVersionPattern,
    `MARKETING_VERSION = ${version};`,
  );

  await Promise.all(
    [
      ...resourceNames.map((resourceName) =>
        copyFile(
          path.join(outputDirectory, resourceName),
          path.join(xcodeResourceDirectory, resourceName),
        ),
      ),
      writeFile(xcodeProjectPath, updatedXcodeProject, "utf8"),
    ],
  );
  updatedXcodeResources = true;
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

console.log(`Generated V2EX Plus ${version}:`);
console.log(`- ${path.relative(repositoryDirectory, chromeManifestPath)} (Chrome manifest)`);
console.log(`- ${path.relative(repositoryDirectory, chromeCssPath)} (Chrome CSS)`);
console.log(`- ${path.relative(repositoryDirectory, chromeRuntimePath)} (Chrome runtime)`);
console.log(`- ${path.relative(repositoryDirectory, chromePreflightPath)} (Chrome preflight)`);
console.log(`- ${path.relative(repositoryDirectory, cssPath)}`);
console.log(`- ${path.relative(repositoryDirectory, runtimePath)}`);
console.log(`- ${path.relative(repositoryDirectory, manifestPath)}`);
if (updatedXcodeResources) {
  console.log(`- ${path.relative(repositoryDirectory, xcodeResourceDirectory)} (Xcode resources)`);
}
