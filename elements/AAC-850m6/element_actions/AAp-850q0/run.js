function(instance, properties, context) {
    
    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("H1")

    if (instance.data.active_nodes.includes("Heading") && instance.data.headings.includes(1) ) {
        instance.data.editor.chain().focus().toggleHeading({ level: 1 }).run();
    } else { console.log("tried to add a H1, but extension is not active.") };


}