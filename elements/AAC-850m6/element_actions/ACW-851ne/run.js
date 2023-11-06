function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("Tried to run setContent before editor was ready. Returning.");
        return
    }

    try {
        let content = (properties.is_json) ? JSON.parse(properties.content) : properties.content;
        instance.data.editor.commands.setContent(content, true);

    } catch (error) {
        context.reportToDebugger("There was an error running setContent.\n" + error.message);
        console.error(error);
    }

}