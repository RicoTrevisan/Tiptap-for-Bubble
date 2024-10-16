function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady("Blockquote");

  if (instance.data.active_nodes.includes("Blockquote")) {
    instance.data.editor.chain().focus().toggleBlockquote().run();
  } else {
    console.log("tried to add Blockquote, but extension is not active.");
  }
}