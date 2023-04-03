function(instance, context) {

    // this boolean turns true after the setup has been done, but the editor might not yet be initialized.
    // if the setup runs twice, it can add double initial data, etc.
    instance.data.isEditorSetup = false;
    
    // this boolean turns true when the editor is initialized and ready.
	instance.data.editor_is_ready = false;

    // autobinding can be overwhelmed by Tiptap. To handle that, this boolean turns true while setTimeout is running.
    instance.data.autobinding_processing = false;
    instance.publishState('is_ready', false);
    
//    instance.canvas.css({'overflow':'scroll'});

}