// ==UserScript==
// @name         V2EX Plus
// @namespace    https://v2ex.com/
// @version      1.13.53
// @description  Lightweight V2EX layout, theme, navigation, reading, reply, and image tools.
// @match        https://v2ex.com/*
// @match        https://*.v2ex.com/*
// @run-at       document-start
// @icon         https://v2ex.com/static/apple-touch-icon-180.png
// @downloadURL  https://raw.githubusercontent.com/thinktip/v2ex-plus/main/userscript/v2ex-plus.user.js
// @updateURL    https://raw.githubusercontent.com/thinktip/v2ex-plus/main/userscript/v2ex-plus.user.js
// @grant        none
// ==/UserScript==

(function boot() {
  "use strict";

  const STORAGE_KEY = "v2p_lite_theme_mode";
  const LEGACY_STORAGE_KEY = "user_preferred_theme_mode";
  const STYLE_ID = "v2p-lite-theme-style";
  const PREPAINT_STYLE_ID = "v2p-lite-prepaint-style";
  const RUNTIME_MARKER = "v2pLiteRuntime";
  const THEME_META_ID = "v2p-lite-theme-color";
  const TOGGLE_ID = "v2p-lite-theme-toggle";
  const NATIVE_TOGGLE_SELECTOR = 'a[href*="/settings/night/toggle"]';
  const STRUCTURE_MARKER_SELECTOR = [
    "#Singleton",
    "#site-header",
    "#Wrapper > .content",
    '#Main form[action="/write"]',
    "#Main #syntax-selector",
    "#Main #reply-box > .cell form",
    "#Main #notifications .payload .embedded_video_wrapper",
    '.box a[href^="/advertise"]',
  ].join(",");
  const NAV_STORAGE_KEY = "v2p_nav_config";
  const LAST_TAB_STORAGE_KEY = "v2p_last_tab_id";
  const MODES = ["light", "dark", "auto"];
  const THEME_META_COLORS = {
    light: "#f2f3f5",
    dark: "#1c2128",
  };
  const LABELS = {
    light: "浅色",
    dark: "深色",
    auto: "自动",
  };
  const ICONS = {
    light:
      '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>',
    dark:
      '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>',
    auto:
      '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>',
  };
  const IMAGE_HOST_KEY = "v2p_image_host";
  const R2_UPLOAD_ENDPOINT_KEY = "v2p_r2_upload_endpoint";
  const DEFAULT_R2_UPLOAD_ENDPOINT = "https://upload-cloud.2smile.top/upload";
  const R2_UPLOAD_TOKEN_KEY = "v2p_r2_upload_token";
  const DEFAULT_IMGUR_CLIENT_ID = "58ede46d11fb61e";
  const IMGUR_CLIENT_ID_KEY = "v2p_imgur_client_id";
  const DELETE_REMOTE_IMAGE_KEY = "v2p_delete_remote_image";
  const COMPRESS_IMAGES_KEY = "v2p_compress_images";
  const COMPRESSION_QUALITY_KEY = "v2p_compression_quality";
  const AUTO_FOLD_REPLIES_KEY = "v2p_auto_fold_replies";
  const REPLY_PREVIEW_KEY = "v2p_reply_preview";
  const AUTO_JUMP_REPLIES_KEY = "v2p_auto_jump_replies";
  const TOPIC_ROW_SPACING_KEY = "v2p_topic_row_spacing";
  const REPLY_LINE_HEIGHT_KEY = "v2p_reply_line_height";
  const CONTENT_CARD_RADIUS_KEY = "v2p_content_card_radius";
  const SHOW_REPLY_FLOOR_KEY = "v2p_show_reply_floor";
  const SHOW_UPLOAD_PREVIEW_KEY = "v2p_show_upload_preview";
  const NESTED_REPLIES_KEY = "v2p_nested_replies";
  const EMOJI_PICKER_KEY = "v2p_emoji_picker";
  const FIXED_SIDEBAR_TOOLS_KEY = "v2p_fixed_sidebar_tools";
  const EXPAND_REPLY_TOOLBAR_KEY = "v2p_expand_reply_toolbar";
  const NODE_ICONS_KEY = "v2p_node_icons";
  const SHOW_ADS_KEY = "v2p_show_ads";
  const DISPLAY_SETTINGS_UPDATED = "v2p-display-settings-updated";
  const PAGINATION_JUMP_MARKER_KEY = "v2p_pending_reply_jump";
  const CHECKIN_DATE_KEY = "v2p_checkin_date";
  const CHECKIN_USER_KEY = "v2p_checkin_user";
  const CHECKIN_LOCK_KEY = "v2p_checkin_lock";
  const CHECKIN_STATE_KEY = "v2p_checkin_state";
  const LONG_REPLY_COLLAPSED_HEIGHT = 250;
  const LONG_REPLY_THRESHOLD = 550;
  const UPLOAD_TIP = "选择、粘贴、拖放上传图片。";
  const EMOJI_LINKS = Object.fromEntries(
    [
      ["[脱单doge]", "L62ZP7V", "3mPhudo"],
      ["[doge]", "agAJ0Rd", "HZL0hOa"],
      ["[辣眼睛]", "n119Wvk", "A5WXoZJ"],
      ["[疑惑]", "U3hKhrT", "3gCygBS"],
      ["[捂脸]", "14cwgsI", "fLp3t8s"],
      ["[哦呼]", "km62MY2", "CXXgF4E"],
      ["[傲娇]", "TkdeN49", "m7IlCrD"],
      ["[思考]", "MAyk5GN", "eRJTCx7"],
      ["[吃瓜]", "Ug1iMq4", "Gy3nwkC"],
      ["[无语]", "e1q9ScT", "wMfcBqD"],
      ["[大哭]", "YGIx7lh", "SNHJxtv"],
      ["[酸了]", "5FDsp6L", "wnQBodT"],
      ["[打call]", "pmNOo2w", "4GfTlV0"],
      ["[歪嘴]", "XzEYBoY", "84ycU43"],
      ["[星星眼]", "2spsghH", "oEIJRru"],
      ["[OK]", "6DMydmQ", "PE2dyjY"],
      ["[跪了]", "TYtySHv", "0pjsMf0"],
      ["[响指]", "Ac88cMm", "nkoevMu"],
      ["[调皮]", "O6ZZSLk", "ggHTLzH"],
      ["[笑哭]", "NIvxivj", "h8edr5G"],
      ["[嗑瓜子]", "rjR4rdr", "GMzq0tq"],
      ["[喜极而泣]", "N9E3iZ2", "L1N27tb"],
      ["[惊讶]", "aptfuiN", "cuzxGOI"],
      ["[给心心]", "4aXVwxJ", "q663Mor"],
      ["[呆]", "c1Q76Cd", "xMXlmxm"],
      ["[哭惹R]", "HgxsUD2", "0aOdQJd"],
      ["[哇R]", "OZySWIG", "ngoi2I6"],
      ["[汗颜R]", "jrVZoLi", "O8alqc1"],
      ["[害羞R]", "OVQjxIr", "1PeoVR5"],
      ["[萌萌哒R]", "Ue1kikn", "vOHzwus"],
      ["[偷笑R]", "aF7QiE5", "WneGpK9"],
      ["[买爆R]", "2JhZFtb", "za9t585"],
      ["[色色R]", "ZA1jRv1", "mEGRKJy"],
      ["[抠鼻R]", "pYtTFnj", "ErnQrMJ"],
      ["[黑薯问号R]", "aCjmFLD", "i4Wgtyv"],
      ["[扶墙R]", "RV7y6tR", "PjhjZsJ"],
      ["[鄙视R]", "LaO5dh3", "StrGaFx"],
      ["[蹲R]", "t876WSv", "jdTq0YI"],
      ["[庆祝R]", "wQw2kD0", "lx6jrkm"],
      ["[六R]", "JqoC4L5", "cUVWKc2"],
      ["[可R]", "I70yy88", "nRgXwUT"],
      ["[加一R]", "hpVvbVh", "abBCCK9"],
    ].map(([token, ld, hd]) => [
      token,
      { ld: `https://i.imgur.com/${ld}.png`, hd: `https://i.imgur.com/${hd}.png` },
    ]),
  );
  const EMOJI_GROUPS = [
    {
      title: "流行",
      list: [
        "[脱单doge]", "[doge]", "[打call]", "[星星眼]", "[吃瓜]", "[OK]", "[哦呼]",
        "[思考]", "[疑惑]", "[辣眼睛]", "[傲娇]", "[捂脸]", "[无语]", "[大哭]",
        "[酸了]", "[歪嘴]", "[调皮]", "[笑哭]", "[嗑瓜子]", "[喜极而泣]", "[惊讶]",
        "[给心心]", "[呆]", "[跪了]", "[响指]", "[哇R]", "[萌萌哒R]", "[害羞R]",
        "[偷笑R]", "[哭惹R]", "[汗颜R]", "[色色R]", "[抠鼻R]", "[鄙视R]", "[买爆R]",
        "[黑薯问号R]", "[扶墙R]", "[蹲R]", "[可R]", "[六R]", "[加一R]", "[庆祝R]",
      ],
    },
    {
      title: "小黄脸",
      list: [
        "😀", "😁", "😂", "🤣", "😅", "😊", "😋", "😘", "🥰", "😗", "🤩", "🤔", "🤨",
        "😐", "😑", "🙄", "😏", "😪", "😫", "🥱", "😜", "😒", "😔", "😨", "😰", "😱",
        "🥵", "😡", "🥳", "🥺", "🤭", "🧐", "😎", "🤓", "😭", "🤑", "🤮",
      ],
    },
    {
      title: "手势",
      list: ["🙋", "🙎", "🙅", "🙇", "🤷", "🤏", "👉", "✌️", "🤘", "🤙", "👌", "🤌", "👍", "👎", "👋", "🤝", "🙏", "👏"],
    },
    { title: "庆祝", list: ["✨", "🎉", "🎊"] },
    { title: "其他", list: ["👻", "🤡", "🐔", "👀", "💩", "🐴", "🦄", "🐧", "🐶", "🐒", "🙈", "🙉", "🙊", "🐵"] },
  ];
  const DEFAULT_NAV = [
    { name: "技术", href: "/?tab=tech", visible: true },
    { name: "创意", href: "/?tab=creative", visible: true },
    { name: "好玩", href: "/?tab=play", visible: true },
    { name: "Apple", href: "/?tab=apple", visible: true },
    { name: "酷工作", href: "/?tab=jobs", visible: true },
    { name: "交易", href: "/?tab=deals", visible: true },
    { name: "城市", href: "/?tab=city", visible: true },
    { name: "问与答", href: "/?tab=qna", visible: true },
    { name: "最热", href: "/?tab=hot", visible: true },
    { name: "全部", href: "/?tab=all", visible: true },
    { name: "R2", href: "/?tab=r2", visible: true },
    { name: "VXNA", href: "/xna", visible: true },
    { name: "节点", href: "/?tab=nodes", visible: true },
    { name: "Planet", href: "/planet", visible: true },
  ];
  const TAB_ICONS = {
    技术: '<polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />',
    创意: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" />',
    好玩: '<line x1="6" x2="10" y1="12" y2="12" /><line x1="8" x2="8" y1="10" y2="14" /><line x1="15" x2="15.01" y1="13" y2="13" /><line x1="18" x2="18.01" y1="11" y2="11" /><rect width="20" height="12" x="2" y="6" rx="2" />',
    Apple:
      '<svg width="14" height="14" viewBox="-1.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-102.000000, -7439.000000)" fill="currentColor"><g transform="translate(56.000000, 160.000000)"><path d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485"></path></g></g></g></svg>',
    酷工作: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" />',
    交易: '<path d="m21 16-2 6H5l-2-6" /><path d="M3 6v10c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6" /><path d="M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />',
    城市: '<rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />',
    问与答: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />',
    最热: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.243-2.143.5-3.5a6 6 0 0 1 1.5-2.5c-.002 1.25.502 2.5 1.5 3.5.5.5 1 1.5 1 3a2 2 0 0 1-2 2z" />',
    全部: '<rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />',
    R2: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" x2="12" y1="22.08" y2="12" />',
    VXNA: '<path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" />',
    节点: '<line x1="4" x2="20" y1="9" y2="9" /><line x1="4" x2="20" y1="15" y2="15" /><line x1="10" x2="8" y1="3" y2="21" /><line x1="16" x2="14" y1="3" y2="21" />',
    关注: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />',
    Planet: '<circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><line x1="2" x2="22" y1="12" y2="12"/>',
  };
  const PREPAINT_STYLE = `
html.v2p-lite-prepaint,
html.v2p-lite-prepaint body {
  min-height: 100vh !important;
}
html.v2p-lite-prepaint.v2p-theme-light-default,
html.v2p-lite-prepaint.v2p-theme-light-default body,
html.v2p-lite-prepaint.v2p-theme-light-default #Top,
html.v2p-lite-prepaint.v2p-theme-light-default #Wrapper {
  background-color: #f2f3f5 !important;
  background-image: none !important;
  color-scheme: light !important;
}
html.v2p-lite-prepaint.v2p-theme-dark-default,
html.v2p-lite-prepaint.v2p-theme-dark-default body,
html.v2p-lite-prepaint.v2p-theme-dark-default #Top,
html.v2p-lite-prepaint.v2p-theme-dark-default #Wrapper {
  background-color: #1c2128 !important;
  background-image: none !important;
  color-scheme: dark !important;
}
html.v2p-lite-prepaint #Logo,
html.v2p-lite-prepaint #LogoMobile {
  transition: none !important;
}
`;
  const docEl = document.documentElement;
  if (!docEl) {
    // Injected before <html> exists; retry briefly instead of giving up.
    if ((boot.retries = (boot.retries || 0) + 1) <= 50) setTimeout(boot, 10);
    return;
  }
  if (docEl.dataset[RUNTIME_MARKER] === "1") return;
  docEl.dataset[RUNTIME_MARKER] = "1";

  // Userscript runs in the page world (@grant none); extensions load their MAIN bridge separately.
  if (!isExtensionRuntime()) {
    (function () {
      "use strict";

      document.documentElement.dataset.v2pWriteEditorBridge = "1";

      function getWriteEditor() {
        try {
          if (typeof editor !== "undefined") {
            return editor;
          }
        } catch {}
        return window.editor;
      }

      window.addEventListener("message", (event) => {
        if (event.source !== window || event.origin !== window.location.origin) {
          return;
        }

        const data = event.data;
        if (data?.source !== "v2p-content" || data.type !== "v2p:write-editor") {
          return;
        }

        const writeEditor = getWriteEditor();
        if (!writeEditor?.getDoc || !writeEditor?.getValue || !writeEditor?.setValue) {
          return;
        }

        if (data.action === "insert" && typeof data.text === "string") {
          writeEditor.getDoc().replaceRange(data.text, writeEditor.getCursor());
          return;
        }

        if (
          data.action === "replace" &&
          typeof data.find === "string" &&
          typeof data.replace === "string"
        ) {
          writeEditor.setValue(
            writeEditor.getValue().replace(data.find, data.replace),
          );
          const doc = writeEditor.getDoc();
          const lastLine = doc.lastLine();
          doc.setCursor({ line: lastLine, ch: doc.getLine(lastLine).length });
        }
      });
    })();
  }

  let currentMode = readMode();
  let effectiveMode = resolveMode(currentMode);

  applyDocumentPrepaint(effectiveMode);
  injectStyle(PREPAINT_STYLE_ID, PREPAINT_STYLE);

  const THEME_STYLE = `
:root {
--zidx-serach: 100;
    --zidx-expand-btn: 20;
    --zidx-tabs: 10;
    --zidx-tools-card: 10;
    --zidx-reply-box: 99;
    --v2p-tp-nested-pd: 10px 5px 2px 10px;
    --v2p-underline-offset: 0.5ex;
    --v2p-layout-column-gap: 25px;
    --v2p-layout-row-gap: 20px;
    --v2p-nav-height: 55px;
    --v2p-box-radius: 18px;
    --v2p-topic-row-padding: 12px;
    --v2p-reply-line-height: 1.6;
    --v2p-reading-line-height: 1.68;
    --v2p-reading-measure: 75ch;
    --v2p-focus-ring: #059669;
}

html.v2p-theme-dark-default body #search-container {
background-color: #2d333b !important;
    border-color: #444c56 !important;
    transition: background-color 0.1s ease;
}

html.v2p-theme-dark-default body #search-container #search-result {
background-color: #22272e !important;
    border-color: #444c56 !important;
}

:root body {
--v2p-color-main-50: #f7f9fb;
    --v2p-color-main-100: #e6e6e6;
    --v2p-color-main-200: #ececec;
    --v2p-color-main-300: #cbd5e1;
    --v2p-color-main-350: #94a3b8cc;
    --v2p-color-main-400: #94a3b8;
    --v2p-color-main-500: #64748b;
    --v2p-color-main-600: #475569;
    --v2p-color-main-700: #334155;
    --v2p-color-main-800: #1e293b;
    --v2p-color-accent-50: #ecfdf5;
    --v2p-color-accent-100: #d1fae5;
    --v2p-color-accent-200: #a7f3d0;
    --v2p-color-accent-300: #6ee7b7;
    --v2p-color-accent-400: #34d399;
    --v2p-color-accent-500: #10b981;
    --v2p-color-accent-600: #059669;
    --v2p-color-accent-700: #047857;
    --v2p-color-orange-50: #fff7ed;
    --v2p-color-orange-100: #ffedd5;
    --v2p-color-orange-400: #fb923c;
    --v2p-color-background: #f2f3f5;
    --v2p-color-foreground: var(--v2p-color-main-800);
    --v2p-color-selection-foreground: var(--v2p-color-main-100);
    --v2p-color-selection-background: var(--v2p-color-main-700);
    --v2p-color-selection-background-img: var(--v2p-color-main-500);
    --v2p-color-font-secondary: var(--v2p-color-main-600);
    --v2p-color-font-tertiary: var(--v2p-color-main-500);
    --v2p-color-font-quaternary: var(--v2p-color-main-400);
    --v2p-color-button-background: var(--v2p-color-main-100);
    --v2p-color-button-foreground: var(--v2p-color-main-500);
    --v2p-color-button-background-hover: var(--v2p-color-main-200);
    --v2p-color-button-foreground-hover: var(--v2p-color-main-600);
    --v2p-color-bg-content: #fff;
    --v2p-color-bg-content-rgb: 255, 255, 255;
    --v2p-color-bg-footer: var(--v2p-color-bg-content);
    --v2p-color-bg-hover-btn: rgb(226 232 240 / 70%);
    --v2p-color-bg-subtle: #f7f7f7;
    --v2p-color-bg-input: var(--v2p-color-main-50);
    --v2p-color-bg-search: var(--v2p-color-main-100);
    --v2p-color-bg-search-active: var(--v2p-color-main-200);
    --v2p-color-bg-widget: rgb(255 255 255 / 70%);
    --v2p-color-bg-reply: var(--v2p-color-main-100);
    --v2p-color-bg-tooltip: var(--v2p-color-bg-content);
    --v2p-color-bg-tabs: var(--v2p-color-main-100);
    --v2p-color-bg-avatar: var(--v2p-color-main-300);
    --v2p-color-bg-block: var(--v2p-color-main-100);
    --v2p-color-bg-block-darker: var(--v2p-color-main-300);
    --v2p-color-bg-link: var(--v2p-color-main-100);
    --v2p-color-bg-link-hover: var(--v2p-color-main-200);
    --v2p-color-tabs: var(--v2p-color-foreground);
    --v2p-color-heart: #ef4444;
    --v2p-color-heart-fill: #fee2e2;
    --v2p-color-mask: rgb(0 0 0 / 25%);
    --v2p-color-divider: var(--v2p-color-main-200);
    --v2p-color-border: var(--v2p-color-main-200);
    --v2p-color-input-border: var(--v2p-color-main-300);
    --v2p-color-border-darker: var(--v2p-color-main-300);
    --v2p-color-link-visited: var(--v2p-color-main-400);
    --v2p-color-error: #ef4444;
    --v2p-color-bg-error: #fee2e2;
    --v2p-color-cell-num: var(--v2p-color-main-350);
    --v2p-box-shadow: 0 3px 5px 0 rgb(0 0 0 / 4%);
    --v2p-widget-shadow: 0 9px 24px -3px rgb(0 0 0 / 6%),
        0 4px 8px -1px rgb(0 0 0 /12%);
        0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%);
    --color-fade: var(--v2p-color-font-secondary);
    --color-gray: var(--v2p-color-font-secondary);
    --link-color: var(--v2p-color-foreground);
    --link-darker-color: var(--v2p-color-main-600);
    --link-hover-color: var(--v2p-color-foreground);
    --link-caution-color: var(--v2p-color-orange-400);
    --box-border-color: var(--v2p-color-border);
    --box-foreground-color: var(--v2p-color-foreground);
    --box-background-color: var(--v2p-color-bg-content);
    --box-background-alt-color: var(--v2p-color-main-100);
    --box-background-hover-color: var(--v2p-color-main-200);
    --box-border-focus-color: var(--v2p-color-main-200);
    --box-border-radius: var(--v2p-box-radius);
    --button-background-color: var(--v2p-color-button-background);
    --button-foreground-color: var(--v2p-color-button-foreground);
    --button-hover-color: var(--v2p-color-button-background-hover);
    --button-background-hover-color: var(--v2p-color-button-background-hover);
    --button-foreground-hover-color: var(--v2p-color-button-foreground-hover);
    --button-border-color: var(--v2p-color-main-300);
    --button-border-hover-color: var(--v2p-color-main-400);

    font-family: system-ui, sans-serif;
    color: var(--v2p-color-foreground);
    background-color: var(--v2p-color-background);
}

html.v2p-theme-light-default body {
--v2p-color-main-50: #f7f9fb;
    --v2p-color-main-100: #f2f2f2;
    --v2p-color-main-200: #ececec;
    --v2p-color-main-300: #cbd5e1;
    --v2p-color-main-350: #94a3b8cc;
    --v2p-color-main-400: #94a3b8;
    --v2p-color-main-500: #64748b;
    --v2p-color-main-600: #475569;
    --v2p-color-main-700: #334155;
    --v2p-color-main-800: #1e293b;
    --v2p-color-accent-50: #ecfdf5;
    --v2p-color-accent-100: #d1fae5;
    --v2p-color-accent-200: #a7f3d0;
    --v2p-color-accent-300: #6ee7b7;
    --v2p-color-accent-400: #34d399;
    --v2p-color-accent-500: #10b981;
    --v2p-color-accent-600: #059669;
    --v2p-color-accent-700: #047857;
    --v2p-color-orange-50: #fff7ed;
    --v2p-color-orange-100: #ffedd5;
    --v2p-color-orange-400: #fb923c;
    --v2p-color-background: #f2f3f5;
    --v2p-color-foreground: var(--v2p-color-main-700);
    --v2p-color-selection-foreground: var(--v2p-color-main-100);
    --v2p-color-selection-background: var(--v2p-color-main-700);
    --v2p-color-selection-background-img: var(--v2p-color-main-500);
    --v2p-color-font-secondary: var(--v2p-color-main-600);
    --v2p-color-font-tertiary: var(--v2p-color-main-500);
    --v2p-color-font-quaternary: var(--v2p-color-main-400);
    --v2p-color-button-background: var(--v2p-color-main-100);
    --v2p-color-button-foreground: var(--v2p-color-main-500);
    --v2p-color-button-background-hover: var(--v2p-color-main-200);
    --v2p-color-button-foreground-hover: var(--v2p-color-main-600);
    --v2p-color-bg-content: #fff;
    --v2p-color-bg-content-rgb: 255, 255, 255;
    --v2p-color-bg-footer: var(--v2p-color-bg-content);
    --v2p-color-bg-hover-btn: rgb(226 232 240 / 70%);
    --v2p-color-bg-subtle: #f7f7f7;
    --v2p-color-bg-input: var(--v2p-color-main-50);
    --v2p-color-bg-search: var(--v2p-color-main-50);
    --v2p-color-bg-search-active: var(--v2p-color-main-200);
    --v2p-color-bg-widget: rgb(255 255 255 / 70%);
    --v2p-color-bg-reply: var(--v2p-color-main-50);
    --v2p-color-bg-tooltip: var(--v2p-color-bg-content);
    --v2p-color-bg-tabs: var(--v2p-color-main-100);
    --v2p-color-bg-avatar: var(--v2p-color-main-300);
    --v2p-color-bg-block: var(--v2p-color-main-100);
    --v2p-color-bg-block-darker: var(--v2p-color-main-300);
    --v2p-color-bg-link: var(--v2p-color-main-100);
    --v2p-color-bg-link-hover: var(--v2p-color-main-200);
    --v2p-color-tabs: var(--v2p-color-foreground);
    --v2p-color-heart: #ef4444;
    --v2p-color-heart-fill: #fee2e2;
    --v2p-color-mask: rgb(0 0 0 / 25%);
    --v2p-color-divider: var(--v2p-color-main-200);
    --v2p-color-border: var(--v2p-color-main-200);
    --v2p-color-input-border: var(--v2p-color-main-300);
    --v2p-color-border-darker: var(--v2p-color-main-300);
    --v2p-color-link-visited: var(--v2p-color-main-400);
    --v2p-color-error: #ef4444;
    --v2p-color-bg-error: #fee2e2;
    --v2p-color-cell-num: var(--v2p-color-main-350);
    --v2p-box-shadow: 0 3px 5px 0 rgb(0 0 0 / 4%);
    --v2p-widget-shadow: 0 9px 24px -3px rgb(0 0 0 / 6%),
        0 4px 8px -1px rgb(0 0 0 /12%);
        0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%);
    --color-fade: var(--v2p-color-font-secondary);
    --color-gray: var(--v2p-color-font-secondary);
    --link-color: var(--v2p-color-foreground);
    --link-darker-color: var(--v2p-color-main-600);
    --link-visited-color:var(--v2p-color-foreground);
    --link-hover-color: var(--v2p-color-foreground);
    --link-caution-color: var(--v2p-color-orange-400);
    --box-border-color: var(--v2p-color-border);
    --box-foreground-color: var(--v2p-color-foreground);
    --box-background-color: var(--v2p-color-bg-content);
    --box-background-alt-color: var(--v2p-color-main-100);
    --box-background-hover-color: var(--v2p-color-main-200);
    --box-border-focus-color: var(--v2p-color-main-200);
    --box-border-radius: var(--v2p-box-radius);
    --button-background-color: var(--v2p-color-button-background);
    --button-foreground-color: var(--v2p-color-button-foreground);
    --button-hover-color: var(--v2p-color-button-background-hover);
    --button-background-hover-color: var(--v2p-color-button-background-hover);
    --button-foreground-hover-color: var(--v2p-color-button-foreground-hover);
    --button-border-color: var(--v2p-color-main-300);
    --button-border-hover-color: var(--v2p-color-main-400);
}

:root body #Logo {
background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0idjJleF9sb2dvIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQxNSAxMTciPgogIDwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiAyLjEuMCBCdWlsZCAxNDIpICAtLT4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLnN0MCB7CiAgICAgICAgaXNvbGF0aW9uOiBpc29sYXRlOwogICAgICB9CgogICAgICAuc3QxIHsKICAgICAgICBmaWxsOiAjM2UzYTM5OwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8ZyBjbGFzcz0ic3QwIj4KICAgIDxnIGNsYXNzPSJzdDAiPgogICAgICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTc1LjIsMjkuOWMyLjItOC4xLDUuNS0xMS40LDExLjctMTEuNHMxMS4yLDQsMTEuMiwxMC4xLS43LDUuNy0xLjcsOWwtMTQuNiw0NS42Yy0zLjcsMTEuNi05LjYsMTYuNS0xOS45LDE2LjVzLTE2LjUtNC45LTIwLjEtMTYuNWwtMTQuNi00NS42Yy0xLjEtMy41LTEuOC02LjYtMS44LTguOCwwLTYuMSw0LjctMTAuMywxMS4zLTEwLjNzOS44LDMuNiwxMiwxMS40bDEyLjksNDUuMmgxLjFsMTIuNC00NS4yaC4xWiIvPgogICAgICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjE1LjQsNzUuOGwxOC42LTE4YzYuMi01LjksOC44LTkuOCw4LjgtMTMuOHMtMy41LTcuOS04LjUtNy45LTYuNywxLjctOS43LDUuOWMtMy4zLDQuMy01LjcsNS45LTkuNiw1LjlzLTkuMS0zLjYtOS4xLTguNmMwLTExLjIsMTMuNC0yMS40LDI5LjYtMjEuNHMyOS4yLDEwLjEsMjkuMiwyMy44LTQuNCwxNi41LTEzLjgsMjUuMWwtMTQuNiwxMy42di45aDIxYzYuNCwwLDEwLjQsMy41LDEwLjQsOS4xcy0zLjksOC45LTEwLjQsOC45aC00MC43Yy02LjIsMC0xMC40LTMuOC0xMC40LTkuM3MyLjMtNy43LDkuMi0xNC4yWiIvPgogICAgICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjc3LDMxLjJjMC03LjYsNC41LTEyLjEsMTItMTIuMWgzNy4yYzUsMCw4LjYsMy44LDguNiw5cy0zLjYsOC45LTguNiw4LjloLTI2LjN2MTMuOWgyNS4yYzQuNiwwLDcuNywzLjMsNy43LDguMnMtMy4xLDguMS03LjcsOC4xaC0yNS4ydjEzLjloMjZjNS4zLDAsOC45LDMuNiw4LjksOXMtMy42LDktOSw5aC0zNi44Yy03LjUsMC0xMi00LjUtMTItMTIuMVYzMS4zaDBaIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zNDMuMiw4MS45bDE3LjgtMjMuMS0xOC4xLTIyLjZjLTItMi40LTMtNC45LTMtNy40LDAtNS45LDQuNy0xMC4zLDEwLjgtMTAuM3M2LjQsMS41LDExLjUsOC40bDEzLjIsMThoMWwxMi0xOGM0LjMtNi40LDYuOS04LjQsMTEuNC04LjRzMTAuOCw0LjUsMTAuOCwxMC4zLTEsNC45LTMsNy40bC0xOC4zLDIzLDE4LjgsMjIuNmMxLjksMi4zLDMsNC45LDMsNy40LDAsNS44LTQuNywxMC4zLTEwLjgsMTAuM3MtNi0xLjMtMTEuNS04LjRsLTEzLjEtMTdoLTFsLTEyLjEsMTdjLTQuOSw2LjctNy4xLDguNC0xMS41LDguNHMtMTAuNy00LjUtMTAuNy0xMC4zLDEuMS00LjksMy03LjRoLS4yWiIvPgogICAgPC9nPgogIDwvZz4KICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTMuOSwxOS4ySDMuM2MtMS45LDAtMy4zLDEuNS0zLjMsMy40djIzLjFoNDcuNGMxLDAsMS45LjQsMi42LDEuMWwxMSwxMS41Yy4yLjMuMi43LDAsLjlsLTExLDExLjZjLS43LjctMS40LDEuMy0yLjQsMS4zSDB2MjMuMWMwLDEuOCwxLjUsMy4zLDMuMywzLjNoNTAuNWMxLjEsMCwyLjItLjQsMy0xLjJsMzQuMS0zMy44YzIuNi0yLjYsMi42LTYuOCwwLTkuNXEtMS43LTEuOCwwLDBMNTYuOCwyMC40Yy0uOC0uOC0xLjgtMS4yLTIuOS0xLjJoMFoiLz4KPC9zdmc+") !important;
    width:130px !important;
    background-size: 130px 30px !important;
}

:root body::selection {
color: var(--v2p-color-selection-foreground);
    background-color: var(--v2p-color-selection-background);
}

:root body img::selection {
background-color: var(--v2p-color-selection-background-img);
}

:root {
color-scheme: light;
}

:root html,
:root body {
min-height: 100vh;
}

body {
scrollbar-gutter: stable;
    overflow: overlay;
}

body h1 {
font-weight: bold;
}

body a {
cursor: default;
    text-decoration: none;
}

body a[href] {
cursor: pointer;
}

body a:hover {
text-decoration: underline 1px;
    text-underline-offset: var(--v2p-underline-offset);
}

body :where(a[href], button, [tabindex]):not(input):not(select):not(textarea):focus-visible {
outline: 2px solid var(--v2p-focus-ring) !important;
    outline-offset: 2px !important;
}

body :where(input, select, textarea):focus-visible {
outline: none !important;
}

body .v2p-lite-emoji-item:focus-visible,
body .v2p-lite-topic-tool:focus-visible,
body .v2p-lite-topic-menu-item:focus-visible {
outline: 2px solid var(--v2p-focus-ring) !important;
    outline-offset: 2px !important;
}

body pre {
max-width: calc(830px - 2 * var(--v2p-layout-column-gap) - 24px);
}

body #Top {
height: var(--v2p-nav-height);
    background-color: var(--v2p-color-bg-content);
    border: none;
}

body #Bottom {
color: var(--v2p-color-font-secondary);
    background-color: var(--v2p-color-bg-footer);
    border: none;
}

body #Bottom .content {
flex-direction: column;
}

body #Wrapper {
background-color: inherit;
    background-image: none;
}

body #Wrapper.Night {
background-color: inherit;
    background-image: none;
}

body #Wrapper .content {
gap: var(--v2p-layout-column-gap);
}

:root body #Logo,
#LogoMobile {
background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0idjJleF9sb2dvIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQxNSAxMTciPgogIDwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiAyLjEuMCBCdWlsZCAxNDIpICAtLT4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLnN0MCB7CiAgICAgICAgaXNvbGF0aW9uOiBpc29sYXRlOwogICAgICB9CgogICAgICAuc3QxIHsKICAgICAgICBmaWxsOiAjM2UzYTM5OwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8ZyBjbGFzcz0ic3QwIj4KICAgIDxnIGNsYXNzPSJzdDAiPgogICAgICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTc1LjIsMjkuOWMyLjItOC4xLDUuNS0xMS40LDExLjctMTEuNHMxMS4yLDQsMTEuMiwxMC4xLS43LDUuNy0xLjcsOWwtMTQuNiw0NS42Yy0zLjcsMTEuNi05LjYsMTYuNS0xOS45LDE2LjVzLTE2LjUtNC45LTIwLjEtMTYuNWwtMTQuNi00NS42Yy0xLjEtMy41LTEuOC02LjYtMS44LTguOCwwLTYuMSw0LjctMTAuMywxMS4zLTEwLjNzOS44LDMuNiwxMiwxMS40bDEyLjksNDUuMmgxLjFsMTIuNC00NS4yaC4xWiIvPgogICAgICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjE1LjQsNzUuOGwxOC42LTE4YzYuMi01LjksOC44LTkuOCw4LjgtMTMuOHMtMy41LTcuOS04LjUtNy45LTYuNywxLjctOS43LDUuOWMtMy4zLDQuMy01LjcsNS45LTkuNiw1LjlzLTkuMS0zLjYtOS4xLTguNmMwLTExLjIsMTMuNC0yMS40LDI5LjYtMjEuNHMyOS4yLDEwLjEsMjkuMiwyMy44LTQuNCwxNi41LTEzLjgsMjUuMWwtMTQuNiwxMy42di45aDIxYzYuNCwwLDEwLjQsMy41LDEwLjQsOS4xcy0zLjksOC45LTEwLjQsOC45aC00MC43Yy02LjIsMC0xMC40LTMuOC0xMC40LTkuM3MyLjMtNy43LDkuMi0xNC4yWiIvPgogICAgICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjc3LDMxLjJjMC03LjYsNC41LTEyLjEsMTItMTIuMWgzNy4yYzUsMCw4LjYsMy44LDguNiw5cy0zLjYsOC45LTguNiw4LjloLTI2LjN2MTMuOWgyNS4yYzQuNiwwLDcuNywzLjMsNy43LDguMnMtMy4xLDguMS03LjcsOC4xaC0yNS4ydjEzLjloMjZjNS4zLDAsOC45LDMuNiw4LjksOXMtMy42LDktOSw5aC0zNi44Yy03LjUsMC0xMi00LjUtMTItMTIuMVYzMS4zaDBaIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zNDMuMiw4MS45bDE3LjgtMjMuMS0xOC4xLTIyLjZjLTItMi40LTMtNC45LTMtNy40LDAtNS45LDQuNy0xMC4zLDEwLjgtMTAuM3M2LjQsMS41LDExLjUsOC40bDEzLjIsMThoMWwxMi0xOGM0LjMtNi40LDYuOS04LjQsMTEuNC04LjRzMTAuOCw0LjUsMTAuOCwxMC4zLTEsNC45LTMsNy40bC0xOC4zLDIzLDE4LjgsMjIuNmMxLjksMi4zLDMsNC45LDMsNy40LDAsNS44LTQuNywxMC4zLTEwLjgsMTAuM3MtNi0xLjMtMTEuNS04LjRsLTEzLjEtMTdoLTFsLTEyLjEsMTdjLTQuOSw2LjctNy4xLDguNC0xMS41LDguNHMtMTAuNy00LjUtMTAuNy0xMC4zLDEuMS00LjksMy03LjRoLS4yWiIvPgogICAgPC9nPgogIDwvZz4KICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTMuOSwxOS4ySDMuM2MtMS45LDAtMy4zLDEuNS0zLjMsMy40djIzLjFoNDcuNGMxLDAsMS45LjQsMi42LDEuMWwxMSwxMS41Yy4yLjMuMi43LDAsLjlsLTExLDExLjZjLS43LjctMS40LDEuMy0yLjQsMS4zSDB2MjMuMWMwLDEuOCwxLjUsMy4zLDMuMywzLjNoNTAuNWMxLjEsMCwyLjItLjQsMy0xLjJsMzQuMS0zMy44YzIuNi0yLjYsMi42LTYuOCwwLTkuNXEtMS43LTEuOCwwLDBMNTYuOCwyMC40Yy0uOC0uOC0xLjgtMS4yLTIuOS0xLjJoMFoiLz4KPC9zdmc+") !important;
width: 130px !important;
background-size: 130px 30px !important;
}

#LogoMobile {
background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0idjJleF9sb2dvIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQxNSAxMTciPgogIDwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiAyLjEuMCBCdWlsZCAxNDIpICAtLT4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLnN0MCB7CiAgICAgICAgaXNvbGF0aW9uOiBpc29sYXRlOwogICAgICB9CgogICAgICAuc3QxIHsKICAgICAgICBmaWxsOiAjM2UzYTM5OwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8ZyBjbGFzcz0ic3QwIj4KICAgIDxnIGNsYXNzPSJzdDAiPgogICAgICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTc1LjIsMjkuOWMyLjItOC4xLDUuNS0xMS40LDExLjctMTEuNHMxMS4yLDQsMTEuMiwxMC4xLS43LDUuNy0xLjcsOWwtMTQuNiw0NS42Yy0zLjcsMTEuNi05LjYsMTYuNS0xOS45LDE2LjVzLTE2LjUtNC45LTIwLjEtMTYuNWwtMTQuNi00NS42Yy0xLjEtMy41LTEuOC02LjYtMS44LTguOCwwLTYuMSw0LjctMTAuMywxMS4zLTEwLjNzOS44LDMuNiwxMiwxMS40bDEyLjksNDUuMmgxLjFsMTIuNC00NS4yaC4xWiIvPgogICAgICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjE1LjQsNzUuOGwxOC42LTE4YzYuMi01LjksOC44LTkuOCw4LjgtMTMuOHMtMy41LTcuOS04LjUtNy45LTYuNywxLjctOS43LDUuOWMtMy4zLDQuMy01LjcsNS45LTkuNiw1LjlzLTkuMS0zLjYtOS4xLTguNmMwLTExLjIsMTMuNC0yMS40LDI5LjYtMjEuNHMyOS4yLDEwLjEsMjkuMiwyMy44LTQuNCwxNi41LTEzLjgsMjUuMWwtMTQuNiwxMy42di45aDIxYzYuNCwwLDEwLjQsMy41LDEwLjQsOS4xcy0zLjksOC45LTEwLjQsOC45aC00MC43Yy02LjIsMC0xMC40LTMuOC0xMC40LTkuM3MyLjMtNy43LDkuMi0xNC4yWiIvPgogICAgICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjc3LDMxLjJjMC03LjYsNC41LTEyLjEsMTItMTIuMWgzNy4yYzUsMCw4LjYsMy44LDguNiw5cy0zLjYsOC45LTguNiw4LjloLTI2LjN2MTMuOWgyNS4yYzQuNiwwLDcuNywzLjMsNy43LDguMnMtMy4xLDguMS03LjcsOC4xaC0yNS4ydjEzLjloMjZjNS4zLDAsOC45LDMuNiw4LjksOXMtMy42LDktOSw5aC0zNi44Yy03LjUsMC0xMi00LjUtMTItMTIuMVYzMS4zaDBaIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zNDMuMiw4MS45bDE3LjgtMjMuMS0xOC4xLTIyLjZjLTItMi40LTMtNC45LTMtNy40LDAtNS45LDQuNy0xMC4zLDEwLjgtMTAuM3M2LjQsMS41LDExLjUsOC40bDEzLjIsMThoMWwxMi0xOGM0LjMtNi40LDYuOS04LjQsMTEuNC04LjRzMTAuOCw0LjUsMTAuOCwxMC4zLTEsNC45LTMsNy40bC0xOC4zLDIzLDE4LjgsMjIuNmMxLjksMi4zLDMsNC45LDMsNy40LDAsNS44LTQuNywxMC4zLTEwLjgsMTAuM3MtNi0xLjMtMTEuNS04LjRsLTEzLjEtMTdoLTFsLTEyLjEsMTdjLTQuOSw2LjctNy4xLDguNC0xMS41LDguNHMtMTAuNy00LjUtMTAuNy0xMC4zLDEuMS00LjksMy03LjRoLS4yWiIvPgogICAgPC9nPgogIDwvZz4KICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTMuOSwxOS4ySDMuM2MtMS45LDAtMy4zLDEuNS0zLjMsMy40djIzLjFoNDcuNGMxLDAsMS45LjQsMi42LDEuMWwxMSwxMS41Yy4yLjMuMi43LDAsLjlsLTExLDExLjZjLS43LjctMS40LDEuMy0yLjQsMS4zSDB2MjMuMWMwLDEuOCwxLjUsMy4zLDMuMywzLjNoNTAuNWMxLjEsMCwyLjItLjQsMy0xLjJsMzQuMS0zMy44YzIuNi0yLjYsMi42LTYuOCwwLTkuNXEtMS43LTEuOCwwLDBMNTYuOCwyMC40Yy0uOC0uOC0xLjgtMS4yLTIuOS0xLjJoMFoiLz4KPC9zdmc+");
}

html.Night #Logo {
filter: invert(1) brightness(0.9) contrast(0.9);
}

body #Top,
body #Bottom {
background-color: var(--v2p-color-background) !important;
margin-top: 15px !important;
}

#Main #SecondaryTabs {
padding: 5px 20px;
background-color: var(--v2p-color-bg-tabs);
border-radius: 99px;
box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
}

.sep20 {
height: 10px !important;
}

.message, .section {
margin-top: 10px;
}

.box {
padding: 10px;
border-radius: var(--v2p-box-radius) !important;
}

#reply-box {
margin-top: 10px !important;
margin-bottom: 10px !important;
}

#no-comments-yet {
margin-bottom: 10px !important;
}

#reply_content {
padding: 10px;
}

.v2p-reply-wrap {
overflow: hidden;
background-color: var(--v2p-color-bg-input);
border: 1px solid var(--v2p-color-input-border);
border-radius: 8px;
}

.v2p-reply-wrap #reply_content {
display: block;
width: 100%;
box-sizing: border-box;
font-family: ui-rounded, 'SF Pro Rounded', ui-system, -apple-system, sans-serif !important;
font-size: 15px !important;
line-height: var(--v2p-reply-line-height) !important;
background-color: rgba(0, 0, 0, 0);
border: none !important;
box-shadow: none !important;
}

.v2p-reply-wrap #reply_content::placeholder {
font-size: 14px;
color: var(--v2p-color-font-tertiary);
}

.v2p-reply-wrap #reply_content:focus {
background-color: var(--v2p-color-bg-content);
outline: none;
}

.v2p-lite-reply-tabs {
display: inline-flex;
align-items: center;
gap: 2px;
margin-bottom: 8px;
padding: 3px;
background-color: var(--v2p-color-bg-block);
border-radius: 8px;
}

.v2p-lite-reply-tab {
cursor: pointer;
min-width: 54px;
height: 28px;
padding: 0 12px;
font-size: 13px;
color: var(--v2p-color-font-secondary);
background: transparent;
border: 0;
border-radius: 6px;
}

.v2p-lite-reply-tab:hover {
color: var(--v2p-color-foreground);
}

.v2p-lite-reply-tab.is-active {
color: var(--v2p-color-foreground);
font-weight: 600;
background-color: var(--v2p-color-bg-content);
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.v2p-lite-reply-preview {
box-sizing: border-box;
min-height: 120px;
padding: 12px;
font-family: ui-rounded, 'SF Pro Rounded', ui-system, -apple-system, sans-serif !important;
font-size: 15px !important;
line-height: var(--v2p-reply-line-height) !important;
color: var(--v2p-color-foreground);
background-color: var(--v2p-color-bg-input);
border: 1px solid var(--v2p-color-input-border);
border-radius: 8px;
}

.v2p-lite-reply-preview :is(.topic_content, .reply_content, p) {
font-size: inherit !important;
line-height: inherit !important;
}

.v2p-lite-preview-image-link {
display: block;
width: fit-content;
max-width: 100%;
margin: 8px 0;
}

.v2p-lite-preview-image {
display: block;
width: auto;
max-width: 100%;
height: auto;
max-height: 640px;
border-radius: 8px;
object-fit: contain;
}

.v2p-lite-reply-preview[hidden] {
display: none !important;
}

.v2p-lite-reply-preview-state {
color: var(--v2p-color-font-tertiary);
}

.v2p-lite-preview-retry {
cursor: pointer;
padding: 0;
color: var(--v2p-color-accent-500);
background: none;
border: 0;
}

.v2p-reply-upload-bar {
cursor: pointer;
padding: 6px 10px;
font-size: 12px;
color: var(--v2p-color-font-tertiary);
background-color: var(--v2p-color-bg-input);
border-top: 1px dashed var(--v2p-color-border-darker);
}

.v2p-reply-upload-bar:hover {
color: var(--v2p-color-foreground);
background-color: var(--v2p-color-bg-hover-btn);
}

.v2p-reply-upload-bar-disabled {
pointer-events: none;
opacity: 0.65;
}

.v2p-lite-emoji-trigger {
cursor: pointer;
display: inline-flex;
align-items: center;
justify-content: center;
width: 32px;
height: 32px;
margin-left: 6px;
padding: 0;
color: var(--v2p-color-font-secondary);
background: transparent;
border: 0;
border-radius: 6px;
}

.v2p-lite-emoji-trigger:hover,
.v2p-lite-emoji-trigger[aria-expanded="true"] {
color: var(--v2p-color-foreground);
background-color: var(--v2p-color-bg-hover-btn);
}

.v2p-lite-emoji-trigger svg {
width: 19px;
height: 19px;
fill: none;
stroke: currentColor;
stroke-width: 2;
stroke-linecap: round;
stroke-linejoin: round;
}

.v2p-lite-emoji-panel {
position: fixed;
z-index: 2147483646;
overflow-y: auto;
width: min(340px, calc(100vw - 16px));
max-height: min(360px, calc(100vh - 24px));
box-sizing: border-box;
padding: 14px 16px;
color: var(--v2p-color-font-secondary);
background-color: var(--v2p-color-bg-content);
border: 1px solid var(--v2p-color-border);
border-radius: 8px;
box-shadow: var(--v2p-widget-shadow);
}

.v2p-lite-emoji-panel[hidden] {
display: none;
}

.v2p-lite-emoji-group + .v2p-lite-emoji-group {
margin-top: 12px;
}

.v2p-lite-emoji-title {
margin-bottom: 8px;
font-size: 13px;
line-height: 20px;
}

.v2p-lite-emoji-list {
display: grid;
grid-template-columns: repeat(8, 1fr);
gap: 4px;
}

.v2p-lite-emoji-item {
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
min-width: 0;
height: 30px;
padding: 0;
font-family: inherit;
font-size: 20px;
line-height: 30px;
background: transparent;
border: 0;
border-radius: 4px;
}

.v2p-lite-emoji-item:hover,
.v2p-lite-emoji-item:focus-visible {
background-color: var(--v2p-color-bg-hover-btn);
outline: none;
}

.v2p-lite-emoji-item img {
display: block;
width: 24px;
height: 24px;
object-fit: contain;
}

.v2p-lite-emoji-image {
width: 21px !important;
height: 21px !important;
object-fit: contain;
vertical-align: text-bottom;
}

.v2p-image-upload-previews:empty {
display: none;
}

html.v2p-hide-upload-preview .v2p-image-upload-previews {
display: none !important;
}

.v2p-image-upload-previews {
background-color: var(--v2p-color-bg-input);
border-top: 1px solid var(--v2p-color-border);
}

.v2p-image-upload-preview {
display: grid;
grid-template-columns: 64px minmax(0, 1fr) auto;
gap: 10px;
align-items: center;
min-height: 64px;
padding: 10px;
}

.v2p-image-upload-preview + .v2p-image-upload-preview {
border-top: 1px solid var(--v2p-color-border);
}

.v2p-image-upload-thumb {
overflow: hidden;
width: 64px;
height: 64px;
background-color: var(--v2p-color-bg-content);
border: 1px solid var(--v2p-color-border);
border-radius: 4px;
}

.v2p-image-upload-thumb img {
display: block;
width: 100%;
height: 100%;
object-fit: cover;
}

.v2p-image-upload-info {
min-width: 0;
}

.v2p-image-upload-name {
overflow: hidden;
font-size: 13px;
font-weight: 600;
color: var(--v2p-color-foreground);
text-overflow: ellipsis;
white-space: nowrap;
}

.v2p-image-upload-meta,
.v2p-image-upload-status {
margin-top: 3px;
font-size: 12px;
color: var(--v2p-color-font-tertiary);
}

.v2p-image-upload-status {
color: var(--v2p-color-accent-600);
}

.v2p-image-upload-preview-error .v2p-image-upload-status {
color: var(--v2p-color-error);
}

.v2p-image-upload-actions {
display: inline-flex;
gap: 4px;
align-items: center;
}

.v2p-image-upload-action {
cursor: pointer;
display: inline-flex;
align-items: center;
justify-content: center;
width: 30px;
height: 30px;
padding: 0;
color: var(--v2p-color-font-tertiary);
background: transparent;
border: 0;
border-radius: 4px;
}

.v2p-image-upload-action:hover {
color: var(--v2p-color-foreground);
text-decoration: none;
background-color: var(--v2p-color-bg-hover-btn);
}

.v2p-image-upload-action:disabled {
cursor: wait;
opacity: 0.45;
}

.v2p-image-upload-remove:hover {
color: var(--v2p-color-error);
}

.v2p-image-upload-action svg {
width: 15px;
height: 15px;
fill: none;
stroke: currentColor;
stroke-width: 2;
stroke-linecap: round;
stroke-linejoin: round;
}

@media (max-width: 520px) {
.v2p-image-upload-preview {
grid-template-columns: 54px minmax(0, 1fr) auto;
gap: 8px;
min-height: 54px;
padding: 8px;
}

.v2p-image-upload-thumb {
width: 54px;
height: 54px;
}
}

body form textarea#topic_title {
margin: 10px 0;
}

body,
.mll,
.mle,
#search,
.new-title-input,
#Wrapper,
h1,
.item_title,
.topic_content,
.reply_content {
font-family:ui-rounded, 'SF Pro Rounded', ui-system, -apple-system, sans-serif !important;
}

.topic_content a,
.reply_content a {
text-decoration: underline !important;
}

.v2p-lite-long-reply {
position: relative;
}

.v2p-lite-long-reply.is-collapsed .reply_content {
max-height: var(--v2p-lite-collapsed-reply-height, 250px);
overflow: hidden;
}

.v2p-lite-long-reply.is-collapsed::after {
pointer-events: none;
position: absolute;
right: 0;
bottom: 34px;
left: 0;
height: 44px;
background: linear-gradient(to bottom, rgba(var(--v2p-color-bg-content-rgb), 0), var(--v2p-color-bg-content));
content: "";
}

.v2p-lite-long-reply-toggle {
cursor: pointer;
position: relative;
z-index: 1;
display: block;
width: 100%;
height: 34px;
margin: 4px 0 0;
padding: 0;
font-size: 12px;
font-weight: 600;
color: var(--v2p-color-font-secondary);
background: transparent;
border: 0;
border-radius: 7px;
}

.v2p-lite-long-reply-toggle:hover {
color: var(--v2p-color-foreground);
background-color: var(--v2p-color-bg-hover-btn);
}

#Main .topic_buttons.v2p-lite-reply-jump-target {
scroll-margin-top: 12px;
}

.item_title a {
font-weight: normal !important;
}

.item_title,
.item_hot_topic_title {
line-height: 1.6;
}

.payload {
line-height: 1.8 !important;
border-radius: 10px !important;
}

img.avatar,
.avatar,
.cell[class*="hot_t_"] img[alt] {
border-radius: 50% !important;
width:40px !important;
max-height:40px !important;
}

.cell[class*="hot_t_"] img[alt] {
width: 24px !important;
max-height: 24px !important;
}

.item_node {
border-color: var(--v2p-color-main-300);
}

#Main .tab_current {
background: none;
border-bottom: 2px solid var(--box-foreground-color);
border-radius: 0;
color: var(--box-content-color);
}

#Main #SecondaryTabs {
border-radius: 0 0 10px 10px;
}

.content {
max-width: 1200px !important;
}

#Top>.content {
max-width: 1110px !important;
}

.member-activity-bar {
width: auto;
}

.ml {
font-family: ui-monospace, 'SF Mono' !important;
}

.mll {
border-radius: 10px;
}

body #search-container {
border-radius:18px !important;
}

#Navcol .nav_item:hover {
background-color: var(--box-background-hover-color);
}

#Navcol .nav_item:hover:active {
box-shadow: none;
}

#Navcol .nav_item_current:hover {
color: var(--box-foreground-color);
    background-color: var(--v2p-color-bg-content);
}

#Navcol .nav_item_current:active {
box-shadow: none;
}

#Rightcol #page-outline-title {
background-color: var(--v2p-color-button-background-hover);
}

#Rightcol .page-outline-item:hover {
background-color: var(--box-background-hover-color);
}

body #Wrapper.v2p-has-singleton {
padding: 20px 0 0;
}

.subtle {
background-color: var(--bg-reply, var(--v2p-color-bg-reply)) !important;
    border-radius:10px;
    border: none !important;
    border-left: 2px solid var(--v2p-color-border-darker) !important;
    margin-top:10px;
    padding:10px;
}

#topic-tip-box {
box-shadow: none !important;
    display:none;
}

body #Wrapper.v2p-has-singleton #Singleton {
overflow: hidden;
    box-shadow: var(--v2p-box-shadow);
}

body #Leftbar {
float: none;
    order: 1;
}

body #Main {
flex: 1;
    order: 2;
    max-width: 85vw;
    margin-right: 290px;
}

body #Rightbar {
order: 3;
    margin-right:0 !important;
    margin-left:20px;
}

body #search-container {
height: 30px;
    margin: 0 30px;
    background-color: var(--v2p-color-bg-search);
    border: none;
    border-radius: 6px;
    transition: background-color 0.2s ease;
}

body #search-container::before {
top: 0;
    left: 4px;
    opacity: 0.6;
    background-size: 14px 14px;
    filter: none;
}

body #search-container.active {
background-color: var(--v2p-color-bg-search-active);
}

body #search-container #search-result {
z-index: var(--zidx-serach);
    top: 42px;
    font-size: 14px;
    color: var(--v2p-color-font-secondary);
    background: var(--v2p-color-bg-widget);
    backdrop-filter: blur(16px);
    border: 1px solid var(--box-border-color);
    box-shadow: var(--v2p-widget-shadow);
}

body #search-container #search-result .fade {
color: var(--v2p-color-font-secondary);
}

body #search-container #search-result .search-item {
font-weight: bold;
    color: var(--v2p-color-foreground);
    border-radius: 5px;
}

body #search-container #search-result .search-item.active {
color: var(--v2p-color-foreground);
}

body #search-container #search-result .search-item.active.v2p-no-active {
background-color: rgba(0, 0, 0, 0);
}

body .box {
color: var(--box-foreground-color);
    background-color: var(--v2p-color-bg-content);
    border: none;
    border-radius: var(--box-border-radius);
    box-shadow: var(--v2p-box-shadow);
}

body .box .header > h1 {
font-size: 18px;
    font-weight: bold;
}

body .box .header .gray {
color: var(--color-gray);
}

body .button {
--button-hover-shadow: 0 1.8px 0 var(--button-border-color),
        0 1.8px 0 var(--button-background-color);
}

body .button.normal,
body .button.super {
cursor: pointer;
    user-select: none;
    position: relative;
    display: inline-flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    height: 28px;
    padding: 0 12px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    line-height: 28px;
    color: var(--v2p-color-button-foreground);
    text-shadow: none;
    white-space: nowrap;
    background: var(--v2p-color-button-background);
    border: none;
    border-radius: 6px;
    outline: none;
    box-shadow:
        0 1.8px 0 var(--box-background-hover-color),
        0 1.8px 0 var(--button-background-color);
    transition:
        color 0.25s,
        background-color 0.25s,
        box-shadow 0.25s;
    vertical-align: middle;
    margin-right: 10px;
}

body .button.normal:is(:hover:enabled, :active:enabled),
body .button.super:is(:hover:enabled, :active:enabled) {
font-weight: 500;
    color: var(--v2p-color-button-foreground-hover);
    text-shadow: none;
    background: var(--v2p-color-button-background-hover);
    border: none;
    box-shadow: var(--button-hover-shadow);
}

body .button.normal:is(.hover_now, .disable_now),
body .button.super:is(.hover_now, .disable_now) {
color: var(--v2p-color-button-foreground) !important;
    text-shadow: none !important;
    background: var(--button-background-color) !important;
    border: none !important;
    box-shadow:
        0 1.8px 0 var(--box-background-hover-color) !important,
        0 1.8px 0 var(--button-background-color) !important;
}

body .button.normal.button {
background: var(--v2p-color-accent-500);
    color: #fff;
    height: 32px;
    padding: 0 14px;
    box-shadow: 0 1.8px 0 rgba(0, 0, 0, 0.08);
}

body .button.normal.button:is(:hover:enabled, :active:enabled) {
background: var(--v2p-color-accent-600);
    color: #fff;
}

body .button.normal:is(.disable_now, :disabled),
body .button.super:is(.disable_now, :disabled) {
pointer-events: none;
    cursor: default;
    font-weight: 500;
    color: var(--v2p-color-button-foreground);
    text-shadow: none;
    opacity: 0.8;
    background: var(--button-background-color);
    box-shadow:
        0 1.8px 0 var(--box-background-hover-color),
        0 1.8px 0 var(--button-background-color);
}

body .button.normal kbd,
body .button.super kbd {
position: relative;
    right: -4px;
    padding: 0 3px;
    font-family: inherit;
    font-size: 90%;
    line-height: initial;
    border: 1px solid var(--button-border-color);
    border-radius: 4px;
}

body #reply-box .v2p-lite-reply-submit kbd {
position: static;
    margin-left: 3px;
    padding: 1px 6px;
    font-size: 12px;
    line-height: 1.4;
    color: inherit;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
    border-radius: 6px;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.12);
}

.button.normal {
border-radius:90px !important;
    padding-left:20px !important;
    padding-right:20px !important;
}

.ps_container td.button {
border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
}

.ps_container td.normal_page_right {
border-top-right-radius: 90px !important;
    border-bottom-right-radius: 90px !important;
}

body .button.special {
--button-hover-shadow: 0 1.8px 0 var(--v2p-color-accent-200),
        0 1.8px 0 var(--v2p-color-accent-100);
    color: var(--v2p-color-accent-500);
    border-radius:99px;
    max-width:120px;
}

body .button.special:hover,
body .button.special:hover:enabled {
color: var(--v2p-color-accent-600);
    background: var(--v2p-color-accent-100);
    border: none;
    box-shadow: var(--button-hover-shadow);
}

body .button a {
color: inherit;
    text-decoration: none;
}

body .badge {
user-select: none;
    padding: 1px 3px;
    font-weight: bold;
    border: 1px solid var(--v2p-color-accent-400);
    border-radius:99px !important;
    line-height:13px;
    margin-right:5px;
}

body .badge:first-child {
border: 1px solid var(--v2p-color-accent-400);
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

body .badge:last-child {
border: 1px solid var(--v2p-color-accent-400);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

body .badge.op {
color: var(--v2p-color-accent-400);
    background-color: var(--v2p-color-accent-50);
}

body .badge.mod {
color: var(--v2p-color-bg-content);
    background-color: var(--v2p-color-accent-400);
}

body .badge.you {
color: var(--v2p-color-orange-400);
    background-color: var(--v2p-color-orange-50);
    border: 1px solid var(--v2p-color-orange-400);
}

body .badge.mini {
height: 1.2em;
    font-size: 12px;
    font-weight: normal;
    line-height: 1;
}

body a.node:is(:active, :link, :visited) {
padding: 2px 6px;
    font-size: 9px;
    color: var(--v2p-color-font-secondary);
    background-color: var(--v2p-color-bg-block);
    border-radius: 99px;
}

body a.node:is(:active, :link, :visited):hover {
color: var(--v2p-color-font-tertiary);
    background-color: var(--v2p-color-button-background-hover);
}

body .outdated {
font-size: 12px;
    border-color: var(--v2p-color-border);
    border-bottom: none;
}

body :is(.page_normal, .page_current),
body :is(.page_normal, .page_current):is(:link, :visited) {
user-select: none;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: auto !important;
    min-width: 25px;
    max-width: none !important;
    height: 25px !important;
    padding: 0 5px !important;
    font-size: 13px;
    line-height: 1;
    white-space: nowrap;
    border: none;
    border-radius: 999px !important;
    margin: 0 2px;
    text-decoration: none !important;
}

body .page_normal,
body .page_normal:is(:link, :visited) {
font-weight: 500;
    color: var(--v2p-color-font-primary);
    background-color: var(--v2p-color-bg-content);
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

body .page_normal:is(:link, :visited):hover {
background-color: var(--v2p-color-button-background-hover);
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

body .page_current,
body .page_current:is(:link, :visited) {
pointer-events: none;
    font-weight: bold;
    color: #fff !important;
    background-color: var(--v2p-color-accent-700, #333) !important;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

body .ps_container > table > tbody > tr > td:last-child > table {
width: auto !important;
    margin-left: auto;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 4px 0;
}

body .ps_container td.super.normal.button:not(.normal_page_right),
body .ps_container td.super.normal_page_right.button {
display: table-cell !important;
    vertical-align: middle;
    text-align: center;
    box-sizing: border-box;
    width: 25px !important;
    min-width: 25px;
    max-width: 25px;
    height: 25px !important;
    line-height: 25px !important;
    padding: 0 !important;
    font-size: 12px;
    font-weight: 500;
    color: var(--v2p-color-button-foreground) !important;
    text-shadow: none !important;
    border: none !important;
    border-radius: 50% !important;
    margin: 0 !important;
    background-color: var(--v2p-color-bg-content) !important;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    cursor: pointer;
}

body .ps_container td.super.normal.button:not(.normal_page_right):hover,
body .ps_container td.super.normal.button:not(.normal_page_right).hover_now,
body .ps_container td.super.normal_page_right.button:hover,
body .ps_container td.super.normal_page_right.button.hover_now {
color: var(--v2p-color-button-foreground-hover) !important;
background-color: var(--v2p-color-button-background-hover) !important;
}

body .super.button.disable_now {
opacity: 0.4;
    pointer-events: none;
    box-shadow: none;
}

body .page_input {
display: none;
}

body .dock_area {
margin: 12px 0;
    background: var(--v2p-color-bg-block);
    border-radius:10px;
}

body .member-activity-bar {
background-color: var(--v2p-color-divider);
}

body .member-activity-bar {
width:auto !important;
}

body .member-activity-bar .member-activity-start {
background-color: var(--v2p-color-accent-200);
}

body .member-activity-bar .member-activity-fourth {
background-color: var(--v2p-color-accent-400);
}

body .member-activity-bar .member-activity-half {
background-color: var(--v2p-color-accent-500);
}

body .member-activity-bar .member-activity-almost {
background-color: var(--v2p-color-accent-600);
}

body .member-activity-bar .member-activity-done {
background-color: var(--v2p-color-orange-400);
}

body .online {
user-select: none;
    padding: 6px 8px;
    font-size: 13px;
    color: var(--v2p-color-bg-content);
    background: var(--v2p-color-accent-400);
    border-radius: 5px;
}

body #topic_supplement {
resize: none;
    overflow: hidden;
    height: unset;
    min-height: 550px !important;
    max-height: 800px !important;
    font-size: 15px;
    color: currentColor;
    background-color: var(--v2p-color-bg-input);
    border: 1px solid var(--button-border-color);
    border-radius: 8px;
    transition: opacity 0.25s;
    overflow-y: auto;
}

body #topic_supplement::placeholder {
font-size: 15px;
    color: var(--v2p-color-font-tertiary);
}

body #topic_supplement:is(:focus, :focus-within) {
background-color: rgba(0, 0, 0, 0);
    outline: none;
    box-shadow: 0 0 0 1px var(--button-border-color);
}

body .item_hot_topic_title {
--offset: 2.4px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.4;
    position: relative;
    padding: var(--offset) 0;
    text-shadow: none;
}

body .item_hot_topic_title > a:hover {
text-underline-offset: var(--offset);
}

body form textarea#topic_title {
resize: none;
    overflow: hidden;
    height: unset;
    min-height: 75px !important;
    max-height: 800px !important;
    font-size: 15px;
    color: currentColor;
    background-color: var(--v2p-color-bg-input);
    border: 1px solid var(--button-border-color);
    border-radius: 8px;
    transition: opacity 0.25s;
}

body form textarea#topic_title::placeholder {
font-size: 15px;
    color: var(--v2p-color-font-tertiary);
}

body form textarea#topic_title:is(:focus, :focus-within) {
background-color: rgba(0, 0, 0, 0);
    outline: none;
    box-shadow: 0 0 0 1px var(--button-border-color);
}

body form #topic_title {
resize: none;
    overflow: hidden;
    height: unset;
    min-height: 30px !important;
    max-height: 800px !important;
    font-size: 15px;
    color: currentColor;
    background-color: var(--v2p-color-bg-input);
    border: 1px solid var(--button-border-color);
    border-radius: 8px;
    transition: opacity 0.25s;
}

body form #topic_title::placeholder {
font-size: 15px;
    color: var(--v2p-color-font-tertiary);
}

body form #topic_title:is(:focus, :focus-within) {
background-color: rgba(0, 0, 0, 0);
    outline: none;
    box-shadow: 0 0 0 1px var(--button-border-color);
}

body form #topic_content {
resize: none;
    overflow: hidden;
    height: unset;
    min-height: 120px !important;
    max-height: 800px !important;
    font-size: 15px;
    color: currentColor;
    background-color: var(--v2p-color-bg-input);
    border: 1px solid var(--button-border-color);
    border-radius: 8px;
    transition: opacity 0.25s;
}

body form #topic_content::placeholder {
font-size: 15px;
    color: var(--v2p-color-font-tertiary);
}

body form #topic_content:is(:focus, :focus-within) {
background-color: rgba(0, 0, 0, 0);
    outline: none;
    box-shadow: 0 0 0 1px var(--button-border-color);
}

body form[action^="/notes"] .cell {
background-color: rgba(0, 0, 0, 0) !important;
}

body #syntax-selector .radio-group {
padding: 3px;
    border-radius:18px;
    background-color: var(--v2p-color-background);
}

body #syntax-selector .radio-group > input[type="radio"]:checked + label {
background-color: #fff;
    border-radius:18px;
}

body #syntax-selector .radio-group > input[type="radio"] + label {
cursor: pointer;
    font-size: 13px;
}

body #syntax-selector label {
color: var(--v2p-color-foreground);
}

body .snow {
color: var(--v2p-color-font-quaternary);
}

body .orange-dot {
background: var(--v2p-color-orange-400);
}

body .alt {
background-color: var(--v2p-color-bg-input);
    border: 1px solid var(--button-border-color);
}

body a.btn_hero {
border-color: var(--v2p-color-foreground);
}

body a.btn_hero:hover {
background-color: var(--v2p-color-foreground);
}

a.op {
border-radius:20px !important;
    padding:2px 6px !important;
    font-size:12px;
}

a.tab_current, a.tab {
border-radius:20px !important;
}

a.tab:active, a.tab:link, a.tab:visited {
color:var(--v2p-color-foreground);
}

#topic_thank {
line-height:1;
}

body .cell_ops {
background-color: rgba(0, 0, 0, 0);
}

a.dark:active, a.dark:link, a.dark:visited {
color: inherit !important;;
    text-decoration: none;
}

body .CodeMirror {
color: currentColor;
    background-color: var(--v2p-color-bg-input);
}

body .CodeMirror.CodeMirror-focused {
background-color: var(--v2p-color-bg-content);
}

body .CodeMirror .CodeMirror-gutters {
padding-right: 5px;
    background-color: var(--v2p-color-bg-input);
    border-right: 1px solid var(--v2p-color-border-darker);
}

body .CodeMirror .CodeMirror-linenumber {
color: var(--v2p-color-font-quaternary);
}

body .CodeMirror .CodeMirror-cursors {
background-color: var(--v2p-color-foreground);
}

body .cm-s-one-dark {
background-color: var(--v2p-color-bg-input);
}

body #workspace {
overflow: hidden;
    border: 1px solid var(--button-border-color);
    border-radius: 8px;
}

body .select2-container {
width: 200px !important;
}

body .select2-container .select2-selection {
background-color: var(--v2p-color-background);
    border: 1px solid var(--v2p-color-border);
}

body .select2-container .select2-selection .select2-selection__rendered,
body .select2-container .select2-selection .select2-selection__placeholder {
color: var(--v2p-color-foreground);
}

body .select2-container .select2-dropdown {
font-size: 14px;
    background: var(--v2p-color-bg-widget);
    backdrop-filter: blur(16px);
    border: 1px solid var(--box-border-color);
    border-radius: 8px;
    box-shadow: var(--v2p-widget-shadow);
    transform: translateY(5px);
}

body .select2-container .select2-dropdown .select2-search {
padding: 5px;
}

body .select2-container
.select2-dropdown
.select2-search
.select2-search__field {
padding: 6px 4px;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid var(--v2p-color-border);
    border-radius: 4px;
}

body .select2-container
.select2-dropdown
.select2-search
.select2-search__field:focus-visible {
border-color: var(--v2p-color-font-quaternary);
    outline: none;
}

body
.select2-container
.select2-dropdown
.select2-results
> .select2-results__options {
padding: 5px;
}

body .select2-container
.select2-dropdown
.select2-container--default
.select2-results__option--selected {
color: currentColor;
    background-color: var(--v2p-color-accent-100);
}

body .select2-container .select2-results__option {
border-radius: 4px;
}

body
.select2-container
.select2-results__option--highlighted.select2-results__option--selectable {
color: currentColor;
    background-color: var(--v2p-color-main-200);
}

body .select2-container .select2-results__option--selected {
color: currentColor !important;
    background-color: var(--v2p-color-accent-100) !important;
}

body .problem {
color: currentColor;
    color: var(--v2p-color-orange-400);
    background-color: var(--v2p-color-orange-50);
    border-color: var(--v2p-color-orange-400);
    border-bottom: none;
}

body .markdown_body table {
border-top: 1px solid var(--v2p-color-border-darker);
    box-shadow: none;
}

body .markdown_body table tr th,
body .markdown_body table tr td {
border: 1px solid var(--v2p-color-border-darker);
}

body .markdown_body table tr:nth-child(2n) {
background-color: var(--box-background-alt-color);
}

body .markdown_body blockquote {
margin-inline: 0;
    padding: 0 1em;
    color: var(--v2p-color-font-tertiary);
    border-left: 3px solid var(--v2p-color-border);
}

body .markdown_body pre {
line-height: 1.5;
}

body .social_label:is(:link, :visited, :active) {
background-color: var(--v2p-color-button-background);
    border-radius: var(--box-border-radius);
    box-shadow: none;
}

body .social_label:is(:link, :visited, :active):hover {
background-color: var(--v2p-color-button-background-hover);
}

body .green {
color: var(--v2p-color-accent-500);
}

body .message {
margin: 6px 10px 8px;
    color: var(--v2p-color-orange-400);
    background-color: var(--v2p-color-orange-50);
    border: none;
    border-radius: 999px;
}

body .balance_area,
body a.balance_area:is(:link, :visited) {
display: inline-flex;
    gap: 3px;
    align-items: center;
    font-weight: 600;
    color: var(--v2p-color-foreground);
    text-shadow: none;
    background: var(--v2p-color-button-background);
}

body .balance_area:hover,
body a.balance_area:is(:link, :visited):hover {
background: var(--v2p-color-button-background-hover);
}

body:is(.subtle) {
background-color: var(--v2p-color-bg-subtle);
    border-left: 3px solid var(--v2p-color-accent-200);
}

body:is(.subtle) .topic_content {
font-size: 15px;
}

body .onoffswitch label .frame::before {
color: #fff;
    background-color: var(--v2p-color-accent-400);
}

body .onoffswitch label .frame::after {
color: var(--v2p-color-font-secondary);
    background-color: var(--v2p-color-bg-search);
}

body select {
color: var(--v2p-color-foreground);
    background-color: var(--v2p-color-background);
    border: 1px solid var(--v2p-color-border);
    border-radius: 4px;
    padding: 4px 6px;
}

body .ml,
body .mle,
body .mll,
body .sl,
body .sll,
body .sls {
color: var(--v2p-color-foreground);
    background-color: var(--v2p-color-bg-content);
    border-color: var(--v2p-color-input-border);
}

body .ml:focus,
body .mle:focus,
body .mll:focus,
body .sl:focus,
body .sll:focus,
body .sls:focus {
border-color: var(--v2p-color-input-border);
}

body input,
body select,
body textarea {
color: var(--v2p-color-foreground);
}

body .onoffswitch {
width: 90px;
    min-width: 90px;
    max-width: 90px;
}

.box .tag::before {
color: var(--v2p-color-font-secondary);
}

.box .tag:link,
.box .tag:visited {
font-size: 12px;
    color: var(--v2p-color-font-secondary);
    background-color: var(--v2p-color-main-100);
    border-radius: 99px;
}

.box .tag > li {
opacity: 0.6;
}

#Top .content {
height: 100%;
}

#Top .site-nav {
height: 100%;
    padding: 0;
}

#Top .tools {
display: flex;
    gap: 8px 14px;
    align-items: center;
    justify-content: flex-end;
    font-size: 14px;
    font-weight: 400;
}

html.v2p-topnav-pending #Top .tools {
visibility: hidden;
}

#Top .tools .top {
height: 26px;
    padding: 0 6px;
    line-height: 26px;
    color: var(--v2p-color-main-600);
    white-space: nowrap;
    border-radius: 4px;
}

#Top .tools .top:hover {
color: var(--v2p-color-foreground);
}

#Top .tools > a.top.v2p-lite-topnav-icon {
display: inline-flex;
    align-items: center;
    gap: 5px;
}

#Top .tools > a.top.v2p-lite-topnav-icon svg {
flex: 0 0 auto;
    width: 15px;
    height: 15px;
}

#Top .tools * {
margin-left: 0;
}

#Main .box {
overflow: auto;
    padding: 5px 12px;
}

#Main .box.node-header > .cell {
margin: 0 -12px;
}

#Main .node-header {
padding-top:0 !important;
}

#Main .box .cell {
background-image: none !important;
}

#Main .box .cell_ops {
padding: 15px 5px;
}

#Main .box.v2p-write-box .cell:nth-child(1),
#Main .box.v2p-write-box .cell:nth-child(2) {
border: none;
}

#Main .box.v2p-write-box .cell.v2p-syntax-cell {
padding: 8px 0 !important;
}

#Main
.box.v2p-write-box
.cell.v2p-syntax-cell
.tab-alt-container {
gap: 0 8px;
}

#Main .box.v2p-write-box .cell.v2p-syntax-cell .tab-alt {
padding: 4px 2px;
    border-bottom-width: 2px;
    transition: none;
}

#Main
.box.v2p-write-box
.cell.v2p-syntax-cell
.tab-alt:not(.active):hover {
border-color: rgba(0, 0, 0, 0);
}

#Main .box.v2p-write-box .cell#preview {
padding: 2px 5px;
}

#Main .topic_buttons {
display: flex;
    flex-wrap: wrap;
    column-gap: 5px;
    align-items: center;
    padding: 8px 0;
    background: none;
}

#Main .topic_buttons .topic_stats {
float: none;
    flex: 1;
    order: 99;
    margin-left: 10px;
    padding: 0 !important;
    font-size: 12px;
    text-shadow: none;
    white-space: nowrap;
}

#Main .topic_buttons .topic_thanked {
font-size: 12px;
}

#Main .topic_buttons a.tb:link {
display: flex;
    flex-direction: row-reverse;
    column-gap: 5px;
    align-items: center;
    padding: 5px;
    text-shadow: none;
    white-space: nowrap;
    background: none;
    border-radius: 4px;
}

#Main .vote:link {
color: var(--v2p-color-font-tertiary);
    border-color: var(--v2p-color-border-darker);
    border-radius: 5px;
}

#Main .vote:link:hover {
box-shadow: 0 2px 2px var(--v2p-color-main-200);
}

#Main .cell .topic-link {
color: var(--v2p-color-foreground);
    text-decoration: none;
}

#Main .cell .topic-link:visited {
color: var(--v2p-color-font-tertiary);
}

#Main .cell .topic_info {
pointer-events: none;
    user-select: none;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 2px 4px;
    align-items: center;
    margin-top: 4px;
    font-size: 12px;
    line-height: 18px;
}

#Main .cell .topic_info::after {
content: "";
    position: absolute;
    z-index: 1;
    inset: 0 0 -6px;
    background-color: var(--v2p-color-bg-content);
}

#Main .cell .topic_info .votes,
#Main .cell .topic_info .node,
#Main .cell .topic_info strong:first-of-type,
#Main .cell .topic_info span:first-of-type {
pointer-events: auto;
    position: relative;
    z-index: 2;
}

#Main .cell .topic_info a[href^="/member"] {
font-weight: 500;
    color: var(--v2p-color-font-tertiary);
    background-color: rgba(0, 0, 0, 0);
}

#Main .cell .count_livid {
user-select: none;
    display: inline-block;
    padding: 3px 6px;
    font-size: 11px;
    font-weight: 400;
    white-space: nowrap;
    border-radius: 99px;
    margin-right: 0;
    color: var(--v2p-color-button-foreground);
    background-color: var(--v2p-color-bg-block);
}

#Main .cell .count_orange {
user-select: none;
    display: inline-block;
    padding: 3px 6px;
    font-size: 11px;
    font-weight: 400;
    white-space: nowrap;
    border-radius: 99px;
    font-weight: bold;
    color: var(--v2p-color-bg-block);
    background-color: var(--v2p-color-orange-400);
}

#Main .cell .item_title .topic-link {
font-size: 16px;
    font-weight: normal !important;
    line-height: 1.45;
}

#Main .cell.item:has(.item_title > .topic-link) {
padding-top: var(--v2p-topic-row-padding) !important;
    padding-bottom: var(--v2p-topic-row-padding) !important;
}

#Main .cell.item tr > td:nth-child(2) {
width: 30px;
}

#Main .box > .cell[id^="r"].v2p-reply-leaf .reply_content,
#Main > .cell[id^="r"].v2p-reply-leaf .reply_content {
padding-bottom: 0;
}

#Main .cell[id^="r"] {
--bg-reply: var(--v2p-color-bg-content);
    background-color: var(--bg-reply);
}

#Main .cell[id^="r"].v2p-reply-last {
border-bottom: none;
}

#Main .cell[id^="r"]:hover > table td:last-of-type .fr a {
opacity: 1;
}

#Main .cell[id^="r"] .ago {
font-size: 12px;
    color: var(--v2p-color-font-quaternary);
    white-space: nowrap;
}

#Main .cell[id^="r"] .reply_content {
padding-bottom: 10px;
    line-height: var(--v2p-reply-line-height);
}

#Main .cell[id^="r"] > table:first-of-type td:first-of-type {
width: 40px;
}

#Main .cell[id^="r"] > table:first-of-type td:first-of-type .avatar {
display: inline-block;
    aspect-ratio: 1;
    width: 40px !important;
    height: 40px !important;
    background-color: var(--v2p-color-bg-avatar);
    margin-top:5px;
}

#Main .cell[id^="r"] > table ~ .cell[id^="r"] {
--bg-reply: var(--v2p-color-bg-reply);
    position: relative;
    z-index: var(--zidx-expand-btn);
    padding: var(--v2p-tp-nested-pd);
    border-left: 2px solid var(--v2p-color-border-darker);
    border-top: 1px solid var(--v2p-color-border-darker);
    border-radius: 10px;
    margin:10px 0 0 30px;
}

#Main .cell[id^="r"] > table ~ .cell[id^="r"] .cell[id^="r"] {
padding: 0;
    box-shadow: none;
}

#Main .cell[id^="r"] > table ~ .cell[id^="r"] .cell[id^="r"].v2p-indent {
border-left: 2px solid var(--v2p-color-border-darker);
    padding:10px 10px 2px 10px;
}

#Main .cell[id^="r"] > table ~ .cell[id^="r"] tr td:first-of-type {
width: 25px;
}

#Main .cell[id^="r"] > table ~ .cell[id^="r"] tr td:first-of-type .avatar {
width: 25px !important;
    height: 25px !important;
    border-radius: 4px;
}

#Main .cell[id^="r"] > table ~ .cell[id^="r"] tr td:nth-child(3) strong a {
font-size: 13px;
}

#Main .cell[id^="r"] > table ~ .cell[id^="r"] .reply_content {
padding-right: 5px;
}

#Main .cell[id^="r"] > table td:nth-of-type(2) {
width: 15px;
}

#Main .cell[id^="r"] > table td:last-of-type a.dark {
color: var(--v2p-color-font-secondary);
    text-decoration: none;
}

#Main .cell[id^="r"] > table td:last-of-type a.dark:hover {
text-decoration: none;
}

#Main .cell[id^="r"] > table td:last-of-type .fr {
user-select: none;
    position: relative;
    top: -3px;
}

#Main .cell[id^="r"] > table td:last-of-type .fr a {
opacity: 0;
}

#Main .cell[id^="r"] > table td:last-of-type .fr + .sep3 {
height: 0;
}

#Main .cell[id^="r"]:last-of-type {
border: none;
}

#Main .cell[id^="r"] .no {
user-select: none;
    position: relative;
    top: -4px;
    padding: 5px 10px;
    font-size: 12px;
    color: var(--v2p-color-cell-num);
    background-color: rgba(0, 0, 0, 0);
    border-radius: 5px;
}

#Main #Tabs {
user-select: none;
    position: sticky;
    z-index: var(--zidx-tabs);
    top: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    align-items: center;
    background-color: var(--v2p-color-bg-content);
}

html.v2p-tabs-pending #Tabs {
visibility: hidden;
}

#Main #Tabs .tab_current,
#Tabs .tab_current {
background-color: var(--v2p-color-accent-500) !important;
    color: #fff !important;
    border: 1px solid transparent !important;
}

#Main #Tabs .tab,
#Main #Tabs .tab_current,
#Tabs .tab,
#Tabs .tab_current {
margin: 3px 4px;
    padding: 4px 8px;
    border-radius: 20px;
    box-sizing: border-box;
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    height: 28px;
    gap: 4px;
    line-height: 1;
    font-weight: 500;
    white-space: nowrap;
}

#Main #Tabs .tab svg,
#Tabs .tab svg {
width: 14px;
    height: 14px;
    flex: 0 0 14px;
}

.v2p-nav-settings-btn {
display: inline-flex;
align-items: center;
justify-content: center;
width: 28px;
height: 28px;
margin: 3px 4px 3px 8px;
border-radius: 20px;
color: var(--v2p-color-font-tertiary);
cursor: pointer;
}

.v2p-nav-settings-btn:hover {
color: var(--v2p-color-foreground);
background-color: var(--v2p-color-bg-hover-btn);
}

#v2p-nav-menu {
position: absolute;
z-index: 2000;
width: 220px;
box-sizing: border-box;
padding: 6px;
border: 1px solid var(--box-border-color);
border-radius: 14px;
background-color: rgba(var(--v2p-color-bg-content-rgb), 0.88);
box-shadow: var(--v2p-widget-shadow);
backdrop-filter: blur(12px) saturate(180%);
-webkit-backdrop-filter: blur(12px) saturate(180%);
}

.v2p-nav-menu-list {
max-height: 300px;
padding: 4px 0;
overflow-y: auto;
}

.v2p-nav-menu-row {
position: relative;
display: flex;
align-items: center;
justify-content: space-between;
gap: 8px;
margin: 2px 0;
padding: 6px 8px;
border-radius: 8px;
font-size: 13px;
color: var(--v2p-color-font-secondary);
}

.v2p-nav-menu-row:hover {
background-color: var(--v2p-color-bg-hover-btn);
}

.v2p-nav-menu-left {
display: flex;
align-items: center;
gap: 8px;
min-width: 0;
}

.v2p-nav-menu-name {
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}

.v2p-nav-drag-handle {
display: inline-flex;
align-items: center;
cursor: grab;
opacity: 0.55;
}

.v2p-nav-dragging {
opacity: 0.35;
background-color: var(--v2p-color-bg-hover-btn);
outline: 1px dashed var(--v2p-color-accent-500);
outline-offset: -1px;
}

.v2p-nav-drop-before,
.v2p-nav-drop-after {
background-color: var(--v2p-color-bg-hover-btn);
}

.v2p-nav-drop-before::before,
.v2p-nav-drop-after::before {
content: "";
position: absolute;
z-index: 3;
left: 4px;
right: 4px;
height: 3px;
border-radius: 2px;
background-color: var(--v2p-color-accent-500);
box-shadow: 0 0 0 1px var(--v2p-color-bg-content), 0 1px 4px rgba(0, 0, 0, 0.2);
pointer-events: none;
}

.v2p-nav-drop-before::after,
.v2p-nav-drop-after::after {
content: "";
position: absolute;
z-index: 4;
left: 1px;
width: 7px;
height: 7px;
box-sizing: border-box;
border: 2px solid var(--v2p-color-bg-content);
border-radius: 50%;
background-color: var(--v2p-color-accent-500);
pointer-events: none;
}

.v2p-nav-drop-before::before {
top: -3px;
}

.v2p-nav-drop-before::after {
top: -5px;
}

.v2p-nav-drop-after::before {
bottom: -3px;
}

.v2p-nav-drop-after::after {
bottom: -5px;
}

#Main #SecondaryTabs {
padding: 5px 20px;
    background-color: var(--v2p-color-bg-tabs);
    border-radius: 99px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
    margin-bottom:10px;
}

#Main #SecondaryTabs a {
color: var(--v2p-color-main-600);
}

#Main .topic_content {
max-width: none;
    font-size: 16px;
    line-height: var(--v2p-reading-line-height);
    color: currentColor;
}

#Main .reply_content {
max-width: var(--v2p-reading-measure);
    font-size: 16px;
    line-height: var(--v2p-reading-line-height);
    color: currentColor;
}

body #Main .box:has(.topic_content) .header > h1 {
font-size: 23px;
    font-weight: 700;
    line-height: 1.35;
}

#Main .topic_content a[href^="/member"],
#Main .reply_content a[href^="/member"] {
position: relative;
    bottom: 1px;
    font-size: 13px;
    color: var(--v2p-color-font-tertiary);
    text-decoration: underline;
    text-underline-offset: 0.4ex;
    background-color: rgba(0, 0, 0, 0);
}

#Main .thank_area {
font-size: 12px;
}

#Main img[src*="heart_20250818.png"] {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ef4444' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/%3E%3C/svg%3E");
  width: 14px !important;
  height: 14px !important;
  object-fit: contain;
  vertical-align: -2px !important;
}

#Main .v2p-lite-reply-controls {
display: inline-flex;
    align-items: center;
}

#Main .v2p-lite-reply-action {
position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding: 4px 0;
    margin: 0 3px;
    color: var(--v2p-color-font-tertiary) !important;
    font-size: 0;
    line-height: 1;
    text-decoration: none !important;
    vertical-align: middle;
}

#Main .v2p-lite-reply-action:hover {
color: var(--v2p-color-font-secondary) !important;
}

#Main .v2p-lite-reply-action svg {
display: block;
    width: 14px;
    height: 14px;
    opacity: 1;
}

#Main .v2p-lite-reply-action.v2p-thanked {
color: var(--v2p-color-heart) !important;
cursor: default;
pointer-events: none;
}

#Main .tab {
user-select: none;
    color: var(--v2p-color-foreground);
    background-color: rgba(0, 0, 0, 0);
}

#Main .tab_current {
user-select: none;
    color: var(--v2p-color-bg-content) !important;
    background-color: var(--v2p-color-foreground) !important;
    border-radius: 999px !important;
}

#Main #reply-box.reply-box-sticky {
z-index: var(--zidx-reply-box);
    bottom: 20px;
    overflow: visible;
    margin: 0 -10px;
    padding: 0 22px;
    border: none;
    border-radius: var(--box-border-radius);
    outline: 2px solid var(--v2p-color-border);
}

a.topic-link:active,a.topic-link:link {
line-height: 1.5;
}

#Main #reply-box .flex-one-row:last-of-type {
justify-content: flex-start;
}

#Main #reply-box .flex-one-row:last-of-type .gray {
margin-right: auto;
}

#Main #reply-box > .cell {
font-size: 12px;
}

#Main #reply-box > .cell.flex-one-row {
min-height: 45px;
    padding: 0 10px;
    border: none;
}

#Main #reply-box > .cell.flex-row-end {
padding: 12px 10px;
    border: none;
}

#Main #reply-box > .cell.v2p-reply-form-cell {
padding-top: 0;
}

#Main #reply-box .v2p-lite-reply-footer-icon {
box-sizing: border-box;
width: 28px;
height: 28px;
padding: 0 !important;
line-height: 28px;
text-align: center;
color: var(--v2p-color-font-secondary) !important;
vertical-align: middle;
text-decoration: none !important;
border-radius: 7px;
}

#Main #reply-box .v2p-lite-reply-footer-icon[data-v2p-reply-footer-action="top"] {
display: inline-flex;
align-items: center;
justify-content: center;
}

#Main #reply-box .v2p-lite-reply-footer-icon:hover {
color: var(--v2p-color-foreground) !important;
background-color: var(--v2p-color-bg-block);
}

#Main #reply-box .v2p-lite-reply-footer-icon svg {
display: inline-block;
width: 17px;
height: 17px;
vertical-align: middle;
}

#Main #no-comments-yet {
color: var(--color-gray);
    border-color: var(--color-gray);
}

#Main #notifications .cell[id^="n"]:hover .node {
opacity: 1;
}

#Main #notifications .cell[id^="n"] {
padding: var(--v2p-topic-row-padding) 16px !important;
}

#Main #notifications .cell[id^="n"] .node {
opacity: 0;
}

#Main #notifications .cell[id^="n"] .node:focus-visible {
opacity: 1;
}

#Main #notifications .cell[id^="n"] > table > tbody > tr > td:last-child {
vertical-align: top;
font-size: 13px;
line-height: 1.6;
}

#Main #notifications .cell[id^="n"] .snow,
#Main #notifications .cell[id^="n"] .node {
font-size: 12px;
line-height: 1.6;
}

#Main #notifications .cell[id^="n"] .sep5 {
height: 8px;
}

#Main #notifications .cell[id^="n"] .payload {
margin: 0;
padding: 9px 11px;
font-size: 15px;
line-height: var(--v2p-reply-line-height) !important;
color: var(--v2p-color-foreground);
    background-color: var(--v2p-color-bg-block);
}

#Main #notifications .cell[id^="n"] .payload.v2p-has-embedded-video {
min-width: 50%;
}

#Main #notifications .cell[id^="n"] .topic-link:visited {
color: var(--v2p-color-font-quaternary);
}

#Main #notifications .cell[id^="n"] > table > tbody > tr > td:first-child {
width: 52px !important;
vertical-align: top;
}

#Main #notifications .cell[id^="n"] > table > tbody > tr > td:first-child .avatar {
display: block;
width: 40px !important;
height: 40px !important;
max-height: 40px !important;
margin-top: 2px;
}

#Main .cell_tabs .cell_tab_current {
font-weight: bold;
    border-color: var(--v2p-color-foreground);
}

#Main .cell_tabs .cell_tab {
color: var(--v2p-color-foreground);
}

#Main .cell_tabs .cell_tab:hover {
border-color: var(--v2p-color-border-darker);
}

#Rightbar .v2p-native-theme-toggle-container,
a.light-toggle[href*="/settings/night/toggle"] {
display: none !important;
}

#Rightbar .box .item_node {
font-size: 12px;
    color: var(--v2p-color-font-secondary);
    border-color: var(--v2p-color-border);
    border-radius: 5px;
}

#Rightbar .box .item_node:hover {
box-shadow: var(--v2p-box-shadow);
}

#Rightbar a.dark:is(:link, :active, :visited, :hover) {
color: var(--v2p-color-font-tertiary);
}

#Rightbar a.dark:is(:link, :active, :visited, :hover):hover {
color: var(--v2p-color-font-secondary);
}

#Bottom {
position: sticky;
    top: 100%;
}

#Bottom a.dark {
font-size: 13px;
    font-weight: 400;
}

#Bottom a.dark:is(:link, :active, :visited, :hover) {
color: var(--v2p-color-font-tertiary);
}

.inner table {
table-layout: fixed;
}

html.v2p-theme-dark-default body {
color-scheme: dark;
    --v2p-color-main-50: unset;
    --v2p-color-main-100: #2d333b;
    --v2p-color-main-200: #374151;
    --v2p-color-main-300: #374151;
    --v2p-color-main-350: #6b7280cc;
    --v2p-color-main-400: #6b7280;
    --v2p-color-main-500: #9ca3af;
    --v2p-color-main-600: #9ca3af;
    --v2p-color-main-700: #d1d5db;
    --v2p-color-main-800: #e5e7eb;
    --v2p-color-main-900: #111827;
    --v2p-color-main-950: #030712;
    --v2p-color-border:#2d323c;
    --v2p-color-accent-50: #064e3b;
    --v2p-color-accent-100: #065f46;
    --v2p-color-accent-200: #047857;
    --v2p-color-accent-300: #059669;
    --v2p-color-accent-400: #34d399;
    --v2p-color-accent-500: #34d399;
    --v2p-color-accent-600: #6ee7b7;
    --v2p-color-orange-50: #593600;
    --v2p-color-orange-100: #9a3412;
    --v2p-color-orange-400: #fbe090;
    --v2p-color-background: #1c2128;
    --v2p-color-foreground: #adbac7;
    --v2p-color-font-secondary: var(--v2p-color-main-600);
    --v2p-color-button-background: #373e47;
    --v2p-color-button-foreground: var(--v2p-color-foreground);
    --v2p-color-button-background-hover: #444c56;
    --v2p-color-button-foreground-hover: var(--v2p-color-foreground);
    --v2p-color-bg-content: #22272e;
    --v2p-color-bg-content-rgb: 34, 39, 46;
    --v2p-color-bg-hover-btn: var(--v2p-color-button-background-hover);
    --v2p-color-bg-subtle: #444c56;
    --v2p-color-bg-input: var(--v2p-color-background);
    --v2p-color-bg-search: var(--v2p-color-main-100);
    --v2p-color-bg-search-active: var(--v2p-color-main-200);
    --v2p-color-bg-widget: var(--v2p-color-bg-content);
    --v2p-color-bg-reply: var(--v2p-color-main-100);
    --v2p-color-bg-tooltip: var(--v2p-color-main-100);
    --v2p-color-bg-avatar: var(--v2p-color-main-300);
    --v2p-color-bg-block: #373e47;
    --v2p-color-heart: #ef4444;
    --v2p-color-heart-fill: #fca5a5;
    --v2p-color-mask: rgb(99 110 123 / 40%);
    --v2p-color-border: #444c56;
    --v2p-color-input-border: #444c56;
    --v2p-color-border-darker: #444c56;
    --v2p-box-shadow: 0 3px 5px 0 rgb(0 0 0 / 10%);
    --link-color: var(--v2p-color-foreground);
    --link-visited-color:var(--v2p-color-foreground);
    --box-background-alt-color: var(--v2p-color-main-100);
    --box-background-hover-color: var(--v2p-color-main-300);
    --box-border-color: var(--v2p-color-main-100);
    --button-hover-color: var(--button-background-hover-color);
    --button-border-color: var(--v2p-color-border);
    --button-border-hover-color: #768390;

    visibility: visible;
}

html.v2p-theme-dark-default #Logo {
filter: invert(1) brightness(0.9) contrast(0.9);
}

html.v2p-theme-dark-default::selection,
html.v2p-theme-dark-default body::selection {
color: var(--v2p-color-background, #1c2128);
    background-color: var(--v2p-color-foreground, #adbac7);
}

html.v2p-theme-dark-default img::selection,
html.v2p-theme-dark-default body img::selection {
background-color: var(--v2p-color-foreground, #adbac7);
}

html.v2p-theme-dark-default #Top {
background-color: rgba(0, 0, 0, 0);
}

html.v2p-theme-dark-default #Main .cell .item_title .topic-link {
font-weight: normal !important;
}

html.v2p-theme-dark-default #search-container::before {
background-image: url("/static/img/search_icon_light.png");
}

html.v2p-theme-dark-default #Main #Tabs .tab,
html.v2p-theme-dark-default #Tabs .tab {
color: var(--v2p-color-foreground) !important;
        background-color: transparent;
}

html.v2p-theme-dark-default #Main #Tabs .tab:hover,
html.v2p-theme-dark-default #Tabs .tab:hover {
background-color: var(--v2p-color-bg-block);
}

html.v2p-theme-dark-default #Main #Tabs .tab_current,
html.v2p-theme-dark-default #Tabs .tab_current {
color: #fff !important;
        background-color: var(--v2p-color-accent-500) !important;
        border: none !important;
}

html.v2p-theme-dark-default .count_livid,
html.v2p-theme-dark-default #Main .cell .count_livid,
html.v2p-theme-dark-default a.count_livid {
color: var(--v2p-color-button-foreground) !important;
        background-color: var(--v2p-color-bg-block) !important;
        border: none !important;
}

html.v2p-theme-dark-default #menu-body {
background-color: var(--v2p-color-bg-content) !important;
        border: 1px solid var(--v2p-color-border) !important;
        box-shadow: 0 5px 15px rgba(0,0,0,0.5) !important;
}

html.v2p-theme-dark-default #menu-body .cell a,
html.v2p-theme-dark-default #menu-body .cell a.top {
color: var(--v2p-color-foreground) !important;
        background-color: transparent !important;
}

html.v2p-theme-dark-default #menu-body img.tool-icon {
filter: brightness(0.8);
}

html.v2p-theme-dark-default .no {
background-color:var(--v2p-color-main-100);
         margin-top:-3px;
         border-radius:99px;
}

html.v2p-theme-dark-default .badge.pro {
color: #6ee7b7 !important;
         background-color: #064e3b !important;
         border-color: #34d399 !important;
}

.cell.item > table > tbody > tr > td:nth-child(2) {
width: 10px !important;
    max-width: 15px !important;
}

.v2p-indent .v2p-member-ref {
display: none;
}

.v2p-member-ref + br {
display: none;
}

.v2p-member-ref + br + b {
display: none;
}

.v2p-member-ref.v2p-member-ref-show {
display: inline;
}

@media (max-width: 768px) {
  html,
  body {
    width: 100% !important;
    min-width: 0 !important;
  }

  body #Top .content,
  body #Wrapper > .content,
  body #Bottom .content {
    width: 100% !important;
    max-width: none !important;
    min-width: 0 !important;
    box-sizing: border-box;
    padding-right: 12px !important;
    padding-left: 12px !important;
  }

  body #Wrapper > .content {
    display: flex !important;
    flex-direction: column;
    gap: 12px;
  }

  body #Main,
  body #Rightbar {
    float: none !important;
    width: 100% !important;
    max-width: none !important;
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  body #Main {
    order: 1;
  }

  body #Rightbar {
    order: 2;
  }

  body #Top .site-nav {
    min-width: 0;
  }

  body #Top .tools {
    min-width: 0;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scrollbar-width: none;
  }

  body #Top .tools::-webkit-scrollbar {
    display: none;
  }

  body #Top .tools .top {
    flex: 0 0 auto;
  }

  body #Top .tools .top,
  #Main #Tabs .tab,
  #Main #Tabs .tab_current,
  body :is(.page_normal, .page_current) {
    min-height: 44px !important;
  }

  body :is(.page_normal, .page_current) {
    min-width: 44px !important;
    height: 44px !important;
  }

  #v2p-lite-theme-toggle {
    flex-basis: 44px !important;
    width: 44px !important;
    height: 44px !important;
    padding: 13px !important;
  }

  #Main .cell .item_title .topic-link {
    font-size: 16px;
  }

  body #Main .box:has(.topic_content) .header > h1 {
    font-size: 21px;
  }

  #Main .cell[id^="r"] {
    padding-right: 5px !important;
    padding-left: 5px !important;
  }

  #Main .reply_content {
    overflow-wrap: break-word;
    font-size: 16px !important;
    line-height: var(--v2p-reading-line-height) !important;
  }

  #Main .cell[id^="r"] > table ~ .cell[id^="r"] {
    margin: 10px 0 0 5px;
    padding: var(--v2p-tp-nested-pd);
  }

  #Main .cell[id^="r"] > table ~ .cell[id^="r"] .cell[id^="r"].v2p-indent {
    margin: 8px 0 0 5px;
    padding: 8px 5px 2px 8px;
  }

  #Main .cell[id^="r"] > table ~ .cell[id^="r"] tr td:first-of-type {
    width: 28px !important;
  }

  #Main .cell[id^="r"] > table ~ .cell[id^="r"] .avatar {
    width: 20px !important;
    height: 20px !important;
  }

  #Main .cell[id^="r"] > table ~ .cell[id^="r"] .ago {
    font-size: 10px !important;
  }

}

/* V2EX serves a separate mobile template (#site-header and no native #Main).
   Scope this to that template, including landscape/tablet widths. */
html.v2p-mobile {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
html.v2p-mobile #site-header {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) 44px 44px;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  min-height: 56px;
  padding: calc(6px + env(safe-area-inset-top, 0px)) max(12px, env(safe-area-inset-right, 0px)) 6px max(12px, env(safe-area-inset-left, 0px));
  color: var(--v2p-color-font-primary);
  background: var(--v2p-color-bg-content);
  border-bottom: 1px solid var(--box-border-color);
}
html.v2p-mobile #site-header #site-header-logo { display: flex; align-items: center; width: 90px; height: 40px; margin: 0; }
html.v2p-mobile #site-header #LogoMobile { width: 86px !important; height: 32px !important; background-size: contain !important; background-position: center; }
html.v2p-mobile.v2p-theme-dark-default #LogoMobile { filter: invert(1) brightness(0.9) contrast(0.9); }
html.v2p-mobile #site-header #search-container {
  position: relative;
  box-sizing: border-box;
  min-width: 0;
  width: 100%;
  height: 36px;
  margin: 0;
  padding: 0 6px 0 28px;
  background: var(--v2p-color-bg-block);
  border-radius: 12px;
}
html.v2p-mobile #site-header #search {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: 34px;
  font-size: 16px;
  background-color: transparent;
}
html.v2p-mobile #site-header #v2p-lite-theme-toggle {
  width: 44px !important;
  height: 44px !important;
  padding: 13px !important;
}
html.v2p-mobile #site-header #site-header-menu { position: relative; width: 44px; height: 44px; padding: 0; margin: 0; }
html.v2p-mobile #site-header #site-header-menu #menu-entry {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 8px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: inherit;
}
html.v2p-mobile #menu-entry img.menu-guest { display: none; }
html.v2p-mobile #menu-entry .avatar { width: 28px !important; height: 28px !important; max-height: 28px !important; }
html.v2p-mobile #site-header #site-header-menu #menu-body {
  position: absolute;
  left: auto;
  right: 0;
  top: 48px;
  width: min(260px, calc(100vw - 24px));
  box-sizing: border-box;
  z-index: 1000;
  padding: 6px;
  border: 1px solid var(--box-border-color);
  border-radius: 14px;
  background: var(--v2p-color-bg-content);
  box-shadow: var(--v2p-widget-shadow);
}
html.v2p-mobile #menu-body .cell { padding: 0; border: none; }
html.v2p-mobile #menu-body a.top:not([hidden]) {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 12px;
  color: var(--v2p-color-font-secondary);
  border-radius: 10px;
}
html.v2p-mobile #menu-body .v2p-lite-topnav-icon svg { width: 16px; height: 16px; flex: 0 0 16px; }
html.v2p-mobile #Wrapper > #Main.content {
  display: block !important;
  float: none;
  width: 100% !important;
  max-width: none !important;
  min-width: 0;
  box-sizing: border-box;
  margin: 0 !important;
  padding: 0 12px !important;
}
html.v2p-mobile #Main .cell[id^="r"] > table { width: 100%; table-layout: fixed; }
html.v2p-mobile #Main .cell[id^="r"] > table > tbody > tr > td:first-child {
  width: 28px !important;
  min-width: 28px;
  vertical-align: top;
}
html.v2p-mobile #Main .cell[id^="r"] > table > tbody > tr > td:nth-child(2) { width: 10px !important; }
html.v2p-mobile #Main .cell[id^="r"] > table > tbody > tr > td:nth-child(3) { width: auto; min-width: 0; }
html.v2p-mobile #Main .cell[id^="r"] > table > tbody > tr > td:first-child .avatar {
  display: block;
  width: 28px !important;
  height: 28px !important;
  max-width: 28px !important;
  max-height: 28px !important;
  margin: 0;
}
html.v2p-mobile #Main .reply_content { overflow-wrap: anywhere; }
html.v2p-mobile #Main .cell[id^="r"] .cell[id^="r"] { margin-left: 4px; }
html.v2p-mobile #Main .cell[id^="r"] .cell[id^="r"] .cell[id^="r"] { margin-left: 0; }
/* Reserve space for the floated topic author even when the title wraps. */
html.v2p-mobile #Main .box:has(.topic_content) .header { display: flow-root; }
html.v2p-mobile #Main .box:has(.topic_content) .header > .fr { margin: 0 0 8px 12px; width: 30px; }
html.v2p-mobile #Main .header .avatar { width: 30px !important; height: 30px !important; max-height: 30px !important; display: block; }
html.v2p-mobile body #Main .box:has(.topic_content) .header > h1 {
  margin-right: 42px; font-size: 18px; line-height: 1.4; overflow-wrap: anywhere;
}
html.v2p-mobile #Main .header > small { display: block; font-size: 11px; line-height: 1.5; overflow-wrap: anywhere; }
html.v2p-mobile #Main .topic_content,
html.v2p-mobile #Main .reply_content { font-size: 15px !important; line-height: 1.6 !important; }
html.v2p-mobile #Main .cell .item_title,
html.v2p-mobile #Main .cell .item_title .topic-link { font-size: 15px; line-height: 1.5; }
html.v2p-mobile #Main .small { font-size: 11px; }
html.v2p-mobile #site-header #site-header-menu #menu-body a.top:not([hidden]) { display: flex; align-items: center; font-size: 14px !important; gap: 10px; }
html.v2p-mobile #site-header #menu-body a.top[hidden] { display: none !important; }
html.v2p-mobile #Main .box:has(#Tabs) { border-radius: var(--v2p-box-radius) !important; }
html.v2p-mobile #Main #Tabs { flex-wrap: nowrap; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; border-radius: var(--v2p-box-radius) var(--v2p-box-radius) 0 0 !important; }
html.v2p-mobile #Main #Tabs > a { flex: 0 0 auto; }
html.v2p-mobile #Main #Tabs::-webkit-scrollbar { display: none; }
html.v2p-mobile #Main .box:has(#Tabs) > :first-child { border-top-left-radius: inherit; border-top-right-radius: inherit; }


/* Mobile density: override native menu padding and desktop reading spacing. */
html.v2p-mobile #site-header { background: transparent !important; border: 0 !important; box-shadow: none !important; }
html.v2p-mobile #site-header #site-header-menu #menu-body { width: min(220px, calc(100vw - 24px)); padding: 4px; max-height: calc(100dvh - 76px); overflow-y: auto; }
html.v2p-mobile #site-header #site-header-menu #menu-body .cell { padding: 0; margin: 0; border: 0; }
html.v2p-mobile #site-header #site-header-menu #menu-body .cell + .cell { border-top: 1px solid var(--box-border-color); }
html.v2p-mobile #site-header #site-header-menu #menu-body a.top:not([hidden]) {
  box-sizing: border-box; min-height: 34px; height: auto; line-height: 20px;
  padding: 7px 10px; margin: 0; gap: 8px; border-radius: 6px;
}
/* Translucent mobile menu: solid fallback when backdrop blur is unavailable. */
html.v2p-mobile #site-header #site-header-menu #menu-body {
  --v2p-menu-glass: rgba(255, 255, 255, .72);
  --v2p-menu-edge: rgba(255, 255, 255, .65);
  --v2p-menu-highlight: rgba(255, 255, 255, .48);
  --v2p-menu-separator: rgba(70, 80, 95, .12);
  border-color: var(--v2p-menu-edge);
  box-shadow: 0 12px 32px rgba(20, 30, 45, .16), inset 0 1px 0 var(--v2p-menu-highlight);
}
html.v2p-mobile.v2p-theme-dark-default #site-header #site-header-menu #menu-body {
  --v2p-menu-glass: rgba(35, 39, 47, .78);
  --v2p-menu-edge: rgba(255, 255, 255, .14);
  --v2p-menu-highlight: rgba(255, 255, 255, .08);
  --v2p-menu-separator: rgba(255, 255, 255, .10);
}
@supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
  html.v2p-mobile #site-header #site-header-menu #menu-body {
    background: var(--v2p-menu-glass) !important;
    -webkit-backdrop-filter: blur(24px) saturate(150%);
    backdrop-filter: blur(24px) saturate(150%);
  }
}
html.v2p-mobile #site-header #site-header-menu #menu-body .cell { background: transparent !important; }
html.v2p-mobile #site-header #site-header-menu #menu-body .cell + .cell { border-top-color: var(--v2p-menu-separator); }
@media (prefers-reduced-transparency: reduce) {
  html.v2p-mobile #site-header #site-header-menu #menu-body {
    background: var(--v2p-color-bg-content) !important;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}

html.v2p-mobile #Wrapper > #Main.content { padding: 0 8px !important; }
html.v2p-mobile #Main > .box { padding: 0 8px !important; }
html.v2p-mobile #Main #Tabs { padding: 5px 0 !important; gap: 3px; }
html.v2p-mobile #Main #Tabs :is(.tab,.tab_current) { min-height: 32px !important; padding: 4px 8px !important; margin: 0; font-size: 12px; line-height: 20px; }
html.v2p-mobile #Main .cell.item:has(.item_title > .topic-link) { padding: 16px 0 !important; }
html.v2p-mobile #Main .cell.item tr > td:first-child { width: 30px !important; }
html.v2p-mobile #Main .cell.item tr > td:nth-child(2) { width: 8px !important; }
html.v2p-mobile #Main .cell.item .avatar { width: 30px !important; height: 30px !important; max-height: 30px !important; }
html.v2p-mobile #Main .cell.item .item_title { display: block; margin: 6px 0 8px !important; }
html.v2p-mobile #Main .cell.item :is(.item_title,.topic-link) { line-height: 1.4 !important; }
html.v2p-mobile #Main .cell.item :is(.topic_info,.small) { line-height: 1.4; margin-top: 3px; }
html.v2p-mobile #Main :is(a.node,.item_node) { font-size: 10px !important; line-height: 16px; padding: 0 5px !important; }
html.v2p-mobile #Main :is(.topic_content,.reply_content) { line-height: 1.5 !important; }
html.v2p-mobile #Main .topic_content p { margin: 0 0 10px; }
html.v2p-mobile #Main #reply-box.reply-box-sticky { margin: 0; padding: 0 8px; bottom: 8px; }
/* Only the composer identity is redundant; keep authors in actual replies. */
html.v2p-mobile #Main #reply-box > .cell > a[href^="/member/"],
html.v2p-mobile #Main #reply-box > .cell > .avatar,
html.v2p-mobile #Main #reply-box > .cell > :is(.flex-one-row,.gray):has(a[href^="/member/"]):not(:has(form,textarea,button)),
html.v2p-mobile #Main #reply-box > .cell.flex-one-row:has(a[href^="/member/"]):not(:has(form,textarea,button)) { display: none !important; }

html.v2p-mobile #menu-body .v2p-lite-activity-source { display: none !important; }
html.v2p-mobile #menu-entry.v2p-lite-activity-avatar { position: relative; }
html.v2p-mobile #menu-entry .v2p-lite-activity-avatar-ring { width: 36px; height: 36px; }

/* Keep breathing room between mobile cards without loosening list rows. */
html.v2p-mobile #Main > .box { padding-top: 10px !important; padding-bottom: 10px !important; margin-top: 6px; margin-bottom: 16px !important; }
html.v2p-mobile #Main #reply-box.reply-box-sticky { padding-top: 12px !important; padding-bottom: 12px !important; margin-top: 16px; margin-bottom: 16px; }
/* Native composer identity can be nested in an unclassified div/span.
   Hide only identity branches; retain docking controls, form and preview. */
html.v2p-mobile #reply-box > .cell :is(div,span,a):has(> img.avatar):not(:has(form,textarea,button,input)),
html.v2p-mobile #reply-box > .cell :is(div,span):has(> a > img.avatar):not(:has(form,textarea,button,input)),
html.v2p-mobile #reply-box > .cell img.avatar,
html.v2p-mobile #reply-box > .cell a[href^="/member/"]:not(form a) { display: none !important; }

/* Let the reply count use only its intrinsic width instead of native 70px. */
html.v2p-mobile #Main .cell.item tr > td:last-child { width: 1% !important; white-space: nowrap; padding-left: 8px; }
html.v2p-mobile #Main > .box,
html.v2p-mobile #Main #reply-box.reply-box-sticky { padding-left: 13px !important; padding-right: 13px !important; }

html.v2p-mobile #Main .cell.item .v2p-mobile-topic-text { vertical-align: top; }
html.v2p-mobile #Main .cell.item .v2p-mobile-topic-text .item_title { margin: 0 0 8px !important; }
html.v2p-mobile #Main .cell.item .v2p-mobile-topic-meta { display: block; margin: 0; line-height: 1.6; }
html.v2p-mobile #Main .cell.item .v2p-mobile-topic-meta a[href^="/member/"] { font-weight: 400; }
html.v2p-mobile #Main .cell.item tr > td:last-child { vertical-align: top; }
html.v2p-mobile #Main .cell[id^="r"] { padding-top: 12px !important; padding-bottom: 12px !important; }

html.v2p-mobile #Main .v2p-topic-icon-action {
  display: inline-flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; padding: 0 !important; border: 0;
  background: transparent; box-sizing: border-box; border-radius: 8px;
  color: transparent !important; font-size: 0 !important;
  background-image: var(--v2p-action-image) !important;
  background-repeat: no-repeat !important; background-position: center !important; background-size: 18px 18px !important;
}
html.v2p-mobile #Main :is(.v2p-topic-icon-action,.v2p-topic-tag-icon,.v2p-topic-chat-link) svg { width: 18px; height: 18px; flex: 0 0 18px; vertical-align: middle; }
html.v2p-mobile #Main .v2p-topic-chat-link::before,
html.v2p-mobile #Main .v2p-topic-chat-container::before { content: none !important; }
html.v2p-mobile #Main .v2p-topic-chat-link { display: inline-flex; align-items: center; gap: 6px; }
html.v2p-mobile #Main .v2p-mobile-compose-actions { display: flex; align-items: center; gap: 8px; width: 100%; }
html.v2p-mobile #Main .v2p-mobile-compose-actions > :is(button[type="submit"],input[type="submit"]) { flex: 1 1 auto; min-width: 0; width: auto !important; margin: 0 !important; }
html.v2p-mobile #Main .v2p-mobile-compose-actions > .v2p-lite-emoji-trigger { flex: 0 0 36px; width: 36px; height: 36px; margin: 0; }

html.v2p-hide-reply-floor #Main .cell[id^="r"] .no {
display: none !important;
}

.wwads-cn {
border: none !important;
    box-shadow: none !important;
}

html:not(.v2p-show-ads) #pro-campaign-container,
html:not(.v2p-show-ads) .pro-unit-title,
html:not(.v2p-show-ads) .pro-unit-img,
html:not(.v2p-show-ads) .pro-unit-description,
html:not(.v2p-show-ads) .pro-unit-cta-container,
html:not(.v2p-show-ads) .pro-unit-from,
html:not(.v2p-show-ads) ins.adsbygoogle,
html:not(.v2p-show-ads) div:has(> ins.adsbygoogle),
html:not(.v2p-show-ads) script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"] {
display: none !important;
}

html:not(.v2p-show-ads) .box.v2p-advertise-box {
display: none !important;
}

html.v2p-hide-emoji-picker .v2p-lite-emoji-trigger,
html.v2p-hide-emoji-picker .v2p-lite-emoji-panel {
  display: none !important;
}

html.v2p-hide-node-icons #Tabs .tab svg,
html.v2p-hide-node-icons #Tabs .tab_current svg {
  display: none !important;
}

html.v2p-hide-node-icons #Tabs a[aria-label="Planet"]::after {
  content: attr(aria-label);
}

.v2p-lite-topic-tool-placeholder {
  display: none;
}

#Rightbar .v2p-lite-topic-tools.cell {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  align-items: center;
  margin: 10px -10px -10px;
  padding: 10px !important;
  border-top: 1px solid var(--box-border-color) !important;
  border-bottom: 0 !important;
}

#Rightbar > .box.v2p-lite-topic-tool-card > .cell {
  border-top: 0 !important;
  border-bottom: 0 !important;
}

#Rightbar > .box.v2p-lite-topic-tool-card > .cell.v2p-lite-topic-tools {
  border-top: 1px solid var(--box-border-color) !important;
}

#Rightbar > .box.v2p-lite-member-card > .cell:first-child,
#Rightbar > .box:has(#member-activity) > .cell:first-child {
  border-bottom: 0 !important;
}

#Rightbar .v2p-lite-member-stats,
#Rightbar table:has(a[href="/my/nodes"]):has(a[href="/my/topics"]):has(a[href="/my/following"]) {
  width: 100%;
  box-sizing: border-box;
  margin-top: 4px;
  border: 1px solid #f2f2f2;
  border-radius: 999px;
  border-collapse: separate;
  border-spacing: 1px;
  table-layout: fixed;
  background: #f7f7f7;
}

html.v2p-theme-dark-default #Rightbar .v2p-lite-member-stats,
html.v2p-theme-dark-default #Rightbar table:has(a[href="/my/nodes"]):has(a[href="/my/topics"]):has(a[href="/my/following"]) {
  border-color: #343b45;
  background: #292f36;
}

#Rightbar .v2p-lite-member-stats td,
#Rightbar table:has(a[href="/my/nodes"]):has(a[href="/my/topics"]):has(a[href="/my/following"]) td {
  padding: 0 !important;
  border: 0 !important;
}

#Rightbar .v2p-lite-member-stat,
#Rightbar table:has(a[href="/my/nodes"]):has(a[href="/my/topics"]):has(a[href="/my/following"]) a[href^="/my/"] {
  display: flex !important;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-width: 0;
  height: 26px;
  box-sizing: border-box;
  border-radius: 999px;
  color: var(--v2p-color-font-secondary) !important;
  text-decoration: none !important;
  transition: color 0.15s ease, background-color 0.15s ease;
}

#Rightbar .v2p-lite-member-stat:hover,
#Rightbar table:has(a[href="/my/nodes"]):has(a[href="/my/topics"]):has(a[href="/my/following"]) a[href^="/my/"]:hover {
  color: var(--v2p-color-foreground) !important;
  background: var(--v2p-color-bg-hover-btn);
}

#Rightbar table:has(a[href="/my/nodes"]):has(a[href="/my/topics"]):has(a[href="/my/following"]) a[href^="/my/"]::before {
  content: "";
  flex: 0 0 auto;
  width: 14px;
  height: 14px;
  background: currentColor;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
}

#Rightbar table:has(a[href="/my/nodes"]):has(a[href="/my/topics"]):has(a[href="/my/following"]) a[href="/my/nodes"]::before {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");
}

#Rightbar table:has(a[href="/my/nodes"]):has(a[href="/my/topics"]):has(a[href="/my/following"]) a[href="/my/topics"]::before {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E");
}

#Rightbar table:has(a[href="/my/nodes"]):has(a[href="/my/topics"]):has(a[href="/my/following"]) a[href="/my/following"]::before {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 21a8 8 0 0 1 13.29-6'/%3E%3Ccircle cx='10' cy='8' r='5'/%3E%3Cpath d='m16 19 2 2 4-4'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 21a8 8 0 0 1 13.29-6'/%3E%3Ccircle cx='10' cy='8' r='5'/%3E%3Cpath d='m16 19 2 2 4-4'/%3E%3C/svg%3E");
}

#Rightbar table:has(a[href="/my/nodes"]):has(a[href="/my/topics"]):has(a[href="/my/following"]) .sep3,
#Rightbar table:has(a[href="/my/nodes"]):has(a[href="/my/topics"]):has(a[href="/my/following"]) .fade {
  display: none !important;
}

#Rightbar .v2p-lite-member-stat .bigger,
#Rightbar table:has(a[href="/my/nodes"]):has(a[href="/my/topics"]):has(a[href="/my/following"]) .bigger {
  min-width: 1ch;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  font-variant-numeric: tabular-nums;
}

#Rightbar > .box:has(#member-activity) > .cell > a[href="/notifications"] {
  display: none !important;
}

#Rightbar > .box:has(#member-activity) > .cell:has(> a[href="/notifications"]):not(:has(.balance_area)):not(:has(a[href="/balance"])) {
  display: none !important;
}

#Rightbar > .box:has(#member-activity) > .cell:has(.balance_area),
#Rightbar > .box:has(#member-activity) > .cell:has(a[href="/balance"]) {
  display: flex !important;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  box-sizing: border-box;
  padding: 8px 16px 12px !important;
  border: 0 !important;
}

#Rightbar > .box:has(#member-activity) > .cell:has(.balance_area) > .spacer,
#Rightbar > .box:has(#member-activity) > .cell:has(a[href="/balance"]) > .spacer {
  display: none !important;
}

#Rightbar > .box:has(#member-activity) .balance_area,
#Rightbar > .box:has(#member-activity) a[href="/balance"] {
  display: inline-flex !important;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  padding: 3px 4px;
  color: var(--v2p-color-font-secondary) !important;
  background: transparent !important;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  text-decoration: none !important;
}

#Rightbar .v2p-lite-balance-wallet {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--v2p-color-font-tertiary);
}

#Rightbar .v2p-lite-balance-wallet svg {
  width: 16px;
  height: 16px;
  stroke-width: 1.8;
}

#Rightbar .v2p-lite-balance-unit {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  color: var(--v2p-color-font-secondary);
  font-size: 13px;
  font-weight: 550;
  line-height: 18px;
  font-variant-numeric: tabular-nums;
}

#Rightbar .v2p-lite-balance-dot {
  display: inline-block;
  width: 9px;
  height: 9px;
  box-sizing: border-box;
  border: 1px solid currentColor;
  border-radius: 50%;
  background: color-mix(in srgb, currentColor 24%, transparent);
}

#Rightbar .v2p-lite-balance-unit[data-kind="gold"] .v2p-lite-balance-dot {
  color: #d6a927;
}

#Rightbar .v2p-lite-balance-unit[data-kind="silver"] .v2p-lite-balance-dot {
  color: #9aa3af;
}

#Rightbar .v2p-lite-balance-unit[data-kind="bronze"] .v2p-lite-balance-dot {
  color: #d97745;
}

#Rightbar .v2p-lite-balance-extra {
  display: none !important;
}

#Rightbar > .sep:has(+ .box a[href="/write"] img[src*="compose"]),
#Rightbar > .box:has(a[href="/write"] img[src*="compose"]):has(a[href*="edge.v2ex.com/chat"]) {
  display: none !important;
}

#Rightbar > .v2p-lite-member-shortcuts-source {
  display: none !important;
}

#Rightbar .v2p-lite-member-shortcuts.cell {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 12px 16px 14px !important;
  border: 0 !important;
  border-top: 1px solid var(--box-border-color) !important;
}

#Rightbar .v2p-lite-member-shortcuts.v2p-single-shortcut {
  grid-template-columns: minmax(0, 1fr);
}

#Rightbar .v2p-lite-member-shortcut {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 0;
  height: 34px;
  box-sizing: border-box;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 999px;
  color: var(--v2p-color-font-secondary) !important;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  text-decoration: none !important;
}

#Rightbar .v2p-lite-member-shortcut-write {
  border-color: #d1fae5;
  color: #047857 !important;
  background: #ecfdf5;
}

#Rightbar .v2p-lite-member-shortcut-chat {
  border-color: #dbeafe;
  color: #2563eb !important;
  background: #eff6ff;
}

html.v2p-theme-dark-default #Rightbar .v2p-lite-member-shortcut-write {
  border-color: #1d5747;
  color: #6ee7b7 !important;
  background: #123b31;
}

html.v2p-theme-dark-default #Rightbar .v2p-lite-member-shortcut-chat {
  border-color: #264b75;
  color: #93c5fd !important;
  background: #172f4f;
}

#Rightbar .v2p-lite-member-shortcut-write:hover {
  border-color: #a7f3d0;
  background: #d1fae5;
}

#Rightbar .v2p-lite-member-shortcut-chat:hover {
  border-color: #bfdbfe;
  background: #dbeafe;
}

html.v2p-theme-dark-default #Rightbar .v2p-lite-member-shortcut-write:hover {
  border-color: #28745f;
  background: #17483b;
}

html.v2p-theme-dark-default #Rightbar .v2p-lite-member-shortcut-chat:hover {
  border-color: #356495;
  background: #1d3b61;
}

#Rightbar .v2p-lite-member-shortcut svg {
  flex: 0 0 auto;
  width: 15px;
  height: 15px;
  stroke-width: 1.8;
}

#Rightbar .v2p-lite-member-shortcut span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#Rightbar #member-activity.v2p-lite-activity-source,
#Rightbar > .box #member-activity {
  display: none !important;
}

.v2p-lite-activity-avatar,
#Rightbar > .box:has(#member-activity) > .cell:first-child table:first-of-type a:has(> img.avatar) {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  vertical-align: top;
}

.v2p-lite-activity-avatar-ring {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  overflow: visible;
  pointer-events: none;
  transform: translate(-50%, -50%) rotate(-90deg);
}

.v2p-lite-activity-avatar-ring circle {
  fill: none;
  stroke-width: 2.5;
}

.v2p-lite-activity-avatar-track {
  stroke: var(--v2p-color-divider);
}

.v2p-lite-activity-avatar-progress {
  stroke-linecap: round;
}

.v2p-lite-activity-avatar .avatar,
#Rightbar > .box:has(#member-activity) > .cell:first-child table:first-of-type a:has(> img.avatar) .avatar {
  position: relative;
  z-index: 2;
  display: block;
}

#Rightbar > .box.v2p-lite-topic-tool-card > .cell td {
  border-left: 0 !important;
  border-right: 0 !important;
}

.v2p-lite-notification-icon {
  position: relative;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  box-sizing: border-box;
  margin-left: 5px;
  color: var(--v2p-color-font-secondary) !important;
  vertical-align: middle;
}

.v2p-lite-notification-icon svg {
  width: 15px;
  height: 15px;
  opacity: 0.5;
}

.v2p-lite-notification-icon.v2p-has-unread svg {
  opacity: 0.7;
}

.v2p-lite-notification-badge {
  position: absolute;
  top: -2px;
  right: -3px;
  z-index: 2;
  display: none;
  align-items: center;
  justify-content: center;
  min-width: 14px;
  height: 14px;
  box-sizing: border-box;
  padding: 0 3px;
  border-radius: 999px;
  color: #fff;
  background: #ff3b30;
  box-shadow: 0 0 0 1.5px var(--v2p-color-bg-content);
  font-size: 9px;
  font-weight: 650;
  line-height: 14px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  pointer-events: none;
}

.v2p-lite-notification-icon.v2p-has-unread .v2p-lite-notification-badge {
  display: inline-flex;
}

.v2p-lite-checkin-icon {
  appearance: none;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  box-sizing: border-box;
  margin: 0 0 0 3px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: var(--v2p-color-font-secondary);
  background: transparent;
  vertical-align: middle;
  opacity: 0.45;
  cursor: pointer;
}

.v2p-lite-checkin-icon:hover {
  background: var(--v2p-color-bg-hover-btn);
  opacity: 1;
}

.v2p-lite-checkin-icon[data-state="available"] {
  color: var(--v2p-color-orange-400);
  opacity: 1;
}

.v2p-lite-checkin-icon[data-state="claimed"] {
  color: var(--v2p-color-accent-500);
  opacity: 1;
}

.v2p-lite-checkin-icon[data-state="error"] {
  color: var(--v2p-color-error);
  opacity: 0.9;
}

.v2p-lite-checkin-icon[data-state="checking"] {
  cursor: progress;
  opacity: 0.65;
}

.v2p-lite-checkin-icon svg {
  width: 15px;
  height: 15px;
}

.v2p-lite-topic-tool {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-width: 0;
  padding: 5px 2px;
  overflow: hidden;
  font: inherit;
  font-size: 12px;
  line-height: 18px;
  color: var(--v2p-color-font-secondary);
  white-space: nowrap;
  background: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

.v2p-lite-topic-tool:hover,
.v2p-lite-topic-tool:focus-visible {
  color: var(--v2p-color-button-foreground-hover);
  background-color: var(--v2p-color-bg-hover-btn);
  outline: none;
}

.v2p-lite-topic-tool[aria-expanded="true"] {
  color: var(--v2p-color-accent-600);
  background-color: transparent;
}

.v2p-lite-topic-tool svg {
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
  stroke-width: 1.75;
}

#Rightbar .v2p-lite-topic-tool-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 5px;
  align-items: center;
  margin: 0 -10px -10px;
  padding: 0 10px 10px;
  color: var(--v2p-color-foreground);
}

#Rightbar .v2p-lite-topic-tool-card.v2p-topic-toolbar-expanded > .v2p-lite-topic-tools {
  margin-bottom: 0;
}

.v2p-lite-topic-tool-panel[hidden] {
  display: none !important;
}

.v2p-lite-topic-menu-item {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 6px 2px;
  font: inherit;
  font-size: 12px;
  line-height: 16px;
  color: var(--v2p-color-font-secondary);
  white-space: nowrap;
  background: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

.v2p-lite-topic-menu-item svg {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  stroke-width: 1.75;
}

.v2p-lite-topic-menu-item span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v2p-lite-topic-menu-item:hover,
.v2p-lite-topic-menu-item:focus-visible {
  color: var(--v2p-color-button-foreground-hover);
  background-color: var(--v2p-color-bg-hover-btn);
  outline: none;
}

.v2p-lite-decode-block {
  margin-left: 4px;
  color: var(--v2p-color-font-tertiary);
}

.v2p-lite-decode {
  color: var(--v2p-color-accent-600);
  overflow-wrap: anywhere;
  cursor: copy;
}

.v2p-lite-toast {
  position: fixed;
  z-index: 2147483647;
  top: 58px;
  left: 50%;
  max-width: min(460px, calc(100vw - 32px));
  box-sizing: border-box;
  padding: 9px 14px;
  transform: translateX(-50%);
  font-size: 13px;
  line-height: 20px;
  color: var(--v2p-color-bg-content);
  text-align: center;
  background-color: var(--v2p-color-foreground);
  border-radius: 8px;
  box-shadow: var(--v2p-widget-shadow);
}

@media (min-width: 901px) {
  .v2p-lite-topic-tool-placeholder {
    display: block;
    min-width: 0;
  }

  #Rightbar > .box.v2p-lite-topic-tool-card {
    position: fixed !important;
    z-index: var(--zidx-tools-card);
    top: var(--v2p-lite-topic-card-top) !important;
    left: var(--v2p-lite-topic-card-left) !important;
    width: var(--v2p-lite-topic-card-width) !important;
    max-height: calc(100vh - 24px);
    box-sizing: border-box;
    margin: 0 !important;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  html.v2p-unpin-topic-card .v2p-lite-topic-tool-placeholder {
    display: none !important;
  }

  html.v2p-unpin-topic-card #Rightbar > .box.v2p-lite-topic-tool-card {
    position: static !important;
    width: auto !important;
    max-height: none;
    margin-bottom: 10px !important;
    overflow: visible;
  }
}

#v2p-lite-theme-toggle {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 25px !important;
  height: 25px !important;
  box-sizing: border-box !important;
  padding: 5px !important;
  border-radius: 50% !important;
  color: var(--v2p-color-font-secondary) !important;
  text-decoration: none !important;
}
#v2p-lite-theme-toggle:hover {
  opacity: 1 !important;
  background-color: var(--v2p-color-bg-hover-btn, rgba(0, 0, 0, 0.08)) !important;
}
#v2p-lite-theme-toggle.v2p-lite-floating {
  position: fixed !important;
  right: 12px !important;
  bottom: 12px !important;
  z-index: 2147483647 !important;
  background-color: rgba(var(--v2p-color-bg-content-rgb), 0.85) !important;
  border: 1px solid var(--box-border-color) !important;
  box-shadow: var(--v2p-widget-shadow) !important;
  backdrop-filter: blur(12px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(12px) saturate(180%) !important;
}
`;

  let settingsSnapshot = null;
  let settingsLoad = null;
  let settingsRevision = 0;
  let appliedDisplaySettings = {};

  let bootObserver = null;
  let bootSyncScheduled = false;
  let pageInitialized = false;
  let nestedReplyApplied = false;
  let nestedReplyRoot = null;
  let nestedReplyAnchor = null;
  let nestedReplyOrder = [];
  let emojiPickerEnabled = true;
  let replySubmitShortcutBound = false;
  let editorImageUploadObserver = null;
  let editorImageUploadStopTimer = null;
  let topicToolsInitialized = false;
  let defaultReplyToolbarExpanded = null;
  let dailyCheckinRunning = false;
  let dailyCheckinTimer = null;
  let topicMemberRefsVisible = false;
  let topicBase64Decoded = false;
  let liteToastTimer = null;
  let nativeNight = null;
  let nativeToggleOnceUsed = false;
  let nativeNightSyncQueue = Promise.resolve();

  docEl.classList.add("v2p-tabs-pending");
  docEl.classList.add("v2p-topnav-pending");
  setTimeout(() => docEl.classList.remove("v2p-topnav-pending"), 1500);
  setTimeout(() => docEl.classList.remove("v2p-tabs-pending"), 1500);
  ensureViewportMeta();
  injectStyle(STYLE_ID, THEME_STYLE);
  void applyDisplaySettings();
  bindDisplaySettingChanges();
  try {
    applyTheme();
    bindEvents();
    startBootObserver();
    onReady(() => {
      scheduleDailyCheckin();
      initializePage();
    });
  } catch (error) {
    // Fail open: whatever breaks during boot, never leave the page in prepaint state.
    docEl.classList.remove("v2p-lite-prepaint", "v2p-tabs-pending", "v2p-topnav-pending");
    docEl.classList.add("v2p-loaded");
    console.error("V2EX Plus boot failed:", error);
  }
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;

    applyTheme();
    ensureToggle();
    initTopNavigationIcons();
    initMemberActivityRing();
    initMemberStatsCapsule();
    initBalanceFooter();
    initMemberShortcuts();
    initTopicDetailIcons();
    initReplyFooterIcons();
    initNotificationIndicator();
    initCheckinIndicator();
    scheduleDailyCheckin();
    void syncNativeNight(currentMode);
  });

  function initializePage() {
    if (pageInitialized) return;
    pageInitialized = true;
    initMobileLayout();
    markPageStructure(document);
    stopBootObserver();
    applyTheme();
    ensureToggle();
    initTopNavigationIcons();
    void syncNativeNight(currentMode);
    initMobileTopicRows();
    initNodeNavigation();
    initReplyActionIcons();
    initImageUpload();
    initReplySubmitShortcut();
    initMemberActivityRing();
    initMemberStatsCapsule();
    initBalanceFooter();
    initMemberShortcuts();
    initTopicDetailIcons();
    initReplyFooterIcons();
    initTopicSidebarTools();
    initNotificationIndicator();
    initCheckinIndicator();
    replaceEmojiImagesWithHD(document);
    void applyDisplaySettings();
    void initConfigurableTopicFeatures();
  }

  function normalizeMode(mode) {
    return MODES.includes(mode) ? mode : "auto";
  }

  function readMode() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (MODES.includes(saved)) return saved;

      const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (MODES.includes(legacy)) return legacy;
    } catch (error) {
      // Ignore storage failures in private or restricted browsing modes.
    }
    return "auto";
  }

  function writeMode(mode) {
    currentMode = normalizeMode(mode);
    try {
      localStorage.setItem(STORAGE_KEY, currentMode);
    } catch (error) {
      // Keep the in-memory mode for this page even when storage is unavailable.
    }
  }

  function isSystemDark() {
    try {
      return (
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch (error) {
      return false;
    }
  }

  function resolveMode(mode) {
    return normalizeMode(mode) === "auto" ? (isSystemDark() ? "dark" : "light") : mode;
  }

  function detectNativeNight() {
    if (nativeNight !== null) return nativeNight;

    try {
      if (typeof window.SITE_NIGHT === "number") {
        nativeNight = window.SITE_NIGHT === 1 ? 1 : 0;
        return nativeNight;
      }
    } catch (error) {
      // SITE_NIGHT may not be exposed to the userscript world.
    }

    try {
      const scripts = document.querySelectorAll("script");
      for (const script of scripts) {
        const match = (script.textContent || "").match(/SITE_NIGHT\s*=\s*(\d)/);
        if (match) {
          nativeNight = Number(match[1]) === 1 ? 1 : 0;
          return nativeNight;
        }
      }

      const nativeToggleImage = document.querySelector(NATIVE_TOGGLE_SELECTOR + " img");
      if (nativeToggleImage) {
        const src = nativeToggleImage.getAttribute("src") || "";
        const alt = (nativeToggleImage.getAttribute("alt") || "").toLowerCase();
        if (src.includes("toggle-light") || alt.includes("light")) {
          nativeNight = 1;
          return nativeNight;
        }
        if (src.includes("toggle-dark") || alt.includes("dark")) {
          nativeNight = 0;
          return nativeNight;
        }
      }
    } catch (error) {
      // Leave the state unknown instead of risking an inverted server toggle.
    }

    return null;
  }

  async function requestWithTimeout(url, options = {}, timeoutMs = 15000) {
    const controller = new AbortController();
    const abort = () => controller.abort(options.signal.reason);
    if (options.signal?.aborted) abort();
    else options.signal?.addEventListener("abort", abort, { once: true });
    const timer = setTimeout(() => controller.abort(new DOMException("请求超时，请稍后重试", "TimeoutError")), timeoutMs);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      const body = await response.text();
      return { ok: response.ok, status: response.status,
        text: async () => body, json: async () => JSON.parse(body) };
    } finally {
      clearTimeout(timer);
      options.signal?.removeEventListener("abort", abort);
    }
  }

  async function getV2exOnce() {
    if (!nativeToggleOnceUsed) {
      const nativeToggle = document.querySelector(NATIVE_TOGGLE_SELECTOR);
      const href = nativeToggle && nativeToggle.getAttribute("href");
      if (href) {
        try {
          const once = new URL(href, window.location.origin).searchParams.get("once");
          if (once) {
            nativeToggleOnceUsed = true;
            return once;
          }
        } catch (error) {
          // Fall through to /poll_once.
        }
      }
    }

    const response = await requestWithTimeout("/poll_once", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Unable to fetch V2EX once token");

    const once = Number.parseInt(await response.text(), 10);
    if (!Number.isFinite(once)) throw new Error("Invalid V2EX once token");
    return String(once);
  }

  function updateNativeToggleIndicator(target) {
    const image = document.querySelector(NATIVE_TOGGLE_SELECTOR + " img");
    if (!image) return;

    const nextMode = target === 1 ? "light" : "dark";
    image.setAttribute("src", "/static/img/toggle-" + nextMode + ".png");
    image.setAttribute("alt", nextMode === "light" ? "Light" : "Dark");
  }

  function hideNativeThemeToggle() {
    document.querySelectorAll(NATIVE_TOGGLE_SELECTOR).forEach((link) => {
      const container = link.closest(".fr");
      const target = container || link;
      target.classList.add("v2p-native-theme-toggle-container");
      target.hidden = true;
      target.setAttribute("aria-hidden", "true");
    });
  }

  function syncNativeNight(mode) {
    const target = resolveMode(mode) === "dark" ? 1 : 0;

    nativeNightSyncQueue = nativeNightSyncQueue
      .catch(() => undefined)
      .then(async () => {
        const current = detectNativeNight();
        if (current === null || current === target) return;

        const once = await getV2exOnce();
        const response = await requestWithTimeout("/settings/night/toggle?once=" + encodeURIComponent(once), {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Unable to sync V2EX native theme");

        nativeNight = target;
        updateNativeToggleIndicator(target);
      })
      .catch((error) => {
        console.warn("V2EX Plus native theme sync failed:", error);
      });

    return nativeNightSyncQueue;
  }

  function applyThemeClassState(target, mode) {
    if (!target || !target.classList) return;
    const isDark = mode === "dark";
    target.classList.toggle("v2p-theme-light-default", !isDark);
    target.classList.toggle("v2p-theme-dark-default", isDark);
    target.classList.toggle("Night", isDark);
  }

  function applyDocumentPrepaint(mode) {
    const isDark = mode === "dark";
    applyThemeClassState(docEl, mode);
    docEl.classList.add("v2p-lite-prepaint");
    docEl.dataset.v2pLiteMode = currentMode;
    docEl.dataset.v2pLiteTheme = mode;
    docEl.style.colorScheme = isDark ? "dark" : "light";
    docEl.style.backgroundColor = THEME_META_COLORS[mode];
  }

  function applyThemeClasses(mode) {
    const isDark = mode === "dark";
    const themeChanged = docEl.dataset.v2pLiteTheme !== mode;
    const targets = [docEl, document.body, document.getElementById("Wrapper")];

    targets.forEach((target) => applyThemeClassState(target, mode));

    if (docEl.dataset.v2pLiteMode !== currentMode) docEl.dataset.v2pLiteMode = currentMode;
    if (docEl.dataset.v2pLiteTheme !== mode) docEl.dataset.v2pLiteTheme = mode;

    if (themeChanged || !docEl.style.colorScheme) {
      docEl.style.colorScheme = isDark ? "dark" : "light";
      docEl.style.backgroundColor = THEME_META_COLORS[mode];
    }
  }

  function applyTheme() {
    effectiveMode = resolveMode(currentMode);
    applyThemeClasses(effectiveMode);
    syncCodeHighlight(effectiveMode);
    updateThemeColor(effectiveMode);
    updateToggle();
    docEl.classList.remove("v2p-lite-prepaint");
    docEl.classList.add("v2p-loaded");
  }

  function scheduleBootSync() {
    if (bootSyncScheduled) return;
    bootSyncScheduled = true;
    const run = () => {
      bootSyncScheduled = false;
      if (!bootObserver) return;

      initMobileLayout();
      applyThemeClasses(effectiveMode);
      markPageStructure(document);
      const topTools = document.querySelector("#Top .tools, #site-header");
      if (topTools) ensureToggle();
      const tabsReady = attemptEarlyNodeNavigation();
      if (
        document.body &&
        document.getElementById("Wrapper") &&
        topTools &&
        (tabsReady || document.readyState !== "loading")
      ) {
        stopBootObserver();
      }
    };
    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(run);
    } else {
      setTimeout(run, 16);
    }
  }

  function injectStyle(id, css) {
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.type = "text/css";
    style.textContent = css;
    (document.head || docEl).appendChild(style);
  }

  function observePageStructure() {
    if (!window.MutationObserver) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          markPageStructure(node);
        });
      });
    });

    let stopped = false;
    let stopTimer = null;
    const stop = () => {
      if (stopped) return;
      stopped = true;
      observer.disconnect();
      if (stopTimer !== null) clearTimeout(stopTimer);
    };
    const observeTarget = (target) => {
      if (!target || stopped) return;
      observer.disconnect();
      observer.observe(target, { childList: true, subtree: true });
    };
    const observeBody = () => {
      if (!document.body || stopped) return;
      markPageStructure(document.body);
      observeTarget(document.body);
      stopTimer = setTimeout(stop, 8000);
    };

    if (document.body) {
      observeBody();
    } else {
      observeTarget(docEl);
      document.addEventListener("DOMContentLoaded", observeBody, { once: true });
    }
  }

  observePageStructure();

  function findStructureMatches(root, selector) {
    const matches = [];
    if (root && root.nodeType === 1 && root.matches && root.matches(selector)) matches.push(root);
    if (root && root.querySelectorAll) matches.push(...root.querySelectorAll(selector));
    return matches;
  }

  function initMobileLayout() {
    const header = document.getElementById("site-header");
    if (!header) return false;
    docEl.classList.add("v2p-mobile");
    // The server's mobile template has no #Main. Keep its original .content
    // element and children intact, and give shared reply features a stable root.
    if (!document.getElementById("Main")) {
      const main = document.querySelector("#Wrapper > .content");
      if (main && !main.id) main.id = "Main";
    }
    const menu = header.querySelector("#menu-entry");
    if (menu && menu.querySelector("img.menu-guest") && !menu.querySelector(".v2p-mobile-menu-icon")) {
      menu.insertAdjacentHTML("beforeend", '<svg class="v2p-mobile-menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>');
    }
    if (menu && !menu.hasAttribute("aria-label")) menu.setAttribute("aria-label", "打开导航菜单");
    return true;
  }

  function initMobileTopicRows() {
    if (!docEl.classList.contains("v2p-mobile")) return;
    document.querySelectorAll("#Main .cell.item .item_title").forEach((title) => {
      const cell = title.parentElement;
      if (!cell || cell.classList.contains("v2p-mobile-topic-text")) return;
      const metadata = Array.from(cell.children).filter((child) => child.matches(".small, .topic_info"));
      const identity = metadata.find((child) => child.querySelector('a[href^="/member/"]'));
      const timestamp = metadata.find((child) => child !== identity);
      if (!identity || !timestamp) return;
      const time = timestamp.textContent.split(/[•·]/)[0].trim();
      const author = identity.querySelector('a[href^="/member/"]');
      const node = identity.querySelector("a.node, .item_node");
      const line = document.createElement("span");
      line.className = "small fade v2p-mobile-topic-meta";
      [node, author, time && document.createTextNode(time)].filter(Boolean).forEach((part, index) => {
        if (index) line.append(document.createTextNode(" · "));
        line.append(part);
      });
      metadata.forEach((child) => child.remove());
      Array.from(cell.children).filter((child) => child.matches(".sep5")).forEach((child) => child.remove());
      title.after(line);
      cell.classList.add("v2p-mobile-topic-text");
    });
  }

  function markPageStructure(root) {
    findStructureMatches(root, STRUCTURE_MARKER_SELECTOR).forEach((element) => {
      if (element.id === "site-header" || element.matches("#Wrapper > .content")) {
        initMobileLayout();
        return;
      }
      if (element.id === "Singleton") {
        const wrapper = element.closest("#Wrapper");
        if (wrapper) wrapper.classList.add("v2p-has-singleton");
        return;
      }

      if (element.id === "syntax-selector") {
        const cell = element.closest(".cell");
        if (cell) cell.classList.add("v2p-syntax-cell");
        return;
      }

      if (element.classList.contains("embedded_video_wrapper")) {
        const payload = element.closest(".payload");
        if (payload) payload.classList.add("v2p-has-embedded-video");
        return;
      }

      if (element.tagName === "FORM") {
        if (element.getAttribute("action") === "/write") {
          const box = element.closest(".box");
          if (box) box.classList.add("v2p-write-box");
        }
        const replyCell = element.closest("#reply-box > .cell");
        if (replyCell) replyCell.classList.add("v2p-reply-form-cell");
        return;
      }

      if (element.tagName === "A") {
        const box = element.closest(".box");
        if (box) box.classList.add("v2p-advertise-box");
      }
    });
  }

  function attemptEarlyNodeNavigation() {
    if (pageInitialized) return true;
    const tabsContainer = document.getElementById("Tabs");
    if (!tabsContainer) return false;
    if (tabsContainer.dataset.v2pLiteNavReady === "1") return true;
    // Only rebuild once the parser has moved past #Tabs, otherwise the native
    // links still streaming in would be appended after our rebuilt list.
    if (!tabsContainer.nextElementSibling && document.readyState === "loading") return false;
    initNodeNavigation();
    return tabsContainer.dataset.v2pLiteNavReady === "1";
  }

  function initNodeNavigation() {
    try {
      const tabsContainer = document.querySelector("#Tabs");
      if (!tabsContainer) return false;
      if (tabsContainer.dataset.v2pLiteNavReady === "1") return false;

      const currentData = captureCurrentNavItems(tabsContainer);
      const config = readNavConfig(currentData);
      saveNavConfig(config);
      renderTabs(tabsContainer, config);
      tabsContainer.dataset.v2pLiteNavReady = "1";
      return true;
    } catch (error) {
      console.error("V2EX Plus navigation failed:", error);
      return false;
    } finally {
      docEl.classList.remove("v2p-tabs-pending");
    }
  }

  function captureCurrentNavItems(tabsContainer) {
    const items = Array.from(tabsContainer.querySelectorAll("a.tab, a.tab_current"))
      .map((link) => ({
        name: (link.textContent || link.getAttribute("aria-label") || link.title || "").trim(),
        href: link.getAttribute("href") || "",
        visible: true,
      }))
      .filter((item) => item.name && item.href && item.name !== "拼车");

    const planetLink = tabsContainer.querySelector('a[href="/planet"]');
    if (planetLink && !items.some((item) => item.href === "/planet")) {
      items.push({ name: "Planet", href: "/planet", visible: true });
    }

    return items;
  }

  function readNavConfig(currentData) {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(NAV_STORAGE_KEY) || "null");
    } catch (error) {
      saved = null;
    }

    const base = Array.isArray(saved) && saved.length > 0 ? saved : currentData.length > 0 ? currentData : DEFAULT_NAV;
    return normalizeNavConfig(base, currentData);
  }

  function normalizeNavConfig(base, currentData) {
    const result = [];
    const seen = new Set();
    const source = base.concat(currentData, DEFAULT_NAV);

    source.forEach((item) => {
      if (!item || typeof item.name !== "string" || typeof item.href !== "string") return;
      const name = item.name.trim();
      const href = item.href.trim();
      if (!name || !href || name === "拼车" || seen.has(href)) return;
      seen.add(href);
      result.push({
        name,
        href,
        visible: item.visible !== false,
      });
    });

    return result;
  }

  function saveNavConfig(config) {
    try {
      const value = JSON.stringify(config);
      if (localStorage.getItem(NAV_STORAGE_KEY) !== value) {
        localStorage.setItem(NAV_STORAGE_KEY, value);
      }
    } catch (error) {
      // Navigation customization still works for this page when storage is unavailable.
    }
  }

  function renderTabs(container, config) {
    const activeHref = getActiveTabHref(container);
    const nextChildren = [];
    const extras = Array.from(container.childNodes).filter((node) => {
      if (node.nodeType !== 1) return false;
      if (node.classList.contains("tab") || node.classList.contains("tab_current")) return false;
      if (node.classList.contains("v2p-nav-settings-btn")) return false;
      if (node.id === "v2p-nav-menu") return false;
      if (node.tagName === "A" && node.getAttribute("href") === "/planet") return false;
      return true;
    });

    const urlTab = new URLSearchParams(window.location.search).get("tab");
    if (urlTab) {
      try {
        if (localStorage.getItem(LAST_TAB_STORAGE_KEY) !== urlTab) {
          localStorage.setItem(LAST_TAB_STORAGE_KEY, urlTab);
        }
      } catch (error) {
        // Ignore storage failures.
      }
    }

    config.forEach((item) => {
      if (!item.visible) return;

      const link = document.createElement("a");
      link.href = item.href;
      link.className = isCurrentNavItem(item, activeHref, urlTab) ? "tab_current" : "tab v2p-hover-btn";

      if (item.name === "Planet") {
        link.innerHTML = buildSvgIcon(TAB_ICONS.Planet);
        link.title = "Planet";
        link.setAttribute("aria-label", "Planet");
      } else {
        link.innerHTML = buildTabIcon(item.name) + escapeHtml(item.name);
      }

      nextChildren.push(link);
    });

    nextChildren.push(...extras, createNavSettingsButton(config));
    container.replaceChildren(...nextChildren);
  }

  function getActiveTabHref(container) {
    const active = container.querySelector("a.tab_current");
    return active ? active.getAttribute("href") || "" : "";
  }

  function isCurrentNavItem(item, activeHref, urlTab) {
    if (activeHref && normalizeHref(activeHref) === normalizeHref(item.href)) return true;

    const itemUrl = new URL(item.href, location.origin);
    const itemTab = itemUrl.searchParams.get("tab");
    if (itemTab) {
      let currentTab = urlTab;
      if (!currentTab) {
        try {
          currentTab = localStorage.getItem(LAST_TAB_STORAGE_KEY);
        } catch (error) {
          currentTab = null;
        }
      }
      return currentTab === itemTab;
    }

    return location.pathname === itemUrl.pathname && !itemUrl.search;
  }

  function normalizeHref(href) {
    try {
      const url = new URL(href, location.origin);
      return url.pathname + url.search;
    } catch (error) {
      return href || "";
    }
  }

  function buildTabIcon(name) {
    const icon = TAB_ICONS[name];
    if (!icon) return "";
    if (icon.trim().startsWith("<svg")) return icon;
    return buildSvgIcon(icon);
  }

  function buildSvgIcon(paths) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      paths +
      "</svg>"
    );
  }

  function initTopicDetailIcons() {
    if (!docEl.classList.contains("v2p-mobile")) return;
    const icons = {
      bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
      tweet: '<path d="M22 5.9a8.4 8.4 0 0 1-2.4.7 4.2 4.2 0 0 0-7.2 3.8A11.8 11.8 0 0 1 3 5s-4 9 5 13a13 13 0 0 1-7 2c9 5 20 0 20-11.5a4.2 4.2 0 0 0 0-.6A8.4 8.4 0 0 0 22 5.9z"/>',
      share: '<path d="M12 16V3m-5 5 5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
      ignore: '<path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.7 10.7 0 0 1 12 5c7 0 10 7 10 7a15 15 0 0 1-3 4M6.6 6.6C3.5 8.5 2 12 2 12s3 7 10 7a11 11 0 0 0 5.4-1.4"/>',
      heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
      tags: '<path d="m20 13-7 7a2 2 0 0 1-3 0l-8-8V2h10l8 8a2 2 0 0 1 0 3z"/><circle cx="7" cy="7" r="1"/>',
      chat: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
    };
    document.querySelectorAll('#Main a, #Main button, #Main input[type="button"]').forEach((link) => {
      if (!link.closest(".topic_buttons") && !link.closest(".box")?.querySelector(".topic_content")) return;
      if (link.closest(".topic_content, .reply_content, #reply-box")) return;
      const label = (link.value || link.textContent).trim();
      const key = /^(?:加入收藏|取消收藏|收藏|Favorite|Unfavorite|Bookmark)$/i.test(label) ? "bookmark"
        : /^tweet$/i.test(label) ? "tweet" : /^(?:share|分享)$/i.test(label) ? "share"
        : /^(?:忽略主题|取消忽略|ignore)$/i.test(label) ? "ignore" : /^(?:感谢|已感谢|thank|thanks)$/i.test(label) ? "heart" : null;
      if (!key) return;
      link.title = label;
      link.setAttribute("aria-label", label);
      link.classList.add("v2p-topic-icon-action");
      // Keep native content and the original node: handlers may inspect text/value.
      const svg = buildSvgIcon(icons[key]).replace(/currentColor/g, "#64748b");
      link.style.setProperty("--v2p-action-image", 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")');
    });
    document.querySelectorAll("#Main .fa-tags").forEach((icon) => {
      if (icon.classList.contains("v2p-topic-tag-icon")) return;
      icon.classList.remove("fa", "fa-tags");
      icon.classList.add("v2p-topic-tag-icon");
      icon.innerHTML = buildSvgIcon(icons.tags);
    });
    document.querySelectorAll("#Main a, #Main button").forEach((link) => {
      if (!/^(?:💬\s*)?开启对话$/.test(link.textContent.trim()) || link.classList.contains("v2p-topic-chat-link")) return;
      const container = link.parentElement;
      if (container) {
        container.classList.add("v2p-topic-chat-container");
        Array.from(container.childNodes).forEach((node) => {
          if (node === link || node.contains?.(link)) return;
          if (/^[\s\uFE0F]*(?:💬|🗨|🗨️)[\s\uFE0F]*$/.test(node.textContent || "") ||
              (node.nodeType === 1 && node.matches("img.tool-icon"))) node.remove();
        });
      }
      link.classList.add("v2p-topic-chat-link");
      link.replaceChildren();
      link.insertAdjacentHTML("afterbegin", buildSvgIcon(icons.chat));
      link.append(document.createTextNode("开启对话"));
    });
  }

  function initReplyFooterIcons() {
    const replyBox = document.getElementById("reply-box");
    if (!replyBox) return;

    const undockButton = replyBox.querySelector("#undock-button");
    decorateReplyFooterIcon(
      undockButton,
      "取消回复框停靠",
      '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 15h18"/><path d="m9 9 3 3 3-3"/>',
    );

    const backToTopButton = Array.from(replyBox.querySelectorAll("a")).find(
      (link) => (link.textContent || "").trim() === "回到顶部" || link.dataset.v2pReplyFooterAction === "top",
    );
    decorateReplyFooterIcon(
      backToTopButton,
      "回到顶部",
      '<path d="M5 3h14"/><path d="m18 13-6-6-6 6"/><path d="M12 7v14"/>',
      "top",
    );
  }

  function decorateReplyFooterIcon(link, label, iconPaths, action = "undock") {
    if (!link) return;
    link.classList.add("v2p-lite-reply-footer-icon");
    link.dataset.v2pReplyFooterAction = action;
    link.title = label;
    link.setAttribute("aria-label", label);
    if (!link.querySelector("svg")) link.innerHTML = buildSvgIcon(iconPaths);
  }

  function createNavSettingsButton(config) {
    const button = document.createElement("span");
    button.className = "v2p-nav-settings-btn";
    button.title = "自定义导航";
    button.setAttribute("role", "button");
    button.setAttribute("aria-label", "自定义导航");
    button.innerHTML = buildSvgIcon(
      '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    );
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openNavSettings(config);
    });
    return button;
  }

  function openNavSettings(config) {
    const existingMenu = document.getElementById("v2p-nav-menu");
    if (existingMenu) {
      existingMenu.remove();
      return;
    }

    const settingsBtn = document.querySelector(".v2p-nav-settings-btn");
    if (!settingsBtn || !document.body) return;

    const menu = document.createElement("div");
    menu.id = "v2p-nav-menu";
    const rect = settingsBtn.getBoundingClientRect();
    menu.style.top = window.scrollY + rect.bottom + 5 + "px";
    menu.style.left = Math.max(8, window.scrollX + rect.right - 220) + "px";

    const list = document.createElement("div");
    list.className = "v2p-nav-menu-list";
    menu.appendChild(list);

    let dragSrcIndex = null;
    let dragDestinationIndex = null;

    const saveAndRefresh = () => {
      saveNavConfig(config);
      const tabsContainer = document.querySelector("#Tabs");
      if (tabsContainer) renderTabs(tabsContainer, config);
    };

    const reorderConfig = (fromIndex, destinationIndex) => {
      if (fromIndex == null || destinationIndex == null || fromIndex === destinationIndex) return;
      const next = config.slice();
      const moved = next.splice(fromIndex, 1)[0];
      const insertIndex = Math.max(0, Math.min(next.length, destinationIndex));
      next.splice(insertIndex, 0, moved);
      config.splice(0, config.length, ...next);
    };

    const clearDropStyles = () => {
      list.querySelectorAll(".v2p-nav-drop-before, .v2p-nav-drop-after").forEach((row) => {
        row.classList.remove("v2p-nav-drop-before", "v2p-nav-drop-after");
      });
      dragDestinationIndex = null;
    };

    const showDropPosition = (destinationIndex) => {
      clearDropStyles();
      if (dragSrcIndex == null || destinationIndex === dragSrcIndex) return;

      const rows = Array.from(list.querySelectorAll(".v2p-nav-menu-row"));
      const remainingRows = rows.filter((_, index) => index !== dragSrcIndex);
      const nextRow = remainingRows[destinationIndex];
      if (nextRow) {
        nextRow.classList.add("v2p-nav-drop-before");
      } else if (remainingRows.length > 0) {
        remainingRows[remainingRows.length - 1].classList.add("v2p-nav-drop-after");
      }
      dragDestinationIndex = destinationIndex;
    };

    const renderList = () => {
      list.innerHTML = "";
      config.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = "v2p-nav-menu-row";

        const left = document.createElement("div");
        left.className = "v2p-nav-menu-left";

        const dragHandle = document.createElement("span");
        dragHandle.className = "v2p-nav-drag-handle";
        dragHandle.title = "拖拽排序";
        dragHandle.innerHTML = buildSvgIcon(
          '<circle cx="9" cy="5" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="19" r="1"/>',
        );
        dragHandle.addEventListener("mousedown", () => {
          row.draggable = true;
          document.addEventListener(
            "mouseup",
            () => {
              if (dragSrcIndex !== index) row.draggable = false;
            },
            { once: true },
          );
        });

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.visible;
        checkbox.addEventListener("click", (event) => event.stopPropagation());
        checkbox.addEventListener("change", () => {
          item.visible = checkbox.checked;
          saveAndRefresh();
        });

        const name = document.createElement("span");
        name.className = "v2p-nav-menu-name";
        name.textContent = item.name;

        left.appendChild(dragHandle);
        left.appendChild(checkbox);
        left.appendChild(name);
        row.appendChild(left);
        list.appendChild(row);

        row.addEventListener("dragstart", (event) => {
          dragSrcIndex = index;
          row.classList.add("v2p-nav-dragging");
          row.setAttribute("aria-grabbed", "true");
          if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", item.name);
          }
        });

        row.addEventListener("dragover", (event) => {
          if (dragSrcIndex == null) return;
          event.preventDefault();
          if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
          const rowRect = row.getBoundingClientRect();
          const dropAfter = event.clientY >= rowRect.top + rowRect.height / 2;
          const sourceSlot = index + (dropAfter ? 1 : 0);
          const destinationIndex = sourceSlot > dragSrcIndex ? sourceSlot - 1 : sourceSlot;
          showDropPosition(destinationIndex);
        });

        row.addEventListener("drop", (event) => {
          if (dragSrcIndex == null) return;
          event.preventDefault();
          event.stopPropagation();
          if (dragDestinationIndex == null || dragDestinationIndex === dragSrcIndex) {
            clearDropStyles();
            return;
          }
          reorderConfig(dragSrcIndex, dragDestinationIndex);
          dragSrcIndex = null;
          clearDropStyles();
          renderList();
          saveAndRefresh();
        });

        row.addEventListener("dragend", () => {
          row.draggable = false;
          row.classList.remove("v2p-nav-dragging");
          row.removeAttribute("aria-grabbed");
          dragSrcIndex = null;
          clearDropStyles();
        });
      });
    };

    renderList();

    const closeHandler = (event) => {
      if (menu.contains(event.target) || settingsBtn.contains(event.target)) return;
      menu.remove();
      document.removeEventListener("click", closeHandler);
    };

    setTimeout(() => {
      document.addEventListener("click", closeHandler);
    }, 0);

    document.body.appendChild(menu);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initTopNavigationIcons() {
    const iconPaths = {
      home: '<path d="M15 21v-8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
      user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
      notes: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>',
      planet: '<circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><line x1="2" x2="22" y1="12" y2="12"/>',
      settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
      image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1"/><path d="m21 15-5-5L5 21"/>',
      chat: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
      language: '<path d="m5 8 6 6m-7 0 6-6 2-5H2m5-2v2m7 18 5-11 5 11m-8-4h6"/>',
      book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 3H20v19H6.5A2.5 2.5 0 0 1 4 19.5v-14A2.5 2.5 0 0 1 6.5 3Z"/>',
      login: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M3 12h12m-4-4 4 4-4 4"/>',
      signup: '<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a7 7 0 0 1 14 0v2m3-13v6m-3-3h6"/>',
      bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 13h4"/>',
      nodes: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      timeline: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
      logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
    };

    const links = Array.from(document.querySelectorAll("#Top .tools > a.top, #menu-body a.top"));
    let changed = false;

    links.forEach((link) => {
      if (link.id === TOGGLE_ID || link.dataset.v2pLiteTopnavIcon || link.querySelector("svg")) return;

      const text = (link.textContent || "").trim();
      const href = link.getAttribute("href") || "";
      let iconName = "";

      if (text === "首页" || href === "/") iconName = "home";
      else if (href.startsWith("/member/")) iconName = "user";
      else if (text === "记事本" || href === "/notes") iconName = "notes";
      else if (text === "Planet" || href === "/planet") iconName = "planet";
      else if (text === "设置" || href === "/settings") iconName = "settings";
      else if (text === "登出" || href.includes("signout")) iconName = "logout";

      else if (href.startsWith("/signin")) iconName = "login";
      else if (href.startsWith("/signup")) iconName = "signup";
      else if (href.startsWith("/notifications")) iconName = "bell";
      else if (href.startsWith("/my/nodes")) iconName = "nodes";
      else if (href.startsWith("/my/")) iconName = "bookmark";
      else if (href.startsWith("/images") || /图片库/.test(text)) iconName = "image";
      else if (/^Chat$/.test(text) || href.startsWith("/chat")) iconName = "chat";
      else if (/Dictionary/.test(text)) iconName = "book";
      else if (/时间轴/.test(text) || href.startsWith("/timeline")) iconName = "timeline";
      else if (/语言选择/.test(text) || href.startsWith("/select/language")) iconName = "language";
      if (!iconName) return;
      if (link.closest("#menu-body")) link.querySelectorAll("img.tool-icon").forEach((icon) => icon.remove());
      link.dataset.v2pLiteTopnavIcon = iconName;
      link.classList.add("v2p-lite-topnav-icon");
      link.insertAdjacentHTML("afterbegin", buildSvgIcon(iconPaths[iconName]));
      changed = true;
    });

    docEl.classList.remove("v2p-topnav-pending");
    return changed;
  }

  function initReplyActionIcons() {
    if (!/^\/t\/\d+/.test(window.location.pathname)) return false;

    const iconPaths = {
      hide: '<path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.21-3.08 3.62-5.39 6.69-6.56"/><path d="M1 1l22 22"/><path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 11 8a10.94 10.94 0 0 1-4.29 5.3"/><path d="M14.12 14.12a3 3 0 0 1-4.24-4.24"/>',
      thank: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
      reply: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    };

    const setIcon = (control, type, label) => {
      if (!control || control.dataset.v2pLiteReplyActionIcon) return false;
      control.dataset.v2pLiteReplyActionIcon = type;
      control.classList.add("v2p-lite-reply-action", "v2p-lite-reply-action-" + type);
      control.title = label;
      control.setAttribute("aria-label", label);
      control.innerHTML = buildSvgIcon(iconPaths[type]);
      return true;
    };

    let changed = false;
    getCommentCells().forEach((cell) => {
      const table = getDirectTable(cell);
      const contentCell = table && getContentCell(table);
      const actions = contentCell
        ? Array.from(contentCell.children).find((child) => child.classList && child.classList.contains("fr"))
        : null;
      if (!actions) return;
      if (actions.dataset.v2pLiteReplyActionsReady === "1") return;
      const floorNumber = Array.from(actions.children).find(
        (child) => child.classList && child.classList.contains("no"),
      );

      let rowChanged = false;
      let controls = Array.from(actions.children).find(
        (child) => child.classList && child.classList.contains("v2p-lite-reply-controls"),
      );
      if (!controls) {
        controls = document.createElement("span");
        controls.className = "v2p-lite-reply-controls";
        rowChanged = true;
      }

      const thankArea = Array.from(actions.children).find(
        (child) => child.classList && child.classList.contains("thank_area"),
      );

      if (thankArea) {
        const directElements = Array.from(thankArea.children);
        const nativeThankControls = directElements.filter(
          (child) => child.classList && child.classList.contains("thank"),
        );
        const actionLinks = directElements.filter((child) => child.matches("a, button"));
        const hideControl = nativeThankControls[0] || actionLinks.find((control) => {
          const onclick = control.getAttribute("onclick") || "";
          return onclick.includes("hideReply") || (control.textContent || "").trim().includes("隐藏");
        });
        const thankControl = nativeThankControls[1] || actionLinks.find((control) => {
          const onclick = control.getAttribute("onclick") || "";
          return onclick.includes("thankReply") || !!control.querySelector('img[src*="heart_neue.png"]');
        });

        if (hideControl) {
          hideControl.classList.remove("thank");
          rowChanged = setIcon(hideControl, "hide", "隐藏回复") || rowChanged;
          controls.appendChild(hideControl);
        }
        if (thankControl) {
          thankControl.classList.remove("thank");
          rowChanged = setIcon(thankControl, "thank", "感谢回复") || rowChanged;
          bindThankFeedback(thankControl);
          controls.appendChild(thankControl);
        }

        const existingThankedIcon = thankArea.querySelector(
          ".v2p-lite-reply-action-thank.v2p-thanked",
        );
        if (thankArea.classList.contains("thanked") && !thankControl && !existingThankedIcon) {
          const thankedIcon = document.createElement("span");
          thankedIcon.className = "v2p-thanked";
          rowChanged = setIcon(thankedIcon, "thank", "已感谢") || rowChanged;
          controls.appendChild(thankedIcon);
        }

        thankArea.remove();
      }

      const replyImage = actions.querySelector('img[src*="reply_neue.png"]');
      const replyLink = replyImage
        ? replyImage.closest("a")
        : Array.from(actions.querySelectorAll("a")).find((link) =>
            (link.getAttribute("onclick") || "").includes("replyOne"),
          );
      bindReplyFloorReference(replyLink, floorNumber);
      rowChanged = setIcon(replyLink, "reply", "回复") || rowChanged;
      if (replyLink && replyLink.parentNode !== controls) {
        controls.appendChild(replyLink);
        rowChanged = true;
      }

      if (rowChanged) {
        actions.replaceChildren(controls);
        if (floorNumber) actions.appendChild(floorNumber);
        actions.classList.add("v2p-lite-reply-actions");
      }
      actions.dataset.v2pLiteReplyActionsReady = "1";
      changed = rowChanged || changed;
    });

    return changed;
  }

  function bindThankFeedback(thankControl) {
    if (!thankControl || thankControl.dataset.v2pLiteThankBound === "1") return;

    thankControl.dataset.v2pLiteThankBound = "1";
    thankControl.addEventListener(
      "click",
      () => {
        thankControl.classList.add("v2p-thanked");
        thankControl.title = "已感谢";
        thankControl.setAttribute("aria-label", "已感谢");
        thankControl.setAttribute("aria-pressed", "true");
      },
      { once: true },
    );
  }

  function bindReplyFloorReference(replyLink, floorNumber) {
    if (!replyLink || !floorNumber || replyLink.dataset.v2pLiteFloorBound === "1") return;

    const floorMatch = (floorNumber.textContent || "").match(/\d+/);
    if (!floorMatch) return;

    const floor = floorMatch[0];
    replyLink.dataset.v2pLiteFloorBound = "1";
    replyLink.addEventListener("click", () => {
      queueMicrotask(() => {
        const textarea = document.querySelector("#reply_content");
        if (!(textarea instanceof HTMLTextAreaElement)) return;

        const cursor = textarea.selectionStart;
        const valueBeforeCursor = textarea.value.slice(0, cursor);
        const floorAtCursor = new RegExp("(?:^|\\s)#" + floor + "\\s*$");
        if (floorAtCursor.test(valueBeforeCursor)) return;

        insertTextToTextarea(textarea, "#" + floor + " ");
      });
    });
  }

  function initImageUpload() {
    bindReplyImageUpload();
    initEditorImageUpload();
  }

  function initEditorImageUpload() {
    if (bindEditorImageUpload()) {
      stopEditorImageUploadObserver();
      return;
    }
    if (editorImageUploadObserver || !window.MutationObserver) return;

    editorImageUploadObserver = new MutationObserver(() => {
      if (bindEditorImageUpload()) stopEditorImageUploadObserver();
    });
    editorImageUploadObserver.observe(document.body || docEl, {
      childList: true,
      subtree: true,
    });
    editorImageUploadStopTimer = setTimeout(stopEditorImageUploadObserver, 8000);
  }

  function stopEditorImageUploadObserver() {
    if (editorImageUploadObserver) {
      editorImageUploadObserver.disconnect();
      editorImageUploadObserver = null;
    }
    if (editorImageUploadStopTimer !== null) {
      clearTimeout(editorImageUploadStopTimer);
      editorImageUploadStopTimer = null;
    }
  }

  function initReplySubmitShortcut() {
    enhanceReplySubmitButton();
    if (replySubmitShortcutBound) return;

    document.addEventListener("keydown", handleReplySubmitShortcut, true);
    replySubmitShortcutBound = true;
  }

  function isMacPlatform() {
    return /mac|iphone|ipad|ipod/i.test(
      (navigator.userAgentData && navigator.userAgentData.platform) ||
        navigator.platform ||
        navigator.userAgent,
    );
  }

  function enhanceReplySubmitButton() {
    const form = document.querySelector("#reply-box form");
    if (!form) return false;

    let submitter = form.querySelector(
      'button[type="submit"], input[type="submit"]',
    );
    if (!submitter) return false;

    if (submitter.tagName === "INPUT") {
      const input = submitter;
      const button = document.createElement("button");

      Array.from(input.attributes).forEach((attribute) => {
        if (attribute.name === "type" || attribute.name === "value") return;
        button.setAttribute(attribute.name, attribute.value);
      });
      button.type = "submit";
      button.value = input.value;
      button.disabled = input.disabled;
      input.replaceWith(button);
      submitter = button;
    }

    if (submitter.dataset.v2pLiteShortcutReady === "1") return false;

    const shortcut = isMacPlatform() ? "⌘ Enter" : "Ctrl Enter";
    const label = submitter.value || submitter.textContent.trim() || "回复";
    const keycap = document.createElement("kbd");

    keycap.textContent = shortcut;
    submitter.replaceChildren(document.createTextNode(label), keycap);
    submitter.classList.add("v2p-lite-reply-submit");
    submitter.dataset.v2pLiteShortcutReady = "1";
    submitter.title = "快捷键：" + shortcut;
    submitter.setAttribute("aria-label", label + "，快捷键 " + shortcut);
    return true;
  }

  function handleReplySubmitShortcut(event) {
    const shortcutPressed = isMacPlatform() ? event.metaKey : event.ctrlKey;
    if (
      event.key !== "Enter" ||
      !shortcutPressed ||
      event.altKey ||
      event.shiftKey ||
      event.isComposing ||
      event.keyCode === 229
    ) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) return;

    const replyBox = target.closest("#reply-box");
    if (!replyBox) return;

    const textarea = replyBox.querySelector("#reply_content");
    if (target !== textarea && !target.closest(".CodeMirror")) return;

    event.preventDefault();
    event.stopPropagation();
    if (event.repeat) return;

    const form =
      (textarea && textarea.form) ||
      target.closest("form") ||
      replyBox.querySelector('form[action^="/t"]');
    if (!form) return;

    const submitter = form.querySelector(
      'button[type="submit"]:not(:disabled), input[type="submit"]:not(:disabled)',
    );
    const disabledSubmitter = form.querySelector(
      'button[type="submit"]:disabled, input[type="submit"]:disabled',
    );
    if (!submitter && disabledSubmitter) return;

    if (typeof form.requestSubmit === "function") {
      if (submitter) form.requestSubmit(submitter);
      else form.requestSubmit();
      return;
    }

    if (submitter) submitter.click();
  }

  async function initConfigurableTopicFeatures() {
    if (!/^\/t\/\d+/.test(window.location.pathname)) return;

    const [autoFoldReplies, replyPreview, autoJumpReplies] = await Promise.all([
      readBooleanSetting(AUTO_FOLD_REPLIES_KEY, true),
      readBooleanSetting(REPLY_PREVIEW_KEY, true),
      readBooleanSetting(AUTO_JUMP_REPLIES_KEY, true),
    ]);

    if (autoFoldReplies) initLongReplyFolding();
    if (replyPreview) initReplyPreview();
    if (autoJumpReplies) initPaginationReplyJump();
  }

  function initLongReplyFolding() {
    getCommentCells().forEach((cell) => {
      const table = getDirectTable(cell);
      const content = table && getReplyContentEl(table);
      if (!content || content.dataset.v2pLiteFoldObserved === "1") return;

      content.dataset.v2pLiteFoldObserved = "1";
      const evaluate = () => foldLongReplyContent(content);
      requestAnimationFrame(evaluate);
      content.querySelectorAll("img").forEach((image) => {
        if (!image.complete) image.addEventListener("load", evaluate, { once: true });
      });
    });
  }

  function foldLongReplyContent(content) {
    if (!content || content.closest(".v2p-lite-long-reply")) return;
    if (content.scrollHeight < LONG_REPLY_THRESHOLD) return;

    const parent = content.parentNode;
    if (!parent) return;

    const wrapper = document.createElement("div");
    const toggle = document.createElement("button");
    wrapper.className = "v2p-lite-long-reply is-collapsed";
    wrapper.style.setProperty(
      "--v2p-lite-collapsed-reply-height",
      LONG_REPLY_COLLAPSED_HEIGHT + "px",
    );
    toggle.type = "button";
    toggle.className = "v2p-lite-long-reply-toggle";
    toggle.textContent = "展开回复";
    toggle.setAttribute("aria-expanded", "false");

    parent.insertBefore(wrapper, content);
    wrapper.append(content, toggle);
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const expanded = wrapper.classList.toggle("is-expanded");
      wrapper.classList.toggle("is-collapsed", !expanded);
      toggle.textContent = expanded ? "收起回复" : "展开回复";
      toggle.setAttribute("aria-expanded", String(expanded));
      if (!expanded && wrapper.getBoundingClientRect().top < 0) {
        wrapper.scrollIntoView({ block: "start" });
      }
    });
  }

  function initReplyPreview() {
    const textarea = document.querySelector("#reply_content");
    const form = textarea && textarea.form;
    const wrapper = textarea && textarea.closest(".v2p-reply-wrap");
    if (!textarea || !form || !wrapper || form.dataset.v2pLitePreviewBound === "1") return false;

    form.dataset.v2pLitePreviewBound = "1";
    const tabs = document.createElement("div");
    const editTab = createReplyPreviewTab("编辑", true);
    const previewTab = createReplyPreviewTab("预览", false);
    const preview = document.createElement("div");
    let lastPreviewText = null;
    let previewRequestId = 0;
    let previewController = null;

    tabs.className = "v2p-lite-reply-tabs";
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "回复编辑模式");
    preview.className = "v2p-lite-reply-preview";
    preview.hidden = true;
    preview.setAttribute("role", "tabpanel");
    preview.setAttribute("aria-live", "polite");
    tabs.append(editTab, previewTab);
    wrapper.insertAdjacentElement("beforebegin", tabs);
    wrapper.insertAdjacentElement("afterend", preview);

    const showEdit = () => {
      previewRequestId += 1;
      previewController?.abort();
      editTab.classList.add("is-active");
      previewTab.classList.remove("is-active");
      editTab.setAttribute("aria-selected", "true");
      previewTab.setAttribute("aria-selected", "false");
      wrapper.hidden = false;
      preview.hidden = true;
    };
    const showPreview = () => {
      editTab.classList.remove("is-active");
      previewTab.classList.add("is-active");
      editTab.setAttribute("aria-selected", "false");
      previewTab.setAttribute("aria-selected", "true");
      wrapper.hidden = true;
      preview.hidden = false;
      void renderReplyPreview(textarea, preview, {
        get controller() { return previewController; },
        set controller(value) { previewController = value; },
        get lastText() {
          return lastPreviewText;
        },
        set lastText(value) {
          lastPreviewText = value;
        },
        nextRequestId() {
          previewRequestId += 1;
          return previewRequestId;
        },
        currentRequestId() {
          return previewRequestId;
        },
      });
    };

    editTab.addEventListener("click", showEdit);
    previewTab.addEventListener("click", showPreview);
    return true;
  }

  function createReplyPreviewTab(label, active) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "v2p-lite-reply-tab" + (active ? " is-active" : "");
    button.textContent = label;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(active));
    return button;
  }

  async function renderReplyPreview(textarea, preview, state) {
    const text = transformEmojiTokens(textarea.value).trim();
    const requestId = state.nextRequestId();
    state.controller?.abort();
    state.controller = null;
    if (!text) {
      state.lastText = null;
      preview.dataset.v2pLiteLoaded = "0";
      preview.innerHTML = '<span class="v2p-lite-reply-preview-state">没有可预览的内容</span>';
      return;
    }
    if (text === state.lastText && preview.dataset.v2pLiteLoaded === "1") return;

    const controller = new AbortController();
    state.controller = controller;
    preview.dataset.v2pLiteLoaded = "0";
    preview.innerHTML = '<span class="v2p-lite-reply-preview-state">正在加载预览...</span>';
    try {
      const formData = new FormData();
      formData.append("text", text);
      const response = await requestWithTimeout("/preview/default", {
        method: "POST",
        body: formData,
        credentials: "include",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Reply preview failed with HTTP " + response.status);

      const rendered = await response.text();
      if (requestId !== state.currentRequestId()) return;
      preview.innerHTML = rendered;
      preview.dataset.v2pLiteLoaded = "1";
      state.lastText = text;
      renderImageLinksInPreview(preview);
      replaceEmojiImagesWithHD(preview);
    } catch (error) {
      if (requestId !== state.currentRequestId()) return;
      console.debug("V2EX Plus reply preview failed:", error);
      const message = document.createElement("span");
      const retry = document.createElement("button");
      message.className = "v2p-lite-reply-preview-state";
      message.textContent = "预览失败，";
      retry.type = "button";
      retry.className = "v2p-lite-preview-retry";
      retry.textContent = "点击重试";
      retry.addEventListener("click", () => void renderReplyPreview(textarea, preview, state));
      preview.replaceChildren(message, retry, document.createTextNode("。"));
    }
  }

  function renderImageLinksInPreview(preview) {
    preview.querySelectorAll("a[href]").forEach((link) => {
      if (link.querySelector("img")) return;
      const imageUrl = normalizePreviewImageUrl(link.href);
      if (!imageUrl) return;
      link.classList.add("v2p-lite-preview-image-link");
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.replaceChildren(createPreviewImage(imageUrl));
    });

    const walker = document.createTreeWalker(preview, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
      const textNode = walker.currentNode;
      const parent = textNode.parentElement;
      if (!parent || parent.closest("a, code, pre, script, style, textarea")) continue;
      if (/https?:\/\/\S+/i.test(textNode.textContent || "")) textNodes.push(textNode);
    }
    textNodes.forEach(replacePreviewImageUrlsInTextNode);
  }

  function replacePreviewImageUrlsInTextNode(textNode) {
    const text = textNode.textContent || "";
    const matches = Array.from(text.matchAll(/https?:\/\/[^\s<>"']+/gi));
    if (matches.length === 0) return;

    const fragment = document.createDocumentFragment();
    let cursor = 0;
    let replaced = false;
    matches.forEach((match) => {
      const rawUrl = match[0];
      const trailingMatch = rawUrl.match(/[),.;!?，。；！？]+$/);
      const trailing = trailingMatch ? trailingMatch[0] : "";
      const candidate = trailing ? rawUrl.slice(0, -trailing.length) : rawUrl;
      const imageUrl = normalizePreviewImageUrl(candidate);
      if (!imageUrl) return;

      fragment.append(document.createTextNode(text.slice(cursor, match.index)));
      fragment.append(createPreviewImageLink(imageUrl));
      if (trailing) fragment.append(document.createTextNode(trailing));
      cursor = match.index + rawUrl.length;
      replaced = true;
    });
    if (!replaced) return;
    fragment.append(document.createTextNode(text.slice(cursor)));
    textNode.replaceWith(fragment);
  }

  function normalizePreviewImageUrl(value) {
    try {
      const url = new URL(value, window.location.origin);
      if (!/^https?:$/.test(url.protocol)) return null;
      return /\.(?:apng|avif|gif|jpe?g|png|webp)$/i.test(url.pathname) ? url.href : null;
    } catch (error) {
      return null;
    }
  }

  function createPreviewImageLink(imageUrl) {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "v2p-lite-preview-image-link";
    link.append(createPreviewImage(imageUrl));
    return link;
  }

  function createPreviewImage(imageUrl) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = "";
    image.loading = "lazy";
    image.className = "embedded_image v2p-lite-preview-image";
    return image;
  }

  function initPaginationReplyJump() {
    const topicPath = window.location.pathname;
    const shouldJump = consumePaginationJumpMarker(topicPath) || cameFromAnotherTopicPage(topicPath);

    document.addEventListener(
      "click",
      (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const control = target.closest("a.page_normal, .ps_container .super.button");
        if (!control || control.classList.contains("disable_now")) return;

        try {
          sessionStorage.setItem(
            PAGINATION_JUMP_MARKER_KEY,
            JSON.stringify({ path: topicPath, time: Date.now() }),
          );
        } catch (error) {
          // Referrer detection remains available when session storage is restricted.
        }
      },
      true,
    );

    if (!shouldJump) return;
    const target = document.querySelector("#Main .topic_buttons") || getCommentCells()[0];
    if (!target) return;
    target.classList.add("v2p-lite-reply-jump-target");
    requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }

  function consumePaginationJumpMarker(topicPath) {
    try {
      const raw = sessionStorage.getItem(PAGINATION_JUMP_MARKER_KEY);
      sessionStorage.removeItem(PAGINATION_JUMP_MARKER_KEY);
      if (!raw) return false;
      const marker = JSON.parse(raw);
      return marker.path === topicPath && Date.now() - Number(marker.time) < 15000;
    } catch (error) {
      return false;
    }
  }

  function cameFromAnotherTopicPage(topicPath) {
    if (!document.referrer) return false;
    try {
      const current = new URL(window.location.href);
      const previous = new URL(document.referrer);
      if (previous.origin !== current.origin || previous.pathname !== topicPath) return false;
      const currentPage = current.searchParams.get("p") || "1";
      const previousPage = previous.searchParams.get("p") || "1";
      return currentPage !== previousPage;
    } catch (error) {
      return false;
    }
  }

  function initEmojiPicker() {
    bindReplyEmojiPicker();
    replaceEmojiImagesWithHD(document);
  }

  function bindReplyEmojiPicker() {
    const textarea = document.querySelector("#reply_content");
    const form = textarea && textarea.form;
    if (!textarea || !form || form.dataset.v2pLiteEmojiBound === "1") return false;

    const submitter = form.querySelector('button[type="submit"], input[type="submit"]');
    if (!submitter) return false;

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "v2p-lite-emoji-trigger";
    trigger.title = "插入表情";
    trigger.setAttribute("aria-label", "插入表情");
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-expanded", "false");
    trigger.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><path d="M9 9h.01M15 9h.01"></path></svg>';

    const panel = createEmojiPanel((emoji) => insertTextToTextarea(textarea, emoji));
    const panelId = "v2p-lite-emoji-panel";
    panel.id = panelId;
    trigger.setAttribute("aria-controls", panelId);
    if (docEl.classList.contains("v2p-mobile")) {
      const actions = document.createElement("div");
      actions.className = "v2p-mobile-compose-actions";
      submitter.before(actions);
      actions.append(submitter, trigger);
    } else {
      submitter.insertAdjacentElement("afterend", trigger);
    }
    document.body.appendChild(panel);

    const closePanel = () => {
      if (panel.hidden) return;
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    };
    const positionPanel = () => {
      panel.style.visibility = "hidden";
      panel.hidden = false;
      const triggerRect = trigger.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const viewportPadding = 8;
      const left = Math.min(
        Math.max(viewportPadding, triggerRect.left),
        Math.max(viewportPadding, window.innerWidth - panelRect.width - viewportPadding),
      );
      let top = triggerRect.top - panelRect.height - 8;
      if (top < viewportPadding) top = triggerRect.bottom + 8;
      top = Math.max(
        viewportPadding,
        Math.min(top, window.innerHeight - panelRect.height - viewportPadding),
      );
      panel.style.left = Math.round(left) + "px";
      panel.style.top = Math.round(top) + "px";
      panel.style.visibility = "";
    };

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      if (panel.hidden) {
        positionPanel();
        trigger.setAttribute("aria-expanded", "true");
      } else {
        closePanel();
      }
    });
    panel.addEventListener("click", (event) => event.stopPropagation());
    document.addEventListener("click", closePanel);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closePanel();
    });
    window.addEventListener("resize", closePanel, { passive: true });
    window.addEventListener(
      "scroll",
      () => {
        if (!panel.hidden) positionPanel();
      },
      { passive: true },
    );
    form.addEventListener(
      "submit",
      () => {
        if (!emojiPickerEnabled) return;
        const transformed = transformEmojiTokens(textarea.value);
        if (transformed === textarea.value) return;
        textarea.value = transformed;
        dispatchInput(textarea);
      },
      true,
    );

    form.dataset.v2pLiteEmojiBound = "1";
    return true;
  }

  function createEmojiPanel(insertEmoji) {
    const panel = document.createElement("div");
    panel.className = "v2p-lite-emoji-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "选择表情");
    panel.hidden = true;

    EMOJI_GROUPS.forEach((emojiGroup) => {
      const group = document.createElement("section");
      group.className = "v2p-lite-emoji-group";

      const title = document.createElement("div");
      title.className = "v2p-lite-emoji-title";
      title.textContent = emojiGroup.title;

      const list = document.createElement("div");
      list.className = "v2p-lite-emoji-list";
      emojiGroup.list.forEach((emoji) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "v2p-lite-emoji-item";
        item.title = emoji;
        item.setAttribute("aria-label", emoji);

        const imageLink = EMOJI_LINKS[emoji];
        if (imageLink) {
          const image = document.createElement("img");
          image.src = imageLink.hd;
          image.alt = "";
          image.loading = "lazy";
          item.appendChild(image);
        } else {
          item.textContent = emoji;
        }
        item.addEventListener("click", () => insertEmoji(emoji));
        list.appendChild(item);
      });

      group.append(title, list);
      panel.appendChild(group);
    });
    return panel;
  }

  function transformEmojiTokens(text) {
    return String(text || "").replace(/\[[^\]]+\]/g, (token) => {
      const imageLink = EMOJI_LINKS[token];
      return imageLink ? imageLink.ld + " " : token;
    });
  }

  function replaceEmojiImagesWithHD(root) {
    const sourceMap = new Map(
      Object.values(EMOJI_LINKS).map(({ ld, hd }) => [ld, hd]),
    );
    root
      .querySelectorAll(".reply_content img.embedded_image, .payload img.embedded_image")
      .forEach((image) => {
        const hd = sourceMap.get(image.getAttribute("src") || "");
        if (!hd) return;
        image.src = hd;
        image.classList.add("v2p-lite-emoji-image");
      });
  }

  function bindReplyImageUpload() {
    const textarea = document.querySelector("#reply_content");
    if (!textarea || textarea.dataset.v2pLiteImageUploadBound === "1") return false;
    if (!textarea.parentNode) return false;

    let wrapper = textarea.parentElement;
    if (!wrapper || !wrapper.classList.contains("v2p-reply-wrap")) {
      wrapper = document.createElement("div");
      wrapper.className = "v2p-reply-wrap";
      textarea.parentNode.insertBefore(wrapper, textarea);
      wrapper.appendChild(textarea);
    }

    bindImageUploadToWrapper({
      wrapper,
      pasteTarget: textarea,
      insertText: (text) => insertTextToTextarea(textarea, text),
      replaceText: (find, replace) => replaceTextInTextarea(textarea, find, replace),
      removeText: (imgLink) => replaceTextInTextarea(textarea, imgLink, ""),
    });
    textarea.dataset.v2pLiteImageUploadBound = "1";
    return true;
  }

  function bindEditorImageUpload() {
    const wrapper = document.querySelector("#workspace");
    if (!wrapper || wrapper.dataset.v2pLiteImageUploadBound === "1") return false;

    bindImageUploadToWrapper({
      wrapper,
      pasteTarget: wrapper,
      insertText: insertTextToWriteEditor,
      replaceText: replaceTextInWriteEditor,
      removeText: (imgLink) => {
        replaceTextInWriteEditor("![](" + imgLink + ")", "");
        replaceTextInWriteEditor(imgLink, "");
      },
    });
    return true;
  }

  function bindImageUploadToWrapper({ wrapper, pasteTarget, insertText, replaceText, removeText }) {
    if (!wrapper || wrapper.dataset.v2pLiteImageUploadBound === "1") return;

    wrapper.dataset.v2pLiteImageUploadBound = "1";
    let uploading = false;
    let uploadBar = Array.from(wrapper.children).find((child) =>
      child.classList && child.classList.contains("v2p-reply-upload-bar"),
    );

    if (!uploadBar) {
      uploadBar = document.createElement("div");
      uploadBar.className = "v2p-reply-upload-bar";
      wrapper.appendChild(uploadBar);
    }
    uploadBar.textContent = UPLOAD_TIP;

    let previewList = Array.from(wrapper.children).find((child) =>
      child.classList && child.classList.contains("v2p-image-upload-previews"),
    );
    if (!previewList) {
      previewList = document.createElement("div");
      previewList.className = "v2p-image-upload-previews";
      previewList.setAttribute("aria-live", "polite");
      uploadBar.insertAdjacentElement("afterend", previewList);
    }

    const setUploading = (value) => {
      uploading = value;
      uploadBar.classList.toggle("v2p-reply-upload-bar-disabled", uploading);
      uploadBar.textContent = uploading ? "正在上传图片..." : UPLOAD_TIP;
    };

    const handleUpload = async (file) => {
      if (!isImageFile(file) || uploading) return;

      const placeholder = "[上传图片中...]";
      insertText(" " + placeholder + " ");
      setUploading(true);
      try {
        uploadBar.textContent = "正在处理图片...";
        const preparedImage = await prepareImageForUpload(file);
        uploadBar.textContent = "正在上传图片...";
        const uploadResult = await uploadImage(preparedImage.file);
        replaceText(placeholder, uploadResult.url);
        const showUploadPreview = await readBooleanSetting(SHOW_UPLOAD_PREVIEW_KEY, true);
        if (showUploadPreview) {
          addImageUploadPreview(previewList, file, preparedImage, uploadResult, removeText);
        }
      } catch (error) {
        console.debug("V2EX Plus image upload was not completed:", error);
        replaceText(placeholder, "");
        const message = error && typeof error.userMessage === "string"
          ? error.userMessage
          : "上传图片失败，请稍后重试。";
        window.alert(message);
      } finally {
        setUploading(false);
      }
    };

    uploadBar.addEventListener("click", () => {
      if (uploading) return;
      const imgInput = document.createElement("input");
      imgInput.type = "file";
      imgInput.accept = "image/*";
      imgInput.style.display = "none";
      imgInput.addEventListener(
        "change",
        () => {
          const selectedFile = imgInput.files && imgInput.files[0];
          if (selectedFile) void handleUpload(selectedFile);
          imgInput.remove();
        },
        { once: true },
      );
      document.body.appendChild(imgInput);
      imgInput.click();
    });

    pasteTarget.addEventListener("paste", (event) => {
      const file = getImageFileFromClipboard(event);
      if (!file) return;
      event.preventDefault();
      void handleUpload(file);
    });

    wrapper.addEventListener("dragover", (event) => {
      const types = event.dataTransfer && event.dataTransfer.types;
      if (types && Array.from(types).includes("Files")) event.preventDefault();
    });

    wrapper.addEventListener("drop", (event) => {
      const file = getImageFileFromDataTransfer(event);
      if (!file) return;
      event.preventDefault();
      void handleUpload(file);
    });
  }

  function addImageUploadPreview(previewList, originalFile, preparedImage, uploadResult, removeText) {
    const file = preparedImage.file;
    const imgLink = uploadResult.url;
    const item = document.createElement("div");
    item.className = "v2p-image-upload-preview";

    const thumbLink = document.createElement("a");
    thumbLink.className = "v2p-image-upload-thumb";
    thumbLink.href = imgLink;
    thumbLink.target = "_blank";
    thumbLink.rel = "noopener noreferrer";
    thumbLink.title = "查看原图";

    const image = document.createElement("img");
    image.alt = file.name || "已上传图片";
    image.decoding = "async";

    const info = document.createElement("div");
    info.className = "v2p-image-upload-info";

    const name = document.createElement("div");
    name.className = "v2p-image-upload-name";
    name.textContent = originalFile.name || "粘贴的图片";
    name.title = name.textContent;

    const meta = document.createElement("div");
    meta.className = "v2p-image-upload-meta";
    const sizeDescription = preparedImage.compressed
      ? formatImageFileSize(file.size) + " · 原 " + formatImageFileSize(originalFile.size)
      : formatImageFileSize(file.size);
    meta.textContent = sizeDescription;

    const status = document.createElement("div");
    status.className = "v2p-image-upload-status";
    status.textContent = (preparedImage.compressed ? "已压缩并上传到 " : "已上传到 ") + uploadResult.provider;

    image.addEventListener("load", () => {
      const dimensions = image.naturalWidth && image.naturalHeight
        ? image.naturalWidth + " x " + image.naturalHeight
        : "";
      meta.textContent = [dimensions, sizeDescription].filter(Boolean).join(" · ");
    });
    image.addEventListener("error", () => {
      item.classList.add("v2p-image-upload-preview-error");
      status.textContent = "预览加载失败，请打开原图确认";
    });
    image.src = imgLink;
    thumbLink.appendChild(image);

    info.append(name, meta, status);

    const actions = document.createElement("div");
    actions.className = "v2p-image-upload-actions";

    const openLink = document.createElement("a");
    openLink.className = "v2p-image-upload-action";
    openLink.href = imgLink;
    openLink.target = "_blank";
    openLink.rel = "noopener noreferrer";
    openLink.title = "查看原图";
    openLink.setAttribute("aria-label", "查看原图");
    openLink.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7"></path><path d="M10 14 21 3"></path><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"></path></svg>';

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "v2p-image-upload-action v2p-image-upload-remove";
    removeButton.title = "删除图片";
    removeButton.setAttribute("aria-label", "删除图片");
    removeButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 15H6L5 6"></path><path d="M10 11v6M14 11v6"></path></svg>';
    removeButton.addEventListener("click", async () => {
      if (removeButton.disabled) return;
      const deleteRemote = await readUploadSetting(DELETE_REMOTE_IMAGE_KEY, "false") === "true";
      if (deleteRemote) {
        removeButton.disabled = true;
        status.textContent = "正在删除云端图片...";
        try {
          await deleteUploadedImage(uploadResult);
        } catch (error) {
          removeButton.disabled = false;
          status.textContent = "云端删除失败";
          console.debug("V2EX Plus remote image deletion failed:", error);
          window.alert(error?.userMessage || "云端图片删除失败，请稍后重试。");
          return;
        }
      }
      removeText(imgLink);
      item.remove();
    });

    actions.append(openLink, removeButton);
    item.append(thumbLink, info, actions);
    previewList.appendChild(item);
  }

  function formatImageFileSize(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return "";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  async function prepareImageForUpload(file) {
    const compressionEnabled = await readUploadSetting(COMPRESS_IMAGES_KEY, "false") === "true";
    if (!compressionEnabled || !canCompressImage(file)) {
      return { file, compressed: false };
    }
    if (file.type === "image/png" && await isAnimatedPng(file)) {
      return { file, compressed: false };
    }

    const qualitySetting = Number(await readUploadSetting(COMPRESSION_QUALITY_KEY, "82"));
    const quality = Math.min(0.95, Math.max(0.4, (Number.isFinite(qualitySetting) ? qualitySetting : 82) / 100));
    let decodedImage = null;
    try {
      decodedImage = await decodeImageForCanvas(file);
      const canvas = document.createElement("canvas");
      canvas.width = decodedImage.width;
      canvas.height = decodedImage.height;
      const context = canvas.getContext("2d", { alpha: true });
      if (!context) return { file, compressed: false };
      context.drawImage(decodedImage.source, 0, 0);

      let outputType = supportsCanvasWebPEncoding() ? "image/webp" : "image/jpeg";
      if (outputType === "image/jpeg" && file.type !== "image/jpeg") {
        const canFlattenToJpeg = file.type === "image/png" && !(await pngHasTransparency(file));
        if (!canFlattenToJpeg) return { file, compressed: false };
      }

      const blob = await canvasToBlob(canvas, outputType, quality);
      if (!blob || blob.type !== outputType || blob.size >= file.size) {
        return { file, compressed: false };
      }

      const baseName = (file.name || "image").replace(/\.[^.]+$/, "") || "image";
      return {
        file: new File([blob], baseName + (outputType === "image/webp" ? ".webp" : ".jpg"), {
          type: outputType,
          lastModified: Date.now(),
        }),
        compressed: true,
      };
    } catch (error) {
      console.debug("V2EX Plus image compression was skipped:", error);
      return { file, compressed: false };
    } finally {
      if (decodedImage) decodedImage.release();
    }
  }

  async function decodeImageForCanvas(file) {
    if (typeof createImageBitmap === "function") {
      const bitmap = await createImageBitmap(file);
      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        release: () => bitmap.close(),
      };
    }

    const objectUrl = URL.createObjectURL(file);
    try {
      const image = await new Promise((resolve, reject) => {
        const element = new Image();
        element.onload = () => resolve(element);
        element.onerror = () => reject(new Error("Unable to decode image for compression."));
        element.src = objectUrl;
      });
      return {
        source: image,
        width: image.naturalWidth,
        height: image.naturalHeight,
        release: () => URL.revokeObjectURL(objectUrl),
      };
    } catch (error) {
      URL.revokeObjectURL(objectUrl);
      throw error;
    }
  }

  function canCompressImage(file) {
    return ["image/png", "image/jpeg", "image/webp"].includes(file.type);
  }

  let canvasWebPSupport;
  function supportsCanvasWebPEncoding() {
    if (typeof canvasWebPSupport === "boolean") return canvasWebPSupport;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      canvasWebPSupport = canvas.toDataURL("image/webp", 0.8).startsWith("data:image/webp");
    } catch {
      canvasWebPSupport = false;
    }
    return canvasWebPSupport;
  }

  async function pngHasTransparency(file) {
    try {
      const bytes = new Uint8Array(await file.slice(0, 256 * 1024).arrayBuffer());
      if (bytes.length < 33 || bytes[25] === 4 || bytes[25] === 6) return true;

      let offset = 8;
      while (offset + 12 <= bytes.length) {
        const length =
          ((bytes[offset] << 24) >>> 0) +
          (bytes[offset + 1] << 16) +
          (bytes[offset + 2] << 8) +
          bytes[offset + 3];
        const type = String.fromCharCode(
          bytes[offset + 4],
          bytes[offset + 5],
          bytes[offset + 6],
          bytes[offset + 7],
        );
        if (type === "tRNS") return true;
        if (type === "IDAT" || type === "IEND") return false;
        offset += length + 12;
      }
    } catch {
      return true;
    }
    return true;
  }

  async function isAnimatedPng(file) {
    try {
      const bytes = new Uint8Array(await file.slice(0, 64 * 1024).arrayBuffer());
      for (let index = 8; index <= bytes.length - 4; index += 1) {
        if (bytes[index] === 0x61 && bytes[index + 1] === 0x63 && bytes[index + 2] === 0x54 && bytes[index + 3] === 0x4c) {
          return true;
        }
      }
    } catch {
      // If detection fails, the normal compression fallback still protects upload availability.
    }
    return false;
  }

  function canvasToBlob(canvas, type, quality) {
    return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
  }

  async function uploadImage(file) {
    const settings = await loadSettingsSnapshot();
    const imageHost = settings[IMAGE_HOST_KEY] || "imgur";
    if (imageHost === "r2") {
      return { ...(await uploadImageToR2(file, settings)), provider: "Cloudflare R2", imageHost: "r2" };
    }
    return { ...(await uploadImageToImgur(file, settings)), provider: "Imgur", imageHost: "imgur" };
  }

  async function uploadImageToR2(file, settings) {
    let token = String(settings[R2_UPLOAD_TOKEN_KEY] || "").trim();
    if (!token) {
      token = isExtensionRuntime()
        ? ""
        : window.prompt("首次上传需要输入 R2 上传令牌：")?.trim() || "";
      if (!token) {
        throw createImageUploadError(
          "R2 upload token was not provided",
          isExtensionRuntime()
            ? "尚未配置 R2 上传令牌，请点击插件图标打开设置。"
            : "未输入上传令牌，已取消上传。",
        );
      }
      await writeR2UploadToken(token);
    }

    const endpoint = String(settings[R2_UPLOAD_ENDPOINT_KEY] || DEFAULT_R2_UPLOAD_ENDPOINT).trim();

    const formData = new FormData();
    formData.append("image", file);
    let response;
    try {
      response = await requestWithTimeout(endpoint, {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: formData,
      }, 60000);
    } catch (error) {
      throw createImageUploadError(
        "R2 upload network error: " + (error && error.message ? error.message : error),
        "无法连接图片上传服务，请检查网络后重试。",
      );
    }

    let responseData = null;
    try {
      responseData = await response.json();
    } catch {
      // Keep the HTTP status as the primary error when the response is not JSON.
    }

    if (response.ok && responseData && responseData.success && responseData.url) {
      return { url: responseData.url, key: responseData.key, endpoint };
    }

    if (response.status === 401) {
      await removeR2UploadToken();
      throw createImageUploadError(
        "R2 upload token was rejected",
        "上传令牌无效，已从本机清除。请重新上传并输入新令牌。",
      );
    }

    const apiMessage = responseData && typeof responseData.error === "string"
      ? responseData.error
      : "HTTP " + response.status;
    const userMessage = response.status === 413
      ? "图片超过 10 MB，无法上传。"
      : response.status === 415
        ? "仅支持 PNG、JPEG、GIF、WebP 和 AVIF 图片。"
        : "上传图片失败：" + apiMessage;
    throw createImageUploadError("R2 upload failed: " + apiMessage, userMessage);
  }

  async function uploadImageToImgur(file, settings) {
    const clientId = String(settings[IMGUR_CLIENT_ID_KEY] || "").trim() || DEFAULT_IMGUR_CLIENT_ID;

    const formData = new FormData();
    formData.append("image", file);
    let response;
    try {
      response = await requestWithTimeout("https://api.imgur.com/3/upload", {
        method: "POST",
        headers: { Authorization: "Client-ID " + clientId },
        body: formData,
      }, 60000);
    } catch (error) {
      throw createImageUploadError(
        "Imgur upload network error: " + (error && error.message ? error.message : error),
        "无法连接 Imgur，请检查网络后重试。",
      );
    }

    let responseData = null;
    try {
      responseData = await response.json();
    } catch {
      // Keep the HTTP status as the primary error when the response is not JSON.
    }

    if (response.ok && responseData && responseData.success && responseData.data?.link) {
      return { url: responseData.data.link, deleteHash: responseData.data.deletehash || "", clientId };
    }

    const imgurError = responseData?.data?.error;
    const apiMessage = typeof imgurError === "string"
      ? imgurError
      : imgurError?.message || "HTTP " + response.status;
    const userMessage = response.status === 401 || response.status === 403
      ? (isExtensionRuntime() ? "Imgur 拒绝上传，请检查 Client ID 或稍后重试。" : "Imgur 暂时拒绝上传，请稍后重试或更新脚本。")
      : response.status === 429
        ? "Imgur 上传额度已用完，请稍后重试。"
        : "Imgur 上传失败：" + apiMessage;
    throw createImageUploadError("Imgur upload failed: " + apiMessage, userMessage);
  }

  async function deleteUploadedImage(uploadResult) {
    if (uploadResult.imageHost === "imgur") {
      return deleteImgurImage(uploadResult);
    }
    return deleteR2Image(uploadResult);
  }

  async function deleteR2Image(uploadResult) {
    if (!uploadResult.key || !uploadResult.endpoint) {
      throw createImageUploadError("R2 deletion metadata is missing", "缺少云端删除信息，无法删除图片。");
    }
    const token = await readR2UploadToken();
    if (!token) {
      throw createImageUploadError("R2 upload token is missing", "R2 上传令牌已丢失，无法删除图片。");
    }

    const deleteUrl = new URL(uploadResult.endpoint);
    deleteUrl.searchParams.set("key", uploadResult.key);
    let response;
    try {
      response = await requestWithTimeout(deleteUrl, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error) {
      throw createImageUploadError(
        "R2 deletion network error: " + (error?.message || error),
        "无法连接 R2 删除服务，请检查网络后重试。",
      );
    }
    if (response.ok) return;
    if (response.status === 401) await removeR2UploadToken();
    throw createImageUploadError(
      "R2 deletion failed with HTTP " + response.status,
      response.status === 401
        ? "R2 上传令牌无效，已从本机清除。"
        : "R2 云端图片删除失败（HTTP " + response.status + "）。",
    );
  }

  async function deleteImgurImage(uploadResult) {
    if (!uploadResult.deleteHash) {
      throw createImageUploadError("Imgur delete hash is missing", "Imgur 未返回删除凭据，无法删除云端图片。");
    }
    const clientId = uploadResult.clientId || String(await readUploadSetting(IMGUR_CLIENT_ID_KEY, "")).trim() || DEFAULT_IMGUR_CLIENT_ID;
    let response;
    try {
      response = await requestWithTimeout("https://api.imgur.com/3/image/" + encodeURIComponent(uploadResult.deleteHash), {
        method: "DELETE",
        headers: { Authorization: "Client-ID " + clientId },
      });
    } catch (error) {
      throw createImageUploadError(
        "Imgur deletion network error: " + (error?.message || error),
        "无法连接 Imgur 删除服务，请检查网络后重试。",
      );
    }
    if (response.ok) return;
    throw createImageUploadError(
      "Imgur deletion failed with HTTP " + response.status,
      "Imgur 云端图片删除失败（HTTP " + response.status + "）。",
    );
  }

  function createImageUploadError(message, userMessage) {
    const error = new Error(message);
    error.userMessage = userMessage;
    return error;
  }

  function isExtensionRuntime() {
    return Boolean(globalThis.browser?.runtime?.id || globalThis.chrome?.runtime?.id);
  }

  async function applyDisplaySettings() {
    const revision = settingsRevision;
    const [
      topicRowSpacing,
      replyLineHeight,
      contentCardRadius,
      showReplyFloor,
      showUploadPreview,
      nestedReplies,
      emojiPicker,
      fixedSidebarTools,
      expandReplyToolbar,
      nodeIcons,
      showAds,
    ] = await Promise.all([
      readUploadSetting(TOPIC_ROW_SPACING_KEY, "standard"),
      readUploadSetting(REPLY_LINE_HEIGHT_KEY, "1.6"),
      readUploadSetting(CONTENT_CARD_RADIUS_KEY, "18"),
      readBooleanSetting(SHOW_REPLY_FLOOR_KEY, true),
      readBooleanSetting(SHOW_UPLOAD_PREVIEW_KEY, true),
      readBooleanSetting(NESTED_REPLIES_KEY, true),
      readBooleanSetting(EMOJI_PICKER_KEY, true),
      readBooleanSetting(FIXED_SIDEBAR_TOOLS_KEY, true),
      readBooleanSetting(EXPAND_REPLY_TOOLBAR_KEY, true),
      readBooleanSetting(NODE_ICONS_KEY, true),
      readBooleanSetting(SHOW_ADS_KEY, false),
    ]);

    if (revision !== settingsRevision) return applyDisplaySettings();
    applyDisplaySettingValues({
      topicRowSpacing,
      replyLineHeight,
      contentCardRadius,
      showReplyFloor,
      showUploadPreview,
      nestedReplies,
      emojiPicker,
      fixedSidebarTools,
      expandReplyToolbar,
      nodeIcons,
      showAds,
    });
  }

  function applyDisplaySettingValues({
    topicRowSpacing,
    replyLineHeight,
    contentCardRadius,
    showReplyFloor,
    showUploadPreview,
    nestedReplies,
    emojiPicker,
    fixedSidebarTools,
    expandReplyToolbar,
    nodeIcons,
    showAds,
  }) {
    const topicRowPadding = {
      compact: "8px",
      standard: "12px",
      relaxed: "16px",
    }[topicRowSpacing] || "12px";
    const lineHeightValue = String(replyLineHeight ?? "");
    const radiusValue = String(contentCardRadius ?? "");
    const normalizedLineHeight = ["1.4", "1.6", "1.8", "2"].includes(lineHeightValue)
      ? lineHeightValue
      : "1.6";
    const normalizedRadius = ["0", "6", "10", "14", "18"].includes(radiusValue)
      ? radiusValue
      : "18";

    docEl.style.setProperty("--v2p-topic-row-padding", topicRowPadding);
    docEl.style.setProperty("--v2p-reply-line-height", normalizedLineHeight);
    docEl.style.setProperty("--v2p-box-radius", normalizedRadius + "px");
    docEl.classList.toggle("v2p-hide-reply-floor", !showReplyFloor);
    docEl.classList.toggle("v2p-hide-upload-preview", !showUploadPreview);
    docEl.classList.toggle("v2p-disable-nested-replies", !nestedReplies);
    docEl.classList.toggle("v2p-hide-emoji-picker", !emojiPicker);
    docEl.classList.toggle("v2p-unpin-topic-card", !fixedSidebarTools);
    docEl.classList.toggle("v2p-expand-reply-toolbar", Boolean(expandReplyToolbar));
    docEl.classList.toggle("v2p-hide-node-icons", !nodeIcons);
    docEl.classList.toggle("v2p-show-ads", Boolean(showAds));

    emojiPickerEnabled = emojiPicker !== false;
    const shouldExpandReplyToolbar = Boolean(expandReplyToolbar);
    if (defaultReplyToolbarExpanded !== shouldExpandReplyToolbar) {
      defaultReplyToolbarExpanded = shouldExpandReplyToolbar;
      setTopicToolsExpanded(shouldExpandReplyToolbar);
    }
    if (pageInitialized) {
      if (emojiPickerEnabled) initEmojiPicker();
      if (appliedDisplaySettings.nestedReplies !== nestedReplies || (nestedReplies !== false && !nestedReplyApplied)) {
        if (nestedReplies === false) flattenNestedReplies();
        else initNestedReplies();
      }
      appliedDisplaySettings = { nestedReplies };
    }
  }

  function bindDisplaySettingChanges() {
    const storage = globalThis.browser?.storage || globalThis.chrome?.storage;
    if (!storage?.onChanged?.addListener) return;
    const displayKeys = new Set([
      TOPIC_ROW_SPACING_KEY,
      REPLY_LINE_HEIGHT_KEY,
      CONTENT_CARD_RADIUS_KEY,
      SHOW_REPLY_FLOOR_KEY,
      SHOW_UPLOAD_PREVIEW_KEY,
      NESTED_REPLIES_KEY,
      EMOJI_PICKER_KEY,
      FIXED_SIDEBAR_TOOLS_KEY,
      EXPAND_REPLY_TOOLBAR_KEY,
      NODE_ICONS_KEY,
      SHOW_ADS_KEY,
    ]);
    storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== "local") return;
      settingsRevision += 1;
      settingsLoad = null;
      if (settingsSnapshot) {
        settingsSnapshot = { ...settingsSnapshot };
        for (const [key, change] of Object.entries(changes)) {
          if (change.newValue === undefined) delete settingsSnapshot[key];
          else settingsSnapshot[key] = change.newValue;
        }
      }
      if (Object.keys(changes).some((key) => displayKeys.has(key))) void applyDisplaySettings();
    });
  }

  async function loadSettingsSnapshot() {
    if (!isExtensionRuntime()) return {};
    if (settingsSnapshot) return settingsSnapshot;
    if (settingsLoad) return settingsLoad;
    const revision = settingsRevision;
    const load = (async () => {
      let values;
      if (globalThis.browser?.storage?.local) values = await browser.storage.local.get(null);
      else values = await new Promise((resolve, reject) => {
        chrome.storage.local.get(null, (result) => {
          const error = chrome.runtime.lastError;
          if (error) reject(new Error(error.message));
          else resolve(result || {});
        });
      });
      if (revision !== settingsRevision) return loadSettingsSnapshot();
      settingsSnapshot = values;
      return values;
    })();
    settingsLoad = load;
    try { return await load; }
    finally { if (settingsLoad === load) settingsLoad = null; }
  }

  async function readUploadSetting(key, fallback) {
    if (!isExtensionRuntime()) return fallback;
    try { return String((await loadSettingsSnapshot())[key] ?? fallback).trim(); }
    catch (error) { console.warn("V2EX Plus could not read settings:", error); return fallback; }
  }

  async function readBooleanSetting(key, fallback) {
    if (!isExtensionRuntime()) return fallback;
    try {
      const value = (await loadSettingsSnapshot())[key];
      if (value === undefined || value === null) return fallback;
      return value !== false && value !== 0 && value !== "false";
    } catch (error) { console.warn("V2EX Plus could not read settings:", error); return fallback; }
  }

  async function readR2UploadToken() {
    try {
      if (typeof GM_getValue === "function") {
        return String(GM_getValue(R2_UPLOAD_TOKEN_KEY, "") || "").trim();
      }
      if (globalThis.browser && browser.storage && browser.storage.local) {
        const result = await browser.storage.local.get(R2_UPLOAD_TOKEN_KEY);
        return String(result[R2_UPLOAD_TOKEN_KEY] || "").trim();
      }
      if (globalThis.chrome && chrome.storage && chrome.storage.local) {
        return await new Promise((resolve) => {
          chrome.storage.local.get(R2_UPLOAD_TOKEN_KEY, (result) => {
            resolve(String((result && result[R2_UPLOAD_TOKEN_KEY]) || "").trim());
          });
        });
      }
    } catch (error) {
      console.warn("V2EX Plus could not read extension storage:", error);
    }
    return "";
  }

  async function writeR2UploadToken(token) {
    try {
      if (typeof GM_setValue === "function") {
        GM_setValue(R2_UPLOAD_TOKEN_KEY, token);
        return;
      }
      if (globalThis.browser && browser.storage && browser.storage.local) {
        await browser.storage.local.set({ [R2_UPLOAD_TOKEN_KEY]: token });
        return;
      }
      if (globalThis.chrome && chrome.storage && chrome.storage.local) {
        await new Promise((resolve) => chrome.storage.local.set({ [R2_UPLOAD_TOKEN_KEY]: token }, resolve));
        return;
      }
    } catch (error) {
      console.warn("V2EX Plus could not write extension storage:", error);
    }
  }

  async function removeR2UploadToken() {
    try {
      if (typeof GM_deleteValue === "function") {
        GM_deleteValue(R2_UPLOAD_TOKEN_KEY);
      } else if (globalThis.browser && browser.storage && browser.storage.local) {
        await browser.storage.local.remove(R2_UPLOAD_TOKEN_KEY);
      } else if (globalThis.chrome && chrome.storage && chrome.storage.local) {
        await new Promise((resolve) => chrome.storage.local.remove(R2_UPLOAD_TOKEN_KEY, resolve));
      }
    } catch (error) {
      console.warn("V2EX Plus could not clear extension storage:", error);
    }
  }

  function isImageFile(file) {
    if (!file) return false;
    if (file.type && file.type.indexOf("image/") === 0) return true;
    return /\.(apng|avif|gif|jpe?g|png|webp)$/i.test(file.name || "");
  }

  function getImageFileFromClipboard(event) {
    const items = event.clipboardData && event.clipboardData.items;
    if (!items) return null;
    const imageItem = Array.from(items).find((item) => item.type && item.type.indexOf("image/") === 0);
    return imageItem ? imageItem.getAsFile() : null;
  }

  function getImageFileFromDataTransfer(event) {
    const files = event.dataTransfer && event.dataTransfer.files;
    if (!files || files.length === 0) return null;
    return Array.from(files).find(isImageFile) || null;
  }

  function insertTextToTextarea(textarea, text) {
    const value = textarea.value || "";
    const start = typeof textarea.selectionStart === "number" ? textarea.selectionStart : value.length;
    const end = typeof textarea.selectionEnd === "number" ? textarea.selectionEnd : start;
    textarea.value = value.slice(0, start) + text + value.slice(end);
    focusTextareaAt(textarea, start + text.length);
    dispatchInput(textarea);
  }

  function replaceTextInTextarea(textarea, find, replace) {
    const value = textarea.value || "";
    const index = value.indexOf(find);
    if (index < 0) return;
    textarea.value = value.slice(0, index) + replace + value.slice(index + find.length);
    focusTextareaAt(textarea, index + replace.length);
    dispatchInput(textarea);
  }

  function focusTextareaAt(textarea, cursor) {
    textarea.focus();
    if (typeof textarea.setSelectionRange !== "function") return;
    try {
      textarea.setSelectionRange(cursor, cursor);
    } catch (error) {
      // Some mobile browsers reject selection changes while the field is blurred.
    }
  }

  function dispatchInput(el) {
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function getCodeMirrorEditor() {
    const pageEditor = window.editor;
    if (pageEditor && typeof pageEditor.getDoc === "function") return pageEditor;

    const codeMirrorEl = document.querySelector(".CodeMirror");
    if (codeMirrorEl && codeMirrorEl.CodeMirror && typeof codeMirrorEl.CodeMirror.getDoc === "function") {
      return codeMirrorEl.CodeMirror;
    }
    return null;
  }

  function postWriteEditorMessage(action, payload) {
    window.postMessage(
      Object.assign(
        {
          source: "v2p-content",
          type: "v2p:write-editor",
          action,
        },
        payload,
      ),
      window.location.origin,
    );
  }

  function insertTextToWriteEditor(text) {
    const editor = getCodeMirrorEditor();
    if (editor) {
      insertTextToEditor(editor, text);
      return;
    }
    postWriteEditorMessage("insert", { text });
  }

  function replaceTextInWriteEditor(find, replace) {
    const editor = getCodeMirrorEditor();
    if (editor) {
      replaceTextInEditor(editor, find, replace);
      return;
    }
    postWriteEditorMessage("replace", { find, replace });
  }

  function insertTextToEditor(editor, text) {
    const doc = editor.getDoc();
    doc.replaceRange(text, doc.getCursor());
    if (typeof editor.focus === "function") editor.focus();
  }

  function replaceTextInEditor(editor, find, replace) {
    const doc = editor.getDoc();
    const value = doc.getValue();
    const replacement = replace || "";
    doc.setValue(value.replace(find, replacement));
    if (typeof editor.focus === "function") editor.focus();
  }

  function initTopicSidebarTools() {
    if (topicToolsInitialized || !/^\/t\/\d+/.test(window.location.pathname)) return;

    const rightbar = document.getElementById("Rightbar");
    const memberActivity = document.getElementById("member-activity");
    const infoCard = memberActivity && memberActivity.closest(".box");
    if (!rightbar || !infoCard || !rightbar.contains(infoCard)) return;

    const removeDuplicateToolRows = (keep) => {
      Array.from(infoCard.children).forEach((child) => {
        if (child === keep || !child.classList) return;
        if (child.classList.contains("v2p-tools") || child.classList.contains("v2p-lite-topic-tools")) {
          child.remove();
        }
      });
    };
    removeDuplicateToolRows(null);

    const tools = document.createElement("div");
    tools.className = "cell v2p-lite-topic-tools";
    tools.setAttribute("aria-label", "主题工具");

    const replyButton = createTopicToolButton(
      "v2p-lite-topic-tool-reply",
      "回复主题",
      '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4Z"/><path d="m10 15-3-3 3-3"/><path d="M7 12h8"/>',
      "回复",
    );
    const topButton = createTopicToolButton(
      "v2p-lite-topic-tool-top",
      "回到顶部",
      '<path d="m18 9-6-6-6 6"/><path d="M12 3v14"/><path d="M5 21h14"/>',
      "顶部",
    );
    const moreButton = createTopicToolButton(
      "v2p-lite-topic-tool-more",
      "更多功能",
      '<circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
      "更多",
    );
    moreButton.setAttribute("aria-expanded", "false");
    tools.append(replyButton, topButton, moreButton);
    infoCard.appendChild(tools);
    if (typeof MutationObserver === "function") {
      const duplicateToolObserver = new MutationObserver(() => removeDuplicateToolRows(tools));
      duplicateToolObserver.observe(infoCard, { childList: true });
    }

    const panel = document.createElement("div");
    panel.id = "v2p-lite-topic-tool-panel";
    panel.className = "v2p-lite-topic-tool-panel";
    panel.setAttribute("role", "toolbar");
    panel.setAttribute("aria-label", "更多主题工具");
    moreButton.setAttribute("aria-controls", panel.id);
    let selectedBase64Snapshot = null;

    const memberRefButton = createTopicMenuButton(
      "显示或隐藏 @ 用户名",
      "用户名",
      '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
      () => {
        const refs = Array.from(document.querySelectorAll("#Main .v2p-member-ref"));
        if (refs.length === 0) {
          showLiteToast("本页没有隐藏的 @ 用户名");
          return;
        }

        topicMemberRefsVisible = !topicMemberRefsVisible;
        refs.forEach((ref) => ref.classList.toggle("v2p-member-ref-show", topicMemberRefsVisible));
        setTopicMenuButtonLabel(
          memberRefButton,
          topicMemberRefsVisible ? "隐藏 @ 用户名" : "显示 @ 用户名",
          "用户名",
        );
      },
    );
    const decodeSelectedButton = createTopicMenuButton(
      "解析选中的 Base64 文本",
      "解码",
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M2 15h10"/><path d="m9 12 3 3-3 3"/>',
      () => {
        decodeSelectedBase64Text(selectedBase64Snapshot || captureTopicTextSelection());
        selectedBase64Snapshot = null;
      },
    );
    decodeSelectedButton.addEventListener("pointerdown", () => {
      selectedBase64Snapshot = captureTopicTextSelection();
    });
    const encodeButton = createTopicMenuButton(
      "文本转 Base64",
      "编码",
      '<path d="M14 2H6a2 2 0 0 0-2 2v6"/><path d="M14 2v6h6"/><path d="M20 8v12a2 2 0 0 1-2 2H6"/><path d="M12 15H2"/><path d="m5 12-3 3 3 3"/>',
      encodeTextForTopicReply,
    );
    panel.append(memberRefButton, decodeSelectedButton, encodeButton);
    infoCard.appendChild(panel);

    replyButton.addEventListener("click", focusTopicReplyEditor);
    topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    moreButton.addEventListener("pointerdown", () => {
      selectedBase64Snapshot = captureTopicTextSelection();
    });
    moreButton.addEventListener("click", (event) => {
      event.stopPropagation();
      setTopicToolsExpanded(moreButton.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setTopicToolsExpanded(false);
    });

    const naturalRect = infoCard.getBoundingClientRect();
    const naturalStyle = window.getComputedStyle(infoCard);
    const verticalMargins =
      (parseFloat(naturalStyle.marginTop) || 0) + (parseFloat(naturalStyle.marginBottom) || 0);
    const preferredTop = Math.max(12, Math.min(naturalRect.top, 120));
    const placeholder = document.createElement("div");
    placeholder.className = "v2p-lite-topic-tool-placeholder";
    placeholder.setAttribute("aria-hidden", "true");
    rightbar.insertBefore(placeholder, infoCard);

    const syncPlaceholderHeight = () => {
      placeholder.style.height = Math.ceil(infoCard.getBoundingClientRect().height + verticalMargins) + "px";
    };
    let positionFrame = 0;
    const positionCard = () => {
      positionFrame = 0;
      if (!window.matchMedia("(min-width: 901px)").matches) return;

      const placeholderRect = placeholder.getBoundingClientRect();
      if (placeholderRect.width <= 0) return;

      const cardHeight = infoCard.getBoundingClientRect().height;
      const usableCardHeight = Math.min(cardHeight, Math.max(0, window.innerHeight - 24));
      const maxTop = Math.max(12, window.innerHeight - usableCardHeight - 12);
      infoCard.style.setProperty("--v2p-lite-topic-card-top", Math.round(Math.min(preferredTop, maxTop)) + "px");
      infoCard.style.setProperty("--v2p-lite-topic-card-left", Math.round(placeholderRect.left) + "px");
      infoCard.style.setProperty("--v2p-lite-topic-card-width", Math.round(placeholderRect.width) + "px");
    };
    const scheduleCardPosition = () => {
      if (positionFrame) cancelAnimationFrame(positionFrame);
      positionFrame = requestAnimationFrame(positionCard);
    };

    syncPlaceholderHeight();
    positionCard();
    infoCard.classList.add("v2p-lite-topic-tool-card");
    setTopicToolsExpanded(docEl.classList.contains("v2p-expand-reply-toolbar"));
    scheduleCardPosition();
    window.addEventListener("resize", () => {
      scheduleCardPosition();
    });
    if (typeof ResizeObserver === "function") {
      const cardObserver = new ResizeObserver(() => {
        syncPlaceholderHeight();
        scheduleCardPosition();
      });
      cardObserver.observe(infoCard);
    }

    topicToolsInitialized = true;
  }

  function setTopicToolsExpanded(expanded) {
    const card = document.querySelector("#Rightbar > .box.v2p-lite-topic-tool-card");
    const panel = card && card.querySelector(":scope > .v2p-lite-topic-tool-panel");
    const moreButton = card && card.querySelector(".v2p-lite-topic-tool-more");
    if (!card || !panel || !moreButton) return false;

    panel.hidden = !expanded;
    card.classList.toggle("v2p-topic-toolbar-expanded", expanded);
    moreButton.setAttribute("aria-expanded", String(expanded));
    return true;
  }

  function createTopicToolButton(className, label, iconPaths, visibleLabel = label) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "v2p-lite-topic-tool " + className;
    button.title = label;
    button.setAttribute("aria-label", label);
    button.innerHTML = buildSvgIcon(iconPaths) + "<span>" + escapeHtml(visibleLabel) + "</span>";
    return button;
  }

  function createTopicMenuButton(label, visibleLabel, iconPaths, action) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "v2p-lite-topic-menu-item";
    button.title = label;
    button.setAttribute("aria-label", label);
    button.innerHTML = buildSvgIcon(iconPaths) + "<span>" + escapeHtml(visibleLabel) + "</span>";
    button.addEventListener("click", action);
    return button;
  }

  function setTopicMenuButtonLabel(button, label, visibleLabel) {
    button.title = label;
    button.setAttribute("aria-label", label);
    const text = button.querySelector("span");
    if (text) text.textContent = visibleLabel;
  }

  function focusTopicReplyEditor() {
    const textarea = document.querySelector("#reply_content");
    if (textarea) {
      try {
        textarea.focus({ preventScroll: true });
      } catch (error) {
        textarea.focus();
      }
      textarea.scrollIntoView({ behavior: "smooth", block: "center" });
      return true;
    }

    const editor = getCodeMirrorEditor();
    if (!editor) return false;
    if (typeof editor.focus === "function") editor.focus();
    const wrapper = typeof editor.getWrapperElement === "function" ? editor.getWrapperElement() : null;
    if (wrapper) wrapper.scrollIntoView({ behavior: "smooth", block: "center" });
    return true;
  }

  function encodeTextForTopicReply() {
    focusTopicReplyEditor();
    const inputText = window.prompt("输入要转换为 Base64 的文本，转换结果将插入回复框：");
    if (inputText === null || inputText === "") return;

    try {
      const encodedText = encodeUtf8Base64(inputText);
      const textarea = document.querySelector("#reply_content");
      if (textarea) {
        insertTextToTextarea(textarea, encodedText);
      } else {
        const editor = getCodeMirrorEditor();
        if (!editor) {
          showLiteToast("未找到回复输入框");
          return;
        }
        insertTextToEditor(editor, encodedText);
      }
      showLiteToast("Base64 已插入回复框");
    } catch (error) {
      console.error("转换 Base64 出错：", error);
      showLiteToast("该文本无法转换为 Base64");
    }
  }

  function encodeUtf8Base64(text) {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    const chunkSize = 0x8000;
    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }
    return window.btoa(binary);
  }

  function captureTopicTextSelection() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null;

    const range = selection.getRangeAt(0);
    const main = document.getElementById("Main");
    if (!main || !main.contains(range.commonAncestorContainer)) return null;

    const text = selection.toString().trim();
    if (!text) return null;
    return { text, range: range.cloneRange() };
  }

  function decodeSelectedBase64Text(snapshot) {
    const selectionSnapshot = snapshot || captureTopicTextSelection();
    if (!selectionSnapshot) {
      showLiteToast("请先选择 Base64 文本");
      return;
    }

    const candidate = selectionSnapshot.text.replace(/\s+/g, "");
    const decodedText = decodeUtf8Base64(candidate);
    if (decodedText === null) {
      showLiteToast("选中的文本不是有效的 UTF-8 Base64");
      return;
    }

    const range = selectionSnapshot.range;
    if (!range.commonAncestorContainer.isConnected) {
      showLiteToast("选中的文本已失效，请重新选择");
      return;
    }

    range.collapse(false);
    range.insertNode(createBase64DecodedBlock(decodedText));
    const selection = window.getSelection();
    if (selection) selection.removeAllRanges();
    showLiteToast("已解析选中的 Base64 文本");
  }

  function decodeBase64TopicPage() {
    if (topicBase64Decoded) {
      showLiteToast("已解析完本页所有 Base64 字符串");
      return;
    }

    const roots = Array.from(document.querySelectorAll("#Main .topic_content, #Main .reply_content"));
    const excluded = new Set([
      "boss",
      "bilibili",
      "Bilibili",
      "Encrypto",
      "encrypto",
      "Window10",
      "airpords",
      "Windows7",
    ]);
    let count = 0;

    roots.forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent || !(node.nodeValue || "").trim()) return NodeFilter.FILTER_REJECT;
          return parent.closest("a, code, pre, script, style, textarea, input, .v2p-lite-decode-block")
            ? NodeFilter.FILTER_REJECT
            : NodeFilter.FILTER_ACCEPT;
        },
      });
      const textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);

      textNodes.forEach((textNode) => {
        const text = textNode.nodeValue || "";
        const matches = Array.from(text.matchAll(/[A-Za-z0-9+/]{9,}={0,2}/g));
        if (matches.length === 0) return;

        const fragment = document.createDocumentFragment();
        let cursor = 0;
        let changed = false;
        matches.forEach((match) => {
          const candidate = match[0];
          const start = match.index;
          const end = start + candidate.length;
          const previousChar = start > 0 ? text[start - 1] : "";
          const nextChar = end < text.length ? text[end] : "";
          fragment.appendChild(document.createTextNode(text.slice(cursor, end)));
          cursor = end;

          if (
            candidate.length % 4 !== 0 ||
            excluded.has(candidate) ||
            /[A-Za-z0-9+/=]/.test(previousChar) ||
            /[A-Za-z0-9+/=]/.test(nextChar)
          ) {
            return;
          }

          const decodedText = decodeUtf8Base64(candidate);
          if (decodedText === null) return;

          fragment.appendChild(createBase64DecodedBlock(decodedText));
          count += 1;
          changed = true;
        });
        fragment.appendChild(document.createTextNode(text.slice(cursor)));
        if (changed) textNode.replaceWith(fragment);
      });
    });

    topicBase64Decoded = true;
    showLiteToast(count > 0 ? "已解析 " + count + " 个 Base64 字符串" : "本页没有可解析的 Base64 字符串");
  }

  function createBase64DecodedBlock(decodedText) {
    const decodedBlock = document.createElement("span");
    decodedBlock.className = "v2p-lite-decode-block";
    decodedBlock.appendChild(document.createTextNode("("));

    const decoded = document.createElement("ins");
    decoded.className = "v2p-lite-decode";
    decoded.title = "点击复制";
    decoded.textContent = decodedText;
    decoded.addEventListener("click", async () => {
      try {
        await copyLiteText(decodedText);
        showLiteToast("已复制解析内容");
      } catch (error) {
        showLiteToast("复制失败");
      }
    });

    decodedBlock.append(decoded, document.createTextNode(")"));
    return decodedBlock;
  }

  function decodeUtf8Base64(text) {
    try {
      const binary = window.atob(text);
      if (window.btoa(binary).replace(/=+$/, "") !== text.replace(/=+$/, "")) return null;

      const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
      const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
      if (!decoded.trim() || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(decoded)) return null;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  async function copyLiteText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (error) {
        // Fall back to execCommand for Safari userscript contexts.
      }
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("Copy command failed");
  }

  function showLiteToast(message) {
    let toast = document.getElementById("v2p-lite-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "v2p-lite-toast";
      toast.className = "v2p-lite-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    if (liteToastTimer) clearTimeout(liteToastTimer);
    liteToastTimer = setTimeout(() => {
      toast.remove();
      liteToastTimer = null;
    }, 2200);
  }

  function initMemberActivityRing() {
    const mobile = docEl.classList.contains("v2p-mobile");
    const activitySource = mobile
      ? document.querySelector("#menu-body .member-activity-mobile-wrapper, #menu-body #member-activity, #menu-body .member-activity-bar")
      : document.getElementById("member-activity");
    const infoCard = activitySource?.closest(".box");
    const activityProgress = activitySource?.querySelector('[class^="member-activity-"]:not(.member-activity-bar)');
    const avatar = mobile
      ? document.querySelector("#menu-entry img.avatar")
      : infoCard?.querySelector(".cell:first-child table:first-of-type img.avatar");
    const avatarLink = mobile ? avatar?.parentElement : avatar?.closest("a");
    if (!activitySource || !activityProgress || !avatar || !avatarLink) return false;

    const inlineWidth = activityProgress.style.width || "";
    let percentage = parseFloat(inlineWidth);
    if (!inlineWidth.includes("%")) {
      const barWidth = activityProgress.parentElement?.getBoundingClientRect().width || 0;
      const progressWidth = activityProgress.getBoundingClientRect().width;
      percentage = barWidth > 0 ? progressWidth / barWidth * 100 : percentage;
    }
    percentage = Math.max(0, Math.min(100, Number.isFinite(percentage) ? percentage : 0));
    const progressColor = getComputedStyle(activityProgress).backgroundColor;

    infoCard?.classList.add("v2p-lite-member-card");
    avatarLink.classList.add("v2p-lite-activity-avatar");
    let ring = avatarLink.querySelector(":scope > .v2p-lite-activity-avatar-ring");
    if (!ring) {
      const svgNamespace = "http://www.w3.org/2000/svg";
      ring = document.createElementNS(svgNamespace, "svg");
      ring.classList.add("v2p-lite-activity-avatar-ring");
      ring.setAttribute("viewBox", "0 0 48 48");
      ring.setAttribute("aria-hidden", "true");

      const track = document.createElementNS(svgNamespace, "circle");
      track.classList.add("v2p-lite-activity-avatar-track");
      track.setAttribute("cx", "24");
      track.setAttribute("cy", "24");
      track.setAttribute("r", "21");

      const progress = document.createElementNS(svgNamespace, "circle");
      progress.classList.add("v2p-lite-activity-avatar-progress");
      progress.setAttribute("cx", "24");
      progress.setAttribute("cy", "24");
      progress.setAttribute("r", "21");
      ring.append(track, progress);
      avatarLink.insertBefore(ring, avatar);
    }

    const progressCircle = ring.querySelector(".v2p-lite-activity-avatar-progress");
    const circumference = 2 * Math.PI * 21;
    progressCircle.style.stroke = progressColor;
    progressCircle.style.strokeDasharray = String(circumference);
    progressCircle.style.strokeDashoffset = String(circumference * (1 - percentage / 100));
    avatarLink.dataset.activity = String(Math.round(percentage));
    if (mobile) avatarLink.setAttribute("aria-label", "打开导航菜单，每日活跃度 " + Math.round(percentage) + "%");
    activitySource.classList.add("v2p-lite-activity-source");
    return true;
  }

  function initMemberStatsCapsule() {
    const infoCard = document.getElementById("member-activity")?.closest(".box");
    if (!infoCard) return false;

    const stats = [
      {
        href: "/my/nodes",
        label: "节点收藏",
      },
      {
        href: "/my/topics",
        label: "主题收藏",
      },
      {
        href: "/my/following",
        label: "特别关注",
      },
    ];
    const links = stats.map((stat) => infoCard.querySelector('a[href="' + stat.href + '"]'));
    if (links.some((link) => !link)) return false;

    const statsTable = links[0].closest("table");
    if (!statsTable || !links.every((link) => statsTable.contains(link))) return false;

    statsTable.classList.add("v2p-lite-member-stats");

    links.forEach((link, index) => {
      const stat = stats[index];
      const count = (link.querySelector(".bigger")?.textContent || link.textContent || "0").trim();
      link.classList.add("v2p-lite-member-stat");
      link.title = stat.label + " " + count;
      link.setAttribute("aria-label", stat.label + " " + count);
    });

    return true;
  }

  function initBalanceFooter() {
    const infoCard = document.getElementById("member-activity")?.closest(".box");
    const balanceLink = infoCard?.querySelector('a.balance_area[href="/balance"], a[href="/balance"]');
    if (!infoCard || !balanceLink) return false;

    const row = balanceLink.closest(".cell");
    if (row) {
      row.classList.add("v2p-lite-member-balance-row");
      row.querySelectorAll("a").forEach((link) => {
        if (link !== balanceLink) {
          link.classList.add("v2p-lite-balance-extra");
        }
      });
    }
    if (balanceLink.classList.contains("v2p-lite-balance-link")) return true;

    const amounts = (balanceLink.textContent || "").match(/\d+/g)?.slice(0, 3) || [];
    if (amounts.length < 3) return false;

    const units = [
      { kind: "gold", label: "金币" },
      { kind: "silver", label: "银币" },
      { kind: "bronze", label: "铜币" },
    ];
    balanceLink.classList.add("v2p-lite-balance-link");
    balanceLink.replaceChildren();

    const wallet = document.createElement("span");
    wallet.className = "v2p-lite-balance-wallet";
    wallet.setAttribute("aria-hidden", "true");
    wallet.innerHTML = buildSvgIcon(
      '<path d="M19 7V4a1 1 0 0 0-1-1H5a3 3 0 0 0 0 6h14v12H5a3 3 0 0 1-3-3V6"/><path d="M16 13h4"/>',
    );
    balanceLink.appendChild(wallet);

    units.forEach((unit, index) => {
      const item = document.createElement("span");
      item.className = "v2p-lite-balance-unit";
      item.dataset.kind = unit.kind;
      item.title = unit.label + " " + amounts[index];

      const dot = document.createElement("span");
      dot.className = "v2p-lite-balance-dot";
      dot.setAttribute("aria-hidden", "true");

      const amount = document.createElement("span");
      amount.textContent = amounts[index];
      item.append(dot, amount);
      balanceLink.appendChild(item);
    });

    const label = units.map((unit, index) => unit.label + " " + amounts[index]).join("，");
    balanceLink.title = "账户余额：" + label;
    balanceLink.setAttribute("aria-label", "账户余额：" + label);
    return true;
  }

  function initMemberShortcuts() {
    const rightbar = document.getElementById("Rightbar");
    const infoCard = document.getElementById("member-activity")?.closest(".box");
    if (!rightbar || !infoCard || !rightbar.contains(infoCard)) return false;
    if (infoCard.querySelector(".v2p-lite-member-shortcuts")) return true;

    const writeSource = Array.from(rightbar.querySelectorAll('a[href="/write"]')).find(
      (link) => !infoCard.contains(link) && link.querySelector('img[src*="compose"]'),
    );
    const sourceBox = writeSource?.closest(".box");
    if (!writeSource || !sourceBox) return false;

    const chatSource = sourceBox.querySelector('a[href*="edge.v2ex.com/chat"]');
    const shortcuts = [
      {
        source: writeSource,
        kind: "write",
        label: "创作新主题",
        title: "创作新主题",
        icon: '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.38 2.62a1 1 0 0 1 3 3L12 15l-4 1 1-4Z"/>',
      },
      {
        source: chatSource,
        kind: "chat",
        label: "Chat",
        title: "打开 Chat",
        icon: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>',
      },
    ].filter((item) => item.source);
    if (shortcuts.length === 0) return false;

    const container = document.createElement("div");
    container.className = "cell v2p-lite-member-shortcuts";
    container.setAttribute("aria-label", "快捷入口");
    container.classList.toggle("v2p-single-shortcut", shortcuts.length === 1);

    shortcuts.forEach((item) => {
      const link = document.createElement("a");
      link.className = "v2p-lite-member-shortcut v2p-lite-member-shortcut-" + item.kind;
      link.href = item.source.href;
      link.title = item.title;
      link.setAttribute("aria-label", item.title);
      if (item.source.target) link.target = item.source.target;
      if (item.source.rel) link.rel = item.source.rel;
      link.innerHTML = buildSvgIcon(item.icon) + "<span>" + escapeHtml(item.label) + "</span>";
      container.appendChild(link);
    });

    sourceBox.classList.add("v2p-lite-member-shortcuts-source");
    const sourceSeparator = sourceBox.previousElementSibling;
    if (sourceSeparator?.classList.contains("sep")) {
      sourceSeparator.classList.add("v2p-lite-member-shortcuts-source");
    }
    infoCard.appendChild(container);
    return true;
  }

  function initNotificationIndicator() {
    const infoCard = document.getElementById("member-activity")?.closest(".box");
    if (!infoCard) return false;

    let unreadCount = 0;
    document.querySelectorAll('a[href="/notifications"]').forEach((link) => {
      const match = (link.textContent || "").trim().match(/^(\d+)\s*未读提醒$/);
      if (!match) return;
      unreadCount = Math.max(unreadCount, Number(match[1]) || 0);
    });

    const memberLink = Array.from(infoCard.querySelectorAll('a[href^="/member/"]')).find(
      (link) => (link.textContent || "").trim(),
    );
    if (!memberLink) return false;

    let iconLink = infoCard.querySelector(".v2p-lite-notification-icon");
    if (!iconLink) {
      iconLink = document.createElement("a");
      iconLink.href = "/notifications";
      iconLink.className = "v2p-lite-notification-icon";
      iconLink.innerHTML = buildSvgIcon(
        '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M10 21h4"/>',
      );
      memberLink.insertAdjacentElement("afterend", iconLink);
    }

    let badge = iconLink.querySelector(".v2p-lite-notification-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "v2p-lite-notification-badge";
      badge.setAttribute("aria-hidden", "true");
      iconLink.appendChild(badge);
    }

    const hasUnread = unreadCount > 0;
    const label = hasUnread ? unreadCount + " 条未读提醒" : "没有未读提醒";
    badge.textContent = unreadCount > 99 ? "99+" : String(unreadCount);
    iconLink.classList.toggle("v2p-has-unread", hasUnread);
    iconLink.title = label;
    iconLink.setAttribute("aria-label", label);
    return true;
  }

  function initCheckinIndicator() {
    const infoCard = document.getElementById("member-activity")?.closest(".box");
    if (!infoCard) return false;

    const memberLink = Array.from(infoCard.querySelectorAll('a[href^="/member/"]')).find(
      (link) => (link.textContent || "").trim(),
    );
    if (!memberLink) return false;

    let button = infoCard.querySelector(".v2p-lite-checkin-icon");
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "v2p-lite-checkin-icon";
      button.innerHTML = buildSvgIcon(
        '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M7.5 8A2.5 2.5 0 1 1 12 6.5V8z"/><path d="M16.5 8A2.5 2.5 0 1 0 12 6.5V8z"/>',
      );
      button.addEventListener("click", () => {
        void runDailyCheckin({ notify: true, force: true });
      });
      const notificationIcon = infoCard.querySelector(".v2p-lite-notification-icon");
      (notificationIcon || memberLink).insertAdjacentElement("afterend", button);
    }

    const username = getCurrentUserName();
    if (username && alreadyCheckedInToday(username)) {
      updateCheckinIndicator("claimed", readCachedCheckinState(username));
    } else {
      const cached = username ? readCachedCheckinState(username) : null;
      updateCheckinIndicator(cached?.status || "unchecked", cached);
    }
    return true;
  }

  function updateCheckinIndicator(status, details = null) {
    const button = document.querySelector(".v2p-lite-checkin-icon");
    if (!button) return;

    const labels = {
      unchecked: "签到状态待检查",
      checking: "正在检查签到状态",
      available: "今日未签到，点击领取",
      claimed: "今日已签到",
      error: "签到状态检查失败，点击重试",
    };
    let label = labels[status] || labels.unchecked;
    if (status === "claimed" && details?.days) label += "，连续 " + details.days + " 天";
    if (status === "claimed" && details?.coins) label += "，本次 " + details.coins + " 铜币";
    button.dataset.state = status;
    button.disabled = status === "checking";
    button.title = label;
    button.setAttribute("aria-label", label);
  }

  function scheduleDailyCheckin(retry = 0) {
    if (dailyCheckinRunning) return;
    if (getCurrentUserName()) {
      void runDailyCheckin({ notify: true });
      return;
    }
    if (retry >= 9) return;
    dailyCheckinTimer = setTimeout(() => {
      dailyCheckinTimer = null;
      scheduleDailyCheckin(retry + 1);
    }, 300);
  }

  function getCurrentUserName() {
    const link = document.querySelector(
      '#Top a[href^="/member/"], #menu-body a[href^="/member/"], #Rightbar a[href^="/member/"]',
    );
    const hrefName = link?.getAttribute("href")?.match(/^\/member\/([^/?#]+)/)?.[1];
    return decodeURIComponent(hrefName || (link?.textContent || "").trim());
  }

  function getLocalDateKey() {
    const now = new Date();
    const pad = (value) => String(value).padStart(2, "0");
    return now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  }

  function alreadyCheckedInToday(username) {
    try {
      return localStorage.getItem(CHECKIN_DATE_KEY) === getLocalDateKey()
        && localStorage.getItem(CHECKIN_USER_KEY) === username;
    } catch (error) {
      return false;
    }
  }

  function readCachedCheckinState(username) {
    try {
      const state = JSON.parse(localStorage.getItem(CHECKIN_STATE_KEY) || "null");
      if (state?.username !== username || state?.date !== getLocalDateKey()) return null;
      return state;
    } catch (error) {
      return null;
    }
  }

  function cacheCheckinState(username, status, details = {}) {
    const state = {
      username,
      date: getLocalDateKey(),
      status,
      checkedAt: Date.now(),
      ...details,
    };
    try {
      localStorage.setItem(CHECKIN_STATE_KEY, JSON.stringify(state));
    } catch (error) {
      // The visible state still works when local storage is unavailable.
    }
    updateCheckinIndicator(status, state);
    return state;
  }

  function markCheckedInToday(username, details = {}) {
    try {
      localStorage.setItem(CHECKIN_DATE_KEY, getLocalDateKey());
      localStorage.setItem(CHECKIN_USER_KEY, username);
    } catch (error) {
      // The current page still avoids duplicate requests through the in-memory flag.
    }
    return cacheCheckinState(username, "claimed", details);
  }

  function acquireDailyCheckinLock() {
    const token = Date.now() + ":" + Math.random().toString(36).slice(2);
    try {
      const current = JSON.parse(localStorage.getItem(CHECKIN_LOCK_KEY) || "null");
      if (current?.time && Date.now() - Number(current.time) < 60000) return null;
      localStorage.setItem(CHECKIN_LOCK_KEY, JSON.stringify({ token, time: Date.now() }));
    } catch (error) {
      return token;
    }
    return token;
  }

  function releaseDailyCheckinLock(token) {
    try {
      const current = JSON.parse(localStorage.getItem(CHECKIN_LOCK_KEY) || "null");
      if (current?.token === token) localStorage.removeItem(CHECKIN_LOCK_KEY);
    } catch (error) {
      // A stale lock expires automatically after one minute.
    }
  }

  function extractDailyRedeemUrl(html) {
    const parsed = new DOMParser().parseFromString(html, "text/html");
    const claimButton = parsed.querySelector('input[value^="领取"]');
    const onclick = claimButton?.getAttribute("onclick") || "";
    const onclickMatch = onclick.match(/'(\/mission\/daily\/redeem\?once=\d+)'/);
    if (onclickMatch) return onclickMatch[1];
    return html.match(/\/mission\/daily\/redeem\?once=\d+/)?.[0] || null;
  }

  function parseDailyCheckinPage(html) {
    const parsed = new DOMParser().parseFromString(html, "text/html");
    const text = (parsed.body?.textContent || "").replace(/\s+/g, "");
    const claimed = text.includes("每日登录奖励已领取")
      || text.includes("今日登录奖励已领取")
      || text.includes("已成功领取每日登录奖励")
      || text.includes("已领取每日登录奖励")
      || Boolean(parsed.querySelector('input[value*="已领取"], button[value*="已领取"]'));
    return {
      signedIn: html.includes("/signout"),
      claimed,
      redeemUrl: claimed ? null : extractDailyRedeemUrl(html),
      days: html.match(/已连续登[^0-9]*?(\d+)\s*天/)?.[1] || null,
    };
  }

  async function runDailyCheckin({ notify = false, force = false } = {}) {
    if (dailyCheckinRunning) return;
    const username = getCurrentUserName();
    if (!username) {
      updateCheckinIndicator("error");
      if (force) showLiteToast("请先登录 V2EX");
      return;
    }
    if (alreadyCheckedInToday(username) && !force) {
      const cached = readCachedCheckinState(username);
      updateCheckinIndicator("claimed", cached);
      return;
    }
    const lockToken = acquireDailyCheckinLock();
    if (!lockToken) return;

    dailyCheckinRunning = true;
    updateCheckinIndicator("checking");
    try {
      const dailyResponse = await requestWithTimeout("/mission/daily", { credentials: "include" });
      if (!dailyResponse.ok) throw new Error("Daily page returned HTTP " + dailyResponse.status);
      const dailyHtml = await dailyResponse.text();
      const dailyState = parseDailyCheckinPage(dailyHtml);
      if (!dailyState.signedIn && !dailyState.claimed && !dailyState.redeemUrl) {
        throw new Error("Daily page did not contain a signed-in session");
      }
      if (dailyState.claimed) {
        markCheckedInToday(username, { days: dailyState.days });
        if (force) showLiteToast("今日登录奖励已领取");
        return;
      }

      if (!dailyState.redeemUrl) throw new Error("Daily redeem URL was not found");
      const redeemResponse = await requestWithTimeout(dailyState.redeemUrl, { credentials: "include" });
      if (!redeemResponse.ok) throw new Error("Daily redeem returned HTTP " + redeemResponse.status);
      const redeemHtml = await redeemResponse.text();

      const verificationResponse = await requestWithTimeout("/mission/daily", { credentials: "include" });
      if (!verificationResponse.ok) {
        throw new Error("Daily verification returned HTTP " + verificationResponse.status);
      }
      const verificationHtml = await verificationResponse.text();
      const verificationState = parseDailyCheckinPage(verificationHtml);
      if (!verificationState.claimed) {
        throw new Error("Daily reward was not confirmed after redeem");
      }

      const days = redeemHtml.match(/已连续登[^0-9]*?(\d+)\s*天/)?.[1]
        || verificationState.days;
      let message = days ? "连续签到 " + days + " 天" : "签到成功，今日奖励已领取";
      let coins = null;
      markCheckedInToday(username, { days, coins });
      try {
        const balanceResponse = await requestWithTimeout("/balance", { credentials: "include" }, 5000);
        const balanceHtml = balanceResponse.ok ? await balanceResponse.text() : "";
        coins = balanceHtml.match(/每日登录奖励\s*(\d+)\s*铜币/)?.[1] || null;
        if (coins) message += "，本次 " + coins + " 铜币";
      } catch (error) {
        // The reward was already claimed; balance details are optional.
      }
      if (coins) cacheCheckinState(username, "claimed", { days, coins });
      if (notify) showLiteToast(message);
    } catch (error) {
      updateCheckinIndicator("error");
      if (notify || force) showLiteToast("签到失败，请稍后重试");
      console.warn("V2EX Plus automatic check-in failed:", error);
    } finally {
      dailyCheckinRunning = false;
      if (lockToken) releaseDailyCheckinLock(lockToken);
    }
  }

  function initNestedReplies() {
    if (nestedReplyApplied || !/^\/t\/\d+/.test(window.location.pathname)) return;

    const cells = getCommentCells();
    if (cells.length === 0) return;
    if (nestedReplyOrder.length === 0) {
      nestedReplyOrder = cells.slice();
      nestedReplyRoot = cells[0].parentElement;
      nestedReplyAnchor = cells[cells.length - 1].nextSibling;
    }
    document.querySelectorAll("#Main .v2p-member-ref").forEach((ref) => {
      ref.classList.remove("v2p-member-ref-show");
    });

    const commentDataList = cells.map((cell, index) => getCommentData(cell, index));
    const commentIndexByMemberFloor = new Map();
    const lastCommentIndexByMember = new Map();

    commentDataList.forEach((comment) => {
      if (comment && comment.memberName && comment.floor) {
        const key = comment.memberName + "\u0000" + comment.floor;
        if (!commentIndexByMemberFloor.has(key)) {
          commentIndexByMemberFloor.set(key, comment.index);
        }
      }
      if (comment && comment.refMemberNames && comment.refMemberNames.length === 1) {
        hideSingleMemberRef(comment.contentEl, comment.refMemberNames[0]);
      }
    });

    cells.forEach((cell, index) => {
      const currentComment = commentDataList[index];
      if (!currentComment) return;

      const refMemberNames = currentComment.refMemberNames || [];
      const moreThanOneRefMember = refMemberNames.length > 1;
      const refNames = moreThanOneRefMember ? refMemberNames.slice().reverse() : refMemberNames;
      const refFloors = currentComment.refFloors || [];
      const firstRefFloor = moreThanOneRefMember ? refFloors[refFloors.length - 1] : refFloors[0];

      for (const refName of refNames) {
        const targetIndex = lastCommentIndexByMember.get(refName);
        if (targetIndex === undefined) continue;

        let refCommentIndex = targetIndex;
        const targetComment = commentDataList[targetIndex];
        if (firstRefFloor && targetComment && firstRefFloor !== targetComment.floor) {
          const exactIndex = commentIndexByMemberFloor.get(refName + "\u0000" + firstRefFloor);
          if (exactIndex !== undefined && exactIndex < targetIndex) {
            refCommentIndex = exactIndex;
          }
        }

        cell.classList.add("v2p-indent");
        cells[refCommentIndex].appendChild(cell);
        break;
      }

      if (currentComment.memberName) {
        lastCommentIndexByMember.set(currentComment.memberName, index);
      }
    });

    updateReplyStructureClasses(cells);
    nestedReplyApplied = true;
  }

  function flattenNestedReplies() {
    if (!/^\/t\/\d+/.test(window.location.pathname)) return;

    const cells = (nestedReplyOrder.length > 0 ? nestedReplyOrder : getCommentCells())
      .filter((cell) => cell && cell.isConnected);
    if (cells.length === 0) return;

    const root = nestedReplyRoot && nestedReplyRoot.isConnected
      ? nestedReplyRoot
      : cells.find((cell) => cell.parentElement)?.parentElement;
    if (!root) return;

    cells.forEach((cell) => {
      if (nestedReplyAnchor && nestedReplyAnchor.parentNode === root) {
        root.insertBefore(cell, nestedReplyAnchor);
      } else {
        root.appendChild(cell);
      }
      cell.classList.remove("v2p-indent", "v2p-reply-leaf", "v2p-reply-last");
    });
    document.querySelectorAll("#Main .v2p-member-ref").forEach((ref) => {
      ref.classList.add("v2p-member-ref-show");
    });
    nestedReplyApplied = false;
  }

  function updateReplyStructureClasses(cells) {
    cells.forEach((cell) => {
      const hasNestedReply = !!cell.querySelector('.cell[id^="r"]');
      const nextSibling = cell.nextElementSibling;
      const hasNextReply = !!(nextSibling && nextSibling.matches('.cell[id^="r"]'));
      cell.classList.toggle("v2p-reply-leaf", !hasNestedReply);
      cell.classList.toggle("v2p-reply-last", !hasNextReply);
    });
  }

  function getCommentCells() {
    return Array.from(document.querySelectorAll('#Main .cell[id^="r"]')).filter((cell) => {
      const table = getDirectTable(cell);
      return table && getContentCell(table) && getReplyContentEl(table);
    });
  }

  function getCommentData(cell, index) {
    const table = getDirectTable(cell);
    const contentCell = table && getContentCell(table);
    if (!contentCell) return null;

    const member = contentCell.querySelector("strong > a");
    const contentEl = getReplyContentEl(table);
    if (!member || !contentEl) return null;

    const content = contentEl.textContent || "";
    const memberNameMatches = Array.from(content.matchAll(/@([a-zA-Z0-9]+)/g));
    const floorNumberMatches = Array.from(content.matchAll(/#(\d+)/g));

    return {
      id: cell.id,
      index,
      memberName: (member.textContent || "").trim(),
      contentEl,
      floor: ((contentCell.querySelector("span.no") || {}).textContent || "").trim(),
      refMemberNames: memberNameMatches.map((match) => match[1]),
      refFloors: floorNumberMatches.map((match) => match[1]),
    };
  }

  function getDirectTable(cell) {
    return Array.from(cell.children).find((child) => child.tagName === "TABLE") || null;
  }

  function getContentCell(table) {
    const row = (table.tBodies[0] && table.tBodies[0].rows[0]) || table.rows[0];
    return row && row.cells ? row.cells[2] : null;
  }

  function getReplyContentEl(table) {
    const contentCell = getContentCell(table);
    if (!contentCell) return null;
    for (const child of contentCell.children) {
      if (child.classList?.contains("reply_content")) return child;
      if (child.classList?.contains("v2p-lite-long-reply")) {
        const content = Array.from(child.children).find((element) => element.classList?.contains("reply_content"));
        if (content) return content;
      }
    }
    return null;
  }

  function hideSingleMemberRef(contentEl, memberName) {
    const link = Array.from(contentEl.querySelectorAll('a[href*="/member/"]')).find(
      (item) => (item.textContent || "").trim() === memberName,
    );
    if (!link || !link.previousSibling || link.previousSibling.nodeType !== Node.TEXT_NODE) return;

    const textNode = link.previousSibling;
    const text = textNode.textContent || "";
    if (!text.endsWith("@")) return;

    textNode.textContent = text.slice(0, -1);
    const span = document.createElement("span");
    span.className = "v2p-member-ref";
    span.appendChild(document.createTextNode("@"));
    span.appendChild(link.cloneNode(true));
    link.replaceWith(span);
  }

  function syncCodeHighlight(mode) {
    const link = document.querySelector('link[href*="tomorrow-night.css"], link[href*="tomorrow.css"]');
    if (!link) return;

    const href = link.getAttribute("href") || "";
    if (mode === "dark" && href.includes("tomorrow.css") && !href.includes("tomorrow-night.css")) {
      link.setAttribute("href", href.replace("tomorrow.css", "tomorrow-night.css"));
    } else if (mode === "light" && href.includes("tomorrow-night.css")) {
      link.setAttribute("href", href.replace("tomorrow-night.css", "tomorrow.css"));
    }
  }

  function updateThemeColor(mode) {
    let meta = document.getElementById(THEME_META_ID);
    if (!meta) {
      meta = document.createElement("meta");
      meta.id = THEME_META_ID;
      meta.name = "theme-color";
      (document.head || docEl).appendChild(meta);
    }
    if (meta.content !== THEME_META_COLORS[mode]) meta.content = THEME_META_COLORS[mode];
  }

  function ensureViewportMeta() {
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      (document.head || docEl).appendChild(meta);
    }
    const content = "width=device-width, initial-scale=1";
    if (meta.content !== content) meta.content = content;
  }

  function ensureToggle() {
    const topTools = document.querySelector("#Top .tools, #site-header");
    let toggle = document.getElementById(TOGGLE_ID);

    if (!toggle) {
      toggle = document.createElement("a");
      toggle.id = TOGGLE_ID;
      toggle.href = "javascript:void(0)";
      toggle.className = "top";
      toggle.setAttribute("role", "button");
      toggle.setAttribute("data-v2p-lite-toggle", "theme");
    }

    if (topTools) {
      if (toggle.className !== "top") toggle.className = "top";
      const mobileMenu = topTools.id === "site-header" ? topTools.querySelector("#site-header-menu") : null;
      if (toggle.parentNode !== topTools) topTools.insertBefore(toggle, mobileMenu);
    } else if (document.body && !toggle.parentNode) {
      toggle.className = "v2p-lite-floating";
      document.body.appendChild(toggle);
    }

    hideNativeThemeToggle();
    updateToggle();
  }

  function updateToggle() {
    const toggle = document.getElementById(TOGGLE_ID);
    if (!toggle) return;

    const label = LABELS[currentMode] || LABELS.auto;
    const effectiveLabel = LABELS[effectiveMode] || LABELS.light;
    const title = currentMode === "auto" ? "自动：当前" + effectiveLabel : "当前" + label;
    const pressed = effectiveMode === "dark" ? "true" : "false";

    if (toggle.dataset.mode !== currentMode || !toggle.querySelector("svg")) {
      toggle.innerHTML = ICONS[currentMode] || ICONS.auto;
    }
    if (toggle.title !== title) toggle.title = title;
    if (toggle.getAttribute("aria-label") !== "主题：" + title) {
      toggle.setAttribute("aria-label", "主题：" + title);
    }
    if (toggle.getAttribute("aria-pressed") !== pressed) toggle.setAttribute("aria-pressed", pressed);
    if (toggle.dataset.mode !== currentMode) toggle.dataset.mode = currentMode;
    if (toggle.dataset.effectiveMode !== effectiveMode) toggle.dataset.effectiveMode = effectiveMode;
  }

  function cycleMode() {
    const index = MODES.indexOf(currentMode);
    const next = MODES[(index + 1 + MODES.length) % MODES.length];
    writeMode(next);
    applyTheme();
    void syncNativeNight(currentMode);
  }

  function bindEvents() {
    document.addEventListener(
      "click",
      (event) => {
        const target = event.target;
        if (!target || !target.closest) return;

        const toggle = target.closest("#" + TOGGLE_ID);
        if (!toggle) return;

        event.preventDefault();
        event.stopPropagation();
        cycleMode();
      },
      true,
    );

    try {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => {
        if (currentMode === "auto") {
          applyTheme();
          void syncNativeNight(currentMode);
        }
      };
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", onChange);
      } else if (typeof media.addListener === "function") {
        media.addListener(onChange);
      }
    } catch (error) {
      // Ignore matchMedia listener failures.
    }
  }

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function startBootObserver() {
    if (!window.MutationObserver || bootObserver) return;

    bootObserver = new MutationObserver(scheduleBootSync);

    bootObserver.observe(docEl, {
      childList: true,
      subtree: true,
    });

    scheduleBootSync();
    setTimeout(stopBootObserver, 3000);
  }

  function stopBootObserver() {
    if (!bootObserver) return;
    bootObserver.disconnect();
    bootObserver = null;
  }
})();
