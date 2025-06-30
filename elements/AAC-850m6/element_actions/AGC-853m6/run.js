function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady("set_hard_break");

  if (instance.data.active_nodes.includes("HardBreak")) {
    instance.data.editor.chain().focus().setHardBreak().run();
  } else {
    console.log("tried to HardBreak, but extension is not active.");
  }
}