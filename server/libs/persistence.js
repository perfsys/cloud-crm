// 'use strict'

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

exports.findContact = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('findContact - starting')
    const {item} = req
    const {group_id, name} = item
    console.log(group_id, name)

    const params = {
      TableName: CONTACTS_TABLE,
      Key: {
        group_id: group_id,
        name: name
      }
    }

    dynamoDb.get(params, (error, result) => {
      console.log(result)

      if (error) {
        console.log('findContact - error')
        reject(error)
      }
      if (result) {
        console.log('findContact - success')

        resolve(result)
      }
    })
  })
}

exports.deleteContact = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('deleteContact - starting')
    const {item} = req
    const {group_id, name} = item
    console.log(group_id, name)

    const params = {
      TableName: CONTACTS_TABLE,
      Key: {
        group_id: group_id,
        name: name
      }
    }

    dynamoDb.delete(params, (error, result) => {
      if (error) {
        console.log(error)
        reject(error)
      }
      if (result) {
        console.log('Contact was Deleted')
        req.result = result
        resolve(req)
      }
    })
  })
}
