function(instance, properties, context) {

    if (instance.data.active_nodes.includes("BulletList") || instance.data.active_nodes.includes("OrderedList") || instance.data.active_nodes.includes("TaskList") ) {
        
        instance.data.editor.chain().focus().liftListItem('listItem').run();
    } else { console.log("tried to indent a list item, but no list extensions are not active.") }


}