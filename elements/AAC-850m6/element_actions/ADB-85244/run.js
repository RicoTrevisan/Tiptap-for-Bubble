function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("tried to run underline before editor was ready");
        return
    }

    if (instance.data.active_nodes.includes("Underline")) { 
        instance.data.editor.chain().focus().
        toggleUnderline()
            .run();
    } else {
        console.log("tried to underline but feature is off.")
    }


}