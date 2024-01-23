function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("trying to run task_list before edit is ready")
        return
    }


    if (instance.data.active_nodes.includes("TaskList")) { 
        instance.data.editor.chain().focus().toggleTaskList().run();
    } else { console.log("tried to add TaskList, but extension is not active.") };;


}