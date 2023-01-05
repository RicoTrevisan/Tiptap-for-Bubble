function(instance, properties, context) {


    let ydoc = properties.ydoc_string;
    const deserializedYDoc = Base64.toUint8Array(ydoc);
//    console.log(typeof ydocUpdate);
//    console.log(ydocUpdate.toString());
    window.yjsY.applyUpdate(instance.data.ydoc, deserializedYDoc);
//    console.log("update applied");
    



}