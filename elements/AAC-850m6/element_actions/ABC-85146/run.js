function(instance, properties, context) {
    
    if (!instance.data.editor_is_ready) {
        console.log("trying to run bullet_list before edit is ready")
        return
    }    

if (instance.data.active_nodes.includes("BulletList")) {
    instance.data.editor.chain().focus().toggleBulletList().run();
}
    else { console.log("tried to add a BulletList, but extension is not active.") }



}