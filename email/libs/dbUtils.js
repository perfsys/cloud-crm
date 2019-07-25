const CONFIG_TABLE = process.env.CONFIG_TABLE
const MAIL_MESSAGES_TABLE = process.env.MAIL_MESSAGES_TABLE

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

exports.saveToken = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('saveToken - starting')

    console.log(req)
    let {email, tokens} = req
    const params = {
      TableName: CONFIG_TABLE,
      Item: {
        email: email,
        tokens: tokens,
        expiry_date: tokens.expiry_date / 1000,
        config_type: 'GMAIL_ACCESS_TOKEN'
      }
    }

    dynamoDb.put(params, (error, data) => {
      if (error) {
        console.log('saveToken - error')
        reject(error)
      } else {
        console.log(data)
        resolve(req)
      }
    })
  })
}

exports.saveHistoryId = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('saveHistoryId - starting')

    console.log(req)
    let {email, newHistoryId} = req
    const params = {
      TableName: CONFIG_TABLE,
      Item: {
        email: email,
        historyId: newHistoryId,
        config_type: 'GMAIL_HISTORY_ID'
      }
    }

    dynamoDb.put(params, (error, data) => {
      if (error) {
        console.log('saveHistoryId - error')
        reject(error)
      } else {
        console.log(data)
        resolve(req)
      }
    })
  })
}

exports.getGmailAccessToken = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('getGmailAccessToken - starting')

    const params = {
      TableName: CONFIG_TABLE,
      ExpressionAttributeValues: {
        ':t': 'GMAIL_ACCESS_TOKEN'
      },
      FilterExpression: 'config_type = :t'
    }

    dynamoDb.scan(params, (error, data) => {
      if (error) {
        console.log('getGmailAccessToken - error')
        reject(error)
      } else {
        console.log(data)
        req.dbToken = data.Items[0]
        resolve(req)
      }
    })
  })
}

exports.getGmailHistoryId = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('getGmailHistoryId - starting')

    const params = {
      TableName: CONFIG_TABLE,
      ExpressionAttributeValues: {
        ':t': 'GMAIL_HISTORY_ID'
      },
      FilterExpression: 'config_type = :t'
    }

    dynamoDb.scan(params, (error, data) => {
      if (error) {
        console.log('getGmailHistoryId - error')
        reject(error)
      } else {
        console.log(data)
        if (data.Items.length > 0) {
          req.dbHistoryId = data.Items[0]
        }
        resolve(req)
      }
    })
  })
}

exports.saveGmailMessage = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('saveGmailMessage - starting')

    console.log(req)
    let {id, message} = req
    const params = {
      TableName: MAIL_MESSAGES_TABLE,
      Item: {
        id: id,
        message: JSON.stringify(message)
      }
    }

    console.log(params)

    dynamoDb.put(params, (error, data) => {
      if (error) {
        console.log('saveGmailMessage - error')
        reject(error)
      } else {
        console.log(data)
        resolve(req)
      }
    })
  })
}

exports.getGmailMessage = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('getGmailMessage - starting')

    console.log(req)
    let {gmailId} = req
    const params = {
      TableName: MAIL_MESSAGES_TABLE,

      Key: {
        'id': gmailId
      }
    }

    console.log(params)

    dynamoDb.get(params, (error, data) => {
      if (error) {
        console.log('getGmailMessage - error')
        reject(error)
      } else {
        console.log(data)
        req.gmailMessage = JSON.parse(data.Item.message).textPlain
        resolve(req)
      }
    })
  })
}
