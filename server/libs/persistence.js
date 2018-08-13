'use strict'

const CONTACTS_TABLE = process.env.CONTACTS_TABLE

const
  AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

exports.preCreate = (req) => {
  console.log(req)
  return new Promise(function (resolve, reject) {
    req.item.create_dt = new Date().toISOString()
    resolve(req)
  })
}

exports.saveContact = (req) => {
  return new Promise(function (resolve, reject) {
    let {item} = req
    console.log('saveContact - starting')
    const params = {
      TableName: CONTACTS_TABLE,
      Item: item
    }

    dynamoDb.put(params, (error, data) => {
      if (error) {
        console.log('saveContact - error')
        reject(error)
      } else {
        console.log(data)
        // resolve(data) // TODO ?
        resolve(req)
      }
    })
  })
}
