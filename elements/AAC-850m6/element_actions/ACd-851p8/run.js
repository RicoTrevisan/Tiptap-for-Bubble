function(instance, properties, context) {

	let alignment = properties.alignment;
    console.log(alignment)
    if (alignment == 'reset' ) {
        console.log(alignment == 'reset');
        instance.data.editor.chain().focus().unsetTextAlign().run();
    } else {
        console.log(alignment != 'reset');
    	instance.data.editor.chain().focus().setTextAlign(alignment).run();
    }
  //Load any data 



  //Do the operation



}