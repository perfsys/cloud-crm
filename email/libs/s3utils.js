const
  AWS = require('aws-sdk')
const s3 = new AWS.S3({apiVersion: '2006-03-01'})
const keysS3BucketName = process.env.S3_BUCKET_EMAIL_KEYS_NAME

exports.getKeysFromBucket = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('getKeysFromBucket - starting')
    console.log(req)

    let params = {
      Bucket: keysS3BucketName,
      Key: req.key
    }
    console.log(params)
    s3.getObject(params, function (err, data) {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(data.Body.toString('utf-8'))
        req.keys = JSON.parse(data.Body.toString('utf-8'))
        resolve(req)
      }
    })
  })
}

// exports.getListObjectsFromBucket = (req) => {
//   return new Promise(function (resolve, reject) {
//     console.log('getListObjectsFromBucket - starting')
//
//     console.log(req)
//
//     let params = {
//       Bucket: keysS3BucketName /* required */
//     }
//     s3.listObjects(params, function (err, data) {
//       if (err) {
//         console.log(err, err.stack)
//         reject(err)
//       } else {
//         console.log(data)
//         req.list = data
//         resolve(req)
//       }
//     })
//   })
// }
