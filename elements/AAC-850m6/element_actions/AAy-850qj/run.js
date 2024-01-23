function(instance, properties, context) {
    
    if (!instance.data.editor_is_ready) {
        console.log("trying to run h4 before edit is ready")
        return
    }    

    if (instance.data.active_nodes.includes("Heading") && instance.data.headings.includes(4) ) {
        instance.data.editor.chain().focus().toggleHeading({ level: 4 }).run();
    } else { console.log("tried to add a H4, but extension is not active.") }
}