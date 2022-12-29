function(instance, context) {
  

    const editor = window.editor;
    const randomId = (Math.random() + 1).toString(36).substring(3);
    instance.data.randomId = randomId;

    
	instance.canvas.append(`<button class="menu-item";
								onclick="editor.chain().focus().toggleBold().run()"
								:disabled="!editor.can().chain().focus().toggleBold().run()" 	
								:class="{ 'is-active': editor.isActive('bold') }">
							bold
							</button>`);
    
    
	instance.canvas.append(`<div id="tiptapEditor-` + randomId + `"></div>`);

//    instance.data.tiptapEditor = document.getElementById('#tiptapEditor-' + randomId);

    
    const Editor = window.tiptapEditor;
    const StarterKit = window.tiptapStarterKit;
    const Y = window.yjsY;
    const Collaboration = window.tiptapCollaboration;
    const WebrtcProvider = window.webrtc;
    

//    const CollaborationCursor = window.tiptapCollaborationCursor;

    // setup the documents
    instance.data.ydoc = new Y.Doc();
    instance.data.provider = new WebrtcProvider('needsSetup', instance.data.ydoc);
    window.provider = instance.data.provider;

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
//      content: '<p>Example Text</p>',
      autofocus: true,
      onUpdate: ({ editor }) => {
    	instance.publishState('contentHTML', editor.getHTML());
		instance.publishState('contentJSON', JSON.stringify(editor.getJSON()));
        instance.publishState('contentText', editor.getText());  
        instance.publishAutobinding(editor.getHTML());

      },
    });
    
    window.editor = instance.data.editor;
    
//    window.editor = instance.data.editor;
//	window.editor.commands.clearContent();


}