function(instance, properties, context) {

    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("H2")
    
    if (instance.data.active_nodes.includes("Heading") && instance.data.headings.includes(2) ) {
        instance.data.editor.chain().focus().toggleHeading({ level: 2 }).run();
    } else { console.log("tried to add a H2, but extension is not active.") };
}