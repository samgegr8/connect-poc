// This Lambda Function will check if a variable is set in DynamoDB to see if there is a Public Holiday in Australia

// Load the SDK for JavaScript
var AWS = require("aws-sdk");
// Create DynamoDB document client. To access DynamoDB you need to create an AWS.DynamoDB.DocumentClient object.
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  //process.env.TZ = 'Australia/Melbourne';
  var holidayTable = process.env.HOLIDAYTABLE; //Name of the table in DynamoDB
  var Queue = event.Details.Parameters.ThisQueue;
  // This usually comes from the DID Initialisation table
  console.log("Connect Event:" + JSON.stringify(event));

  var getQuery = () => {
    return new Promise((resolve, reject) => {

        var paramsQuery = {
          TableName: holidayTable,
          KeyConditionExpression: "QueueName = :varQueue and ID > :varID",
          ExpressionAttributeValues: {
            ":varID": 0,
            ":varQueue": Queue
          }
        };



      docClient.query(paramsQuery, function(err, data) {
        if (err) {
          console.log(err); // an error occurred
          reject(err);
        } else {
          console.log(
            "Number of returned items from DynamoDB: " + data.Items.length
          );
          console.log("DynamoDB Query Results:" + JSON.stringify(data));

          var returnResult = {}; //Initialias return object
          var i = 0; //while loop counter

          if (data.Items.length > 0) {
            returnResult.Script = ""; //Initialise
            returnResult.Emergency_type = ""; //Iniitalise
            returnResult.Destination = ""; //Initialise

            while (i < data.Items.length) {
              console.log(data.Items[i].Start_Time);
              console.log(data.Items[i].End_Time);
              console.log(Date.now());

              var varStart = Date.parse(data.Items[i].Start_Time); //Assuming AEST
              var varEnd = Date.parse(data.Items[i].End_Time); //Assuming AEST
              var varNow = Date.now(); //now is in UTC so assuming AEST

              if (
                data.Items[i].IsEnable === true &&
                data.Items[i].QueueName === Queue
              ) {
                if ((varStart < varNow) & (varEnd > varNow)) {
                  console.log("Holiday List Found for the Given Queue");
                  returnResult.Script = data.Items[i].Script;
                  returnResult.Emergency_type = data.Items[i].Emergency_type;
                  returnResult.Destination = data.Items[i].Destination;
                  returnResult.Holiday_Name = data.Items[i].Holiday_Name;
                }
              }
              i++;
            }
          } else {
            returnResult.lambdaResult = "Fail"; // initialise
            returnResult.Script = ""; //Initialise
            returnResult.Emergency_type = ""; //Iniitalise
            returnResult.Destination = ""; //Initialise
            returnResult.Holiday_Name ="";
          }
          console.log("Return Result: " + JSON.stringify(returnResult));
          resolve(returnResult);
        }
      });
    });
  };

  return await getQuery();
};
