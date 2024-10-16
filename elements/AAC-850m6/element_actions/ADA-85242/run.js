function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady("Merge or Split");

  instance.data.editor.chain().focus().mergeOrSplit().run();
}