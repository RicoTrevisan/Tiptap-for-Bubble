function(instance, properties, context) {

    if (instance.data.active_nodes.includes("Blockquote")) {
		instance.data.editor.chain().focus().toggleBlockquote().run();
	};


}