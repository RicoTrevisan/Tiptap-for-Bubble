function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("trying to run code_block before edit is ready")
        return
    }


    if (instance.data.active_nodes.includes("CodeBlock")) {
		instance.data.editor.chain().focus().toggleCodeBlock().run();
	} else { console.log("tried to add CodeBlock, but extension is not active.") };


}