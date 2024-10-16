function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady("Unset color");

  if (instance.data.active_nodes.includes("Color")) {
    instance.data.editor.chain().unsetColor().focus().run();
  }
}