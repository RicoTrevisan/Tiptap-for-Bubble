function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("tried to run add_youtube before editor was ready");
        return
    }


    let url = properties.url;
    let width = properties.width;
    let height = properties.height;
    
	instance.data.editor.chain().focus().
    setYoutubeVideo({
        src: url,
//		width: width,
//		height: height,
    })
    .run();



}