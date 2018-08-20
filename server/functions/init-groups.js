const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const response = require('cfn-response')

const groups = require('../data/groupsItems.json')

exports.handler = function (event, context) {
  console.log('init groups - starting')

  const GROUPS_TABLE = event.ResourceProperties.Table

  const str = `{"RequestItems": { "${GROUPS_TABLE}":`
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

      response.send(event, context, response.SUCCESS, data)
    }
  })

  return response.send(event, context, response.SUCCESS, { 'error': 'something wrong' })
}
