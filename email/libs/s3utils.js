const
  AWS = require('aws-sdk')
const s3 = new AWS.S3({apiVersion: '2006-03-01'})
const keysS3BucketName = process.env.S3_BUCKET_EMAIL_KEYS_NAME

exports.getKeysFromBucket = (req) => {
  console.log(req)
  return new Promise(function (resolve, reject) {
    let params = {
      Bucket: keysS3BucketName,
      Key: req.key
    }
    s3.getObject(params, function (err, data) {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(data)
        resolve(req)
      }
    })
  })
}

exports.getListObjectsFromBucket = (req) => {
  console.log(req)
  return new Promise(function (resolve, reject) {
    let params = {
      Bucket: keysS3BucketName /* required */
      // Delimiter: 'STRING_VALUE',
      // EncodingType: url
      // Marker: 'STRING_VALUE',
      // MaxKeys: 'NUMBER_VALUE',
      // Prefix: 'STRING_VALUE',
      // RequestPayer: requester
    }
    s3.listObjects(params, function (err, data) {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(data)
        resolve(data)
      }
    })
  })
}
