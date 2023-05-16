function(instance, properties, context) {

    if (instance.data.active_nodes.includes("Heading") && instance.data.headings.includes(2) ) {
        instance.data.editor.chain().focus().toggleHeading({ level: 2 }).run();
    };
}