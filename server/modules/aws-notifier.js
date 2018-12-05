'use strict'

const AWS = require('aws-sdk')
const fs = require('fs')

const AWSNotifier = function () {
  let SIMPLE_NOTIFICATION_SERVICE;

  (function (obj) {
    AWS.config.loadFromPath('../configs/aws-config.json')
    SIMPLE_NOTIFICATION_SERVICE = new AWS.SNS()
  })(this)

  this.pushNotification = function (notification, topic, callback) {
    let params = {
      Subject: notification.subject,
      Message: notification.message,
      TopicArn: topic.arn
    }
    SIMPLE_NOTIFICATION_SERVICE.publish(params, callback)
  }

  this.createNotificationTopic = function (topic, callback) {
    fs.readFile('../data/notification-topics.json', function (err, data) {
      if (err != null) return
      let topics = JSON.parse(data)
      if (topic in topics) callback(null, topics.topic)
      else {
        SIMPLE_NOTIFICATION_SERVICE.createTopic({Name: topic}, function (err, data) {
          if (err != null) return
          topics.topic = {title: topic, arn: data.TopicArn}
          fs.writeFile('../data/notification-topics.json', JSON.stringify(topics))
          callback(null, topics.topic)
        })
      }
    })
  }
}
module.exports = AWSNotifier
