function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("tried to run insert_content before editor was ready");
        return
    }


    let content = properties.content;
    instance.data.editor.chain().focus().
    insertContent(content)
    .run();



}