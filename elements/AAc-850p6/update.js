function(instance, properties, context) {

    if (instance.data.provider?.roomName == 'needsSetup') {
        console.log("roomName is needsSetup");
        instance.data.provider.roomName = properties.id;
        console.log("roomName is now: " + instance.data.provider.roomName);
    };


// load initial document    
    if (!instance.data.editor.getText()) {
	    instance.data.editor.commands.setContent(properties.content, true);
//        editor.commands.setContent(properties.content);
    };
 
//	console.log(window.yjsY.encodeStateAsUpdateV2(instance.data.ydoc));
    
   




}