function(instance, properties, context) {
    
    if (!instance.data.editor_is_ready) {
        console.log("trying to run body before edit is ready")
        return
    }

if (instance.data.editor.can().clearNodes()) instance.data.editor.chain().focus().clearNodes().run();


}