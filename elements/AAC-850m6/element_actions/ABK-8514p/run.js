function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("trying to run blockquote before edit is ready")
        return
    }


    if (instance.data.active_nodes.includes("Blockquote")) {
		instance.data.editor.chain().focus().toggleBlockquote().run();
	} else { console.log("tried to add Blockquote, but extension is not active.") };


}