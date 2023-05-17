function(instance, properties, context) {

    if (instance.data.active_nodes.includes("CodeBlock")) {
		instance.data.editor.chain().focus().toggleCodeBlock().run();
	};


}