'use strict'

const AWSNotifier = require('./modules/aws-notifier.js')
const notifier = new AWSNotifier()
const TOPIC = {
  TopicName: process.env.AUTOMATIC_NOTIFICATIONS_TOPIC_TITLE,
  TopicArn: process.env.AUTOMATIC_NOTIFICATIONS_TOPIC_ARN
}

const notify = function (note) {
  return new Promise(function (resolve, reject) {
    notifier.publish(note, function (err, data) {
      if (err != null) reject(err)
      else resolve(data)
    })
  })
}

module.exports.listener = function (event, context) {
  let noteTemplate = {
    subject: 'Contact item was managed',
    message: null,
    TopicArn: TOPIC.TopicArn
  }
  event.Records.forEach(function (record) {
    let note = noteTemplate
    if (record.eventName === 'INSERT') {
      note.message = 'New contact was successfully added to the Cloud CRM contact list.\n' +
          '\n' +
          'Contact name: ' + record.dynamodb.NewImage.name.S + '\n' +
          'Contact group: ' + record.dynamodb.NewImage.group_name.S
    } else if (record.eventName === 'MODIFY') {
      note.message = 'One of your Cloud CRM contacts was successfully modified.\n' +
          '\n' +
          'Contact name: ' + record.dynamodb.NewImage.name.S + '\n' +
          'Contact group: ' + record.dynamodb.NewImage.group_name.S
    } else return
    notify(note)
      .then(function (data) {
        console.log('Notification is successfully sent.\n' + JSON.stringify(data))
      })
      .catch(function (err) {
        console.log('An error occured: ' + JSON.stringify(err))
      })
  })
}
