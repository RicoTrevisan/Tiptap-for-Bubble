function(instance, properties, context) {
    
    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("Clear Contents")

	try {
		instance.data.editor.chain().clearContent(true).run();
    } catch (error) {
        context.reportToDebugger("There was an error running clearContent.\n" + error.message);
        console.error(error);
    }


}