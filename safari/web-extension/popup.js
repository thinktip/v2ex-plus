"use strict";

const SETTINGS = {
  imageHost: "v2p_image_host",
  r2Endpoint: "v2p_r2_upload_endpoint",
  r2Token: "v2p_r2_upload_token",
  imgurClientId: "v2p_imgur_client_id",
  deleteRemoteImage: "v2p_delete_remote_image",
  compressImages: "v2p_compress_images",
  compressionQuality: "v2p_compression_quality",
  autoFoldReplies: "v2p_auto_fold_replies",
  replyPreview: "v2p_reply_preview",
  autoJumpReplies: "v2p_auto_jump_replies",
  topicRowSpacing: "v2p_topic_row_spacing",
  replyLineHeight: "v2p_reply_line_height",
  contentCardRadius: "v2p_content_card_radius",
  showReplyFloor: "v2p_show_reply_floor",
  showUploadPreview: "v2p_show_upload_preview",
  nestedReplies: "v2p_nested_replies",
  emojiPicker: "v2p_emoji_picker",
  fixedSidebarTools: "v2p_fixed_sidebar_tools",
  expandReplyToolbar: "v2p_expand_reply_toolbar",
  nodeIcons: "v2p_node_icons",
  showAds: "v2p_show_ads",
};
const DEFAULT_R2_ENDPOINT = "https://upload-cloud.2smile.top/upload";
const DISPLAY_SETTINGS_UPDATED = "v2p-display-settings-updated";

const form = document.querySelector("#settings-form");
const providerInputs = Array.from(document.querySelectorAll('input[name="image-host"]'));
const r2Settings = document.querySelector("#r2-settings");
const imgurSettings = document.querySelector("#imgur-settings");
const r2Endpoint = document.querySelector("#r2-endpoint");
const r2Token = document.querySelector("#r2-token");
const imgurClientId = document.querySelector("#imgur-client-id");
const deleteRemoteImage = document.querySelector("#delete-remote-image");
const compressImages = document.querySelector("#compress-images");
const compressionQualityRow = document.querySelector("#compression-quality-row");
const compressionQuality = document.querySelector("#compression-quality");
const compressionQualityValue = document.querySelector("#compression-quality-value");
const showR2Token = document.querySelector("#show-r2-token");
const saveStatus = document.querySelector("#save-status");
const saveStatusText = document.querySelector("#save-status-text");
const autoFoldReplies = document.querySelector("#auto-fold-replies");
const replyPreview = document.querySelector("#reply-preview");
const autoJumpReplies = document.querySelector("#auto-jump-replies");
const topicRowSpacingInputs = Array.from(document.querySelectorAll('input[name="topic-row-spacing"]'));
const replyLineHeight = document.querySelector("#reply-line-height");
const contentCardRadius = document.querySelector("#content-card-radius");
const showReplyFloor = document.querySelector("#show-reply-floor");
const showUploadPreview = document.querySelector("#show-upload-preview");
const nestedReplies = document.querySelector("#nested-replies");
const emojiPicker = document.querySelector("#emoji-picker");
const fixedSidebarTools = document.querySelector("#fixed-sidebar-tools");
const expandReplyToolbar = document.querySelector("#expand-reply-toolbar");
const nodeIcons = document.querySelector("#node-icons");
const showAds = document.querySelector("#show-ads");
const resetNodeOrder = document.querySelector("#reset-node-order");
const settingsTabs = Array.from(document.querySelectorAll(".settings-tab"));
const settingsPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
let autoSaveTimer = null;
let statusTimer = null;
let saveQueue = Promise.resolve();

void loadSettings();

