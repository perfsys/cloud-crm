const
  AWS = require('aws-sdk')
let sqs = new AWS.SQS();
let CONTACTS_IDS_QUEUE = process.env.CONTACTS_IDS_QUEUE

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const CONTACTS_TABLE = process.env.CONTACTS_TABLE

exports.handler = (event, context, callback) => {
  console.log('Find-contacts - starting')
  console.log(JSON.stringify(event, null, 2))

  event.Records.forEach((record) => {

    let mailId = record.messageAttributes.MailId.stringValue
    let emails = record.messageAttributes.Emails.stringValue.split(',')

    let req = {}
    req.mailId = mailId
    req.emails = emails

    searchAllContacts(req)
      .then(sendToContactIdsQueue)
      .catch(err => {
        console.log(err)
      })



    sendToContactIdsQueue(JSON.stringify({"contactIds":contactIds}),mailId)


  })

  const findContact =  (email) => {
    return new Promise(function (resolve, reject) {
      const params = {
        TableName: CONTACTS_TABLE,
        ExpressionAttributeValues: {
          ':t': email
        },
        FilterExpression: 'email = :t'
      }

      dynamoDb.scan(params, (error, data) => {
        if (error) {
          console.log('getGmailHistoryId - error')
          reject(error)

        } else {
          console.log(data)
          if (data.Items.length > 0) {
            resolve(data.Items)
          }
        }
      })

    })
  }

  const sendToContactIdsQueue = (contactIds,mailId) => {
    return new Promise(function (resolve, reject) {

      let params = {
        MessageBody: contactIds, /* required */
        QueueUrl: CONTACTS_IDS_QUEUE, /* required */
        MessageAttributes: {
          // "ContactIds": {
          //   DataType: "String",
          //   StringValue: contactIds
          // },
          "MailId": {
            DataType: "String",
            StringValue: mailId
          }
        }
      }
      sqs.sendMessage(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
          console.log(data);
          resolve(data)
        }        // successful response
      });
    })
  }

  const searchAllContacts = (req) => {
      return new Promise(function (resolve, reject) {

      let contactIds = []
      for (let i = 0; i < req.emails.length; i++) {

        findContact(emails[i])
          .then(contacts => {

            if(contacts.length > 0){
              contactIds.concat(contacts.map(contact =>{ return {groupId: contact.groupId, contactName: contact.contactName}}))
            }
          })
          .catch(err => {
            console.log(err)
          })
         }

        console.log(contactIds)
        resolve(contactIds)
      })
  }





  callback(null, 'Success')
}
