function(instance, properties, context) {

	if (instance.data.active_nodes.includes("Highlight")) { 
		instance.data.editor.chain().focus().toggleHighlight().run();
    } else {
        console.log("tried to Highlight but extension is not active.")
    }
    



}