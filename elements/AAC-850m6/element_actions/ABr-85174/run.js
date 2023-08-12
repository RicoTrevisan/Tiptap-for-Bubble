function(instance, properties, context) {

    if (!instance.data.editor_is_ready) return
    
    if (instance.data.editor.can().focus()) {
        const position = properties.position;
        instance.data.editor.commands.focus(position);
        
    } else {
    	console.log("tried to run focus command, but cannot")
    }


}