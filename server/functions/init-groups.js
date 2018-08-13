const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const GROUPS_TABLE = process.env.GROUPS_TABLE

const groups = require('../data/groupsItems.json')

module.exports.handler = (event, context, callback) => {
  const str = `{"RequestItems": { "${GROUPS_TABLE}":`
  // const str = `{"RequestItems": { \"${GROUPS_TABLE}\":`
  const str1 = JSON.stringify(groups)
  const str2 = str + str1 + '}}'
  console.log(str2)

  const params = JSON.parse(str2)
  dynamoDb.batchWrite(params, (error, data) => {
    if (error) {
      console.log('init groups - error')
      console.log(error)
    } else {
      console.log('init groups - success')
      console.log(data)
      callback(null, data)
    }
  })
}
