function(instance, properties, context) {


    let url = properties.url;
    let width = properties.width;
    let height = properties.height;
    
	instance.data.editor.chain().focus().
    setYoutubeVideo({
        src: url,
		width: width,
		height: height,
    })
    .run();



}