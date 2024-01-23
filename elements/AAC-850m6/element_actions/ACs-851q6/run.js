function(instance, properties, context) {

    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("Add Column After")

    instance.data.editor.chain().focus().
    addColumnAfter()
    .run();

}