function(instance, properties, context) {

    if (instance.data.active_nodes.includes("Underline")) { 
        instance.data.editor.chain().focus().
        toggleUnderline()
            .run();
    } else {
        console.log("tried to underline but feature is off.")
    }


}