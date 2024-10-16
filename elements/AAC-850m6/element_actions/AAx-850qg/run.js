function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady("H3");

  if (
    instance.data.active_nodes.includes("Heading") &&
    instance.data.headings.includes(3)
  ) {
    instance.data.editor.chain().focus().toggleHeading({ level: 3 }).run();
  } else {
    console.log("tried to add a H3, but extension is not active.");
  }
}