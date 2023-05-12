function(instance, properties, context) {

	if (instance.data.active_nodes.includes("Highlight")) { 
		instance.data.editor.chain().focus().toggleHighlight().run();
    } else {
        console.log("tried to higlight but feature is off.")
    }
    



}