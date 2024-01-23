function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("trying to run horizontal_rule before edit is ready")
        return
    }

    

 if (instance.data.active_nodes.includes("HorizontalRule")) {
	instance.data.editor.chain().focus().setHorizontalRule().run();
 } else { console.log("tried to add HorizontalRule, but extension is not active.") };


}