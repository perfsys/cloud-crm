'use strict'

exports.handler = (event, context, callback) => {
  console.log('Email-token-config - starting')
  console.log(JSON.stringify(event, null, 2))
  console.log(context)

  event.Records.forEach((record) => {
    let s3Key = record.s3.object.key
    console.log(s3Key)
    let email = s3Key.substring(0, s3Key.indexOf('/'))
    console.log(email)
  })

  callback(null, 'Success')
}
