function(instance, properties, context) {

    if (instance.data.active_nodes.includes("Italic")) {
		instance.data.editor.chain().focus().toggleItalic().run();
	};

}