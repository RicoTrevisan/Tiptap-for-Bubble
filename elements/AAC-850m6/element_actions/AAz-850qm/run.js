function(instance, properties, context) {
    
    if (!instance.data.editor_is_ready) {
        console.log("trying to run h5 before edit is ready")
        return
    }    

    if (instance.data.active_nodes.includes("Heading") && instance.data.headings.includes(5) ) {
        instance.data.editor.chain().focus().toggleHeading({ level: 5 }).run();
    } else { console.log("tried to add a H5, but extension is not active.") };

}