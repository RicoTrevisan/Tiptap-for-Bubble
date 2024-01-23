function(instance, properties, context) {
    
    if (!instance.data.editor_is_ready) {
        console.log("trying to run strikethrough before edit is ready")
        return
    }

	if (instance.data.active_nodes.includes("Strike")) {
		instance.data.editor.chain().focus().toggleStrike().run();
	} else { console.log("tried to Strike, but extension is not active.") };
}