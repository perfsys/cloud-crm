const AWS = require('aws-sdk')
const express = require('express')

const DynamoDB = new AWS.DynamoDB.DocumentClient()
const router = express.Router()
const COMPANIES_TABLE = process.env.COMPANIES_TABLE
const CONTACTS_TABLE = process.env.CONTACTS_TABLE

// Companies list
router.get('/', function (request, response) {
  const getContactsCount = (item) => {
    return new Promise(function (resolve, reject) {
      console.log('getContactsCount - starting')
      console.log(item)

      const params = {
        KeyConditions: {
          company_normalized: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [item.company_normalized]
          }
        },
        TableName: CONTACTS_TABLE,
        IndexName: 'CompanyIndex'
      }

      DynamoDB.query(params, function (err, data) {
        if (err) {
          console.log(err, err.stack)
          reject(err)
        } else {
          item.conpanies_count = data.Count
          item.conpanies_contacts = data.Items
          return resolve(item)
        }
      })
    })
  }

  const getPersonsDetails = (item) => {
    return new Promise(function (resolve, reject) {
      console.log('getPersonsDetails - starting')
      for (let i = 0; i < item.conpanies_contacts.length; i++) {
        let position = (item.conpanies_contacts[i].position_normalized) ? item.conpanies_contacts[i].position_normalized.replace('_', '') : null

        switch (position) {
          case 'ceo':
            item.ceo = item.conpanies_contacts[i].name
            break
          case 'cto':
            item.cto = item.conpanies_contacts[i].name
            break
          case 'founder':
            item.founder = item.conpanies_contacts[i].name
            break
          case 'cofounder':
            item.founder = item.conpanies_contacts[i].name
            break
        }
        console.log(item)
      }
      delete item.conpanies_contacts

      resolve(item)
    })
  }

  const fillCompanyDetails = async (data) => {
    for (let i = 0; i < data.length; i++) {
      await getContactsCount(data[i])
      await getPersonsDetails(data[i])
    }
    return data
  }

  const getCompanies = () => {
    return new Promise(function (resolve, reject) {
      console.log('getCompanies - starting')
      const params = {
        TableName: COMPANIES_TABLE
      }
      DynamoDB.scan(params, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data.Items)
        }
      })
    })
  }

  getCompanies()
    .then(fillCompanyDetails)
    .then(data => {
      console.log('after all')
      console.log(data)
      response.end(JSON.stringify(data))
    })
    .catch(error => {
      response.status(400).end(JSON.stringify(error))
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
