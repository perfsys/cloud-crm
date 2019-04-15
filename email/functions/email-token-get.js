'use strict'

exports.handler = (event, context, callback) => {
  console.log('Email-token-get - starting')
  console.log(JSON.stringify(event, null, 2))
  console.log(context)

  callback(null, 'Success')
}
