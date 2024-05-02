function(properties, context) {

    const jsonwebtoken = require('jsonwebtoken');
    const { inspect } = require('node:util');

    const doc = properties.docID;
    const docList = properties.docIDList;

    let allowedDocumentNames = [];
	if (!!doc) allowedDocumentNames.push(doc);
	if (!!docList) allowedDocumentNames.push(docList);
    const data = {
        allowedDocumentNames: allowedDocumentNames
    }
    let key;
    if (properties.jwt_secret === "Tiptap Cloud") key = context.keys["Tiptap Cloud JWT secret"]
    if (properties.jwt_secret === "Custom") key = context.keys["Custom collab JWT secret"]

    try {
        const jwt = jsonwebtoken.sign(data, key);

        return {
            jwt_key: jwt,
            error: "",
            returned_an_error: false

        }
    } catch (error) {
        return {
            jwt_key: "",
            error: "there was an error retrieving the jwt keys.\n" + inspect(error),
            returned_an_error: true
        }

    }
}