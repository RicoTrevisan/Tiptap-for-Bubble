function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady("Insert Content");

  let content = properties.content;
  // if FROM is present, then use insertContentAt
  // ensure that FROM is present if TO is present.
  let from = properties.from;
  let to = properties.to;
  let updateSelection = properties.updateSelection;
  if (from) {
    let location;
    location = from;
    if (from && to) {
      location = { from: from, to: to };
    }
    let options = {};
    options.updateSelection = updateSelection;
    instance.data.editor
      .chain()
      .focus()
      .insertContentAt(location, content, options)
      .run();
  } else {
    instance.data.editor.chain().focus().insertContent(content).run();
  }
}