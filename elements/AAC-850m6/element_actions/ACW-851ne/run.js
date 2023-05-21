function(instance, properties, context) {

    let content = (properties.is_json) ? JSON.parse(properties.content) : properties.content;
	instance.data.editor.commands.setContent(content, true);
    

}