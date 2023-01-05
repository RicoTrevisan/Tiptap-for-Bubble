function(instance, context) {
  
    instance.data.isEditorSetup = false;
    instance.publishState('contentHTML', null);
    
    // create the editor div
	const randomId = (Math.random() + 1).toString(36).substring(3);
	var d = document.createElement("div");
    d.id = 'tiptapEditor-' + randomId;
    instance.canvas.append(d)

    
    const Editor = window.tiptapEditor;
    const StarterKit = window.tiptapStarterKit;
    const TaskList = window.tiptapTaskList;
    const TaskItem	= window.tiptapTaskItem;

	instance.data.editor = new Editor({      
      element: d,
      extensions: [      
          StarterKit,
          TaskList,
          TaskItem.configure({
	        nested: true,
    	  }),
      ],
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose focus:outline-none',
                style: 'font-family: var(--font_default)'
            },
        },
		onBeforeCreate({ editor }) {
    		// Before the view is created.
            console.log("onBeforeCreate");
		},
		onCreate({ editor }) {
			// The editor is ready.
            console.log("onCreate");
            
		},
      onUpdate: ({ editor }) => {
    	instance.publishState('contentHTML', instance.data.editor.getHTML());
        instance.publishState('contentText', instance.data.editor.getText());
//        instance.publishAutobinding(instance.data.editor.getHTML());

      },
	  onFocus({ editor, event }) {
          instance.triggerEvent('isFocused');
          instance.publishState('focus', true);
  	  },
  	  onBlur({ editor, event }) {
          instance.triggerEvent('isntFocused');
          instance.publishState('focus', false);
          
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
        instance.publishState('taskList', editor.isActive('taskList'));
        instance.publishState('taskItem', editor.isActive('taskItem'));
      },
        onDestroy() {
			instance.triggerEvent('onDestroy');
            console.log("onDestroy");
        },

    });
    
    
	// put the editor on the window. to make it easier to troubleshoot.    
    // window.editor = instance.data.editor;


}