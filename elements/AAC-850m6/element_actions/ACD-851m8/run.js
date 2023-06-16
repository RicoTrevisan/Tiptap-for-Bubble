function(instance, properties, context) {

    if (instance.data.active_nodes.includes("Image")) {

        let image = properties.insert_image;
        if (!image) return
        
        const options = {}
        
        let title = properties.title;
        let alt_text = properties.alt_text;
        
        options.src = image;
        if (title) { options.title = title };
        if (alt_text) { options.alt = alt_text };

        //let options = { src: image, alt: alt_text, title: title };
        instance.data.editor
            .chain()
            .focus()
            .setImage(options)
            .run();
    } else { console.log("tried to add Image, but extension is not active.") };


}