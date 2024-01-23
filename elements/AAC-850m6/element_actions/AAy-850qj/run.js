function(instance, properties, context) {
    
    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("H4")

    if (instance.data.active_nodes.includes("Heading") && instance.data.headings.includes(4) ) {
        instance.data.editor.chain().focus().toggleHeading({ level: 4 }).run();
    } else { console.log("tried to add a H4, but extension is not active.") }
}