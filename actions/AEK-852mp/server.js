function(properties, context) {

    const jsonwebtoken = require('jsonwebtoken');

    const doc = properties.doc_id;
	const data = {
        allowedDocumentNames: [ doc ]
    }
    
    const jwt = jsonwebtoken.sign(data, context.keys.tiptap_collab);
    
	return { jwt_key: jwt }

}