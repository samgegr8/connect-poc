// This Lambda Function will check DynamoDB to set up a DID for a call flow
    "use strict";
// Load the SDK for JavaScript
var AWS = require("aws-sdk");
// Create DynamoDB document client. To access DynamoDB you need to create an AWS.DynamoDB.DocumentClient object.
var docClient = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {

    var tableName = process.env.ROUTINGTABLE;
    var did = event.Details.ContactData.SystemEndpoint.Address;

    console.log("Connect Event:" + JSON.stringify(event));



    var getQuery =  () => {
        return new Promise((resolve, reject) => {
            let returnResult = {};
            var paramsQuery = {
                TableName: tableName,
                KeyConditionExpression: "DID = :varDID",
                ExpressionAttributeValues: {
                    ":varDID": did
                }
            };
            docClient.query(paramsQuery, function(err, data) {
                if (err) {
                    console.log(err); // an error occurred
                    reject(err);
                } else {
                    console.log("Number of returned items from DynamoDB: " + data.Items.length);
                    console.log("DynamoDB Query Results:" + JSON.stringify(data));

                    var i = 0; //while loop counter

                    if (data.Items.length > 0) {
                        returnResult.did = data.Items[i].DID;
                        returnResult.Prompt = data.Items[i].Prompt; //Initialise
                        returnResult.Queue = data.Items[i].Queue; //QueueName
                        returnResult.QueueARN = data.Items[i].QueueARN; //ARN of the Queue for setting it up when the call lands
                        returnResult.CallFlowARN = data.Items[i].CallFlowARN; //Diverting The call to the correct call flow
                        returnResult.Description = data.Items[i].Description; //Description of the flow
                        returnResult.ForwardNumber = data.Items[i].ForwardNumber;// Forwarding number for afterhours
                        returnResult.VoiceMailNumber = data.Items[i].VoiceMailNumber;// Forwarding number for afterhours
                      }
                     else {
                        returnResult.lambdaResult = "Fail"; // initialise
                    }
                console.log("Return Result: " + JSON.stringify(returnResult));
                resolve(returnResult);
                }

            });
       });
    };

    return await getQuery();
};
