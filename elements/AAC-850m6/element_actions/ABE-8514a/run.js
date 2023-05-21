function(instance, properties, context) {

    if (instance.data.active_nodes.includes("OrderedList")) {
    instance.data.editor.chain().focus().toggleOrderedList().run();
    } else { console.log("tried to add OrderedList, but extension is not active.") }

}