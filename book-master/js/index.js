console.log('Starting to process data');

const doc = require('aws-sdk');
doc.config.update({region:'ap-south-1'});
const dynamo = new doc.DynamoDB({apiVersion: '2012-08-10'});


exports.handler = (event, context, callback) => {
    let dbParams = {'TableName':'Books'};
    console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Header': '*',
            'Access-Control-Allow-Method': '*'
        },
    });

    switch (event.httpMethod) {
        case 'DELETE':
            dbParams.Key = RemoveItem(JSON.parse(event.body));
            
            dynamo.deleteItem(dbParams, done);
            break;
        case 'GET':
            dynamo.scan(dbParams, done);
            break;
        case 'POST':
            let currentBook= JSON.parse(event.body);
            dbParams.Item = buildItem(currentBook);
            dynamo.putItem(dbParams, done);
            break;
        case 'PUT':
            let updatingBook= JSON.parse(event.body);
            var params=updateItem(updatingBook)
            dynamo.updateItem(params, done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }

};

function buildItem(currentBook){
    
    return  {
            "bookId" : { S: currentBook.bookId},
             "BookName":{S: currentBook.BookName},
             "Genre":{S: currentBook.Genre}
         };
}
    


function RemoveItem(toremove){
    return {
      "bookId" : { S: toremove.bookId }
    };
}
function updateItem(updateBook) {
    return {
        ExpressionAttributeNames: {
            "#BN": "BookName",
            "#GN": "Genre"
        },
        ExpressionAttributeValues: {
            ":bn": {
                S: updateBook.BookName
            },
            ":gn": {
                S: updateBook.Genre
            }
        },
        Key: {
            "bookId": { S: updateBook.bookId }
        },
        ReturnValues: "ALL_NEW",
        TableName: "Books",
        UpdateExpression: "SET #BN = :bn, #GN =:gn"
    };
}
