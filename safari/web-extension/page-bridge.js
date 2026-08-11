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
