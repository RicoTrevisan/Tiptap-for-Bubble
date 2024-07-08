function(instance, properties, context) {
    
    if (properties.collab_active === true && !properties.collab_jwt) {
        console.log("collab is active but jwt token is not yet loaded. Returning...");
        return;
    }

    // load once
    if (!instance.data.isEditorSetup) {
        let initialContent = (properties.bubble.auto_binding()) ? properties.autobinding : properties.initialContent;
        instance.data.initialContent = initialContent; // a string to keep track of what's currently in the initialContent so that the editor can change when the initialContent changes
        let content = properties.content_is_json ? JSON.parse(initialContent) : initialContent;

        let placeholder = properties.placeholder;
        let bubbleMenu = properties.bubbleMenu;
        let floatingMenu = properties.floatingMenu;
        
        let preserveWhitespace = properties.parseOptions_preserveWhitespace === 'true'
        ? true
        : properties.parseOptions_preserveWhitespace === 'false'
        ? false
        : 'full';


        // create the editor div
        const randomId = (Math.random() + 1).toString(36).substring(3);
        instance.data.randomId = randomId;
        var d = document.createElement("div");
        d.id = "tiptapEditor-" + randomId;
        d.style = "flex-grow: 1; display: flex;";
        instance.data.tiptapEditorID = d.id;
        instance.canvas.append(d);

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
        const TaskItem = window.tiptapTaskItem;
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

        const Mention = window.tiptapMention;
        const mergeAttributes = window.tiptapMergeAttributes;

        instance.data.headings = [];
        properties.headings.split(",").map((item) => {
            instance.data.headings.push(parseInt(item));
        });

        instance.data.active_nodes = properties.nodes
            .split(",")
            .map((item) => item.trim());

        const extensions = [
            Document,
            Paragraph,
            Text,
            ListItem,
            CharacterCount.configure({
                limit: properties.characterLimit || null,
            }),
        ];

        if (instance.data.active_nodes.includes("Dropcursor")) {
            extensions.push(Dropcursor);
        }
        if (instance.data.active_nodes.includes("Gapcursor")) {
            extensions.push(Gapcursor);
        }
        if (instance.data.active_nodes.includes("HardBreak")) {
            extensions.push(HardBreak);
        }
        if (instance.data.active_nodes.includes("History")) {
            extensions.push(History);
        }

        if (instance.data.active_nodes.includes("Bold")) {
            extensions.push(Bold);
        }
        if (instance.data.active_nodes.includes("Italic")) {
            extensions.push(Italic);
        }
        if (instance.data.active_nodes.includes("Strike")) {
            extensions.push(Strike);
        }

        if (instance.data.active_nodes.includes("Heading")) {
            extensions.push(
                Heading.configure({ levels: instance.data.headings }),
            );
        }

        if (instance.data.active_nodes.includes("BulletList")) {
            extensions.push(BulletList);
        }
        if (instance.data.active_nodes.includes("OrderedList")) {
            extensions.push(OrderedList);
        }
        if (instance.data.active_nodes.includes("TaskList")) {
            extensions.push(TaskList, TaskItem.configure({ nested: true }));
        }

        if (instance.data.active_nodes.includes("Mention")) {
            if (!properties.mention_list) {
                console.log("tried to use Mention extension, but mention_list is empty. Mention extension not loaded");
            } else {
                const suggestion_config = instance.data.configureSuggestion(instance, properties);
                extensions.push(Mention.configure({
                    HTMLAttributes: {
                        class: 'mention',
                    },
                    renderHTML({ options, node }) {
                        console.log("renderHTML options", options);
                        console.log("renderHTML node", node);

                        return [
                            "a",
                            mergeAttributes({ href: `${properties.mention_base_url}${node.attrs.id}` }, options.HTMLAttributes),
                            `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`,
                        ];
                    },
                    deleteTriggerWithBackspace: true,
                    suggestion: suggestion_config,
                }));
            }
        }

        if (instance.data.active_nodes.includes("Highlight")) {
            extensions.push(Highlight);
        }
        if (instance.data.active_nodes.includes("Underline")) {
            extensions.push(Underline);
        }

        if (instance.data.active_nodes.includes("CodeBlock")) {
            extensions.push(CodeBlock);
        }
        if (instance.data.active_nodes.includes("Code")) {
            extensions.push(Code);
        }

        if (instance.data.active_nodes.includes("Blockquote")) {
            extensions.push(Blockquote);
        }
        if (instance.data.active_nodes.includes("HorizontalRule")) {
            extensions.push(HorizontalRule);
        }
        if (instance.data.active_nodes.includes("Youtube")) {
            extensions.push(Youtube.configure({ nocookie: true }));
        }
        if (instance.data.active_nodes.includes("Table")) {
            extensions.push(
                Table.configure({ resizable: true }),
                TableRow,
                TableHeader,
                TableCell,
            );
        }
        if (instance.data.active_nodes.includes("Image")) {
            extensions.push(
                Image.configure({ inline: false, allowBase64: true }),
            );
        }
        if (instance.data.active_nodes.includes("Link")) {
            extensions.push(Link);
        }
        if (instance.data.active_nodes.includes("Placeholder")) {
            extensions.push(
                Placeholder.configure({ placeholder: placeholder }),
            );
        }
        if (instance.data.active_nodes.includes("TextAlign")) {
            extensions.push(
                TextAlign.configure({ types: ["heading", "paragraph"] }),
            );
        }

        let options = {};
        options = {
            element: d,
            editable: properties.isEditable,
            content: content,
            extensions: extensions,
            parseOptions: {
                preserveWhitespace: properties.parseOptions_preserveWhitespace || 'full',
            },
            injectCSS: true,
            onCreate({ editor }) {
                instance.data.editor_is_ready = true;
                instance.triggerEvent("is_ready");
                instance.publishState("is_ready", true);

                instance.publishState("contentHTML", editor.getHTML());
                instance.publishState("contentText", editor.getText());
                instance.publishState(
                    "contentJSON",
                    JSON.stringify(instance.data.editor.getJSON()),
                );
                instance.publishState("isEditable", editor.isEditable);
                if (instance.data.active_nodes.includes("CharacterCount")) {
                    instance.publishState(
                        "characterCount",
                        editor.storage.characterCount.characters(),
                    );
                    instance.publishState(
                        "wordCount",
                        editor.storage.characterCount.words(),
                    );
                };
                window.editor = editor;
                console.log("onCreate editor", editor);
            },
            onUpdate({ editor }) {
                const contentHTML = editor.getHTML();
                instance.publishState("contentHTML", contentHTML);
                instance.publishState("contentText", editor.getText());
                instance.publishState(
                    "contentJSON",
                    JSON.stringify(editor.getJSON()),
                );
                instance.publishState("isEditable", editor.isEditable);
                instance.publishState(
                    "characterCount",
                    editor.storage.characterCount.characters(),
                );
                instance.publishState(
                    "wordCount",
                    editor.storage.characterCount.words(),
                );
                
                
                if (!instance.data.isProgrammaticUpdate) {
                    instance.data.updateContent(contentHTML);
                    instance.data.isDebouncingDone = false;
                }
                


            },
            onFocus({ editor, event }) {
                instance.triggerEvent("isFocused");
                instance.publishState("isFocused", true);
                instance.data.is_focused = true;
            },
            onBlur({ editor, event }) {
                instance.triggerEvent("isntFocused");
                instance.publishState("isFocused", false);
                instance.data.is_focused = false;
                instance.publishAutobinding(editor.getHTML());
            },
            onTransaction({ editor, transaction }) {
                instance.publishState("bold", editor.isActive("bold"));
                instance.publishState("italic", editor.isActive("italic"));
                instance.publishState("strike", editor.isActive("strike"));
                instance.publishState("h1", editor.isActive("heading", { level: 1 }));
                instance.publishState("h2", editor.isActive("heading", { level: 2 }));
                instance.publishState("h3", editor.isActive("heading", { level: 3 }));
                instance.publishState("h4", editor.isActive("heading", { level: 4 }));
                instance.publishState("h5", editor.isActive("heading", { level: 5 }));
                instance.publishState("h6", editor.isActive("heading", { level: 6 }));
                instance.publishState("body", !editor.isActive("heading"));
                instance.publishState("orderedList", editor.isActive("orderedList"));
                instance.publishState("bulletList", editor.isActive("bulletList"));
                instance.publishState("sinkListItem", editor.can().sinkListItem("listItem"));
                instance.publishState("liftListItem", editor.can().liftListItem("listItem"));
                instance.publishState("blockquote", editor.isActive("blockquote"));
                instance.publishState("codeBlock", editor.isActive("codeBlock"));
                instance.publishState("taskList", editor.isActive("taskList"));
                instance.publishState("taskItem", editor.isActive("taskItem"));
                instance.publishState("link", editor.isActive("link"));
                instance.publishState("url", editor.getAttributes("link").href);
                instance.publishState("align_left", editor.isActive({ textAlign: "left" }));
                instance.publishState("align_center", editor.isActive({ textAlign: "center" }));
                instance.publishState("align_right", editor.isActive({ textAlign: "right" }));
                instance.publishState("align_justified", editor.isActive({ textAlign: "justify" }));
                instance.publishState("highlight", editor.isActive("highlight"));
                instance.publishState("underline", editor.isActive("underline"));
                instance.publishState("table", editor.isActive("table"));

                instance.publishState(
                    "characterCount",
                    editor.storage.characterCount.characters(),
                );
                instance.publishState(
                    "wordCount",
                    editor.storage.characterCount.words(),
                );
            },
            onSelectionUpdate({ editor }) {
                const { view, state } = editor;
                const { from, to } = view.state.selection;
                const text = state.doc.textBetween(from, to, "");
                instance.publishState("selected_text", text);

                instance.publishState("bold", editor.isActive("bold"));
                instance.publishState("italic", editor.isActive("italic"));
                instance.publishState("strike", editor.isActive("strike"));
                instance.publishState("h1", editor.isActive("heading", { level: 1 }));
                instance.publishState("h2", editor.isActive("heading", { level: 2 }));
                instance.publishState("h3", editor.isActive("heading", { level: 3 }));
                instance.publishState("h4", editor.isActive("heading", { level: 4 }));
                instance.publishState("h5", editor.isActive("heading", { level: 5 }));
                instance.publishState("h6", editor.isActive("heading", { level: 6 }));
                instance.publishState("orderedList", editor.isActive("orderedList"));
                instance.publishState("bulletList", editor.isActive("bulletList"));
                instance.publishState("sinkListItem", editor.can().sinkListItem("listItem"));
                instance.publishState("liftListItem", editor.can().liftListItem("listItem"));
                instance.publishState("blockquote", editor.isActive("blockquote"));
                instance.publishState("codeBlock", editor.isActive("codeBlock"));
                instance.publishState("taskList", editor.isActive("taskList"));
                instance.publishState("taskItem", editor.isActive("taskItem"));
                instance.publishState("link", editor.isActive("link"));
                instance.publishState("url", editor.getAttributes("link").href);
                instance.publishState("align_left", editor.isActive({ textAlign: "left" }));
                instance.publishState("align_center", editor.isActive({ textAlign: "center" }));
                instance.publishState("align_right", editor.isActive({ textAlign: "right" }));
                instance.publishState("align_justified", editor.isActive({ textAlign: "justify" }));
                instance.publishState("highlight", editor.isActive("highlight"));
                instance.publishState("underline", editor.isActive("underline"));
                instance.publishState("table", editor.isActive("table"));
            },
        };

        const menuErrorMessage = " not found. Is the entered id correct? FYI: the Bubble element should default to visible.";

        if (properties.bubbleMenu && instance.data.active_nodes.includes("BubbleMenu")) {
            let bubbleMenuTheme = properties.bubbleMenuTheme;
            let bubbleMenuDiv = instance.data.findElement(properties.bubbleMenu);

            if (!bubbleMenuDiv) {
                const errorMessage = "BubbleMenu" + menuErrorMessage;
                context.reportDebugger(errorMessage);
                console.log(errorMessage);
            } else {
                bubbleMenuDiv.id += randomId;
                options.extensions.push(
                    BubbleMenu.configure({
                        element: bubbleMenuDiv,
                        tippyOptions: {
                            theme: bubbleMenuTheme,
                        },
                    }),
                );
            }
        }

        if (properties.floatingMenu && instance.data.active_nodes.includes("FloatingMenu")) {
            let floatingMenuTheme = properties.floatingMenuTheme;
            let floatingMenuDiv = instance.data.findElement(properties.floatingMenu);

            if (!floatingMenuDiv) {
                const errorMessage = "FloatingMenu" + menuErrorMessage;
                context.reportDebugger(errorMessage);
                console.log(errorMessage);
            } else {
                floatingMenuDiv.id += randomId;
                options.extensions.push(
                    FloatingMenu.configure({
                        element: floatingMenuDiv,
                        tippyOptions: {
                            theme: floatingMenuTheme,
                        },
                    }),
                );
            }
        }

        instance.data.maybeSetupCollaboration(instance, properties, options, extensions);

        try {
            instance.data.editor = new Editor(options);
            instance.data.isEditorSetup = true;
        } catch (error) {
            console.log("failed trying to create the Editor", error);
        }
    }

    if (!!instance.data.editor_is_ready && properties.isEditable != instance.data.editor.isEditable) {
        let isEditable = properties.isEditable;
        instance.data.editor.setEditable(isEditable);
    }

    if (instance.data.editor_is_ready && properties.initialContent !== "" && instance.data.initialContent !== properties.initialContent && !properties.bubble.auto_binding()) {
        console.log("content has changed");

        if (!properties.collab_active) {
            instance.data.initialContent = properties.initialContent;
            let content = properties.content_is_json ? JSON.parse(instance.data.initialContent) : instance.data.initialContent;

            // Clear any pending debounce timeout before programmatic update
            clearTimeout(instance.data.debounceTimeout);

            instance.data.editor.commands.setContent(content, true);
        } else {
            console.log("initialContent has changed but collaboration is active -- not updating content");
        }
    }
    
    
    if (instance.data.editor_is_ready && instance.data.delay !== properties.update_delay) {
        console.log("Updating debounce delay from the standard " + instance.data.delay + "ms to " + properties.update_delay + "ms");
        instance.data.delay = properties.update_delay;
    }
    

    if (
        instance.data.editor_is_ready 
        && properties.bubble.auto_binding() 
        && instance.data.isDebouncingDone 
        && properties.autobinding !== instance.data.editor.getHTML()
    ) {
        // Clear any pending debounce timeout before programmatic update
        clearTimeout(instance.data.debounceTimeout);
        let editor = instance.data.editor;

        editor.commands.setContent(properties.autobinding, false);
        const contentHTML = editor.getHTML();
        instance.publishState("contentHTML", contentHTML);
        instance.publishState("contentText", editor.getText());
        instance.publishState(
            "contentJSON",
            JSON.stringify(editor.getJSON()),
        );
        instance.publishState("isEditable", editor.isEditable);
        instance.publishState(
            "characterCount",
            editor.storage.characterCount.characters(),
        );
        instance.publishState(
            "wordCount",
            editor.storage.characterCount.words(),
        );
    }


    if (!!instance.data.editor_is_ready) {
        if (!properties.bubble.fit_height()) {
            instance.canvas.css({ overflow: "scroll" });
        } else {
            instance.canvas.css({ overflow: "auto" });
        }
    }

    if (!!instance.data.editor_is_ready && !!properties.collab_active) {
        instance.data.editor.commands.updateUser({
            name: properties.collab_user_name,
            color: properties.collab_cursor_color,
        });
    }

    instance.data.stylesheet.innerHTML = `
#tiptapEditor-${instance.data.randomId} {
.ProseMirror {
	${properties.baseDiv || ""}
}

.mention {
border: 1px solid;
border-color: ${properties.mention_border_color};
background-color: ${properties.mention_background_color || "transparent"};
border-radius: 0.4rem;
padding: 0.1rem 0.3rem;
box-decoration-break: clone;
}

.suggestions {
border: 1px solid #ccc;
background-color: white;
padding: 5px;
box-shadow: 0 2px 10px rgba(0,0,0,0.2);
border-radius: 4px;
display: block; /* make sure it is visible */
position: absolute;
z-index: 1000; /* Ensure it is on top */
}

.suggestion-item {
padding: 8px 10px;
cursor: pointer;
list-style: none;
}

.suggestion-item:hover {
background-color: #eee;
}

.suggestion {
background-color: black;
color: white;
}
}

#tiptapEditor-${instance.data.randomId} .ProseMirror {

	h1 {
        font-size: ${properties.h1_size};
        color: ${properties.h1_color};
        margin: ${properties.h1_margin};
        font-weight: ${properties.h1_font_weight};
        ${properties.h1_adv}
    }

    h2 {
        font-size: ${properties.h2_size};
        color: ${properties.h2_color};
        margin: ${properties.h2_margin};
        font-weight: ${properties.h2_font_weight};
        ${properties.h2_adv}
    }

    h3 {
        font-size: ${properties.h3_size};
        color: ${properties.h3_color};
        margin: ${properties.h3_margin};
        font-weight: ${properties.h3_font_weight};
        ${properties.h3_adv}
    }

    h4 {
        font-size: ${properties.h4_size};
        color: ${properties.h4_color};
        margin: ${properties.h4_margin};
        font-weight: ${properties.h4_font_weight};
        ${properties.h4_adv}
    }

    h5 {
        font-size: ${properties.h5_size};
        color: ${properties.h5_color};
        margin: ${properties.h5_margin};
        font-weight: ${properties.h5_font_weight};
        ${properties.h5_adv}
    }

    h6 {
        font-size: ${properties.h6_size};
        color: ${properties.h6_color};
        margin: ${properties.h6_margin};
        font-weight: ${properties.h6_font_weight};
        ${properties.h6_adv}
    }

    p {
        font-size: ${properties.bubble.font_size()};
        color: ${properties.bubble.font_color()};
        font-family: ${properties.bubble.font_face().match(/^(.*?):/)[1]};
        margin: 1rem 0;
        font-weight: 400;
        ${properties.p_adv}
    }

	mark {
		${properties.mark_adv || ''}
	}

}







#tiptapEditor-${instance.data.randomId} p.is-editor-empty:first-child::before {
color: ${properties.placeholder_color || "#adb5bd"};
content: attr(data-placeholder);
float: left;
height: 0;
pointer-events: none;
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

#tiptapEditor-${instance.data.randomId} .ProseMirror ul:not([data-type="taskList"]) {
${properties.ul_adv}
}

#tiptapEditor-${instance.data.randomId} .ProseMirror ol {
${properties.ol_adv}
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

.items_${instance.data.randomId} {
padding: 0.2rem;
position: relative;
border-radius: 0.5rem;
background: #FFF;
color: rgba(0, 0, 0, 0.8);
overflow: hidden;
font-size: 0.9rem;
box-shadow:
0 0 0 1px rgba(0, 0, 0, 0.05),
0px 10px 20px rgba(0, 0, 0, 0.1);

.item {
display: block;
margin: 0;
width: 100%;
text-align: left;
background: transparent;
border-radius: 0.4rem;
border: 1px solid transparent;
padding: 0.2rem 0.4rem;

&.is-selected {
border-color: #000;
}
}
}
`;
}
