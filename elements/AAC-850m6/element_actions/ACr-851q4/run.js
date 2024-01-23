function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("tried to run delete_table before editor was ready");
        return
    }


    instance.data.editor.chain().focus().
    deleteTable()
    .run();



}