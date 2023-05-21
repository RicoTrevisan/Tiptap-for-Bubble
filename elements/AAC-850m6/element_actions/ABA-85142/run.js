function(instance, properties, context) {

    if (instance.data.active_nodes.includes("Heading") && instance.data.headings.includes(6) ) {
        instance.data.editor.chain().focus().toggleHeading({ level: 6 }).run();
    }     else { console.log("tried to add a H6, but extension is not active.") };

}