function(properties, context) {

    const jsonwebtoken = require('jsonwebtoken');

    const doc = properties.docID;
    const docList = properties.docIDList;

    let allowedDocumentNames = [];
	if (!!doc) allowedDocumentNames.push(doc);
	if (!!docList) allowedDocumentNames.push(docList);
    const data = {
        allowedDocumentNames: allowedDocumentNames
    }

    try {
        const jwt = jsonwebtoken.sign(data, context.keys.tiptap_collab);

        return {
            jwt_key: jwt,
            error: "",
            returned_an_error: false

        }
    } catch (error) {
        return {
            jwt_key: "",
            error: "there was an error retrieving the jwt keys",
            returned_an_error: true
        }

    }
}