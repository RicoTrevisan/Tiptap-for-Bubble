function(instance, properties, context) {
    
    if (!instance.data.editor_is_ready) {
        console.log("Tried to run clearContent before editor was ready. Error should have been avoided.");
        return
    }

	try {
		instance.data.editor.chain().clearContent(true).run();
    } catch (error) {
        context.reportToDebugger("There was an error running clearContent.\n" + error.message);
        console.error(error);
    }


}