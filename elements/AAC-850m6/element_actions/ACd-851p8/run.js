function(instance, properties, context) {
    

    if (!instance.data.editor_is_ready) {
        console.log("tried to run align_text before editor was ready");
        return
    }

    if (instance.data.active_nodes.includes("TextAlign")) {
        let alignment = properties.alignment;
        console.log(alignment)
        if (alignment == 'reset' ) {
            console.log(alignment == 'reset');
            instance.data.editor.chain().focus().unsetTextAlign().run();
        } else {
            console.log(alignment != 'reset');
            instance.data.editor.chain().focus().setTextAlign(alignment).run();
        }
        
    } else { console.log("tried to TextAlign, but extension is not active.") };


}