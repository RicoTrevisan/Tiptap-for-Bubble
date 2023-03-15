function(instance, properties, context) {


    let content = properties.content;
    instance.data.editor.chain().focus().
    insertContent(content)
    .run();



}