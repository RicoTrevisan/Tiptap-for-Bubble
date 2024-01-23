function(instance, properties, context) {

    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("Insert Content")


    let content = properties.content;
    instance.data.editor.chain().focus().
    insertContent(content)
    .run();



}