function(instance, properties, context) {

    if (!instance.data.editor_is_ready) return;
    const selection = instance.data.editor.commands.selectParentNode();
    console.log("selection", selection);


}