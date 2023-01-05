function(instance, properties, context) {

    
    // load data
    let content = properties.content;
    let savedYdoc = properties.ydoc;
    const docId = properties.id;

    

// initialize the Editor    
    
if (!instance.data.isEditorSetup) {

	// generate a randomId that will be used to hold the editor
    const randomId = (Math.random() + 1).toString(36).substring(3);
    instance.data.randomId = randomId;
    
	// create the editor div    
	instance.canvas.append(`<div id="tiptapEditor-` + randomId + `"></div>`);


    // load the needed libraries
    const Editor = window.tiptapEditor;
    const StarterKit = window.tiptapStarterKit;
    const Y = window.yjsY;
    const Collaboration = window.tiptapCollaboration;
    const WebrtcProvider = window.webrtc;
//    const CollaborationCursor = window.tiptapCollaborationCursor;    



    // setup the documents
    instance.data.ydoc = new Y.Doc();
    
    // deserialize the stored ydoc, if there's one
    if (savedYdoc !== null) {
        const binaryEncoded = Base64.toUint8Array(savedYdoc);
    	yjsY.applyUpdate(instance.data.ydoc, binaryEncoded);
    }
    
	// create the communications provider and add the Y.Doc to it.   
    instance.data.provider = new WebrtcProvider(docId, instance.data.ydoc);
    window.provider = instance.data.provider;
    
    // load the ydoc to the window for troubleshooting
    window.ydoc = instance.data.ydoc;

    // create the editor -- need to separate this into an option object
	instance.data.editor = new Editor({      
      element: document.querySelector('#tiptapEditor-' + randomId + ''),
      extensions: [      
          StarterKit.configure({
              history: false,
          }),
          Collaboration.configure({
              document: instance.data.ydoc,
          }),
      ],
//      editable: false,
    });
    
    // try to implement a synced notification when peers connect
    // instance.data.provider.awareness.on('update', event => {console.log('update fired'); console.log(event);} );
	// instance.data.provider.awareness.on('change', event => {console.log('change fired'); console.log(event);} );

    
    // add the editor to the window for troubleshooting.
    window.editor = instance.data.editor;
    
    
    // flip the switches to block running this code again.
    instance.data.isEditorSetup = true;
    instance.data.isInitialContentSetup = true;
    
    
} // end of editor set up
   




}