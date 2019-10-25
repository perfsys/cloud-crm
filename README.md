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



Gmail Addition
---------------------------------
Check mail box using Gmail API , receive mails and insert letters as update to contact

1. Create (if it's not existed) gmail box.
2. Go https://console.developers.google.com and create new project.
3.
2. Create Service account key
    https://developers.google.com/gmail/api/auth/web-server
    https://cloud.google.com/iam/docs/service-accounts?_ga=2.59759149.-1830424876.1554369852
    https://developers.google.com/admin-sdk/directory/v1/guides/delegation 
    (p. Create the service account and credentials)
    
3. Add scope 	../auth/gmail.readonly
             ../auth/gmail.metadata
             ../auth/gmail.labels
4. Download json file with credentials.
 {
   "type": "service_account",
   "project_id": "xxxx",
   "private_key_id": "xxxx"
   "private_key": "-----BEGIN PRIVATE KEY-----xxxxxx\n-----END PRIVATE KEY-----\n",
   "client_email": "xxxx",
   "client_id": "xxxx",
   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
   "token_uri": "https://oauth2.googleapis.com/token",
   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/xxxx"
 }

5. The task has to be performed by an administrator of the G Suite domain.
   Delegate domain-wide authority to your service account
   https://developers.google.com/admin-sdk/directory/v1/guides/delegation 
   (p. Delegate domain-wide authority to your service account)
    The comma separated string of scopes must be put 
    https://www.googleapis.com/auth/gmail.labels,https://www.googleapis.com/auth/gmail.readonly,https://www.googleapis.com/auth/gmail.metadata

6. Deploy server-libs
    ```bash
    cd server-libs/
    npm install
    sls deploy -v
    ```
7. Deploy email
    ```bash
    cd email/
    npm install
    sls deploy -v
    ```

6. Rename json file with credentials to keys.json, create new folder as your gmail address, save keys.json in it.
   myGmailAddress@gmail.com/keys.json

7. Drop folder on s3 bucket perfsys-cloud-crm-email-keys-{stack_name}
   And gmail box will be started to check every 10 minutes.

8. To stop the process delete myGmailAddress@gmail.com/keys.json object from s3.

## <a name="licensing"></a>Licensing

Serverless is licensed under the [MIT License](./LICENSE).

All files located in the node_modules and external directories are externally maintained libraries used by this software which have their own licenses; we recommend you read them, as their terms may differ from the terms in the MIT License.
