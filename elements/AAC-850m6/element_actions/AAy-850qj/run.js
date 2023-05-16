function(instance, properties, context) {

    if (instance.data.active_nodes.includes("Heading") && instance.data.headings.includes(4) ) {
        instance.data.editor.chain().focus().toggleHeading({ level: 4 }).run();
    }
}