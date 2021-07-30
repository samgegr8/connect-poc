**Overview**

The Voicemail for Amazon Connect solution helps call center administrators and managers automate a voicemail solution using [Amazon Connect](https://aws.amazon.com/connect/). A customer can call in, enter the extension number of the agent they want to speak with, and leave a voicemail for that specific agent. The solution generates voicemail recordings and transcripts that are delivered to agents using their preferred communication setting: SMS and/or email.

This solution launches a web portal that administrators and managers can sign in to and configure voicemail settings for each agent. They have the options to transcribe the voicemails using Amazon Transcribe and decide whether to send the voicemail recording as a `.wav` file or an encrypted Amazon S3 URL.

In 30 minutes or less, your customers can leave voicemails for Amazon Connect agents who will receive emails and/or text messages with the voicemail recordings and transcripts.

**Cost**

You are responsible for the cost of the AWS services used while running this reference deployment. As of the date of publication, the cost for running this solution with default settings in the US East (N. Virginia) Region is approximately $0.035 for each minute-long voicemail. Prices are subject to change. For full details, see the pricing webpage for each AWS service used in this solution.

After you deploy the Voicemail for Amazon Connect AWS CloudFormation template, enable the [AWS Cost and Usage Report](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html) to track costs associated with the deployment. This report delivers billing metrics to an Amazon Simple Storage Service (Amazon S3) bucket in your account. It provides cost estimates based on usage throughout each month and finalizes the data at the end of the month. For more information about the report, see [What Are AWS Cost and Usage Reports?](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html) in the Cost and Usage Report User Guide


Before you launch the automated deployment, please review the architecture, configuration, and other consideration discussed in this guide. Follow the step-by-step instructions in this section to configure and deploy Voicemail for Amazon Connect into your account.

Time to deploy: Approximately 30 minutes

Prerequisites
-------------

Technical Requirements

To deploy this solution, you will need:

-   An active AWS account. If you don't have an AWS account, you can create one at [https://aws.amazon.com.](https://aws.amazon.com/)

-   An Amazon Connect Instance with administrative permissions.

    1.  Update the telephony options to enable users to call your contact center. Choose I want to handle incoming calls with Amazon Connect.

    2.  Copy your Amazon Connect instance ID to a text file. You can locate your instance ID in the Overview section for your Amazon Connect instance.

        `Instance ARN: arn:aws:connect:us-east-1:`XXXXXXXXX`:instance/`<Instance ID>``

        For information on creating an instance, see [Create an Amazon Connect Instance](https://docs.aws.amazon.com/connect/latest/adminguide/amazon-connect-instances.html) in the *Amazon Connect Administrator Guide*.

-   The AWS Identify and Access Management (IAM) rights to launch AWS CloudFormation templates that create IAM roles. For information on IAM rights, see [Getting Started](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started.html) in the *AWS Identify and Access Management User Guide*.

What We'll Cover
----------------

The procedure for deploying this architecture on AWS consists of the following steps. For detailed instructions, follow the links for each step.

[Step 1. Launch the Stack](https://docs.aws.amazon.com/solutions/latest/voicemail-for-amazon-connect/deployment.html#step1)

Launch the stack

-   Launch the AWS CloudFormation template into your AWS account.

-   Enter values for required parameters: Amazon Connect instance ID, admin email, admin first name, admin last name, manager email, manager first name, manager first name, manager last name, and delivery email.

-   Review the other template parameters, and adjust if necessary.

[Step 2. Configure Your Amazon Connect Instance](https://docs.aws.amazon.com/solutions/latest/voicemail-for-amazon-connect/deployment.html#step2)

[Step 3. Log in to the Voicemail for Amazon Connect Management Portal](https://docs.aws.amazon.com/solutions/latest/voicemail-for-amazon-connect/deployment.html#step3)

[Step 4. Generate and Download Contact Flows](https://docs.aws.amazon.com/solutions/latest/voicemail-for-amazon-connect/deployment.html#step4)

[Step 5. Import Contact Flows](https://docs.aws.amazon.com/solutions/latest/voicemail-for-amazon-connect/deployment.html#step5)

[Step 6. Claim a Phone Number](https://docs.aws.amazon.com/solutions/latest/voicemail-for-amazon-connect/deployment.html#step6)

[Step 7. Leave a Voicemail](https://docs.aws.amazon.com/solutions/latest/voicemail-for-amazon-connect/deployment.html#step7)

Step 1. Launch the Stack
------------------------

This automated AWS CloudFormation template deploys Voicemail for Amazon Connect in the AWS Cloud. You must have an AWS account and a configured Amazon Connect instance before launching the stack.

Note

You are responsible for the cost of the AWS services used while running this solution. See the [Cost](https://docs.aws.amazon.com/solutions/latest/voicemail-for-amazon-connect/overview.html#cost) section for more details. For full details, see the pricing webpage for each AWS service you will be using in this solution.

1.  Sign in to the AWS Management Console and click the button below to launch the Voicemail for Amazon Connect AWS CloudFormation template.

    [![
                                    Voicemail for Amazon Connect launch button
                                ](https://docs.aws.amazon.com/solutions/latest/voicemail-for-amazon-connect/images/launch-button.png) ](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?&templateURL=https:%2F%2Fs3.amazonaws.com%2Fsolutions-reference%2Fvoicemail-for-amazon-connect%2Flatest%2Fvoicemail-for-amazon-connect.template)

    You can also [download the template](https://s3.amazonaws.com/solutions-reference/voicemail-for-amazon-connect/latest/voicemail-for-amazon-connect.template) as a starting point for your own implementation.

2.  The template launches in the US East (N. Virginia) Region by default. To launch this solution in a different AWS Region, use the Region selector in the console navigation bar.

    Note

    This solution uses the Amazon Connect, Amazon Transcribe, Amazon Kineses Video Stream services, and Amazon Simple Email Service which are currently available in specific AWS Regions only. Therefore, you must launch this solution in an AWS Region where those services are available. For the most current service availability by region, see [AWS service offerings by region](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

3.  On the Create stack page, verify that the correct template URL shows in the Amazon S3 URL text box and choose Next.

4.  Navigate to the Specify stack details page. Name your solution stack.

5.  Navigate to the Parameters page. Review the parameters for the template and modify them as necessary. This solution uses the following default values.

    Use the following parameters for the Voicemail for Amazon Connect solution.

    | Parameter                                | Default            | Description                                                                                                                                                                                                                                                           |
    | ---------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Amazon Connect Instance ID               | `<Requires input>` | The instance ID of your Amazon Connect instance.                                                                                                                                                                                                                      |
    | Recordings URL Expiration Time (seconds) | `900`              | The time when the encrypted Amazon S3 URL expires. Provide a different number if you want to extend or shorten the expiration time of the URL (maximum of seven days). After the URL expires, the admin must give the agent a new URL. The default 900 is 15 minutes. |

    This solution uses the following parameters for the Voicemail for Amazon Connect Management Portal.

    | Parameter               | Default            | Description                                                                                                                                                                                                                                                                                                   |
    | ----------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Admin Email             | `<Requires input>` | The administrator email address for the Voicemail for Amazon Connect Management Portal. An email is sent to this email address with the temporary password.                                                                                                                                                   |
    | Admin First Name        | `Jane`             |                                                                                                                                                                                                                                                                                                               |
    | Admin Last Name         | `Doe`              |                                                                                                                                                                                                                                                                                                               |
    | Manager Email           | `<Requires input>` | The manager email address for the Voicemail for Amazon Connect Management Portal. An email is sent to this email address with the temporary password. Managers cannot change the global voicemail encryption and transcription settings. This must be a different email address than the admin email address. |
    | Manager First Name      | `John`             |                                                                                                                                                                                                                                                                                                               |
    | Manager Last Name       | `Doe`              |                                                                                                                                                                                                                                                                                                               |
    | Delivery Email          | `<Requires input>` | The transcription delivery email. This email must be verified by Amazon Simple Email Service before deploying the stack.                                                                                                                                                                                      |
    | IsSamlInstance          | `false`            | Determines whether you are using SAML for your Amazon Connect instance. The default value is `false`. Set to `true` if you are using SAML for your Amazon Connect instance. NoteIf using SAML, you must deploy a new stack. You can only update the stack if this parameter is set to `false`.                |
    | Allowable SMS Countries | AU                 | The list of AWS Regions delineated by commas available for SMS messages when voicemail transcripts are sent. For more information, refer to the [Supported Regions and Countries list](https://docs.aws.amazon.com/sns/latest/dg/sns-supported-regions-countries.html).                                       |
    | User Pool Domain Prefix | `<Requires input>` | The prefix for the Amazon Cognito user pool domain. this must be all lowercase and accepts the '-' character. The domain is globally unique.                                                                                                                                                                  |

6.  Choose Next.

7.  On the Configure stack options page, choose Next.

8.  On the Review page, review and confirm the settings. Check the boxes acknowledging that the template will create AWS Identity and Access Management (IAM) resources, and acknowledging that AWS CloudFormation may require the capability `CAPABILITY_AUTO_EXPAND`.

9.  Choose Create stack to deploy the stack.

    The AWS CloudFormation template deploys three additional nested stacks:

    -   *CopyLambdaArtifacts*: Deploys an S3 bucket that will hold the Lambda artifacts copied from the hosted bucket.

    -   *VoicemailStack*: Deploys the serverless infrastructure that drives the Voicemail for Amazon Connect Management Portal, audio recording processing, job transcription, user management DynamoDB tables, and other resources referenced in Figure 1.

    -   *VoicemailPortalStack*: Deploys the CloudFront distribution that serves the files in the S3 `voicemail-portal` S3 bucket.

During deployment, temporary passwords are delivered to the Admin and Manager Email from no-reply@verificationemail.com. Use these credentials to log into the Voicemail for Amazon Connect Management Portal.

You can view the status of the stack in the AWS CloudFormation console in the Status column. You should see a status of CREATE_COMPLETE in approximately 30 minutes. However, depending on the AWS Region in which you deployed the stack, it may take a additional time beyond the 30 minutes for the CloudFront distribution to create and populate the Amazon Connect Voicemail Management Portal.

Note

In addition to the primary AWS Lambda functions, this solution includes the `solution-helper` Lambda function, which runs only during initial configuration or when resources are updated or deleted.

When running this solution, you will see multiple Lambda functions in the AWS Management Console. Do not delete the `solution-helper` function, as it is necessary to manage associated resources, even though it is not run regularly while using the solution.

Step 2. Configure Your Amazon Connect Instance
----------------------------------------------

Before you can send callers to the new voicemail system, you must configure the instance to send contact trace records and agent events to a Kinesis Stream. The data sent to the Kinesis Stream feeds into a Lambda function that provides the start and end location of the audio recording in the stream.

The CloudFormation stack automatically creates a Kinesis Data Streams. Use the following steps to implement the default Kinesis Data Stream:

1.  Navigate to the [ Amazon Connect console](https://console.aws.amazon.com/connect/) and select the instance you used for the AWS CloudFormation deployment.

2.  Update the Data storage options to enable Live media streaming.

    -   Encryption: Select KMS key by name and select the default master key `aws/kinesisvideo` in the KMS master key dropdown.

    -   Data retention period: Keep the default setting (1 Day).

3.  In the Data streaming settings section, select Enable data streaming.

4.  In the Contact Trace Records section, select Kinesis Stream and choose the Kinesis Stream that begins with the stack name you created when you deployed the solution.

Use the following steps to implement an existing Kinesis Data Stream that was previously configured in your Amazon Connect instance for contract trace records:

1.  Navigate to the [AWS Lambda console](https://console.aws.amazon.com/lambda/).

2.  Find the function with `KvsProcessRecord` in the title.

3.  Select the IAM role associated with the function, and choose edit to modify the JSON policy. Replace the Kinesis Data Stream created by the stack with the Kinesis Data Stream you want to use.

4.  Choose Lambda function and select Add trigger.

5.  Select the Kinesis Data Stream you want to use and choose Save.

Step 3. Log in to the Voicemail for Amazon Connect Management Portal
--------------------------------------------------------------------

Use the following process to log in to the Voicemail for Amazon Connect Management Portal.

1.  Sign in to the [AWS CloudFormation console](https://console.aws.amazon.com/cloudformation/).

2.  On the Stacks page, select the Voicemail for Amazon Connect stack.

3.  Select the Outputs tab.

4.  Under the Key column, locate DistributionDomainName and choose the corresponding URL under the Value column to navigate to the Amazon CloudFront domain URL.

5.  On the Voicemail for Amazon Connect Management Portal page, sign in as the administrator.

Your administrator password must contain at least one uppercase letter, lowercase letter, number, and special character.

Upon initial login, you must select Sync Agents to connect the portal with the Amazon Connect instance. Amazon Connect automatically updates every 24 hours.

Step 4. Generate and Download Contact Flows
-------------------------------------------

Use the following process to generate and download the contact flows.

1.  Sign in to the Voicemail for Amazon Connect Management Portal as the administrator.

2.  Select the gear icon located in the top right of the navigation bar to view the Global Configurations and Generate Contact Flow modals.

3.  Keep the default settings and download the contact flows titled `VM-Greeting.json` and `VM-Agent.json`.

    Note

    The values you enter when you generate and download your contact flow do NOT persist in the web portal's UI. Instead, all the fields under the Generate Contact Flow section are set to the default values every time you open the settings modal. Values populated in the contact flow JSON file are saved.

    ![
                            Figure 3. Global Configurations and Generate Contact Flow modal
                        ](https://docs.aws.amazon.com/solutions/latest/voicemail-for-amazon-connect/images/contact-flow.png)

    Figure 3: Global Configurations and Generate Contact Flow modal

Step 5. Import Contact Flows
----------------------------

Use the following process to import contact flows.

1.  Access your Amazon Connect instance using the access URL provided by the Amazon Connect virtual contact center instances page.

2.  Navigate to the Contact Flows page by hovering over the routing icon in the left menu bar and selecting Contact Flows.

    ![
                            Figure 4. Create contact flows section
                        ](https://docs.aws.amazon.com/solutions/latest/voicemail-for-amazon-connect/images/create-contact-flows.png)

    Figure 4: Create contact flows section

3.  Select the dropdown in the upper right corner of the Contact Flows page, and then select Create customer queue flow.

4.  Select the dropdown next to the Save button. From the dropdown menu, choose Import flow (beta).

5.  Choose Select to open the directory browser Window and find the `VM-Agent.json` in your zip file. Choose Import.

6.  Choose Publish.

7.  Navigate to the Contact Flow page. Select Create contact flow.

8.  Select the dropdown next to the dimmed Save button. From the dropdown menu, choose Import flow (beta).

9.  Choose Select to open the directory browser Window and find the `VM-Greeting.json` in your zip file. Choose Import.

10. Select Publish.

Step 6. Claim a Phone Number
----------------------------

Use the following process to claim a new or existing phone number for your Amazon Connect instance:

1.  Navigate to the Claim a phone number section in the dashboard. If you have a View phone numbers option, select it, and skip to step 5. Otherwise, select Begin.

2.  Choose your Country, Type, and Phone number from the options available. Select Next.

3.  Select Skip for now and navigate to the dashboard.

4.  Choose View Phone numbers from the Claim a phone number section to manage your newly claimed phone number.

5.  Choose the claimed phone number from the Manage Phone numbers page.

6.  On the Edit Phone number page, select the Contact flow / IVR dropdown menu and choose VM-Greeting to assign the Voicemail System contact flow to your chosen phone number.

7.  Select Save.

Step 7. Leave a Voicemail
-------------------------

To test the voicemail integration, assign extension numbers to your Amazon Connect agents and then call the number you assigned.

1.  Sign in to the Amazon Connect Voicemail Management Portal as the administrator or manager.

2.  Select an agent to open the Agent Voicemail Settings modal. If you do not have available agents, go back to your Amazon Connect instance and choose Configure users to add more users to your calling system. Return to the Voicemail for Amazon Connect Management Portal and choose Refresh.

3.  Assign an agent an extension number. Extension numbers must be 5 digits or less.

4.  Check the transcribe and encrypt check boxes as desired. If you enable encryption, the voicemail recording arrives as a signed S3 URL email attachment. If encryption is turned off, the voicemail recording arrives as a plan text email attachment. The default expiration time for the signed S3 URL is 15 minutes (900 seconds) by default and the maximum expiration time for the presigned URL is one week from the time of creation.

5.  Check the email and SMS delivery options as desired. Checking the SMS box allows you to enter a phone number for the SMS delivery, enter a phone number, and Save.

    Note

    Your SMS delivery may be limited by your spending limit. By default, your AWS account's text messaging spending limit is set to $1.00 per month. You can open a support ticket to increase the value. Email addresses must be verified by [Amazon Simple Email Service (SES)](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-addresses-and-domains.html).

6.  Call the number for your Amazon Connect instance and enter the extension number. If the agent you are trying to reach is unavailable you will be prompted to leave a voicemail after the beep. After you end the call, the voicemail is saved and transcribed. The agent will receive a text and/or email with the voicemail.