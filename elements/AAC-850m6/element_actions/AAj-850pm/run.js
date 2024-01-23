function(instance, properties, context) {
    
    if (!instance.data.editor_is_ready) {
        console.log("trying to run italics before edit is ready")
        return
    }

    if (instance.data.active_nodes.includes("Italic")) {
		instance.data.editor.chain().focus().toggleItalic().run();
	} else { console.log("tried to Italic, but extension is not active.") };

}