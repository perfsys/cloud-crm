'use strict'

const AWS = require('aws-sdk')

const AWSNotifier = function () {
  let SIMPLE_NOTIFICATION_SERVICE;

  (function (obj) {
    SIMPLE_NOTIFICATION_SERVICE = new AWS.SNS()
  })(this)

  this.publish = function (note, callback) {
    let params = {
      Subject: note.subject,
      Message: note.message,
      TopicArn: note.TopicArn
    }
    SIMPLE_NOTIFICATION_SERVICE.publish(params, callback)
  }
  this.createTopic = function (topicName, callback) {
    SIMPLE_NOTIFICATION_SERVICE.createTopic({Name: topicName}, function (err, data) {
      if (err != null) {
        console.log(JSON.stringify(err))
        callback(err, null)
      } else callback(null, {TopicName: topicName, TopicArn: data.TopicArn})
    })
  }
}

module.exports = AWSNotifier