providerInputs.forEach((input) => input.addEventListener("change", () => {
  updateProviderView();
  void queueAutoSave({ requestPermission: true });
}));
r2Endpoint.addEventListener("input", () => r2Endpoint.removeAttribute("aria-invalid"));
r2Endpoint.addEventListener("change", () => void queueAutoSave({ requestPermission: true }));
[r2Token, imgurClientId].forEach((input) => {
  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    scheduleAutoSave();
  });
  input.addEventListener("change", () => void queueAutoSave());
});
showR2Token.addEventListener("click", () => {
  const visible = showR2Token.getAttribute("aria-pressed") !== "true";
  r2Token.type = visible ? "text" : "password";
  showR2Token.setAttribute("aria-pressed", String(visible));
  showR2Token.title = visible ? "隐藏令牌" : "显示令牌";
  showR2Token.setAttribute("aria-label", showR2Token.title);
});
compressImages.addEventListener("change", () => {
  updateCompressionView();
  void queueAutoSave();
});
deleteRemoteImage.addEventListener("change", () => void queueAutoSave());
[autoFoldReplies, replyPreview, autoJumpReplies].forEach((input) => {
  input.addEventListener("change", () => void queueAutoSave());
});
[...topicRowSpacingInputs, replyLineHeight, contentCardRadius, showReplyFloor, showUploadPreview].forEach((input) => {
  input.addEventListener("change", () => void queueAutoSave());
});
[nestedReplies, emojiPicker, fixedSidebarTools, expandReplyToolbar, nodeIcons, showAds].forEach((input) => {
  input.addEventListener("change", () => void queueAutoSave());
});
resetNodeOrder.addEventListener("click", () => void restoreDefaultNodeOrder());
compressionQuality.addEventListener("input", () => {
  updateCompressionQuality();
  scheduleAutoSave(180);
});
compressionQuality.addEventListener("change", () => void queueAutoSave());
form.addEventListener("submit", (event) => {
  event.preventDefault();
  void queueAutoSave({ requestPermission: true });
});
settingsTabs.forEach((tab) => tab.addEventListener("click", () => selectSettingsTab(tab)));
settingsTabs.forEach((tab) => tab.addEventListener("keydown", handleSettingsTabKeydown));

function selectSettingsTab(selectedTab) {
  settingsTabs.forEach((tab) => {
    const selected = tab === selectedTab;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  settingsPanels.forEach((panel) => {
    panel.hidden = panel.id !== selectedTab.getAttribute("aria-controls");
  });
}

function handleSettingsTabKeydown(event) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const currentIndex = settingsTabs.indexOf(event.currentTarget);
  let nextIndex;
  if (event.key === "Home") nextIndex = 0;
  else if (event.key === "End") nextIndex = settingsTabs.length - 1;
  else nextIndex = (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + settingsTabs.length) % settingsTabs.length;
  selectSettingsTab(settingsTabs[nextIndex]);
  settingsTabs[nextIndex].focus();
}

async function loadSettings() {
  try {
    const values = await storageGet(Object.values(SETTINGS));
    const imageHost = values[SETTINGS.imageHost] === "r2" ? "r2" : "imgur";
    const selectedInput = providerInputs.find((input) => input.value === imageHost);
    if (selectedInput) selectedInput.checked = true;
    r2Endpoint.value = values[SETTINGS.r2Endpoint] || DEFAULT_R2_ENDPOINT;
    r2Token.value = values[SETTINGS.r2Token] || "";
    imgurClientId.value = values[SETTINGS.imgurClientId] || "";
    deleteRemoteImage.checked = values[SETTINGS.deleteRemoteImage] === true;
    compressImages.checked = values[SETTINGS.compressImages] === true;
    compressionQuality.value = String(clampQuality(values[SETTINGS.compressionQuality]));
    autoFoldReplies.checked = values[SETTINGS.autoFoldReplies] !== false;
    replyPreview.checked = values[SETTINGS.replyPreview] !== false;
    autoJumpReplies.checked = values[SETTINGS.autoJumpReplies] !== false;
    const topicRowSpacing = normalizeTopicRowSpacing(values[SETTINGS.topicRowSpacing]);
    const topicRowSpacingInput = topicRowSpacingInputs.find((input) => input.value === topicRowSpacing);
    if (topicRowSpacingInput) topicRowSpacingInput.checked = true;
    replyLineHeight.value = normalizeReplyLineHeight(values[SETTINGS.replyLineHeight]);
    contentCardRadius.value = normalizeContentCardRadius(values[SETTINGS.contentCardRadius]);
    showReplyFloor.checked = values[SETTINGS.showReplyFloor] !== false;
    showUploadPreview.checked = values[SETTINGS.showUploadPreview] !== false;
    nestedReplies.checked = values[SETTINGS.nestedReplies] !== false;
    emojiPicker.checked = values[SETTINGS.emojiPicker] !== false;
    fixedSidebarTools.checked = values[SETTINGS.fixedSidebarTools] !== false;
    expandReplyToolbar.checked = values[SETTINGS.expandReplyToolbar] === true;
    nodeIcons.checked = values[SETTINGS.nodeIcons] !== false;
    showAds.checked = values[SETTINGS.showAds] === true;
    updateCompressionView();
    updateProviderView();
  } catch (error) {
    showStatus("读取设置失败", true);
    console.error(error);
  }
}

function scheduleAutoSave(delay = 400) {
  if (autoSaveTimer !== null) clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    autoSaveTimer = null;
    void queueAutoSave();
  }, delay);
}

