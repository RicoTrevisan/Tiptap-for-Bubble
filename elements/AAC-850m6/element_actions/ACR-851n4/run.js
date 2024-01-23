function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("tried to run remove_link before editor was ready");
        return
    }

    if (instance.data.active_nodes.includes("Link")) {
        instance.data.editor.commands.unsetLink();
    } else { console.log("tried to add Link, but extension is not active.") };
}