const
  AWS = require('aws-sdk')
let sqs = new AWS.SQS()
let CONTACTS_IDS_QUEUE_URL = process.env.CONTACTS_IDS_QUEUE_URL

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const CONTACTS_TABLE = process.env.CONTACTS_TABLE

const findContact = (email) => {
  return new Promise(function (resolve, reject) {
    console.log('findContact - starting')

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

const sendToContactIdsQueue = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('sendToContactIdsQueue - starting')

    let params = {
      MessageBody: JSON.stringify({'contactIds': req.contactIds}), /* required */
      QueueUrl: CONTACTS_IDS_QUEUE_URL, /* required */
      MessageAttributes: {
        'MailId': {
          DataType: 'String',
          StringValue: req.mailId
        }
      }
    }
    console.log(params)
    sqs.sendMessage(params, function (err, data) {
      if (err) console.log(err, err.stack)
      else {
        console.log(data)
        resolve(data)
      }
    })
  })
}

const searchAllContacts = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('searchAllContacts - starting')

    console.log(req)
    let contactIds = []
    for (let i = 0; i < req.emails.length; i++) {
      findContact(req.emails[i])
        .then(contacts => {
          console.log(contacts)
          if (contacts.length > 0) {
            let tmp = contacts.map(contact => {
              return {groupId: contact.group_id, contactName: contact.name}
            })
            contactIds = contactIds.concat(tmp)
          }
          if (i === req.emails.length - 1) {
            console.log(contactIds)
            req.contactIds = contactIds
            resolve(req)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
}

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
  })

  callback(null, 'Success')
}
