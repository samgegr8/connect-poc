'use strict';

console.log('Loading function');
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

var AWS = require('aws-sdk');

var S3 = new AWS.S3({
    maxRetries: 0,
    region: 'ap-southeast-2',
});

var insertSuccess = 0;
var insertErrors = 0;

function dynamoResultCallback(err, data) {
    if (err) {
        insertErrors++;
        console.log("Insert Error: \n");
        console.log(err, err.stack); // an error occurred
    } else {
        insertSuccess++;
    }
}

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    console.log("Init complete, running.. \n")

    var srcBucket = event.Records[0].s3.bucket.name;
    var srcKey = event.Records[0].s3.object.key;

    console.log("Params: srcBucket: " + srcBucket + " srcKey: " + srcKey + "\n")

    S3.getObject({
        Bucket: srcBucket,
        Key: srcKey,
    }, function(err, data) {
        if (err !== null) {
            return callback(err, null);
        }
        var fileData = data.Body.toString('utf-8');
        var recordsArray = fileData.split("\n");

        for (var i = 0; i < recordsArray.length; i++) {
             var record = recordsArray[i];
              console.log("Inserting record: " + record);

            var params = {
                Item: JSON.parse(record),
                ReturnConsumedCapacity: "TOTAL",
                TableName: "PacketData"
            };
            dynamo.putItem(params, dynamoResultCallback);
        }
        console.log("Insert Result -- successCount: " + insertSuccess + " errorCount: " + insertErrors)
        return callback(null, data);
    });
};
