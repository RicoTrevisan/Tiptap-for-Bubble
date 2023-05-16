function(instance, properties, context) {

	if (instance.data.active_nodes.includes("Strike")) {
		instance.data.editor.chain().focus().toggleStrike().run();
	};
}