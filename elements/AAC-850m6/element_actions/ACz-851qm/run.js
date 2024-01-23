function(instance, properties, context) {

    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("Merge Cells")


    instance.data.editor.chain().focus().
    mergeCells()
    .run();


}