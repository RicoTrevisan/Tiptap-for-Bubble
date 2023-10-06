function(instance, properties, context) {
    
   
   

    if (!!properties.collab_active && !properties.collab_jwt ) {
        console.log("collab is active but jwt token is not yet loaded. Returning...");
        return 
    }

    
    
// load once
 if (!instance.data.isEditorSetup) {
        
    

  let initialContent = (properties.bubble.auto_binding()) ? properties.autobinding : properties.initialContent;
  instance.data.initialContent = initialContent; // a string to keep track of what's currently in the initialContent so that the editor can change when the initialContent changes
  let content = (properties.content_is_json) ? JSON.parse(initialContent) : initialContent;
     

    
    let placeholder = properties.placeholder;
  let bubbleMenu = properties.bubbleMenu;
    let floatingMenu = properties.floatingMenu;

        
        
     // create the editor div
     const randomId = (Math.random() + 1).toString(36).substring(3);
     instance.data.randomId = randomId;
     var d = document.createElement("div");
     d.id = 'tiptapEditor-' + randomId;
     d.style = "flex-grow: 1; display: flex;";
     instance.data.tiptapEditorID = d.id;
     instance.canvas.append(d);

     
     // instance.data.editor = new Editor({
     //     element: d,
     //     extensions: [
     //         Text,
     //         Paragraph,
     //         HardBreak,
     //         Document,
     //     ],
     //     content: '<p>Hello World!</p>',
     // }) 

    

  // pull the libraries that were loaded on Header
    const Document = window.tiptapDocument;
    const HardBreak = window.tiptapHardBreak;
    const Heading = window.tiptapHeading;
    const Paragraph = window.tiptapParagraph;
    const Text = window.tiptapText;
    const Bold = window.tiptapBold;
    const Code = window.tiptapCode;
    const Italic = window.tiptapItalic;
    const Strike = window.tiptapStrike;
    const Dropcursor = window.tiptapDropcursor;
    const Gapcursor = window.tiptapGapcursor;
    const History = window.tiptapHistory;
    const Blockquote = window.tiptapBlockquote;
    const BulletList = window.tiptapBulletList;
    const CodeBlock = window.tiptapCodeBlock;
    const HorizontalRule = window.tiptapHorizontalRule;
    const ListItem = window.tiptapListItem;
    const OrderedList = window.tiptapOrderedList;

    const Editor = window.tiptapEditor;
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
    const Youtube = window.tiptapYoutube;
    const generateHTML = window.tiptapGenerateHTML;
         

     // load collaboration libraries
     const Collaboration = window.tiptapCollaboration;
     const CollaborationCursor = window.tiptapCollaborationCursor;
     const TiptapCollabProvider = window.TiptapCollabProvider;


     
        

     instance.data.headings = [];
     properties.headings.split(",").map(item => {
         instance.data.headings.push(parseInt(item));

     });


     instance.data.active_nodes = properties.nodes.split(",").map(item => item.trim());
     
     const active_nodes = instance.data.active_nodes;
    
     const extensions = [
         Document,
         Paragraph,
         Text,
         ListItem,
         CharacterCount,
        ]

        
        // maybe these should be included in the standard
    if (instance.data.active_nodes.includes("Dropcursor")) {extensions.push ( Dropcursor )};
    if (instance.data.active_nodes.includes("Gapcursor")) {extensions.push ( Gapcursor )};
    if (instance.data.active_nodes.includes("HardBreak")) { extensions.push( HardBreak ) };
    if (instance.data.active_nodes.includes("History")) {extensions.push ( History )};
    
    if (instance.data.active_nodes.includes("Bold")) {extensions.push ( Bold )};
    if (instance.data.active_nodes.includes("Italic")) {extensions.push ( Italic )};
    if (instance.data.active_nodes.includes("Strike")) {extensions.push ( Strike )};

    if (instance.data.active_nodes.includes("Heading")) {extensions.push ( Heading.configure({ levels: instance.data.headings, }), )};


    // group that needs ListItem
    if (instance.data.active_nodes.includes("BulletList")) {extensions.push ( BulletList )};
    if (instance.data.active_nodes.includes("OrderedList")) {extensions.push ( OrderedList )};
    if (instance.data.active_nodes.includes("TaskList")) { extensions.push( TaskList, TaskItem.configure({ nested: true, }) )};

    if (instance.data.active_nodes.includes("Highlight")) { extensions.push( Highlight ) };
    if (instance.data.active_nodes.includes("Underline")) { extensions.push( Underline ) };
    
    if (instance.data.active_nodes.includes("CodeBlock")) {extensions.push ( CodeBlock )};
    if (instance.data.active_nodes.includes("Code")) {extensions.push ( Code )};
    
    // done fixing above


    if (instance.data.active_nodes.includes("Blockquote")) {extensions.push ( Blockquote )};
    if (instance.data.active_nodes.includes("HorizontalRule")) {extensions.push ( HorizontalRule )};
    if (instance.data.active_nodes.includes("Youtube")) {extensions.push ( Youtube.configure({ nocookie: true, }), )};
    if (instance.data.active_nodes.includes("Table")) {extensions.push ( Table.configure({ resizable: true, }), TableRow, TableHeader, TableCell, )};
    if (instance.data.active_nodes.includes("Image")) {extensions.push ( Image.configure({ inline: false, allowBase64: true, }), )};
    if (instance.data.active_nodes.includes("Link")) {extensions.push ( Link )};
    if (instance.data.active_nodes.includes("Placeholder")) {extensions.push ( Placeholder.configure({ placeholder: placeholder, }) )};
//    if (instance.data.active_nodes.includes("CharacterCount")) {extensions.push ( CharacterCount )};
    if (instance.data.active_nodes.includes("TextAlign")) {extensions.push ( TextAlign.configure({ types: ['heading', 'paragraph'], }) )};
                                             
    
     
     
     
    // 
    // create the options object    
    // 
     let options = {};
  options = {
    element: d,
    editable: true,
    content: content,
    extensions: extensions,
    injectCSS: true,
        // editorProps: {
        //     attributes: {
        //         // style: instance.data.stylesheet,
        //         // style: `ProseMirror-${instance.data.randomId}`,
        //     },
        // },
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
    onUpdate({ editor }) {
            // The content has changed.
      instance.publishState('contentHTML', editor.getHTML());
          instance.publishState('contentText', editor.getText());
      instance.publishState('contentJSON', JSON.stringify(editor.getJSON()));
          instance.publishState('isEditable', editor.isEditable);
            instance.publishState('characterCount', editor.storage.characterCount.characters());
            instance.publishState('wordCount', editor.storage.characterCount.words());
            instance.triggerEvent('contentUpdated');
            
//            if ( properties.bubble.auto_binding() == true ) {
//                instance.publishAutobinding(editor.getHTML());
//            }
            
            
            // updates the auto_binding data, but it does so only if auto_binding is on, the editor is ready, and the data actually changed
            // and it updates only every 2 seconds to not flood the editor (the timing is now configurable 
            // removed this line: !instance.data.autobinding_processing &&

    
            
            
            if ( ( properties.bubble.auto_binding() == true ) && !!instance.data.editor_is_ready &&  ( ( properties.autobinding !== editor.getHTML() ) ) ) {

                instance.data.writeToAutobinding(); // throttles the autobinding to every 2 seconds
                // instance.publishAutobinding(instance.data.editor.getHTML()); //raw-dog autobinding
                
            }

            
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
          // The editor state has changed.
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
        
        // gets the current selected text
        const { view, state } = editor;
    const { from, to } = view.state.selection;
    const text = state.doc.textBetween(from, to, '');
        instance.publishState('selected_text', text);
        
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


    } 
    //
    // end of options
    //

     

//     console.log("bubbleMenu", instance.data.findElement(properties.bubbleMenu);
//     console.log("floatingMenu", instance.data.findElement(instance.canvas);
    

     if ( (properties.bubbleMenu) && instance.data.active_nodes.includes("BubbleMenu") ) {

         let bubbleMenuTheme = properties.bubbleMenuTheme;
//         console.log(`attempting to setup bubble menu. id ${properties.bubbleMenu}`);         

         let bubbleMenuDiv = instance.data.findElement(properties.bubbleMenu);
         window.bubbleMenuDiv = bubbleMenuDiv
         bubbleMenuDiv.id += randomId
         console.log("bubbleMenuDiv",bubbleMenuDiv)
         
          options.extensions.push( BubbleMenu.configure({ element: bubbleMenuDiv, tippyOptions: {
             theme: bubbleMenuTheme,
         } }) );
     }
     
     if ( (properties.floatingMenu) && instance.data.active_nodes.includes("FloatingMenu") ) {
     let floatingMenuTheme = properties.floatingMenuTheme;
//         console.log(`setting floating menu to: ${properties.floatingMenuTheme}`);
         
         let floatingMenuDiv = instance.data.findElement(properties.floatingMenu);
         floatingMenuDiv.id += randomId
         console.log("floatingMenuDiv",floatingMenuDiv)
         
         options.extensions.push( FloatingMenu.configure({ 
             element: floatingMenuDiv, 
             tippyOptions: {
                 theme: floatingMenuTheme,
             }
         }) );
        
     }
     
     
     // set up collaboration


     if (!!properties.collab_active) {              

         // removes initialContent -- normally a collab document will have some document in the cloud.
         delete options.content;

         instance.data.provider = new TiptapCollabProvider({
             appId: properties.collab_app_id,
             name: properties.collab_doc_id,
             token: properties.collab_jwt,
         });


         extensions.push (
             Collaboration.configure({
                 document: instance.data.provider.document,
             }),
             CollaborationCursor.configure({
                 provider: instance.data.provider,
                 user: {
                     name: properties.collab_user_name,
                     color: properties.collab_cursor_color,
                 }
             }),
         );

     }


    
    // create the editor    
  instance.data.editor = new Editor(options);        
        
    
    // initialize exposed states
    instance.publishState('contentHTML', instance.data.editor.getHTML());
    instance.publishState('contentText', instance.data.editor.getText());
  instance.publishState('contentJSON', JSON.stringify(instance.data.editor.getJSON()));
    instance.publishState('isEditable', instance.data.editor.isEditable);
    if (instance.data.active_nodes.includes("CharacterCount")) {
        instance.publishState('characterCount', instance.data.editor.storage.characterCount.characters());
        instance.publishState('wordCount', instance.data.editor.storage.characterCount.words());
    };
    
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
    


    

    // handing changing of initial content
    // checks if the initial content has something -- if it's empty the user is probably using set content which means this should NOT be applicable
    if (!!instance.data.editor_is_ready && !properties.initialContent == '' && (instance.data.initialContent !== properties.initialContent) && !properties.bubble.auto_binding() ) {

        if (!properties.collab_active) {
            
            console.log("initialContent has changed");
            instance.data.initialContent = properties.initialContent;
            instance.data.editor.commands.setContent(instance.data.initialContent, true);
            
        } else {
            console.log("initialContent has changed but collaboration is active -- not updating content");
        }
    };

    
    
    
    // switch between scrolling the editor or stretching it.
    if (!!instance.data.editor_is_ready) {
        if (!properties.bubble.fit_height()) {
            instance.canvas.css({'overflow':'scroll'});
        } else {
            instance.canvas.css({'overflow':'auto'});
        }
    }
    
    
    // if collab is on, update username and color
    if (!!instance.data.editor_is_ready && !!properties.collab_active) {
        instance.data.editor.commands.updateUser({
            name: properties.collab_user_name,
            color: properties.collab_cursor_color,
            //            avatar: 'https://unavatar.io/github/ueberdosis',
        });
    }

    
    
    // update the stylesheet
    
    instance.data.stylesheet.innerHTML = `
#tiptapEditor-${instance.data.randomId} .ProseMirror {
    flex-grow: 1;

}

#tiptapEditor-${instance.data.randomId} .ProseMirror h1 {
  font-size: ${properties.h1_size};
  color: ${properties.h1_color};
  margin: ${properties.h1_margin};
  font-weight: ${properties.h1_font_weight};
  ${properties.h1_adv}
}
#tiptapEditor-${instance.data.randomId} .ProseMirror h2 {
  font-size: ${properties.h2_size};
  color: ${properties.h2_color};
  margin: ${properties.h2_margin};
  font-weight: ${properties.h2_font_weight};
  ${properties.h2_adv}
}
#tiptapEditor-${instance.data.randomId} .ProseMirror h3 {
  font-size: ${properties.h3_size};
  color: ${properties.h3_color};
  margin: ${properties.h3_margin};
  font-weight: ${properties.h3_font_weight};
  ${properties.h3_adv}
}
#tiptapEditor-${instance.data.randomId} .ProseMirror h4 {
  font-size: ${properties.h4_size};
  color: ${properties.h4_color};
  margin: ${properties.h4_margin};
  font-weight: ${properties.h4_font_weight};
  ${properties.h4_adv}
}
#tiptapEditor-${instance.data.randomId} .ProseMirror h5 {
    font-size: ${properties.h5_size};
    color: ${properties.h5_color};
    margin: ${properties.h5_margin};
    font-weight: ${properties.h5_font_weight};
  ${properties.h5_adv}
}
#tiptapEditor-${instance.data.randomId} .ProseMirror h6 {
    font-size: ${properties.h6_size};
    color: ${properties.h6_color};
    margin: ${properties.h6_margin};
    font-weight: ${properties.h6_font_weight};
  ${properties.h6_adv}
}
#tiptapEditor-${instance.data.randomId} .ProseMirror p {
    font-size: ${properties.bubble.font_size()};
    color: ${properties.bubble.font_color()};
    font-family: ${properties.bubble.font_face().match(/^(.*?):/)[1]};
    margin: 1rem 0;
    font-weight: 400;
    ${properties.p_adv}
}

#tiptapEditor-${instance.data.randomId} .ProseMirror blockquote {
    ${properties.blockquote_adv}
}

#tiptapEditor-${instance.data.randomId} .ProseMirror ul[data-type="taskList"] {
  list-style: none;
  padding: 0;
}

#tiptapEditor-${instance.data.randomId} .ProseMirror ul[data-type="taskList"] p {
  margin: 0;
}

#tiptapEditor-${instance.data.randomId} .ProseMirror ul[data-type="taskList"] li {
  display: flex;
}

#tiptapEditor-${instance.data.randomId} .ProseMirror ul[data-type="taskList"] li > label {
  flex: 0 0 auto;
  margin-right: 0.5rem;
  user-select: none;
}

#tiptapEditor-${instance.data.randomId} .ProseMirror ul[data-type="taskList"] li > div {
  flex: 1 1 auto;
}



#tiptapEditor-${instance.data.randomId} .ProseMirror table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  text-indent: 0;
}
#tiptapEditor-${instance.data.randomId} .ProseMirror th,
td {
  padding: ${properties.table_th_td_padding};
  text-align: start;
  border-bottom: ${properties.table_th_td_border_bottom} ${properties.table_row_border_color};
}
#tiptapEditor-${instance.data.randomId} .ProseMirror th {
  font-weight: ${properties.table_th_font_weight};
  text-align: left;
  background: ${properties.table_th_background};
}
#tiptapEditor-${instance.data.randomId} .ProseMirror th * {
  color: ${properties.table_header_font_color};
  font-weight: ${properties.table_th_font_weight}; 
}
#tiptapEditor-${instance.data.randomId} .ProseMirror tr:nth-of-type(odd) {
  background: ${properties.table_zebra_background};
}
.selectedCell:after {
  z-index: 2;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(200, 200, 255, 0.4);
  pointer-events: none;
}
.column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: -2px;
  width: 4px;
  background-color: #adf;
  pointer-events: none;
}

.tableWrapper {
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
#tiptapEditor-${instance.data.randomId} .ProseMirror a {
  text-decoration: underline;
  cursor: pointer;
}
#tiptapEditor-${instance.data.randomId} .ProseMirror a:link {
  color: ${properties.link_color};
}

#tiptapEditor-${instance.data.randomId} .ProseMirror a:visited {
  color: ${properties.link_color_visited};
}

#tiptapEditor-${instance.data.randomId} .ProseMirror a:focus {
}

#tiptapEditor-${instance.data.randomId} .ProseMirror a:hover {
   color: ${properties.link_color_hover};
   ${properties.link_hover_adv};
}

#tiptapEditor-${instance.data.randomId} .ProseMirror a:active {
}

#tiptapEditor-${instance.data.randomId} .ProseMirror iframe {
  ${properties.iframe}
}
#tiptapEditor-${instance.data.randomId} .ProseMirror img {
    ${properties.image_css}
}
  .collaboration-cursor__caret {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0D0D0D;
  border-right: 1px solid #0D0D0D;
  word-break: normal;
  pointer-events: none;
}


.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #0D0D0D;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
}
`      
    



}