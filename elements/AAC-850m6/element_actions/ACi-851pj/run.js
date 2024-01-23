function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("tried to run highlight before editor was ready");
        return
    }

	if (instance.data.active_nodes.includes("Highlight")) { 
		instance.data.editor.chain().focus().toggleHighlight().run();
    } else {
        console.log("tried to Highlight but extension is not active.")
    }
    



}