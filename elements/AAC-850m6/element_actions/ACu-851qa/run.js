function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady("Add Row After");

  instance.data.editor.chain().focus().addRowAfter().run();
}