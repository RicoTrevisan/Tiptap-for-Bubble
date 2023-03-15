function(instance, properties, context) {


// load once
 if (!instance.data.isEditorSetup) {

	let initialContent = (properties.bubble.auto_binding()) ? properties.autobinding : properties.initialContent;
	let content = (properties.content_is_json) ? JSON.parse(initialContent) : initialContent;
     

    
    let placeholder = properties.placeholder;
	let bubbleMenu = properties.bubbleMenu;
    let floatingMenu = properties.floatingMenu;

        
        
    // create the editor div
	const randomId = (Math.random() + 1).toString(36).substring(3);
	var d = document.createElement("div");
    d.id = 'tiptapEditor-' + randomId;
    instance.canvas.append(d)
    
    
	// pull the libraries that were loaded on Header
    const Editor = window.tiptapEditor;
    const StarterKit = window.tiptapStarterKit;
    const TaskList = window.tiptapTaskList;
    const TaskItem	= window.tiptapTaskItem;
	const Placeholder = window.tiptapPlaceholder;
    const CharacterCount = window.tiptapCharacterCount;
	const Image = window.tiptapImage;
    const BubbleMenu = window.tiptapBubbleMenu;
	const FloatingMenu = window.tiptapFloatingMenu;
    const Link = window.tiptapLink;
    const TextAlign = window.tiptapTextAlign;
   	const Highlight = window.tiptapHighlight;
	const Table = window.tiptapTable;
	const TableCell = window.tiptapTableCell;
	const TableHeader = window.tiptapTableHeader;
	const TableRow = window.tiptapTableRow;
	const Underline = window.tiptapUnderline;     
        
    // create the options object    
	let options = {
		element: d,
        editable: true,
        content: content,
        extensions: [      
            StarterKit,
            TaskList,
            Highlight,
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'], }),
            TaskItem.configure({ nested: true, }),
            Placeholder.configure({ placeholder: placeholder, }),
            CharacterCount,
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
					class: 'rounded-xl shadow-lg',
                },
            }),
            Link,
			Table.configure({
				resizable: true,
                style: '',
			}),
			TableRow,
			TableHeader,
            TableCell.configure({
                style: 'background-color: black',
            }),

      	],
		injectCSS: true,
        editorProps: {
            attributes: {
                class: 'prose max-w-none prose-a:cursor-pointer prose-table:divide-y-2 prose-table:divide-black prose-th:font-bold prose-td:p-2 prose-tr:p-2 prose-th:p-2 prose-th:bg-gray-50',
                style: 'font-family: var(--font_default)'
            },
        },
		onBeforeCreate({ editor }) {
    		// Before the view is created.
		},
		onCreate({ editor }) {
			// The editor is ready.
            instance.data.editor_is_ready = true;
            instance.triggerEvent('is_ready');
            instance.publishState('is_ready', true);
            console.log("editor is ready");
            
		},
		onUpdate: ({ editor }) => {
			instance.publishState('contentHTML', editor.getHTML());
        	instance.publishState('contentText', editor.getText());
			instance.publishState('contentJSON', JSON.stringify(editor.getJSON()));
        	instance.publishState('isEditable', editor.isEditable);
            instance.publishState('characterCount', editor.storage.characterCount.characters());
            instance.publishState('wordCount', editor.storage.characterCount.words());
            instance.triggerEvent('contentUpdated');
            if (!!properties.bubble.auto_binding() && !!instance.data.editor_is_ready && !instance.data.autobinding_processing) {
                instance.data.autobinding_processing = true
                setTimeout(() => {
					instance.publishAutobinding(editor.getHTML());
                    instance.data.autobinding_processing = false;
                }, 2000);

            };
          
//		instance.publishAutobinding(editor.getHTML());

      },
	  onFocus({ editor, event }) {
          instance.triggerEvent('isFocused');
          instance.publishState('isFocused', true);
		  instance.data.is_focused = true;
  	  },
  	  onBlur({ editor, event }) {
          instance.triggerEvent('isntFocused');
          instance.publishState('isFocused', false);
          instance.data.is_focused = false;
          
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
        instance.publishState('link', editor.isActive('link'));
        instance.publishState('url', editor.getAttributes('link').href);
        instance.publishState('align_left', editor.isActive({ textAlign: 'left' }) );
		instance.publishState('align_center', editor.isActive({ textAlign: 'center' }) );
		instance.publishState('align_right', editor.isActive({ textAlign: 'right' }) );
        instance.publishState('highlight', editor.isActive('highlight'));
		instance.publishState('underline', editor.isActive('underline'));
		instance.publishState('table', editor.isActive('table'));
      },
    onSelectionUpdate({ editor }) {
        const { view, state } = editor;
		const { from, to } = view.state.selection;
		const text = state.doc.textBetween(from, to, '');
        instance.publishState('selected_text', text);
  },


    } // end of options


	if (properties.bubbleMenu != '') {
        let bubbleMenuDiv = document.querySelector("#" + properties.bubbleMenu);
        options.extensions.push( BubbleMenu.configure({ element: bubbleMenuDiv, }) );
    }
     
     if (properties.floatingMenu != '') {
         let floatingMenuDiv = document.querySelector("#" + properties.floatingMenu);
         options.extensions.push( FloatingMenu.configure({ element: floatingMenuDiv }) );
     }
     


    
    // create the editor    
	instance.data.editor = new Editor(options);        
    window.editor = instance.data.editor;
        
    
    // initialize exposed states
    instance.publishState('contentHTML', instance.data.editor.getHTML());
    instance.publishState('contentText', instance.data.editor.getText());
	instance.publishState('contentJSON', JSON.stringify(instance.data.editor.getJSON()));
    instance.publishState('isEditable', instance.data.editor.isEditable);
    instance.publishState('characterCount', instance.data.editor.storage.characterCount.characters());
    instance.publishState('wordCount', instance.data.editor.storage.characterCount.words());
     instance.data.initialContent = instance.data.editor.getHTML();
        
		instance.data.isEditorSetup = true;
	} // end load once

    
    
    //
    // run when the editor is ready
    //
	if (!!instance.data.editor_is_ready && (properties.isEditable != instance.data.editor.isEditable) ) {
		let isEditable = properties.isEditable;
        instance.data.editor.setEditable(isEditable);
    }
    
	if (instance.data.editor_is_ready && !instance.data.is_focused && !!properties.bubble.auto_binding()) {
        let content = properties.autobinding;
        instance.data.editor.commands.setContent(content, true);
    };
    

/*  intent was to guess when the initialContent changed and do something with it
	but that goes against the idea of initialContent. 
    Removing it.
    if (instance.data.editor_is_ready && properties.initialContent != instance.data.initialContent && !properties.bubble.auto_binding()) {
        console.log("sequence has run");
        let content = properties.initialContent;
        instance.data.initialContent = content;
        instance.data.editor.commands.setContent(content, true);
    }
*/

}