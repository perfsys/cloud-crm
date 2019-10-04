Cloud CRM (Serverless CRM)
===========================

Cloud CRM allows you to support sales activity and manage customers or clients in an AWS Cloud.  
With Cloud CRM solutions, there is no need to share your client’s database with CRM providers because all the data is stored on your AWS account under your full control and watchful eye.

Prerequisites
-----------------

Install [NodeJS](https://nodejs.org/en/download/ )   
NodeJS is required to build 

Install [Serverless](https://serverless.com/framework/docs/getting-started/) framework.  
Serverless Framework is a CLI tool that allows users to build & deploy auto-scaling, pay-per-execution, event-driven functions


Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/awscli-install-windows.html)  
AWS CLI is an open source tool built on top of the AWS SDK for Python (Boto) that provides commands for interacting with AWS services. With minimal configuration, you can start using all of the functionality provided by the AWS Management Console from your favorite terminal program
  


AWS Configure  
https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html  
Configure settings that the AWS Command Line Interface uses when interacting with AWS, such as your security credentials and the default region


Step 1: Server code installation
------------------------
1. **Go to folder with a server code:**

```bash
cd server/
```

2. **Install NodeJS dependencies:**

```bash
npm install
```

3. **Deploy to AWS:**

```bash
sls deploy -v
```

Step 2: Client code installation
------------------------
1. **Go to folder with a client code:**

```bash
cd client/
```

2. **Install NodeJS dependencies:**

```bash
npm install
```

3. **Deploy to AWS:**

```bash
sls deploy -v
```

Step 3: Verify and Enjoy
----------------------

1. **Go to folder with a client code:**
```bash
cd client/
```

2. **Display information about the service:**

```bash
sls info -v
```

Expected output:

```bash
Stack Outputs
S3UIDistBucketName: perfsys-cloud-crm-ui-dev
S3UIDistBucketArn: arn:aws:s3:::perfsys-cloud-crm-ui-dev
S3UIDistBucketWebsiteURL: http://perfsys-cloud-crm-ui-dev.s3-website-eu-west-1.amazonaws.com/*
S3UIDistBucketArnMask: arn:aws:s3:::perfsys-cloud-crm-ui-dev/*
ServerlessDeploymentBucketName: perfsys-cloud-crm-ui-dev-serverlessdeploymentbuck-31li4aumbn16

```


Follow the link under `S3UIDistBucketWebsiteURL`
f.e.
> S3UIDistBucketWebsiteURL: http://perfsys-cloud-crm-ui-dev.s3-website-eu-west-1.amazonaws.com  

This should open CRM app in the web browser

<a name="features"></a>Features
-------------------------------

* Create Contacts with basic info like Name, Company Name, Position, Source, Status
* Organize Contacts in Groups
* Update Contact Info with First Name, Last Name, Links to social networks
* Add Labels to Contacts
* Add Text Updates to Contacts
* External API with Throtlling and API keys to add contacts from 3rd party integrations

## <a name="licensing"></a>Licensing

Serverless is licensed under the [MIT License](./LICENSE).

All files located in the node_modules and external directories are externally maintained libraries used by this software which have their own licenses; we recommend you read them, as their terms may differ from the terms in the MIT License.


