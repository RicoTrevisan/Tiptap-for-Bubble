function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("tried to run table:_merge_or_split before editor was ready");
        return
    }

    instance.data.editor.chain().focus().
    mergeOrSplit()
    .run();

}