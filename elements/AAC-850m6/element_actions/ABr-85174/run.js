function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        context.reportDebugger("tried to run focus before editor was ready");
        return
    }
    
    if (instance.data.editor.can().focus()) {
        const position = properties.position;
        instance.data.editor.commands.focus(position);
        
    } else {
        const message = "tried to run focus command, but cannot";
        context.reportToDebugger(message);
    	console.log(message);
    }


}