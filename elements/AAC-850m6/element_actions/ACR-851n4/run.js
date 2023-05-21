function(instance, properties, context) {

    if (instance.data.active_nodes.includes("Link")) {
        instance.data.editor.commands.unsetLink();
    } else { console.log("tried to add Link, but extension is not active.") };
}