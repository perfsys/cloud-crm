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
      console.log('getUpdate - result')

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

exports.saveItemToUpdates = function (req) {
  return new Promise(function (resolve, reject) {
    let {updateItem} = req
    console.log('saveItemToUpdates - starting')
    const params = {
      TableName: CONTACT_UPDATES_TABLE,
      Item: updateItem
    }

    dynamoDb.put(params, (error, data) => {
      if (error) {
        console.log('saveItemToUpdates - error')
        reject(error)
      } else {
        console.log(data)
        resolve(req)
      }
    })
  })
}
