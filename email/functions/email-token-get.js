'use strict'
const s3Utils = require('../libs/s3utils')
const dblUtils = require('../libs/dbUtils')
const authUtils = require('../libs/googleAuthUtils')

exports.handler = (event, context, callback) => {
  console.log('Email-token-get - starting')
  console.log(event)
  event.Records.forEach((record) => {
    console.log(record)
    console.log(record.dynamodb)
  })

  event.Records.filter(item => item.eventName === 'REMOVE' && item.dynamodb.Keys.config_type.S === 'GMAIL_ACCESS_TOKEN').forEach((record) => {
    console.log(record)

    let req = {}
    req.email = record.dynamodb.OldImage.email.S
    req.key = `${req.email}/keys.json`

    s3Utils.getKeysFromBucket(req)
      .then(authUtils.authorizeGmail)
      .then(dblUtils.saveToken)
      .catch(error => {
        console.log(error)
      })
  })
  callback(null, 'Success')
}
