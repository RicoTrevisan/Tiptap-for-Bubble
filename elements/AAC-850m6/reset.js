function(instance, context) {
    
    if (!instance.data.editor) return

    try {
		instance.data.editor.chain().clearContent().run();
    } catch (error) {
        let errorMessage = "Tried to run reset, but failed.";
        if (!instance.data.isEditorSetup) errorMessage += " Editor was not set up.";
        if (!instance.data.editor_is_ready) errorMessage += " Editor was not ready.";
        console.log(errorMessage);
        console.log(error);
    }

}