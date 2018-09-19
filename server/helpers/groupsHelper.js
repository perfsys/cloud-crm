const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const GROUPS_TABLE = process.env.GROUPS_TABLE

const getGroups = function () {
  return new Promise(function (resolve, reject) {
    console.log('getGroups - starting')
    const params = {
      TableName: GROUPS_TABLE
    }

    dynamoDb.scan(params, (error, data) => {
      if (error) {
        console.log('getGroups - error')
        reject(error)
      } else {
        console.log(data)
        resolve(data)
      }
    })
  })
}

exports.getGroup = function (req) {
  return new Promise(function (resolve, reject) {
    console.log('getGroup - starting')

    const {group_id} = req.item

    const params = {
      TableName: GROUPS_TABLE,
      Key: {
        id: group_id
      }
    }

    dynamoDb.get(params, (error, result) => {
      console.log(result)

      if (error) {
        console.log('get - error')
      }
      if (result && result.Item) {
        console.log(result.Item)
        req.item.groupResult = result
        resolve(req)
      }
    })
  })
}

exports.getGroups = getGroups
