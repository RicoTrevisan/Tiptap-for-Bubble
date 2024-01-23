function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("trying to run numbered_list before edit is ready")
        return
    }    
    
    if (instance.data.active_nodes.includes("OrderedList")) {
    instance.data.editor.chain().focus().toggleOrderedList().run();
    } else { console.log("tried to add OrderedList, but extension is not active.") }

}