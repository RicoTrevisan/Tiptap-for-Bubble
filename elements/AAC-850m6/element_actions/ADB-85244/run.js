function(instance, properties, context) {

    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("Underline")

    if (instance.data.active_nodes.includes("Underline")) { 
        instance.data.editor.chain().focus().
        toggleUnderline()
            .run();
    } else {
        console.log("tried to underline but feature is off.")
    }


}