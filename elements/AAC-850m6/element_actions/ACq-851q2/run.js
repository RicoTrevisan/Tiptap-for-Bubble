function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady(
      "table_-_toggle_header_column"
    );

  instance.data.editor.chain().focus().toggleHeaderColumn().run();
}