function queueAutoSave(options = {}) {
  if (autoSaveTimer !== null) {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = null;
  }
  saveQueue = saveQueue
    .catch(() => undefined)
    .then(() => saveSettings(options));
  return saveQueue;
}

async function saveSettings({ requestPermission = false } = {}) {
  const imageHost = selectedProvider();
  const endpoint = r2Endpoint.value.trim();
  const token = r2Token.value.trim();
  const clientId = imgurClientId.value.trim();
  const imageSettingsVisible = !document.querySelector("#image-settings-panel").hidden;
  if (imageSettingsVisible) {
    r2Endpoint.removeAttribute("aria-invalid");
    imgurClientId.removeAttribute("aria-invalid");
  }
  let validationMessage = "";
  let endpointCanBeSaved = isHttpsUrl(endpoint);
  const clientIdCanBeSaved = !clientId || /^[a-zA-Z0-9]+$/.test(clientId);

  if (!endpointCanBeSaved && imageHost === "r2" && imageSettingsVisible) {
    r2Endpoint.setAttribute("aria-invalid", "true");
    validationMessage = "上传地址需使用 HTTPS";
  }
  if (!clientIdCanBeSaved && imageHost === "imgur" && imageSettingsVisible) {
    imgurClientId.setAttribute("aria-invalid", "true");
    validationMessage = "Client ID 格式无效";
  }

  if (endpointCanBeSaved && imageHost === "r2") {
    try {
      await ensureEndpointPermission(endpoint, requestPermission);
    } catch (error) {
      endpointCanBeSaved = false;
      validationMessage = "无法获得上传地址权限";
      console.error(error);
    }
  }

  const values = {
    [SETTINGS.deleteRemoteImage]: deleteRemoteImage.checked,
    [SETTINGS.compressImages]: compressImages.checked,
    [SETTINGS.compressionQuality]: Number(compressionQuality.value),
    [SETTINGS.autoFoldReplies]: autoFoldReplies.checked,
    [SETTINGS.replyPreview]: replyPreview.checked,
    [SETTINGS.autoJumpReplies]: autoJumpReplies.checked,
    [SETTINGS.topicRowSpacing]: selectedTopicRowSpacing(),
    [SETTINGS.replyLineHeight]: normalizeReplyLineHeight(replyLineHeight.value),
    [SETTINGS.contentCardRadius]: Number(normalizeContentCardRadius(contentCardRadius.value)),
    [SETTINGS.showReplyFloor]: showReplyFloor.checked,
    [SETTINGS.showUploadPreview]: showUploadPreview.checked,
    [SETTINGS.nestedReplies]: nestedReplies.checked,
    [SETTINGS.emojiPicker]: emojiPicker.checked,
    [SETTINGS.fixedSidebarTools]: fixedSidebarTools.checked,
    [SETTINGS.expandReplyToolbar]: expandReplyToolbar.checked,
    [SETTINGS.nodeIcons]: nodeIcons.checked,
    [SETTINGS.showAds]: showAds.checked,
  };
  const imageConfigValid = imageHost === "r2" ? endpointCanBeSaved : clientIdCanBeSaved;
  if (imageConfigValid) {
    values[SETTINGS.imageHost] = imageHost;
    if (imageHost === "r2") {
      values[SETTINGS.r2Endpoint] = endpoint;
      values[SETTINGS.r2Token] = token;
    } else values[SETTINGS.imgurClientId] = clientId;
  }
  if (!imageConfigValid && !validationMessage) validationMessage = "图床配置未保存，请检查地址和凭据";

  try {
    await storageSet(values);
    showStatus(validationMessage || "已自动保存", Boolean(validationMessage));
    return !validationMessage;
  } catch (error) {
    showStatus("自动保存失败", true);
    console.error(error);
    return false;
  }
}

