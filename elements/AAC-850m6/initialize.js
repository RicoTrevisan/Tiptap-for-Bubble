function(instance, context) {
  

    const randomId = (Math.random() + 1).toString(36).substring(3);
    instance.data.randomId = randomId;    
    
	instance.canvas.append(`<div id="tiptapEditor-` + randomId + `"></div>`);

//    instance.data.tiptapEditor = document.getElementById('#tiptapEditor-' + randomId);

    
    const Editor = window.tiptapEditor;
    const StarterKit = window.tiptapStarterKit;
//    const TaskList = window.tiptapTaskList;
//    const TaskItem	= window.tiptapTaskItem;

	instance.data.editor = new Editor({      
      element: document.querySelector('#tiptapEditor-' + randomId + ''),
      extensions: [      
          StarterKit,
//          TaskList,
//          TaskItem.configure({
//	        nested: true,
//    	  }),
      ],
        editorProps: {
            attributes: {
//                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
                class: 'prose prose-sm sm:prose focus:outline-none',                
            },
        },
      onUpdate: ({ editor }) => {
    	instance.publishState('contentHTML', instance.data.editor.getHTML());
        instance.publishState('contentText', instance.data.editor.getText());
        instance.publishAutobinding(instance.data.editor.getHTML());
      },
      onTransaction({ editor, transaction }) {
		instance.publishState('bold', editor.isActive('bold'));
        instance.publishState('italic', editor.isActive('italic'));
        instance.publishState('strike', editor.isActive('strike'));
        instance.publishState('h1', editor.isActive('heading', { level: 1 }));
		instance.publishState('h2', editor.isActive('heading', { level: 2 }));
		instance.publishState('h3', editor.isActive('heading', { level: 3 }));
		instance.publishState('h4', editor.isActive('heading', { level: 4 }));
		instance.publishState('h5', editor.isActive('heading', { level: 5 }));
		instance.publishState('h6', editor.isActive('heading', { level: 6 }));
		instance.publishState('orderedList', editor.isActive('orderedList'));
        instance.publishState('bulletList', editor.isActive('bulletList'));
		instance.publishState('sinkListItem', editor.can().sinkListItem('listItem'));  
		instance.publishState('liftListItem', editor.can().liftListItem('listItem'));
		instance.publishState('blockquote', editor.isActive('blockquote'));
        instance.publishState('codeBlock', editor.isActive('codeBlock'));
//        instance.publishState('taskList', editor.isActive('taskList'));
//        instance.publishState('taskItem', editor.isActive('taskItem'));          

      },
    });
    
    
	// put the editor on the window. to make it easier to troubleshoot.    
    window.editor = instance.data.editor;


}