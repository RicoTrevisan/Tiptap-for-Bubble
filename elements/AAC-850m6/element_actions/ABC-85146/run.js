function(instance, properties, context) {

if (instance.data.active_nodes.includes("BulletList")) {
    instance.data.editor.chain().focus().toggleBulletList().run();
}
    else { console.log("tried to add a BulletList, but extension is not active.") }



}