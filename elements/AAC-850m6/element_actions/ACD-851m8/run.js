function(instance, properties, context) {

    if (instance.data.active_nodes.includes("Image")) {
        let image = properties.image;
        let title = properties.title;
        let alt_text = properties.alt_text;

        let options = { src: image, alt: alt_text, title: title };
        instance.data.editor.commands.setImage(options);
    } else { console.log("tried to add Image, but extension is not active.") };


}