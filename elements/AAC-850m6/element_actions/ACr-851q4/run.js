function(instance, properties, context) {

    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("Delete Table")


    instance.data.editor.chain().focus().
    deleteTable()
    .run();



}