const serverless = require('serverless-http')
const Express = require('express')

const app = new Express()

app.get('/sandbox/', function (request, response) {
  const AWS = require('aws-sdk')
  AWS.config.loadFromPath('./configs/aws-config.json')
  const DYNAMO_DB = new AWS.DynamoDB.DocumentClient()
  let params = {
    TableName: 'universal-storage',
    Item: {
      itemKey: (new Date()).getTime(),
      itemValue: (new Date()).toString()
    }
  }
  DYNAMO_DB.put(params, function (err, data) {
    if (err != null) response.end('Error: ' + JSON.stringify(err))
    else response.end('Data: ' + JSON.stringify(data))
  })
})

module.exports.trigger = serverless(app)
module.exports.handler = function (event, context, callback) {
  const AWS = require('aws-sdk')
  AWS.config.loadFromPath('./configs/aws-config.json')
  const SIMPLE_EMAIL_SERVICE = new AWS.SES()
  var params = {
    Source: 'George <spmgeorges@gmail.com>',
    Destination: {
      ToAddresses: 'robakidzegeorge@gmail.com'
    },
    Message: {
      Subject: {
        Data: 'Subject',
        Charset: 'UTF-8'
      },
      Body: {
        Text: {
          Data: 'Plain text message',
          Charset: 'UTF-8'
        },
        Html: {
          Data: 'HTML message',
          Charset: 'UTF-8'
        }
      }
    }
  }
  SIMPLE_EMAIL_SERVICE.sendEmail(params, function (err, data) {
    if (err != null) callback(err, null)
    else callback(null, JSON.stringify(data))
  })
}
