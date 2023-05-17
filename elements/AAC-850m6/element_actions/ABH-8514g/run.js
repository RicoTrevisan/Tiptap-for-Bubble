function(instance, properties, context) {


	if (instance.data.active_nodes.includes("BulletList") || instance.data.active_nodes.includes("OrderedList") || instance.data.active_nodes.includes("TaskList") ) {
		instance.data.editor.chain().focus().sinkListItem('listItem').run();
	};

}