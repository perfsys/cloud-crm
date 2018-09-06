const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const CONTACT_UPDATES_TABLE = process.env.CONTACT_UPDATES_TABLE

exports.getUpdate = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('getUpdate - starting')

    const {update_id} = req

    const params = {
      TableName: CONTACT_UPDATES_TABLE,
      Key: {
        id: update_id
      }
    }

    dynamoDb.get(params, (error, result) => {
      console.log(result)

      if (error) {
        console.log(error)
        reject(error)
      }
      if (result) {
        req.result = result
        resolve(req)
      }
    })
  })
}