async function restoreDefaultNodeOrder() {
  resetNodeOrder.disabled = true;
  try {
    const tabs = await tabsQuery({ active: true, currentWindow: true });
    const tabId = tabs[0]?.id;
    if (typeof tabId !== "number") throw new Error("No active tab");
    await scriptingExecuteScript({
      target: { tabId },
      func: resetNodeOrderInPage,
    });
    showStatus("已恢复默认节点顺序");
  } catch (error) {
    showStatus("恢复节点顺序失败", true);
    console.error(error);
    resetNodeOrder.disabled = false;
  }
}

function resetNodeOrderInPage() {
  localStorage.removeItem("v2p_nav_config");
  location.reload();
}

function updateCompressionView() {
  compressionQualityRow.hidden = !compressImages.checked;
  updateCompressionQuality();
}

function updateCompressionQuality() {
  compressionQualityValue.textContent = `${compressionQuality.value}%`;
}

function clampQuality(value) {
  const quality = Number(value);
  if (!Number.isFinite(quality)) return 82;
  return Math.min(95, Math.max(40, Math.round(quality)));
}

function selectedTopicRowSpacing() {
  return topicRowSpacingInputs.find((input) => input.checked)?.value || "standard";
}

function normalizeTopicRowSpacing(value) {
  return ["compact", "standard", "relaxed"].includes(value) ? value : "standard";
}

function normalizeReplyLineHeight(value) {
  const normalized = String(value ?? "");
  return ["1.4", "1.6", "1.8", "2"].includes(normalized) ? normalized : "1.6";
}

function normalizeContentCardRadius(value) {
  const normalized = String(value ?? "");
  return ["0", "6", "10", "14", "18"].includes(normalized) ? normalized : "18";
}

async function ensureEndpointPermission(endpoint, requestPermission = false) {
  const url = new URL(endpoint);
  if (url.origin === new URL(DEFAULT_R2_ENDPOINT).origin) return;

  const permission = { origins: [`${url.origin}/*`] };
  if (await permissionsContains(permission)) return;
  if (!requestPermission) throw new Error("The upload endpoint has not been authorized.");
  const granted = await permissionsRequest(permission);
  if (!granted) throw new Error("The upload endpoint permission was not granted.");
}

function updateProviderView() {
  const imageHost = selectedProvider();
  r2Settings.hidden = imageHost !== "r2";
  imgurSettings.hidden = imageHost !== "imgur";
}

function selectedProvider() {
  return providerInputs.find((input) => input.checked)?.value || "imgur";
}

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function showStatus(message, isError = false) {
  if (statusTimer !== null) clearTimeout(statusTimer);
  saveStatusText.textContent = message;
  saveStatus.title = message;
  saveStatus.classList.toggle("is-error", isError);
  saveStatus.hidden = !message;
  if (!message) return;
  statusTimer = setTimeout(() => {
    saveStatus.hidden = true;
    saveStatusText.textContent = "";
    saveStatus.removeAttribute("title");
    statusTimer = null;
  }, isError ? 2600 : 1400);
}

function storageGet(keys) {
  if (globalThis.browser?.storage?.local) {
    return browser.storage.local.get(keys);
  }
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (values) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(values || {});
    });
  });
}

function storageSet(values) {
  if (globalThis.browser?.storage?.local) {
    return browser.storage.local.set(values);
  }
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(values, () => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve();
    });
  });
}

function tabsQuery(queryInfo) {
  if (globalThis.browser?.tabs) return browser.tabs.query(queryInfo);
  return new Promise((resolve, reject) => {
    chrome.tabs.query(queryInfo, (tabs) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(tabs || []);
    });
  });
}

function tabsSendMessage(tabId, message) {
  if (globalThis.browser?.tabs) return browser.tabs.sendMessage(tabId, message);
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, () => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve();
    });
  });
}

function scriptingExecuteScript(injection) {
  if (globalThis.browser?.scripting) return browser.scripting.executeScript(injection);
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript(injection, (results) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(results || []);
    });
  });
}

function permissionsContains(permission) {
  if (globalThis.browser?.permissions) {
    return browser.permissions.contains(permission);
  }
  return new Promise((resolve, reject) => {
    chrome.permissions.contains(permission, (result) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(Boolean(result));
    });
  });
}

function permissionsRequest(permission) {
  if (globalThis.browser?.permissions) {
    return browser.permissions.request(permission);
  }
  return new Promise((resolve, reject) => {
    chrome.permissions.request(permission, (granted) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(Boolean(granted));
    });
  });
}
