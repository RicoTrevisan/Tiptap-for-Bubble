function(instance, context) {

//	instance.data.editor.commands.clearContent(true);
    instance.data.editor.chain().focus().clearContent().run();


}