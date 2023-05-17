function(instance, properties, context) {

    if (instance.data.active_nodes.includes("TaskList")) { 
        instance.data.editor.chain().focus().toggleTaskList().run();
    };


}