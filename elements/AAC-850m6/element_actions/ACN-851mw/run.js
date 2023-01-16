function(instance, properties, context) {

	let url = properties.url;
    instance.data.editor.commands.toggleLink({ href: url });

}