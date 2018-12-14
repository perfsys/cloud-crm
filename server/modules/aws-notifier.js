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
}

module.exports = AWSNotifier
