'use strict'

const AWSNotifier = require('./modules/aws-notifier.js')
const notifier = new AWSNotifier()
const TOPIC = {
  TopicName: process.env.AUTOMATIC_NOTIFICATIONS_TOPIC_TITLE,
  TopicArn: null
}

const checkTopic = function () {
  return new Promise(function (resolve, reject) {
    if (TOPIC.TopicArn == null) {
      notifier.createTopic(TOPIC.TopicName, function (err, data) {
        if (err != null) reject(err)
        else {
          TOPIC.TopicArn = data.TopicArn
          resolve(TOPIC)
        }
      })
    } else resolve(TOPIC)
  })
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
  console.log('Tracer...')
  checkTopic()
    .then(function (TOPIC) {
      let noteTemplate = {
        subject: 'Contact item was managed',
        message: null,
        TopicArn: TOPIC.TopicArn
      }
      event.Records.forEach(function (record) {
        let note = noteTemplate
        if (record.eventName === 'INSERT') {
          note.message = 'New contact was successfully added to the Cloud CRM contact list.'
        } else if (record.eventName === 'MODIFY') {
          note.message = 'One of your Cloud CRM contacts was successfully modified'
        } else return
        notify(note)
          .then(function (data) {
            console.log('Notification is successfully sent.\n' + JSON.stringify(data))
          })
          .catch(function (err) {
            console.log('An error occured: ' + JSON.stringify(err))
          })
      })
    })
    .catch(function (err) {
      console.log('An error occured: ' + JSON.stringify(err))
    })
}
