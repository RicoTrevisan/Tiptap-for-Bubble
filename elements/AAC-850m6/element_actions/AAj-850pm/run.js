function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady("Italic");

  if (instance.data.active_nodes.includes("Italic")) {
    instance.data.editor.chain().focus().toggleItalic().run();
  } else {
    console.log("tried to Italic, but extension is not active.");
  }
}