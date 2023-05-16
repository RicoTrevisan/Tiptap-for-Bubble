function(instance, properties, context) {

    if (instance.data.active_nodes.includes("Heading") && instance.data.headings.includes(5) ) {
        instance.data.editor.chain().focus().toggleHeading({ level: 5 }).run();
    };

}