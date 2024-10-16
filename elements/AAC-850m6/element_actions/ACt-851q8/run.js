function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady(
      "Add Column Before"
    );

  instance.data.editor.chain().focus().addColumnBefore().run();
}