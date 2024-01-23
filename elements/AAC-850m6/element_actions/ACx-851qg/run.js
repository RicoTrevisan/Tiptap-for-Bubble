function(instance, properties, context) {

    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("Delete Column")


    instance.data.editor.chain().focus().
    deleteColumn()
    .run();

}