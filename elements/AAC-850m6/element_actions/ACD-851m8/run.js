function(instance, properties, context) {

    let image = properties.image;
    let title = properties.title;
    let alt_text = properties.alt_text;

    let options = { src: image, alt: alt_text, title: title };
    instance.data.editor.commands.setImage(options);



}