function(instance, properties, context) {

    const documentState = window.yjsY.encodeStateAsUpdate(instance.data.ydoc);
    const base64Encoded = Base64.fromUint8Array(documentState);
    instance.publishState('ydoc', base64Encoded);
	instance.triggerEvent('ydoc_updated', console.log("ydoc_updated is updated"));



}