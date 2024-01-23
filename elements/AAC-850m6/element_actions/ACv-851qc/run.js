function(instance, properties, context) {

    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("Add Row Before")

    instance.data.editor.chain().focus().
    addRowBefore()
    .run();
}