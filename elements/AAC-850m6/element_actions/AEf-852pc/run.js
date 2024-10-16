function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady("Clear Headings");

  if (instance.data.editor.can().clearNodes())
    instance.data.editor.commands.clearNodes();
}