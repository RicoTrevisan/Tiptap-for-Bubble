function(instance, properties, context) {
  if (!instance.data.editor_is_ready)
    return instance.data.returnAndReportErrorIfEditorNotReady("Task List");

  if (instance.data.active_nodes.includes("TaskList")) {
    instance.data.editor.chain().focus().toggleTaskList().run();
  } else {
    console.log("tried to add TaskList, but extension is not active.");
  }
}