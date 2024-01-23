function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("tried to run table:_add_row_after before editor was ready");
        return
    }

    instance.data.editor.chain().focus().
    addRowAfter()
    .run();

}