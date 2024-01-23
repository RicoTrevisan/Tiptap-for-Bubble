function(instance, properties, context) {

    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("Bold")
    
	if (instance.data.active_nodes.includes("Bold")) {
		instance.data.editor.chain().toggleBold().focus().run();
	} else { console.log("tried to Bold, but extension is not active.") };

}