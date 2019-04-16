'use strict'

const s3Utils = require('../libs/s3utils')
const gmailUtils = require('../libs/gmailUtils')
const dblUtils = require('../libs/dbUtils')

exports.handler = (event, context, callback) => {
  console.log('Email-get - starting')
  console.log(JSON.stringify(event, null, 2))
  console.log(context)

  let req = {}

  // get token from db
  // get email


  callback(null, 'Success')
}
