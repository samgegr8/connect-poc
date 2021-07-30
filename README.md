**Overview**

Project is created to build the initialisation framework for establishing a contact centre with Amazon Connect

It Consist of 2 parts
- Routing Strategy
- Holiday Calendar

*Routing Strategy*

For enabling this feature, 3 resources need to be created
1. Lambda
2. DynamoDB
3. Contact Flow

Contact Flow will invoke the Lambda to determine the Routing strategy for that calling number.
Lambda inturns call the Dynamodb which has the defined parameter

Structure of Dynamodb
----------------------

| Parameter       | Required  Flag | Description                                                              |
| --------------- | -------------- | ------------------------------------------------------------------------ |
| DID             | `True`         | System Identification Number which will be provisioned in Amazon Connect |
| CallFlowARN     | `True`         | `ARN` of the Customer Contact Flow                                       |
| Description     | `False`        | Description of the Contact Flow                                          |
| Queue           | `True`         | Queue Defined in the System                                              |
| QueueARN        | `True`         | `ARN` of the Queue                                                       |
| ForwardNumber   | `True`         | Number to be forwarded when there is no available agent                  |
| VoiceMailNumber | `True`         | Extension Number of voicemail agent                                      |


### Sample JSON

```json
{
  "CallFlowARN": "arn:aws:connect:ap-southeast-2:XXXXX:instance/xxxxx-xxxx-xxxx-xxxx-xxxxx/contact-flow/xxxxx-xxxx-xxxx-xxxx-xxxxx",
  "Description": "Call center Main Line",
  "DID": "+6173497XXXX",
  "ForwardNumber": "+614322XXXX",
  "Prompt": "<speak>Welcome to Test Solution</speak>",
  "Queue": "TESTDEPT",
  "QueueARN": "arn:aws:connect:ap-southeast-2:XXXXXXXXX:instance/xxxxx-xxxx-xxxx-xxxx-xxxxx/queue/xxxx",
  "VoiceMailNumber": "11223"
}
```

*Holiday Calendar*

This feature uses the same resources as other. It will enable to make changes or shut down related department based on the holiday or Emergency.

Structure of Dynamodb
----------------------

| Parameter      | Required  Flag | Description                                         |
| -------------- | -------------- | --------------------------------------------------- |
| QueueName      | `True`         | Department to be shutdown                           |
| Emergency_type | `True`         | Type of Emergency                                   |
| Destination    | `True`         | Type of Action to be taken i.e. Disconnect,Transfer |
| Holiday_Name   | `True`         | Identifier of the Holiday                           |
| ID             | `True`         | Unique ID of the holiday                            |
| IsEnable       | `True`         | Flag to enable the holiday                          |
| Start_Time     | `True`         | Start time of the trigger                           |
| End_Time       | `True`         | End Time of the Trigger                             |


### Sample JSON

```json
{
  "Destination": "Disconnect",
  "Emergency_type": "Public Holiday",
  "End_Time": "Jan 21 2021 23:59:00 GMT+0800",
  "Holiday_Name": "Boxing Day",
  "ID": 7,
  "IsEnable": true,
  "QueueName": "TEST",
  "Script": "<speak> Happy Boxing Day, Hope you are doing well. Today our call center is closed . You can call us tomorrow</speak>",
  "Start_Time": "Jan 21 2021 00:00:00 GMT+0800"
}
```

