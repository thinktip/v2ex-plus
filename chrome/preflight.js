(function () {
  "use strict";

  const MODES = ["light", "dark", "auto"];
  const THEME_COLORS = { light: "#f2f3f5", dark: "#1c2128" };
  const THEME_META_ID = "v2p-lite-theme-color";

  function prepaint() {
    const root = document.documentElement;
    if (!root) return false;

    let mode = "auto";
    try {
      const savedMode = localStorage.getItem("v2p_lite_theme_mode");
      const legacyMode = localStorage.getItem("user_preferred_theme_mode");
      mode = MODES.includes(savedMode) ? savedMode : MODES.includes(legacyMode) ? legacyMode : "auto";
    } catch (error) {
      // Private browsing may make page storage unavailable.
    }

    let isDark = false;
    try {
      isDark =
        mode === "dark" ||
        (mode === "auto" &&
          typeof window.matchMedia === "function" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
    } catch (error) {
      // Fall back to light rather than aborting the prepaint.
    }
    const effectiveMode = isDark ? "dark" : "light";

    root.classList.toggle("v2p-theme-light-default", !isDark);
    root.classList.toggle("v2p-theme-dark-default", isDark);
    root.classList.toggle("Night", isDark);
    root.classList.add("v2p-lite-prepaint", "v2p-lite-extension");
    root.dataset.v2pLiteMode = mode;
    root.dataset.v2pLiteTheme = effectiveMode;
    root.style.colorScheme = effectiveMode;
    root.style.backgroundColor = THEME_COLORS[effectiveMode];

    // Sync the address-bar color in the same frame; lite.js reuses this meta by id.
    try {
      let meta = document.getElementById(THEME_META_ID);
      if (!meta) {
        meta = document.createElement("meta");
        meta.id = THEME_META_ID;
        meta.name = "theme-color";
        (document.head || root).appendChild(meta);
      }
      if (meta.content !== THEME_COLORS[effectiveMode]) meta.content = THEME_COLORS[effectiveMode];
    } catch (error) {
      // The meta is cosmetic; never let it break the prepaint.
    }

    return true;
  }

  // documentElement can be missing when the script is injected extremely early;
  // retry as soon as the document gains children instead of silently giving up.
  if (prepaint()) return;
  if (typeof MutationObserver !== "function") return;
  const observer = new MutationObserver(() => {
    if (prepaint()) observer.disconnect();
  });
  observer.observe(document, { childList: true });
  setTimeout(() => observer.disconnect(), 3000);
})();
