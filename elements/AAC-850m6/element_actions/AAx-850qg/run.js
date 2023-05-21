function(instance, properties, context) {

    if (instance.data.active_nodes.includes("Heading") && instance.data.headings.includes(3) ) {
        instance.data.editor.chain().focus().toggleHeading({ level: 3 }).run();
    } else { console.log("tried to add a H3, but extension is not active.") };

}