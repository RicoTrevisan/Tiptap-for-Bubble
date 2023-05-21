function(instance, properties, context) {

 if (instance.data.active_nodes.includes("HorizontalRule")) {
	instance.data.editor.chain().focus().setHorizontalRule().run();
 } else { console.log("tried to add HorizontalRule, but extension is not active.") };


}