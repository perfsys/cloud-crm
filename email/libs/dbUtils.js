const ACCESS_TOKEN_TABLE = process.env.ACCESS_TOKEN_TABLE

const
  AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

exports.saveToken = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('saveToken - starting')

    console.log(req)
    let {email, tokens} = req
    const params = {
      TableName: ACCESS_TOKEN_TABLE,
      Item: {
        email: email,
        tokens: tokens,
        expiry_date: tokens.expiry_date / 1000
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

exports.getToken = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('getToken - starting')

    const params = {
      TableName: ACCESS_TOKEN_TABLE,
      Limit: 1
    }

    dynamoDb.scan(params, (error, data) => {
      if (error) {
        console.log('getToken - error')
        reject(error)
      } else {
        console.log(data)
        req.dbToken = data.Items[0]

        resolve(req)
      }
    })
  })
}
