function(instance, properties, context) {

    // load the content
    let content = properties.content;

    
	// load content if the editor is empty
    // and the editor is not focused, meaning, the user has erased the content.
    if (instance.data.editor.isEmpty && !instance.data.editor.isFocused) {
        instance.data.editor.commands.setContent(content);
    }
    
    

	    // load once
    if (!instance.data.isEditorSetup) {
        
		instance.data.isEditorSetup = true;
	}    
                       

}