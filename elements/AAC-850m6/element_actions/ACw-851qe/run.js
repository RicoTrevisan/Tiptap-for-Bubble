function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady("Delete Row");

  instance.data.editor.chain().focus().deleteRow().run();
}