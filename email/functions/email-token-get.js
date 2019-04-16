'use strict'
const s3Utils = require('../libs/s3utils')
const gmailUtils = require('../libs/gmailUtils')
const dblUtils = require('../libs/dbUtils')


exports.handler = (event, context, callback) => {
  console.log('Email-token-get - starting')

  event.Records.filter(item => item.eventName === 'REMOVE').forEach((record) => {

    console.log(record)

    let req = {}
    req.email = record.dynamodb.Keys.email.S
    req.key = `${req.email}/keys.json`

    s3Utils.getKeysFromBucket(req)
      .then(gmailUtils.authorizeGmail)
      .then(dblUtils.saveToken)
      .catch(error => {
        console.log(error)
      })

  })
  callback(null, 'Success')
}
