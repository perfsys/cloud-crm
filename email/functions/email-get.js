'use strict'

const s3Utils = require('../libs/s3utils')
const gmailUtils = require('../libs/gmailUtils')
const dblUtils = require('../libs/dbUtils')

exports.handler = (event, context, callback) => {
  console.log('Email-get - starting')
  console.log(JSON.stringify(event, null, 2))
  console.log(context)

  let req = {}

  const prepareKeys = (req) => {
    return new Promise(function (resolve, reject) {
      console.log('prepareKey - starting')

      console.log(req)
      req.key = `${req.dbToken.email}/keys.json`
      req.email = req.dbToken.email
      req.tokens = req.dbToken.tokens

      resolve(req)
    })
  }

  dblUtils.getToken(req)
    .then(prepareKeys)
    .then(s3Utils.getKeysFromBucket)
    .then(gmailUtils.getAuthorizedGmailClient)
    .then(gmailUtils.getGmailMessages)
    .catch(err => console.log(err))

  callback(null, 'Success')
}
