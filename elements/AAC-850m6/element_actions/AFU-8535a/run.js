function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady(
      "Unset font family"
    );

  if (instance.data.active_nodes.includes("FontFamily")) {
    instance.data.editor.chain().unsetFontFamily().focus().run();
  }
}