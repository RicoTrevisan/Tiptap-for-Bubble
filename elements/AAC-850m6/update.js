function(instance, properties, context) {


    
if (!instance.data.editor.getText()) {
    console.log("loading content.\nContent to load is: " + properties.content);
    instance.data.editor.commands.setContent(properties.content, true);
}



}