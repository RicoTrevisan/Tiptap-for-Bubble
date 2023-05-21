function(instance, properties, context) {

    if (instance.data.active_nodes.includes("Link")) {
        let url = properties.url;
        instance.data.editor.commands.toggleLink({ href: url });
    } else { console.log("tried to add Link, but extension is not active.") };
}