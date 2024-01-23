function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("tried to run table:_delete_row before editor was ready");
        return
    }


    instance.data.editor.chain().focus().
    deleteRow()
    .run();


}