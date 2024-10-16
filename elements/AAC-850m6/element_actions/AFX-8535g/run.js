function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady("Set color");

  if (instance.data.active_nodes.includes("Color")) {
    let color = properties.color;
    console.log("color", color);
    instance.data.editor.chain().setColor(color).focus().run();
  }
}