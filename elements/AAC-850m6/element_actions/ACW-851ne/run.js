function(instance, properties, context) {

    if (!instance.data.editor_is_ready) return instance.data.returnAndReportErrorIfEditorNotReady("Set Content")

    try {
        let content = (properties.is_json) ? JSON.parse(properties.content) : properties.content;
        let preserveWhitespace = properties.parseOptions_preserveWhitespace === 'true'
        ? true
        : properties.parseOptions_preserveWhitespace === 'false'
        ? false
        : 'full';
        instance.data.editor.commands.setContent(
            content,
            true,
            {preserveWhitespace: preserveWhitespace});

    } catch (error) {
        context.reportToDebugger("There was an error running setContent.\n" + error.message);
        console.error(error);
    }

}