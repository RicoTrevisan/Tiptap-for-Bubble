function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady("Split Cell");

  instance.data.editor.chain().focus().splitCell().run();
}