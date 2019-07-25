'use strict'

const s3Utils = require('../libs/s3utils')
const authUtils = require('../libs/googleAuthUtils')
const dblUtils = require('../libs/dbUtils')

exports.handler = (event, context, callback) => {
  console.log('Email-token-config - starting')
  console.log(JSON.stringify(event, null, 2))
  console.log(context)

  event.Records.forEach((record) => {
    console.log(record.s3.object.key)

    let s3Key = decodeURIComponent(record.s3.object.key)
    console.log(s3Key)

    let email = s3Key.substring(0, s3Key.indexOf('/'))
    console.log(email)

    let req = {}
    req.email = email
    req.key = s3Key

    // get object from bucket
    s3Utils.getKeysFromBucket(req)
    // authorize to gmail
      .then(authUtils.authorizeGmail)
    // put token to db
      .then(dblUtils.saveToken)
      .catch(error => {
        console.log(error)
      })
  })

  callback(null, 'Success')
}
