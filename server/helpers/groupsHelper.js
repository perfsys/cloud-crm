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

exports.getGroups = getGroups
