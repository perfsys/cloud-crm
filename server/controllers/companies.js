const AWS = require('aws-sdk')
const express = require('express')

const DynamoDB = new AWS.DynamoDB.DocumentClient()
const router = express.Router()

// Companies list
router.get('/', function (request, response) {
  DynamoDB.scan({TableName: process.env.COMPANIES_TABLE}, function (err, data) {
    if (err != null) {
      console.log(JSON.stringify(err))
      response.end(null)
    } else response.end(JSON.stringify(data.Items))
  })
})
// Company info
router.get('/:companyId', function (request, response) {
  let params = {
    TableName: process.env.COMPANIES_TABLE,
    Key: {
      company_normalized: request.params.companyId
    }
  }
  DynamoDB.get(params, function (err, data) {
    if (err != null) {
      console.log(JSON.stringify(err))
      response.end(JSON.stringify(err))
    } else response.end(JSON.stringify(data.Item))
  })
})

// Save company
router.put('/', function (request, response) {
  console.log(JSON.stringify(request.body))
  let params = {
    TableName: process.env.COMPANIES_TABLE,
    Item: request.body
  }
  DynamoDB.put(params, function (err, data) {
    if (err != null) {
      console.log(JSON.stringify(err))
      response.end(null)
    }
    response.end(JSON.stringify(data))
  })
})

router.get('/:companyId/contacts', function (request, response) {
  let params = {
    TableName: process.env.CONTACTS_TABLE,
    IndexName: 'CompanyIndex',
    KeyConditionExpression: 'company_normalized = :company_normalized',
    ExpressionAttributeValues: {
      ':company_normalized': request.params.companyId
    }
  }
  DynamoDB.query(params, function (err, data) {
    if (err != null) {
      console.log(JSON.stringify(err))
      response.end(JSON.stringify(err))
    } else {
      console.log(data)
      response.end(JSON.stringify(data.Items))
    }
  })
})

module.exports = router
