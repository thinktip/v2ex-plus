// Generated from userscript/v2ex-plus.user.js 1.13.57. Do not edit directly.
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

  function bindTouchNavDrag(handle, row, list, callbacks) {
    let active = null;
    let frame = 0;
    const update = () => {
      if (!active?.moved) return;
      const rows = Array.from(list.querySelectorAll(".v2p-nav-menu-row")).filter((node) => node !== row);
      const index = rows.findIndex((node) => {
        const rect = node.getBoundingClientRect();
        return active.y < rect.top + rect.height / 2;
      });
      callbacks.preview(index < 0 ? rows.length : index);
    };
    const scroll = () => {
      frame = 0;
      if (!active?.moved || !handle.isConnected) return;
      const rect = list.getBoundingClientRect();
      const delta = active.y < rect.top + 28 ? -6 : active.y > rect.bottom - 28 ? 6 : 0;
      if (delta) { list.scrollTop += delta; update(); }
      frame = requestAnimationFrame(scroll);
    };
    const finish = (event, commit) => {
      if (!active || event.pointerId !== active.id) return;
      const previous = active;
      active = null;
      cancelAnimationFrame(frame);
      frame = 0;
      if (handle.hasPointerCapture(previous.id)) handle.releasePointerCapture(previous.id);
      if (previous.moved) callbacks.finish(commit);
    };
    handle.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" || !event.isPrimary || active) return;
      event.preventDefault();
      active = { id: event.pointerId, startY: event.clientY, y: event.clientY, moved: false };
      handle.setPointerCapture(event.pointerId);
    });
    handle.addEventListener("pointermove", (event) => {
      if (!active || event.pointerId !== active.id) return;
      active.y = event.clientY;
      if (!active.moved && Math.abs(active.y - active.startY) < 6) return;
      event.preventDefault();
      if (!active.moved) { active.moved = true; callbacks.start(); frame = requestAnimationFrame(scroll); }
      update();
    });
    handle.addEventListener("pointerup", (event) => finish(event, true));
    handle.addEventListener("pointercancel", (event) => finish(event, false));
    handle.addEventListener("lostpointercapture", (event) => finish(event, false));
    handle.addEventListener("click", (event) => { event.preventDefault(); event.stopPropagation(); });
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

        bindTouchNavDrag(dragHandle, row, list, {
          start() {
            dragSrcIndex = index;
            row.classList.add("v2p-nav-dragging");
            row.setAttribute("aria-grabbed", "true");
          },
          preview: showDropPosition,
          finish(commit) {
            const destination = dragDestinationIndex;
            const changed = commit && destination != null && destination !== index;
            if (changed) reorderConfig(index, destination);
            dragSrcIndex = null;
            clearDropStyles();
            row.classList.remove("v2p-nav-dragging");
            row.removeAttribute("aria-grabbed");
            if (changed) { renderList(); saveAndRefresh(); }
          },
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
    status.textContent = (preparedImage.colorConverted ? "色彩已转为 sRGB · " : "") + (preparedImage.compressed ? "已压缩并上传到 " : "已上传到 ") + uploadResult.provider;

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

  // BEGIN BUNDLED COLOR ENGINE
  /* lcms-wasm 1.0.5 / LittleCMS
The MIT License (MIT)
Copyright (c) 2024 Matt DesLauriers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.


MIT License

Copyright (c) 2023 Marti Maria Saguer

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject
to the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  */
  function instantiateColorEngine() {
    const instantiate = (() => {const xn=2160,bn=16,yn=1918392666,Mn=1733843290,Yn=1649957210,hn=1482250784,Rn=1281450528,Sn=1282766368,An=1497588338,wn=1501067552,Ln=1380401696,In=1196573017,Fn=1213421088,Gn=1212961568,On=1129142603,Nn=1129142560,re=f=>f<<22,Hn=f=>f<<21,o=f=>f<<16,h=f=>f<<14,ne=f=>f<<13,x=f=>f<<12,P=f=>f<<11,p=f=>f<<10,E=f=>f<<7,a=f=>f<<3,s=f=>f,Et=f=>f>>22&1,Un=f=>f>>21&1,kn=f=>f>>16&31,Dn=f=>f>>14&1,Bn=f=>f>>13&1,Kn=f=>f>>12&1,Wn=f=>f>>11&1,jn=f=>f>>10&1,vt=f=>f>>7&7,gt=f=>f>>3&15,Ct=f=>f&7,Vn=0,$n=3,Zn=4,Xn=5,zn=6,Jn=7,qn=8,Qn=9,eo=10,to=11,ro=12,no=13,oo=14,ao=15,so=16,io=17,co=18,_o=19,lo=20,fo=21,uo=22,po=23,mo=24,To=25,Po=26,Eo=27,vo=28,go=29,Co=30,xo=o(3)|a(1)|s(1),bo=o(3)|a(1)|s(1)|ne(1),yo=o(3)|a(1)|s(2),Mo=o(3)|a(1)|s(2)|ne(1),Yo=o(3)|a(1)|s(2)|P(1),ho=o(3)|E(1)|a(1)|s(1),Ro=o(3)|E(1)|a(1)|s(2),So=o(3)|E(1)|a(1)|s(2)|P(1),Ao=o(3)|E(1)|a(1)|s(1)|x(1),wo=o(3)|E(1)|a(1)|s(2)|x(1),Lo=o(4)|a(3)|s(1),Io=o(4)|a(3)|s(1)|x(1),Fo=o(4)|a(3)|s(1)|p(1),Go=o(4)|a(3)|s(1)|p(1)|x(1),Oo=o(4)|a(3)|s(2),No=o(4)|a(3)|s(2)|x(1),Ho=o(4)|a(3)|s(2)|P(1),Uo=o(4)|a(3)|s(2)|p(1),ko=o(4)|a(3)|s(2)|p(1)|x(1),Do=o(4)|a(3)|s(2)|p(1)|P(1),Bo=o(4)|E(1)|a(3)|s(1),Ko=o(4)|E(1)|a(3)|s(1)|x(1),Wo=o(4)|E(1)|a(3)|s(2),jo=o(4)|E(1)|a(3)|s(2)|x(1),Vo=o(4)|E(1)|a(3)|s(2)|P(1),$o=o(4)|E(1)|a(3)|s(1)|h(1),Zo=o(4)|E(1)|a(3)|s(1)|h(1)|x(1),Xo=o(4)|E(1)|a(3)|s(2)|h(1),zo=o(4)|E(1)|a(3)|s(1)|p(1),Jo=o(4)|E(1)|a(3)|s(1)|p(1)|x(1),qo=o(4)|E(1)|a(3)|s(2)|p(1),Qo=o(4)|E(1)|a(3)|s(2)|p(1)|x(1),ea=o(4)|E(1)|a(3)|s(2)|p(1)|P(1),ta=o(4)|E(1)|a(3)|s(1)|p(1)|h(1),ra=o(4)|E(1)|a(3)|s(1)|p(1)|h(1)|x(1),na=o(4)|E(1)|a(3)|s(2)|p(1)|h(1),oa=o(4)|E(1)|a(3)|s(2)|P(1)|p(1)|h(1),aa=o(5)|a(3)|s(1),sa=o(5)|a(3)|s(1)|x(1),ia=o(5)|a(3)|s(2),ca=o(5)|a(3)|s(2)|x(1),_a=o(5)|a(3)|s(2)|P(1),la=o(6)|a(4)|s(1),fa=o(6)|E(1)|a(4)|s(1),Xr=o(6)|a(4)|s(1)|ne(1),ua=Xr,pa=o(6)|a(4)|s(1)|x(1),ma=o(6)|a(4)|s(2),zr=o(6)|a(4)|s(2)|ne(1),da=zr,Ta=o(6)|a(4)|s(2)|x(1),Pa=o(6)|a(4)|s(2)|P(1),Ea=o(6)|a(4)|s(1)|p(1),va=o(6)|a(4)|s(2)|p(1),ga=o(6)|a(4)|s(2)|p(1)|P(1),Ca=o(6)|a(4)|s(1)|h(1),xa=o(6)|a(4)|s(1)|ne(1)|h(1),ba=o(6)|a(4)|s(2)|h(1),ya=o(6)|a(4)|s(2)|ne(1)|h(1),Ma=o(6)|a(4)|s(2)|P(1)|h(1),Ya=o(19)|a(5)|s(1),ha=o(19)|a(5)|s(2),Ra=o(19)|a(5)|s(2)|P(1),Sa=o(19)|a(5)|s(1)|p(1),Aa=o(19)|a(5)|s(2)|p(1),wa=o(19)|a(5)|s(2)|p(1)|P(1),La=o(20)|a(6)|s(1),Ia=o(20)|a(6)|s(1)|x(1),Fa=o(20)|a(6)|s(2),Ga=o(20)|a(6)|s(2)|x(1),Oa=o(20)|a(6)|s(2)|P(1),Na=o(21)|a(7)|s(1),Ha=o(21)|a(7)|s(2),Ua=o(21)|a(7)|s(2)|P(1),ka=o(21)|a(7)|s(1)|p(1),Da=o(21)|a(7)|s(2)|p(1),Ba=o(21)|a(7)|s(2)|p(1)|P(1),Ka=o(22)|a(8)|s(1),Wa=o(22)|a(8)|s(2),ja=o(22)|a(8)|s(2)|P(1),Va=o(22)|a(8)|s(1)|p(1),$a=o(22)|a(8)|s(2)|p(1),Za=o(22)|a(8)|s(2)|p(1)|P(1),Xa=o(23)|a(9)|s(1),za=o(23)|a(9)|s(2),Ja=o(23)|a(9)|s(2)|P(1),qa=o(23)|a(9)|s(1)|p(1),Qa=o(23)|a(9)|s(2)|p(1),es=o(23)|a(9)|s(2)|p(1)|P(1),ts=o(24)|a(10)|s(1),rs=o(24)|a(10)|s(2),ns=o(24)|a(10)|s(2)|P(1),os=o(24)|a(10)|s(1)|p(1),as=o(24)|a(10)|s(2)|p(1),ss=o(24)|a(10)|s(2)|p(1)|P(1),is=o(25)|a(11)|s(1),cs=o(25)|a(11)|s(2),_s=o(25)|a(11)|s(2)|P(1),ls=o(25)|a(11)|s(1)|p(1),fs=o(25)|a(11)|s(2)|p(1),us=o(25)|a(11)|s(2)|p(1)|P(1),ps=o(26)|a(12)|s(1),ms=o(26)|a(12)|s(2),ds=o(26)|a(12)|s(2)|P(1),Ts=o(26)|a(12)|s(1)|p(1),Ps=o(26)|a(12)|s(2)|p(1),Es=o(26)|a(12)|s(2)|p(1)|P(1),vs=o(9)|a(3)|s(2),gs=o(10)|a(3)|s(1),Cs=o(30)|a(3)|s(1),xs=o(10)|a(3)|s(1)|E(1)|h(1),bs=o(30)|a(3)|s(1)|E(1)|h(1),ys=o(10)|a(3)|s(2),Ms=o(30)|a(3)|s(2),Ys=o(14)|a(3)|s(2),hs=re(1)|o(9)|a(3)|s(0),Rs=re(1)|o(10)|a(3)|s(0),Ss=re(1)|o(3)|a(1)|s(0),As=re(1)|o(4)|a(3)|s(0),ws=re(1)|o(4)|a(3)|s(0)|p(1),Ls=re(1)|o(6)|a(4)|s(0),Is=0,Fs=1,Gs=2,Os=3,Ns=0,Hs=1,Us=2,ks=3,Ds=64,Bs=256,Ks=512,Ws=4096,js=16384,Vs=8192,$s=4,Zs=1024,Xs=2048,zs=67108864;var xt=(()=>{var f="https://v2ex.invalid/bundled-lcms.js";return async function(He={}){var n=He,Ue,le;n.ready=new Promise((e,t)=>{Ue=e,le=t}),["_free","_malloc","_cmsXYZ2xyY","_cmsReadTag","_cmsGetHeaderRenderingIntent","_cmsGetTransformOutputFormat","_cmsGetTransformInputFormat","_cmsDoTransform","_cmsDeleteTransform","_cmsCreateProofingTransform","_cmsCreateTransform","_cmsFormatterForColorspaceOfProfile","_cmsGetColorSpace","_cmsGetProfileInfoASCII","_cmsCreateLab4Profile","_cmsCreateXYZProfile","_cmsCreate_sRGBProfile","_cmsCloseProfile","_cmsOpenProfileFromMem","getExceptionMessage","$incrementExceptionRefcount","$decrementExceptionRefcount","_memory","___indirect_function_table","onRuntimeInitialized"].forEach(e=>{Object.getOwnPropertyDescriptor(n.ready,e)||Object.defineProperty(n.ready,e,{get:()=>v("You are getting "+e+" on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"),set:()=>v("You are setting "+e+" on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js")})});var ke=Object.assign({},n),fe=[],De="./this.program",be=(e,t)=>{throw t},ye=typeof window=="object",q=typeof importScripts=="function",ue=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",Be=!ye&&!ue&&!q;if(n.ENVIRONMENT)throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");var R="";function bt(e){return n.locateFile?n.locateFile(e,R):R+e}var pe,Me,Q;if(ue){if(typeof process>"u"||!process.release||process.release.name!=="node")throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");var Ke=process.versions.node,oe=Ke.split(".").slice(0,3);if(oe=oe[0]*1e4+oe[1]*100+oe[2].split("-")[0]*1,oe<16e4)throw new Error("This emscripten-generated code requires node v16.0.0 (detected v"+Ke+")");const{createRequire:e}=await import("module");var me=e("https://v2ex.invalid/bundled-lcms.js"),We=me("fs"),Ye=me("path");q?R=Ye.dirname(R)+"/":R=me("url").fileURLToPath(new URL("./","https://v2ex.invalid/bundled-lcms.js")),pe=(t,r)=>(t=Le(t)?new URL(t):Ye.normalize(t),We.readFileSync(t,r?void 0:"utf8")),Q=t=>{var r=pe(t,!0);return r.buffer||(r=new Uint8Array(r)),u(r.buffer),r},Me=(t,r,i,c=!0)=>{t=Le(t)?new URL(t):Ye.normalize(t),We.readFile(t,c?void 0:"utf8",(_,l)=>{_?i(_):r(c?l.buffer:l)})},!n.thisProgram&&process.argv.length>1&&(De=process.argv[1].replace(/\\/g,"/")),fe=process.argv.slice(2),be=(t,r)=>{throw process.exitCode=t,r}}else if(Be){if(typeof process=="object"&&typeof me=="function"||typeof window=="object"||typeof importScripts=="function")throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");typeof read<"u"&&(pe=read),Q=e=>{if(typeof readbuffer=="function")return new Uint8Array(readbuffer(e));let t=read(e,"binary");return u(typeof t=="object"),t},Me=(e,t,r)=>{setTimeout(()=>t(Q(e)))},typeof clearTimeout>"u"&&(globalThis.clearTimeout=e=>{}),typeof setTimeout>"u"&&(globalThis.setTimeout=e=>typeof e=="function"?e():v()),typeof scriptArgs<"u"?fe=scriptArgs:typeof arguments<"u"&&(fe=arguments),typeof quit=="function"&&(be=(e,t)=>{throw setTimeout(()=>{if(!(t instanceof Kt)){let r=t;t&&typeof t=="object"&&t.stack&&(r=[t,t.stack]),b(`exiting due to exception: ${r}`)}quit(e)}),t}),typeof print<"u"&&(typeof console>"u"&&(console={}),console.log=print,console.warn=console.error=typeof printErr<"u"?printErr:print)}else if(ye||q){if(q?R=self.location.href:typeof document<"u"&&document.currentScript&&(R=document.currentScript.src),f&&(R=f),R.startsWith("blob:")?R="":R=R.substr(0,R.replace(/[?#].*/,"").lastIndexOf("/")+1),!(typeof window=="object"||typeof importScripts=="function"))throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");pe=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText},q&&(Q=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),Me=(e,t,r)=>{var i=new XMLHttpRequest;i.open("GET",e,!0),i.responseType="arraybuffer",i.onload=()=>{if(i.status==200||i.status==0&&i.response){t(i.response);return}r()},i.onerror=r,i.send(null)}}else throw new Error("environment detection error");var yt=n.print||console.log.bind(console),b=n.printErr||console.error.bind(console);Object.assign(n,ke),ke=null,gr(),n.arguments&&(fe=n.arguments),N("arguments","arguments_"),n.thisProgram&&(De=n.thisProgram),N("thisProgram","thisProgram"),n.quit&&(be=n.quit),N("quit","quit_"),u(typeof n.memoryInitializerPrefixURL>"u","Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"),u(typeof n.pthreadMainPrefixURL>"u","Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"),u(typeof n.cdInitializerPrefixURL>"u","Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"),u(typeof n.filePackagePrefixURL>"u","Module.filePackagePrefixURL option was removed, use Module.locateFile instead"),u(typeof n.read>"u","Module.read option was removed (modify read_ in JS)"),u(typeof n.readAsync>"u","Module.readAsync option was removed (modify readAsync in JS)"),u(typeof n.readBinary>"u","Module.readBinary option was removed (modify readBinary in JS)"),u(typeof n.setWindowTitle>"u","Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)"),u(typeof n.TOTAL_MEMORY>"u","Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"),N("asm","wasmExports"),N("read","read_"),N("readAsync","readAsync"),N("readBinary","readBinary"),N("setWindowTitle","setWindowTitle"),u(!Be,"shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");var ae;n.wasmBinary&&(ae=n.wasmBinary),N("wasmBinary","wasmBinary"),typeof WebAssembly!="object"&&v("no native wasm support detected");var se,de=!1,Mt;function u(e,t){e||v("Assertion failed"+(t?": "+t:""))}var L,ee,he,Yt,S,T,Re,Se;function je(){var e=se.buffer;n.HEAP8=L=new Int8Array(e),n.HEAP16=he=new Int16Array(e),n.HEAPU8=ee=new Uint8Array(e),n.HEAPU16=Yt=new Uint16Array(e),n.HEAP32=S=new Int32Array(e),n.HEAPU32=T=new Uint32Array(e),n.HEAPF32=Re=new Float32Array(e),n.HEAPF64=Se=new Float64Array(e)}u(!n.STACK_SIZE,"STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time"),u(typeof Int32Array<"u"&&typeof Float64Array<"u"&&Int32Array.prototype.subarray!=null&&Int32Array.prototype.set!=null,"JS engine does not provide full typed array support"),u(!n.wasmMemory,"Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally"),u(!n.INITIAL_MEMORY,"Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");function ht(){var e=Oe();u((e&3)==0),e==0&&(e+=4),T[e>>2]=34821223,T[e+4>>2]=2310721022,T[0]=1668509029}function Ae(){if(!de){var e=Oe();e==0&&(e+=4);var t=T[e>>2],r=T[e+4>>2];(t!=34821223||r!=2310721022)&&v(`Stack overflow! Stack cookie has been overwritten at ${_e(e)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${_e(r)} ${_e(t)}`),T[0]!=1668509029&&v("Runtime error: The application has corrupted its heap memory area (address zero)!")}}(function(){var e=new Int16Array(1),t=new Int8Array(e.buffer);if(e[0]=25459,t[0]!==115||t[1]!==99)throw"Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)"})();var Ve=[],$e=[],Ze=[],we=!1;function Rt(){if(n.preRun)for(typeof n.preRun=="function"&&(n.preRun=[n.preRun]);n.preRun.length;)wt(n.preRun.shift());Ie(Ve)}function St(){u(!we),we=!0,Ae(),Ie($e)}function At(){if(Ae(),n.postRun)for(typeof n.postRun=="function"&&(n.postRun=[n.postRun]);n.postRun.length;)It(n.postRun.shift());Ie(Ze)}function wt(e){Ve.unshift(e)}function Lt(e){$e.unshift(e)}function It(e){Ze.unshift(e)}u(Math.imul,"This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"),u(Math.fround,"This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"),u(Math.clz32,"This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"),u(Math.trunc,"This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");var B=0,K=null,ie=null,ce={};function Ft(e){B++,n.monitorRunDependencies?.(B),e?(u(!ce[e]),ce[e]=1,K===null&&typeof setInterval<"u"&&(K=setInterval(()=>{if(de){clearInterval(K),K=null;return}var t=!1;for(var r in ce)t||(t=!0,b("still waiting on run dependencies:")),b(`dependency: ${r}`);t&&b("(end of list)")},1e4))):b("warning: run dependency added without ID")}function Gt(e){if(B--,n.monitorRunDependencies?.(B),e?(u(ce[e]),delete ce[e]):b("warning: run dependency removed without ID"),B==0&&(K!==null&&(clearInterval(K),K=null),ie)){var t=ie;ie=null,t()}}function v(e){n.onAbort?.(e),e="Aborted("+e+")",b(e),de=!0,Mt=1;var t=new WebAssembly.RuntimeError(e);throw le(t),t}var A={error(){v("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM")},init(){A.error()},createDataFile(){A.error()},createPreloadedFile(){A.error()},createLazyFile(){A.error()},open(){A.error()},mkdev(){A.error()},registerDevice(){A.error()},analyzePath(){A.error()},ErrnoError(){A.error()}};n.FS_createDataFile=A.createDataFile,n.FS_createPreloadedFile=A.createPreloadedFile;var Ot="data:application/octet-stream;base64,",Xe=e=>e.startsWith(Ot),Le=e=>e.startsWith("file://");function d(e){return function(){u(we,`native function \`${e}\` called before runtime initialization`);var t=w[e];return u(t,`exported native function \`${e}\` not found`),t.apply(null,arguments)}}class G extends Error{}class Jr extends G{}class Nt extends G{constructor(t){super(t),this.excPtr=t;const r=nt(t);this.name=r[0],this.message=r[1]}}var O;n.locateFile?(O="lcms.wasm",Xe(O)||(O=bt(O))):O=new URL("lcms.wasm","https://v2ex.invalid/bundled-lcms.js").href;function ze(e){if(e==O&&ae)return new Uint8Array(ae);if(Q)return Q(e);throw"both async and sync fetching of the wasm failed"}function Ht(e){return!ae&&(ye||q)&&typeof fetch=="function"?fetch(e,{credentials:"same-origin"}).then(t=>{if(!t.ok)throw`failed to load wasm binary file at '${e}'`;return t.arrayBuffer()}).catch(()=>ze(e)):Promise.resolve().then(()=>ze(e))}function Je(e,t,r){return Ht(e).then(i=>WebAssembly.instantiate(i,t)).then(i=>i).then(r,i=>{b(`failed to asynchronously prepare wasm: ${i}`),Le(O)&&b(`warning: Loading from a file URI (${O}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`),v(i)})}function Ut(e,t,r,i){return!e&&typeof WebAssembly.instantiateStreaming=="function"&&!Xe(t)&&!ue&&typeof fetch=="function"?fetch(t,{credentials:"same-origin"}).then(c=>{var _=WebAssembly.instantiateStreaming(c,r);return _.then(i,function(l){return b(`wasm streaming compile failed: ${l}`),b("falling back to ArrayBuffer instantiation"),Je(t,r,i)})}):Je(t,r,i)}function kt(){var e={env:lt,wasi_snapshot_preview1:lt};function t(c,_){return w=c.exports,se=w.memory,u(se,"memory not found in wasm exports"),je(),ve=w.__indirect_function_table,u(ve,"table not found in wasm exports"),Lt(w.__wasm_call_ctors),Gt("wasm-instantiate"),w}Ft("wasm-instantiate");var r=n;function i(c){u(n===r,"the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"),r=null,t(c.instance)}if(n.instantiateWasm)try{return n.instantiateWasm(e,t)}catch(c){b(`Module.instantiateWasm callback failed with error: ${c}`),le(c)}return Ut(ae,O,e,i).catch(le),{}}function N(e,t,r=!0){Object.getOwnPropertyDescriptor(n,e)||Object.defineProperty(n,e,{configurable:!0,get(){let i=r?" (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)":"";v(`\`Module.${e}\` has been replaced by \`${t}\``+i)}})}function Dt(e){Object.getOwnPropertyDescriptor(n,e)&&v(`\`Module.${e}\` was supplied but \`${e}\` not included in INCOMING_MODULE_JS_API`)}function qe(e){return e==="FS_createPath"||e==="FS_createDataFile"||e==="FS_createPreloadedFile"||e==="FS_unlink"||e==="addRunDependency"||e==="FS_createLazyFile"||e==="FS_createDevice"||e==="removeRunDependency"}function Qe(e,t){typeof globalThis<"u"&&Object.defineProperty(globalThis,e,{configurable:!0,get(){W(`\`${e}\` is not longer defined by emscripten. ${t}`)}})}Qe("buffer","Please use HEAP8.buffer or wasmMemory.buffer"),Qe("asm","Please use wasmExports instead");function Bt(e){typeof globalThis<"u"&&!Object.getOwnPropertyDescriptor(globalThis,e)&&Object.defineProperty(globalThis,e,{configurable:!0,get(){var t=`\`${e}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`,r=e;r.startsWith("_")||(r="$"+e),t+=` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${r}')`,qe(e)&&(t+=". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"),W(t)}}),et(e)}function et(e){Object.getOwnPropertyDescriptor(n,e)||Object.defineProperty(n,e,{configurable:!0,get(){var t=`'${e}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;qe(e)&&(t+=". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"),v(t)}})}function Kt(e){this.name="ExitStatus",this.message=`Program terminated with exit(${e})`,this.status=e}var Ie=e=>{for(;e.length>0;)e.shift()(n)},Wt=e=>{var t=H(),r=e();return U(t),r},tt=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,rt=(e,t,r)=>{for(var i=t+r,c=t;e[c]&&!(c>=i);)++c;if(c-t>16&&e.buffer&&tt)return tt.decode(e.subarray(t,c));for(var _="";t<c;){var l=e[t++];if(!(l&128)){_+=String.fromCharCode(l);continue}var m=e[t++]&63;if((l&224)==192){_+=String.fromCharCode((l&31)<<6|m);continue}var C=e[t++]&63;if((l&240)==224?l=(l&15)<<12|m<<6|C:((l&248)!=240&&W("Invalid UTF-8 leading byte "+_e(l)+" encountered when deserializing a UTF-8 string in wasm memory to a JS string!"),l=(l&7)<<18|m<<12|C<<6|e[t++]&63),l<65536)_+=String.fromCharCode(l);else{var g=l-65536;_+=String.fromCharCode(55296|g>>10,56320|g&1023)}}return _},k=(e,t)=>(u(typeof e=="number",`UTF8ToString expects a number (got ${typeof e})`),e?rt(ee,e,t):""),jt=e=>Wt(()=>{var t=Ce(4),r=Ce(4);Yr(e,t,r);var i=T[t>>2],c=T[r>>2],_=k(i);D(i);var l;return c&&(l=k(c),D(c)),[_,l]}),nt=e=>jt(e);n.getExceptionMessage=nt;function te(e,t="i8"){switch(t.endsWith("*")&&(t="*"),t){case"i1":return L[e>>0];case"i8":return L[e>>0];case"i16":return he[e>>1];case"i32":return S[e>>2];case"i64":v("to do getValue(i64) use WASM_BIGINT");case"float":return Re[e>>2];case"double":return Se[e>>3];case"*":return T[e>>2];default:v(`invalid type for getValue: ${t}`)}}var qr=n.noExitRuntime||!0,_e=e=>(u(typeof e=="number"),e>>>=0,"0x"+e.toString(16).padStart(8,"0"));function Te(e,t,r="i8"){switch(r.endsWith("*")&&(r="*"),r){case"i1":L[e>>0]=t;break;case"i8":L[e>>0]=t;break;case"i16":he[e>>1]=t;break;case"i32":S[e>>2]=t;break;case"i64":v("to do setValue(i64) use WASM_BIGINT");case"float":Re[e>>2]=t;break;case"double":Se[e>>3]=t;break;case"*":T[e>>2]=t;break;default:v(`invalid type for setValue: ${r}`)}}var W=e=>{W.shown||={},W.shown[e]||(W.shown[e]=1,ue&&(e="warning: "+e),b(e))},Vt=(e,t,r,i)=>{v(`Assertion failed: ${k(e)}, at: `+[t?k(t):"unknown filename",r,i?k(i):"unknown function"])},$t=[],Zt=0,Xt=e=>{var t=new ot(e);return t.get_caught()||(t.set_caught(!0),Zt--),t.set_rethrown(!1),$t.push(t),Mr(t.excPtr),t.get_exception_ptr()},Pe=0;class ot{constructor(t){this.excPtr=t,this.ptr=t-24}set_type(t){T[this.ptr+4>>2]=t}get_type(){return T[this.ptr+4>>2]}set_destructor(t){T[this.ptr+8>>2]=t}get_destructor(){return T[this.ptr+8>>2]}set_caught(t){t=t?1:0,L[this.ptr+12>>0]=t}get_caught(){return L[this.ptr+12>>0]!=0}set_rethrown(t){t=t?1:0,L[this.ptr+13>>0]=t}get_rethrown(){return L[this.ptr+13>>0]!=0}init(t,r){this.set_adjusted_ptr(0),this.set_type(t),this.set_destructor(r)}set_adjusted_ptr(t){T[this.ptr+16>>2]=t}get_adjusted_ptr(){return T[this.ptr+16>>2]}get_exception_ptr(){var t=Rr(this.get_type());if(t)return T[this.excPtr>>2];var r=this.get_adjusted_ptr();return r!==0?r:this.excPtr}}var zt=e=>{throw Pe||(Pe=new Nt(e)),Pe},at=e=>{var t=Pe?.excPtr;if(!t)return ge(0),0;var r=new ot(t);r.set_adjusted_ptr(t);var i=r.get_type();if(!i)return ge(0),t;for(var c in e){var _=e[c];if(_===0||_===i)break;var l=r.ptr+16;if(hr(_,i,l))return ge(_),t}return ge(i),t},Jt=()=>at([]),qt=e=>at([e]),j={varargs:void 0,get(){u(j.varargs!=null);var e=S[+j.varargs>>2];return j.varargs+=4,e},getp(){return j.get()},getStr(e){var t=k(e);return t}};function Qt(e,t,r){return j.varargs=r,0}function er(e,t,r){return j.varargs=r,0}function tr(e,t,r,i){j.varargs=i,v("it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM")}var rr=e=>{v("it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM")},nr=(e,t,r)=>{v("it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM")},st=(e,t)=>(u(e==e>>>0||e==(e|0)),u(t===(t|0)),t+2097152>>>0<4194305-!!e?(e>>>0)+t*4294967296:NaN);function or(e,t,r){var i=st(e,t),c=new Date(i*1e3);S[r>>2]=c.getUTCSeconds(),S[r+4>>2]=c.getUTCMinutes(),S[r+8>>2]=c.getUTCHours(),S[r+12>>2]=c.getUTCDate(),S[r+16>>2]=c.getUTCMonth(),S[r+20>>2]=c.getUTCFullYear()-1900,S[r+24>>2]=c.getUTCDay();var _=Date.UTC(c.getUTCFullYear(),0,1,0,0,0,0),l=(c.getTime()-_)/(1e3*60*60*24)|0;S[r+28>>2]=l}var it=e=>{for(var t=0,r=0;r<e.length;++r){var i=e.charCodeAt(r);i<=127?t++:i<=2047?t+=2:i>=55296&&i<=57343?(t+=4,++r):t+=3}return t},ar=(e,t,r,i)=>{if(u(typeof e=="string",`stringToUTF8Array expects a string (got ${typeof e})`),!(i>0))return 0;for(var c=r,_=r+i-1,l=0;l<e.length;++l){var m=e.charCodeAt(l);if(m>=55296&&m<=57343){var C=e.charCodeAt(++l);m=65536+((m&1023)<<10)|C&1023}if(m<=127){if(r>=_)break;t[r++]=m}else if(m<=2047){if(r+1>=_)break;t[r++]=192|m>>6,t[r++]=128|m&63}else if(m<=65535){if(r+2>=_)break;t[r++]=224|m>>12,t[r++]=128|m>>6&63,t[r++]=128|m&63}else{if(r+3>=_)break;m>1114111&&W("Invalid Unicode code point "+_e(m)+" encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF)."),t[r++]=240|m>>18,t[r++]=128|m>>12&63,t[r++]=128|m>>6&63,t[r++]=128|m&63}}return t[r]=0,r-c},ct=(e,t,r)=>(u(typeof r=="number","stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"),ar(e,ee,t,r)),_t=e=>{var t=it(e)+1,r=Z(t);return r&&ct(e,r,t),r},sr=(e,t,r)=>{var i=new Date().getFullYear(),c=new Date(i,0,1),_=new Date(i,6,1),l=c.getTimezoneOffset(),m=_.getTimezoneOffset(),C=Math.max(l,m);T[e>>2]=C*60,S[t>>2]=+(l!=m);function g(y){var F=y.toTimeString().match(/\(([A-Za-z ]+)\)$/);return F?F[1]:"GMT"}var M=g(c),z=g(_),I=_t(M),J=_t(z);m<l?(T[r>>2]=I,T[r+4>>2]=J):(T[r>>2]=J,T[r+4>>2]=I)},ir=()=>{v("native code called abort()")},cr=()=>Date.now(),_r=(e,t,r)=>ee.copyWithin(e,t,t+r),lr=()=>2147483648,fr=e=>{var t=se.buffer,r=(e-t.byteLength+65535)/65536;try{return se.grow(r),je(),1}catch(i){b(`growMemory: Attempted to grow heap from ${t.byteLength} bytes to ${e} bytes, but got error: ${i}`)}},ur=e=>{var t=ee.length;e>>>=0,u(e>t);var r=lr();if(e>r)return b(`Cannot enlarge memory, requested ${e} bytes, but the limit is ${r} bytes!`),!1;for(var i=(C,g)=>C+(g-C%g)%g,c=1;c<=4;c*=2){var _=t*(1+.2/c);_=Math.min(_,e+100663296);var l=Math.min(r,i(Math.max(e,_),65536)),m=fr(l);if(m)return!0}return b(`Failed to grow the heap from ${t} bytes to ${l} bytes, not enough memory!`),!1},pr=e=>{v("fd_close called without SYSCALLS_REQUIRE_FILESYSTEM")},mr=(e,t,r,i)=>{v("fd_read called without SYSCALLS_REQUIRE_FILESYSTEM")};function dr(e,t,r,i,c){var _=st(t,r);return 70}var Fe=[null,[],[]],Ge=(e,t)=>{var r=Fe[e];u(r),t===0||t===10?((e===1?yt:b)(rt(r,0)),r.length=0):r.push(t)},Qr=()=>{Cr(0),Fe[1].length&&Ge(1,10),Fe[2].length&&Ge(2,10)},Tr=(e,t,r,i)=>{for(var c=0,_=0;_<r;_++){var l=T[t>>2],m=T[t+4>>2];t+=8;for(var C=0;C<m;C++)Ge(e,ee[l+C]);c+=m}return T[i>>2]=c,0},Ee=[],ve,V=e=>{var t=Ee[e];return t||(e>=Ee.length&&(Ee.length=e+1),Ee[e]=t=ve.get(e)),u(ve.get(e)==t,"JavaScript-side Wasm function table mirror is out of date!"),t},Pr=e=>{var t=n["_"+e];return u(t,"Cannot call unknown function "+e+", make sure it is exported"),t},Er=(e,t)=>{u(e.length>=0,"writeArrayToMemory array must have a length (should be an array or typed array)"),L.set(e,t)},vr=e=>{var t=it(e)+1,r=Ce(t);return ct(e,r,t),r},Y=(e,t,r,i,c)=>{var _={string:y=>{var F=0;return y!=null&&y!==0&&(F=vr(y)),F},array:y=>{var F=Ce(y.length);return Er(y,F),F}};function l(y){return t==="string"?k(y):t==="boolean"?!!y:y}var m=Pr(e),C=[],g=0;if(u(t!=="array",'Return type should not be "array".'),i)for(var M=0;M<i.length;M++){var z=_[r[M]];z?(g===0&&(g=H()),C[M]=z(i[M])):C[M]=i[M]}var I=m.apply(null,C);function J(y){return g!==0&&U(g),l(y)}return I=J(I),I},$=(e,t,r,i)=>function(){return Y(e,t,r,arguments,i)};function gr(){Dt("fetchSettings")}var lt={__assert_fail:Vt,__cxa_begin_catch:Xt,__cxa_find_matching_catch_2:Jt,__cxa_find_matching_catch_3:qt,__resumeException:zt,__syscall_fcntl64:Qt,__syscall_ioctl:er,__syscall_openat:tr,__syscall_rmdir:rr,__syscall_unlinkat:nr,_gmtime_js:or,_tzset_js:sr,abort:ir,emscripten_date_now:cr,emscripten_memcpy_js:_r,emscripten_resize_heap:ur,fd_close:pr,fd_read:mr,fd_seek:dr,fd_write:Tr,invoke_ii:Sr,invoke_iii:Fr,invoke_v:Ar,invoke_vi:Lr,invoke_vii:wr,invoke_viii:Gr,invoke_viiii:Ir},w=kt(),en=d("__wasm_call_ctors"),tn=n._cmsGetColorSpace=d("cmsGetColorSpace"),rn=n._cmsXYZ2xyY=d("cmsXYZ2xyY"),nn=n._cmsCloseProfile=d("cmsCloseProfile"),on=n._cmsDeleteTransform=d("cmsDeleteTransform"),an=n._cmsDoTransform=d("cmsDoTransform"),Z=n._malloc=d("malloc"),D=n._free=d("free"),sn=n._cmsFormatterForColorspaceOfProfile=d("cmsFormatterForColorspaceOfProfile"),cn=n._cmsGetHeaderRenderingIntent=d("cmsGetHeaderRenderingIntent"),_n=n._cmsOpenProfileFromMem=d("cmsOpenProfileFromMem"),ln=n._cmsReadTag=d("cmsReadTag"),fn=n._cmsGetProfileInfoASCII=d("cmsGetProfileInfoASCII"),un=n._cmsCreateTransform=d("cmsCreateTransform"),pn=n._cmsCreateXYZProfile=d("cmsCreateXYZProfile"),mn=n._cmsCreateLab4Profile=d("cmsCreateLab4Profile"),dn=n._cmsCreate_sRGBProfile=d("cmsCreate_sRGBProfile"),Tn=n._cmsCreateProofingTransform=d("cmsCreateProofingTransform"),Pn=n._cmsGetTransformInputFormat=d("cmsGetTransformInputFormat"),En=n._cmsGetTransformOutputFormat=d("cmsGetTransformOutputFormat"),Cr=d("fflush"),X=d("setThrew"),ge=d("setTempRet0"),ft=()=>(ft=w.emscripten_stack_init)(),xr=()=>(xr=w.emscripten_stack_get_free)(),br=()=>(br=w.emscripten_stack_get_base)(),Oe=()=>(Oe=w.emscripten_stack_get_end)(),H=d("stackSave"),U=d("stackRestore"),Ce=d("stackAlloc"),yr=()=>(yr=w.emscripten_stack_get_current)(),vn=d("__cxa_free_exception"),Mr=d("__cxa_increment_exception_refcount"),gn=d("__cxa_decrement_exception_refcount"),Yr=d("__get_exception_message"),hr=d("__cxa_can_catch"),Rr=d("__cxa_is_pointer_type"),Cn=n.dynCall_jiji=d("dynCall_jiji");function Sr(e,t){var r=H();try{return V(e)(t)}catch(i){if(U(r),!(i instanceof G))throw i;X(1,0)}}function Ar(e){var t=H();try{V(e)()}catch(r){if(U(t),!(r instanceof G))throw r;X(1,0)}}function wr(e,t,r){var i=H();try{V(e)(t,r)}catch(c){if(U(i),!(c instanceof G))throw c;X(1,0)}}function Lr(e,t){var r=H();try{V(e)(t)}catch(i){if(U(r),!(i instanceof G))throw i;X(1,0)}}function Ir(e,t,r,i,c){var _=H();try{V(e)(t,r,i,c)}catch(l){if(U(_),!(l instanceof G))throw l;X(1,0)}}function Fr(e,t,r){var i=H();try{return V(e)(t,r)}catch(c){if(U(i),!(c instanceof G))throw c;X(1,0)}}function Gr(e,t,r,i){var c=H();try{V(e)(t,r,i)}catch(_){if(U(c),!(_ instanceof G))throw _;X(1,0)}}n.ccall=Y,n.cwrap=$;var Or=["writeI53ToI64","writeI53ToI64Clamped","writeI53ToI64Signaling","writeI53ToU64Clamped","writeI53ToU64Signaling","readI53FromI64","readI53FromU64","convertI32PairToI53","convertU32PairToI53","zeroMemory","exitJS","isLeapYear","ydayFromDate","arraySum","addDays","inetPton4","inetNtop4","inetPton6","inetNtop6","readSockaddr","writeSockaddr","initRandomFill","randomFill","getCallstack","emscriptenLog","convertPCtoSourceLocation","readEmAsmArgs","jstoi_q","getExecutableName","listenOnce","autoResumeAudioContext","dynCallLegacy","getDynCaller","dynCall","handleException","keepRuntimeAlive","runtimeKeepalivePush","runtimeKeepalivePop","callUserCallback","maybeExit","asmjsMangle","asyncLoad","alignMemory","mmapAlloc","HandleAllocator","getNativeTypeSize","STACK_SIZE","STACK_ALIGN","POINTER_SIZE","ASSERTIONS","uleb128Encode","sigToWasmTypes","generateFuncType","convertJsFunctionToWasm","getEmptyTableSlot","updateTableMap","getFunctionAddress","addFunction","removeFunction","reallyNegative","unSign","strLen","reSign","formatString","intArrayFromString","intArrayToString","AsciiToString","stringToAscii","UTF16ToString","stringToUTF16","lengthBytesUTF16","UTF32ToString","stringToUTF32","lengthBytesUTF32","registerKeyEventCallback","maybeCStringToJsString","findEventTarget","getBoundingClientRect","fillMouseEventData","registerMouseEventCallback","registerWheelEventCallback","registerUiEventCallback","registerFocusEventCallback","fillDeviceOrientationEventData","registerDeviceOrientationEventCallback","fillDeviceMotionEventData","registerDeviceMotionEventCallback","screenOrientation","fillOrientationChangeEventData","registerOrientationChangeEventCallback","fillFullscreenChangeEventData","registerFullscreenChangeEventCallback","JSEvents_requestFullscreen","JSEvents_resizeCanvasForFullscreen","registerRestoreOldStyle","hideEverythingExceptGivenElement","restoreHiddenElements","setLetterbox","softFullscreenResizeWebGLRenderTarget","doRequestFullscreen","fillPointerlockChangeEventData","registerPointerlockChangeEventCallback","registerPointerlockErrorEventCallback","requestPointerLock","fillVisibilityChangeEventData","registerVisibilityChangeEventCallback","registerTouchEventCallback","fillGamepadEventData","registerGamepadEventCallback","registerBeforeUnloadEventCallback","fillBatteryEventData","battery","registerBatteryEventCallback","setCanvasElementSize","getCanvasElementSize","demangle","jsStackTrace","stackTrace","getEnvStrings","checkWasiClock","wasiRightsToMuslOFlags","wasiOFlagsToMuslOFlags","createDyncallWrapper","safeSetTimeout","setImmediateWrapped","clearImmediateWrapped","polyfillSetImmediate","getPromise","makePromise","idsToPromises","makePromiseCallback","Browser_asyncPrepareDataCounter","setMainLoop","getSocketFromFD","getSocketAddress","heapObjectForWebGLType","heapAccessShiftForWebGLHeap","webgl_enable_ANGLE_instanced_arrays","webgl_enable_OES_vertex_array_object","webgl_enable_WEBGL_draw_buffers","webgl_enable_WEBGL_multi_draw","emscriptenWebGLGet","computeUnpackAlignedImageSize","colorChannelsInGlTextureFormat","emscriptenWebGLGetTexPixelData","__glGenObject","emscriptenWebGLGetUniform","webglGetUniformLocation","webglPrepareUniformLocationsBeforeFirstUse","webglGetLeftBracePos","emscriptenWebGLGetVertexAttrib","__glGetActiveAttribOrUniform","writeGLArray","registerWebGlEventCallback","runAndAbortIfError","SDL_unicode","SDL_ttfContext","SDL_audio","ALLOC_NORMAL","ALLOC_STACK","allocate","writeStringToMemory","writeAsciiToMemory","setErrNo"];Or.forEach(Bt);var Nr=["run","addOnPreRun","addOnInit","addOnPreMain","addOnExit","addOnPostRun","addRunDependency","removeRunDependency","FS_createFolder","FS_createPath","FS_createLazyFile","FS_createLink","FS_createDevice","FS_readFile","out","err","callMain","abort","wasmMemory","wasmExports","stackAlloc","stackSave","stackRestore","getTempRet0","setTempRet0","writeStackCookie","checkStackCookie","convertI32PairToI53Checked","ptrToString","getHeapMax","growMemory","ENV","MONTH_DAYS_REGULAR","MONTH_DAYS_LEAP","MONTH_DAYS_REGULAR_CUMULATIVE","MONTH_DAYS_LEAP_CUMULATIVE","ERRNO_CODES","ERRNO_MESSAGES","DNS","Protocols","Sockets","timers","warnOnce","UNWIND_CACHE","readEmAsmArgsArray","jstoi_s","wasmTable","noExitRuntime","getCFunc","freeTableIndexes","functionsInTableMap","setValue","getValue","PATH","PATH_FS","UTF8Decoder","UTF8ArrayToString","UTF8ToString","stringToUTF8Array","stringToUTF8","lengthBytesUTF8","UTF16Decoder","stringToNewUTF8","stringToUTF8OnStack","writeArrayToMemory","JSEvents","specialHTMLTargets","findCanvasEventTarget","currentFullscreenStrategy","restoreOldWindowedStyle","ExitStatus","flush_NO_FILESYSTEM","promiseMap","uncaughtExceptionCount","exceptionLast","exceptionCaught","ExceptionInfo","findMatchingCatch","getExceptionMessageCommon","incrementExceptionRefcount","decrementExceptionRefcount","getExceptionMessage","Browser","wget","SYSCALLS","tempFixedLengthArray","miniTempWebGLFloatBuffers","miniTempWebGLIntBuffers","GL","emscripten_webgl_power_preferences","AL","GLUT","EGL","GLEW","IDBStore","SDL","SDL_gfx","allocateUTF8","allocateUTF8OnStack"];Nr.forEach(et);var xe;ie=function e(){xe||ut(),xe||(ie=e)};function Hr(){ft(),ht()}function ut(){if(B>0||(Hr(),Rt(),B>0))return;function e(){xe||(xe=!0,n.calledRun=!0,!de&&(St(),Ue(n),n.onRuntimeInitialized&&n.onRuntimeInitialized(),u(!n._main,'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'),At()))}n.setStatus?(n.setStatus("Running..."),setTimeout(function(){setTimeout(function(){n.setStatus("")},1),e()},1)):e(),Ae()}if(n.preInit)for(typeof n.preInit=="function"&&(n.preInit=[n.preInit]);n.preInit.length>0;)n.preInit.pop()();ut(),n.cmsOpenProfileFromMem=$("cmsOpenProfileFromMem","number",["array","number"]),n.cmsCloseProfile=$("cmsCloseProfile",void 0,["number"]),n.cmsCreate_sRGBProfile=$("cmsCreate_sRGBProfile","number",[]),n.cmsCreateXYZProfile=$("cmsCreateXYZProfile","number",[],[]),n.cmsGetHeaderRenderingIntent=$("cmsGetHeaderRenderingIntent","number",["number"]),n.cmsCreateLab4Profile=Ur;function Ur(e){var t=0;if(e){t=Z(8*3);for(var r=0;r<3;r++)Te(t+r*8,e[r],"double")}var i=Y("cmsCreateLab4Profile","number",["number"],[t]);return t&&D(t),i}n.cmsGetProfileInfoASCII=kr;function kr(e,t,r,i){var _=Y("cmsGetProfileInfoASCII","number",["number","number","string","string","number","number"],[e,t,r,i,0,0]),c=Z(_),_=Y("cmsGetProfileInfoASCII","number",["number","number","string","string","number","number"],[e,t,r,i,c,_]),l=k(c,_);return D(c),l}n.cmsGetColorSpace=$("cmsGetColorSpace","number",["number"]),n.cmsGetColorSpaceASCII=e=>{const t={1482250784:"XYZ",1281450528:"Lab",1282766368:"Luv",1497588338:"YCbr",1501067552:"Yxy",1380401696:"RGB",1196573017:"GRAY",1213421088:"HSV",1212961568:"HLS",1129142603:"CMYK",1129142560:"CMY"},r=n.cmsGetColorSpace(e);return t[r]||null},n.cmsFormatterForColorspaceOfProfile=Dr;function Dr(e,t,r){return Y("cmsFormatterForColorspaceOfProfile","number",["number","number","number"],[e,t,r])}n.cmsCreateTransform=Br;function Br(e,t,r,i,c,_){return Y("cmsCreateTransform","number",["number","number","number","number","number","number"],[e,t,r,i,c,_])}n.cmsCreateProofingTransform=Kr;function Kr(e,t,r,i,c,_,l,m){return Y("cmsCreateProofingTransform","number",["number","number","number","number","number","number","number","number"],[e,t,r,i,c,_,l,m])}n.cmsDeleteTransform=Wr;function Wr(e){if(!e)throw new Error("cmsDeleteTransform expects a non-false transform parameter");Y("cmsDeleteTransform",void 0,["number"],[e])}n.cmsGetTransformInputFormat=pt;function pt(e){return Y("cmsGetTransformInputFormat","number",["number"],[e])}n.cmsGetTransformOutputFormat=mt;function mt(e){return Y("cmsGetTransformOutputFormat","number",["number"],[e])}function dt(e,t){if(t){if(e==8)throw new Error("Float64Array not supported by LittleCMS");if(e==2)throw new Error("Float16Array not supported by LittleCMS");return Float32Array}if(e===4)throw new Error("Uint32Array not supported by LittleCMS");return e===2?Uint16Array:Uint8Array}n.cmsDoTransform=jr;function jr(e,t,r){var i=pt(e),c=mt(e),_=!!Et(i),l=!!Et(c),m=gt(i)+vt(i),C=gt(c)+vt(i),g=Ct(i),M=Ct(c);g=g<1?4:g,M=M<1?4:M;var z=m*r,I=Z(z*g),J;const y=dt(g,_),F=dt(M,l);J=new y(n.HEAPU8.buffer,I,z),J.set(t);var Pt=C*r,Ne=Z(Pt*M);Y("cmsDoTransform",void 0,["number","number","number","number"],[e,I,Ne,r]);var Zr=new F(n.HEAPU8.buffer,Ne,Pt).slice();return D(I),D(Ne),Zr}n.cmsReadTag=Tt;function Tt(e,t){var r=Y("cmsReadTag",void 0,["number","number"],[e,t]);return r}n.cmsReadTag_XYZ=Vr;function Vr(e,t){var r=Tt(e,t);if(!r)return null;var i=new Float64Array(3);return i[0]=te(r,"double"),i[1]=te(r+8,"double"),i[2]=te(r+16,"double"),i}n.cmsXYZ2xyY=$r;function $r(e){var t=Z(24),r=Z(8*3);Te(t,e[0],"double"),Te(t+8,e[1],"double"),Te(t+16,e[2],"double"),Y("cmsXYZ2xyY",void 0,["number","number"],[r,t]);var i=new Float64Array(3);return i[0]=te(r,"double"),i[1]=te(r+8,"double"),i[2]=te(r+16,"double"),D(t),D(r),i}return He.ready}})(),Js=xt;return xt;})();
    return instantiate({ wasmBinary: Uint8Array.from(atob("AGFzbQEAAAABgwImYAJ/fwBgBH9/f38Bf2ABfwF/YAJ/fwF/YAN/f38Bf2ADf39/AGABfwBgBX9/f39/AX9gBn9/f39/fwBgBH9/f38AYAd/f39/f39/AX9gBX9/f39/AGAAAX9gBn9/f39/fwF/YAJ8fwF/YAAAYAN/fn8BfmADf398AXxgAX0Bf2ABfAF8YAABfGAHf39/f3x/fwF/YAF/AXxgAn99AX1gAX8BfWACf3wAYAJ/fwF8YAJ/fQF/YAJ/fAF/YAt/f39/f39/f39/fwF/YAh/f39/f39/fwF/YAN/fn8Bf2ABfwF+YAJ8fAF8YAF+AX9gAnx/AXxgAn5/AX9gBn98f39/fwF/AvgEGwNlbnYNX19hc3NlcnRfZmFpbAAJA2VudhRlbXNjcmlwdGVuX21lbWNweV9qcwAFA2VudhNlbXNjcmlwdGVuX2RhdGVfbm93ABQDZW52EF9fc3lzY2FsbF9vcGVuYXQAAQNlbnYRX19zeXNjYWxsX2ZjbnRsNjQABANlbnYPX19zeXNjYWxsX2lvY3RsAAQWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQhmZF93cml0ZQABFndhc2lfc25hcHNob3RfcHJldmlldzEHZmRfcmVhZAABFndhc2lfc25hcHNob3RfcHJldmlldzEIZmRfY2xvc2UAAgNlbnYSX19zeXNjYWxsX3VubGlua2F0AAQDZW52D19fc3lzY2FsbF9ybWRpcgACA2VudglfdHpzZXRfanMABQNlbnYWZW1zY3JpcHRlbl9yZXNpemVfaGVhcAACA2VudgVhYm9ydAAPA2VudglpbnZva2VfaWkAAwNlbnYbX19jeGFfZmluZF9tYXRjaGluZ19jYXRjaF8zAAIDZW52CGludm9rZV92AAYDZW52Cmludm9rZV92aWkABQNlbnYRX19jeGFfYmVnaW5fY2F0Y2gAAgNlbnYJaW52b2tlX3ZpAAADZW52DGludm9rZV92aWlpaQALA2VudgppbnZva2VfaWlpAAQDZW52G19fY3hhX2ZpbmRfbWF0Y2hpbmdfY2F0Y2hfMgAMA2VudhFfX3Jlc3VtZUV4Y2VwdGlvbgAGA2VudgtpbnZva2VfdmlpaQAJFndhc2lfc25hcHNob3RfcHJldmlldzEHZmRfc2VlawAHA2VudgpfZ210aW1lX2pzAAUD9AbyBg8IAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAChUHFgMKBAoEAwMABAQEAwMEBAAEBQkAAgMAAgMABwQEBAYGAgIXAgICAgMRCgoEBBgSAwUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNAQYEAgIDAQQCAgMBBAICAwECAwMCAhkCAwMDAwQDAwMDAwMDAgQDDQUEAgQGAgUGAgcGAgUHBgIFBwUEBAIFAgICAgICBQIFAgQFBQICBgUCBAUDAgYCBQMEBQMBBwECBgcHBgIBAgcDBQUCBgMGBgcGBwUCBAUNAAMEBQcBBQADBQcHBQADBQUAAwsEAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAaAwIBAgADAwQDAwMDAwMEAxscAwAAAgMCAwIEBAMEBAADAwEBBAABAQQBAQQBAQEBBAABBAEBAQQAAQEBAQQBAQEBBAABBwEDAQEEAAEBAQEBAQEEAAEBBAEBBAEBBAEBBwQBBAEDAQEBAQQAAQcBAQcNAQEBBAEBAQEEAQcBBw0BAQEGAQEEAAEBAQEEAAEBAQEHAQcEAAEBAQEODg4ODg4BAwMCAgwMDAQGCR0NAAgICAEICAgICAoNHhIEBAQTBgICEAQEAgIDHwQgAgIEBAMTBCEiAQMAAgUEIwQHBQIFJAslAAEEAwICBgMAAAYGBgAPBgYGDwwMDAwGAg8GBAQDBQkJCQsLCAgEAgIAAwYDAwIDBQQCAAYGAgIDAgMDAgIABQoGAwADAgIDAgMEBAQCAwMDAAIDAwMAAgUCAwQNAwADAAYAAwMAAAACAgYBAwQCAwMDAwMDAwMDAwAAAgAEAQICAwMDAwABAgIEAgMAAAkAAAAAAAAAAAAAAAABAAMCBgADAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAYDAAAABAAAAAAAAAAAAwAAAAAABAAAAAAAAQAAAAMDAwMAAAAAAAAAAAQAAAAAAAADAwMAAAAAAAQAAAAAAAADAAIAAAUABAAFBwQHAXABngWeBQUHAQGAAoCAAgYTA38BQZC/wwcLfwFBAAt/AUEACweCBygGbWVtb3J5AgARX193YXNtX2NhbGxfY3RvcnMAGxlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQAQY21zR2V0Q29sb3JTcGFjZQCqAQpjbXNYWVoyeHlZAJ0DD2Ntc0Nsb3NlUHJvZmlsZQCsARJjbXNEZWxldGVUcmFuc2Zvcm0A0AQOY21zRG9UcmFuc2Zvcm0A0QQGbWFsbG9jAI8FBGZyZWUAkAUiY21zRm9ybWF0dGVyRm9yQ29sb3JzcGFjZU9mUHJvZmlsZQChAhtjbXNHZXRIZWFkZXJSZW5kZXJpbmdJbnRlbnQAqQEVY21zT3BlblByb2ZpbGVGcm9tTWVtAK0BCmNtc1JlYWRUYWcArwEWY21zR2V0UHJvZmlsZUluZm9BU0NJSQC8ARJjbXNDcmVhdGVUcmFuc2Zvcm0A3wQTY21zQ3JlYXRlWFlaUHJvZmlsZQDMBBRjbXNDcmVhdGVMYWI0UHJvZmlsZQDKBBVjbXNDcmVhdGVfc1JHQlByb2ZpbGUAzQQaY21zQ3JlYXRlUHJvb2ZpbmdUcmFuc2Zvcm0A4AQaY21zR2V0VHJhbnNmb3JtSW5wdXRGb3JtYXQA+wEbY21zR2V0VHJhbnNmb3JtT3V0cHV0Rm9ybWF0AKYBBmZmbHVzaADoBAhzZXRUaHJldwCTBQtzZXRUZW1wUmV0MACVBRVlbXNjcmlwdGVuX3N0YWNrX2luaXQAnAUZZW1zY3JpcHRlbl9zdGFja19nZXRfZnJlZQCdBRllbXNjcmlwdGVuX3N0YWNrX2dldF9iYXNlAJ4FGGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2VuZACfBQlzdGFja1NhdmUAoAUMc3RhY2tSZXN0b3JlAKEFCnN0YWNrQWxsb2MAogUcZW1zY3JpcHRlbl9zdGFja19nZXRfY3VycmVudACgBRRfX2N4YV9mcmVlX2V4Y2VwdGlvbgCZBSJfX2N4YV9pbmNyZW1lbnRfZXhjZXB0aW9uX3JlZmNvdW50AJoFIl9fY3hhX2RlY3JlbWVudF9leGNlcHRpb25fcmVmY291bnQAmwUXX19nZXRfZXhjZXB0aW9uX21lc3NhZ2UAiwcPX19jeGFfY2FuX2NhdGNoALAFFV9fY3hhX2lzX3BvaW50ZXJfdHlwZQCxBQxkeW5DYWxsX2ppamkAjAcJ9gkBAEEBC50FHh8fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9REY+Q0VHSElKS0xTVlFXWGptbnJzdHV2d3h5ent8fX5/gAGBAYIBgwGEAYUBhgGHAYgBiQGKAYsBjAGNAY4BjwGQAZEBkgGTAZwBnQGeAZ8BoAGhAaIBowGkAaUBlwGYAZkBmgGbAb0BwQHCAcMBxwHIAckBywHMAc0BzwHQAdMB2gHcAd8B4AH+Af8BgAKBAogCigKLAo0CjgKQApMClAKVApYCnQKeAp8CmQKaApsCkQKXApgChwKiAqMCpAKlAqYCpwKoAqkCqgKrAqwCrQKuAq8CsAKxArICswK0ArUCtgK3ArgCuQK6ArsCvAK9Ar4CvwLAAsECwgLDAsQCxQLGAscCyALJAsoCywLMAs0CzgLPAtAC0QLSAtMC1ALVAtYC1wLYAtkC2gLbAtwC3QLeAt8C4ALhAuIC4wLkAuUC5gLnAugC6QLqAusC7ALtAu4C7wLwAvEC8gLzAvQC9QL2AvcC+AL5AvoC+wL8Av0C/gL/AoADgQOCA4MDhAOFA4YDhwOIA4kDigOLA4wDjQOOA48DkAORA5IDkwOUA5UDlgOXA5gDmQOaA5sDnAOWBKIEpAS4BLoEyAPJA8oDywPMA80DzgPLA88D0APRA8sD0gPTA9EDywPUA9UD1gPXA9gD2gPWA9cD2wPcA90D3gPfA+AD3QPeA+ED4gPjA8sD5APmA+gD6QPqA+wD6APpA+4D7wPwA/ED8gPzA/AD8QP0A/UD1gPXA/YD+AP5A/oD+wP8A/0DywP+A/8DgATLA4EEggSDBMsDhASIBOgD6QOMBI0E6APpA44EjwSQBJEEkgSUBNYD1wOVBJgE6APpA5kEmgSbBMsDnASdBIAEywOeBJ8EoATLA6EEowT5A/oDpgSqBKwErQSuBK8EwwPLA7AEsQSyBLMEtAS2BMQDxQO3BLkEuwS8BL0EvgS/BMAEwQTCBMMExATFBMYE1QTWBNcE2ATYBNkE2gTbBNwE3QTpBOoE6wTtBIkFigWMBQ2XBZQFAOwEpAXmBOYEpgWvBa0FqQWkBa4FrAWqBbIFswXDBcQFxQXHBckFvAX4BdkFqAb0Bf0F/wWBBuAFnwaHB98F9gT2BPYE5wXoBVjqBewEpAWjBesF7AWkBe8F8AWkBfEFpAX8Bf4FgAaCBoMGhAakBZYGpAWaBqQFmwakBZwGpAWdBqQFngakBaAGpAWhBqQFogakBaMGpAWkBqQFpgakBaoGpAWsBqQFrQakBa8GpAWwBqQFsQakBbMGpAW0BqQFtQa2BqQFtwa4BqQFuQa2BqQFuga7BqQFvAakBb4GpAW/BqQFwAakBcEGpAXEBqQFxQakBcYGpAXIBqQFyQakBcoGpAXLBqQFzAakBc0GpAXOBs8GpAXRBqQF0gakBdMGpAXUBtUGpAXXBtgGpAXaBtkGpAXbBtUGpAXdBqQF3gakBd8GzwakBc4GzwakBc4GpAXgBuEG4gbjBuQG5QakBeYGpAXnBtUGpAXMBqQF6AakBVdX6QbqBqQF6wakBe0GpAXuBqQFV1fvBvAGpAXxBqQF8gakBfMG9Ab1BvYG9wakBfgGpAX5BqQF+gakBfwGpAVXV/0G/gakBfMG/waAB6QFgQekBYIHgweFB6QFggeGB4gHpAWKB6QFCpiZEPIGIwBBkL/DByQCQZC/AyQBQbi2A0G4tQM2AgBB8LUDQSo2AgAL8QsBDH8jAEGABGsiBiQAAkAgAC0ArwFBBHFFDQAgASACRiAAKAIEIgogACgCACILRnENACALQQd2IgxBB3EiDUUNACANIApBB3ZBB3FHDQAgCyAFKAIIIAZBwANqIAZBgANqEB1FDQAgCiAFKAIMIAZBwAJqIAZBgAJqEB1FDQBBBSEIQQUhBwJAAkACQAJAAkAgC0GHgIACcSIJQYCAgAJrDgUEAQIBAwALIAlBAkcNAEECQQEgC0GAEHEbIQcMAwtBf0EAIAlBAUcbIQcMAgtBAyEHDAELQQQhBwsCQAJAAkACQAJAIApBh4CAAnEiC0GAgIACaw4FBAECAQMACyALQQJHDQBBAkEBIApBgBBxGyEIDAMLQX9BACALQQFHGyEIDAILQQMhCAwBC0EEIQgLIAcgCHJBAEgEQCAAKAK8AUEIQaYcQQAQVAwBCyAHQRhsIAhBAnRqQYAIaigCACILRQ0AIA1BAUYEQCAERQ0BIANFDQEgAiAGKALAAmohDyABIAYoAsADaiEQIAYoAoACIQ0gBigCgAMhDCADQXxxIQ4gA0EDcSEJQQAhCiADQQRJIQNBACECQQAhAQNAIAogD2ohACACIBBqIQdBACEIIANFBEADQCAAIAcgCxEAACAAIA1qIgAgByAMaiIHIAsRAAAgACANaiIAIAcgDGoiByALEQAAIAAgDWoiACAHIAxqIgcgCxEAACAAIA1qIQAgByAMaiEHIAhBBGoiCCAORw0ACwtBACEIIAkEQANAIAAgByALEQAAIAAgDWohACAHIAxqIQcgCEEBaiIIIAlHDQALCyAFKAIEIApqIQogBSgCACACaiECIAFBAWoiASAERw0ACwwBCyAGQgA3A1AgBkIANwNYIAZCADcDYCAGQgA3A2ggBkIANwNwIAZCADcDeCAGQgA3AxAgBkIANwMYIAZCADcDICAGQgA3AyggBkIANwMwIAZCADcDOCAGQgA3A0AgBkIANwNIIAZCADcDACAGQgA3AwggBEUNACADBEAgDSAMQQFxIg9rIRBBACEMA0BBACEHA0AgB0ECdCIAIAZBwAFqaiAGQUBrIABqKAIAIAEgBkHAA2ogAGooAgBqajYCACAGQYABaiAAaiAAIAZqKAIAIAIgBkHAAmogAGooAgBqajYCAEEAIQogB0EBaiIHIA1HDQALA0BBACEHA0AgB0ECdCIAIAZBgAFqaiIIKAIAIgkgBkHAAWogAGoiDigCACIRIAsRAAAgDiARIAZBgANqIABqKAIAajYCACAIIAkgBkGAAmogAGooAgBqNgIAIAdBAWoiByANRw0ACyAKQQFqIgogA0cNAAsgBSgCBCEHIAUoAgAhCkEAIQBBACEIA0AgBiAAQQJ0IglqIg4gDigCACAHajYCACAGQUBrIhEgCWoiDiAOKAIAIApqNgIAIAYgCUEEciIJaiIOIA4oAgAgB2o2AgAgBkFAayAJaiIJIAkoAgAgCmo2AgAgAEECaiEAIAhBAmoiCCAQRw0ACyAPBEAgESAAQQJ0IgBqIgggCCgCACAKajYCACAAIAZqIgAgACgCACAHajYCAAsgDEEBaiIMIARHDQALDAELIA0gDEEBcSILayEMIAUoAgQhAyAFKAIAIQVBACEKA0BBACEHA0AgB0ECdCIAIAZBwAFqaiAGQUBrIABqKAIAIAEgBkHAA2ogAGooAgBqajYCACAGQYABaiAAaiAAIAZqKAIAIAIgBkHAAmogAGooAgBqajYCACAHQQFqIgcgDUcNAAtBACEAQQAhBwNAIAYgAEECdCIIaiIJIAkoAgAgA2o2AgAgBkFAayIOIAhqIgkgCSgCACAFajYCACAGIAhBBHIiCGoiCSAJKAIAIANqNgIAIAZBQGsgCGoiCCAIKAIAIAVqNgIAIABBAmohACAHQQJqIgcgDEcNAAsgCwRAIA4gAEECdCIAaiIHIAcoAgAgBWo2AgAgACAGaiIAIAAoAgAgA2o2AgALIApBAWoiCiAERw0ACwsgBkGABGokAAu/DQEIfyMAQUBqIgUkACAAQQN2QQ9xIgsgAEEHdkEHcSIJaiEGIABBB3EiBEEIIAQbIQgCQAJAIABBgCBxBEBBACEEIAZBEGtBcUkNAiAFQgA3AzggBUIANwMwIAVCADcDKCAFQgA3AyAgBUIANwMYIAVCADcDECAFQgA3AwggBUIANwMAIAlFDQEgAyAINgIAIAlBAUYNASADIAg2AgQgCUECRg0BIAMgCDYCCCAJQQNGDQEgAyAINgIMIAlBBEYNASADIAg2AhAgCUEFRg0BIAMgCDYCFCAJQQZGDQEgAyAINgIYDAELQQAhBCAGQRBrQXFJDQEgBUIANwM4IAVCADcDMCAFQgA3AyggBUIANwMgIAVCADcDGCAFQgA3AxAgBUIANwMIIAVCADcDAAJAIAlFDQAgAyAGIAhsIgE2AgAgCUEBRg0AIAMgATYCBCAJQQJGDQAgAyABNgIIIAlBA0YNACADIAE2AgwgCUEERg0AIAMgATYCECAJQQVGDQAgAyABNgIUIAlBBkYNACADIAE2AhgLAkAgAEGACHEEQEEAIQMgBkEBa0EDTwRAIAZBDHEhBwNAIAUgBEECdGoiASAGIARBf3NqNgIAIAEgBiAEQX5zajYCBCABIAYgBEF9c2o2AgggASAGIARBfHNqNgIMIARBBGohBCAKQQRqIgogB0cNAAsLIAZBA3EiAUUNAQNAIAUgBEECdGogBiAEQX9zajYCACAEQQFqIQQgA0EBaiIDIAFHDQALDAELQQAhASAGQQFrQQdPBEAgBkEIcSEKQQAhAwNAIAUgBEECdGogBDYCACAFIARBAXIiB0ECdGogBzYCACAFIARBAnIiB0ECdGogBzYCACAFIARBA3IiB0ECdGogBzYCACAFIARBBHIiB0ECdGogBzYCACAFIARBBXIiB0ECdGogBzYCACAFIARBBnIiB0ECdGogBzYCACAFIARBB3IiB0ECdGogBzYCACAEQQhqIQQgA0EIaiIDIApHDQALCyAGQQdxIgNFDQADQCAFIARBAnRqIAQ2AgAgBEEBaiEEIAFBAWoiASADRw0ACwsCQCAAQYCAAXFFDQAgBkECSQ0AIAUoAgAhACAFIAVBBHIgBkECdEEEayIBEOMEIAFqIAA2AgALAkAgCEECSQ0AQQAhAUEAIQQgBkEBa0EDTwRAIAZBDHEhCkEAIQADQCAFIARBAnRqIgMgAygCACAIbDYCACADIAMoAgQgCGw2AgQgAyADKAIIIAhsNgIIIAMgAygCDCAIbDYCDCAEQQRqIQQgAEEEaiIAIApHDQALCyAGQQNxIgBFDQADQCAFIARBAnRqIgMgAygCACAIbDYCACAEQQFqIQQgAUEBaiIBIABHDQALC0EBIQQgCUUNASACIAUgC0ECdGogCUECdBDiBBoMAQsCQCAAQYAIcQRAQQAhAyAGQQFrQQNPBEAgBkEMcSEHA0AgBSAEQQJ0aiIIIAYgBEF/c2o2AgAgCCAGIARBfnNqNgIEIAggBiAEQX1zajYCCCAIIAYgBEF8c2o2AgwgBEEEaiEEIApBBGoiCiAHRw0ACwsgBkEDcSIIRQ0BA0AgBSAEQQJ0aiAGIARBf3NqNgIAIARBAWohBCADQQFqIgMgCEcNAAsMAQtBACEIIAZBAWtBB08EQCAGQQhxIQpBACEDA0AgBSAEQQJ0aiAENgIAIAUgBEEBciIHQQJ0aiAHNgIAIAUgBEECciIHQQJ0aiAHNgIAIAUgBEEDciIHQQJ0aiAHNgIAIAUgBEEEciIHQQJ0aiAHNgIAIAUgBEEFciIHQQJ0aiAHNgIAIAUgBEEGciIHQQJ0aiAHNgIAIAUgBEEHciIHQQJ0aiAHNgIAIARBCGohBCADQQhqIgMgCkcNAAsLIAZBB3EiA0UNAANAIAUgBEECdGogBDYCACAEQQFqIQQgCEEBaiIIIANHDQALCyAAQYCAAXEEQCAFKAIAIQMgBkEBayIABEAgBSAFQQRyIABBAnQQ4wQaCyAFIABBAnRqIAM2AgALQQAhCEEAIQQgBkEBa0EDTwRAIAZBDHEhCkEAIQADQCAFIARBAnRqIgMgAygCACABbDYCACADIAMoAgQgAWw2AgQgAyADKAIIIAFsNgIIIAMgAygCDCABbDYCDCAEQQRqIQQgAEEEaiIAIApHDQALCyAGQQNxIgAEQANAIAUgBEECdGoiAyADKAIAIAFsNgIAIARBAWohBCAIQQFqIgggAEcNAAsLQQEhBCAJRQ0AIAIgBSALQQJ0aiAJQQJ0EOIEGgsgBUFAayQAIAQLDAAgACABLQAAOgAACxQAIAAgAS0AACIAQQh0IAByOwEACxUAIAAgAS0AALNDAAB/Q5UQcDsBAAsTACAAIAEtAACzQwAAf0OVOAIACxcAIAAgAS0AALhEAAAAAADgb0CjOQMACxoAIAAgAS8BAEGB/gNsQYCAgARqQRh2OgAACwwAIAAgAS8AADsAAAsXACAAIAEvAQAiAEEIdCAAQQh2cjsBAAsVACAAIAEvAQCzQwD/f0eVEHA7AQALEwAgACABLwEAs0MA/39HlTgCAAsXACAAIAEvAQC4RAAAAADg/+9AozkDAAsqACAAIAEvAQAiAEEIdCAAQQh2ckH//wNxQYH+A2xBgICABGpBGHY6AAALJQAgACABLwEAIgBBCHQgAEEIdnJB//8DcbNDAP9/R5UQcDsBAAsjACAAIAEvAQAiAEEIdCAAQQh2ckH//wNxs0MA/39HlTgCAAsnACAAIAEvAQAiAEEIdCAAQQh2ckH//wNxuEQAAAAA4P/vQKM5AwALaQEBfCAAAn9BACABLwEAEG+7RAAAAAAA4G9AokQAAAAAAADgP6AiAkQAAAAAAAAAAGUNABpB/wEgAkQAAAAAAOBvQGYNABogAkQAAAAAwP/fwKBEAAAAAAAAOEKgvUIQiKdBAWsLOgAAC2wBAXwgAAJ/QQAgAS8BABBvu0QAAAAA4P/vQKJEAAAAAAAA4D+gIgJEAAAAAAAAAABlDQAaQf//AyACRAAAAADg/+9AZg0AGiACRAAAAADA/9/AoEQAAAAAAAA4QqC9QhCIp0H//wFqCzsBAAt8AQF8IAACf0EAIAEvAQAQb7tEAAAAAOD/70CiRAAAAAAAAOA/oCICRAAAAAAAAAAAZQ0AGkH//wMgAkQAAAAA4P/vQGYNABogAkQAAAAAwP/fwKBEAAAAAAAAOEKgvUIQiKdB//8BagsiAEEIdCAAQYD+A3FBCHZyOwEACw4AIAAgAS8BABBvOAIACw8AIAAgAS8BABBvuzkDAAtnAQF8IAACf0EAIAEqAgC7RAAAAAAA4G9AokQAAAAAAADgP6AiAkQAAAAAAAAAAGUNABpB/wEgAkQAAAAAAOBvQGYNABogAkQAAAAAwP/fwKBEAAAAAAAAOEKgvUIQiKdBAWsLOgAAC2oBAXwgAAJ/QQAgASoCALtEAAAAAOD/70CiRAAAAAAAAOA/oCICRAAAAAAAAAAAZQ0AGkH//wMgAkQAAAAA4P/vQGYNABogAkQAAAAAwP/fwKBEAAAAAAAAOEKgvUIQiKdB//8Bags7AQALegEBfCAAAn9BACABKgIAu0QAAAAA4P/vQKJEAAAAAAAA4D+gIgJEAAAAAAAAAABlDQAaQf//AyACRAAAAADg/+9AZg0AGiACRAAAAADA/9/AoEQAAAAAAAA4QqC9QhCIp0H//wFqCyIAQQh0IABBgP4DcUEIdnI7AQALDgAgACABKgIAEHA7AQALDAAgACABKAAANgAACw0AIAAgASoCALs5AwALZgEBfCAAAn9BACABKwMARAAAAAAA4G9AokQAAAAAAADgP6AiAkQAAAAAAAAAAGUNABpB/wEgAkQAAAAAAOBvQGYNABogAkQAAAAAwP/fwKBEAAAAAAAAOEKgvUIQiKdBAWsLOgAAC2kBAXwgAAJ/QQAgASsDAEQAAAAA4P/vQKJEAAAAAAAA4D+gIgJEAAAAAAAAAABlDQAaQf//AyACRAAAAADg/+9AZg0AGiACRAAAAADA/9/AoEQAAAAAAAA4QqC9QhCIp0H//wFqCzsBAAt5AQF8IAACf0EAIAErAwBEAAAAAOD/70CiRAAAAAAAAOA/oCICRAAAAAAAAAAAZQ0AGkH//wMgAkQAAAAA4P/vQGYNABogAkQAAAAAwP/fwKBEAAAAAAAAOEKgvUIQiKdB//8BagsiAEEIdCAAQYD+A3FBCHZyOwEACw8AIAAgASsDALYQcDsBAAsNACAAIAErAwC2OAIACwwAIAAgASkAADcAAAu0CQEOfyMAQeAAayIHJAACQCABRQ0AIABBAEEAEN4BIgxFDQAgAygCACINKAJAIQsCfwJAAkAgDSgCPCIIQfTmiYsGRg0AIAhB69yl4wZGDQAgAigCACEOQQEhCgwBCyACKAIAIQ5BASEKIAtBoLTlwgVHIAtBoMSF4wRHcQ0AQQAhCiAIQfTmiYsGRg0AIAhB69yl4wZGDQAgDSgCRCEJIA0oAkAMAQsgDSgCQCEJIA0oAkQLIQ8CQAJAAkACQCAJIAtGDQAgC0HLsrWaBEYgCUHSmI2iA0ZxDQAgC0HSmI2iA0YgCUHLsrWaBEZxDQAgC0GgxIXjBEYgCUGgtOXCBUZxDQAgC0GgtOXCBUcNASAJQaDEheMERw0BCwJAAkAgCEH05omLBkYNACAIQevcpeMGRg0AIAFBAUYgCEHsxrXzBkZxDQAgCkUEQCANIA4QtwEiCEUNBEEAIAMgDiAEKAIAIAUrAwAgB0EYaiIKIAcQP0UNBSAMIAsgCSAKIAcQQA0CDAULIA0gDhC1ASIIDQEMAwsgDSAOELgBIghFDQIgB0EYaiIKEOoBIAdEAAAAAAAAAAA5AxAgB0QAAAAAAAAAADkDCCAHRAAAAAAAAAAAOQMAIAwgCyAJIAogBxBARQ0DCyAMIAgQ6AFFDQIgCBDjAUEBIRACQCABQQFGBEAgDyEKDAELA0AgAyAQQQJ0IgtqKAIAIhEoAjwhEiACIAtqKAIAIRMCfwJAAkAgD0GgtOXCBUciDSAPQaDEheMERyIIcSIODQAgEkHr3KXjBkYNACASQfTmiYsGRw0BCyARKAJAIQkgESgCRAwBCyARKAJEIQkgESgCQAshCgJAIAkgD0YNACAPQcuytZoERiAJQdKYjaIDRnENACAPQdKYjaIDRiAJQcuytZoERnENACAIRSAJQaC05cIFRnENACANDQMgCUGgxIXjBEcNAwsCQCASQevcpeMGRyASQfTmiYsGR3FFBEAgESATELgBIghFDQUCQCASQfTmiYsGRgRAIBAgAyATIAQgC2ooAgAgBSAQQQN0aisDACAHQRhqIAcQP0UNCAwBCyAHQRhqEOoBIAdEAAAAAAAAAAA5AxAgB0QAAAAAAAAAADkDCCAHRAAAAAAAAAAAOQMACyAMIA8gCSAHQRhqIAcQQEUNBgwBCyAOBEAgESATELUBIghFDQUMAQsgESATELcBIghFDQQgECADIBMgBCALaigCACAFIBBBA3RqKwMAIAdBGGoiDiAHED9FDQUgDCAPIAkgDiAHEEBFDQULIAwgCBDoAUUNBCAIEOMBIAohDyAQQQFqIhAgAUcNAAsLAkAgBkGAgAJxRQ0AAkAgCkHLsrWaBEYNACAKQaCEnZIFRg0AIApB2YLJugRHDQELIAwoAiAhASAKEKcDIQAgAUEoEE4iAgRAIAJBADYCICACQgA3AhggAkHzADYCFCACIAA2AhAgAiAANgIMIAJCoOCxm4aEnLbjADcCBCACIAE2AgALIAJFDQIgDEEBIAIQ5gFFDQILIAwhFAwDCyAAQQlBxxxBABBUIAwQ4wEMAgsgDBDjAQwBCyAIEOMBIAwQ4wELIAdB4ABqJAAgFAupGgIFfwt8IwBBoAVrIgckACAFEOoBIAZEAAAAAAAAAAA5AxAgBkQAAAAAAAAAADkDCCAGRAAAAAAAAAAAOQMAAn8CQAJAIAJBA0YEQCAHQagBaiABIABBAnRqIgBBBGsiASgCABCzAUUNAiAHQcgAaiABKAIAELQBRQ0CIAdBkAFqIAAoAgAQswFFDQIgByAAKAIAELQBRQ0CIAcrA6gBIAcrA5ABoyEMIAREAAAAAAAA8D9hBEAgBUQAAAAAAAAAADkDECAFRAAAAAAAAAAAOQMIIAUgDDkDACAHKwOwASAHKwOYAaMhBCAFRAAAAAAAAAAAOQMoIAUgBDkDICAFRAAAAAAAAAAAOQMYIAUgBysDuAEgBysDoAGjOQNAIAVEAAAAAAAAAAA5AzggBUQAAAAAAAAAADkDMAwCCyAHQagEaiIBIgBEAAAAAAAAAAA5AxAgAEQAAAAAAAAAADkDCCAAIAw5AwAgBysDsAEgBysDmAGjIQwgB0QAAAAAAAAAADkD0AQgByAMOQPIBCAHRAAAAAAAAAAAOQPABCAHIAcrA7gBIAcrA6ABozkD6AQgB0QAAAAAAAAAADkD4AQgB0QAAAAAAAAAADkD2AQgBEQAAAAAAAAAAGEEQCAHQeADaiICIAdByAAQ4gQaIAdBmANqIgAgAiABEOwBIAUgACAHEOwBIAdB0AJqIgEgB0HIAGpByAAQ4gQaIAEgB0GIAmoiARDtAUUNAyAFIAAgARDsAQwCCyAHQeADaiIAIAdByABqIgFByAAQ4gQaIAAgB0GYA2oiABDtAUUNAiAHQdACaiICIAAgB0GoBGoiABDsASABEEEhDCAHEEEhDSAMRAAAAAAAAAAAYw0CIA1EAAAAAAAAAABjDQIgABDrAUEAIAwgDaGZRHsUrkfheoQ/YxtFBEBEAAAAAAAA8D8gBKEgDaIgDCAEoqAhBAJAAkAgB0HwBGoiAARAIAQgBKIiDCAEoiENAnwCQCAERAAAAAAAQK9AZkUNACAERAAAAAAAWLtAZUUNAEQAAAAAAECPQCAEo0Qe4bTgRV+5P6JEAAAAAGXNzUEgDaNEIbByaJFtEsCiRAAAAACAhC5BIAyjROeMKO0NvgdAoqCgRGvylNV0Pc8/oAwBCyAERAAAAAAAWLtAZEUNAiAERAAAAAAAathAZUUNAkQAAAAAAECPQCAEo0STADW1bK3PP6JEAAAAAGXNzUEgDaNEIo51cRsNAMCiRAAAAACAhC5BIAyjRFmGONbFbf4/oqCgRPMC7KNTV84/oAshBCAAQoCAgICAgID4PzcDECAAIAQ5AwAgACAEIASiRAAAAAAAAAjAoiAERPYoXI/C9QZAoqBEmpmZmZmZ0b+gOQMIDAILQec2QY0nQTZBzBcQAAALQQBBAkGoF0EAEFQLIAdBiAVqIgEgABCeAyAHQcABaiIAIAFB6LEDEM8EGiAFIAIgABDsAQwCCyAFEOoBDAELIANFDQAgB0IANwO4BCAHQgA3A7AEIAdCADcDqAQgB0IANwPwAyAHQgA3A+gDIAdCADcD4AMgB0GoBGogASAAQQJ0aiIAQQRrKAIAIAIQwAMaIAdB4ANqIQMgACgCACEBIwBB0NAAayIAJAACQAJAAkAgASgCPCIJQfTmiYsGRg0AIAlB7Ma18wZGDQAgCUHr3KXjBkcNAQsgA0IANwMAIANCADcDECADQgA3AwgMAQsgAkEDTwRAIANCADcDACADQgA3AxAgA0IANwMIDAELIAEoAjghCQJAIAJBAXENACAJQYCAgCBJDQAgARC5AQRAIAFBASADEMEDGgwCCyADQqbl26O42uCzPzcDECADQvDxturl85y2PzcDCCADQrzzqZ3kzeG1PzcDAAwBCyABKAJAIQkCQCABIAJBARC6AQRAIAlBy7K1mgRGDQEgCUHZgsm6BEYNASAJQaCEnZIFRg0BCyADIAEgAhDAAxoMAQsCfyACQQFGBEAgAEGAQGsiCSABQQEQwANFDQIgAEG40ABqIAkQnwMgAUEBEMIDDAELIABByNAAakIANwMAIABBwNAAakIANwMAIABCADcDuFAgASACEMIDCyIJRQ0AQQAhAQNAIAAgAbdEAAAAAAAAWUCiRAAAAAAA4G9AozkDiFAgAEQAAAAAAABJQEQAAAAAAABJwCAAKwPAUCIEIAREAAAAAAAAScBjGyIEIAREAAAAAAAASUBkGzkDkFAgAEQAAAAAAABJQEQAAAAAAABJwCAAKwPIUCIEIAREAAAAAAAAScBjGyIEIAREAAAAAAAASUBkGzkDmFAgCSAAQYjQAGogAEGg0ABqQQEQ0QQgAUEDdCIIIABBgEBraiAAKwOIUDkDACAAQYAwaiAIaiAAKwOgUDkDACABQQFqIgFBgAJHDQALQf4BIQEgACsD+D8hBANAIABBgDBqIgggAUEDdGoiCiAKKwMAIgwgBCAEIAxkGyIEOQMAIAggAUEBayIKQQN0aiIIIAgrAwAiDCAEIAQgDGQbIgQ5AwAgAUECayEBIApBAUcNAAsgACsDgDAiBCAAKwP4PyIMY0UEQCAJENAEIANCADcDECADQgA3AwggA0IANwMADAELIAwgBKEhDAJAIAJBAUcNACAMRJqZmZmZmck/oiAEoCENQQAhAUEAIQgDQAJAAkAgAUEDdCIKIABBgEBraisDACIOIA1lRQRAIA4gAEGAMGogCmorAwChmUQAAAAAAAAQQGNFDQELIAFBAWoiAUGAAkcNAiAIRQ0BDAMLQQEhCCABQQFqIgFBgAJHDQEMAgsLIAMgAEG40ABqEKADIAkQ0AQMAQtBACEBA0AgAUEDdCIIIABBgCBqIgpqIABBgDBqIAhqKwMAIAShIAyjOQMAIAogCEEIciIIaiAAQYAwaiAIaisDACAEoSAMozkDACABQQJqIgFBgAJHDQALRAAAAAAAAOA/RAAAAAAAANA/IAJBAUYiARshDESamZmZmZm5P0S4HoXrUbiePyABGyENQQAhAUEAIQIDQAJAIAFBA3QiCCAAQYAgamorAwAiBCANZkUNACAEIAxjRQ0AIAAgAkEDdCIKaiAEOQMAIABBgBBqIApqIABBgEBrIAhqKwMAOQMAIAJBAWohAgsgAUEBaiIBQYACRw0ACyACQQJMBEAgCRDQBCADQgA3AxAgA0IANwMIIANCADcDAAwBCyAAQYAQaiEKRAAAAAAAAAAAIQ1EAAAAAAAAAAAhDEQAAAAAAAAAACEOQQAhCCMAQYABayIBJAACQCACQQRIDQADQCAAIAhBA3QiC2orAwAiFSAKIAtqKwMAIgSiIhQgEKAhECAUIASiIBGgIREgBCAEoiIUIASiIhYgDaAhDSAWIASiIBKgIRIgDyAVoCEPIA4gBKAhDiAUIAygIQwgCEEBaiIIIAJHDQALIAFBOGoiCCAMOQMQIAggDjkDCCAIIAK3OQMAIAEgDTkDYCABIAw5A1ggASAOOQNQIAEgEjkDeCABIA05A3AgASAMOQNoIAFBIGoiAiAROQMQIAIgEDkDCCACIA85AwAgAUEIaiAIIAIQ7gFFDQAgASsDCCENIAErAxAhBCABKwMYIgyZRLu919nffNs9YwRAIASZRLu919nffNs9Yw0BRAAAAAAAAAAARAAAAAAAAAAAIA2aIASjIgQgBEQAAAAAAAAAAGQbIAREAAAAAAAASUBjGyETDAELIAQgBKIgDEQAAAAAAAAQwKIgDaKgIg1EAAAAAAAAAABlDQBEAAAAAAAAAABEAAAAAAAASUAgDZ8gBKEgDCAMoKMiBCAERAAAAAAAAElAZBsiBCAERAAAAAAAAAAAYxshEwsgAUGAAWokACATIQQgACAAKwPAUDkDkFAgACAAKwPIUDkDmFAgAEQAAAAAAAAAACAEIAREAAAAAAAAAABjGzkDiFAgAyAAQYjQAGoQoAMgCRDQBAsgAEHQ0ABqJAACQCAHKwOoBCIPIAcrA+ADYg0AIAcrA7AEIAcrA+gDYg0AIAcrA7gEIAcrA/ADYQ0BCyAHKwOwBCETQfCxAysDACENIAcrA7gEIQ5B+LEDKwMAIQQgBysD6AMhECAHKwPwAyERQeixAysDACEMIAcrA6gEIRUgBysD4AMhEiAFRAAAAAAAAAAAOQMQIAVEAAAAAAAAAAA5AwggBSASIAyhIA8gDKEiD6M5AwAgBUQAAAAAAAAAADkDKCAFIBAgDaEgEyANoSIUozkDICAFRAAAAAAAAAAAOQMYIAUgESAEoSAOIAShIhajOQNAIAVEAAAAAAAAAAA5AzggBUQAAAAAAAAAADkDMCAGIBEgDqEgBJqiIBajOQMQIAYgECAToSANmqIgFKM5AwggBiASIBWhIAyaoiAPozkDAAsgBiAGKwMARAAAAADg//8/ozkDACAGIAYrAwhEAAAAAOD//z+jOQMIIAYgBisDEEQAAAAA4P//P6M5AxBBAQwBC0EACyAHQaAFaiQAC7UCAQF/AkACQAJAIAFBoMSF4wRHBEAgAUGgtOXCBUcNASACQaDEheMERwRAIAJBoLTlwgVHDQQgAyAEEEINAyAAQQEgACgCIEEDQQMgAyAEEMYBEOYBDQMMBAsgAyAEEEJFBEAgAEEBIAAoAiBBA0EDIAMgBBDGARDmAUUNBAsgAEEBIAAoAiAQ2wEQ5gENAgwDCyACQaDEheMERwRAIAJBoLTlwgVHDQMgAEEBIAAoAiAQ0gEQ5gFFDQMgAyAEEEINAiAAQQEgACgCIEEDQQMgAyAEEMYBEOYBDQIMAwsgAyAEEEINASAAQQEgACgCIBDSARDmAUUNAiAAQQEgACgCIEEDQQMgAyAEEMYBEOYBRQ0CIABBASAAKAIgENsBEOYBDQEMAgsgASACRw0BC0EBIQULIAULjgQCA38GfCMAQYACayIBJAAgAUHQAGoiAiAAQcgAEOIEGiACIAFBCGoiABDtAQR8IAFB6LEDKwMAOQPQASABQfCxAysDADkD2AEgAUH4sQMrAwA5A+ABIAFB6AFqIAAgAUHQAWoQ7wEgASABKwPoATkDuAEgASABKwPwATkDwAEgASABKwP4ATkDyAEgAUGgAWoiACABQbgBahCdAwJ/IAFBmAFqIQMCQCAABEAgA0UNASAAKwMAIgQgBKAgACsDCCIFRAAAAAAAABhAoiAEoUQAAAAAAAD4P6AiBKMiCERcrKjBNAzHv6BEY3rCEg8ozz+iIAVEAAAAAAAACECiIASjIglEBOJ1/YLd0L+goESssQpGmHfwP6MhBEEBIQBEAAAAAAAAAAAhBQJAA0AgAEEFdCICQdC8AWorAwAhByAEIAkgAkHgvAFqKwMAoSACQei8AWorAwAiBiAIIAJB2LwBaisDAKGioSAGIAaiRAAAAAAAAPA/oJ+jIgajRAAAAAAAAAAAYw0BIAYhBCAHIQUgAEEBaiIAQR9HDQALQQAMAwsgA0QAAAAAgIQuQSAEIAQgBqGjIAcgBaGiIAWgozkDAEEBDAILQec2QY0nQZYBQYgNEAAAC0H7OkGNJ0GXAUGIDRAAAAshACABKwOYAUQAAAAAAADwvyAAGwVEAAAAAAAAAAALIAFBgAJqJAALzAEBAX8jAEHQAGsiAiQAAn9BASAAIAFyRQ0AGiAARQRAQQAgAQ0BGgsgAkEIahDqASAAKwMAIAIrAwihmSAAKwMIIAIrAxChmaAgACsDECACKwMYoZmgIAArAxggAisDIKGZoCAAKwMgIAIrAyihmaAgACsDKCACKwMwoZmgIAArAzAgAisDOKGZoCAAKwM4IAIrA0ChmaAgACsDQCACKwNIoZmgIAErAwCZoCABKwMImaAgASsDEJmgRPyp8dJNYmA/YwsgAkHQAGokAAuMBQEHfyMAQZAIayIIJAACQCABQYACa0GBfkkNACABQQFHBEAgAUH+AXEhDQNAIAIgB0ECdCILaigCACIKQQprIgxBBU0EQCAMQQJ0QaDIAGooAgAhCgsgCCALaiAKNgIAIAIgB0EBckECdCILaigCACIKQQprIgxBBU0EQCAMQQJ0QaDIAGooAgAhCgsgCCALaiAKNgIAIAdBAmohByAJQQJqIgkgDUcNAAsLIAFBAXEEQCACIAdBAnQiCWooAgAiB0EKayICQQVNBEAgAkECdEGgyABqKAIAIQcLIAggCWogBzYCAAsgASEHA0ACQCADIAciCUEBayIHQQJ0aigCACICKAI8QevcpeMGRw0AIAIoAkAiCkHLsrWaBEcNACAHQQJJDQAgCkHLsrWaBEYNAQsLAkAgAygCACgCQEHLsrWaBEYEQCACKAJAQcuytZoERg0BIAIoAjxB8ujJgwdGDQELIAAgASAIIAMgBCAFIAYQPiEHDAELAkAgAEEEQQQQ3gEiBwRAIAhCADcDiAggCCAAIAkgCCADIAQgBSAGED4iAjYCiAgCQCACRQ0AIAggACAJIAggAyAEIAUgBhBrIgI2AowIAkAgAkUNACAAQcuytZoEIAYQpgNBBEEEQQAQzgEiAEUNACAHQQAgABDmAUUNACAAQSIgCEGICGoQ0QFFDQAgASAJTQ0DA0AgAyAJQQJ0IgBqKAIAIAAgCGooAgAQuAEiAEUNASAHIAAQ6AFFDQEgASAJQQFqIglHDQALDAMLIAgoAogIIgBFDQAgABDjAQsgCCgCjAgiAARAIAAQYAsgBxDjAQtBACEHDAELIAgoAogIEOMBIAgoAowIEGALIAhBkAhqJAAgBwtUAAJAIAAvAQANACAALwECDQAgAC8BBA0AIAFBADsBBCABQQA2AQAgASACKAIEIAAvAQYQaTsBBkEBDwsgACABIAIoAgAiACgCDCAAKAIQEQUAQQEL+AoCDH8BfCMAQbAIayIHJAACQCABQYACa0GBfkkNACABQQFHBEAgAUH+AXEhCwNAIAIgCUECdCIKaigCACIIQQprIg5BBU0EQCAOQQJ0QaDIAGooAgAhCAsgByAKaiAINgIAIAIgCUEBckECdCIKaigCACIIQQprIg5BBU0EQCAOQQJ0QaDIAGooAgAhCAsgByAKaiAINgIAIAlBAmohCSANQQJqIg0gC0cNAAsLIAFBAXEEQCACIAlBAnQiDWooAgAiCUEKayICQQVNBEAgAkECdEGgyABqKAIAIQkLIAcgDWogCTYCAAsgASEJA0ACQCADIAkiDUEBayIJQQJ0aigCACIMKAI8QevcpeMGRw0AIAwoAkAiAkHLsrWaBEcNACAJQQJJDQAgAkHLsrWaBEYNAQsLAkAgAygCACgCQEHLsrWaBEYEQCAMKAJAQcuytZoERg0BIAwoAjxB8ujJgwdGDQELIAAgASAHIAMgBCAFIAYQPiEJDAELIABBBEEEEN4BIglFBEBBACEJDAELIAdBqAhqQgA3AwAgB0GgCGpCADcDACAHQZgIakIANwMAIAdBkAhqIgJCADcDACAHQYgIakIANwMAIAdCADcDgAggAiAMQQEQtQEiAjYCAAJAIAIEfyMAQZABayICJAAgDAR/IAwoAgQFQQALIQgCQCAMKAI8QfLoyYMHRw0AIAxBBEEBEKECIgtFDQAgAkEANgJMIAIgC0EDdkEPcTYCRCAIQQAQyQQiCkUNACACIAggCkGagCggDCALQQBBwAIQ3gQiCDYCSCAKEKwBGiAIRQ0AIAJBygA2AgggAkKGgICAoAk3AwAgAkHEAGohEkEAIQgjAEEgayIRJAACQCACBEBBASEPIAJBBGshDkEDIQsMAQtBjThB3SZB0QNBrR4QAAALAkADQCAOIAtBAnRqKAIAIgpBAkkNASAKrSAKIA9sIg+tfkIgiKcNASALQQFrIgsNAAsgD0GSosSIAWtB7927935JDQBBACEKA0AgCiEIQQMhCwNAAn9BACAIIAggAiALIg5BAWsiC0ECdGooAgAiEG4iCCAQbGu4RAAAAADg/+9AoiAQQQFruKNEAAAAAAAA4D+gIhNEAAAAAAAAAABlDQAaQf//AyATRAAAAADg/+9AZg0AGiATRAAAAADA/9/AoEQAAAAAAAA4QqC9QhCIp0H//wFqCyEQIBEgC0EBdGogEDsBACAOQQFKDQALQQAhCCARQQAgEhBuRQ0BQQEhCCAKQQFqIgogD0cNAAsLIBFBIGokACAIRQRAIAJBADYCTAsgAigCSBDQBCACKgJMuyETCyACQZABaiQAIAcgE0QAAAAAAABZQKMiEzkDqAgCQCATRAAAAAAAAAAAZQ0AIAcgACANIAcgAyAEIAUgBhA+IgI2AoAIIAJFDQIgByAAIA0gByADIAQgBSAGEGsiAjYCjAggAkUNACAHIAAgDEEiIABBABDJBCICQZiAqAJBAUHAAhDeBCIENgKECCAERQ0AIAcgACAMQaSAgAIgAkGcgIACQQFBwAIQ3gQiBDYCiAggBEUNACACEKwBGiAHQgA3A5gIIABBy7K1mgQgBhCmA0EEQQRBABDOASIARQ0AIAlBACAAEOYBRQ0AIABBIyAHQYAIahDRARogASANTQ0AA0AgAyANQQJ0IgBqKAIAIAAgB2ooAgAQuAEiAEUNASAJIAAQ6AFFDQEgDUEBaiINIAFHDQALCyAHKAKACAVBAAsiAEUNACAAEOMBCyAHKAKICCIABEAgABDQBAsgBygChAgiAARAIAAQ0AQLIAcoAowIIgAEQCAAEGALIAcoApAIIgBFDQAgABDjAQsgB0GwCGokACAJC+0SAwh/A30IfCMAQeAAayIEJAAgBCAALwEAuEQAAAAA4P/vQKO2OAJQIAQgAC8BArhEAAAAAOD/70CjtjgCVCAEIAAvAQS4RAAAAADg/+9Ao7Y4AlggBCAALwEGuEQAAAAA4P/vQKO2Igs4AlwgBCACKAIMIAsQZCILOAI8AkACQCAALwEADQAgAC8BAg0AIAAvAQQNACABQQA7AQQgAUEANgEAIAECf0EAIAu7RAAAAADg/+9AokQAAAAAAADgP6AiDkQAAAAAAAAAAGUNABpB//8DIA5EAAAAAOD/70BmDQAaIA5EAAAAAMD/38CgRAAAAAAAADhCoL1CEIinQf//AWoLOwEGDAELIARB0ABqIARBQGsgAigCABDkAUEAIQAgAQJ/QQAgBCoCQLtEAAAAAOD/70CiRAAAAAAAAOA/oCIORAAAAAAAAAAAZQ0AGkH//wMgDkQAAAAA4P/vQGYNABogDkQAAAAAwP/fwKBEAAAAAAAAOEKgvUIQiKdB//8Bags7AQACQCAEKgJEu0QAAAAA4P/vQKJEAAAAAAAA4D+gIg5EAAAAAAAAAABlDQBB//8DIQAgDkQAAAAA4P/vQGYNACAORAAAAADA/9/AoEQAAAAAAAA4QqC9QhCIp0H//wFqIQALIAEgADsBAkEAIQAgAQJ/QQAgBCoCSLtEAAAAAOD/70CiRAAAAAAAAOA/oCIORAAAAAAAAAAAZQ0AGkH//wMgDkQAAAAA4P/vQGYNABogDkQAAAAAwP/fwKBEAAAAAAAAOEKgvUIQiKdB//8Bags7AQQCQCAEKgJMIgy7RAAAAADg/+9AokQAAAAAAADgP6AiDkQAAAAAAAAAAGUNAEH//wMhACAORAAAAADg/+9AZg0AIA5EAAAAAMD/38CgRAAAAAAAADhCoL1CEIinQf//AWohAAsgASAAOwEGIAwgC5OLu0QYABgAGAAIP2MNACACKAIEIAEgBEEYakEBENEEIAIoAgggBEFAayIAIARBMGoiBkEBENEEIAIoAhAhBSMAQcABayIDJAACQCAFKAIEIghBA2tBAUsNACAFKAIIQQNHDQACQCAABEAgAyAAKQIANwOgASADIAAoAgg2AqgBDAELIANBmrPm9AM2AqgBIANCmrPm9KOz5sw+NwOgAQsgAyAIQQRGBH0gBioCDAVDAAAAAAs4AqwBRECMtXgdrxVEIQ5BACEIA0AgA0GgAWoiCSADQbABaiAFIAUoAhQRBQBBASEHIA4gBioCCCADKgK4AZMiCyALlCAGKgIEIAMqArQBkyILIAuUIAYqAgAgAyoCsAGTIgsgC5RDAAAAAJKSkpEiC7siD2UNASAFKAIEIgoEQCAAIAkgCkECdBDiBBoLIAtDAAAAAF8NASADIAMqAqQBOAKUASADIAMpA6gBNwOYASADIAMqAqABIgtDbxKDOkNvEoO6IAu7RAAAENnO9+8/YxuSOAKQASADQZABaiIHIANBgAFqIgkgBSAFKAIUEQUAIAMgAyoCoAE4ApABIAMgAykDqAE3A5gBIAMgAyoCgAEgAyoCsAGTQ28SgzqVuzkDCCADIAMqAoQBIAMqArQBk0NvEoM6lbs5AyAgAyADKgKIASADKgK4AZNDbxKDOpW7OQM4IAMgAyoCpAEiC0NvEoM6Q28Sg7ogC7tEAAAQ2c737z9jG5I4ApQBIAcgCSAFIAUoAhQRBQAgAyADKQOgATcDkAEgAyADKgKsATgCnAEgAyADKgKAASADKgKwAZNDbxKDOpW7OQMQIAMgAyoChAEgAyoCtAGTQ28SgzqVuzkDKCADIAMqAogBIAMqArgBk0NvEoM6lbs5A0AgAyADKgKoASILQ28SgzpDbxKDuiALu0QAABDZzvfvP2MbkjgCmAEgByAJIAUgBSgCFBEFACADIAMqAoABIAMqArABIguTQ28SgzqVuzkDGCADIAMqAoQBIAMqArQBIgyTQ28SgzqVuzkDMCADIAMqAogBIAMqArgBIg2TQ28SgzqVuzkDSCADIAsgBioCAJO7OQNQIAMgDCAGKgIEk7s5A1ggAyANIAYqAgiTuzkDYCADQegAaiADQQhqIANB0ABqEO4BRQRAQQAhBwwCCyADIAMqAqABIAMrA2i2kyILOAKgASADIAMqAqQBIAMrA3C2kyIMOAKkASADIAMqAqgBIAMrA3i2kyINOAKoAQJAIAtDAAAAAF0EQCADQQA2AqABDAELIAtDAACAP15FDQAgA0GAgID8AzYCoAELQwAAAAAhCwJAIAxDAAAAAF1FBEBDAACAPyELIAxDAACAP15FDQELIAMgCzgCpAELQwAAAAAhCwJAIA1DAAAAAF1FBEBDAACAPyELIA1DAACAP15FDQELIAMgCzgCqAELQQEhByAPIQ4gCEEBaiIIQR5HDQALCyADQcABaiQAIAdFDQAgBCAEKgI8Igs4AkxEAAAAAAAA8D8hDgJAIAQqAkC7Ig8gBCoCRLsiEKAgBCoCSLsiEaAiEiALuyIToCIUIAIrAygiFWRFDQBEAAAAAAAA8D8gFCAVoSASo6EiDkQAAAAAAAAAAGNFDQBEAAAAAAAAAAAhDgtBACEAIAECf0EAIA4gD6JEAAAAAOD/70CiRAAAAAAAAOA/oCIPRAAAAAAAAAAAZQ0AGkH//wMgD0QAAAAA4P/vQGYNABogD0QAAAAAwP/fwKBEAAAAAAAAOEKgvUIQiKdB//8Bags7AQACQCAOIBCiRAAAAADg/+9AokQAAAAAAADgP6AiD0QAAAAAAAAAAGUNAEH//wMhACAPRAAAAADg/+9AZg0AIA9EAAAAAMD/38CgRAAAAAAAADhCoL1CEIinQf//AWohAAsgASAAOwECQQAhACABAn9BACAOIBGiRAAAAADg/+9AokQAAAAAAADgP6AiDkQAAAAAAAAAAGUNABpB//8DIA5EAAAAAOD/70BmDQAaIA5EAAAAAMD/38CgRAAAAAAAADhCoL1CEIinQf//AWoLOwEEAkAgE0QAAAAA4P/vQKJEAAAAAAAA4D+gIg5EAAAAAAAAAABlDQBB//8DIQAgDkQAAAAA4P/vQGYNACAORAAAAADA/9/AoEQAAAAAAAA4QqC9QhCIp0H//wFqIQALIAEgADsBBiACKAIEIAEgBEEBENEEIARBGGogBBClAyIOIAIrAxhkRQ0AIAIgDjkDGAsgBEHgAGokAEEBCyEAQQAhACABQYGAgIACa0GAgICAfk8EfyABEI8FBUEACwskACAAIAEgAEEEEL4DKAIAEQMAIgAEQCAAQQAgARDkBBoLIAALDAAgAQRAIAEQkAULCxwAQQAhACACQYCAgIACTQR/IAEgAhCRBQVBAAsLSQECfwJAIAEgAmwiA0UNAEF/IAJuIAFNDQAgA0GAgICAAksNACABIANLDQAgAiADSw0AIAAgAyAAQQQQvgMoAgQRAwAhBAsgBAs7AQF/AkAgAkGAgICAAksNACAAIAIgAEEEEL4DKAIAEQMAIQMgAUUNACADRQ0AIAMgASACEOMEGgsgAwsTACAAIAEgAEEEEL4DKAIAEQMACxMAIAAgASAAQQQQvgMoAgQRAwALFQAgACABIAIgAEEEEL4DKAIQEQQACxUAIAAgASACIABBBBC+AygCDBEEAAsYACABBEAgACABIABBBBC+AygCCBEAAAsLFQAgACABIAIgAEEEEL4DKAIUEQQACwIAC0UBAX8jAEGQCGsiBCQAIAQgAzYCjAggBEH/ByACIAMQiwUaIABBARC+AygCACICBEAgACABIAQgAhEFAAsgBEGQCGokAAsvACAAQQA6AAQgACABQRh0IAFBgP4DcUEIdHIgAUEIdkGA/gNxIAFBGHZycjYAAAsTACAAQRggAEEEEL4DKAIAEQMACwQAQQELAgALHgEBfyAAQQ4QvgMoAgAiAUUEQEEADwsgACABEQIACyABAX8gAEEOEL4DKAIIIgJFBEBBAQ8LIAAgASACEQMACxwBAX8gAEEOEL4DKAIMIgIEQCAAIAEgAhEAAAsLoQcBCH8gAUH7/wNPBEAgAEECQfgRQQAQVEEADwsgASACckUEQCAAQQJBziJBABBUQQAPCyAAQRwQTiIFBEACQAJAAkAgAkUEQCAFQQA2AhAgBUEANgIIDAELIAUgACACQegAEE8iBjYCCCAGRQ0BIAUgACACQQQQTyIGNgIQIAZFDQELIAUgAjYCBAJAAkAgAUUEQCAFQgA3AhQMAQsgBSAAIAFBAhBPIgc2AhggB0UNASAFIAE2AhQgBEUNAEEAIQYgAUEETwRAIAFB/P8DcSEMA0AgByAGQQF0IghqIAQgCGovAQA7AQAgByAIQQJyIgtqIAQgC2ovAQA7AQAgByAIQQRyIgtqIAQgC2ovAQA7AQAgByAIQQZyIghqIAQgCGovAQA7AQAgBkEEaiEGIApBBGoiCiAMRw0ACwsgAUEDcSIIRQ0AA0AgByAGQQF0IgpqIAQgCmovAQA7AQAgBkEBaiEGIAlBAWoiCSAIRw0ACwsCQCACRQ0AIANFDQAgBSAAIAJBBBBPIgE2AgwgAUUNAkEAIQkDQCADIAlB6ABsIgRqIgEoAghFBEAgACABKAJgQQBBARCVASEGIAUoAgwgCUECdGogBjYCAAsgBSgCCCAEaiABQegAEOMEGgJAAkAgASgCCCIGDQAgASgCZCIHRQ0AIAAgByABKAJgQQJ0EFIhBiAFKAIIIARqIAY2AmQgASgCCCEGDAELIAUoAgggBGpBADYCZAsgBiAGQR91IgFzIAFrIQYCQAJAIABBBhC+AygCACIBBEADQCABKAIAIgdBAEoEQCABQQRqIQhBACEEA0AgBiAIIARBAnRqKAIARg0EIARBAWoiBCAHRw0ACwsgASgCqAEiAQ0ACwtBuMgAIQEgBkEBa0EISQ0AIAZB7ABrQQFLDQELIAUoAhAgCUECdGogASgCpAE2AgALIAlBAWoiCSACRw0ACyAFKAIYIQcgBSgCFCEBCyAFIAAgASAHQQAQlQEiATYCACABRQ0AIAUPCyACRQ0BC0EAIQQDQAJAIAUoAggiAUUNACABIARB6ABsaigCZCIBRQ0AIAAgARBRCwJAIAUoAgwiAUUNACABIARBAnRqKAIAIgFFDQAgACABEFELIARBAWoiBCACRw0ACwsgBSgCDCIBBEAgACABEFELIAUoAggiAQRAIAAgARBRCyAFKAIQIgEEQCAAIAEQUQsgBSgCGCIBBEAgACABEFELIAAgBRBRC0EAC7AFAwZ/A3wCfSMAQRBrIgYkACACBEBBgCAhAwJAIAFBAUcNACACKAIIQQFHDQBBAkGAICACKwMQRAAAAAAAAPC/oJlE/Knx0k1iUD9jGyEDCwJAIAAgAyABIAJBABBcIgFFDQACQCABKAIEIgJBAEoEQCADQQFruCELDAELIAEoAhghBUEAIQBBACECIANBCE8EQCADQYAgcSEHA0AgBSACQQF0aiIIQgA3AQAgCEIANwEIIAJBCGohAiAEQQhqIgQgB0cNAAsLIANBAnEiA0UNAQNAIAUgAkEBdGpBADsBACACQQFqIQIgAEEBaiIAIANHDQALDAELA0ACfEQAAAAAz/CAxCACQQBMDQAaIAW4IAujIQkgASgCCCEHA0ACQCAJIAcgAkEBayIAQegAbGoiBCoCACIMuyIKZEUNACAJIAQqAgQiDbtlRQ0AAnwgBCgCCCICRQRAIAYgCSAKobYgDSAMk5U4AgggASgCDCAAQQJ0aiIAKAIAIAQoAmQ2AsQBIAZBCGogBkEMaiAAKAIAIgAgACgCyAERBQAgBioCDLsMAQsgAiAEQRBqIAkgASgCECAAQQJ0aigCABERAAshCkQAAAAAz/CARCAKvUL///////////8Ag0KAgICAgICA+P8AUSIADQIaRAAAAADP8IDEIAogABsMAgsgAkEBSyAAIQINAAtEAAAAAM/wgMQLIQkgASgCGCAFQQF0agJ/QQAgCUQAAAAA4P/vQKJEAAAAAAAA4D+gIglEAAAAAAAAAABlDQAaQf//AyAJRAAAAADg/+9AZg0AGiAJRAAAAADA/9/AoEQAAAAAAAA4QqC9QhCIp0H//wFqCzsBACAFQQFqIgUgA0YNASABKAIEIQIMAAsACyAGQRBqJAAgAQ8LQfQ3QZAoQaUGQfgeEAAAC/YBAgJ/AX0jAEHAAmsiAyQAAkAgAUUNACACRQ0AIANCADcDICADQgA3AxggA0KAgICAgICA+D83AxAgA0EGNgIIIANC+IyeoA43AwAgAioCACEFIANCADcD8AEgA0IANwPoASADQoCAgICAgID4PzcD4AEgA0EGNgLYASADQoCAgPyDz+GD5AA3A9ABIAMgAjYCzAEgA0EANgJwIANCgICAgICAgMA/NwNoIANCADcDMCADIAW7OQMoIAMgATYCyAEgAiABQQJ0akEEayoCACEFIANCADcDgAIgAyAFuzkD+AEgAEEDIAMQXSEECyADQcACaiQAIAQL+AIBBn8jAEHwAGsiBCQAIAEgAUEfdSIDcyADayEGAkACfwJAAkACQCAAQQYQvgMoAgAiBQRAA0AgBSgCACIHQQBKBEAgBUEEaiEIQQAhAwNAIAYgCCADQQJ0aigCAEYNBCADQQFqIgMgB0cNAAsLIAUoAqgBIgUNAAsLQbjIACEFQQAhAwJAAkACQAJAAkACQAJAAkACQAJAIAZBAWsOCAoBAgMEBQYHAAsgBkHsAGsOAgcICgtBASEDDAgLQQIhAwwHC0EDIQMMBgtBBCEDDAULQQUhAwwEC0EGIQMMAwtBByEDDAILQQghAwwBC0EJIQMLIAINAQwDCyACRQ0CIAQgATYCACAAQQhBoSYgBBBUQQAMAQsgBEEQakEAQeAAEOQEGiAEIAE2AhAgBEL4jJ6gjs/hg+QANwMIIARBGGogAiAFIANBAnRqKAJUQQN0EOIEGiAAQQEgBEEIahBdCyAEQfAAaiQADwtBojhBkChB9wZBkx8QAAALrwEBA38gAARAIAAoAgAiASgCACECIAEQlgEgACgCGCIBBEAgAiABEFELIAAoAggiAQRAIAIgACgCBAR/QQAhAQNAIAAoAgggAUHoAGxqKAJkIgMEQCACIAMQUQsgACgCDCABQQJ0aigCACIDBEAgAxCWAQsgAUEBaiIBIAAoAgRJDQALIAAoAggFIAELEFEgAiAAKAIMEFELIAAoAhAiAQRAIAIgARBRCyACIAAQUQsLUQEBfyAABEAgACgCACIBBEAgARBgCyAAKAIEIgEEQCABEGALIAAoAggiAQRAIAEQYAsgAEEANgIIIABCADcCAA8LQYg5QZAoQb0HQeAgEAAACykAIABFBEBBAA8LIAAoAgAoAgAgACgCFCAAKAIEIAAoAgggACgCGBBcC/QHAgh8C38CfwJAAkAgAARAAkAgACgCBEEBRw0AIAAoAggoAggiDEEATA0AAkAgACgCACgCAEEGEL4DKAIAIgoEQANAIAooAgAiC0EASgRAIApBBGohDkEAIQkDQCAMIA4gCUECdGooAgBGDQQgCUEBaiIJIAtHDQALCyAKKAKoASIKDQALCyAMQQFrQQhJDQAgDEHsAGtBAUsNAQsgACgCACgCAEEAIAAoAggiACgCCGsgAEEQahBfDwtBACAAKAIAKAIAQYAgQQBBAEEAEFwiD0UNAxogACgCACgCTCIMRQ0BIAAoAhgiDSAMQQF0aiEQIAAoAhQiAEEBa7ghAyAPKAIYIREgDEEATCESIA0vAQAgDSAAQQF0akECay8BAEshE0EAIQADQCAAt0QAAAAA4P/vQKJEAAAAAAD+r0CjIQEgESAAQQF0agJ/AkACQCANLwEAIgsgEC8BACIKTwRAQQAhCiAMQQBMDQIDQAJAIAsiDiANIAoiCUEBaiIKQQF0ai8BACILTQRAIAEgDrhmRQ0BIAEgC7hlRQ0BDAQLIAEgDrhlRQ0AIAEgC7hmDQMLIAogDEcNAAsMAgsgDCEJIBINAQNAIAohCwJAIAsgDSAJIg5BAWsiCUEBdGovAQAiCk8EQCABIAu4ZUUNASABIAq4Zg0DDAELIAEgC7hmRQ0AIAEgCrhlDQILIA5BAUsNAAsMAQsgCUEASA0AIAm3RAAAAADg/+9AoiADoyEEIAlBAWoiCrdEAAAAAOD/70CiIAOjIQIgDSAJQQF0ai8BALgiBiANIApBAXRqLwEAuCIFYQRAQQAgBCACIBMbRAAAAAAAAOA/oCIBRAAAAAAAAAAAZQ0CGkH//wMgAUQAAAAA4P/vQGYNAhogAUQAAAAAwP/fwKBEAAAAAAAAOEKgvUIQiKdB//8BagwCCyACIAIgBKEgBSAGoaMiByAFoqEhCAtBACAHIAGiIAigRAAAAAAAAOA/oCIBRAAAAAAAAAAAZQ0AGkH//wMgAUQAAAAA4P/vQGYNABogAUQAAAAAwP/fwKBEAAAAAAAAOEKgvUIQiKdB//8Bags7AQAgAEEBaiIAQYAgRw0ACwwCC0HwOEGQKEG1CEGCCxAAAAsgDygCGCEAQQAhCQNAIAAgCUEBdGoCf0EAIAm3RAAAAADg/+9AokQAAAAAAP6vQKNEAAAAAAAAAACiRAAAAAAAAAAAoEQAAAAAAADgP6AiAUQAAAAAAAAAAGUNABpB//8DIAFEAAAAAOD/70BmDQAaIAFEAAAAAMD/38CgRAAAAAAAADhCoL1CEIinQf//AWoLOwEAIAlBAWoiCUGAIEcNAAsLIA8LC9sDAwV/AnwCfSMAQRBrIgIkACAABEAgAbshCAJAIAAoAgQiA0UEQCACAn9BACAIRAAAAADg/+9AokQAAAAAAADgP6AiB0QAAAAAAAAAAGUNABpB//8DIAdEAAAAAOD/70BmDQAaIAdEAAAAAMD/38CgRAAAAAAAADhCoL1CEIinQf//AWoLOwEGIAJBBmogAkEEaiAAKAIAIgAgACgCyAERBQAgAi8BBLhEAAAAAOD/70CjIQcMAQtEAAAAAM/wgMQhByADQQBMDQAgACgCCCEGA0ACQCAGIANBAWsiBUHoAGxqIgQqAgAiCSABXUUNACAEKgIEIgogAWBFDQBEAAAAAM/wgEQhBwJ8IAQoAggiA0UEQCACIAEgCZMgCiAJk5U4AgggACgCDCAFQQJ0aiIAKAIAIAYgBUHoAGxqKAJkNgLEASACQQhqIAJBDGogACgCACIAIAAoAsgBEQUAIAIqAgy7DAELIAMgBEEQaiAIIAAoAhAgBUECdGooAgAREQALIgi9Qv///////////wCDQoCAgICAgID4/wBRIgANAkQAAAAAz/CAxCAIIAAbIQcMAgsgA0EBSyAFIQMNAAsLIAJBEGokACAHtg8LQYg5QZAoQYsLQboOEAAACxsAIABFBEBBqzpBkChB8whB5B4QAAALIAAQYwveAQIDfwF8AkAgAARAIAAoAhQiAUEATARAQQEPCwwBC0GIOUGQKEG1CkGlFhAAAAsCQANAIAAoAhggAkEBdGovAQACf0EAIAK3RAAAAADg/+9AoiABQQFruKNEAAAAAAAA4D+gIgREAAAAAAAAAABlDQAaQf//AyAERAAAAADg/+9AZg0AGiAERAAAAADA/9/AoEQAAAAAAAA4QqC9QhCIp0H//wFqC0H//wNxayIBIAFBH3UiAXMgAWtBEEkEQEEBIQMgAkEBaiICIAAoAhQiAUgNAQwCCwtBACEDCyADC8UBAQV/IAAEQEEBIQICQCAAKAIUIgFBAkkNAAJAIAAoAhgiBS8BACIDIAUgAUEBdGpBAmsvAQAiBEsEQCABQQJIDQJBASEAA0AgBSAAQQF0ai8BACIEIANrQQJKDQIgBCEDIAEgAEEBaiIARw0ACwwCCyABQQJIDQEgAUECayEAA0AgBSAAQQF0ai8BACIDIARrQQNODQEgAEEATCADIQQgAEEBayEARQ0ACwwBC0EAIQILIAIPC0HHN0GQKEHICkHFJhAAAAsvAQF/IAAEQCAAKAIEQQFGBH8gACgCCCgCCAVBAAsPC0HHN0GQKEGCC0G2IBAAAAtPAQF/IwBBEGsiAiQAIAIgATsBDiAARQRAQYg5QZAoQaALQbcvEAAACyACQQ5qIAJBDGogACgCACIAIAAoAsgBEQUAIAIvAQwgAkEQaiQAC5ATAwZ8AX4CfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQe0Aag52FBIVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUQDgwKCAYEAhUBAwUHCQsNDwALIABB7ABrDgIQEhQLIAErAwAhAyACRAAAAAAAAAAAYw0VIAIgAxD5BA8LIAErAwAhAyACRAAAAAAAAAAAYw0URAAAAADP8IBEIQUgA5lELUMc6+I2Gj9jDRIgAkQAAAAAAADwPyADoxD5BA8LIAErAwgiA5lELUMc6+I2Gj9jDREgASsDECIEmiADoyACZUUNESADIAKiIASgIgJEAAAAAAAAAABkRQ0RIAIgASsDABD5BA8LIAErAwAiA5lELUMc6+I2Gj9jDRAgAkQAAAAAAAAAAGMNECABKwMIIgSZRC1DHOviNho/Yw0QIAErAxAhBSACRAAAAAAAAPA/IAOjEPkEIAWhIASjIgVEAAAAAAAAAABjRQ0QRAAAAAAAAAAADwsgASsDCCIDmUQtQxzr4jYaP2MNDyACRAAAAAAAAAAAIAErAxAiBJogA6MiBiAGRAAAAAAAAAAAYxtmBEAgAyACoiAEoCICRAAAAAAAAAAAZEUNECABKwMYIAIgASsDABD5BKAPCyABKwMYDwsgASsDACIEmUQtQxzr4jYaP2MNDiABKwMIIgOZRC1DHOviNho/Yw0OIAIgASsDGCIGZgRAIAIgBqEiAkQAAAAAAAAAAGRFDQ8gASsDECEFIAJEAAAAAAAA8D8gBKMQ+QQgBaEgA6MPCyABKwMQmiADow8LIAIgASsDIGYEQCABKwMIIAKiIAErAxCgIgJEAAAAAAAAAABkRQ0OIAIgASsDABD5BA8LIAErAxggAqIPCyABKwMIIgMgASsDIKIgASsDECIEoCIGRAAAAAAAAAAAYwR8RAAAAAAAAAAABSAGIAErAwAQ+QQLIAJlBEAgASsDACIGmUQtQxzr4jYaP2MNDSADmUQtQxzr4jYaP2MNDSACRAAAAAAAAPA/IAajEPkEIAShIAOjDwsgASsDGCIDmUQtQxzr4jYaP2MNDCACIAOjDwsgAiABKwMgZgRAIAErAwggAqIgASsDEKAiAkQAAAAAAAAAAGQEQCABKwMoIAIgASsDABD5BKAPCyABKwMoDwsgAiABKwMYoiABKwMwoA8LIAIgASsDGCIDIAErAyCiIAErAzAiBKBmBEAgAiABKwMooSICRAAAAAAAAAAAYw0LIAErAwAiA5lELUMc6+I2Gj9jDQsgASsDCCIEmUQtQxzr4jYaP2MNCwwMCyADmUQtQxzr4jYaP2MNCiACIAShIAOjDwsgASsDCCACoiABKwMQoCECIAErAwAiA0QAAAAAAADwP2EEQCACIAErAxigDwsgAkQAAAAAAAAAAGMEQCABKwMYDwsgASsDGCACIAMQ+QSgDwsgASsDACIDmUQtQxzr4jYaP2MNCCABKwMIIgSZRC1DHOviNho/Yw0IIAIgASsDGKEiAkQAAAAAAAAAAGMNCAwJCyABKwMQIAIgASsDABD5BKIgASsDGKAiAkQAAAAAAAAAAGUEQCABKwMgDwsgASsDCAJ8AkACQAJAAkAgAr0iCUIAWQRAIAlCIIinIgBB//8/Sw0BC0QAAAAAAADwvyACIAKioyACvUL///////////8Ag1ANBBogCUIAWQ0BIAIgAqFEAAAAAAAAAACjDAQLIABB//+//wdLDQJBgIDA/wMhCkGBeCELIABBgIDA/wNHBEAgACEKDAILIAmnDQFEAAAAAAAAAAAMAwsgAkQAAAAAAABQQ6K9IglCIIinIQpBy3chCwsgCyAKQeK+JWoiAEEUdmq3IgdEAGCfUBNE0z+iIgMgCUL/////D4MgAEH//z9xQZ7Bmv8Daq1CIIaEv0QAAAAAAADwv6AiAiACIAJEAAAAAAAA4D+ioiIFob1CgICAgHCDvyIERAAAIBV7y9s/oiIGoCIIIAYgAyAIoaAgAiACRAAAAAAAAABAoKMiAyAFIAMgA6IiBiAGoiIDIAMgA0SfxnjQCZrDP6JEr3iOHcVxzD+gokQE+peZmZnZP6CiIAYgAyADIANERFI+3xLxwj+iRN4Dy5ZkRsc/oKJEWZMilCRJ0j+gokSTVVVVVVXlP6CioKCiIAIgBKEgBaGgIgJEAAAgFXvL2z+iIAdENivxEfP+WT2iIAIgBKBE1a2ayjiUuz2ioKCgoCECCyACC6IgASsDIKAPCyABKwMAIgOZRC1DHOviNho/Yw0GIAErAwgiBJlELUMc6+I2Gj9jDQYgASsDECIGmUQtQxzr4jYaP2MNBiABKwMYIQVEAAAAAAAAJEAgAiABKwMgoSAEoxD5BCAFoSAGo0QAAAAAAADwPyADoxD5BA8LIAErAwAgASsDCCABKwMQIAKiIAErAxigEPkEoiABKwMgoA8LIAIgASsDIKEiAkQAAAAAAAAAAGMNBCABKwMAIgOZRC1DHOviNho/Yw0EIAErAxAiBJlELUMc6+I2Gj9jDQQgASsDCCEFIAIgA6MQ9wQgBRD3BKMgASsDGKEgBKMPCyABKwMAIgOZRC1DHOviNho/Yw0DRAAAAAAAAPA/RAAAAAAAAPA/IAKhRAAAAAAAAPA/IAOjIgIQ+QShIAIQ+QQPC0QAAAAAAADwP0QAAAAAAADwPyACIAErAwAiAhD5BKEgAhD5BKEPCyACIAKgRAAAAAAAAPC/oCABKwMAmiICohDlBCEDRAAAAAAAAOA/RAAAAAAAAPA/IAIQ5QREAAAAAAAA8D+go0QAAAAAAADgv6CjRAAAAAAAAPA/IANEAAAAAAAA8D+go0QAAAAAAADgv6CiRAAAAAAAAOA/oA8LRAAAAAAAAPA/RAAAAAAAAPA/IAJEAAAAAAAA4L+gRAAAAAAAAOA/RAAAAAAAAPA/IAErAwAiApoQ5QREAAAAAAAA8D+go0QAAAAAAADgv6Cjo0QAAAAAAADgP6CjRAAAAAAAAPC/oBD3BCACo6FEAAAAAAAA4D+iIQULIAUPCyABKwMQIQUgAkQAAAAAAADwPyADoxD5BCAFoSAEow8LIAJEAAAAAAAAAAAgA0QAAAAAAADwv6CZRC1DHOviNho/YxsLnQQCAX0CfwJAAkAgAygCACgCQEHLsrWaBEcNACADIAFBAWsiAUECdGoiCCgCACgCQEHLsrWaBEcNACAIKAIAKAI8QfLoyYMHRw0AIAAgASACIAMgBCAFIAYQbCIDRQ0AIABBASACIAFBAnQiCWogCCAEIAlqIAUgAUEDdGogBhBsIgUEQAJ/IwBBwAJrIgIkAAJAIAMiAQRAIAVFDQECQCAFEGMiBkUEQEEAIQMMAQsCQCAAQYAgQQQQTyIERQRAQQAhAwwBC0EAIQMDQCAEIANBAnRqIAYgASADs0MA8H9FlRBkEGQ4AgAgA0EBaiIDQYAgRw0ACyACQgA3AyAgAkIANwMYIAJCgICAgICAgPg/NwMQIAJBBjYCCCACQviMnqAONwMAIAQqAgAhByACQgA3A/ABIAJCADcD6AEgAkKAgICAgICA+D83A+ABIAJBBjYC2AEgAkKAgID8g8/hg+QANwPQASACIAQ2AswBIAJBADYCcCACQoCAgICAgIDAPzcDaCACQgA3AzAgAiAHuzkDKCACQYAgNgLIASAEQfz/AGoqAgAhByACQgA3A4ACIAIgB7s5A/gBIABBAyACEF0hAyAAIAQQUQsgBhBgCyACQcACaiQAIAMMAgtB6TpBkChB3wdB0x4QAAALQdc6QZAoQeAHQdMeEAAACyEDIAEQYCAFEGAgA0UNASADEGcNAgsgAxBgC0EAIQMLIAMLnwMBA38jAEGAKGsiByQAAkACQAJAIAFB/gFLDQAgAEEAEMkEIghFDQAgAQRAIAdBgCBqIAMgAUECdCIDEOIEGiAHQYAYaiAEIAMQ4gQaIAdBgAhqIAUgAUEDdBDiBBogByACIAMQ4gQaC0EAIQQgAUECdCICIAdBgBhqIgNqQQA2AgAgB0GAIGoiBSACaiAINgIAIAdBgAhqIgkgAUEDdGpCgICAgICAgPg/NwMAIAIgB2pBATYCACAAIAFBAWogBSADIAcgCUEAQQBBpICYAkGYgKgCIAYQ0gQhAiAIEKwBGiACRQ0CIABBgCBBBBBPIgNFDQFBACEBA0AgB0EANgKIICAHQgA3A4AgIAcgAbhEAAAAAAAAWUCiRAAAAAAA/q9Ao7Y4AowgIAIgB0GAIGogB0GACGpBARDRBCADIAFBAnRqRAAAAAAAAPA/IAcrA4AIRAAAAAAAAFlAo6G2OAIAIAFBAWoiAUGAIEcNAAsgAEGAICADEF4hBCACENAEIAAgAxBRDAILQQAhBAwBCyACENAECyAHQYAoaiQAIAQLyAICA38DfCMAQaABayIDJAAgAigCACAAIANBiAFqIgBBARDRBCACKAIEIAAgA0EgaiIEQQEQ0QQgAigCCCAEIANB8ABqIgRBARDRBCADIAMpA4ABNwNoIAMgAykDeDcDYCADIAMpA3A3A1ggAigCBCAEIANBARDRBCACKAIIIAMgA0FAayIFQQEQ0QQgACAEEKUDIQggA0HYAGogBRClAyEGQQAhAAJAIAIrAxAiByAIZCAGIAdjIgIgBiAHZHJxDQACQCAHIAhjRQ0AIAJFDQAgCCAHoUQAAAAAAADgP6BEAAAAAAAAOEKgvUIQiKchAAwBCyAIRAAAAAAAAPA/IAYgBkQAAAAAAAAAAGEboyIGIAdkRQ0AIAYgB6FEAAAAAAAA4D+gRAAAAAAAADhCoL1CEIinIQALIAEgADsBACADQaABaiQAQQELwwMCB38BfSMAQUBqIggkACACKAIEIAAgCEEBENEEAkAgAigCACIDBEAgA0EDcSEEAkAgA0EESQRAQQAhAQwBCyADQXxxIQlBACEBA0AgCiAIIAFBAnRqIgcqAgCSIAcqAgSSIAcqAgiSIAcqAgySIQogAUEEaiEBIAZBBGoiBiAJRw0ACwsgBARAA0AgCiAIIAFBAnRqKgIAkiEKIAFBAWohASAFQQFqIgUgBEcNAAsLIAogAioCCF5FDQEgAiAKOAIIIANFDQEgAkEMaiECQQAhBUEAIQEgA0EETwRAIANBfHEhB0EAIQYDQCACIAFBAnRqIAAgAUEBdGovAQCzOAIAIAIgAUEBciIEQQJ0aiAAIARBAXRqLwEAszgCACACIAFBAnIiBEECdGogACAEQQF0ai8BALM4AgAgAiABQQNyIgRBAnRqIAAgBEEBdGovAQCzOAIAIAFBBGohASAGQQRqIgYgB0cNAAsLIANBA3EiA0UNAQNAIAIgAUECdGogACABQQF0ai8BALM4AgAgAUEBaiEBIAVBAWoiBSADRw0ACwwBCyACKgIIQwAAAABdRQ0AIAJBADYCCAsgCEFAayQAQQELNwEBfyAAQQp2IgFBAnRB8IoBaigCACABQQF0QfCJAWovAQAgAEH/B3FqQQJ0QfDJAGooAgBqvgsyAQJ/IAC8IgFBF3YiAkEBdEHwjAFqLwEAIAFB////A3EgAkHwlAFqLQAAdmpB//8DcQvHAwEFfyMAQRBrIgMkACAAQQUQvgMhACABQQA2AsgBAkAgACgCACIABEAgA0EMaiABKAIIIAEoAgwgASgCBCAAEQkAIAEgAygCDCIANgLIASAADQELIAEoAgQhBCABKAIMIQUCQAJAIAEoAggiBkEESQ0AIAVB/wBNDQBBACEADAELIARBAXEhAkEAIQACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgBkEBaw4PAAECAwQFBgcICQoLDA0ODwsgBUEBRgRAQTVBNiACGyEADA8LQTdBOCACGyEADA4LQTlBOiACGyEADA0LIARBgAJxBEBBO0E8IAIbIQAMDQtBPUE+IAIbIQAMDAtBP0HAACACGyEADAsLQcEAQcIAIAIbIQAMCgtBwwBBxAAgAhshAAwJC0HFAEHGACACGyEADAgLQccAQcgAIAIbIQAMBwtByQBBygAgAhshAAwGC0HLAEHMACACGyEADAULQc0AQc4AIAIbIQAMBAtBzwBB0AAgAhshAAwDC0HRAEHSACACGyEADAILQdMAQdQAIAIbIQAMAQtB1QBB1gAgAhshAAsgASAANgLIAQsgA0EQaiQAIABBAEcL4gEDAn0BfwJ8IAIoAsQBIQUCQCABIAUCfwJAIAAqAgAiA0NfcIkwXQ0AIAO8Qf////8HcUGAgID8B0sNACADIgRDAACAP2BFDQAgAigCTAwBCyACKAJMIgANAUEAC0ECdGoqAgA4AgAPCwJ/IAQgALOUIgO7IgacIgeZRAAAAAAAAOBBYwRAIAeqDAELQYCAgIB4CyECIAMgArKTIQQgBSACQQJ0aioCACEDIAEgBQJ/IAabIgaZRAAAAAAAAOBBYwRAIAaqDAELQYCAgIB4C0ECdGoqAgAgA5MgBJQgA5I4AgALgQEBAX8gAigCTCEDIAIoAsQBIQICQCABIAIgAC8BACIAQf//A0cEfyADDQFBAAUgAwtBAXRqLwEAOwEADwsgASACIAAgA2wiAEH//wFqQf//A20gAGoiAEEQdUEBdGoiAS8BACICIAEvAQIgAmsgAEH//wNxbEGAgAJqQRB2ajsBAAvNBAMGfwJ9AnwgAigCxAEhBAJAAkACQAJAIAAqAgAiCkNfcIkwXQ0AIAq8Qf////8HcUGAgID8B0sNACAKIglDAACAP2ANAQsgAigCTCIADQELIAIoAgwiBUUNASAEIAIoAogBIAIoAkxsQQJ0aiEAQQAhAiAFQQRPBEAgBUF8cSEHQQAhBANAIAEgAkECdCIDaiAAIANqKgIAOAIAIAEgA0EEciIIaiAAIAhqKgIAOAIAIAEgA0EIciIIaiAAIAhqKgIAOAIAIAEgA0EMciIDaiAAIANqKgIAOAIAIAJBBGohAiAEQQRqIgQgB0cNAAsLIAVBA3EiBEUNAQNAIAEgAkECdCIDaiAAIANqKgIAOAIAIAJBAWohAiAGQQFqIgYgBEcNAAsMAQsCfyAJIACzlCIKuyILnCIMmUQAAAAAAADgQWMEQCAMqgwBC0GAgICAeAshACACKAIMIgNFDQAgCiAAspMhCiACKAKIASIFIABsQQJ0IARqIQIgBAJ/IAubIguZRAAAAAAAAOBBYwRAIAuqDAELQYCAgIB4CyAFbEECdGohBUEAIQAgA0EBRwRAIANBfnEhB0EAIQQDQCABIABBAnQiBmogBSAGaioCACACIAZqKgIAIgmTIAqUIAmSOAIAIAEgBkEEciIGaiAFIAZqKgIAIAIgBmoqAgAiCZMgCpQgCZI4AgAgAEECaiEAIARBAmoiBCAHRw0ACwsgA0EBcUUNACABIABBAnQiAGogACAFaioCACAAIAJqKgIAIgmTIAqUIAmSOAIACwuKBAEHfyACKALEASEDAkACQCAALwEAIgBB//8DRwRAIAIoAkwiBA0BCyACKAIMIgRFDQEgAyACKAKIASACKAJMbEEBdGohAEEAIQIgBEEETwRAIARBfHEhCANAIAEgAkEBdCIDaiAAIANqLwEAOwEAIAEgA0ECciIHaiAAIAdqLwEAOwEAIAEgA0EEciIHaiAAIAdqLwEAOwEAIAEgA0EGciIDaiAAIANqLwEAOwEAIAJBBGohAiAFQQRqIgUgCEcNAAsLIARBA3EiA0UNAQNAIAEgAkEBdCIEaiAAIARqLwEAOwEAIAJBAWohAiAGQQFqIgYgA0cNAAsMAQsgACAEbCIAQf//AWpB//8DbSEGIAIoAgwiBEUNACAAIAZqIgBB//8DcSEGIAMgAigCiAEiBSAAQRB1IgBsQQF0aiECIAMgBSAAQQFqbEEBdGohA0EAIQAgBEEBRwRAIARBfnEhBwNAIAEgAEEBdCIFaiACIAVqLwEAIgkgAyAFai8BACAJayAGbEGAgAJqQRB2ajsBACABIAVBAnIiBWogAiAFai8BACIJIAMgBWovAQAgCWsgBmxBgIACakEQdmo7AQAgAEECaiEAIAhBAmoiCCAHRw0ACwsgBEEBcUUNACABIABBAXQiAGogACACai8BACIBIAAgA2ovAQAgAWsgBmxBgIACakEQdmo7AQALC+8DAgR9Bn8CfUMAAAAAIAAqAgAiA0NfcIkwXQ0AGkMAAAAAIAO8Qf////8HcUGAgID8B0sNABpDAACAPyADIANDAACAP14bCyEFAkAgACoCBCIEQ19wiTBdDQAgBLxB/////wdxQYCAgPwHSw0AQwAAgD8gBCAEQwAAgD9eGyEGCyACKAKMASEAAn8CQCADQ19wiTBdDQAgA0MAAIA/YEUNAEEAIAO8Qf////8HcUGBgID8B0kNARoLIAALIQggAigCDCELIAIoAogBIQcCfwJAIARDX3CJMF0NACAEQwAAgD9gRQ0AQQAgBLxB/////wdxQYGAgPwHSQ0BGgsgBwshCSALQQBKBEAgBiACKAJQs5QiAyADu0QAAAAAAAA4QqC9p0EQdSIKspMhBCAFIAIoAkyzlCIDIAO7RAAAAAAAADhCoL2nQRB1IgyykyEDIAIoAsQBIAAgDGxBAnRqIgAgCSAHIApsIgJqQQJ0IgdqIQkgACACQQJ0IgJqIQogACAIQQJ0aiIAIAdqIQggACACaiEHQQAhAANAIAEgAEECdCICaiACIAhqKgIAIAIgCWoqAgAiBZMgA5QgBZIgAiAHaioCACACIApqKgIAIgWTIAOUIAWSIgWTIASUIAWSOAIAIABBAWoiACALRw0ACwsLywIBCX8gAC8BAiIHIAIoAlBsIgZB//8BakH//wNtIQQgAC8BACIFIAIoAkxsIgBB//8BakH//wNtIQMgAigCDCIJQQBKBEAgBCAGaiIIQf//A3EhCiAAIANqIgRB//8DcSEGQQAhACACKALEASACKAKMASIDIARBEHVsQQF0aiIEIANBACAFQf//A0cbQQF0aiIFIAIoAogBIgIgCEEQdWwiAyACQQAgB0H//wNHG2pBAXQiAmohByACIARqIQggBCADQQF0IgJqIQQgAiAFaiEFA0AgASAAQQF0IgJqIAIgBGovAQAiAyACIAVqLwEAIANrIAZsQYCAAmpBEHZqIgMgAiAIai8BACILIAIgB2ovAQAgC2sgBmxBgIACakEQdmpB//8DcSADQf//A3FrIApsQYCAAmpBEHZqOwEAIABBAWoiACAJRw0ACwsLuwYCCH0JfwJ9QwAAAAAgACoCACIEQ19wiTBdDQAaQwAAAAAgBLxB/////wdxQYCAgPwHSw0AGkMAAIA/IAQgBEMAAIA/XhsLIAIoAkwCQCAAKgIEIgVDX3CJMF0NACAFvEH/////B3FBgICA/AdLDQBDAACAPyAFIAVDAACAP14bIQgLsyACKAJQAkAgACoCCCIGQ19wiTBdDQAgBrxB/////wdxQYCAgPwHSw0AQwAAgD8gBiAGQwAAgD9eGyEJC7MhCiACKAIMIRMgAigCxAEhEZQhAwJ/IAkgAigCVLOUIgmOIgeLQwAAAE9dBEAgB6gMAQtBgICAgHgLIRAgCCAKlCEIIAIoApABIQACfyADjiIHi0MAAABPXQRAIAeoDAELQYCAgIB4CyEOAn8gCI4iB4tDAAAAT10EQCAHqAwBC0GAgICAeAshDAJ/AkAgBENfcIkwXQ0AIARDAACAP2BFDQBBACAEvEH/////B3FBgYCA/AdJDQEaCyAACyELIAIoAowBIQ0CfwJAIAVDX3CJMF0NACAFQwAAgD9gRQ0AQQAgBbxB/////wdxQYGAgPwHSQ0BGgsgDQshDyACKAKIASECAn8CQCAGQ19wiTBdDQAgBkMAAIA/YEUNAEEAIAa8Qf////8HcUGBgID8B0kNARoLIAILIRIgE0EASgRAIAkgELKTIQYgCCAMspMhBSADIA6ykyEEIBEgACAObEECdGoiDiAPIAwgDWwiDWpBAnQiD2oiDCASIAIgEGwiAmpBAnQiAGohEiAMIAJBAnQiAmohECAOIA1BAnQiDWoiDCAAaiERIAIgDGohDCAOIAtBAnRqIgsgD2oiDyAAaiEOIAIgD2ohDyAAIAsgDWoiAGohCyAAIAJqIQ1BACEAA0AgASAAQQJ0IgJqIAIgDmoqAgAgAiASaioCACIDkyAElCADkiACIAtqKgIAIAIgEWoqAgAiA5MgBJQgA5IiA5MgBZQgA5IgAiAPaioCACACIBBqKgIAIgOTIASUIAOSIAIgDWoqAgAgAiAMaioCACIDkyAElCADkiIDkyAFlCADkiIDkyAGlCADkjgCACAAQQFqIgAgE0cNAAsLC8EEAQ9/IAAvAQQiDCACKAJUbCIHQf//AWpB//8DbSEIIAAvAQIiBSACKAJQbCILQf//AWpB//8DbSEEIAAvAQAiDSACKAJMbCIAQf//AWpB//8DbSEJIAIoAgwiDkEASgRAIAcgCGoiCkH//wNxIQ8gBCALaiIDQf//A3EhCyAAIAlqIgBB//8DcSEHQQAhCCACKALEASACKAKQASIJIABBEHVsQQF0aiIEIAIoAowBIgAgA0EQdWwiAyAAQQAgBUH//wNHG2pBAXQiBWoiBiACKAKIASIAIApBEHVsIgIgAEEAIAxB//8DRxtqQQF0IgBqIQwgBCADQQF0IgpqIgMgAGohECAEIAlBACANQf//A0cbQQF0aiIEIAVqIgUgAGohDSAFIAJBAXQiAmohBSAAIAQgCmoiAGohBCACIAZqIQkgAiADaiEKIAAgAmohAgNAIAEgCEEBdCIAaiAAIApqLwEAIgMgACACai8BACADayAHbEGAgAJqQRB2aiIDIAAgCWovAQAiBiAAIAVqLwEAIAZrIAdsQYCAAmpBEHZqQf//A3EgA0H//wNxayALbEGAgAJqQRB2aiIDIAAgEGovAQAiBiAAIARqLwEAIAZrIAdsQYCAAmpBEHZqIgYgACAMai8BACIRIAAgDWovAQAgEWsgB2xBgIACakEQdmpB//8DcSAGQf//A3FrIAtsQYCAAmpBEHZqQf//A3EgA0H//wNxayAPbEGAgAJqQRB2ajsBACAIQQFqIgggDkcNAAsLC+kLAg1/CH0CfUMAAAAAIAAqAgAiEkNfcIkwXQ0AGkMAAAAAIBK8Qf////8HcUGAgID8B0sNABpDAACAPyASIBJDAACAP14bCyACKAJMAkAgACoCBCITQ19wiTBdDQAgE7xB/////wdxQYCAgPwHSw0AQwAAgD8gEyATQwAAgD9eGyERC7MgAigCUAJAIAAqAggiFENfcIkwXQ0AIBS8Qf////8HcUGAgID8B0sNAEMAAIA/IBQgFEMAAIA/XhshFQuzIRcgAigCDCEGIAIoAsQBIQyUIRACfyAVIAIoAlSzlCIVjiIWi0MAAABPXQRAIBaoDAELQYCAgIB4CyEJIBEgF5QhESACKAKQASEAAn8gEI4iFotDAAAAT10EQCAWqAwBC0GAgICAeAshBwJ/IBGOIhaLQwAAAE9dBEAgFqgMAQtBgICAgHgLIQgCfwJAIBJDX3CJMF0NACASQwAAgD9gRQ0AQQAgErxB/////wdxQYGAgPwHSQ0BGgsgAAshAyACKAKMASEEAn8CQCATQ19wiTBdDQAgE0MAAIA/YEUNAEEAIBO8Qf////8HcUGBgID8B0kNARoLIAQLIQUgAigCiAEhAgJ/AkAgFENfcIkwXQ0AIBRDAACAP2BFDQBBACAUvEH/////B3FBgYCA/AdJDQEaCyACCyEKAkAgBkEATA0AIBEgCLKTIhIgFSAJspMiE2AhDiAMIAAgB2xBAnRqIgwgBCAIbCIIQQJ0IgtqIg0gAiAJbCICQQJ0IgBqIQQgDCADQQJ0aiIJIAUgCGpBAnQiCGoiBSACIApqQQJ0IgNqIQIgACAFaiEFIAkgC2oiCyAAaiEKAkAgECAHspMiFCASYCIPRQ0AIA5FDQBBACEAA0AgASAAQQJ0IgNqIAIgA2oqAgAgAyAFaioCACIQkyATlCAQIAMgCmoqAgAiEJMgEpQgECADIARqKgIAIhCTIBSUIBCSkpI4AgAgAEEBaiIAIAZHDQALDAELIBIgE18hCSADIAtqIQcCQCATIBRfIgtFDQAgCUUNAEEAIQADQCABIABBAnQiA2ogAyAHaioCACIQIAMgCmoqAgAiEZMgE5QgAiADaioCACAQkyASlCARIAMgBGoqAgAiEJMgFJQgEJKSkjgCACAAQQFqIgAgBkcNAAsMAQsgAyANaiEKIBMgFGBFIg0gD0VyRQRAQQAhAANAIAEgAEECdCIDaiADIApqKgIAIhAgAyAEaioCACIRkyATlCACIANqKgIAIAMgB2oqAgAiFZMgEpQgFSAQkyAUlCARkpKSOAIAIABBAWoiACAGRw0ACwwBCyAAIAggDGoiAGohByASIBRgRSIIIAtFckUEQEEAIQADQCABIABBAnQiA2ogAiADaioCACADIAVqKgIAIhCTIBOUIAMgB2oqAgAiESADIARqKgIAIhWTIBKUIBAgEZMgFJQgFZKSkjgCACAAQQFqIgAgBkcNAAsMAQsgACADaiEFIA5FIA1yRQRAQQAhAANAIAEgAEECdCIDaiADIAVqKgIAIhAgAyAHaioCACIRkyATlCARIAMgBGoqAgAiEZMgEpQgAiADaioCACAQkyAUlCARkpKSOAIAIABBAWoiACAGRw0ACwwBCyAIIAlFckUEQEEAIQADQCABIABBAnQiA2ogAyAKaioCACIQIAMgBGoqAgAiEZMgE5QgAyAFaioCACIVIBCTIBKUIAIgA2oqAgAgFZMgFJQgEZKSkjgCACAAQQFqIgAgBkcNAAsMAQtBACECIAZBAUcEQCAGQf7///8HcSEFQQAhAANAIAEgAkECdCIDaiATQwAAAACUIhAgEkMAAAAAlCIRIBRDAAAAAJQiFSADIARqKgIAkpKSOAIAIAEgA0EEciIDaiAQIBEgFSADIARqKgIAkpKSOAIAIAJBAmohAiAAQQJqIgAgBUcNAAsLIAZBAXFFDQAgASACQQJ0IgBqIBNDAAAAAJQgEkMAAAAAlCAUQwAAAACUIAAgBGoqAgCSkpI4AgALC4EIAQl/IAIoAsQBIAIoApABIgkgAC8BACIKIAIoAkxsIgdB//8BakH//wNtIAdqIghBEHVsQQF0aiACKAKMASIFIAAvAQIiBiACKAJQbCIHQf//AWpB//8DbSAHaiIDQRB1bEEBdGogAigCiAEiBCAALwEEIgsgAigCVGwiAEH//wFqQf//A20gAGoiB0EQdWxBAXRqIQAgB0H//wNxIQcgBEEAIAtB//8DRxshBCAFQQAgBkH//wNHGyEFIAlBACAKQf//A0cbIQYgAigCDCECAkAgCEH//wNxIgkgA0H//wNxIgpPBEAgByAKTQRAIAJFDQIgBCAFIAZqIgVqQQF0IQQDQCABIAAvAQAiCCAAIAVBAXRqLwEAIgMgACAGQQF0ai8BACILayAKbCAAIARqLwEAIANrIAdsaiALIAhrIAlsakGBgAJqIghBEHUgCGpBEHZqOwEAIAFBAmohASAAQQJqIQAgAkEBayICDQALDAILIAUgBCAGaiIFaiEIIAcgCU8EQCACRQ0CA0AgASAALwEAIgYgACAIQQF0ai8BACAAIAVBAXRqLwEAIgNrIApsIAMgACAEQQF0ai8BACIDayAJbGogAyAGayAHbGpBgYACaiIGQRB1IAZqQRB2ajsBACABQQJqIQEgAEECaiEAIAJBAWsiAg0ACwwCCyACRQ0BA0AgASAALwEAIgQgACAIQQF0ai8BACAAIAVBAXRqLwEAIgNrIApsIAMgACAGQQF0ai8BACIDayAHbGogAyAEayAJbGpBgYACaiIEQRB1IARqQRB2ajsBACABQQJqIQEgAEECaiEAIAJBAWsiAg0ACwwBCyAHIAlNBEAgAkUNASAEIAUgBmoiBmpBAXQhBANAIAEgAC8BACIIIAAgBkEBdGovAQAiAyAAIAVBAXRqLwEAIgtrIAlsIAAgBGovAQAgA2sgB2xqIAsgCGsgCmxqQYGAAmoiCEEQdSAIakEQdmo7AQAgAUECaiEBIABBAmohACACQQFrIgINAAsMAQsgBiAEIAVqIgZqIQggByAKTQRAIAJFDQEDQCABIAAvAQAiBCAAIAhBAXRqLwEAIAAgBkEBdGovAQAiA2sgCWwgAyAAIAVBAXRqLwEAIgNrIAdsaiADIARrIApsakGBgAJqIgRBEHUgBGpBEHZqOwEAIAFBAmohASAAQQJqIQAgAkEBayICDQALDAELIAJFDQADQCABIAAvAQAiBSAAIAhBAXRqLwEAIAAgBkEBdGovAQAiA2sgCWwgAyAAIARBAXRqLwEAIgNrIApsaiADIAVrIAdsakGBgAJqIgVBEHUgBWpBEHZqOwEAIAFBAmohASAAQQJqIQAgAkEBayICDQALCwvjAwIHfwJ9IwBB0AlrIgMkAAJAIAAqAgAiC0NfcIkwXSIFDQAgC7xB/////wdxQYCAgPwHSw0AQwAAgD8gCyALQwAAgD9eGyEKCyACKALEASEGIAogAigCTLOUIgq7RAAAAAAAADhCoL2nQRB1IgggAigClAEiBGwhCQJ/AkAgBQ0AIAtDAACAP2BFDQBBACALvEH/////B3FBgYCA/AdJDQEaCyAECyEFIANBBGoiByACQcwBEOIEGiADIAIoAlg2AlggAyACKQJQNwJQIAMgBiAJQQJ0aiIENgLIASAAQQRqIgAgA0HQBWogBxB6IAMgBCAFQQJ0ajYCyAEgACADQdABaiAHEHoCQCACKAIMIgJFDQAgCiAIspMhC0EAIQAgAkEBRwRAIAJBfnEhBkEAIQUDQCABIABBAnQiBGogA0HQAWogBGoqAgAgA0HQBWogBGoqAgAiCpMgC5QgCpI4AgAgASAEQQRyIgRqIANB0AFqIARqKgIAIANB0AVqIARqKgIAIgqTIAuUIAqSOAIAIABBAmohACAFQQJqIgUgBkcNAAsLIAJBAXFFDQAgASAAQQJ0IgBqIANB0AFqIABqKgIAIANB0AVqIABqKgIAIgqTIAuUIAqSOAIACyADQdAJaiQAC8sOASF/IwBBgARrIgskACAALwEGIgMgAigCWGwiCUH//wFqQf//A20hByAALwEEIgggAigCVGwiCkH//wFqQf//A20hDCAALwECIgQgAigCUGwiBkH//wFqQf//A20hBSAALwEAIhcgAigCTGwiDkH//wFqQf//A20hDwJAIAIoAgwiDUUNAEEAIQAgAigClAEiEEEAIBdB//8DRxshHCAKIAxqIhFB//8DcSIKIAUgBmoiBkH//wNxIgxJIgUgByAJaiIHQf//A3EiCSAKSSIdciEXIAkgCksiEyIeIAkgDEkiEnIhGSAFIAkgDEsiFnIhGiASIAogDEsiEnIhGyACKALEASAQIA4gD2oiH0EQdWxBAXRqIg4gAigCkAEiBSAGQRB1bCIPIAVBACAEQf//A0cbaiIgQQF0aiIGIAIoAowBIgQgEUEQdWwiECAEQQAgCEH//wNHG2oiIUEBdCIUaiIIIAIoAogBIgIgB0EQdWwiESACQQAgA0H//wNHG2oiIkEBdCIDaiEHIAggEUEBdCIEaiEYIAYgEEEBdCICaiIFIARqIQYgDiAPQQF0aiIVIAJqIgIgBGohCAJAAkAgEg0AIBMNAANAIABBAXQiAiALQYACamogAiAIai8BACIDIAIgGGovAQAiBCACIAZqLwEAIgVrIApsIAUgA2sgDGxqIAIgB2ovAQAgBGsgCWxqIgIgAkH//wFqQf//A21qQYCAAmpBEHZqOwEAIABBAWoiACANRw0ACwwBCyADIAVqIQUCQCAWDQAgCSAKSQ0AA0AgAEEBdCICIAtBgAJqaiACIAhqLwEAIgMgAiAHai8BACACIAVqLwEAIgRrIApsIAIgBmovAQAiAiADayAMbGogBCACayAJbGoiAiACQf//AWpB//8DbWpBgIACakEQdmo7AQAgAEEBaiIAIA1HDQALDAELIAIgA2ohE0EAIQIgGwRAIBQgFWoiACADaiEUIAAgBGohFQNAIAggAkEBdCIAai8BACEEAkAgGkUEQCAAIAdqLwEAIAAgGGovAQAiBmshAyAGIAAgFWovAQAiBWshBiAFIARrIQUMAQsgGUUEQCAAIBRqLwEAIgYgACAVai8BACIFayEDIAAgB2ovAQAgBmshBiAFIARrIQUMAQtBACEGQQAhBUEAIQMgFw0AIAAgFGovAQAiAyAAIBNqLwEAIiNrIQUgACAHai8BACADayEGICMgBGshAwsgC0GAAmogAGogBCAFIApsIAYgDGxqIAMgCWxqIgAgAEH//wFqQf//A21qQYCAAmpBEHZqOwEAIAJBAWoiAiANRw0ACwwBCwNAIAJBAXQiACALQYACamogACAIai8BACIDIAAgB2ovAQAgACAFai8BACIEayAKbCAEIAAgE2ovAQAiAGsgDGxqIAAgA2sgCWxqIgAgAEH//wFqQf//A21qQYCAAmpBEHZqOwEAIAJBAWoiAiANRw0ACwsgH0H//wNxIQUgFiAdciEYIBIgHnIhEyAOIBxBAXRqIgMgD0EBdGoiByAhQQF0IghqIgQgIkEBdCIAaiEWIAQgEUEBdCICaiESIAcgEEEBdCIEaiIHIABqIQ4gAyAgQQF0aiIDIARqIgQgAGohDyAAIAMgCGoiAGohBiAAIAJqIRAgAiAEaiERIAIgB2ohFEEAIQADQCAUIABBAXQiAmovAQAhBwJAIBNFBEAgAiAGai8BACACIBBqLwEAIgNrIQggAyACIBFqLwEAIgNrIQQgAyAHayEDDAELIBhFBEAgAiAPai8BACIDIAIgEWovAQAiFWshCCACIAZqLwEAIANrIQQgFSAHayEDDAELIBtFBEAgAiAGai8BACACIA9qLwEAIgNrIQQgAyACIA5qLwEAIghrIQMgCCAHayEIDAELIBpFBEAgAiAGai8BACACIBBqLwEAIgNrIQggAyACIBJqLwEAIgRrIQMgBCAHayEEDAELIBlFBEAgAiAWai8BACIDIAIgEmovAQAiBGshCCACIAZqLwEAIANrIQMgBCAHayEEDAELQQAhA0EAIQRBACEIIBcNACACIBZqLwEAIgMgAiAOai8BACIIayEEIAIgBmovAQAgA2shAyAIIAdrIQgLIAIgC2ogByAEIApsIAMgDGxqIAggCWxqIgIgAkH//wFqQf//A21qQYCAAmpBEHZqOwEAIABBAWoiACANRw0AC0EAIQAgDUEBRwRAIA1BfnEhCkEAIQMDQCABIABBAXQiAmogC0GAAmogAmovAQAiCSACIAtqLwEAIAlrIAVsQYCAAmpBEHZqOwEAIAEgAkECciICaiALQYACaiACai8BACIJIAIgC2ovAQAgCWsgBWxBgIACakEQdmo7AQAgAEECaiEAIANBAmoiAyAKRw0ACwsgDUEBcUUNACABIABBAXQiAGogC0GAAmogAGovAQAiASAAIAtqLwEAIAFrIAVsQYCAAmpBEHZqOwEACyALQYAEaiQAC+MDAgd/An0jAEHQCWsiAyQAAkAgACoCACILQ19wiTBdIgUNACALvEH/////B3FBgICA/AdLDQBDAACAPyALIAtDAACAP14bIQoLIAIoAsQBIQYgCiACKAJMs5QiCrtEAAAAAAAAOEKgvadBEHUiCCACKAKYASIEbCEJAn8CQCAFDQAgC0MAAIA/YEUNAEEAIAu8Qf////8HcUGBgID8B0kNARoLIAQLIQUgA0EEaiIHIAJBzAEQ4gQaIAMgAikCWDcCWCADIAIpAlA3AlAgAyAGIAlBAnRqIgQ2AsgBIABBBGoiACADQdAFaiAHEHwgAyAEIAVBAnRqNgLIASAAIANB0AFqIAcQfAJAIAIoAgwiAkUNACAKIAiykyELQQAhACACQQFHBEAgAkF+cSEGQQAhBQNAIAEgAEECdCIEaiADQdABaiAEaioCACADQdAFaiAEaioCACIKkyALlCAKkjgCACABIARBBHIiBGogA0HQAWogBGoqAgAgA0HQBWogBGoqAgAiCpMgC5QgCpI4AgAgAEECaiEAIAVBAmoiBSAGRw0ACwsgAkEBcUUNACABIABBAnQiAGogA0HQAWogAGoqAgAgA0HQBWogAGoqAgAiCpMgC5QgCpI4AgALIANB0AlqJAALpQMBB38jAEHQBWsiAyQAIAIoAsQBIQYgAigCmAEhBCACKAJMIQUgAC8BACEHIANBBGoiCSACQcwBEOIEGiADIAIpAlg3AlggAyACKQJQNwJQIAMgBiAEIAUgB2wiBUH//wFqQf//A20gBWoiBUEQdSIIbEEBdGo2AsgBIABBAmoiACADQdADaiAJEH0gAyAGIAQgCCAHQf//A0dqbEEBdGo2AsgBIAAgA0HQAWogCRB9AkAgAigCDCICRQ0AIAVB//8DcSEGQQAhACACQQFHBEAgAkF+cSEFQQAhBwNAIAEgAEEBdCIEaiADQdADaiAEai8BACIIIANB0AFqIARqLwEAIAhrIAZsQYCAAmpBEHZqOwEAIAEgBEECciIEaiADQdADaiAEai8BACIIIANB0AFqIARqLwEAIAhrIAZsQYCAAmpBEHZqOwEAIABBAmohACAHQQJqIgcgBUcNAAsLIAJBAXFFDQAgASAAQQF0IgBqIANB0ANqIABqLwEAIgEgA0HQAWogAGovAQAgAWsgBmxBgIACakEQdmo7AQALIANB0AVqJAAL7QMCB38CfSMAQdAJayIDJAACQCAAKgIAIgtDX3CJMF0iBQ0AIAu8Qf////8HcUGAgID8B0sNAEMAAIA/IAsgC0MAAIA/XhshCgsgAigCxAEhBiAKIAIoAkyzlCIKu0QAAAAAAAA4QqC9p0EQdSIIIAIoApwBIgRsIQkCfwJAIAUNACALQwAAgD9gRQ0AQQAgC7xB/////wdxQYGAgPwHSQ0BGgsgBAshBSADQQRqIgcgAkHMARDiBBogAyACKAJgNgJgIAMgAikCWDcCWCADIAIpAlA3AlAgAyAGIAlBAnRqIgQ2AsgBIABBBGoiACADQdAFaiAHEH4gAyAEIAVBAnRqNgLIASAAIANB0AFqIAcQfgJAIAIoAgwiAkUNACAKIAiykyELQQAhACACQQFHBEAgAkF+cSEGQQAhBQNAIAEgAEECdCIEaiADQdABaiAEaioCACADQdAFaiAEaioCACIKkyALlCAKkjgCACABIARBBHIiBGogA0HQAWogBGoqAgAgA0HQBWogBGoqAgAiCpMgC5QgCpI4AgAgAEECaiEAIAVBAmoiBSAGRw0ACwsgAkEBcUUNACABIABBAnQiAGogA0HQAWogAGoqAgAgA0HQBWogAGoqAgAiCpMgC5QgCpI4AgALIANB0AlqJAAL5AwCEH8BfiMAQdAJayIDJAAgAigCxAEhECACKAJQIQkgAigCnAEhDCACKAJMIQQgAC8BACEFIAIoAsgBIREgAigCmAEhDSACKAIMIQcgAC8BAiEKIAMgAkEIaigCADYCCCADIAIpAgA3AwAgAyAHNgIMIAMgAigCSDYCSCADQUBrIAJBQGspAgA3AwAgAyACKQI4NwM4IAMgAikCMDcDMCADIAIpAig3AyggAyACKQIgNwMgIAMgAikCGDcDGCADIAIpAhA3AxAgAyACQdwAaikCADcDWCADIAIpAlQ3A1AgAyACKQJoNwNoIAMgAikCcDcDcCADIAIpAng3A3ggAyACKQKAATcDgAEgAyACKQKIATcDiAEgAyACKQKQATcDkAEgAyACKQJgNwNgIAMgDTYCmAEgAyACKQK8ATcCvAEgAyACKQK0ATcCtAEgAyACKQKsATcCrAEgAyACKQKkATcCpAEgAikCnAEhEyADIBE2AsgBIAMgEzcCnAEgAyACKQJcNwJUIAMgAikCVDcCTCADIBAgDCAEIAVsIgRB//8BakH//wNtIARqIhJBEHUiDmxBAXRqIgggDSAJIApsIgRB//8BakH//wNtIARqIgtBEHUiBGxBAXQiBmo2AsQBIABBBGoiDyADQdAHaiADEH0gAyAIIA0gBCAKQf//A0dqbEEBdCIJajYCxAEgDyADQdAFaiADEH0gDCAOIAVB//8DR2psIQggC0H//wNxIQoCQCAHRQ0AQQAhBSAHQQFHBEAgB0F+cSEEQQAhDgNAIAVBAXQiCyADQYACaiIMaiADQdAHaiALai8BACIAIANB0AVqIAtqLwEAIABrIApsQYCAAmpBEHZqOwEAIAwgC0ECciILaiADQdAHaiALai8BACIAIANB0AVqIAtqLwEAIABrIApsQYCAAmpBEHZqOwEAIAVBAmohBSAOQQJqIg4gBEcNAAsLIAdBAXFFDQAgBUEBdCIEIANBgAJqaiADQdAHaiAEai8BACIAIANB0AVqIARqLwEAIABrIApsQYCAAmpBEHZqOwEACyADIAIoAgg2AogEIAMgAikCADcDgAQgAyAHNgKMBCADIAIoAkg2AsgEIAMgAikCQDcDwAQgAyACKQI4NwO4BCADIAIpAjA3A7AEIAMgAikCKDcDqAQgAyACKQIgNwOgBCADIAIpAhg3A5gEIAMgAikCEDcDkAQgAyACKQJcNwPYBCADIAIpAlQ3A9AEIAMgAikCaDcD6AQgAyACKQJwNwPwBCADIAIpAng3A/gEIAMgAikCgAE3A4AFIAMgAikCiAE3A4gFIAMgAikCkAE3A5AFIAMgAikCYDcD4AQgAyANNgKYBSADIAIpArwBNwK8BSADIAIpArQBNwK0BSADIAIpAqwBNwKsBSADIAIpAqQBNwKkBSACKQKcASETIAMgETYCyAUgAyATNwKcBSADIAIpAlw3AtQEIAMgAikCVDcCzAQgAyAQIAhBAXRqIgAgBmo2AsQFIA8gA0HQB2ogA0GABGoiAhB9IAMgACAJajYCxAUgDyADQdAFaiACEH0CQCAHRQ0AIAdBAXECQCAHQQFrIghFBEBBACECDAELIAdBfnEhBEEAIQJBACEFA0AgAyACQQF0IgZqIANB0AdqIAZqLwEAIgAgA0HQBWogBmovAQAgAGsgCmxBgIACakEQdmo7AQAgAyAGQQJyIgZqIANB0AdqIAZqLwEAIgAgA0HQBWogBmovAQAgAGsgCmxBgIACakEQdmo7AQAgAkECaiECIAVBAmoiBSAERw0ACwsEQCADIAJBAXQiAmogA0HQB2ogAmovAQAiACADQdAFaiACai8BACAAayAKbEGAgAJqQRB2ajsBAAsgEkH//wNxIQkgB0EBcQJAIAhFBEBBACEGDAELIAdBfnEhAkEAIQZBACEFA0AgASAGQQF0IghqIANBgAJqIAhqLwEAIgAgAyAIai8BACAAayAJbEGAgAJqQRB2ajsBACABIAhBAnIiCGogA0GAAmogCGovAQAiACADIAhqLwEAIABrIAlsQYCAAmpBEHZqOwEAIAZBAmohBiAFQQJqIgUgAkcNAAsLRQ0AIAEgBkEBdCICaiADQYACaiACai8BACIAIAIgA2ovAQAgAGsgCWxBgIACakEQdmo7AQALIANB0AlqJAAL7wMCB38CfSMAQdAJayIDJAACQCAAKgIAIgtDX3CJMF0iBQ0AIAu8Qf////8HcUGAgID8B0sNAEMAAIA/IAsgC0MAAIA/XhshCgsgAigCxAEhBiAKIAIoAkyzlCIKu0QAAAAAAAA4QqC9p0EQdSIIIAIoAqABIgRsIQkCfwJAIAUNACALQwAAgD9gRQ0AQQAgC7xB/////wdxQYGAgPwHSQ0BGgsgBAshBSADQQRqIgcgAkHMARDiBBogAyACKQJgNwJgIAMgAikCWDcCWCADIAIpAlA3AlAgAyAGIAlBAnRqIgQ2AsgBIABBBGoiACADQdAFaiAHEIABIAMgBCAFQQJ0ajYCyAEgACADQdABaiAHEIABAkAgAigCDCICRQ0AIAogCLKTIQtBACEAIAJBAUcEQCACQX5xIQZBACEFA0AgASAAQQJ0IgRqIANB0AFqIARqKgIAIANB0AVqIARqKgIAIgqTIAuUIAqSOAIAIAEgBEEEciIEaiADQdABaiAEaioCACADQdAFaiAEaioCACIKkyALlCAKkjgCACAAQQJqIQAgBUECaiIFIAZHDQALCyACQQFxRQ0AIAEgAEECdCIAaiADQdABaiAAaioCACADQdAFaiAAaioCACIKkyALlCAKkjgCAAsgA0HQCWokAAuxAwEHfyMAQdAFayIDJAAgAigCxAEhBiACKAKgASEEIAIoAkwhBSAALwEAIQcgA0EEaiIJIAJBzAEQ4gQaIAMgAikCYDcCYCADIAIpAlg3AlggAyACKQJQNwJQIAMgBiAEIAUgB2wiBUH//wFqQf//A20gBWoiBUEQdSIIbEEBdGo2AsgBIABBAmoiACADQdADaiAJEIEBIAMgBiAEIAggB0H//wNHamxBAXRqNgLIASAAIANB0AFqIAkQgQECQCACKAIMIgJFDQAgBUH//wNxIQZBACEAIAJBAUcEQCACQX5xIQVBACEHA0AgASAAQQF0IgRqIANB0ANqIARqLwEAIgggA0HQAWogBGovAQAgCGsgBmxBgIACakEQdmo7AQAgASAEQQJyIgRqIANB0ANqIARqLwEAIgggA0HQAWogBGovAQAgCGsgBmxBgIACakEQdmo7AQAgAEECaiEAIAdBAmoiByAFRw0ACwsgAkEBcUUNACABIABBAXQiAGogA0HQA2ogAGovAQAiASADQdABaiAAai8BACABayAGbEGAgAJqQRB2ajsBAAsgA0HQBWokAAv5AwIHfwJ9IwBB0AlrIgMkAAJAIAAqAgAiC0NfcIkwXSIFDQAgC7xB/////wdxQYCAgPwHSw0AQwAAgD8gCyALQwAAgD9eGyEKCyACKALEASEGIAogAigCTLOUIgq7RAAAAAAAADhCoL2nQRB1IgggAigCpAEiBGwhCQJ/AkAgBQ0AIAtDAACAP2BFDQBBACALvEH/////B3FBgYCA/AdJDQEaCyAECyEFIANBBGoiByACQcwBEOIEGiADIAIoAmg2AmggAyACKQJgNwJgIAMgAikCWDcCWCADIAIpAlA3AlAgAyAGIAlBAnRqIgQ2AsgBIABBBGoiACADQdAFaiAHEIIBIAMgBCAFQQJ0ajYCyAEgACADQdABaiAHEIIBAkAgAigCDCICRQ0AIAogCLKTIQtBACEAIAJBAUcEQCACQX5xIQZBACEFA0AgASAAQQJ0IgRqIANB0AFqIARqKgIAIANB0AVqIARqKgIAIgqTIAuUIAqSOAIAIAEgBEEEciIEaiADQdABaiAEaioCACADQdAFaiAEaioCACIKkyALlCAKkjgCACAAQQJqIQAgBUECaiIFIAZHDQALCyACQQFxRQ0AIAEgAEECdCIAaiADQdABaiAAaioCACADQdAFaiAAaioCACIKkyALlCAKkjgCAAsgA0HQCWokAAuJDQIQfwF+IwBB0AlrIgMkACACKALEASEQIAIoAlAhCSACKAKkASEMIAIoAkwhBCAALwEAIQUgAigCyAEhESACKAKgASENIAIoAgwhByAALwECIQogAyACQQhqKAIANgIIIAMgAikCADcDACADIAc2AgwgAyACKAJINgJIIANBQGsgAkFAaykCADcDACADIAIpAjg3AzggAyACKQIwNwMwIAMgAikCKDcDKCADIAIpAiA3AyAgAyACKQIYNwMYIAMgAikCEDcDECADIAJB3ABqKQIANwNYIAMgAkHkAGopAgA3A2AgAyAC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RQ0AIAogCLKTIQtBACEAIAJBAUcEQCACQX5xIQZBACEFA0AgASAAQQJ0IgRqIANB0AFqIARqKgIAIANB0AVqIARqKgIAIgqTIAuUIAqSOAIAIAEgBEEEciIEaiADQdABaiAEaioCACADQdAFaiAEaioCACIKkyALlCAKkjgCACAAQQJqIQAgBUECaiIFIAZHDQALCyACQQFxRQ0AIAEgAEECdCIAaiADQdABaiAAaioCACADQdAFaiAAaioCACIKkyALlCAKkjgCAAsgA0HQCWokAAuUDQERfyMAQdAJayIDJAAgAigCxAEhCyACKAJQIQYgAigCrAEhBSACKAJMIQkgAC8BACEIIAIoAsgBIRAgAigCqAEhCiACKAIMIQQgAC8BAiEHIAMgAkEIaigCADYCCCADIAIpAgA3AwAgAyAENgIMIAMgAigCSDYCSCADQUBrIAJBQGspAgA3AwAgAyACKQI4NwM4IAMgAikCMDcDMCADIAIpAig3AyggAyACKQIgNwMgIAMgAikCGDcDGCADIAIpAhA3AxAgAyACQdwAaikCADcDWCADIAJB5ABqKQIANwNgIAMgAkHsAGopAgA3A2ggAyACKQJUNwNQIAMgAikCeDcDeCADIAIpAoABNwOAASADIAIpAogBNwOIASADIAIpApABNwOQASADIAIpApgBNwOYASADIAIpAqABNwOgASADIAIpAnA3A3AgAyAKNgKoASADIAIpArwBNwK8ASADIAIpArQBNwK0ASADIAIpAqwBNwKsASADIBA2AsgBIAMgAikCbDcCZCADIAIpAmQ3AlwgAyACKQJcNwJUIAMgAikCVDcCTCADIAsgBSAIIAlsIglB//8BakH//wNtIAlqIhFBEHUiCWxBAXRqIgwgCiAGIAdsIgZB//8BakH//wNtIAZqIg1BEHUiDmxBAXQiEmo2AsQBIABBBGoiBiADQdAHaiADEIUBIAMgDCAKIA4gB0H//wNHamxBAXQiDmo2AsQBIAYgA0HQBWogAxCFASAFIAkgCEH//wNHamwhDCANQf//A3EhCCACIQACQCAERQ0AQQAhBSAEQQFHBEAgBEF+cSENQQAhCQNAIAVBAXQiByADQYACaiITaiADQdAHaiAHai8BACIPIANB0AVqIAdqLwEAIA9rIAhsQYCAAmpBEHZqOwEAIBMgB0ECciIHaiADQdAHaiAHai8BACIPIANB0AVqIAdqLwEAIA9rIAhsQYCAAmpBEHZqOwEAIAVBAmohBSAJQQJqIgkgDUcNAAsLIARBAXFFDQAgBUEBdCIFIANBgAJqaiADQdAHaiAFai8BACIHIANB0AVqIAVqLwEAIAdrIAhsQYCAAmpBEHZqOwEACyADIAIoAgg2AogEIAMgACkCADcDgAQgAyAENgKMBCADIAAoAkg2AsgEIAMgACkCQDcDwAQgAyAAKQI4NwO4BCADIAApAjA3A7AEIAMgACkCKDcDqAQgAyAAKQIgNwOgBCADIAApAhg3A5gEIAMgACkCEDcDkAQgAyAAKQJcNwPYBCADIAApAmQ3A+AEIAMgACkCbDcD6AQgAyAAKQJUNwPQBCADIAApAng3A/gEIAMgACkCgAE3A4AFIAMgACkCiAE3A4gFIAMgACkCkAE3A5AFIAMgACkCmAE3A5gFIAMgACkCoAE3A6AFIAMgACkCcDcD8AQgAyAKNgKoBSADIAApArwBNwK8BSADIAApArQBNwK0BSADIAApAqwBNwKsBSADIBA2AsgFIAMgACkCbDcC5AQgAyAAKQJkNwLcBCADIAApAlw3AtQEIAMgACkCVDcCzAQgAyALIAxBAXRqIgAgEmo2AsQFIAYgA0HQB2ogA0GABGoiAhCFASADIAAgDmo2AsQFIAYgA0HQBWogAhCFAQJAIARFDQAgBEEBcQJAIARBAWsiBkUEQEEAIQIMAQsgBEF+cSEHQQAhAkEAIQUDQCADIAJBAXQiAGogA0HQB2ogAGovAQAiCyADQdAFaiAAai8BACALayAIbEGAgAJqQRB2ajsBACADIABBAnIiAGogA0HQB2ogAGovAQAiCyADQdAFaiAAai8BACALayAIbEGAgAJqQRB2ajsBACACQQJqIQIgBUECaiIFIAdHDQALCwRAIAMgAkEBdCIAaiADQdAHaiAAai8BACICIANB0AVqIABqLwEAIAJrIAhsQYCAAmpBEHZqOwEACyARQf//A3EhAiAEQQFxAkAgBkUEQEEAIQAMAQsgBEF+cSEKQQAhAEEAIQUDQCABIABBAXQiBGogA0GAAmogBGovAQAiBiADIARqLwEAIAZrIAJsQYCAAmpBEHZqOwEAIAEgBEECciIEaiADQYACaiAEai8BACIGIAMgBGovAQAgBmsgAmxBgIACakEQdmo7AQAgAEECaiEAIAVBAmoiBSAKRw0ACwtFDQAgASAAQQF0IgBqIANBgAJqIABqLwEAIgEgACADai8BACABayACbEGAgAJqQRB2ajsBAAsgA0HQCWokAAuDBAIHfwJ9IwBB0AlrIgMkAAJAIAAqAgAiC0NfcIkwXSIFDQAgC7xB/////wdxQYCAgPwHSw0AQwAAgD8gCyALQwAAgD9eGyEKCyACKALEASEGIAogAigCTLOUIgq7RAAAAAAAADhCoL2nQRB1IgggAigCsAEiBGwhCQJ/AkAgBQ0AIAtDAACAP2BFDQBBACALvEH/////B3FBgYCA/AdJDQEaCyAECyEFIANBBGoiByACQcwBEOIEGiADIAIpAnA3AnAgAyACKQJoNwJoIAMgAikCYDcCYCADIAIpAlg3AlggAyACKQJQNwJQIAMgBiAJQQJ0aiIENgLIASAAQQRqIgAgA0HQBWogBxCIASADIAQgBUECdGo2AsgBIAAgA0HQAWogBxCIAQJAIAIoAgwiAkUNACAKIAiykyELQQAhACACQQFHBEAgAkF+cSEGQQAhBQNAIAEgAEECdCIEaiADQdABaiAEaioCACADQdAFaiAEaioCACIKkyALlCAKkjgCACABIARBBHIiBGogA0HQAWogBGoqAgAgA0HQBWogBGoqAgAiCpMgC5QgCpI4AgAgAEECaiEAIAVBAmoiBSAGRw0ACwsgAkEBcUUNACABIABBAnQiAGogA0HQAWogAGoqAgAgA0HQBWogAGoqAgAiCpMgC5QgCpI4AgALIANB0AlqJAALxQMBB38jAEHQBWsiAyQAIAIoAsQBIQYgAigCsAEhBCACKAJMIQUgAC8BACEHIANBBGoiCSACQcwBEOIEGiADIAIpAnA3AnAgAyACKQJoNwJoIAMgAikCYDcCYCADIAIpAlg3AlggAyACKQJQNwJQIAMgBiAEIAUgB2wiBUH//wFqQf//A20gBWoiBUEQdSIIbEEBdGo2AsgBIABBAmoiACADQdADaiAJEIkBIAMgBiAEIAggB0H//wNHamxBAXRqNgLIASAAIANB0AFqIAkQiQECQCACKAIMIgJFDQAgBUH//wNxIQZBACEAIAJBAUcEQCACQX5xIQVBACEHA0AgASAAQQF0IgRqIANB0ANqIARqLwEAIgggA0HQAWogBGovAQAgCGsgBmxBgIACakEQdmo7AQAgASAEQQJyIgRqIANB0ANqIARqLwEAIgggA0HQAWogBGovAQAgCGsgBmxBgIACakEQdmo7AQAgAEECaiEAIAdBAmoiByAFRw0ACwsgAkEBcUUNACABIABBAXQiAGogA0HQA2ogAGovAQAiASADQdABaiAAai8BACABayAGbEGAgAJqQRB2ajsBAAsgA0HQBWokAAuNBAIHfwJ9IwBB0AlrIgMkAAJAIAAqAgAiC0NfcIkwXSIFDQAgC7xB/////wdxQYCAgPwHSw0AQwAAgD8gCyALQwAAgD9eGyEKCyACKALEASEGIAogAigCTLOUIgq7RAAAAAAAADhCoL2nQRB1IgggAigCtAEiBGwhCQJ/AkAgBQ0AIAtDAACAP2BFDQBBACALvEH/////B3FBgYCA/AdJDQEaCyAECyEFIANBBGoiByACQcwBEOIEGiADIAIoAng2AnggAyACKQJwNwJwIAMgAikCaDcCaCADIAIpAmA3AmAgAyACKQJYNwJYIAMgAikCUDcCUCADIAYgCUECdGoiBDYCyAEgAEEEaiIAIANB0AVqIAcQigEgAyAEIAVBAnRqNgLIASAAIANB0AFqIAcQigECQCACKAIMIgJFDQAgCiAIspMhC0EAIQAgAkEBRwRAIAJBfnEhBkEAIQUDQCABIABBAnQiBGogA0HQAWogBGoqAgAgA0HQBWogBGoqAgAiCpMgC5QgCpI4AgAgASAEQQRyIgRqIANB0AFqIARqKgIAIANB0AVqIARqKgIAIgqTIAuUIAqSOAIAIABBAmohACAFQQJqIgUgBkcNAAsLIAJBAXFFDQAgASAAQQJ0IgBqIANB0AFqIABqKgIAIANB0AVqIABqKgIAIgqTIAuUIAqSOAIACyADQdAJaiQAC7cNAhF/AX4jAEHQCWsiAyQAIAIoAsQBIQsgAigCUCEGIAIoArQBIQUgAigCTCEJIAAvAQAhCCACKALIASEQIAIoArABIQogAigCDCEEIAAvAQIhByADIAJBCGooAgA2AgggAyACKQIANwMAIAMgBDYCDCADIAIoAkg2AkggA0FAayACQUBrKQIANwMAIAMgAikCODcDOCADIAIpAjA3AzAgAyACKQIoNwMoIAMgAikCIDcDICADIAIpAhg3AxggAyACKQIQNwMQIAMg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BCAFQQJ0ajYCyAEgACADQdABaiAHEIwBAkAgAigCDCICRQ0AIAogCLKTIQtBACEAIAJBAUcEQCACQX5xIQZBACEFA0AgASAAQQJ0IgRqIANB0AFqIARqKgIAIANB0AVqIARqKgIAIgqTIAuUIAqSOAIAIAEgBEEEciIEaiADQdABaiAEaioCACADQdAFaiAEaioCACIKkyALlCAKkjgCACAAQQJqIQAgBUECaiIFIAZHDQALCyACQQFxRQ0AIAEgAEECdCIAaiADQdABaiAAaioCACADQdAFaiAAaioCACIKkyALlCAKkjgCAAsgA0HQCWokAAvPAwEHfyMAQdAFayIDJAAgAigCxAEhBiACKAK4ASEEIAIoAkwhBSAALwEAIQcgA0EEaiIJIAJBzAEQ4gQaIAMgAikCeDcCeCADIAIpAnA3AnAgAyACKQJoNwJoIAMgAikCYDcCYCADIAIpAlg3AlggAyACKQJQNwJQIAMgBiAEIAUgB2wiBUH//wFqQf//A20gBWoiBUEQdSIIbEEBdGo2AsgBIABBAmoiACADQdADaiAJEI0BIAMgBiAEIAggB0H//wNHamxBAXRqNgLIASAAIANB0AFqIAkQjQECQCACKAIMIgJFDQAgBUH//wNxIQZBACEAIAJBAUcEQCACQX5xIQVBACEHA0AgASAAQQF0IgRqIANB0ANqIARqLwEAIgggA0HQAWogBGovAQAgCGsgBmxBgIACakEQdmo7AQAgASAEQQJyIgRqIANB0ANqIARqLwEAIgggA0HQAWogBGovAQAgCGsgBmxBgIACakEQdmo7AQAgAEECaiEAIAdBAmoiByAFRw0ACwsgAkEBcUUNACABIABBAXQiAGogA0HQA2ogAGovAQAiASADQdABaiAAai8BACABayAGbEGAgAJqQRB2ajsBAAsgA0HQBWokAAuZBAIHfwJ9IwBB0AlrIgMkAAJAIAAqAgAiC0NfcIkwXSIFDQAgC7xB/////wdxQYCAgPwHSw0AQwAAgD8gCyALQwAAgD9eGyEKCyACKALEASEGIAogAigCTLOUIgq7RAAAAAAAADhCoL2nQRB1IgggAigCvAEiBGwhCQJ/AkAgBQ0AIAtDAACAP2BFDQBBACALvEH/////B3FBgYCA/AdJDQEaCyAECyEFIANBBGoiByACQcwBEOIEGiADIAIoAoABNgKAASADIAIpAng3AnggAyACKQJwNwJwIAMgAikCaDcCaCADIAIpAmA3AmAgAyACKQJYNwJYIAMgAikCUDcCUCADIAYgCUECdGoiBDYCyAEgAEEEaiIAIANB0AVqIAcQjgEgAyAEIAVBAnRqNgLIASAAIANB0AFqIAcQjgECQCACKAIMIgJFDQAgCiAIspMhC0EAIQAgAkEBRwRAIAJBfnEhBkEAIQUDQCABIABBAnQiBGogA0HQAWogBGoqAgAgA0HQBWogBGoqAgAiCpMgC5QgCpI4AgAgASAEQQRyIgRqIANB0AFqIARqKgIAIANB0AVqIARqKgIAIgqTIAuUIAqSOAIAIABBAmohACAFQQJqIgUgBkcNAAsLIAJBAXFFDQAgASAAQQJ0IgBqIANB0AFqIABqKgIAIANB0AVqIABqKgIAIgqTIAuUIAqSOAIACyADQdAJaiQAC8gNAhF/AX4jAEHQCWsiAyQAIAIoAsQBIQsgAigCUCEGIAIoArwBIQUgAigCTCEJIAAvAQAhCCACKALIASEQIAIpArwBIRQgAigCuAEhCiACKAIMIQQgAC8BAiEHIAMgAkEIaigCADYCCCADIAIpAgA3AwAgAyAENgIMIAMgAigCSDYCSCADQUBrIAJBQGspAgA3AwAgAyACKQI4NwM4IAMgAikCMDcDMCADIAIpAig3AyggAyACKQIgNwMgIAMgAikCGDcDGCADIAIpAhA3AxAgAyACQfwAaikCADcDeCADIAJB9ABqKQIANwNwIAMgAkHsAGopAgA3A2ggAyACQeQAaikCADcDYCADIAJB3ABqKQIANwNYIAMgAikCVDcDUCADIAIpAogBNwOIASADIAIpApABNwOQASADIAIpApgBNwOYASADIAIpAqABNwOgASADIAIpAqgBNwOoASADIAIpArABNwOwASADIAIpAoABNwOAASADIAo2ArgBIAMgFDcCvAEgAyAQNgLIASADIAIpAnw3AnQgAyACKQJ0NwJsIAMgAikCbDcCZCADIAIpAmQ3AlwgAyACKQJcNwJUIAMgAikCVDcCTCADIAsgBSAIIAlsIglB//8BakH//wNtIAlqIhFBEHUiCWxBAXRqIgwgCiAGIAdsIgZB//8BakH//wNtIAZqIg1BEHUiDmxBAXQiEmo2AsQBIABBBGoiBiADQdAHaiAD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QANAIARBgAJqIANBAXRqAn9BACAAIANBAnRqKgIAu0QAAAAA4P/vQKJEAAAAAAAA4D+gIgdEAAAAAAAAAABlDQAaQf//AyAHRAAAAADg/+9AZg0AGiAHRAAAAADA/9/AoEQAAAAAAAA4QqC9QhCIp0H//wFqCzsBACADQQFqIgMgBUcNAAsLIARBgAJqIAQgBigCBCIAIAAoAsgBEQUAAkAgAigCECIARQ0AQQAhAyAAQQFHBEAgAEF+cSECQQAhBgNAIAEgA0ECdGogBCADQQF0ai8BALNDAP9/R5U4AgAgASADQQFyIgVBAnRqIAQgBUEBdGovAQCzQwD/f0eVOAIAIANBAmohAyAGQQJqIgYgAkcNAAsLIABBAXFFDQAgASADQQJ0aiAEIANBAXRqLwEAs0MA/39HlTgCAAsgBEGABGokAA8LQc41Qd0mQcIDQY8vEAAAC0GwNUHdJkHDA0GPLxAAAAuKAQEBfyMAQUBqIgUkACAFIAE2AjggBSABNgI0IAUgATYCMCAFIAE2AiwgBSABNgIoIAUgATYCJCAFIAE2AiAgBSABNgIcIAUgATYCGCAFIAE2AhQgBSABNgIQIAUgATYCDCAFIAE2AgggBSABNgIEIAUgATYCACAAIAUgAiADIAQQygEgBUFAayQACxkAIAAgASACKAIgKAIEIgAgACgCyAERBQALywEBBn8CQCACKAIAIgRBAEwNAEEAIQIgBEEETwRAIARB/P///wdxIQgDQCABIAJBAXQiA2ogACADai8BADsBACABIANBAnIiBWogACAFai8BADsBACABIANBBHIiBWogACAFai8BADsBACABIANBBnIiA2ogACADai8BADsBACACQQRqIQIgB0EEaiIHIAhHDQALCyAEQQNxIgNFDQADQCABIAJBAXQiBGogACAEai8BADsBACACQQFqIQIgBkEBaiIGIANHDQALC0EBC7kLAhF/AXwjAEGgAmsiECQAAkAgAEUNACAAKAIgIgVFDQAgBSgCBCIAKAIIIgtBEGtBcUkNACAAQQxqIggoAgAiCUGAAWtBgX9JDQAgAEEQaiEMIBBCADcDmAIgEEIANwOQAiAQQgA3A4gCIBBCADcDgAIgEEEAQYACEOQEIQZBASERIAshAANAIAggAEECdGooAgAiDUECSQ0BIA2tIA0gEWwiEa1+QiCI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RAAAAAAAAAAAIAArAxihmUQQABAAEADwPmNFDQBEAAAAAAAA8D8gACsDIKGZRBAAEAAQAPA+Y0UNAEQAAAAAAAAAACAAKwMooZlEEAAQABAA8D5jRQ0ARAAAAAAAAAAAIAArAzChmUQQABAAEADwPmNFDQBEAAAAAAAAAAAgACsDOKGZRBAAEAAQAPA+Y0UNAEEBRAAAAAAAAPA/IAArA0ChmUQQABAAEADwPmMNARoLQQALC5ADAQl8IAIrAzAhBiACKwMAIQcgAisDGCEIIAIrAzghCSACKwMIIQogAisDICELIAAgASsDECIDIAIrA0CiIAErAwAiBCACKwMQoiABKwMIIgUgAisDKKKgoDkDECAAIAMgCaIgBCAKoiAFIAuioKA5AwggACADIAaiIAQgB6IgBSAIoqCgOQMAIAIrAzAhBiACKwMAIQcgAisDGCEIIAIrAzghCSACKwMIIQogAisDICELIAAgASsDKCIDIAIrA0CiIAErAxgiBCACKwMQoiABKwMgIgUgAisDKKKgoDkDKCAAIAMgCaIgBCAKoiAFIAuioKA5AyAgACADIAaiIAQgB6IgBSAIoqCgOQMYIAIrAzAhBiACKwMAIQcgAisDGCEIIAIrAzghCSACKwMIIQogAisDICELIAAgASsDQCIDIAIrA0CiIAErAzAiBCACKwMQoiABKwM4IgUgAisDKKKgoDkDQCAAIAMgCaIgBCAKoiAFIAuioKA5AzggACADIAaiIAQgB6IgBSAIoqCgOQMwC+wCAgd8AX8gACsDECAAKwMYIgIgACsDOCIDoiAAKwMwIgUgACsDICIEoqEiB6IgACsDACAEIAArA0AiBKIgAyAAKwMoIgOioSIGoiAAKwMIIAMgBaIgAiAEoqEiA6KgoCICmUQtQxzr4jYaP2MEf0EABSABIAYgAqM5AwAgASAAKwMQIAArAziiIAArA0AgACsDCKKhIAKjOQMIIAArAyghBSAAKwMIIQQgACsDICEGIAArAxAhCCABIAMgAqM5AxggASAEIAWiIAYgCKKhIAKjOQMQIAEgACsDACAAKwNAoiAAKwMwIAArAxCioSACozkDICAAKwMYIQMgACsDECEFIAArAyghBCAAKwMAIQYgASAHIAKjOQMwIAEgBSADoiAEIAaioSACozkDKCABIAArAwggACsDMKIgACsDOCAAKwMAoqEgAqM5AzggASAAKwMAIAArAyCiIAArAxggACsDCKKhIAKjOQNAQQELC6gCAg18AX8gASsDECIEIAErAxgiByABKwM4IgiiIAErAzAiCSABKwMgIgqioSINoiABKwMAIgUgCiABKwNAIguiIAggASsDKCIMoqEiDqIgASsDCCIGIAwgCaIgByALoqEiD6KgoCIDmUQtQxzr4jYaP2MEf0EABSAAIAYgDKIgCiAEoqEgA6MgAisDEKIgDiADoyACKwMAoiAEIAiiIAsgBqKhIAOjIAIrAwiioKA5AwAgACAEIAeiIAwgBaKhIAOjIAIrAxCiIA8gA6MgAisDAKIgBSALoiAJIASioSADoyACKwMIoqCgOQMIIAAgBSAKoiAHIAaioSADoyACKwMQoiANIAOjIAIrAwCiIAYgCaIgCCAFoqEgA6MgAisDCKKgoDkDEEEBCwt6ACAAIAErAxAgAisDEKIgASsDACACKwMAoiABKwMIIAIrAwiioKA5AwAgACABKwMoIAIrAxCiIAErAxggAisDAKIgASsDICACKwMIoqCgOQMIIAAgASsDQCACKwMQoiABKwMwIAIrAwCiIAErAzggAisDCKKgoDkDEAtOAQJ/IABBHBBOIgIEfyACIAA2AgAgAiAAIAFBAiABGyIDQQwQTyIBNgIMIAFFBEAgACACEFFBAA8LIAJBADYCCCACIAM2AgQgAgVBAAsL6gIBCH8jAEEQayIJJAAgAxD+BCEEIAEEQCABLwAAIgFBCHQgAUEIdnIhBwsgAgRAIAIvAAAiAUEIdCABQQh2ciEGC0EAIQICQCAARQ0AIARFBEAgCUEANgIMIABBBCAJQQxqIAdB//8DcSAGQf//A3EQ8gEhAgwBCyAAKAIAIARBBBBPIgFFDQAgBEEETwRAIARBfHEhCwNAIAEgAkECdGogAiADaiwAADYCACABIAJBAXIiBUECdGogAyAFaiwAADYCACABIAJBAnIiBUECdGogAyAFaiwAADYCACABIAJBA3IiBUECdGogAyAFaiwAADYCACACQQRqIQIgCEEEaiIIIAtHDQALCyAEQQNxIggEQANAIAEgAkECdGogAiADaiwAADYCACACQQFqIQIgCkEBaiIKIAhHDQALCyAAIARBAnQgASAHQf//A3EgBkH//wNxEPIBIQIgACgCACABEFELIAlBEGokACACC9cCAQR/AkACQCAAKAIIIgYgACgCBCIFTwRAIAVBAEgNASAAKAIAIAAoAgwgBUEYbBBQIgZFDQEgACAFQQF0NgIEIAAgBjYCDCAAKAIIIQYLAkAgBkUNACAAKAIMIQdBACEFA0ACQCAEIAcgBUEMbGoiCC8BAkYEQCAILwEAIANGDQELIAVBAWoiBSAGRw0BDAILCyAFQQBODQELIAEgACgCECIFIAAoAhQiB2tLBEADQCAFIAVBAXRBgAIgBRsiBUsNAiAAKAIAIAAoAhggBRBQIgZFDQIgACAFNgIQIAAgBjYCGCAFIAAoAhQiB2sgAUkNAAwDCwALIAAoAhgiBg0BC0EADwsgBiAHaiACIAEQ4wQaIAAgACgCFCABajYCFCAAKAIMIAAoAggiBUEMbGoiAiABNgIIIAIgBzYCBCACIAQ7AQIgAiADOwEAIAAgBUEBajYCCEEBC4ABAQJ/IAEEQCABLwAAIgFBCHQgAUEIdnIhBQsgAgRAIAIvAAAiAUEIdCABQQh2ciEEC0EAIQICQCAARQ0AIANFDQAgAyEBA0AgASICQQRqIQEgAigCAA0ACyAAQQQgAiADayACIANGGyADIAVB//8DcSAEQf//A3EQ8gEhAgsgAgufAgEFfwJAAkAgAEUNACAAKAIIIQMgACgCACIFQRwQTiIBRQ0AIAEgBTYCACABIAUgA0ECIAMbIgJBDBBPIgQ2AgwgBEUEQCAFIAEQUUEADwsgAUEANgIIIAEgAjYCBCACIAAoAggiA0kNASAAKAIMIgJFDQEgBCACIANBDGwQ4wQaIAEgACgCCDYCCCAAKAIUIgJFBEAgAUEANgIQIAFBADYCGAwCCyABIAAoAgAgAhBNIgQ2AhggBEUNASABIAAoAhQiAzYCECAAKAIYIgJFDQEgBCACIAMQ4wQaIAEgACgCFDYCFCABIQILIAIPCyABKAIMIgAEQCABKAIAIAAQUQsgASgCGCIABEAgASgCACAAEFELIAEoAgAgARBRQQALOAEBfyAABEAgACgCDCIBBEAgACgCACABEFELIAAoAhgiAQRAIAAoAgAgARBRCyAAKAIAIAAQUQsLrwQBBn8gAQRAIAEvAAAiAUEIdCABQQh2ciEFCyACBEAgAi8AACIBQQh0IAFBCHZyIQYLAkAgAEUNACAAKAIERQ0AIAAoAgwhCEEAIQICfwJAIAAoAggiCQRAQX8hASAFQf//A3EhBSAGQf//A3EhCgNAIAUgCCACQQxsaiIGLwEARgRAIAYvAQIgCkYNAyACIAEgAUF/RhshAQsgAkEBaiICIAlHDQALIAFBACABQX9HGyECCyAAKAIQIAggAkEMbGoiASgCBCIGIAEoAggiAmpJDQIgACgCGCAGagwBCyAGKAIIIQIgACgCGCAGKAIEagshASABRQ0AIAJBAnYhACADRQRAIABBAWoPCyAERQ0AAkAgACAEQQFrIAAgBEkbIgBFDQBBACEGQQAhAiAAQQRPBEAgAEF8cSEHQQAhBANAIAIgA2pBPyABIAJBAnRqKAIAIgUgBUH/AU4bOgAAIAMgAkEBciIFakE/IAEgBUECdGooAgAiBSAFQf8BThs6AAAgAyACQQJyIgVqQT8gASAFQQJ0aigCACIFIAVB/wFOGzoAACADIAJBA3IiBWpBPyABIAVBAnRqKAIAIgUgBUH/AU4bOgAAIAJBBGohAiAEQQRqIgQgB0cNAAsLIABBA3EiBEUNAANAIAIgA2pBPyABIAJBAnRqKAIAIgcgB0H/AU4bOgAAIAJBAWohAiAGQQFqIgYgBEcNAAsLIAAgA2pBADoAACAAQQFqIQcLIAcL6AEBA38CQCACQRBLDQAgAEHYABBOIgVFDQAgBSAANgJUQQAhACAFQQA2AgAgBUEANgJQAkACQCABIAUoAgQiBksEQANAIAUoAlQhByAGQQF0QcAAIAYbIgZBgaAGTwRAIAcgABBRIAVBADYCUAwECyAHIAAgBkGmAmwQUCIARQ0CIAUgBjYCBCAFIAA2AlAgASAGSw0ACwsgBUEMaiADQSAQ/wQgBUEtaiAEQSAQ/wQgBUEAOgAsIAVBADoATSAFIAI2AgggBQ8LIAUoAlAiAEUNACAFKAJUIAAQUQsgBSgCVCAFEFELQQALJQEBfyAABEAgACgCUCIBBEAgACgCVCABEFELIAAoAlQgABBRCwv/AgIGfwR+AkACQCAARQ0AIAAoAlQgACgCACAAKAIIIABBDGoiBCAAQS1qIgUQ9wEiAUUNACABKAIEIgIgACgCBE8EQCABKAJQIQMMAgsgASgCUCEDAkADQCABKAJUIQYgAkEBdEHAACACGyICQYGgBk8EQCAGIAMQUSABQQA2AlAMAgsgBiADIAJBpgJsEFAiAwRAIAEgAjYCBCABIAM2AlAgAiAAKAIETw0EDAELCyABKAJQIgBFDQAgASgCVCAAEFELIAEoAlQgARBRC0EADwsgBCkCCCEHIAQpAhAhCCAEKQIYIQkgBCkCACEKIAEgBC0AIDoALCABIAk3AiQgASAINwIcIAEgBzcCFCABIAo3AgwgBSkACCEHIAUpABAhCCAFKQAYIQkgBSkAACEKIAEgBS0AIDoATSABIAk3AEUgASAINwA9IAEgBzcANSABIAo3AC0gASAAKAIINgIIIAMgACgCUCAAKAIAQaYCbBDjBBogASAAKAIANgIAIAELoAQBCn8CQCAARQ0AIAAoAgQiBCAAKAIAQQFqSQRAIAAoAlAhBSAAKAJUIQYgBEEBdEHAACAEGyIEQYGgBk8EQCAGIAUQUSAAQQA2AlBBAA8LIAYgBSAEQaYCbBBQIgVFDQEgACAENgIEIAAgBTYCUAsCQCAAKAIIIgZFBEAgACgCACEEIAAoAlAhBQwBCyAAKAIAIQQgACgCUCEFIAMEQCAGQQRPBEAgBkF8cSELIAUgBEGmAmxqQYYCaiEJA0AgCSAIQQF0IgdqIAMgB2ovAQA7AQAgCSAHQQJyIgpqIAMgCmovAQA7AQAgCSAHQQRyIgpqIAMgCmovAQA7AQAgCSAHQQZyIgdqIAMgB2ovAQA7AQAgCEEEaiEIIAxBBGoiDCALRw0ACwsgBkEDcSIGRQ0BIAUgBEGmAmxqIQkDQCAJIAhBAXQiB2ogAyAHai8BADsBhgIgCEEBaiEIIA1BAWoiDSAGRw0ACwwBCyAFIARBpgJsakGGAmpBACAGQQF0EOQEGgsCQCACBEAgBSAEQaYCbGoiAyACLwEAOwGAAiADIAIvAQI7AYICIAMgAi8BBDsBhAIMAQsgBEGmAmwgBWoiAkEAOwGEAiACQQA2AYACCyAFIARBpgJsaiECAkAgAQRAIAIgAUH/ARD/BCAAKAJQIAAoAgBBpgJsakEAOgD/AQwBCyACQQA6AAALQQEhCCAAIAAoAgBBAWo2AgALIAgLEAAgAEUEQEEADwsgACgCAAuEAQEBfwJAIABFDQAgACgCACABTQ0AIAIEQCACIAAoAlAgAUGmAmxqEP0ECyADBEAgACgCUCABQaYCbGoiAigBgAIhBSADIAIvAYQCOwEEIAMgBTYBAAsgBEUEQEEBDwtBASEFIAQgACgCUCABQaYCbGpBhgJqIAAoAghBAXQQ4wQaCyAFC4UBAQN/IAAoAlQhAgJ/IAEEQEH3ACEBQQMMAQtB+AAhASAAKAIICyEDIAAQ+QEhBCACQSgQTiIABEAgACAENgIgIABB+gA2AhwgAEH5ADYCGCAAIAE2AhQgACADNgIQIABBATYCDCAAQaDYjfMGNgIIIABBoNiN8wY2AgQgACACNgIACyAAC4oCAwJ/AXwDfSMAQRBrIgMkAAJ9IAIoAiAiBCgCAAJ/QQAgACoCALtEAAAAAOD/70CiRAAAAAAAAOA/oCIFRAAAAAAAAAAAZQ0AGkH//wMgBUQAAAAA4P/vQGYNABogBUQAAAAAwP/fwKBEAAAAAAAAOEKgvadBEHZB//8BakH//wNxCyICTQRAIAQoAlQgAyACNgIAQQJBlyMgAxBUQwAAAAAMAQsgBCgCUCACQaYCbGoiAC8BgAK4RAAAAADg/+9Ao7YhBiAALwGEArhEAAAAAOD/70CjtiEHIAAvAYICuEQAAAAA4P/vQKO2CyEIIAEgBzgCCCABIAg4AgQgASAGOAIAIANBEGokAAuBAwIHfwF8IwBBEGsiAyQAAkACf0EAIAAqAgC7RAAAAADg/+9AokQAAAAAAADgP6AiCkQAAAAAAAAAAGUNABpB//8DIApEAAAAAOD/70BmDQAaIApEAAAAAMD/38CgRAAAAAAAADhCoL2nQRB2Qf//AWpB//8DcQsiBCACKAIgIgIoAgBJBEAgAigCCCIARQ0BIAIoAlAhBUEAIQIgAEEBRwRAIABBfnEhCCAFIARBpgJsakGGAmohBgNAIAEgAkECdGogBiACQQF0ai8BALhEAAAAAOD/70CjtjgCACABIAJBAXIiCUECdGogBiAJQQF0ai8BALhEAAAAAOD/70CjtjgCACACQQJqIQIgB0ECaiIHIAhHDQALCyAAQQFxRQ0BIAEgAkECdGogBSAEQaYCbGogAkEBdGovAYYCuEQAAAAA4P/vQKO2OAIADAELIAIoAlQgAyAENgIAQQJBlyMgAxBUIAIoAggiAEUNACABQQAgAEECdBDkBBoLIANBEGokAAsKACAAKAIgEPkBCyoBAX8gACgCICIABEAgACgCUCIBBEAgACgCVCABEFELIAAoAlQgABBRCwueAgEGfwJAAkAgAUGAAmtBgX5JDQAgAEEMEE4iBEUNACAEIAA2AgQgACABQTAQTyECIAQgATYCACAEIAI2AgggAkUNASABQQNxIQVBACEAIAFBAWtBA08EQCABQfwBcSEHQQAhAQNAIAIgAEEwbGoiA0EANgIsIANCADcCJCACIABBAXJBMGxqIgNBADYCLCADQgA3AiQgAiAAQQJyQTBsaiIDQQA2AiwgA0IANwIkIAIgAEEDckEwbGoiA0EANgIsIANCADcCJCAAQQRqIQAgAUEEaiIBIAdHDQALCyAFBEADQCACIABBMGxqIgFBADYCLCABQgA3AiQgAEEBaiEAIAZBAWoiBiAFRw0ACwsgBCECCyACDwsgACAEEFFBAAuRAgEEfyAABEAgACgCCCIBBEAgACgCAARAA0AgACgCCCICIANBMGwiBGooAiQiAQRAIAEoAgwiAgRAIAEoAgAgAhBRCyABKAIYIgIEQCABKAIAIAIQUQsgASgCACABEFEgACgCCCECCyACIARqKAIoIgEEfyABKAIMIgIEQCABKAIAIAIQUQsgASgCGCICBEAgASgCACACEFELIAEoAgAgARBRIAAoAggFIAILIARqKAIsIgEEQCABKAIMIgIEQCABKAIAIAIQUQsgASgCGCICBEAgASgCACACEFELIAEoAgAgARBRCyADQQFqIgMgACgCAEkNAAsgACgCCCEBCyAAKAIEIAEQUQsgACgCBCAAEFELC9kBAQN/IAAEQCAAKAIAIgMEQANAIAMoAgQiAQRAIAEoAgwiAgRAIAEoAgAgAhBRCyABKAIYIgIEQCABKAIAIAIQUQsgASgCACABEFELIAMoAggiAQRAIAEoAgwiAgRAIAEoAgAgAhBRCyABKAIYIgIEQCABKAIAIAIQUQsgASgCACABEFELIAMoAgwiAgRAIAAoAgQgAhBRCyADKAIQIgIEQCAAKAIEIAIQUQsgAygCACAAKAIEIAMQUSIDDQALCyAAKAIEIAAQUQ8LQbI3QfYnQdIIQd0jEAAAC88BAQJ/AkAgAARAIAFFDQEgACgCBEEUEE4iBUUEQEEADwsgBSADEPQBNgIEIAUgBBD0ATYCCCAAKAIEIQYgASEEA0AgBCIDQQRqIQQgAygCAA0ACyAFIAYgASADIAFrQQRqEFI2AgwgBSACBH8gACgCBCACIQMDQCADIgFBBGohAyABKAIADQALIAIgASACa0EEahBSBUEACzYCECAFIAAoAgA2AgAgACAFNgIAQQEPC0GyN0H2J0H2CEG4CRAAAAtByzlB9idB9whBuAkQAAALqQsBCH8jAEGQAWsiBiQAAkAgACgCACIBRQ0AA0BBACEDIAAhBEEAIQdBACEFAkAgAUUNAANAAkAgASgCCEGg3JHLBkcEQCABQSRqIQQMAQsgBCABKAIkNgIAIAEQxAFBASEDCyAEKAIAIgENAAsgACEHIAAoAgAiAUUEQCADIQcMAQsDQCABKAIkIgIEQCABQSRqIQQCfwJAIAEoAghBoPDJ4QZHDQAgAigCCEGg2MnBB0cNACAEIAIoAiQ2AgAgAhDEASAHIAcoAgAiBSgCJDYCACAFEMQBQQEhBSAHKAIADAELIAQhByACCyIBDQELCyADIAVyIQdBACEFIAAiAygCACIBRQ0AA0AgASgCJCICBEAgAUEkaiEEAn8CQCABKAIIQaDYycEHRw0AIAIoAghBoPDJ4QZHDQAgBCACKAIkNgIAIAIQxAEgAyADKAIAIgUoAiQ2AgAgBRDEAUEBIQUgAygCAAwBCyAEIQMgAgsiAQ0BCwsgBSAHciEHQQAhBSAAIgMoAgAiAUUNAANAIAEoAiQiAgRAIAFBJGohBAJ/AkAgASgCCEGg5IChA0cNACACKAIIQaDogJEDRw0AIAQgAigCJDYCACACEMQBIAMgAygCACIFKAIkNgIAIAUQxAFBASEFIAMoAgAMAQsgBCEDIAILIgENAQsLIAUgB3IhB0EAIQUgACIDKAIAIgFFDQADQCABKAIkIgIEQCABQSRqIQQCfwJAIAEoAghBoOiAkQNHDQAgAigCCEGg5IChA0cNACAEIAIoAiQ2AgAgAhDEASADIAMoAgAiBSgCJDYCACAFEMQBQQEhBSADKAIADAELIAQhAyACCyIBDQELCyAFIAdyIQdBACEFIAAiAygCACIBRQ0AA0AgASgCJCICBEAgAUEkaiEEAn8CQCABKAIIQaDYyaEGRw0AIAIoAghBoMjJ4QZHDQAgBCACKAIkNgIAIAIQxAEgAyADKAIAIgUoAiQ2AgAgBRDEAUEBIQUgAygCAAwBCyAEIQMgAgsiAQ0BCwsgBSAHciEHQQAhBSAAIgMoAgAiAUUNAANAIAEoAiQiAgRAIAFBJGohBAJ/AkAgASgCCEGg8MmhBkcNACACKAIIQaDIycEHRw0AIAQgAigCJDYCACACEMQBIAMgAygCACIFKAIkNgIAIAUQxAFBASEFIAMoAgAMAQsgBCEDIAILIgENAQsLIAUgB3IhB0EAIQVBACECIAAiAygCACIBRQ0AA0AgASgCJCIIBEAgAUEkaiEEAn8CQCABKAIIQebohesGRw0AIAgoAghB5uiF6wZHDQAgCCgCICECIAEoAiAiASgCBA0EIAIoAgQNBCADKAIAIggoAgxBA0cNBCAIKAIQQQNHDQQgBCgCACIIKAIMQQNHDQQgCCgCEEEDRw0EIAYgAigCACABKAIAEOwBIAQgBCgCACIEKAIkIgI2AgAgBBDEASADIAMoAgAiBCgCJDYCACAEEMQBIAZByABqEOoBAkACQCAGKwNIIAYrAwChmUQAAACAtfjkPmNFDQAgBisDUCAGKwMIoZlEAAAAgLX45D5jRQ0AIAYrA1ggBisDEKGZRAAAAIC1+OQ+Y0UNACAGKwNgIAYrAxihmUQAAACAtfjkPmNFDQAgBisDaCAGKwMgoZlEAAAAgLX45D5jRQ0AIAYrA3AgBisDKKGZRAAAAIC1+OQ+Y0UNACAGKwN4IAYrAzChmUQAAACAtfjkPmNFDQAgBisDgAEgBisDOKGZRAAAAIC1+OQ+Y0UNACAGKwOIASAGKwNAoZlEAAAAgLX45D5jDQELIAAoAiBBA0EDIAZBABDGASIERQ0FIAQgAjYCJCADIAQ2AgALQQEhAiADKAIADAELIAQhAyAICyIBDQELCyACIQULIAUgB3JFDQEgACgCACEBDAALAAsgBkGQAWokAAv1BQEHfyMAQRBrIgckACAHQQA2AgwgB0EANgIIAkACQAJAIAIoAgBBFnZBAXENACADKAIAQRZ2QQFxDQAgAi8BAkEfcUEBayICQR1NBH8gAkECdEGUrwFqKAIABUEACyEKIAMvAQJBH3FBAWsiAkEdTQR/IAJBAnRBlK8BaigCAAVBAAshCyAKRQ0AIAtFDQAgCiAEKAIAEKYDIQkgACgCABC/ASEFIAAoAgAiAigCICACKAIEIAIoAggQ3gEiA0UNAAJAAkACQCAELQAAQRBxRQ0AIAIoAgAiCEUNACAIKAIEQfTm2ZsGRw0AIAgQiQINACADQQAgCBDdASIGEOYBRQ0BIAJBACAHQQxqEOcBCyACKAIgIAlBAiAFGyACKAIEIAIoAghBABDOASIIRQ0AIANBASAIEOYBRQ0AQQAhCQJAIAQtAABBAXFFDQAgAhDpASIFRQ0AIAUoAgRB9ObZmwZHDQAgBRCJAg0AIANBASAFEN0BIgkQ5gFFDQEgAkEBIAdBCGoQ5wELIAhB/AAgAhDRAQ0BCyAHKAIMIgAEQCACQQAgABDmAUUNAwsgBygCCCIABEAgAkEBIAAQ5gFFDQQLIAMQ4wFBACEGDAELIAcoAgwiBQRAIAUQxAELIAcoAggiBQRAIAUQxAELIAIQ4wFBACECQQAhBSAGBEAgBigCICgCBCEFCyAIKAIgIQYgCQRAIAkoAiAoAgQhAgsCQCACIAVyRQRAIAYoAgQiAigCyAEhBiADQQA2AhwgAyAGNgIQIANBADYCGCADIAI2AgwMAQsgAygCICAGKAIEIAMoAgQgBSADKAIIIAIQjAIhAiADQf8ANgIcIANB/QA2AhAgA0H+ADYCGCADIAI2AgwLIAQoAgAhAiABQQNGBEAgBCACQQRyIgI2AgALIAJBBHFFBEAgAyAKIAsQjwIaCyAAIAM2AgBBASEGCyAHQRBqJAAgBg8LQaQ2QfUmQesFQekdEAAAC0GkNkH1JkHwBUHpHRAAAAvDAQEGfwJAIAIoAgQiBEUNAEEAIQIgBEEETwRAIARBfHEhCANAIAEgAkEBdCIDaiAAIANqLwEAOwEAIAEgA0ECciIFaiAAIAVqLwEAOwEAIAEgA0EEciIFaiAAIAVqLwEAOwEAIAEgA0EGciIDaiAAIANqLwEAOwEAIAJBBGohAiAHQQRqIgcgCEcNAAsLIARBA3EiA0UNAANAIAEgAkEBdCIEaiAAIARqLwEAOwEAIAJBAWohAiAGQQFqIgYgA0cNAAsLC1QBA38CQAJAIAAoAiAoAgQiAkUNACAAKAIQIgNFBEBBAQ8LQQAhAANAIAIgAEECdGooAgAQZkUNAUEBIQEgAyAAQQFqIgBHDQALDAELQQAhAQsgAQuWAwIGfwF8IwBBgAFrIgQkAAJAIAIoAgQiBUEQSQRAIAIoAghBD0sNAQJAIAVFDQAgBUEBRwRAIAVBDnEhCANAIARBQGsiBiADQQJ0aiAAIANBAXRqLwEAuEQAAAAA4P/vQKO2OAIAIAYgA0EBciIGQQJ0aiAAIAZBAXRqLwEAuEQAAAAA4P/vQKO2OAIAIANBAmohAyAHQQJqIgcgCEcNAAsLIAVBAXFFDQAgBEFAayADQQJ0aiAAIANBAXRqLwEAuEQAAAAA4P/vQKO2OAIACyAEQUBrIAQgAhDkASACKAIIIgIEQEEAIQMDQCABIANBAXRqAn9BACAEIANBAnRqKgIAu0QAAAAA4P/vQKJEAAAAAAAA4D+gIglEAAAAAAAAAABlDQAaQf//AyAJRAAAAADg/+9AZg0AGiAJRAAAAADA/9/AoEQAAAAAAAA4QqC9QhCIp0H//wFqCzsBACADQQFqIgMgAkcNAAsLIARBgAFqJABBAQ8LQYg2QfUmQa8DQYAvEAAAC0HrNUH1JkGwA0GALxAAAAvKAQEFfyMAQUBqIgQkACACKAIEBEAgAkHIAGohBiACQQxqIQcDQCAAIANBAXQiBWogBEEgaiAFaiAGIANBAnQiBWooAgAgBSAHaigCABEFACADQQFqIgMgAigCBEkNAAsLIARBIGogBCACKAKIASACKAKEAREFACACKAIIBEBBACEDA0AgBCADQQF0IgBqIAAgAWogA0ECdCIAIAIoApABaigCACACKAKMASAAaigCABEFACADQQFqIgMgAigCCEkNAAsLIARBQGskAAvyBwEIfwJAIABBlAEQTiIGBEAgBiAENgIIIAYgAjYCBAJAIAJFDQAgBkEMaiEJIAZByABqIQogAwRAIAJBAXEgAkEBRwRAIAJBfnEhDUEAIQIDQCAKIAhBAnQiB2ogAyAHaigCACgCACILNgIAIAcgCWogCygCyAE2AgAgCiAHQQRyIgdqIAMgB2ooAgAoAgAiCzYCACAHIAlqIAsoAsgBNgIAIAhBAmohCCACQQJqIgIgDUcNAAsLRQ0BIAogCEECdCICaiACIANqKAIAKAIAIgM2AgAgAiAJaiADKALIATYCAAwBCyACQQNxIQxBACEDIAJBBE8EQCACQXxxIQ1BACECA0AgCiAHQQJ0IghqQQA2AgAgCCAJakGAATYCACAKIAhBBHIiC2pBADYCACAJIAtqQYABNgIAIAogCEEIciILakEANgIAIAkgC2pBgAE2AgAgCiAIQQxyIghqQQA2AgAgCCAJakGAATYCACAHQQRqIQcgAkEEaiICIA1HDQALCyAMRQ0AA0AgCiAHQQJ0IgJqQQA2AgAgAiAJakGAATYCACAHQQFqIQcgA0EBaiIDIAxHDQALCyAGIAE2AogBIAYgASgCyAE2AoQBIAYgACAEQQQQTyIBNgKMASABBEAgBiAAIARBBBBPIgE2ApABIAEEQCAERQ0DIAUEQEEAIQAgBEEBRwRAIARBfnEhAkEAIQcDQCAAQQJ0IgEgBigCkAFqIAEgBWooAgAoAgA2AgAgBigCjAEgAWogBigCkAEgAWooAgAoAsgBNgIAIAFBBHIiASAGKAKQAWogASAFaigCACgCADYCACAGKAKMASABaiAGKAKQASABaigCACgCyAE2AgAgAEECaiEAIAdBAmoiByACRw0ACwsgBEEBcUUNBCAAQQJ0IgAgBigCkAFqIAAgBWooAgAoAgA2AgAgBigCjAEgAGogBigCkAEgAGooAgAoAsgBNgIADAQLQQAhB0EAIQAgBEEETwRAIARBfHEhAkEAIQgDQCAAQQJ0IgEgBigCkAFqQQA2AgAgBigCjAEgAWpBgAE2AgAgAUEEciIDIAYoApABakEANgIAIAYoAowBIANqQYABNgIAIAFBCHIiAyAGKAKQAWpBADYCACAGKAKMASADakGAATYCACABQQxyIgEgBigCkAFqQQA2AgAgBigCjAEgAWpBgAE2AgAgAEEEaiEAIAhBBGoiCCACRw0ACwsgBEEDcSIBRQ0DA0AgAEECdCICIAYoApABakEANgIAIAYoAowBIAJqQYABNgIAIABBAWohACAHQQFqIgcgAUcNAAsMAwsgACAGKAKMARBRCyAAIAYQUQtBAA8LIAYLHAAgACABKAKMARBRIAAgASgCkAEQUSAAIAEQUQtEAQF/IAAgAUGUARBSIgIEQCACIAAgASgCjAEgASgCCEECdBBSNgKMASACIAAgASgCkAEgASgCCEECdBBSNgKQAQsgAgusDgILfwR8IwBB4AFrIgMkACADQQA2AmQgA0EANgJgIANBADYCXAJAIAEgA0HcAWpBACADQegAahCoA0UNACACIANB2AFqQQAgA0HsAGoQqANFDQAgACgCBCADKAJoRw0AIAAoAgggAygCbEcNACADKALcASADQfAAaiAARQRAQb42Qd0mQakLQaUvEAAACyAAKAIMIAAoAhARBQAgAygCbCICRQRAQQEhCQwBC0EAIQEgAygC2AEhBANAQQEhCSAEIAFBAXQiBWov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KQAgASACLQAAIgBBCHQgAHIiADsBAiABIAA7AQQgASAAOwEAIAJBAWoLKQAgASACLQAAIgBBCHQgAHIiADsBAiABIAA7AQQgASAAOwEAIAJBAmoLKQAgASACLQAAIgBBCHQgAHIiADsBAiABIAA7AQQgASAAOwEAIAJBA2oLLAAgASACLQAAIgBBCHQgAHJBf3MiADsBAiABIAA7AQQgASAAOwEAIAJBAWoLKwAgASACLQAAIgBBCHQgAHI7AQAgASACLQABIgBBCHQgAHI7AQIgAkECagteACABIAItAAAiAEEIdCIDIAByQQh0IANyQQh2OwEAIAEgAi0AASIAQQh0IgMgAHJBCHQgA3JBCHY7AQIgASACLQACIgBBCHQiASAAckEIdCABckEIdjsBBCACQQNqC14AIAEgAi0AASIAQQh0IgMgAHJBCHQgA3JBCHY7AQAgASACLQACIgBBCHQiAyAAckEIdCADckEIdjsBAiABIAItAAMiAEEIdCIBIAByQQh0IAFyQQh2OwEEIAJBBGoLRgAgASACLwEAIgBBCHQgAHJBCHY7AQAgASACLwECIgBBCHQgAHJBCHY7AQIgASACLwEEIgBBCHQgAHJBCHY7AQQgAkEGags9ACABIAItAAAiAEEIdCAAcjsBACABIAItAAEiAEEIdCAAcjsBAiABIAItAAIiAEEIdCAAcjsBBCACQQNqCz0AIAEgAi0AACIAQQh0IAByOwEEIAEgAi0AASIAQQh0IAByOwECIAEgAi0AAiIAQQh0IAByOwEAIAJBA2oLPQAgASACLQABIgBBCHQgAHI7AQQgASACLQACIgBBCHQgAHI7AQIgASACLQADIgBBCHQgAHI7AQAgAkEEags9ACABIAItAAEiAEEIdCAAcjsBACABIAItAAIiAEEIdCAAcjsBAiABIAItAAMiAEEIdCAAcjsBBCACQQRqCz0AIAEgAi0AACIAQQh0IAByOwEEIAEgAi0AASIAQQh0IAByOwECIAEgAi0AAiIAQQh0IAByOwEAIAJBBGoLTwAgASACLQAAIgBBCHQgAHI7AQAgASACLQABIgBBCHQgAHI7AQIgASACLQACIgBBCHQgAHI7AQQgASACLQADIgBBCHQgAHI7AQYgAkEEagtPACABIAItAABB/wFzQYECbDsBACABIAItAAFB/wFzQYEC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BUEOakEBQQEgASgCkAIRAQBBAUcNAyADKAIAIAJBAXRqIAUtAA4iAEEIdCAAcjsBACACQQFqIgIgAygCCEkNAAsMAwsgBhDEASAAKAIUIAUgBS0ADzYCAEEIQfg/IAUQVEEAIQYMAgsgASADKAIIIAMoAgAQrQMNAQsgBhDEAUEAIQYLIAVB4ABqJAAgBgvcAQECfyMAQfAAayIDJAACQCABIAIgASgClAIRAwBFDQAgASADQSBqIgIQsANFDQAgASACQQhyELADRQ0AIAEgA0EwahCwA0UNACABIANBOGoQsANFDQAgASADQUBrELADRQ0AIAEgA0HIAGoQsANFDQAgASADQdAAahCwA0UNACABIANB2ABqELADRQ0AIAEgA0HgAGoQsANFDQAgASADELADRQ0AIAEgA0EIchCwA0UNACABIANBEGoQsANFDQAgACgCFEEDQQMgAiADEMYBIQQLIANB8ABqJAAgBAvUBgEHfyMAQZABayIDJAAgA0EANgKMASADQQA2AogBIANBADYChAEgA0EANgKAASADQQA2AnwgASABKAKcAhECACEGAkACQCACKAIARQ0AIANB9ObZmwY2AnAgAyADQYgBaiIFNgJ0IAJBASADQfAAahC+AQ0AIANB9ObZmwY2AlggA0L05tmb5ozdsO0ANwNQIAMgBTYCZCADIANBgAFqIgc2AmAgAyADQYQBaiIINgJcIAJBAyADQdAAahC+AQ0AIANB9ObZmwY2AjggA0L05tmbxq6dtuMANwMwIAMgBTYCRCADQUBrIANB/ABqIgk2AgAgAyADQYwBaiIKNgI8IAJBAyADQTBqEL4BDQAgA0H05tmbBjYCECADQvTm2ZvmjN2w7QA3AwggA0L05tmbxq6dtuMANwMAIAMgBTYCJCADIAc2AiAgAyAINgIcIAMgCTYCGCADIAo2AhQgAkEFIAMQvgENACAAKAIUQQ1BhytBABBUDAELIAIQ4QEhBSACEOIBIQcgASAFQf8BcRCyA0UNACABIAdB/wFxELIDRQ0AIAFBABCzA0UNACABIAEoApwCEQIAIQogAUEAELUDRQ0AIAFBABC1A0UNACABQQAQtQNFDQAgAUEAELUDRQ0AIAFBABC1A0UNACAGQQhrIQZBACEFQQAhBwJAIAMoAowBBEAgASABKAKcAhECACAAIAEgAygC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ASAAIAEgBSAGahCHBBDmAUUNAQsgBCgCECIFBEAgA0EBIAAgASAFIAZqIAQtAB8QhQQQ5gFFDQELIAQoAgwiBQRAIANBASAAIAEgBSAGaiAELQAfIAQtAB4QhgQQ5gFFDQELIAQoAggiBQRAIANBASAAIAEgBSAGaiAELQAeEIUEEOYBRQ0BCyACQQE2AgAgAyEHDAELIAMQ4wELIARBIGokACAHC8wGAQd/IwBBkAFrIgMkACADQQA2AowBIANBADYCiAEgA0EANgKEASADQQA2AoABIANBADYCfCABIAEoApwCEQIAIQYgA0H05tmbBjYCcCADIANBiAFqIgU2AnQCQAJAIAJBASADQfAAahC+AQ0AIANB9ObZmwY2AlggA0L05tmb5ozdsO0ANwNQIAMgA0GEAWoiBzYCZCADIANBgAFqIgg2AmAgAyAFNgJcIAJBAyADQdAAahC+AQ0AIANB9ObZmwY2AjggA0L05tmbxq6dtuMANwMwIAMgA0GMAWoiCTYCRCADQUBrIANB/ABqIgo2AgAgAyAFNgI8IAJBAyADQTBqEL4BDQAgA0H05tmbBjYCECADQvTm2ZvGrp224wA3AwggA0L05tmb5ozdsO0ANwMAIAMgCTYCJCADIAo2AiAgAyAHNgIcIAMgCDYCGCADIAU2AhQgAkEFIAMQvgENACAAKAIUQQ1BsitBABBUDAELIAIQ4QEhBSACEOIBIQcgASAFQf8BcRCyA0UNACABIAdB/wFxELIDRQ0AIAFBABCzA0UNACABIAEoApwCEQIAIQogAUEAELUDRQ0AIAFBABC1A0UNACABQQAQtQNFDQAgAUEAELUDRQ0AIAFBABC1A0UNACAGQQhrIQZBACEFQQAhBwJAIAMoAowBBEAgASABKAKcAhECACAAIAEgAygCjAEQiQRFDQEgBmshBwsgAygCfARAIAEgASgCnAIRAgAgACABQQFBAiACKAIkGyADKAJ8KAIgEIoERQ0BIAZrIQULQQAhCUEAIQIgAygChAEEQCABIAEoApwCEQIAIAAgASADKAKEARCJBEUNASAGayECCyADKAKAAQRAIAEgASgCnAIRAgAgASADKAKAARCLBEUNASAGayEJC0EAIQRBACEIIAMoAogBBEAgASABKAKcAhECACAAIAEgAygCiAEQiQRFDQEgBmshCAsgASAB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AgwBCyACQQE2AgAgAyEFCyAEQRBqJAAgBQs6AQF/IAEgAigCCCADQTBsaiICQRRqQRBBASABKAKQAhEBAEEBRgR/IAAgASACQSxqIAQQ9wMFQQALCzYAIAEgASgCnAIRAgAhAyABIAIoAgAQtQNFBEBBAA8LIAAgASACKAIAIANBCGsgAkGMAhClBAuEAQACf0EAIAFBECADQTBsIgMgAigCCGpBFGogASgCoAIRBABFDQAaIAIoAgggA2ooAiwhAgJAQQECfyAAKAIYQf///x9NBEAgAUHj5pWjBhC8A0UNAiAAIAEgAiABENoDDAELIAFB4+qx6wYQvANFDQEgASABIAIgARD1AwsNARoLQQALC9YCAQZ/IAEoAgQgAkEEEE8iB0UEQEEADwsCQCABKAIEIAJBBBBPIghFBEBBACEEIAchCAwBCyABIAEoApwCEQIAIQkCfyACBEADQEEAIAFBABC1A0UNAhpBACABQQAQtQNFDQIaIAZBAWoiBiACRw0AC0EAIQYDQCAHIAZBAnQiCmogASABKAKcAhECACILIANrNgIAQQAgACABIAQgBkEAIAURBwBFDQIaIAggCmogASABKAKcAhECACALazYCACAGQQFqIgYgAkcNAAsLIAEgASgCnAIRAgAhAAJAIAEgCSABKAKUAhEDAEUNACACBEBBACEEA0AgASAHIARBAnQiA2ooAgAQtQNFDQIgASADIAhqKAIAELUDRQ0CIARBAWoiBCACRw0ACwtBASABIAAgASgClAIRAwANARoLQQALIQQgASgCBCAHEFELIAEoAgQgCBBRIAQLvgkBEn8jAEHQAGsiBCQAIARBADYCDCAEQQA2AgggAkEANgIAIARCADcDOCAEQgA3AzAgBEIANwMoIARCADcDICAEQgA3AxggBEIANwMQIAEgASgCnAIRAgAhBQJAAkAgA0EEa0EASA0AIAEgBEHIAGoQrgNFDQEgA0EIayIDQQBIDQAgASAEQcQAahCuA0UNASAEKAJEIglBEGsiB0EQTUEAQQEgB3RBgYIEcRtFBEAgACgCFCAEIAk2AgBBCEHjPiAEEFQMAgsgACgCFCIHQQgQTiIJBEAgCSAHNgIECyAJRQ0BAkACQCAAKAIUIARBEGogBCgCSCAEKAJEEKcERQ0AIAQoAkgiC0UNASAFQQhrIQhBACEHIAQo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QQFrIgJqIgMgASACai0AADoAACADQQNxDQALCyACQQNNDQADQCAAIAJBBGsiAmogASACaigCADYCACACQQNLDQALCyACRQ0CA0AgACACQQFrIgJqIAEgAmotAAA6AAAgAg0ACwwCCyACQQNNDQADQCADIAEoAgA2AgAgAUEEaiEBIANBBGohAyACQQRrIgJBA0sNAAsLIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQQFrIgINAAsLIAAL8gICAn8BfgJAIAJFDQAgACABOgAAIAAgAmoiA0EBayABOgAAIAJBA0kNACAAIAE6AAIgACABOgABIANBA2sgAToAACADQQJrIAE6AAAgAkEHSQ0AIAAgAToAAyADQQRrIAE6AAAgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBBGsgATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQQhrIAE2AgAgAkEMayABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkEQayABNgIAIAJBFGsgATYCACACQRhrIAE2AgAgAkEcayABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa1CgYCAgBB+IQUgAyAEaiEBA0AgASAFNwMYIAEgBTcDECABIAU3AwggASAFNwMAIAFBIGohASACQSBrIgJBH0sNAAsLIAALwwQDA3wCfwJ+AnwCQCAAvUI0iKdB/w9xIgVByQdrQT9JBEAgBSEEDAELIAVByQdJBEAgAEQAAAAAAADwP6APCyAFQYkISQ0ARAAAAAAAAAAAIAC9IgZCgICAgICAgHhRDQEaIAVB/w9PBEAgAEQAAAAAAADwP6APCyAGQgBTBEAjAEEQayIERAAAAAAAAAAQOQMIIAQrAwhEAAAAAAAAABCiDwsjAEEQayIERAAAAAAAAABwOQMIIAQrAwhEAAAAAAAAAHCiDwtB+MQBKwMAIACiQYDFASsDACIBoCICIAGhIgFBkMUBKwMAoiABQYjFASsDAKIgAKCgIgEgAaIiACAAoiABQbDFASsDAKJBqMUBKwMAoKIgACABQaDFASsDAKJBmMUBKwMAoKIgAr0iBqdBBHRB8A9xIgVB6MUBaisDACABoKCgIQEgBUHw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ByALIBIgCmsiBmoiDWsgA0gNACAAQSAgAiANIANBAmogByAMQRBqIgdrIgUgBUECayADSBsgBSADGyIJaiIDIAQQiAUgACAIIAsQhAUgAEEwIAIgAyAEQYCABHMQiAUgACAHIAUQhAUgAEEwIAkgBWtBAEEAEIgFIAAgCiAGEIQFIABBICACIAMgBEGAwABzEIgFIAMgAiACIANIGyEJCyAMQbAEaiQAIAkLhgUCBn4BfyABIAEoAgBBB2pBeHEiAUEQajYCACAAIAEpAwAhAyABKQMIIQUjAEEgayIAJAACQCAFQv///////////wCDIgRCgICAgICAwIA8fSAEQoCAgICAgMD/wwB9VARAIAVCBIYgA0I8iIQhBCADQv//////////D4MiA0KBgICAgICAgAhaBEAgBEKBgICAgICAgMAAfCECDAILIARCgICAgICAgIBAfSECIANCgICAgICAgIAIUg0BIAIgBEIBg3whAgwBCyADUCAEQoCAgICAgMD//wBUIARCgICAgICAwP//AFEbRQRAIAVCBIYgA0I8iIRC/////////wODQoCAgICAgID8/wCEIQIMAQtCgICAgICAgPj/ACECIARC////////v//DAFYNAEIAIQIgBEIwiKciAUGR9wBJDQAgAyECIAVC////////P4NCgICAgICAwACEIgQhBgJAIAFBgfcAayIIQcAAcQRAIAMgCEFAaq2GIQZCACECDAELIAhFDQAgBiAIrSIHhiACQcAAIAhrrYiEIQYgAiAHhiECCyAAIAI3AxAgACAGNwMYAkBBgfgAIAFrIgFBwABxBEAgBCABQUBqrYghA0IAIQQMAQsgAUUNACAEQcAAIAFrrYYgAyABrSICiIQhAyAEIAKIIQQLIAAgAzcDACAAIAQ3AwggACkDCEIEhiAAKQMAIgNCPIiEIQIgACkDECAAKQMYhEIAUq0gA0L//////////w+DhCIDQoGAgICAgICACFoEQCACQgF8IQIMAQsgA0KAgICAgICAgAhSDQAgAkIBgyACfCECCyAAQSBqJAAgAiAFQoCAgICAgICAgH+DhL85AwALogEBA38jAEGgAWsiBCQAIAQgACAEQZ4BaiABGyIFNgKUAUF/IQAgBCABQQFrIgZBACABIAZPGzYCmAEgBEEAQZABEOQEIgRBfzYCTCAEQakD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ajYCAAsgAkEgaiQAIAML4gcCB38BfiMAQZABayICJAAgAkHEAGoiASAANgIAIAFBBGoQwQUgAUEgahDABSEDIAEoAgBBzAJqENoFGiADIAEoAgBBoAJqENsFIAEoAgAiBCAEKALMAjYC0AIgASgCACIEIAQoAqACNgKkAiABIQcCQAJAIAAoAgAiASAAKAIERwR/IAEtAAAFQQALwCIBQdQARyABQf8BcUHHAEdxRQRAQei6A0EANgIAQbwDIAAQDiEBQei6AygCAEHougNBADYCAEEBRw0BDAILIAIgADYCQEEAIQEgAkEwaiIEQQA6AAggBEEANgIEIARBADsBACAEIAAoAuwCIAAoAugCa0ECdTYCDEHougNBADYCAEG9AyAAIAQQFSEDQei6AygCAEHougNBADYCAEEBRg0BIAIgAzYCLCADRQ0AQei6A0EANgIAQb4DIAAgBBAVQei6AygCAEHougNBADYCAEEBRg0BDQAgAyEBIAJBQGsQxgUNACACQQA2AiggAiACQSBqQdQqELYFKQIANwMIAkAgACACQQhqELcFBEAgAEEIaiIDIgEoAgQgASgCAGtBAnUhBQNAIABBxQAQuQVFBEBB6LoDQQA2AgBBvwMgABAOIQFB6LoDKAIAQei6A0EANgIAQQFGDQUgAiABNgIYIAFFDQMgAyACQRhqEMgFDAELC0HougNBADYCAEHAAyACQRhqIgMgACAFEBhB6LoDKAIAQei6A0EANgIAQQFGDQMjAEEQayIBJAAgAEGYA2pBEBDkBSABIAMpAgAiCDcDACABIAg3AwhBCUEAQQFBAUEBEOYFIgNBgNYCNgIAIAMgASkCADcCCCABQRBqJAAgAiADNgIoCyACQQA2AhQCQCAELQAADQAgBC0AAUUNAEEAIQFB6LoDQQA2AgBBwQMgABAOIQNB6LoDKAIAQei6A0EANgIAQQFGDQMgAiADNgIUIANFDQILIABB9gAQuQUEQCAAIAJBFGogAkEsaiACQRhqIgBCADcCACAAIAJBKGogBEEEaiAEQQhqEMoFIQEMAgsgAEEIaiIDIgEoAgQgASgCAGtBAnUhBQNAQei6A0EANgIAQcEDIAAQDiEBQei6AygCAEHougNBADYCAEEBRg0DIAIgATYCGCABRQ0BIAMgAkEYaiIBEMgFIAJBQGsQxgVFDQALQei6A0EANgIAQcADIAEgACAFEBhB6LoDKAIAQei6A0EANgIAQQFHBEAgACACQRRqIAJBLGogASACQShqIARBBGogBEEIahDKBSEBDAILDAILQQAhAQsgBxDLBSACQZABaiQAIAEPCxAWIAcQywUQFwALNAECfwJAIAAoAgAiAyAAKAIERg0AIAMtAAAgAUH/AXFHDQBBASECIAAgA0EBajYCAAsgAgt/AQF/IAEoAgAhAyACBEAgAUHuABC5BRoLAkAgASgCACICIAEoAgRGDQAgAiwAAEEwa0EKTw0AA0ACQCABKAIEIAEoAgBGDQAgAiwAAEEwa0EJSw0AIAEgAkEBaiICNgIADAELCyAAIAIgA2s2AgQgACADNgIADwsgAEIANwIAC0MBAX8jAEEQayIDJAAgAEGYA2pBFBDkBSADQQhqIAEQtgUhASACKAIAIQIgAyABKQIANwMAIAMgAhDlBSADQRBqJAAL9SMCCX8BfiMAQSBrIgQkACAEQQA2AhwCQAJAAkAgBAJ/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAKAIAIgEgACgCBEcEfyABLQAABUEAC8AiBkH/AXFBwQBrDjoYIR4XISUfISEhACEZIR0bIRwgGiQAISEhISEhISEhIQUDBBITERQGCQohCwwPECEhAAcIFgECDQ4VIQsCQCAAKAIEIgUgACgCACIBIgdrQQJBASAGQfIARiICGyACIAIgBSABa0kEfyABIAJqLQAABUEAC0H/AXFB1gBGGyICIAUgAWtJBH8gASACai0AAAVBAAtB/wFxQcsARiACaiIBSwR/IAEgB2otAAAFQQALwEH/AXFBxABrDgMAJCUkCyABQQFqIgEgACgCBCAAKAIAIgJrSQR/IAEgAmotAAAFQQALwEH/AXEiAUHvAGsiAkEJSw0iQQEgAnRBgQZxRQ0iDCQLIAAgACgCAEEBajYCACAAQeYkEMwFIQMMJwsgACAAKAIAQQFqNgIAIABBgA8QzAUhAwwmCyAAIAAoAgBBAWo2AgAgAEHMGxDMBSEDDCULIAAgACgCAEEBajYCACAAQaAWEMwFIQMMJAsgACAAKAIAQQFqNgIAIABBmRYQzAUhAwwjCyAAIAAoAgBBAWo2AgAgAEGXFhDMBSEDDCILIAAgACgCAEEBajYCACAAQdYMEMwFIQMMIQsgACAAKAIAQQFqNgIAIABBzQwQzAUhAwwgCyAAIAAoAgBBAWo2AgAgAEG/DRDMBSEDDB8LIAAgACgCAEEBajYCACMAQRBrIgEkACAAQZgDakEQEOQFIAEgAUEIakG2DRC2BSkCADcDACABEO4FIQMgAUEQaiQADB4LIAAgACgCAEEBajYCACAAQdcdEMwFIQMMHQsgACAAKAIAQQFqNgIAIABBzh0QzAUhAwwcCyAAIAAoAgBBAWo2AgAgAEHEHRDMBSEDDBsLIAAgACgCAEEBajYCACMAQRBrIgEkACAAQZgDakEQEOQFIAEgAUEIakG7HRC2BSkCADcDACABEO4FIQMgAUEQaiQADBoLIAAgACgCAEEBajYCACAAQeEuEMwFIQMMGQsgACAAKAIAQQFqNgIAIwBBEGsiASQAIABBmANqQRAQ5AUgASABQQhqQdguELYFKQIANwMAIAEQ7gUhAyABQRBqJAAMGAsgACAAKAIAQQFqNgIAIABBnw4QzAUhAwwXCyAAIAAoAgBBAWo2AgAjAEEQayIBJAAgAEGYA2pBEBDkBSABIAFBCGpBxyIQtgUpAgA3AwAgARDuBSEDIAFBEGokAAwWCyAAIAAoAgBBAWo2AgAgAEHCIhDMBSEDDBULIAAgACgCAEEBajYCACAAQeouEMwFIQMMFAsgACAAKAIAQQFqNgIAIABBmzMQzAUhAwwTCyAAIAAoAgBBAWo2AgAgBEEUaiIDIAAQzQUgAygCBEUNCyAEIAAgAxDOBSIBNgIcDBALAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgACgCBCAAKAIAIgFrQQFLBH8gAS0AAQVBAAvAIgFB/wFxIgJBzwBrDiodISEhIQ0GISEhISEhISEhISEKIQsBAgMhBAchISEhDB0PISEIDQkOHR0ACyACQcIAaw4FBSAgIAQgCyAAIAAoAgBBAmo2AgAgAEHUMBDMBSEDDB8LIAAgACgCAEECajYCACAAQfUuEMwFIQMMHgsgACAAKAIAQQJqNgIAIABB4TAQzAUhAwwdCyAAIAAoAgBBAmo2AgAgAEGkHhDMBSEDDBwLIAAgACgCAEECajYCACAEQRRqIgEgAEEAELoFIAQgACABEM4FNgIQIABB3wAQuQVFDRsgAEGYA2pBDBDkBSAEKAIQIQFBHUEAQQFBAUEBEOYFIgMgATYCCCADQdDdAjYCAAwbCyAEIAFBwgBGOgAPIAAgACgCAEECajYCAAJAIAAoAgAiASAAKAIERwR/IAEtAAAFQQALwEEwa0EJTQRAIARBFGoiASAAQQAQugUgBCAAIAEQzgU2AhAMAQsgBCAAEM8FIgE2AhAgAUUNGwsgAEHfABC5BUUNGiAAQZgDakEQEOQFIAQoAhAhASAELQAPIQJBHkEAQQFBAUEBEOYFIgMgAjoADCADIAE2AgggA0G83gI2AgAMGgsgACAAKAIAQQJqNgIAIABBmQ8QzAUhAwwZCyAAIAAoAgBBAmo2AgAgAEGQDxDMBSEDDBgLIAAgACgCAEECajYCACAAQYgPEMwFIQMMFwsgACAAKAIAQQJqNgIAIABB6BcQzAUhAwwWCyAAIAAoAgBBAmo2AgAgAEGpNBDMBSEDDBULIAAgACgCAEECajYCACAAQfEOEMwFIQMMFAsgABDQBQwQC0EAIQIjAEEgayIBJAAgASABQRhqQfILELYFKQIANwMAAkAgACABELcFRQ0AAkAgACgCACIFIAAoAgRHBH8gBS0AAAVBAAvAQTFrQf8BcUEITQRAIAFBDGoiBSAAQQAQugUgASAAIAUQzgU2AhQgAEHfABC5BUUNAiAAQfAAELkFBEAgAEGYA2pBDBDkBSABKAIUIQVBHEEAQQFBAUEBEOYFIgIgBTYCCCACQaTfAjYCAAwDCyABIAAQvAUiAjYCDCACRQ0BIAAgAUEMaiABQRRqEOwGIQIMAgsgAEHfABC5BUUEQCABIAAQzwUiBTYCDCAFRQ0CIABB3wAQuQVFDQIgASAAELwFIgI2AhQgAkUNASAAIAFBFGogAUEMahDsBiECDAILIAEgABC8BSICNgIMIAJFDQAgAEGYA2pBEBDkBSABKAIMQQAQ+wYhAgwBC0EAIQILIAFBIGokACACDA8LIAAgACgCAEECajYCACAEIAAQvAUiATYCFCABRQ0RIAQgACAEQRRqENEFIgE2AhwMDwsjAEEQayIBJAACQCAAQcEAELkFRQ0AIAFBADYCDAJAIAAoAgAiBSAAKAIERwR/IAUtAAAFQQALwEEwa0EJTQRAIAFBBGoiBSAAQQAQugUgASAAIAUQzgU2AgwgAEHfABC5BQ0BDAILIABB3wAQuQUNACAAEM8FIgVFDQEgAEHfABC5BUUNASABIAU2AgwLIAEgABC8BSICNgIEIAJFBEBBACECDAELIABBmANqQRAQ5AUgASgCBCEFIAEoAgwhBkEOQQBBAEEAQQEQ5gUiAiAGNgIMIAIgBTYCCCACQfjgAjYCAAsgAUEQaiQAIAIMDQsjAEEQayIBJAACf0EAIABBzQAQuQVFDQAaIAEgABC8BSICNgIMAkAgAkUNACABIAAQvAUiAjYCCCACRQ0AIABBmANqQRAQ5AUgASgCDCEFQQ1BACABKAIIIgYtAAVBBnZBAUEBEOYFIgIgBjYCDCACIAU2AgggAkHg4QI2AgAgAgwBC0EACyABQRBqJAAMDAsCQAJAIAAoAgQgACgCACIBa0EBSwR/IAEtAAEFQQALwEH/AXEiAUHzAGsOAwgBCAALIAFB5QBGDQcLIAQgABDSBSIBNgIcIAFFDQcgAC0AhANFDQwgACgCACIDIAAoAgRHBH8gAy0AAAVBAAtB/wFxQckARw0MIAQgAEEAENMFIgM2AhQgA0UNByAEIAAgBEEcaiAEQRRqENQFIgE2AhwMDAsgACAAKAIAQQFqNgIAIAQgABC8BSIDNgIUIANFDQYgAEGYA2pBDBDkBUELQQAgBCgCFCIDLQAFQQZ2QQFBARDmBSIBIAM2AgggAUHE4wI2AgAgBCABNgIcDAsLIAAgACgCAEEBajYCACAEIAAQvAUiAzYCFCADRQ0FIARBADYCECAEIAAgBEEUaiAEQRBqENUFIgE2AhwMCgsgACAAKAIAQQFqNgIAIAQgABC8BSIDNgIUIANFDQQgBEEBNgIQIAQgACAEQRRqIARBEGoQ1QUiATYCHAwJCyAAIAAoAgBBAWo2AgAgBCAAELwFIgE2AhQgAUUNCiMAQRBrIgMkACAAQZgDakEUEOQFIAQoAhQgAyADQQhqQfkKELYFKQIANwMAIAMQiQchASADQRBqJAAgBCABNgIcDAgLIAAgACgCAEEBajYCACAEIAAQvAUiAzYCFCADRQ0CIwBBEGsiAyQAIABBmANqQRQQ5AUgBCgCFCADIANBCGpByAkQtgUpAgA3AwAgAxCJByEBIANBEGokACAEIAE2AhwMBwsgACgCBCAAKAIAIgFrQQFLBH8gAS0AAQVBAAtB/wFxQfQARg0AIARBADoAECAEIABBACAEQRBqENYFIgE2AhwgAUUNCCAELQAQIQIgACgCACIFIAAoAgRHBH8gBS0AAAVBAAtB/wFxQckARgRAIAIEQCAALQCEA0UNCQsgAkUEQCAAQZQBaiAEQRxqEMgFCyAEIABBABDTBSIBNgIUIAFFDQkgBCAAIARBHGogBEEUahDUBSIBNgIcDAcLIAEhAyACRQ0GDAgLIwBBQGoiASQAIAFCADcCOCABIAFBMGpBrhIQtgUpAgA3AxACQCAAIAFBEGoQtwUEQCABIAFBKGpBgg4QtgUpAwA3AzgMAQsgASABQSBqQfULELYFKQIANwMIIAAgAUEIahC3BQRAIAEgAUEoakGZGRC2BSkDADcDOAwBCyABIAFBGGpBtyQQtgUpAgA3AwAgACABELcFRQ0AIAEgAUEoakHpGRC2BSkDADcDOAsgASAAQQAQxAUiAjYCKAJ/QQAgAkUNABogAiABKAI8RQ0AGiMAQRBrIgIkACAAQZgDakEUEOQFIAIgASkCOCIKNwMIIAEoAighBiACIAo3AwBBBkEAQQFBAUEBEOYFIgVB0OICNgIAIAIpAgAhCiAFIAY2AhAgBSAKNwIIIAJBEGokACAFCyABQUBrJAAMBAtBACEDDAYLIAFBzwBGDQELIAAQ1wUMAQsjAEGAAWsiASQAIAEgABDyBTYCfCABQQA2AnggASABQfAAakH6FxC2BSkCADcDMAJ/AkACQCAAIAFBMGoQtwUEQCABIABB3AwQzAU2AngMAQsgASABQegAakGzKhC2BSkCADcDKCAAIAFBKGoQtwUEQCABIAAQzwUiAjYCWCACRQ0CIABBxQAQuQVFDQIgAEGYA2pBDBDkBSABKAJYIQVBEEEAQQFBAUEBEOYFIgIgBTYCCCACQcTYAjYCACABIAI2AngMAQsgASABQeAAakHvCxC2BSkCADcDICAAIAFBIGoQtwVFDQAgAEEIaiICKAIEIAIoAgBrQQJ1IQUDQCAAQcUAELkFRQRAIAEgABC8BSIGNgJYIAZFDQMgAiABQdgAahDIBQwBCwsgAUHYAGogACAFEMkFIwBBEGsiAiQAIABBmANqQRAQ5AUgAiABKQJYIgo3AwAgAiAKNwMIQRFBAEEBQQFBARDmBSIFQbDZAjYCACAFIAIpAgA3AgggAkEQaiQAIAEgBTYCeAsgASABQdAAakGYCxC2BSkCADcDGCAAIAFBGGoQtwUaQQAgAEHGABC5BUUNARogAEHZABC5BRogASAAELwFIgI2AkwgAkUNACABQQA6AEsgAEEIaiICKAIEIAIoAgBrQQJ1IQUDQAJAAkAgAEHFABC5BQ0AIABB9gAQuQUNAiABIAFBQGtB6SoQtgUpAgA3AxAgACABQRBqELcFBEAgAUEBOgBLDAELIAEgAUE4akHsKhC2BSkCADcDCCAAIAFBCGoQtwVFDQEgAUECOgBLCyABQdgAaiAAIAUQyQUjAEEQayIFJAAgAEGYA2pBIBDkBSABKAJMIQYgBSABKQJYIgo3AwggASgCeCEHIAEtAEshCCABKAJ8IQkgBSAKNwMAQQ9BAEEAQQFBABDmBSICIAY2AgggAkGk2gI2AgAgBSkCACEKIAIgBzYCHCACIAg6ABggAiAJNgIUIAIgCjcCDCAFQRBqJAAgAgwDCyABIAAQvAUiBjYCWCAGRQ0BIAIgAUHYAGoQyAUMAAsAC0EACyABQYABaiQACyIBNgIcIAFFDQILIABBlAFqIARBHGoQyAULIAEhAwsgBEEgaiQAIAMLUAEBfwJAIAAoAgQgAWoiASAAKAIIIgJNDQAgACACQQF0IgIgAUHgB2oiASABIAJJGyIBNgIIIAAgACgCACABEJEFIgA2AgAgAA0AEJgFAAsLGQEBfyAAKAIAIgEgAEEMakcEQCABEJAFCwstAQF/IAAgAEGMAWo2AgggACAAQQxqIgE2AgQgACABNgIAIAFBAEGAARDkBBoLPwEBfyAAQgA3AgwgACAAQSxqNgIIIAAgAEEMaiIBNgIEIAAgATYCACAAQgA3AhQgAEIANwIcIABCADcCJCAACzEBAX8gAEIANwIMIAAgAEEcajYCCCAAIABBDGoiATYCBCAAIAE2AgAgAEIANwIUIAALYwIEfwJ+IwBBIGsiAiQAIAEoAgQiBSAAKAIEIgNNBEAgACAFNgIEIAIgACkCACIGNwMYIAIgASkCACIHNwMQIAIgBjcDCCACIAc3AwAgAkEIaiACENgFIQQLIAJBIGokACAEC44NAQR/IwBBEGsiAyQAAkACQAJAIAAoAgAiAiAAKAIERwR/IAItAAAFQQALwCICQccARwRAIAJB/wFxQdQARw0DAkACQAJAAkACQAJAAkACQAJAAkACQCAAKAIEIAAoAgAiAmtBAUsEfyACLQABBUEAC8BB/wFxIgRBwQBrDgkBCgYKCgoKCAQACyAEQdMAaw4FBAIJAQYICyAAIAJBAmo2AgAgAyAAEMcFIgE2AgQgAUUNCyMAQRBrIgEkACAAQZgDakEUEOQFIAFBCGpBisUAELYFIQIgAygCBCEEIAEgAikCADcDACABIAQQ5QUgAUEQaiQAIQEMDAsgACACQQJqNgIAIAMgABC8BSIBNgIEIAFFDQojAEEQayIBJAAgAEGYA2pBFBDkBSABQQhqQaLGABC2BSECIAMoAgQhBCABIAIpAgA3AwAgASAEEOUFIAFBEGokACEBDAsLIAAgAkECajYCACADIAAQvAUiATYCBCABRQ0JIwBBEGsiASQAIABBmANqQRQQ5AUgAUEIakHCxgAQtgUhAiADKAIEIQQgASACKQIANwMAIAEgBBDlBSABQRBqJAAhAQwKCyAAIAJBAmo2AgAgAyAAELwFIgE2AgQgAUUNCCMAQRBrIgEkACAAQZgDakEUEOQFIAFBCGpBqcUAELYFIQIgAygCBCEEIAEgAikCADcDACABIAQQ5QUgAUEQaiQAIQEMCQsgACACQQJqNgIAIAMgABC8BSIBNgIEIAFFDQcjAEEQayIBJAAgAEGYA2pBFBDkBSABQQhqQYLGABC2BSECIAMoAgQhBCABIAIpAgA3AwAgASAEEOUFIAFBEGokACEBDAgLIAAgAkECajYCACADIAAQvAUiAjYCDCACRQ0HIANBBGoiAiAAQQEQugUgAigCBEUNByAAQd8AELkFRQ0HIAMgABC8BSIBNgIEIAFFDQYgAEGYA2pBEBDkBSACKAIAIQEgAygCDCECQRVBAEEBQQFBARDmBSIAIAI2AgwgACABNgIIIABB5J8CNgIAIAAhAQwHCyAAIAJBAmo2AgAgAyAAQQAQxAUiAjYCBCACRQ0GIABBt8UAIANBBGoQuwUhAQwGCyAAIAJBAmo2AgAgAyAAQQAQxAUiAjYCBCACRQ0FIwBBEGsiASQAIABBmANqQRQQ5AUgAUEIakHZxQAQtgUhAiADKAIEIQQgASACKQIANwMAIAEgBBDlBSABQRBqJAAhAQwFCyAEQeMARg0CCyAAIAJBAWo2AgAgACgCACICIAAoAgRHBH8gAi0AAAVBAAvAIAAQ3AUNAyADIAAQuAUiATYCBCABRQ0CQfYARgRAIwBBEGsiASQAIABBmANqQRQQ5AUgAUEIakHqxgAQtgUhAiADKAIEIQQgASACKQIANwMAIAEgBBDlBSABQRBqJAAhAQwECyMAQRBrIgEkACAAQZgDakEUEOQFIAFBCGpB5sYAELYFIQIgAygCBCEEIAEgAikCADcDACABIAQQ5QUgAUEQaiQAIQEMAwsCQAJAAkAgACgCBCAAKAIAIgJrQQFLBH8gAi0AAQVBAAvAQf8BcSICQdIAaw4FAQUFBQACCyAAIAAoAgBBAmo2AgAgAyAAQQAQxAUiAjYCBCACRQ0EIwBBEGsiASQAIABBmANqQRQQ5AUgAUEIakGuxgAQtgUhAiADKAIEIQQgASACKQIANwMAIAEgBBDlBSABQRBqJAAhAQwECyAAIAAoAgBBAmo2AgAgAyAAQQAQxAUiAjYCBCACRQ0DIAAgA0EMahDdBSAAQd8AELkFIQJFBEBBACEBIAJFDQQLIwBBEGsiASQAIABBmANqQRQQ5AUgAUEIakHxxAAQtgUhAiADKAIEIQQgASACKQIANwMAIAEgBBDlBSABQRBqJAAhAQwDCyACQckARw0CIAAgACgCAEECajYCACADQQA2AgQgACADQQRqIgIQ3gUNAiADKAIERQ0CIwBBEGsiASQAIABBmANqQRQQ5AUgAUEIakG7xwAQtgUhBCACKAIAIQIgASAEKQIANwMAIAEgAhDlBSABQRBqJAAhAQwCCyAAIAJBAmo2AgAgABDcBQ0BIAAQ3AUNASADIAAQuAUiATYCBCABRQ0AIwBBEGsiASQAIABBmANqQRQQ5AUgAUEIakHLxgAQtgUhAiADKAIEIQQgASACKQIANwMAIAEgBBDlBSABQRBqJAAhAQwBC0EAIQELIANBEGokACABC5gIAQZ/IwBBEGsiBSQAAn8CQCAAKAIAIgIgACgCBEcEfyACLQAABUEAC8AiAkHaAEcEQCACQf8BcUHOAEcNASABIQNBACEBIwBBEGsiBCQAAkAgACICQc4AELkFRQ0AIAAQ8gUhACADBEAgAyAANgIECwJAAkAgAkHPABC5BQRAQQIhACADDQEMAgsgAkHSABC5BSEAIANFDQELIAMgADoACAsgBEEANgIMIAJBlAFqIQdBACEAA0ACQAJAIAQCfwJAIAJBxQAQuQVFBEAgAwRAIANBADoAAQtBACEBAkACQAJAAkACQCACKAIAIgYgAigCBEcEfyAGLQAABUEAC8BB/wFxIgZB0wBrDgIDAQALIAZBxABGDQEgBkHJAEcNBSAARQ0KIAQgAiADQQBHENMFIgY2AgggBkUNCiAALQAEQSlGDQogAwRAIANBAToAAQsgBCACIARBDGogBEEIahDUBSIANgIMDAcLIABFDQIMBwsgAigCBCACKAIAIgZrQQFLBH8gBi0AAQVBAAvAQSByQf8BcUH0AEcNAyAADQYgAhDQBQwECwJAIAIoAgQgAigCACIBa0EBSwR/IAEtAAEFQQALQf8BcUH0AEYEQCACIAIoAgBBAmo2AgAgAkG6JBDMBSEBDAELIAIQ8wUiAUUNBgsgAS0ABEEZRg0CIAANBSAEIAE2AgwgASEADAYLIAIQ0gUMAgtBACEBIABFDQUgBygCACAHKAIERg0FIAcQ9AUgACEBDAULIAIgAyAAIAEQ9QULIgA2AgwgAEUNAQsgByAEQQxqEMgFIAJBzQAQuQUaDAELC0EAIQELIARBEGokACABDAILIwBBEGsiAiQAAkAgAEHaABC5BUUNACACIAAQuAUiBDYCDCAERQ0AIABBxQAQuQVFDQAgAEHzABC5BQRAIAAgACgCACAAKAIEEPYFNgIAIAIgAEHiGxDMBTYCBCAAIAJBDGogAkEEahD3BSEDDAELAkAgAEHkABC5BQRAIAJBBGoiBCAAQQEQugUgAEHfABC5BUUNAiACIAAgARDEBSIBNgIEIAFFDQEgACACQQxqIAQQ9wUhAwwCCyACIAAgARDEBSIBNgIEIAFFDQAgACAAKAIAIAAoAgQQ9gU2AgAgACACQQxqIAJBBGoQ9wUhAwsLIAJBEGokACADDAELIAVBADoACyAFIAAgASAFQQtqENYFIgI2AgxBACACRQ0AGiAFLQALIQMgACgCACIEIAAoAgRHBH8gBC0AAAVBAAtB/wFxQckARgRAIANFBEAgAEGUAWogBUEMahDIBQsgBSAAIAFBAEcQ0wUiAjYCBEEAIAJFDQEaIAEEQCABQQE6AAELIAAgBUEMaiAFQQRqENQFDAELQQAgAiADGwsgBUEQaiQAC8IBAQZ/IABB6AJqIgQiAigCBCACKAIAa0ECdSIFIAEoAgwiAiACIAVJGyEGIABBzAJqIQACQANAIAIgBkcEQCAEIAIQ3wUoAgAoAgghAyAAKAIAIAAoAgRGDQIgAEEAEN8FKAIARQ0CIAMgAEEAEN8FKAIAIgcoAgQgBygCAGtBAnVPDQIgAEEAEN8FKAIAIAMQ3wUoAgAhAyAEIAIQ3wUoAgAgAzYCDCACQQFqIQIMAQsLIAQgASgCDBDgBQsgAiAFSQtWAQF/IAAoAgAiACgCBCAAKAIARgRAQQEPCyAAKAIAIgEgACgCBEcEfyABLQAABUEAC8BBLmsiAEH/AXFBMU0Ef0KBgICEgICAASAArYinQQFxBUEACwuJAwIEfwF+IwBBEGsiAiQAAn8CQAJAAkACQAJAIAAoAgAiASAAKAIERwR/IAEtAAAFQQALwEH/AXEiAUHKAGsOAwEDAgALIAFB2ABHDQIgACAAKAIAQQFqNgIAIAAQzwUiAUUNAyABQQAgAEHFABC5BRsMBAsgACAAKAIAQQFqNgIAIABBCGoiASgCBCABKAIAa0ECdSEEA0AgAEHFABC5BUUEQCACIAAQxwUiAzYCDCADRQ0EIAEgAkEMahDIBQwBCwsgAkEEaiIDIAAgBBDJBSMAQRBrIgEkACAAQZgDakEQEOQFIAEgAykCACIFNwMAIAEgBTcDCEElQQBBAUEBQQEQ5gUiAEGM1QI2AgAgACABKQIANwIIIAFBEGokACAADAMLIAAoAgQgACgCACIBa0EBSwR/IAEtAAEFQQALQf8BcUHaAEYEQCAAIAAoAgBBAmo2AgAgABC4BSIBRQ0CIAFBACAAQcUAELkFGwwDCyAAEOEFDAILIAAQvAUMAQtBAAsgAkEQaiQAC8MBAQN/IAAoAgQiAyICIAAoAghGBEAgAiAAKAIAIgJrQQJ1QQF0IQQgAyACa0ECdSEDAkACQAJAIABBDGogAkYEQCAEQQJ0EI8FIgJFDQIgACgCACAAKAIEIAIQ4gUgACACNgIADAELIAAgACgCACAEQQJ0EJEFIgI2AgAgAkUNAQsgACACIARBAnRqNgIIIAAgAiADQQJ0ajYCBAwBCxCYBQALIAAoAgQhAgsgASgCACEBIAAgAkEEajYCBCACIAE2AgALcAEDfyACIAFBCGoiAygCBCADKAIAa0ECdUsEQEHhO0GHHUGxE0G1ChAAAAsgAygCACACQQJ0aiIEIAMoAgQiBSABQZgDaiAFIARrQQJ1IgFBAnQQ5AUiBBDiBSAAIAE2AgQgACAENgIAIAMgAhDgBQugAQIBfwF+IwBBEGsiByQAIABBmANqQSQQ5AUgAigCACECIAEoAgAhASAHIAMpAgAiCDcDCCAGLQAAIQMgBSgCACEFIAQoAgAhBCAHIAg3AwBBEkEAQQBBAUEAEOYFIgAgAjYCDCAAIAE2AgggAEHs1gI2AgAgBykCACEIIAAgAzoAICAAIAU2AhwgACAENgIYIAAgCDcCECAHQRBqJAAgAAs1AQF/IAAoAgBBzAJqIABBBGoiARDaBRogACgCAEGgAmogAEEgaiIAENsFIAAQvgUgARC+BQs2AQF/IwBBEGsiAiQAIABBmANqQRAQ5AUgAiACQQhqIAEQtgUpAgA3AwAgAhDuBSACQRBqJAALbwEDfyMAQRBrIgIkACACQQA2AgwCQAJAIAEgAkEMahDtBUUEQCACKAIMIgMgASgCBCABKAIAa00NAQsgAEIANwIADAELIAEoAgAhBCAAIAM2AgQgACAENgIAIAEgASgCACADajYCAAsgAkEQaiQACzkCAX8BfiMAQRBrIgIkACAAQZgDakEQEOQFIAIgASkCACIDNwMAIAIgAzcDCCACEO4FIAJBEGokAAukLAIHfwJ+IwBBwAJrIgIkACACIAJBtAJqQbcQELYFKQIANwOAASACIAAgAkGAAWoQtwUiBToAvwICQAJAAkACQAJAAkACQAJAIAAQhQYiAwRAIAJBqAJqIAMQhgYCQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAy0AAkEBaw4MAgADBAUGBwgJFAoLAQsgAiACKQOoAjcDoAIgAywAA0EBdSEBIAIgAikDoAI3A2AjAEEQayIDJAAgAyABNgIMIAMgABDPBSIBNgIIAn8CQCABRQ0AIAMgABDPBSIBNgIEIAFFDQAjAEEQayIBJAAgAEGYA2pBGBDkBSADKAIIIQQgASACKQJgIgg3AwggAygCDCEFIAMoAgQhBiABIAg3AwBBMiAFQQFBAUEBEOYFIgAgBDYCCCAAQZinAjYCACABKQIAIQggACAGNgIUIAAgCDcCDCABQRBqJAAgAAwBC0EACyEBIANBEGokAAwTCyACIAIpA6gCNwOYAiADLAADQQF1IQEgAiACKQOYAjcDaCAAIAJB6ABqIAEQhwYhAQwSCyAAQd8AELkFBEAgAiACKQOoAjcDkAIgAywAA0EBdSEBIAIgAikDkAI3A3AgACACQfAAaiABEIcGIQEMEgsgAiAAEM8FIgE2AoQCIAFFDRAgAiADLAADQQF1NgL0ASMAQRBrIgMkACAAQZgDakEUEOQFIAIoAoQCIQQgAyACKQKoAiIINwMIIAIoAvQBIQEgAyAINwMAQTQgAUEBQQFBARDmBSIBIAQ2AgggAUHoqAI2AgAgASADKQIANwIMIANBEGokAAwRCyACIAAQzwUiATYChAIgAUUNDyACIAAQzwUiATYC9AEgAUUNDyACIAMsAANBAXU2AowCIABBmANqQRAQ5AUgAigChAIhAyACKAL0ASEEQTMgAigCjAJBAUEBQQEQ5gUiASAENgIMIAEgAzYCCCABQdCpAjYCAAwQCyACIAAQzwUiATYChAIgAUUNDiACIAAQzwUiATYC9AEgAUUNDiACIAMsAANBAXU2AowCIwBBEGsiAyQAIABBmANqQRgQ5AUgAigChAIhBCADIAIpAqgCIgg3AwggAigCjAIhASACKAL0ASEFIAMgCDcDAEE2IAFBAUEBQQEQ5gUiASAENgIIIAFBwKoCNgIAIAMpAgAhCCABIAU2AhQgASAINwIMIANBEGokAAwPCyAAQQhqIgQoAgQgBCgCAGtBAnUhBQNAIABB3wAQuQVFBEAgAiAAEM8FIgY2AoQCIAZFDRAgBCACQYQCahDIBQwBCwsgAkGEAmogACAFEMkFIAIgABC8BSIFNgKMAiAFRQ0OIAIgAkH8AWpBoBwQtgUpAgA3A3ggACACQfgAahC3BSEFIAQoAgQgBCgCAGtBAnUhBgNAIABBxQAQuQVFBEAgBUUNECACIAAQzwUiBzYC9AEgB0UNECAEIAJB9AFqEMgFDAELCyACQfQBaiAAIAYQyQUgAiADLQADQQFxOgDzASACIAMsAANBAXU2AuwBIwBBIGsiAyQAIABBmANqQSAQ5AUgAyACKQKEAiIINwMYIAIoAowCIQQgAyACKQL0ASIJNwMQIAIoAuwBIQEgAi0A8wEhBSACLQC/AiEGIAMgCDcDCCADIAk3AwBBPCABQQFBAUEBEOYFIgFBqKsCNgIAIAMpAgghCCABIAQ2AhAgASAINwIIIAMpAgAhCCABIAU6AB0gASAGOgAcIAEgCDcCFCADQSBqJAAMDgsgAiAAEM8FIgE2AoQCIAFFDQwgAiADLQADQQFxOgCMAiACIAMsAANBAXU2AvQBIABBmANqQRAQ5AUgAigChAIhAyACLQC/AiEEIAItAIwCIQVBPSACKAL0AUEBQQFBARDmBSIBIAU6AA0gASAEOgAMIAEgAzYCCCABQYysAjYCAAwNCyACIAAQzwUiBDYC9AEgBEUNDCAAQQhqIgQoAgQgBCgCAGtBAnUhBQNAIABBxQAQuQVFBEAgAiAAEM8FIgY2AoQCIAZFDQ4gBCACQYQCahDIBQwBCwsgAkGEAmoiASAAIAUQyQUgAiADLAADQQF1NgKMAiAAIAJB9AFqIAEgAkGMAmoQiAYhAQwMCyACIABBhANqNgKEAiACIAAtAIQDOgCIAiAAQQA6AIQDQei6A0EANgIAQcEDIAAQDiEEQei6AygCAEHougNBADYCAEEBRg0EIAIgBDYC9AEgAigChAIgAi0AiAI6AAAgBEUNCyAAQQhqIgYiBCgCBCAEKAIAa0ECdSEEIABB3wAQuQUhBQNAIABBxQAQuQUNBiACIAAQzwUiBzYChAIgB0UNDCAGIAJBhAJqIgcQyAUgBQ0ACyAHIAAgBBDJBQwICyACIAAQzwUiATYChAIgAUUNCSACIAAQzwUiATYC9AEgAUUNCSACIAAQzwUiATYCjAIgAUUNCSACIAMsAANBAXU2AuwBIABBmANqQRQQ5AUgAigChAIhAyACKAL0ASEEIAIoAowCIQVBNSACKALsAUEBQQFBARDmBSIBIAU2AhAgASAENgIMIAEgAzYCCCABQcSuAjYCAAwKCyACIAAQvAUiATYChAIgAUUNCCACIAAQzwUiATYC9AEgAUUNCCACIAMsAANBAXU2AowCIwBBEGsiAyQAIABBmANqQRgQ5AUgAyACKQKoAiIINwMIIAIoAowCIQEgAigC9AEhBCACKAKEAiEFIAMgCDcDAEE5IAFBAUEBQQEQ5gUiAUGwrwI2AgAgAykCACEIIAEgBDYCFCABIAU2AhAgASAINwIIIANBEGokAAwJCyACAn8gAy0AA0EBcQRAIAAQvAUMAQsgABDPBQsiATYChAIgAUUNByACIAMsAANBAXU2AvQBIwBBEGsiAyQAIABBmANqQRwQ5AUgAyACKQKoAiIINwMIIAIoAvQBIQEgAigChAIhBCADIAg3AwAgAyAEIAEQpQYhASADQRBqJAAMCAsgACgCBCIEIAAoAgAiA2tBAkkNBwJAIAMgBEcEfyADLQAABUEAC8AiAUHmAEcEQCABQf8BcSIBQdQARwRAIAFBzABHDQIgABDhBSEBDAoLIAAQ0gUhAQwJCwJAIAAoAgQgACgCACIBa0EBSwR/IAEtAAEFQQALwCIBQfAARwRAIAFB/wFxQcwARw0BIAAoAgQgACgCACIBa0ECSwR/IAEtAAIFQQALwEEwa0EJSw0BCyAAEIkGIQEMCQtBACEDQQAhASMAQSBrIgQkAAJAIABB5gAQuQVFDQAgBEEAOgAfAn9BACAAKAIAIgUgACgCBEcEfyAFLQAABUEAC8AiBUHyAEYNABoCQCAFQf8BcSIFQdIARwRAIAVB7ABGDQEgBUHMAEcNA0EBIQEgBEEBOgAfQQEMAgtBAQwBC0EBIQEgBEEBOgAfQQALIQYgACAAKAIAQQFqNgIAIAAQhQYiBUUNAAJAAkAgBS0AAkECaw4DAQIAAgsgBEEUaiAFEI8GIAQoAhQgBCgCGGpBAWstAABBKkcNAQsgBCAAEM8FIgc2AhAgB0UNACAEQQA2AgwCQCAGRQ0AIAQgABDPBSIHNgIMIAdFDQEgASAGcUUNACAEKAIQIQEgBCAEKAIMNgIQIAQgATYCDAsgBEEUaiAFEIYGIwBBEGsiASQAIABBmANqQRwQ5AUgBC0AHyEFIAEgBCkCFCIINwMIIAQoAgwhBiAEKAIQIQcgASAINwMAQcMAQQBBAUEBQQEQ5gUiAyAGNgIMIAMgBzYCCCADQfC+AjYCACABKQIAIQggAyAFOgAYIAMgCDcCECABQRBqJAALIARBIGokACADIQEMCAsgAiACQeQBakHfGxC2BSkCADcDWCAAIAJB2ABqELcFBEAgAEEIaiIBKAIEIAEoAgBrQQJ1IQMDQCAAQcUAELkFRQRAIAIgABCKBiIENgKoAiAERQ0JIAEgAkGoAmoQyAUMAQsLIAJBqAJqIAAgAxDJBSMAQRBrIgMkACAAQZgDakEUEOQFIAMgAikCqAIiCDcDACADIAg3AwhBACADEMcGIQEgA0EQaiQADAgLIAIgAkHcAWpBwiYQtgUpAgA3A1AgACACQdAAahC3BQRAIwBBIGsiAyQAIANBAjYCHCADIAAQvAUiATYCGAJ/AkAgAUUNACADIAAQzwUiATYCFCABRQ0AIANBDGogAEEBELoFQQAgAEHFABC5BUUNARojAEEQayIBJAAgAEGYA2pBGBDkBSADKAIUIQQgAygCGCEFIAEgAykCDCIINwMIIAMoAhwhBiABIAg3AwBBwQAgBkEBQQFBARDmBSIAIAQ2AgwgACAFNgIIIABBiMMCNgIAIAAgASkCADcCECABQRBqJAAgAAwBC0EACyEBIANBIGokAAwICyACIAJB1AFqQfYKELYFKQIANwNIIAAgAkHIAGoQtwUEQCACIAAQzwUiATYCqAIgAUUNByACQQI2AoQCIwBBEGsiAyQAIABBmANqQRwQ5AUgA0EIakHRxAAQtgUhASACKAKEAiEEIAIoAqgCIQUgAyABKQIANwMAIAMgBSAEEKUGIQEgA0EQaiQADAgLIAIgAkHMAWpB9xcQtgUpAgA3A0AgACACQUBrELcFBEAjAEEgayIDJAAgAyAAELwFIgE2AhwCfwJAIAFFDQAgAyAAEM8FIgE2AhggAUUNACADQRBqIABBARC6BSAAQQhqIgEoAgQgASgCAGtBAnUhBANAIABB3wAQuQUEQCADQQRqIgUgAEEAELoFIAMgACAFEM4FNgIMIAEgA0EMahDIBQwBCwsgAyAAQfAAELkFOgAMQQAgAEHFABC5BUUNARogA0EEaiAAIAQQyQUjAEEgayIBJAAgAEGYA2pBJBDkBSADKAIYIQQgAygCHCEFIAEgAykCECIINwMYIAEgAykCBCIJNwMQIAMtAAwhBiABIAg3AwggASAJNwMAQTdBAEEBQQFBARDmBSIAIAQ2AgwgACAFNgIIIABBhMQCNgIAIAAgASkCCDcCECABKQIAIQggACAGOgAgIAAgCDcCGCABQSBqJAAgAAwBC0EACyEBIANBIGokAAwICyACIAJBxAFqQcUWELYFKQIANwM4IAAgAkE4ahC3BQRAIAIgABDPBSIBNgKoAiABRQ0HIAAgAkGoAmoQ0QUhAQwICyACIAJBvAFqQcgpELYFKQIANwMwIAAgAkEwahC3BQRAQQAhASAAKAIAIgMgACgCBEcEfyADLQAABUEAC0H/AXFB1ABGBEAgAiAAENIFIgE2AqgCIAFFDQggAEGYA2pBDBDkBSACKAKoAiEDQTpBAEEBQQFBARDmBSIBIAM2AgggAUHwxAI2AgAMCQsgAiAAEIkGIgM2AqgCIANFDQggACACQagCahCLBiEBDAgLIAIgAkG0AWpBsCoQtgUpAgA3AyggACACQShqELcFBEAgAEEIaiIBKAIEIAEoAgBrQQJ1IQMDQCAAQcUAELkFRQRAIAIgABDHBSIENgKoAiAERQ0JIAEgAkGoAmoQyAUMAQsLIAJBqAJqIAAgAxDJBSMAQRBrIgEkACAAQZgDakEQEOQFIAEgAikCqAIiCDcDACABIAg3AwhBAEEAQQFBAUEBEOYFIgNB4MUCNgIAIAMgASkCADcCCCABQRBqJAAgAiADNgKEAiAAIAJBhAJqEIsGIQEMCAsgAiACQawBakHJGxC2BSkCADcDICAAIAJBIGoQtwUEQCACIAAQvAUiAzYChAJBACEBIANFDQggAEEIaiIDKAIEIAMoAgBrQQJ1IQQDQCAAQcUAELkFRQRAIAIgABCKBiIFNgKoAiAFRQ0KIAMgAkGoAmoQyAUMAQsLIAJBqAJqIAAgBBDJBSMAQRBrIgMkACAAQZgDakEUEOQFIAIoAoQCIAMgAikCqAIiCDcDACADIAg3AwggAxDHBiEBIANBEGokAAwICyACIAJBpAFqQbYSELYFKQIANwMYIAAgAkEYahC3BQRAIABB3AsQzAUhAQwICyACIAJBnAFqQdkLELYFKQIANwMQIAAgAkEQahC3BQRAIAIgABDPBSIBNgKoAiABRQ0HIABBmANqQQwQ5AUgAigCqAIhA0HEAEEAQQFBAUEBEOYFIgEgAzYCCCABQczGAjYCAAwICyAAQfUAELkFBEAgAiAAEOMFIgM2AoQCIANFDQdBACEBIAJBADYC9AEgAkGUAWogAyADKAIAKAIYEQAAIAJBjAFqQZceELYFIQMgAiACKQKUATcDCCACIAMpAgA3AwACf0EAIAJBCGogAhDYBUUNABogAgJ/IABB9AAQuQUEQCAAELwFDAELQQAgAEH6ABC5BUUNARogABDPBQsiATYC9AFBAQsgAEEIaiIDKAIEIAMoAgBrQQJ1IQUNAwNAIABBxQAQuQUNBSACIAAQxwUiATYCqAIgAUUNCCADIAJBqAJqEMgFDAALAAtBACEBIwBBMGsiBCQAIARBADYCLCAEIARBJGpBtioQtgUpAgA3AxACQCAAIARBEGoQtwUEQCAEIAAQkQYiAzYCLCADRQ0BIAAoAgAiAyAAKAIERwR/IAMtAAAFQQALQf8BcUHJAEYEQCAEIABBABDTBSIDNgIgIANFDQIgBCAAIARBLGogBEEgahDUBTYCLAsDQCAAQcUAELkFRQRAIAQgABCSBiIDNgIgIANFDQMgBCAAIARBLGogBEEgahCTBjYCLAwBCwsgBCAAEJQGIgM2AiAgA0UNASAAIARBLGogBEEgahCTBiEBDAELIAQgBEEYakG5EhC2BSkCADcDCCAAIARBCGoQtwVFBEAgBCAAEJQGIgE2AiwgAUUNASAFRQ0BIAAgBEEsahCVBiEBDAELAkAgACgCACIDIAAoAgRHBH8gAy0AAAVBAAvAQTBrQQlNBEBBASEDA0AgBCAAEJIGIgY2AiAgBkUNAwJAIANFBEAgBCAAIARBLGogBEEgahCTBjYCLAwBCyAFBEAgBCAAIARBIGoQlQY2AiwMAQsgBCAGNgIsC0EAIQMgAEHFABC5BUUNAAsMAQsgBCAAEJEGIgM2AiwgA0UNASAAKAIAIgMgACgCBEcEfyADLQAABUEAC0H/AXFByQBHDQAgBCAAQQAQ0wUiAzYCICADRQ0BIAQgACAEQSxqIARBIGoQ1AU2AiwLIAQgABCUBiIDNgIgIANFDQAgACAEQSxqIARBIGoQkwYhAQsgBEEwaiQADAcLEBYgAigChAIgAi0AiAI6AAAQFwALIAJBhAJqIAAgBBDJBSAFRQ0CDAMLIAFFDQMgAyACQfQBahDIBQsgAkGoAmoiASAAIAUQyQUgAkEBNgKMAiAAIAJBhAJqIAEgAkGMAmoQiAYhAQwDCyACKAKIAkEBRw0CCyACIAMsAANBAXU2AowCIwBBEGsiAyQAIABBmANqQRQQ5AUgAigC9AEhBCADIAIpAoQCIgg3AwggAigCjAIhASADIAg3AwBBwAAgAUEBQQFBARDmBSIBIAQ2AgggAUHYrQI2AgAgASADKQIANwIMIANBEGokAAwBC0EAIQELIAJBwAJqJAAgAQubAQEEfyMAQRBrIgIkAAJAIABBxAAQuQVFDQAgAEH0ABC5BUUEQCAAQdQAELkFRQ0BCyACIAAQzwUiATYCDCABRQ0AIABBxQAQuQVFDQAjAEEQayIBJAAgAEGYA2pBHBDkBSABQQhqQa0gELYFIQMgAigCDCEEIAEgAykCADcDACABIARBABClBiABQRBqJAAhAwsgAkEQaiQAIAMLFQAgAEGYA2pBDBDkBSABKAIAEMMGC7MDAQZ/IwBBEGsiASQAAkACQCAAQdQAELkFRQ0AIAFBADYCDCAAQcwAELkFBEAgACABQQxqEO0FDQEgASgCDCAAQd8AELkFRQ0BQQFqIQILIAFBADYCCCAAQd8AELkFRQRAIAAgAUEIahDtBQ0BIAEgASgCCEEBaiIFNgIIIABB3wAQuQVFDQELAkAgAC0AhQNFDQAgAg0AIABBmANqQRQQ5AUgASgCCCECQShBAEECQQJBAhDmBSIDQQA6ABAgA0EANgIMIAMgAjYCCCADQaSiAjYCACADLQAEQShHDQIgASADNgIEIABB6AJqIAFBBGoQyAUMAQsCQAJAIAIgAEHMAmoiBCgCBCAEKAIAa0ECdU8NACAEIAIQ3wUoAgBFDQAgBSAEIAIQ3wUoAgAiBigCBCAGKAIAa0ECdUkNAQsgACgCiAMgAkcNASACIAQoAgQgBCgCAGtBAnUiBUsNASACIAVGBEAgAUEANgIEIAQgAUEEahDIBQsgAEHoFxDMBSEDDAELIAQgAhDfBSgCACAFEN8FKAIAIQMLIAFBEGokACADDwtB/iNBhx1BtClBiBsQAAALuQcCD38BfiMAQTBrIgYkAAJAAn9BACAAQckAELkFRQ0AGiABBEAgAEHMAmoiAyADKAIANgIEIAYgAEGgAmo2AhQgAyAGQRRqEMgFIAAgACgCoAI2AqQCCyAAQcwCaiEDIABBCGoiDSICKAIEIAIoAgBrQQJ1IQ4CQAJAA0AgAEHFABC5BUUEQCABBEACfyAGQRRqEMEFIQIgAygCACIEIANBDGpGBEAgBCADKAIEIAIoAgAQ4gUgAiACKAIAIAMoAgQgAygCAGtBfHFqNgIEIAMgAygCADYCBCACDAELIAIgAygCADYCACACIAMoAgQ2AgQgAiADKAIINgIIIAMgA0EcajYCCCADIANBDGoiBDYCBCADIAQ2AgAgAgshCUHougNBADYCAEG/AyAAEA4hAkHougMoAgBB6LoDQQA2AgBBAUYNBiAGIAI2AhAgAyAJENoFIQ8gAkUNAyANIAZBEGoQyAUgBiACNgIMIAItAARBJUYEQCAGIAIpAgg3AgQjAEEQayIKJAAgAEGYA2pBEBDkBSAKIAYpAgQiETcDACAKIBE3AwhBJEEAQQFBAUEBEOYFIgJBwNICNgIAIAIgCikCADcCCCACIAIvAAVBv2BxIgdBgBVyIgs7AAUgAkEIaiIEKAIAIQUgBCgCACAEKAIEQQJ0aiEIA0AgBSAIRiIMRQRAIAUoAgAgBUEEaiEFLwAFQYAGcUGAAkYNAQsLIAwEQCACIAdBgBNyIgs7AAULIAQoAgAhBSAEKAIEQQJ0IAVqIQcDQCAFIAdGIghFBEAgBSgCACAFQQRqIQUvAAVBgBhxQYAIRg0BCwsgCARAIAIgC0H/Z3FBgAhyIgs7AAULIAQoAgAhBSAEKAIEQQJ0IAVqIQQDQCAEIAVGIgdFBEAgBSgCACAFQQRqIQUvAAVBwAFxQcAARg0BCwsgBwRAIAIgC0G//gNxQcAAcjsABQsgCkEQaiQAIAYgAjYCDAtB6LoDQQA2AgBBwgMgDxAOIQJB6LoDKAIAQei6A0EANgIAQQFHBEAgAigCACAGQQxqEMgFIAkQvgUMAwsMBgsgBiAAEMcFIgI2AhQgAkUNAyANIAZBFGoQyAUMAQsLIAZBFGogACAOEMkFIwBBEGsiASQAIABBmANqQRAQ5AUgASAGKQIUIhE3AwAgASARNwMIQSdBAEEBQQFBARDmBSIAQazTAjYCACAAIAEpAgA3AgggAUEQaiQAIAAMAgsgCRC+BQtBAAsgBkEwaiQADwsQFiAJEL4FEBcAC0EAIABBmANqQRAQ5AUgASgCACEBIAIoAgAhAkEpQQBBAUEBQQEQ5gUiACACNgIMIAAgATYCCCAAQZjUAjYCACAAC0wAIABBmANqQRQQ5AUgAigCACECQQxBACABKAIAIgEtAAVBBnZBAUEBEOYFIgBBADoAECAAIAI2AgwgACABNgIIIABBrOQCNgIAIAALnAEBBX8jAEEQayIDJAAgAyADQQhqQagPELYFKQIANwMAIAAgAxC3BQRAIABBuiQQzAUhBAsCQAJAIAAoAgAiByAAKAIERwR/IActAAAFQQALQf8BcUHTAEcNACAAEPMFIgVFDQEgBS0ABEEZRg0AIAJFDQEgBA0BIAJBAToAACAFIQYMAQsgACABIAQgBRD1BSEGCyADQRBqJAAgBgv5BQIEfwF+IwBB0ABrIgEkAAJAAkAgAEHVABC5BQRAIAFByABqIAAQzQUgASgCTEUNAiABIAEpA0g3A0AgAUE4akHtFxC2BSECIAEgASkDQDcDCCABIAIpAgA3AwAgAUEIaiABEMIFBEAgASgCSEEJaiECIAEgASgCTEEJazYCNCABIAI2AjAgAUIANwIoIAEoAjAhAiABIAA2AiAgASAAKAIANgIkIAAgAjYCACMAQRBrIgIkACACIAEoAjAgASgCNGo2AgwgAigCDCEDIAJBEGokACABIAM2AhAgAUEQaiICKAIAIQMgASAAQQRqNgIYIAEgACgCBDYCHCAAIAM2AgQgAiAAEM0FIAEgASkDEDcDKCABKAIYIAEoAhw2AgAgASgCICABKAIkNgIAQQAhAiABKAIsRQ0DIAEgABDXBSICNgIgIAJFDQIjAEEQayIDJAAgAEGYA2pBFBDkBSABKAIgIQQgAyABKQIoIgU3AwAgAyAFNwMIQQpBAEEBQQFBARDmBSICIAQ2AgggAkGQ2wI2AgAgAiADKQIANwIMIANBEGokAAwDCyABQQA2AjAgACgCACICIAAoAgRHBH8gAi0AAAVBAAtB/wFxQckARgRAQQAhAiABIABBABDTBSIDNgIwIANFDQMLIAEgABDXBSICNgIoIAIEfyMAQRBrIgIkACAAQZgDakEYEOQFIAEoAighAyACIAEpAkgiBTcDCCABKAIwIQQgAiAFNwMAQQJBAEEBQQFBARDmBSIAIAM2AgggAEH82wI2AgAgAikCACEFIAAgBDYCFCAAIAU3AgwgAkEQaiQAIAAFQQALIQIMAgsgASAAEPIFIgM2AkggASAAELwFIgI2AjAgAkUNACADRQ0BIABBmANqQRAQ5AUgASgCSCEDQQNBACABKAIwIgQvAAUiAEHAAXFBBnYgAEEIdkEDcSAAQQp2QQNxEOYFIgIgBDYCDCACIAM2AgggAkHs3AI2AgAMAQtBACECCyABQdAAaiQAIAIL/wECBX8BfiMAQRBrIgMkACAAKAIEIAEoAgRGBEAgAyABKQIAIgc3AwAgAyAHNwMIAn8jAEEQayIBJAAgASAAKAIENgIMIAMoAgQhAkHougNBADYCACABIAI2AggjAEEQayICJAAgAUEIaiIEKAIAIAFBDGoiBSgCAEkhBiACQRBqJAAgBCAFIAYbIQJB6LoDKAIAQei6A0EANgIAQQFHBEACQCAAKAIAIAMoAgAgAigCABD4BCICDQBBACECIAAoAgQgAygCBEYNAEF/QQEgACgCBCADKAIESRshAgsgAUEQaiQAIAIMAQtBABAPGhCYBQALRSECCyADQRBqJAAgAgsoAQJ/IwBBEGsiAiQAIAEoAgAgACgCAEkhAyACQRBqJAAgASAAIAMbC48CAQN/IAAoAgAiAyAAQQxqIgRGIQICQCABKAIAIAFBDGpGBEAgAkUEQCADEJAFIAAgAEEcajYCCCAAIAQiAjYCBCAAIAI2AgALIAEoAgAgASgCBCAAKAIAEOIFIAAgACgCACABKAIEIAEoAgBrQXxxajYCBAwBCyACBEAgACABKAIANgIAIAAgASgCBDYCBCAAIAEoAgg2AgggASABQRxqNgIIIAEgAUEMaiICNgIEIAEgAjYCACAADwsgACgCACECIAAgASgCADYCACABIAI2AgAgACgCBCECIAAgASgCBDYCBCABIAI2AgQgACgCCCECIAAgASgCCDYCCCABIAI2AggLIAEgASgCADYCBCAAC4sCAQN/IAAoAgAiAyAAQQxqIgRGIQICQCABKAIAIAFBDGpGBEAgAkUEQCADEJAFIAAgAEEsajYCCCAAIAQiAjYCBCAAIAI2AgALIAEoAgAgASgCBCAAKAIAEOIFIAAgACgCACABKAIEIAEoAgBrQXxxajYCBAwBCyACBEAgACABKAIANgIAIAAgASgCBDYCBCAAIAEoAgg2AgggASABQSxqNgIIIAEgAUEMaiIANgIEIAEgADYCAA8LIAAoAgAhAiAAIAEoAgA2AgAgASACNgIAIAAoAgQhAiAAIAEoAgQ2AgQgASACNgIEIAAoAgghAiAAIAEoAgg2AgggASACNgIICyABIAEoAgA2AgQLmwEBA38jAEEQayIBJAACQCAAQegAELkFBEBBASECIAFBCGoiAyAAQQEQugUgAygCBEUNASAAQd8AELkFQQFzIQIMAQtBASECIABB9gAQuQVFDQAgAUEIaiIDIABBARC6BSADKAIERQ0AIABB3wAQuQVFDQAgASAAQQEQugUgASgCBEUNACAAQd8AELkFQQFzIQILIAFBEGokACACC8EBAQR/QQEhAwJAIAAoAgAiAiAAKAIERwR/IAItAAAFQQALwCICQTBIDQAgAkE6TwRAIAJBwQBrQf8BcUEZSw0BCyAAKAIAIQRBACEDA0ACQCAAKAIAIgIgACgCBEcEfyACLQAABUEAC8AiAkEwTgRA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tgI2AgAgASACKQIANwIIIAJBEGokAAwBCyADIANBkAFqQfEbELYFKQIANwMYIAAgA0EYahC3BQRAIABBzAJqIgkiASgCBCABKAIAa0ECdSEBIAMgAEGIA2o2AogBIAMgACgCiAM2AowBIAAgATYCiAMgA0HUAGogABCnBiEGIABBCGoiASgCBCABKAIAa0ECdSEHAkACQAJAA0ACQCAAKAIAIgIgACgCBEcEfyACLQAABUEAC0H/AXFB1ABHDQAgA0HMAGoiCkH9FxC2BSICKAIAIQggAigCBCECIAAoAgQgACgCACIEa0EBSwR/IAQtAAEFQQALwCEFIwBBEGsiBCQAIAQgBToAD0F/IQUgAgRAIAIEfyAIIAQsAA8gAhCABQVBAAsiAiAIa0F/IAIbIQULIARBEGokACAFQX9GDQBB6LoDQQA2AgBBxAMgABAOIQJB6LoDKAIAQei6A0EANgIAQQFGDQQgAyACNgJMIAJFDQIgASAKEMgFDAELC0HougNBADYCAEHAAyADQcwAaiAAIAcQGEHougMoAgAhAkHougNBADYCAAJAIAJBAUcEQCADKAJQDQFB6LoDQQA2AgBBxQMgCRATQei6AygCAEHougNBADYCAEEBRw0BCwwGCyADIANBxABqQeYqELYFKQIANwMIIAAgA0EIahC3BUUEQANAQei6A0EANgIAQcEDIAAQDiECQei6AygCAEHougNBADYCAEEBRg0HIAMgAjYCPCACRQ0CIAEgA0E8ahDIBSAAQcUAELkFRQ0ACwtBACEBQei6A0EANgIAQcADIANBPGogACAHEBhB6LoDKAIAQei6A0EANgIAQQFGDQUgA0E0aiAAQQAQugUgAEHfABC5BUUNASMAQTBrIgIkACAAQZgDakEgEOQFIAIgAykCTCILNwMoIAIgAykCPCIMNwMgIAIgAykCNCINNwMYIAIgCzcDECACIAw3AwggAiANNwMAQTBBAEEBQQFBARDmBSIBQci7AjYCACABIAIpAhA3AgggASACKQIINwIQIAEgAikCADcCGCACQTBqJAAMAQtBACEBCyAGEKkGIAMoAogBIAMoAowBNgIADAILDAILIAMgA0EsakHaKBC2BSkCADcDEEEAIQEgACADQRBqELcFRQ0AIANB1ABqIABBABC6BSAAQd8AELkFRQ0AIwBBEGsiAiQAIABBmANqQRAQ5AUgAiACQQhqQdM+ELYFKQIANwMAIAIQ7gUhASACQRBqJAALIANBoAFqJAAgAQ8LEBYgBhCpBiADKAKIASADKAKMATYCABAXAAv2AwEEfyMAQTBrIgIkAAJAAkAgABCFBiIDBEAgAy0AAiIFQQhGBEAgAiAAQYQDajYCKCACIAAtAIQDOgAsIABBADoAhAMgASAALQCFA3JBAEchAyACIABBhQNqNgIgIAIgAC0AhQM6ACQgACADOgCFA0HougNBADYCAEHBAyAAEA4hA0HougMoAgBB6LoDQQA2AgBBAUYNAiACIAM2AhwgAwRAIAEEQCABQQE6AAALIAAgAkEcahDQBiEECyACKAIgIAItACQ6AAAgAigCKCACLQAsOgAADAMLIAVBCksNAiAFQQRGBEAgAy0AA0EBcUUNAwsgAkEoaiIBIAMQjwYgACABEM4FIQQMAgsgAiACQRRqQaMcELYFKQIANwMIIAAgAkEIahC3BQRAIAIgABDjBSIBNgIoIAFFDQIgAEGYA2pBDBDkBSACKAIoIQFBE0EAQQFBAUEBEOYFIgAgATYCCCAAQfjJAjYCACAAIQQMAgsgAEH2ABC5BUUNASAAKAIAIgEgACgCBEcEfyABLQAABUEAC8BBMGtB/wFxQQlLDQEgACAAKAIAQQFqNgIAIAIgABDjBSIBNgIoIAFFDQEgACACQShqENAGIQQMAQsQFiACKAIgIAItACQ6AAAgAigCKCACLQAsOgAAEBcACyACQTBqJAAgBAuWAQEEfyMAQRBrIgMkAAJAIAAtABBFBEAgA0EIaiICIABBEGo2AgAgAiAALQAQOgAEIABBAToAECACIQQgACgCDCEAQei6A0EANgIAQcYDIAAgARAVIQVB6LoDKAIAQei6A0EANgIAQQFGDQEgAigCACACLQAEOgAACyADQRBqJAAgBQ8LEBYgBCgCACAELQAEOgAAEBcACzABAX8gAC8ABSICQcABcUGAAUcEQCACQf8BcUHAAEkPCyAAIAEgACgCACgCABEDAAuWAQEEfyMAQRBrIgMkAAJAIAAtABBFBEAgA0EIaiICIABBEGo2AgAgAiAALQAQOgAEIABBAToAECACIQQgACgCDCEAQei6A0EANgIAQccDIAAgARAVIQVB6LoDKAIAQei6A0EANgIAQQFGDQEgAigCACACLQAEOgAACyADQRBqJAAgBQ8LEBYgBCgCACAELQAEOgAAEBcACycBAX8gAC0ABkEDcSICQQJHBEAgAkUPCyAAIAEgACgCACgCBBEDAAuWAQEEfyMAQRBrIgMkAAJAIAAtABBFBEAgA0EIaiICIABBEGo2AgAgAiAALQAQOgAEIABBAToAECACIQQgACgCDCEAQei6A0EANgIAQcgDIAAgARAVIQVB6LoDKAIAQei6A0EANgIAQQFGDQEgAigCACACLQAEOgAACyADQRBqJAAgBQ8LEBYgBCgCACAELQAEOgAAEBcACyoBAX8gAC8ABUEKdkEDcSICQQJHBEAgAkUPCyAAIAEgACgCACgCCBEDAAuZAQEEfyMAQRBrIgMkAAJAIAAtABBFBEAgA0EIaiICIABBEGo2AgAgAiAALQAQOgAEIABBAToAECACIQQgACgCDCIAKAIAKAIMQei6A0EANgIAIAAgARAVIQBB6LoDKAIAQei6A0EANgIAQQFGDQEgAigCACACLQAEOgAACyADQRBqJAAgAA8LEBYgBCgCACAELQAEOgAAEBcAC5UBAQR/IwBBEGsiAyQAAkAgAC0AEEUEQCADQQhqIgIgAEEQajYCACACIAAtABA6AAQgAEEBOgAQIAIhBCAAKAIMIgAoAgAoAhBB6LoDQQA2AgAgACABEBFB6LoDKAIAQei6A0EANgIAQQFGDQEgAigCACACLQAEOgAACyADQRBqJAAPCxAWIAQoAgAgBC0ABDoAABAXAAuVAQEEfyMAQRBrIgMkAAJAIAAtABBFBEAgA0EIaiICIABBEGo2AgAgAiAALQAQOgAEIABBAToAECACIQQgACgCDCIAKAIAKAIUQei6A0EANgIAIAAgARARQei6AygCAEHougNBADYCAEEBRg0BIAIoAgAgAi0ABDoAAAsgA0EQaiQADwsQFiAEKAIAIAQtAAQ6AAAQFwALugEBBn8Cf0EAIAAoAgQgACgCACICa0ECSQ0AGkE9IQEDQCABIANHBEAgASABIANqQQF2IgUCf0EBIAVBA3RBoKMCaiIBLAAAIgQgAiwAACIGSA0AGkEAIAQgBkcNABogASwAASACLAABSAsiBBshASAFQQFqIAMgBBshAwwBCwtBACADQQN0QaCjAmoiAS0AACACLQAARgR/IAEtAAEgAi0AAUYFQQAL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AhA3AwAgAhCrBhogAkEgaiQAC4sBAQF/IwBBIGsiAiQAIAAgARDZBgJAIAEoAghBAUsEQCACIAApAgA3AxggAkEQakH9KBC2BSEBIAIgAikDGDcDCCACIAEpAgA3AwAgAkEIaiACEMIFRQ0BIAAgACgCAEEGajYCACAAIAAoAgRBBms2AgQLIAJBIGokAA8LQf47QYcdQbgMQdQgEAAACxgAIAAgASgCCEECdEGE5gJqKAIAELYFGgvIAQEBfyMAQdAAayICJAAgAiACQcgAakGqLhC2BSkCADcDICABIAJBIGoQqwYgAkFAayAAIAAoAgAoAhgRAAAgAiACKQJANwMYIAJBGGoQqwYhASAAKAIIQQFLBEAgAiACQThqQfErELYFKQIANwMQIAEgAkEQahCrBiEBIAAoAghBAkYEQCACIAJBMGpBjywQtgUpAgA3AwggASACQQhqEKsGGgsgAiACQShqQcYsELYFKQIANwMAIAEgAhCrBhoLIAJB0ABqJAALewICfwF+IwBBMGsiAiQAIAAoAggiAyABIAMoAgAoAhARAAAgAiACQShqQZcuELYFKQIANwMQIAEgAkEQahDpBSACIAApAgwiBDcDCCACIAQ3AyAgAkEIahDpBSACIAJBGGpBuCkQtgUpAgA3AwAgAhDpBRogAkEwaiQAC08AIABBmANqQRQQ5AUgASgCACEBIAItAAAhAiADKAIAIQNBLUEAQQFBAUEBEOYFIgAgAzYCECAAIAI6AAwgACABNgIIIABBmM8CNgIAIAALHAAgAUHbABCXBiAAQQhqIAEQnwYgAUHdABCZBgtjAQF/IwBBIGsiAiQAIAAtAAwEQCACIAJBGGpBmwkQtgUpAgA3AwggASACQQhqEOkFGgsgAkEQaiAAKAIIIgAgACgCACgCGBEAACACIAIpAhA3AwAgASACEOkFGiACQSBqJAALdAEBfyAAKAIMIgIgASACKAIAKAIQEQAAIAIvAAVBwAFxQcAARwRAIAIgASACKAIAKAIUEQAACyABQcAAELQFIQEgACgCCCIAIAEgACgCACgCEBEAACAALwAFQcABcUHAAEcEQCAAIAEgACgCACgCFBEAAAsLSgEBfyABKAIQQX9GBEAgACgCDCECIAFBADYCDCABIAI2AhALIAEoAgwiAiAAKAIMSQR/IAAoAgggAkECdGooAgAgARD9BQVBAAsLbAEBfyABKAIQQX9GBEAgACgCDCECIAFBADYCDCABIAI2AhALIAEoAgwiAiAAKAIMSQR/An8gACgCCCACQQJ0aigCACIALQAGQQNxIgJBAkcEQCACRQwBCyAAIAEgACgCACgCBBEDAAsFQQALC28BAX8gASgCEEF/RgRAIAAoAgwhAiABQQA2AgwgASACNgIQCyABKAIMIgIgACgCDEkEfwJ/IAAoAgggAkECdGooAgAiAC8ABUEKdkEDcSICQQJHBEAgAkUMAQsgACABIAAoAgAoAggRAwALBUEACwtUAQF/IAEoAhBBf0YEQCAAKAIMIQIgAUEANgIMIAEgAjYCEAsgASgCDCICIAAoAgxJBH8gACgCCCACQQJ0aigCACIAIAEgACgCACgCDBEDAAUgAAsLUQEBfyABKAIQQX9GBEAgACgCDCECIAFBADYCDCABIAI2AhALIAEoAgwiAiAAKAIMSQRAIAAoAgggAkECdGooAgAiACABIAAoAgAoAhARAAALC1EBAX8gASgCEEF/RgRAIAAoAgwhAiABQQA2AgwgASACNgIQCyABKAIMIgIgACgCDEkEQCAAKAIIIAJBAnRqKAIAIgAgASAAKAIAKAIUEQAACwvAAQEDfyMAQTBrIgIkACACQShqIgMgAUEUajYCACADIAEoAhQ2AgQgAUEANgIUIAMhBCACIAJBIGpBlS4QtgUpAgA3AxAgASACQRBqEOkFIQFB6LoDQQA2AgBBygMgAEEIaiABEBFB6LoDKAIAQei6A0EANgIAQQFHBEAgAiACQRhqQcYsELYFKQIANwMIIAEgAkEIahDpBRogAygCACADKAIENgIAIAJBMGokAA8LEBYgBCgCACAEKAIENgIAEBcAC2oBAX8gACgCCCICIAEgAigCACgCEBEAACACLwAFQcABcUHAAEcEQCACIAEgAigCACgCFBEAAAsgACgCDCIAIAEgACgCACgCEBEAACAALwAFQcABcUHAAEcEQCAAIAEgACgCACgCFBEAAAsLQQEBfyMAQRBrIgIkACACIAJBCGpBnS4QtgUpAgA3AwAgAEEIaiABIAIQ6QUiABCfBiAAQd0AELQFGiACQRBqJAALiwEBAn8jAEEQayICJAACQCAAKAIIIgNFDQAgAyABIAMoAgAoAhARAAAgACgCCCABEP0F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AEEgayIBJAAgACgCCCIALQAEQQdGBEAgASAAKQIINwIYIAFBEGpBkw4QtgUhACABIAEpAhg3AwggASAAKQIANwMAIAFBCGogARDYBSECCyABQSBqJAAgAgvEAQEDfyMAQRBrIgMkAAJAAkACfyAAKAIIIgItAARBCkYEQCACEIQHDQMgACgCCCECCyACLQAGQQNxIgRBAkcEQCAERQwBCyACIAEgAigCACgCBBEDAAtFBEACfyAAKAIIIgIvAAVBCnZBA3EiBEECRwRAIARFDAELIAIgASACKAIAKAIIEQMAC0UNAQsgAyADQQhqQZY8ELYFKQIANwMAIAEgAxDpBRoLIAAoAggiACABIAAoAgAoAhQRAAALIANBEGokAAu0AwEDfyMAQUBqIgIkAAJAIAAtABBFBEAgAkE4aiIEIABBEGo2AgAgBCAALQAQOgAEIABBAToAEEHougNBADYCAEHLAyACQTBqIAAgARAYQei6AygCAEHougNBADYCAEEBRg0BIAIoAjQiAARAIAAoAgAoAhBB6LoDQQA2AgAgACABEBFB6LoDKAIAQei6A0EANgIAQQFGDQJB6LoDQQA2AgBBxwMgAigCNCABEBVB6LoDKAIAQei6A0EANgIAQQFGDQIEQCACIAJBKGpBm8gAELYFKQIANwMQIAEgAkEQahDpBRoLQei6A0EANgIAQccDIAIoAjQgARAVIQBB6LoDKAIAQei6A0EANgIAQQFGDQICQCAARQRAQei6A0EANgIAQcgDIAIoAjQgARAVQei6AygCAEHougNBADYCAEEBRg0ERQ0BCyACIAJBIGpBmTwQtgUpAgA3AwggASACQQhqEOkFGgsgAiACQRhqQZLCAEGWwgAgAigCMBsQtgUpAgA3AwAgASACEOkFGgsgBCgCACAELQAEOgAACyACQUBrJAAPCxAWIAQoAgAgBC0ABDoAABAXAAuRAgEFfyMAQTBrIgYkACAAIAEoAgw2AgAgACABKAIINgIEIABBBGohBSAGQQRqEMAFIQECQAJAA0AgBSgCACIDKAIAKAIMQei6A0EANgIAIAMgAhAVIQNB6LoDKAIAQei6A0EANgIAQQFGDQIgAy0ABEEMRw0BIAAgAygCCDYCBCAAIANBDGoiAyAAIAMoAgAgACgCAEgbKAIANgIAIAEgBRDIBSABKAIEIAEoAgBr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cHQAX19jeGFfZGVjcmVtZW50X2V4Y2VwdGlvbl9yZWZjb3VudABjbXNUZW1wRnJvbVdoaXRlUG9pbnQAX2Ntc1JlYWRNZWRpYVdoaXRlUG9pbnQAdW5zaWduZWQgaW50AF9jbXNXcml0ZUFsaWdubWVudABfY21zUmVhZEFsaWdubWVudABfQml0SW50AG9wZXJhdG9yIGNvX2F3YWl0AHN0cnVjdAAgcmVzdHJpY3QAb2JqY19vYmplY3QAZmxvYXQAY21zUGlwZWxpbmVFdmFsRmxvYXQAY21zRXZhbFRvbmVDdXJ2ZUZsb2F0AF9GbG9hdABVbnN1cHBvcnRlZCByYXN0ZXIgZm9ybWF0AHN0ZDo6bnVsbHB0cl90AHdjaGFyX3QAY2hhcjhfdABjaGFyMTZfdABjaGFyMzJfdABVdABUdABTdABQYXJzZXItPlRlbXBsYXRlUGFyYW1zLnNpemUoKSA+PSBPbGROdW1UZW1wbGF0ZVBhcmFtTGlzdHMATWlzbWF0Y2hlZCBhbHBoYSBjaGFubmVscwBjbXNQaXBlbGluZU91dHB1dENoYW5uZWxzAGNtc1BpcGVsaW5lSW5wdXRDaGFubmVscwB0aGlzAGdzAEV2YWx1YXRlQ3VydmVzAFJlYWQgZnJvbSBtZW1vcnkgZXJyb3IuIEdvdCAlZCBieXRlcywgYmxvY2sgc2hvdWxkIGJlIG9mICVkIGJ5dGVzAFJlYWQgZXJyb3IuIEdvdCAlZCBieXRlcywgYmxvY2sgc2hvdWxkIGJlIG9mICVkIGJ5dGVzAENvdWxkbid0IGxpbmsgdGhlIHByb2ZpbGVzAENvdWxkbid0IGxpbmsgJyVkJyBwcm9maWxlcwBDb3VsZG4ndCBjcmVhdGUgdG9uZSBjdXJ2ZSBvZiBtb3JlIHRoYW4gNjU1MzAgZW50cmllcwBUcwBudWxscHRyAHNyAG9wZXJhdG9yAGFsbG9jYXRvcgBDb3VsZG4ndCByZWFkIHByb2ZpbGUgZnJvbSBOVUxMIHBvaW50ZXIAY21zU2F2ZVByb2ZpbGVUb0lPaGFuZGxlcgBfY21zRW5jb2RlRGF0ZVRpbWVOdW1iZXIAX2Ntc0RlY29kZURhdGVUaW1lTnVtYmVyAF9jbXNXcml0ZVhZWk51bWJlcgBfY21zUmVhZFhZWk51bWJlcgBfY21zV3JpdGVVSW50OE51bWJlcgBfY21zUmVhZFVJbnQ4TnVtYmVyAF9jbXNXcml0ZVVJbnQxNk51bWJlcgBfY21zUmVhZFVJbnQxNk51bWJlcgBfY21zV3JpdGUxNUZpeGVkMTZOdW1iZXIAX2Ntc1JlYWQxNUZpeGVkMTZOdW1iZXIAX2Ntc1dyaXRlVUludDY0TnVtYmVyAF9jbXNSZWFkVUludDY0TnVtYmVyAF9jbXNXcml0ZVVJbnQzMk51bWJlcgBfY21zUmVhZFVJbnQzMk51bWJlcgBfY21zUmVhZEZsb2F0MzJOdW1iZXIAY21zU3RhZ2VBbGxvY0NMdXQxNmJpdEdyYW51bGFyAGNtc1N0YWdlQWxsb2NDTHV0RmxvYXRHcmFudWxhcgB1bnNpZ25lZCBjaGFyAGNtc0lzVG9uZUN1cnZlTGluZWFyAGNtc0RpY3REdXAAc3AAc3lzdGVtL2xpYi9saWJjeHhhYmkvc3JjL2N4YV9leGNlcHRpb25fZW1zY3JpcHRlbi5jcHAAc3lzdGVtL2xpYi9saWJjeHhhYmkvc3JjL2N4YV9kZW1hbmdsZS5jcHAAY21zV2hpdGVQb2ludEZyb21UZW1wOiBpbnZhbGlkIHRlbXAAY21zV2hpdGVQb2ludEZyb21UZW1wAGZwAFRwAGF1dG8Ab2JqY3Byb3RvAHNvAERvAHlwdG4AQmFkIGNvbnRleHQgY2xpZW50IC0tIHBvc3NpYmxlIGNvcnJ1cHRpb24AdGVybWluYXRlX2hhbmRsZXIgdW5leHBlY3RlZGx5IHRocmV3IGFuIGV4Y2VwdGlvbgBDdXJyZW50UG9zaXRpb24ATFVUOCBuZWVkcyAyNTYgZW50cmllcyBvbiBwcmVsaW5lYXJpemF0aW9uAHVuaW9uAE11bHRpc2VnbWVudCBvciBJbnZlcnRlZCBwYXJhbWV0cmljIGN1cnZlcyBjYW5ub3QgYmUgd3JpdHRlbgBkbgBuYW4AVG4ARG4AZW51bQBOVUxMIGlucHV0IHByb2ZpbGVzIG9uIHRyYW5zZm9ybQBXcm9uZyBvdXRwdXQgY29sb3Igc3BhY2Ugb24gdHJhbnNmb3JtAFdyb25nIGlucHV0IGNvbG9yIHNwYWNlIG9uIHRyYW5zZm9ybQBjbXNEZWxldGVUcmFuc2Zvcm0Abm0AY21zT3BlbklPaGFuZGxlckZyb21NZW0AcGFyc2VUZW1wbGF0ZVBhcmFtAGJhc2ljX2lvc3RyZWFtAGJhc2ljX29zdHJlYW0AYmFzaWNfaXN0cmVhbQB1bAB0bABib29sAGdldFN5bWJvbAB1bGwAaWwAc3RyaW5nIGxpdGVyYWwAVWwAX2Ntc0NvbnRleHRHZXRDbGllbnRDaHVuawBwb3BfYmFjawBkcm9wQmFjawBwaQBsaQBVbnJlY29nbml6ZWQgYWxwaGEgY2hhbm5lbCB3aWR0aABDb2xvclNwYWNlIG1pc21hdGNoAHN5c3RlbS9saWIvbGliY3h4YWJpL3NyYy9kZW1hbmdsZS9VdGlsaXR5LmgAc3lzdGVtL2xpYi9saWJjeHhhYmkvc3JjL2RlbWFuZ2xlL0l0YW5pdW1EZW1hbmdsZS5oAHVuc2lnbmVkIGxvbmcgbG9uZwB1bnNpZ25lZCBsb25nAGJhc2ljX3N0cmluZwBPcHRpbWl6ZUJ5UmVzYW1wbGluZwBjbXNJc1RvbmVDdXJ2ZURlc2NlbmRpbmcAX191dWlkb2YAaW5mAGhhbGYAJWFmAEN1YmVTaXplAFVuc3VwcG9ydGVkIHBhcmFtZXRyaWMgY3VydmUAY21zSm9pblRvbmVDdXJ2ZQBjbXNSZXZlcnNlVG9uZUN1cnZlAGNtc0J1aWxkU2VnbWVudGVkVG9uZUN1cnZlAGNtc0J1aWxkUGFyYW1ldHJpY1RvbmVDdXJ2ZQB0cnVlAEJhZCBkaWN0aW9uYXJ5IE5hbWUvVmFsdWUAb3BlcmF0b3IgZGVsZXRlAGZhbHNlAF9jbXNXcml0ZVR5cGVCYXNlAF9jbXNSZWFkVHlwZUJhc2UAbm90IGFuIElDQyBwcm9maWxlLCBpbnZhbGlkIHNpZ25hdHVyZQBkZWNsdHlwZQBjbXNHZXRUb25lQ3VydmVQYXJhbWV0cmljVHlwZQBnZXRCYXNlTmFtZQBjbXNGcmVlVG9uZUN1cnZlVHJpcGxlACB2b2xhdGlsZQBDb3VsZG4ndCBhbGxvY2F0ZSAlbGQgYnl0ZXMgZm9yIHByb2ZpbGUAVG9vIGZldyBkYXRhOyBwcm9iYWJseSBjb3JydXB0ZWQgcHJvZmlsZQBUZWxsIGVycm9yOyBwcm9iYWJseSBjb3JydXB0ZWQgZmlsZQBTZWVrIGVycm9yOyBwcm9iYWJseSBjb3JydXB0ZWQgZmlsZQBjbXNPcGVuSU9oYW5kbGVyRnJvbUZpbGUAX19jeGFfZGVtYW5nbGUAbG9uZyBkb3VibGUAQ291bGRuJ3QgY3JlYXRlIHRvbmUgY3VydmUgd2l0aCB6ZXJvIHNlZ21lbnRzIGFuZCBubyB0YWJsZQBfYmxvY2tfaW52b2tlAENvbG9yICVkIG91dCBvZiByYW5nZQAoaW50ZXJuYWwpIEF0dGVtcHQgdG8gUGF0Y2hMVVQgb24gbm9uLWx1dCBzdGFnZQBjbXNEaWN0RnJlZQBDdXJ2ZVNldEVsZW1UeXBlRnJlZQBGb3J3YXJkUmVmLT5nZXRLaW5kKCkgPT0gTm9kZTo6S0ZvcndhcmRUZW1wbGF0ZVJlZmVyZW5jZQBUZQBzdGQARmlsZSAnJXMnIG5vdCBmb3VuZABEdXBsaWNhdGUgdGFnIGZvdW5kAHZvaWQAZW1wdHkgTFVUOCBpcyBub3Qgc3VwcG9ydGVkAENoYW5uZWwgY291bnQgZG9lc24ndCBtYXRjaC4gUHJvZmlsZSBpcyBjb3JydXB0ZWQAdGVybWluYXRlX2hhbmRsZXIgdW5leHBlY3RlZGx5IHJldHVybmVkACd1bm5hbWVkACclcycgSW5jb25zaXN0ZW50IG51bWJlciBvZiBpdGVtczogZXhwZWN0ZWQgJWQsIGdvdCAlZABJbnZhbGlkIHBhcmFtZXRyaWMgY3VydmUgdHlwZSAlZABtYwBjbXNJc1RvbmVDdXJ2ZU1vbm90b25pYwBMaXR0bGUtQ01TL3NyYy9jbXNsdXQuYwBMaXR0bGUtQ01TL3NyYy9jbXNvcHQuYwBMaXR0bGUtQ01TL3NyYy9jbXN3dHBudC5jAExpdHRsZS1DTVMvc3JjL2Ntc3R5cGVzLmMATGl0dGxlLUNNUy9zcmMvY21zcGx1Z2luLmMATGl0dGxlLUNNUy9zcmMvY21zeGZvcm0uYwBMaXR0bGUtQ01TL3NyYy9jbXNuYW1lZC5jAExpdHRsZS1DTVMvc3JjL2Ntc2dhbW1hLmMATGl0dGxlLUNNUy9zcmMvY21zaW8xLmMATGl0dGxlLUNNUy9zcmMvY21zaW8wLmMAVWIAcndhAGNtc0VzdGltYXRlR2FtbWEAJ2xhbWJkYQAlYQBiYXNpY18Ab3BlcmF0b3JeAG9wZXJhdG9yIG5ld1tdAG9wZXJhdG9yW10Ab3BlcmF0b3IgZGVsZXRlW10AcGl4ZWwgdmVjdG9yWwBzWgBfX19fWgBSZWFkSUNDTWF0cml4UkdCMlhZWgBmcFQAKGludGVybmFsKSAlZCBDaGFubmVscyBhcmUgbm90IHN1cHBvcnRlZCBvbiBQYXRjaExVVAAkVFQAR01UACRUAFVTAFBTAHNQAERPAHNyTgBfR0xPQkFMX19OAE5BTgAkTgBmTAAlTGFMAFVhOWVuYWJsZV9pZkkASU5GAHZFAFJFAE9FAGIxRQBiMEUAX2Ntc1JlYWRDSEFEAERDAExVVCBpcyBub3Qgc3VpdGFibGUgdG8gYmUgc2F2ZWQgYXMgTHV0QVRvQgBMVVQgaXMgbm90IHN1aXRhYmxlIHRvIGJlIHNhdmVkIGFzIEx1dEJUb0EAb3BlcmF0b3I/AG9wZXJhdG9yPgA8Y2hhciwgc3RkOjpjaGFyX3RyYWl0czxjaGFyPgAsIHN0ZDo6YWxsb2NhdG9yPGNoYXI+AG9wZXJhdG9yPj4Ab3BlcmF0b3I8PT4Ab3BlcmF0b3ItPgBvcGVyYXRvcnw9AG9wZXJhdG9yPQBvcGVyYXRvcl49AG9wZXJhdG9yPj0Ab3BlcmF0b3I+Pj0Ab3BlcmF0b3I9PQBvcGVyYXRvcjw9AG9wZXJhdG9yPDw9AG9wZXJhdG9yLz0Ab3BlcmF0b3ItPQBvcGVyYXRvcis9AG9wZXJhdG9yKj0Ab3BlcmF0b3ImPQBvcGVyYXRvciU9AG9wZXJhdG9yIT0Ab3BlcmF0b3I8AHRlbXBsYXRlPABpZDwAb3BlcmF0b3I8PAAuPAAiPABbYWJpOgAgW2VuYWJsZV9pZjoAc3RkOjoATFVUIGlzIG5vdCBzdWl0YWJsZSB0byBiZSBzYXZlZCBhcyBMVVQ4AHVuc2lnbmVkIF9faW50MTI4AF9fZmxvYXQxMjgAZGVjaW1hbDEyOABYRm9ybVNhbXBsZXIxNgBFdmFsdWF0ZUNMVVRmbG9hdEluMTYAY21zUGlwZWxpbmVFdmFsMTYAY21zRXZhbFRvbmVDdXJ2ZTE2AExVVCBpcyBub3Qgc3VpdGFibGUgdG8gYmUgc2F2ZWQgYXMgTFVUMTYATFVUIHdpdGggZGlmZmVyZW50IHNhbXBsZXMgcGVyIGRpbWVuc2lvbiBub3Qgc3VpdGFibGUgdG8gYmUgc2F2ZWQgYXMgTFVUMTYAX2Ntc0FkanVzdEVuZGlhbmVzczY0AGRlY2ltYWw2NAAjMwBkZWNpbWFsMzIAIzIAIzEAIzAAZXhjZXB0aW9uX2hlYWRlci0+cmVmZXJlbmNlQ291bnQgPiAwAG9wZXJhdG9yLwBvcGVyYXRvci4AQ29ycnVwdGVkIGJ1aWx0LWluIHByb2ZpbGUuAFdyb25nIHBvc2l0aW9uIG9mIFBDUy4gMS4uMjU1IGV4cGVjdGVkLCAlZCBmb3VuZC4AVW5rbm93biBjdXJ2ZSBlbGVtZW50IHR5cGUgJyVzJyBmb3VuZC4AVW5rbm93biB0YWcgdHlwZSAnJXMnIGZvdW5kLgBVbmtub3duIE1QRSB0eXBlICclcycgZm91bmQuAG11bHRpTG9jYWxpemVkVW5pY29kZVR5cGUgb2YgbGVuICE9IDEyIGlzIG5vdCBzdXBwb3J0ZWQuAHNpemVvZi4uLgBvcGVyYXRvci0ALWluLQBvcGVyYXRvci0tAG9wZXJhdG9yLABvcGVyYXRvcisAb3BlcmF0b3IrKwBvcGVyYXRvcioAb3BlcmF0b3ItPioAOjoqAG9wZXJhdG9yLioAVW5zdXBwb3J0ZWQgaW50ZXJwb2xhdGlvbiAoJWQtPiVkIGNoYW5uZWxzKQBkZWNsdHlwZShhdXRvKQAobnVsbCkAKGFub255bW91cyBuYW1lc3BhY2UpAFRvbyBtYW55IGlucHV0IGNoYW5uZWxzICglZCBjaGFubmVscywgbWF4PSVkKQBUb28gbWFueSB0YWdzICglZCkAVW5leHBlY3RlZCBkaXJlY3Rpb24gKCVkKQAobXBlIC0+T3V0cHV0Q2hhbm5lbHMgPD0gMTI4KQAobXBlIC0+SW5wdXRDaGFubmVscyA8PSAxMjgpAChMdXQgLT4gT3V0cHV0Q2hhbm5lbHMgPCAxNikAKEx1dCAtPiBJbnB1dENoYW5uZWxzIDwgMTYpACgwKQAoQXJyYXkgIT0gKCh2b2lkKikwKSkAKGx1dCAhPSAoKHZvaWQqKTApKQAoRGVzdCAhPSAoKHZvaWQqKTApKQAoV2hpdGVQb2ludCAhPSAoKHZvaWQqKTApKQAoUmVzdWx0ICE9ICgodm9pZCopMCkpAChvbGRfZGljdCAhPSAoKHZvaWQqKTApKQAoZGljdCAhPSAoKHZvaWQqKTApKQAodCAhPSAoKHZvaWQqKTApKQAoY2x1dFBvaW50cyAhPSAoKHZvaWQqKTApKQAoU2VnbWVudHMgIT0gKCh2b2lkKikwKSkAKERpbXMgIT0gKCh2b2lkKikwKSkAKFBhcmFtcyAhPSAoKHZvaWQqKTApKQAociAhPSAoKHZvaWQqKTApKQAocCAhPSAoKHZvaWQqKTApKQAoaW8gIT0gKCh2b2lkKikwKSkAKEluQ3VydmUgIT0gKCh2b2lkKikwKSkAKEN1cnZlICE9ICgodm9pZCopMCkpAChtcGUgIT0gKCh2b2lkKikwKSkAKEZpbGVOYW1lICE9ICgodm9pZCopMCkpAChOYW1lICE9ICgodm9pZCopMCkpAChoUHJvZmlsZSAhPSAoKHZvaWQqKTApKQAoQWNjZXNzTW9kZSAhPSAoKHZvaWQqKTApKQAoU291cmNlICE9ICgodm9pZCopMCkpAChJbkdhbW1hICE9ICgodm9pZCopMCkpAChYWVogIT0gKCh2b2lkKikwKSkAKFkgIT0gKCh2b2lkKikwKSkAKFggIT0gKCh2b2lkKikwKSkAKFRlbXBLICE9ICgodm9pZCopMCkpACghKEFycmF5ID09ICgodm9pZCopMCkgJiYgbiA+IDApKQBQYXJzZXIuRm9yd2FyZFRlbXBsYXRlUmVmcy5lbXB0eSgpAG9wZXJhdG9yKCkARnJvbVBvc2l0aW9uIDw9IE5hbWVzLnNpemUoKQBzdGFydHNfd2l0aChTViwgImJhc2ljXyIpACAoAFVuc3VwcG9ydGVkIGRldmljZSBjbGFzcyAnMHgleCcAVW5zdXBwb3J0ZWQgcHJvZmlsZSB2ZXJzaW9uICcweCV4JwBVbnN1cHBvcnRlZCB0YWcgJyV4JwBNYWxmb3JtZWQgc3RydWN0IGluIHR5cGUgJyVzJyBmb3IgdGFnICclcycAVW5zdXBwb3J0ZWQgdHlwZSAnJXMnIGZvciB0YWcgJyVzJwBDb3JydXB0ZWQgdGFnICclcycAQ291bGRuJ3QgY3JlYXRlICclcycAVW5rbm93biBjdXJ2ZSB0eXBlICclcycAQ291bGRuJ3Qgd3JpdGUgdHlwZSAnJXMnAEZvdW5kIHVua25vd24gTVBFIHR5cGUgJyVzJwBDYW5ub3QgZ2V0IHNpemUgb2YgZmlsZSAnJXMnACdibG9jay1saXRlcmFsJwBVbmtub3duIHJlY29yZCBsZW5ndGggaW4gZGljdGlvbmFyeSAnJWQnAFVuc3VwcG9ydGVkIGludGVudCAnJWQnAFRvbyBtYW55IGNvbG9yYW50cyAnJWQnAFRvbyBtYW55IG5hbWVkIGNvbG9ycyAnJWQnAFRvbyBtYW55IGRldmljZSBjb29yZGluYXRlcyAnJWQnAFVua25vd24gcHJlY2lzaW9uIG9mICclZCcAVW5rbm93biBwYXJhbWV0cmljIGN1cnZlIHR5cGUgJyVkJwBVbnN1cHBvcnRlZCBudW1iZXIgb2YgY2hhbm5lbHMgZm9yIFZDR1QgJyVkJwBVbnN1cHBvcnRlZCBiaXQgZGVwdGggZm9yIFZDR1QgJyVkJwBVbnN1cHBvcnRlZCB0YWcgdHlwZSBmb3IgVkNHVCAnJWQnAFVua25vd24gYWNjZXNzIG1vZGUgJyVjJwBXcm9uZyBhY2Nlc3MgbW9kZSAnJWMnAEFjY2VzcyBtb2RlIGFscmVhZHkgc3BlY2lmaWVkICclYycAb3BlcmF0b3ImAG9wZXJhdG9yJiYAICYmACAmAG9wZXJhdG9yJQA+IgBzdGFydHNfd2l0aChSZXMsICJvcGVyYXRvciIpICYmICJvcGVyYXRvciBuYW1lIGRvZXMgbm90IHN0YXJ0IHdpdGggJ29wZXJhdG9yJyIASW5kZXggPCBzaXplKCkgJiYgIkludmFsaWQgYWNjZXNzISIATGFzdCAhPSBGaXJzdCAmJiAiQ2FsbGluZyBiYWNrKCkgb24gZW1wdHkgdmVjdG9yISIATGFzdCAhPSBGaXJzdCAmJiAiUG9wcGluZyBlbXB0eSB2ZWN0b3IhIgBJbmRleCA8PSBzaXplKCkgJiYgImRyb3BCYWNrKCkgY2FuJ3QgZXhwYW5kISIAb3BlcmF0b3IhAFB1cmUgdmlydHVhbCBmdW5jdGlvbiBjYWxsZWQhAHRocm93IABub2V4Y2VwdCAAIGF0IG9mZnNldCAAb3BlcmF0b3IgAHJlZmVyZW5jZSB0ZW1wb3JhcnkgZm9yIAB0ZW1wbGF0ZSBwYXJhbWV0ZXIgb2JqZWN0IGZvciAAdHlwZWluZm8gZm9yIAB0aHJlYWQtbG9jYWwgd3JhcHBlciByb3V0aW5lIGZvciAAdGhyZWFkLWxvY2FsIGluaXRpYWxpemF0aW9uIHJvdXRpbmUgZm9yIAB0eXBlaW5mbyBuYW1lIGZvciAAY29uc3RydWN0aW9uIHZ0YWJsZSBmb3IgAGd1YXJkIHZhcmlhYmxlIGZvciAAVlRUIGZvciAAY292YXJpYW50IHJldHVybiB0aHVuayB0byAAbm9uLXZpcnR1YWwgdGh1bmsgdG8gAGludm9jYXRpb24gZnVuY3Rpb24gZm9yIGJsb2NrIGluIABhbGlnbm9mIABzaXplb2YgAD4gdHlwZW5hbWUgAGluaXRpYWxpemVyIGZvciBtb2R1bGUgAHR5cGVpZCAAdW5zaWduZWQgACA/IAAgPSAAbGliYysrYWJpOiAAIDogAHNpemVvZi4uLiAAIC4uLiAALCAAb3BlcmF0b3IiIiAAAAAAAAAAAAEAAAACAAAAAAAAAAEAAAACAAAACgAAAAEAAAACAAAAAwAAAAQAAAAFAAAABgAAAAcAAAAIAAAAbAAAAG0AQYzJAAslAQAAAAMAAAAEAAAABQAAAAcAAAAEAAAABQAAAAUAAAABAAAAAQBB3MkACwEyAEH2yQAL+kKAMwAAADQAAEA0AACANAAAoDQAAMA0AADgNAAAADUAABA1AAAgNQAAMDUAAEA1AABQNQAAYDUAAHA1AACANQAAiDUAAJA1AACYNQAAoDUAAKg1AACwNQAAuDUAAMA1AADINQAA0DUAANg1AADgNQAA6DUAAPA1AAD4NQAAADYAAAQ2AAAINgAADDYAABA2AAAUNgAAGDYAABw2AAAgNgAAJDYAACg2AAAsNgAAMDYAADQ2AAA4NgAAPDYAAEA2AABENgAASDYAAEw2AABQNgAAVDYAAFg2AABcNgAAYDYAAGQ2AABoNgAAbDYAAHA2AAB0NgAAeDYAAHw2AACANgAAgjYAAIQ2AACGNgAAiDYAAIo2AACMNgAAjjYAAJA2AACSNgAAlDYAAJY2AACYNgAAmjYAAJw2AACeNgAAoDYAAKI2AACkNgAApjYAAKg2AACqNgAArDYAAK42AACwNgAAsjYAALQ2AAC2NgAAuDYAALo2AAC8NgAAvjYAAMA2AADCNgAAxDYAAMY2AADINgAAyjYAAMw2AADONgAA0DYAANI2AADUNgAA1jYAANg2AADaNgAA3DYAAN42AADgNgAA4jYAAOQ2AADmNgAA6DYAAOo2AADsNgAA7jYAAPA2AADyNgAA9DYAAPY2AAD4NgAA+jYAAPw2AAD+NgAAADcAAAE3AAACNwAAAzcAAAQ3AAAFNwAABjcAAAc3AAAINwAACTcAAAo3AAALNwAADDcAAA03AAAONwAADzcAABA3AAARNwAAEjcAABM3AAAUNwAAFTcAABY3AAAXNwAAGDcAABk3AAAaNwAAGzcAABw3AAAdNwAAHjcAAB83AAAgNwAAITcAACI3AAAjNwAAJDcAACU3AAAmNwAAJzcAACg3AAApNwAAKjcAACs3AAAsNwAALTcAAC43AAAvNwAAMDcAADE3AAAyNwAAMzcAADQ3AAA1NwAANjcAADc3AAA4NwAAOTcAADo3AAA7NwAAPDcAAD03AAA+NwAAPzcAAEA3AABBNwAAQjcAAEM3AABENwAARTcAAEY3AABHNwAASDcAAEk3AABKNwAASzcAAEw3AABNNwAATjcAAE83AABQNwAAUTcAAFI3AABTNwAAVDcAAFU3AABWNwAAVzcAAFg3AABZNwAAWjcAAFs3AABcNwAAXTcAAF43AABfNwAAYDcAAGE3AABiNwAAYzcAAGQ3AABlNwAAZjcAAGc3AABoNwAAaTcAAGo3AABrNwAAbDcAAG03AABuNwAAbzcAAHA3AABxNwAAcjcAAHM3AAB0NwAAdTcAAHY3AAB3NwAAeDcAAHk3AAB6NwAAezcAAHw3AAB9NwAAfjcAAH83AACANwCAgDcAAIE3AICBNwAAgjcAgII3AACDNwCAgzcAAIQ3AICENwAAhTcAgIU3AACGNwCAhjcAAIc3AICHNwAAiDcAgIg3AACJNwCAiTcAAIo3AICKNwAAizcAgIs3AACMNwCAjDcAAI03AICNNwAAjjcAgI43AACPNwCAjzcAAJA3AICQNwAAkTcAgJE3AACSNwCAkjcAAJM3AICTNwAAlDcAgJQ3AACVNwCAlTcAAJY3AICWNwAAlzcAgJc3AACYNwCAmDcAAJk3AICZNwAAmjcAgJo3AACbNwCAmzcAAJw3AICcNwAAnTcAgJ03AACeNwCAnjcAAJ83AICfNwAAoDcAgKA3AAChNwCAoTcAAKI3AICiNwAAozcAgKM3AACkNwCApDcAAKU3AIClNwAApjcAgKY3AACnNwCApzcAAKg3AICoNwAAqTcAgKk3AACqNwCAqjcAAKs3AICrNwAArDcAgKw3AACtNwCArTcAAK43AICuNwAArzcAgK83AACwNwCAsDcAALE3AICxNwAAsjcAgLI3AACzNwCAszcAALQ3AIC0NwAAtTcAgLU3AAC2NwCAtjcAALc3AIC3NwAAuDcAgLg3AAC5NwCAuTcAALo3AIC6NwAAuzcAgLs3AAC8NwCAvDcAAL03AIC9NwAAvjcAgL43AAC/NwCAvzcAAMA3AIDANwAAwTcAgME3AADCNwCAwjcAAMM3AIDDNwAAxDcAgMQ3AADFNwCAxTcAAMY3AIDGNwAAxzcAgMc3AADINwCAyDcAAMk3AIDJNwAAyjcAgMo3AADLNwCAyzcAAMw3AIDMNwAAzTcAgM03AADONwCAzjcAAM83AIDPNwAA0DcAgNA3AADRNwCA0TcAANI3AIDSNwAA0zcAgNM3AADUNwCA1DcAANU3AIDVNwAA1jcAgNY3AADXNwCA1zcAANg3AIDYNwAA2TcAgNk3AADaNwCA2jcAANs3AIDbNwAA3DcAgNw3AADdNwCA3TcAAN43AIDeNwAA3zcAgN83AADgNwCA4DcAAOE3AIDhNwAA4jcAgOI3AADjNwCA4zcAAOQ3AIDkNwAA5TcAgOU3AADmNwCA5jcAAOc3AIDnNwAA6DcAgOg3AADpNwCA6TcAAOo3AIDqNwAA6zcAgOs3AADsNwCA7DcAAO03AIDtNwAA7jcAgO43AADvNwCA7zcAAPA3AIDwNwAA8TcAgPE3AADyNwCA8jcAAPM3AIDzNwAA9DcAgPQ3AAD1NwCA9TcAAPY3AID2NwAA9zcAgPc3AAD4NwCA+DcAAPk3AID5NwAA+jcAgPo3AAD7NwCA+zcAAPw3AID8NwAA/TcAgP03AAD+NwCA/jcAAP83AID/NwAAADgAQAA4AIAAOADAADgAAAE4AEABOACAATgAwAE4AAACOABAAjgAgAI4AMACOAAAAzgAQAM4AIADOADAAzgAAAQ4AEAEOACABDgAwAQ4AAAFOABABTgAgAU4AMAFOAAABjgAQAY4AIAGOADABjgAAAc4AEAHOACABzgAwAc4AAAIOABACDgAgAg4AMAIOAAACTgAQAk4AIAJOADACTgAAAo4AEAKOACACjgAwAo4AAALOABACzgAgAs4AMALOAAADDgAQAw4AIAMOADADDgAAA04AEANOACADTgAwA04AAAOOABADjgAgA44AMAOOAAADzgAQA84AIAPOADADzgAABA4AEAQOACAEDgAwBA4AAAROABAETgAgBE4AMAROAAAEjgAQBI4AIASOADAEjgAABM4AEATOACAEzgAwBM4AAAUOABAFDgAgBQ4AMAUOAAAFTgAQBU4AIAVOADAFTgAABY4AEAWOACAFjgAwBY4AAAXOABAFzgAgBc4AMAXOAAAGDgAQBg4AIAYOADAGDgAABk4AEAZOACAGTgAwBk4AAAaOABAGjgAgBo4AMAaOAAAGzgAQBs4AIAbOADAGzgAABw4AEAcOACAHDgAwBw4AAAdOABAHTgAgB04AMAdOAAAHjgAQB44AIAeOADAHjgAAB84AEAfOACAHzgAwB84AAAgOABAIDgAgCA4AMAgOAAAITgAQCE4AIAhOADAITgAACI4AEAiOACAIjgAwCI4AAAjOABAIzgAgCM4AMAjOAAAJDgAQCQ4AIAkOADAJDgAACU4AEAlOACAJTgAwCU4AAAmOABAJjgAgCY4AMAmOAAAJzgAQCc4AIAnOADAJzgAACg4AEAoOACAKDgAwCg4AAApOABAKTgAgCk4AMApOAAAKjgAQCo4AIAqOADAKjgAACs4AEArOACAKzgAwCs4AAAsOABALDgAgCw4AMAsOAAALTgAQC04AIAtOADALTgAAC44AEAuOACALjgAwC44AAAvOABALzgAgC84AMAvOAAAMDgAQDA4AIAwOADAMDgAADE4AEAxOACAMTgAwDE4AAAyOABAMjgAgDI4AMAyOAAAMzgAQDM4AIAzOADAMzgAADQ4AEA0OACANDgAwDQ4AAA1OABANTgAgDU4AMA1OAAANjgAQDY4AIA2OADANjgAADc4AEA3OACANzgAwDc4AAA4OABAODgAgDg4AMA4OAAAOTgAQDk4AIA5OADAOTgAADo4AEA6OACAOjgAwDo4AAA7OABAOzgAgDs4AMA7OAAAPDgAQDw4AIA8OADAPDgAAD04AEA9OACAPTgAwD04AAA+OABAPjgAgD44AMA+OAAAPzgAQD84AIA/OADAPzgAAEA4AEBAOACAQDgAwEA4AABBOABAQTgAgEE4AMBBOAAAQjgAQEI4AIBCOADAQjgAAEM4AEBDOACAQzgAwEM4AABEOABARDgAgEQ4AMBEOAAARTgAQEU4AIBFOADARTgAAEY4AEBGOACARjgAwEY4AABHOABARzgAgEc4AMBHOAAASDgAQEg4AIBIOADASDgAAEk4AEBJOACASTgAwEk4AABKOABASjgAgEo4AMBKOAAASzgAQEs4AIBLOADASzgAAEw4AEBMOACATDgAwEw4AABNOABATTgAgE04AMBNOAAATjgAQE44AIBOOADATjgAAE84AEBPOACATzgAwE84AABQOABAUDgAgFA4AMBQOAAAUTgAQFE4AIBROADAUTgAAFI4AEBSOACAUjgAwFI4AABTOABAUzgAgFM4AMBTOAAAVDgAQFQ4AIBUOADAVDgAAFU4AEBVOACAVTgAwFU4AABWOABAVjgAgFY4AMBWOAAAVzgAQFc4AIBXOADAVzgAAFg4AEBYOACAWDgAwFg4AABZOABAWTgAgFk4AMBZOAAAWjgAQFo4AIBaOADAWjgAAFs4AEBbOACAWzgAwFs4AABcOABAXDgAgFw4AMBcOAAAXTgAQF04AIBdOADAXTgAAF44AEBeOACAXjgAwF44AABfOABAXzgAgF84AMBfOAAAYDgAQGA4AIBgOADAYDgAAGE4AEBhOACAYTgAwGE4AABiOABAYjgAgGI4AMBiOAAAYzgAQGM4AIBjOADAYzgAAGQ4AEBkOACAZDgAwGQ4AABlOABAZTgAgGU4AMBlOAAAZjgAQGY4AIBmOADAZjgAAGc4AEBnOACAZzgAwGc4AABoOABAaDgAgGg4AMBoOAAAaTgAQGk4AIBpOADAaTgAAGo4AEBqOACAajgAwGo4AABrOABAazgAgGs4AMBrOAAAbDgAQGw4AIBsOADAbDgAAG04AEBtOACAbTgAwG04AABuOABAbjgAgG44AMBuOAAAbzgAQG84AIBvOADAbzgAAHA4AEBwOACAcDgAwHA4AABxOABAcTgAgHE4AMBxOAAAcjgAQHI4AIByOADAcjgAAHM4AEBzOACAczgAwHM4AAB0OABAdDgAgHQ4AMB0OAAAdTgAQHU4AIB1OADAdTgAAHY4AEB2OACAdjgAwHY4AAB3OABAdzgAgHc4AMB3OAAAeDgAQHg4AIB4OADAeDgAAHk4AEB5OACAeTgAwHk4AAB6OABAejgAgHo4AMB6OAAAezgAQHs4AIB7OADAezgAAHw4AEB8OACAfDgAwHw4AAB9OABAfTgAgH04AMB9OAAAfjgAQH44AIB+OADAfjgAAH84AEB/OACAfzgAwH84AAAAOAAgADgAQAA4AGAAOACAADgAoAA4AMAAOADgADgAAAE4ACABOABAATgAYAE4AIABOACgATgAwAE4AOABOAAAAjgAIAI4AEACOABgAjgAgAI4AKACOADAAjgA4AI4AAADOAAgAzgAQAM4AGADOACAAzgAoAM4AMADOADgAzgAAAQ4ACAEOABABDgAYAQ4AIAEOACgBDgAwAQ4AOAEOAAABTgAIAU4AEAFOABgBTgAgAU4AKAFOADABTgA4AU4AAAGOAAgBjgAQAY4AGAGOACABjgAoAY4AMAGOADgBjgAAAc4ACAHOABABzgAYAc4AIAHOACgBzgAwAc4AOAHOAAACDgAIAg4AEAIOABgCDgAgAg4AKAIOADACDgA4Ag4AAAJOAAgCTgAQAk4AGAJOACACTgAoAk4AMAJOADgCTgAAAo4ACAKOABACjgAYAo4AIAKOACgCjgAwAo4AOAKOAAACzgAIAs4AEALOABgCzgAgAs4AKALOADACzgA4As4AAAMOAAgDDgAQAw4AGAMOACADDgAoAw4AMAMOADgDDgAAA04ACANOABADTgAYA04AIANOACgDTgAwA04AOANOAAADjgAIA44AEAOOABgDjgAgA44AKAOOADADjgA4A44AAAPOAAgDzgAQA84AGAPOACADzgAoA84AMAPOADgDzgAABA4ACAQOABAEDgAYBA4AIAQOACgEDgAwBA4AOAQOAAAETgAIBE4AEAROABgETgAgBE4AKAROADAETgA4BE4AAASOAAgEjgAQBI4AGASOACAEjgAoBI4AMASOADgEjgAABM4ACATOABAEzgAYBM4AIATOACgEzgAwBM4AOATOAAAFDgAIBQ4AEAUOABgFDgAgBQ4AKAUOADAFDgA4BQ4AAAVOAAgFTgAQBU4AGAVOACAFTgAoBU4AMAVOADgFTgAABY4ACAWOABAFjgAYBY4AIAWOACgFjgAwBY4AOAWOAAAFzgAIBc4AEAXOABgFzgAgBc4AKAXOADAFzgA4Bc4AAAYOAAgGDgAQBg4AGAYOACAGDgAoBg4AMAYOADgGDgAABk4ACAZOABAGTgAYBk4AIAZOACgGTgAwBk4AOAZOAAAGjgAIBo4AEAaOABgGjgAgBo4AKAaOADAGjgA4Bo4AAAbOAAgGzgAQBs4AGAbOACAGzgAoBs4AMAbOADgGzgAABw4ACAcOABAHDgAYBw4AIAcOACgHDgAwBw4AOAcOAAAHTgAIB04AEAdOABgHTgAgB04AKAdOADAHTgA4B04AAAeOAAgHjgAQB44AGAeOACAHjgAoB44AMAeOADgHjgAAB84ACAfOABAHzgAYB84AIAfOACgHzgAwB84AOAfOAAAIDgAICA4AEAgOABgIDgAgCA4AKAgOADAIDgA4CA4AAAhOAAgITgAQCE4AGAhOACAITgAoCE4AMAhOADgITgAACI4ACAiOABAIjgAYCI4AIAiOACgIjgAwCI4AOAiOAAAIzgAICM4AEAjOABgIzgAgCM4AKAjOADAIzgA4CM4AAAkOAAgJDgAQCQ4AGAkOACAJDgAoCQ4AMAkOADgJDgAACU4ACAlOABAJTgAYCU4AIAlOACgJTgAwCU4AOAlOAAAJjgAICY4AEAmOABgJjgAgCY4AKAmOADAJjgA4CY4AAAnOAAgJzgAQCc4AGAnOACAJzgAoCc4AMAnOADgJzgAACg4ACAoOABAKDgAYCg4AIAoOACgKDgAwCg4AOAoOAAAKTgAICk4AEApOABgKTgAgCk4AKApOADAKTgA4Ck4AAAqOAAgKjgAQCo4AGAqOACAKjgAoCo4AMAqOADgKjgAACs4ACArOABAKzgAYCs4AIArOACgKzgAwCs4AOArOAAALDgAICw4AEAsOABgLDgAgCw4AKAsOADALDgA4Cw4AAAtOAAgLTgAQC04AGAtOACALTgAoC04AMAtOADgLTgAAC44ACAuOABALjgAYC44AIAuOACgLjgAwC44AOAuOAAALzgAIC84AEAvOABgLzgAgC84AKAvOADALzgA4C84AAAwOAAgMDgAQDA4AGAwOACAMDgAoDA4AMAwOADgMDgAADE4ACAxOABAMTgAYDE4AIAxOACgMTgAwDE4AOAxOAAAMjgAIDI4AEAyOABgMjgAgDI4AKAyOADAMjgA4DI4AAAzOAAgMzgAQDM4AGAzOACAMzgAoDM4AMAzOADgMzgAADQ4ACA0OABANDgAYDQ4AIA0OACgNDgAwDQ4AOA0OAAANTgAIDU4AEA1OABgNTgAgDU4AKA1OADANTgA4DU4AAA2OAAgNjgAQDY4AGA2OACANjgAoDY4AMA2OADgNjgAADc4ACA3OABANzgAYDc4AIA3OACgNzgAwDc4AOA3OAAAODgAIDg4AEA4OABgODgAgDg4AKA4OADAODgA4Dg4AAA5OAAgOTgAQDk4AGA5OACAOTgAoDk4AMA5OADgOTgAADo4ACA6OABAOjgAYDo4AIA6OACgOjgAwDo4AOA6OAAAOzgAIDs4AEA7OABgOzgAgDs4AKA7OADAOzgA4Ds4AAA8OAAgPDgAQDw4AGA8OACAPDgAoDw4AMA8OADgPDgAAD04ACA9OABAPTgAYD04AIA9OACgPTgAwD04AOA9OAAAPjgAID44AEA+OABgPjgAgD44AKA+OADAPjgA4D44AAA/OAAgPzgAQD84AGA/OACAPzgAoD84AMA/OADgPzgAAEA4ACBAOABAQDgAYEA4AIBAOACgQDgAwEA4AOBAOAAAQTgAIEE4AEBBOABgQTgAgEE4AKBBOADAQTgA4EE4AABCOAAgQjgAQEI4AGBCOACAQjgAoEI4AMBCOADgQjgAAEM4ACBDOABAQzgAYEM4AIBDOACgQzgAwEM4AOBDOAAARDgAIEQ4AEBEOABgRDgAgEQ4AKBEOADARDgA4EQ4AABFOAAgRTgAQEU4AGBFOACARTgAoEU4AMBFOADgRTgAAEY4ACBGOABARjgAYEY4AIBGOACgRjgAwEY4AOBGOAAARzgAIEc4AEBHOABgRzgAgEc4AKBHOADARzgA4Ec4AABIOAAgSDgAQEg4AGBIOACASDgAoEg4AMBIOADgSDgAAEk4ACBJOABASTgAYEk4AIBJOACgSTgAwEk4AOBJOAAASjgAIEo4AEBKOABgSjgAgEo4AKBKOADASjgA4Eo4AABLOAAgSzgAQEs4AGBLOACASzgAoEs4AMBLOADgSzgAAEw4ACBMOABATDgAYEw4AIBMOACgTDgAwEw4AOBMOAAATTgAIE04AEBNOABgTTgAgE04AKBNOADATTgA4E04AABOOAAgTjgAQE44AGBOOACATjgAoE44AMBOOADgTjgAAE84ACBPOABATzgAYE84AIBPOACgTzgAwE84AOBPOAAAUDgAIFA4AEBQOABgUDgAgFA4AKBQOADAUDgA4FA4AABROAAgUTgAQFE4AGBROACAUTgAoFE4AMBROADgUTgAAFI4ACBSOABAUjgAYFI4AIBSOACgUjgAwFI4AOBSOAAAUzgAIFM4AEBTOABgUzgAgFM4AKBTOADAUzgA4FM4AABUOAAgVDgAQFQ4AGBUOACAVDgAoFQ4AMBUOADgVDgAAFU4ACBVOABAVTgAYFU4AIBVOACgVTgAwFU4AOBVOAAAVjgAIFY4AEBWOABgVjgAgFY4AKBWOADAVjgA4FY4AABXOAAgVzgAQFc4AGBXOACAVzgAoFc4AMBXOADgVzgAAFg4ACBYOABAWDgAYFg4AIBYOACgWDgAwFg4AOBYOAAAWTgAIFk4AEBZOABgWTgAgFk4AKBZOADAWTgA4Fk4AABaOAAgWjgAQFo4AGBaOACAWjgAoFo4AMBaOADgWjgAAFs4ACBbOABAWzgAYFs4AIBbOACgWzgAwFs4AOBbOAAAXDgAIFw4AEBcOABgXDgAgFw4AKBcOADAXDgA4Fw4AABdOAAgXTgAQF04AGBdOACAXTgAoF04AMBdOADgXTgAAF44ACBeOABAXjgAYF44AIBeOACgXjgAwF44AOBeOAAAXzgAIF84AEBfOABgXzgAgF84AKBfOADAXzgA4F84AABgOAAgYDgAQGA4AGBgOACAYDgAoGA4AMBgOADgYDgAAGE4ACBhOABAYTgAYGE4AIBhOACgYTgAwGE4AOBhOAAAYjgAIGI4AEBiOABgYjgAgGI4AKBiOADAYjgA4GI4AABjOAAgYzgAQGM4AGBjOACAYzgAoGM4AMBjOADgYzgAAGQ4ACBkOABAZDgAYGQ4AIBkOACgZDgAwGQ4AOBkOAAAZTgAIGU4AEBlOABgZTgAgGU4AKBlOADAZTgA4GU4AABmOAAgZjgAQGY4AGBmOACAZjgAoGY4AMBmOADgZjgAAGc4ACBnOABAZzgAYGc4AIBnOACgZzgAwGc4AOBnOAAAaDgAIGg4AEBoOABgaDgAgGg4AKBoOADAaDgA4Gg4AABpOAAgaTgAQGk4AGBpOACAaTgAoGk4AMBpOADgaTgAAGo4ACBqOABAajgAYGo4AIBqOACgajgAwGo4AOBqOAAAazgAIGs4AEBrOABgazgAgGs4AKBrOADAazgA4Gs4AABsOAAgbDgAQGw4AGBsOACAbDgAoGw4AMBsOADgbDgAAG04ACBtOABAbTgAYG04AIBtOACgbTgAwG04AOBtOAAAbjgAIG44AEBuOABgbjgAgG44AKBuOADAbjgA4G44AABvOAAgbzgAQG84AGBvOACAbzgAoG84AMBvOADgbzgAAHA4ACBwOABAcDgAYHA4AIBwOACgcDgAwHA4AOBwOAAAcTgAIHE4AEBxOABgcTgAgHE4AKBxOADAcTgA4HE4AAByOAAgcjgAQHI4AGByOACAcjgAoHI4AMByOADgcjgAAHM4ACBzOABAczgAYHM4AIBzOACgczgAwHM4AOBzOAAAdDgAIHQ4AEB0OABgdDgAgHQ4AKB0OADAdDgA4HQ4AAB1OAAgdTgAQHU4AGB1OACAdTgAoHU4AMB1OADgdTgAAHY4ACB2OABAdjgAYHY4AIB2OACgdjgAwHY4AOB2OAAAdzgAIHc4AEB3OABgdzgAgHc4AKB3OADAdzgA4Hc4AAB4OAAgeDgAQHg4AGB4OACAeDgAoHg4AMB4OADgeDgAAHk4ACB5OABAeTgAYHk4AIB5OACgeTgAwHk4AOB5OAAAejgAIHo4AEB6OABgejgAgHo4AKB6OADAejgA4Ho4AAB7OAAgezgAQHs4AGB7OACAezgAoHs4AMB7OADgezgAAHw4ACB8OABAfDgAYHw4AIB8OACgfDgAwHw4AOB8OAAAfTgAIH04AEB9OABgfTgAgH04AKB9OADAfTgA4H04AAB+OAAgfjgAQH44AGB+OACAfjgAoH44AMB+OADgfjgAAH84ACB/OABAfzgAYH84AIB/OACgfzgAwH84AOB/OAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAAAAAAAgAAAAAABAACAAQAAAAIAAIACAAAAAwAAgAMAAAAEAACABAAAAAUAAIAFAAAABgAAgAYAAAAHAACABwAAAAgAAIAIAAAACQAAgAkAAAAKAACACgAAAAsAAIALAAAADAAAgAwAAAANAACADQAAAA4AAIAOAAAADwAAgEcAAACAAACAgAAAAIEAAICBAAAAggAAgIIAAACDAACAgwAAAIQAAICEAAAAhQAAgIUAAACGAACAhgAAAIcAAICHAAAAiAAAgIgAAACJAACAiQAAAIoAAICKAAAAiwAAgIsAAACMAACAjAAAAI0AAICNAAAAjgAAgI4AAACPAACAxwBBvo4BC6oLAQACAAQACAAQACAAQACAAAABAAIABAAIAAwAEAAUABgAHAAgACQAKAAsADAANAA4ADwAQABEAEgATABQAFQAWABcAGAAZABoAGwAcAB0AHgAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIABgAKABIAIgBCAIIBAgICAAIEAggCEAIgAjACQAJQAmACcAKAApACoAKwAsAC0ALgAvADAAMQAyADMANAA1ADYANwA4ADkAOgA7ADwAPQA+AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA/AD8APwA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"), c => c.charCodeAt(0)) });
  }
  // END BUNDLED COLOR ENGINE

  const MAX_UPLOAD_ICC_BYTES = 1024 * 1024;
  let uploadColorEnginePromise;

  async function inflateUploadProfile(bytes) {
    const reader = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate")).getReader();
    const chunks = [];
    let length = 0;
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        length += value.length;
        if (length > MAX_UPLOAD_ICC_BYTES) throw new Error("ICC profile is too large");
        chunks.push(value);
      }
    } finally { await reader.cancel(); }
    return new Uint8Array(await new Blob(chunks).arrayBuffer());
  }

  // Remove color metadata BEFORE browser decoding so LittleCMS receives the original
  // RGB sample values, not pixels already transformed (or misinterpreted) by Canvas.
  async function extractUploadProfile(file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const view = new DataView(bytes.buffer);
    const ascii = (start, count) => String.fromCharCode(...bytes.subarray(start, start + count));
    const parts = [];
    let profile = null, width = 0, height = 0, unsupported = false;
    if (file.type === "image/png") {
      if (bytes.length < 33 || ascii(1, 3) !== "PNG") throw new Error("Invalid PNG");
      width = view.getUint32(16); height = view.getUint32(20);
      unsupported = bytes[24] !== 8;
      parts.push(bytes.subarray(0, 8));
      for (let offset = 8; offset + 12 <= bytes.length;) {
        const length = view.getUint32(offset), end = offset + 12 + length;
        if (end > bytes.length) throw new Error("Truncated PNG chunk");
        const type = ascii(offset + 4, 4);
        if (type === "acTL") unsupported = true;
        if (type === "iCCP") {
          if (profile) throw new Error("Duplicate PNG ICC profile");
          const data = bytes.subarray(offset + 8, end - 4);
          const zero = data.indexOf(0);
          if (zero < 1 || zero > 79 || data[zero + 1] !== 0) throw new Error("Invalid PNG ICC header");
          profile = await inflateUploadProfile(data.subarray(zero + 2));
        }
        if (!["iCCP", "gAMA", "cHRM", "sRGB", "cICP", "mDCV", "cLLI"].includes(type)) parts.push(bytes.subarray(offset, end));
        offset = end;
        if (type === "IEND") break;
      }
    } else {
      if (bytes[0] !== 255 || bytes[1] !== 216) throw new Error("Invalid JPEG");
      parts.push(bytes.subarray(0, 2));
      const profiles = new Map();
      let count = 0, total = 0;
      for (let offset = 2; offset < bytes.length;) {
        const start = offset;
        if (bytes[offset++] !== 255) throw new Error("Invalid JPEG marker");
        while (bytes[offset] === 255) offset++;
        const marker = bytes[offset++];
        if (marker === 218 || marker === 217) { parts.push(bytes.subarray(start)); break; }
        if (marker === 1 || (marker >= 208 && marker <= 215)) { parts.push(bytes.subarray(start, offset)); continue; }
        if (offset + 2 > bytes.length) throw new Error("Truncated JPEG marker");
        const length = view.getUint16(offset), end = offset + length;
        if (length < 2 || end > bytes.length) throw new Error("Truncated JPEG segment");
        if ([192, 193, 194].includes(marker)) {
          if (length < 8) throw new Error("Invalid JPEG frame");
          height = view.getUint16(offset + 3); width = view.getUint16(offset + 5);
          unsupported = bytes[offset + 2] !== 8 || bytes[offset + 7] !== 3;
        }
        const isICC = marker === 226 && length >= 16 && ascii(offset + 2, 12) === "ICC_PROFILE\0";
        if (isICC) {
          const index = bytes[offset + 14], expected = bytes[offset + 15];
          if (!index || !expected || index > expected || (count && count !== expected) || profiles.has(index)) throw new Error("Invalid JPEG ICC sequence");
          count = expected;
          const chunk = bytes.subarray(offset + 16, end);
          total += chunk.length;
          if (total > MAX_UPLOAD_ICC_BYTES) throw new Error("ICC profile is too large");
          profiles.set(index, chunk);
        } else parts.push(bytes.subarray(start, end));
        offset = end;
      }
      if (count) {
        if (profiles.size !== count) throw new Error("Incomplete JPEG ICC profile");
        profile = new Uint8Array(total);
        let offset = 0;
        for (let i = 1; i <= count; i++) { profile.set(profiles.get(i), offset); offset += profiles.get(i).length; }
      }
    }
    if (!profile) return null;
    if (profile.length < 132 || profile.length > MAX_UPLOAD_ICC_BYTES || new DataView(profile.buffer).getUint32(0) !== profile.length || String.fromCharCode(...profile.subarray(36, 40)) !== "acsp") throw new Error("Invalid ICC profile");
    if (unsupported || !width || !height || width * height > 24000000) throw new Error("Unsupported profiled image dimensions, animation or bit depth");
    return { profile, raw: new Blob(parts, { type: file.type }) };
  }

  async function convertUploadImageToSRGB(file) {
    if (!["image/png", "image/jpeg"].includes(file.type)) return file;
    try {
      if (file.size > 40 * 1024 * 1024) throw new Error("Image exceeds local color processing limit");
      const extracted = await extractUploadProfile(file);
      if (!extracted) return file;
      if (String.fromCharCode(...extracted.profile.subarray(16, 20)) !== "RGB ") throw new Error("Only RGB ICC profiles are supported");
      if (!uploadColorEnginePromise) {
        uploadColorEnginePromise = instantiateColorEngine().catch(error => { uploadColorEnginePromise = null; throw error; });
      }
      const cms = await uploadColorEnginePromise;
      let input = 0, output = 0, transform = 0, decoded;
      try {
        input = cms.cmsOpenProfileFromMem(extracted.profile, extracted.profile.length);
        output = cms.cmsCreate_sRGBProfile();
        if (!input || !output) throw new Error("Cannot open ICC profile");
        // TYPE_RGB_8; use relative colorimetric intent, matching the reference conversion.
        transform = cms.cmsCreateTransform(input, 262169, output, 262169, 1, 0);
        if (!transform) throw new Error("Cannot create ICC transform");
        decoded = await decodeImageForCanvas(extracted.raw);
        if (!decoded.width || !decoded.height || decoded.width * decoded.height > 24000000) throw new Error("Image exceeds local color processing limit");
        const canvas = document.createElement("canvas");
        canvas.width = decoded.width; canvas.height = decoded.height;
        const ctx = canvas.getContext("2d", { colorSpace: "srgb", willReadFrequently: true });
        if (!ctx) throw new Error("Canvas unavailable");
        ctx.drawImage(decoded.source, 0, 0);
        // Process bounded strips, retaining alpha separately from the RGB transform.
        const rows = Math.max(1, Math.floor(65536 / canvas.width));
        for (let y = 0; y < canvas.height; y += rows) {
          const height = Math.min(rows, canvas.height - y);
          const pixels = ctx.getImageData(0, y, canvas.width, height);
          const count = pixels.data.length / 4, rgb = new Uint8Array(count * 3);
          for (let i = 0; i < count; i++) rgb.set(pixels.data.subarray(i * 4, i * 4 + 3), i * 3);
          const converted = cms.cmsDoTransform(transform, rgb, count);
          for (let i = 0; i < count; i++) pixels.data.set(converted.subarray(i * 3, i * 3 + 3), i * 4);
          ctx.putImageData(pixels, 0, y);
          await new Promise(resolve => setTimeout(resolve, 0));
        }
        // Lossless intermediate avoids an extra JPEG generation, preserving alpha.
        const blob = await canvasToBlob(canvas, "image/png");
        if (!blob || blob.type !== "image/png") throw new Error("Cannot encode sRGB image");
        return new File([blob], (file.name || "image").replace(/\.[^.]+$/, "") + ".png", { type: "image/png", lastModified: file.lastModified });
      } finally {
        decoded?.release();
        if (transform) cms.cmsDeleteTransform(transform);
        if (input) cms.cmsCloseProfile(input);
        if (output) cms.cmsCloseProfile(output);
      }
    } catch (error) {
      throw createImageUploadError("Image color conversion failed: " + error.message,
        "无法正确转换这张图片的色彩，已停止上传以避免颜色变灰。请先导出为标准 sRGB 的 JPEG/PNG；首版支持 8 位静态 RGB 图片（最大 2400 万像素、40 MB）。");
    }
  }

  async function normalizeUploadImage(file) {
    const bytes = new Uint8Array(await file.slice(0, 64).arrayBuffer());
    const ascii = (start, end) => String.fromCharCode(...bytes.slice(start, end));
    let type = "";
    if (bytes[0] === 137 && ascii(1, 4) === "PNG" && bytes[4] === 13 && bytes[5] === 10) type = "image/png";
    else if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) type = "image/jpeg";
    else if (/^GIF8[79]a$/.test(ascii(0, 6))) type = "image/gif";
    else if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") type = "image/webp";
    else if (ascii(4, 8) === "ftyp") {
      const brands = ascii(8, 64);
      if (/avif|avis/.test(brands)) type = "image/avif";
      else if (/heic|heix|hevc|hevx|mif1|msf1/.test(brands)) type = "image/heic";
    }
    type ||= String(file.type || "").toLowerCase();
    const heic = /image\/hei[cf]/.test(type) || (!type && /\.hei[cf]$/i.test(file.name || ""));
    if (heic) {
      let decoded;
      try {
        decoded = await decodeImageForCanvas(file);
        const canvas = document.createElement("canvas");
        canvas.width = decoded.width;
        canvas.height = decoded.height;
        const context = canvas.getContext("2d");
        if (!context || !canvas.width || !canvas.height) throw new Error("Empty HEIC image");
        context.fillStyle = "#fff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(decoded.source, 0, 0);
        const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
        if (!blob || blob.type !== "image/jpeg" || !blob.size) throw new Error("HEIC conversion failed");
        return new File([blob], (file.name || "image").replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
      } catch (error) {
        throw createImageUploadError("HEIC decode failed: " + error.message, "当前浏览器无法转换 HEIC/HEIF，请在照片中导出为 JPEG 或 PNG 后上传；仅修改文件后缀无效。");
      } finally { decoded?.release(); }
    }
    const extension = { "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/webp": "webp", "image/avif": "avif" }[type];
    if (extension && (file.type !== type || !new RegExp("\\." + (extension === "jpg" ? "jpe?g" : extension) + "$", "i").test(file.name || ""))) {
      return new File([file], (file.name || "image").replace(/\.[^.]+$/, "") + "." + extension, { type, lastModified: file.lastModified });
    }
    return file;
  }

  async function prepareImageForUpload(file) {
    file = await normalizeUploadImage(file);
    const normalizedFile = file;
    file = await convertUploadImageToSRGB(file);
    const colorConverted = file !== normalizedFile;
    const compressionEnabled = await readUploadSetting(COMPRESS_IMAGES_KEY, "false") === "true";
    if (!compressionEnabled || !canCompressImage(file)) {
      return { file, compressed: false, colorConverted };
    }
    if (file.type === "image/png" && await isAnimatedPng(file)) {
      return { file, compressed: false, colorConverted };
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
      if (!context) return { file, compressed: false, colorConverted };
      context.drawImage(decodedImage.source, 0, 0);

      // Imgur rejects WebP uploads even when the browser can encode them.
      const imageHost = await readUploadSetting(IMAGE_HOST_KEY, "imgur");
      let outputType = imageHost === "r2" && supportsCanvasWebPEncoding() ? "image/webp" : "image/jpeg";
      if (outputType === "image/jpeg" && file.type !== "image/jpeg") {
        const canFlattenToJpeg = file.type === "image/png" && !(await pngHasTransparency(file));
        if (!canFlattenToJpeg) outputType = "image/png";
      }

      const blob = await canvasToBlob(canvas, outputType, quality);
      if (!blob || blob.type !== outputType || blob.size >= file.size) {
        return { file, compressed: false, colorConverted };
      }

      const baseName = (file.name || "image").replace(/\.[^.]+$/, "") || "image";
      return {
        file: new File([blob], baseName + ({ "image/webp": ".webp", "image/png": ".png", "image/jpeg": ".jpg" }[outputType]), {
          type: outputType,
          lastModified: Date.now(),
        }),
        compressed: true,
        colorConverted,
      };
    } catch (error) {
      console.debug("V2EX Plus image compression was skipped:", error);
      return { file, compressed: false, colorConverted };
    } finally {
      if (decodedImage) decodedImage.release();
    }
  }

  async function decodeImageForCanvas(file) {
    if (typeof createImageBitmap === "function") {
      try {
      const bitmap = await createImageBitmap(file);
      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        release: () => bitmap.close(),
      };
      } catch { /* Safari may decode HEIC through Image but not createImageBitmap. */ }
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
    return /\.(apng|avif|gif|hei[cf]|jpe?g|png|webp)$/i.test(file.name || "");
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
