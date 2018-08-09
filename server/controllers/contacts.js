const AWS = require('aws-sdk')

const express = require('express')
const labelHelper = require('../helpers/labelHelper')

const router = express.Router()

const parse_link = require('parse-link')

const R = require('ramda')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

const CONTACTS_TABLE = process.env.CONTACTS_TABLE

const getOne = function (req) {
  return new Promise(function (resolve, reject) {
    console.log('getOne - starting')
    findOne(req)
      .then(result => {
        if (result && result.Item) {
          console.log(result.Item)
          req.item = result.Item
          resolve(req)
        } else {
          reject({error: 'Contact not found'})
        }
      },
      error => {
        reject(error)
      })
  })
}

const findOne = function (req) {
  return new Promise(function (resolve, reject) {
    console.log('findOne - starting')
    const {item} = req
    const {group_id, name} = item

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
        console.log('findOne - error')
        reject(error)
      }
      if (result) {
        resolve(result)
      }
    })
  })
}

const populateContactItem = function (req) {
  const {item} = req
  const types = require('../data/types.json')
  const sources = require('../data/sources.json')
  const statuses = require('../data/statuses.json')
  const countries = require('../data/country-by-abbreviation.json')

  return new Promise(function (resolve, reject) {
    console.log('populateContactItem - starting')

    const {
      first_name,
      last_name,

      source_id,
      country_code,
      type_id,
      status_id,

      company_name,
      company_www,
      position,
      facebook_link,
      twitter_link,
      linkedin_link
    } = req.body

    if (first_name && typeof source_id === 'string') {
      item.first_name = first_name
    }

    if (last_name && typeof source_id === 'string') {
      item.last_name = last_name
    }

    if (source_id && typeof source_id === 'string') {
      let source_name = R.pipe(
        // find
        R.find(R.propEq('id', source_id)),

        // get name
        R.prop('name')
      )(sources)

      if (source_name) {
        item.source_id = source_id
        item.source_name = source_name
      }
    }

    if (country_code) {
      let country = R.pipe(
        // find
        R.find(R.propEq('abbreviation', country_code)),

        // get country
        R.prop('country')
      )(countries)
      if (country) {
        item.country_code = country_code
        item.country_name = country
      }
    }

    if (type_id) {
      let type_name = R.pipe(
        // find
        R.find(R.propEq('id', type_id)),

        // get name
        R.prop('name')
      )(types)

      if (type_name) {
        item.type_id = type_id
        item.type_name = type_name
      }
    }

    if (status_id) {
      let status_name = R.pipe(
        // find
        R.find(R.propEq('id', status_id)),

        // get name
        R.prop('name')
      )(statuses)

      if (status_name) {
        item.status_id = status_id
        item.status_name = status_name
      }
    }

    if (company_name) {
      item.company_name = company_name
      item.company_normalized = R.pipe(
        R.trim(),
        R.replace(' ', '_'),
        R.toLower()
      )(company_name)
    }

    if (position) {
      item.position = position
    }

    if (company_www) {
      let www_obj = parse_link(company_www)
      if (www_obj.protocol && www_obj.host) {
        item.company_www = `${www_obj.protocol}//${www_obj.host}`
      }
    }

    if (facebook_link) {
      let www_obj = parse_link(facebook_link)
      if (www_obj.protocol && www_obj.host && www_obj.pathname) {
        item.facebook_link = `${www_obj.protocol}//${www_obj.host}${www_obj.pathname}`
      }
    }

    if (linkedin_link) {
      let www_obj = parse_link(linkedin_link)
      if (www_obj.protocol && www_obj.host && www_obj.pathname) {
        item.linkedin_link = `${www_obj.protocol}//${www_obj.host}${www_obj.pathname}`
      }
    }

    if (twitter_link) {
      let www_obj = parse_link(twitter_link)
      if (www_obj.protocol && www_obj.host && www_obj.pathname) {
        item.twitter_link = `${www_obj.protocol}//${www_obj.host}${www_obj.pathname}`
      }
    }

    req.item = item
    resolve(req)
  })
}

const constructContactItem = function (req) {
  const
    groups = require('../data/groups.json')

  return new Promise(function (resolve, reject) {
    console.log('constructContactItem - starting')
    const {
      group_id, // partition key
      name, // sort key
      first_name,
      last_name,
      source_id,
      status_id
    } = req.body

    const item = {}

    if (group_id && typeof group_id === 'string') {
      // TODO
      let group_name = R.pipe(
        // find
        R.find(R.propEq('id', group_id)),

        // get name
        R.prop('name')
      )(groups)

      if (group_name && typeof group_name === 'string') {
        item.group_id = group_id // partition key
        item.group_name = group_name
      } else {
        reject({error: `Not able to find "group name" by id: ${group_id} `})
      }
    } else {
      reject({error: '"group_id" must be a string'})
    }

    if (name || (first_name && last_name)) {
      item.name = ((name) || (`${last_name}_${first_name}`)).toLowerCase() // sort key
    } else {
      reject({error: '"name" or "first_name"+"last_name" must be a string'})
    }

    if (typeof source_id !== 'string') {
      reject({error: '"source_id" must be a string'})
    }

    if (typeof status_id !== 'string') {
      reject({error: '"status_id" must be a string'})
    }

    req.item = item
    resolve(req)
  })
}

const saveContact = function (req) {
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

router.post('', function (req, res) {
  console.log('contacts-create - starting')

  const preCreate = function (req) {
    console.log(req)
    return new Promise(function (resolve, reject) {
      req.item.create_dt = new Date().toISOString()
      resolve(req)
    })
  }

  const checkItemNotExist = function (req) {
    console.log(req)
    return new Promise(function (resolve, reject) {
      findOne(req)
        .then(result => {
          if (result && !result.Item) {
            resolve(req)
          } else {
            reject({error: 'Contact already exists'})
          }
        }, err => {
          reject(err)
        })
    })
  }

  constructContactItem(req)
    .then(checkItemNotExist)
    .then(populateContactItem)
    .then(labelHelper.populateContactItemByLabels)
    .then(preCreate)
    .then(saveContact)
    .then(getOne)
    .then(req => {
      res.json(req.item)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json(error)
    })
})

router.put('/:group_id/:name', function (req, res) {
  console.log('contacts-update - starting')

  const preUpdate = function (req) {
    return new Promise(function (resolve, reject) {
      req.item.update_dt = new Date().toISOString()
      resolve(req)
    })
  }
  const {
    group_id, // partition key
    name // sort key
  } = req.params

  req.item = {}
  req.item.group_id = group_id
  req.item.name = name

  getOne(req)
    .then(preUpdate)
    .then(populateContactItem)
    .then(labelHelper.populateContactItemByLabels)
    .then(saveContact)
    .then(getOne)
    .then(req => {
      res.json(req.item)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json(error)
    })
})

router.get('/:group_id', function (req, res) {
  const {group_id} = req.params

  var params = {
    TableName: CONTACTS_TABLE,
    // IndexName: 'Index',
    KeyConditionExpression: 'group_id = :hkey',
    ExpressionAttributeValues: {
      ':hkey': group_id
    }
  }

  dynamoDb.query(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({error: 'Could not query contacts'})
    }
    if (result.Items) {
      res.json(result.Items)
    } else {
      res.status(404).json({error: 'Contact are empty'})
    }
  })
})

router.get('', function (req, res) {
  console.log('contacts-list - starting')
  const params = {
    TableName: CONTACTS_TABLE
  }

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({error: 'Could not scan contacts'})
    }
    if (result.Items) {
      res.json(result.Items)
    } else {
      res.status(404).json({error: 'Contact are empty'})
    }
  })
})

router.get('/:group_id/:name', function (req, res) {
  console.log('contacts-get-one - starting')
  console.log(req.params)

  const {group_id, name} = req.params

  req.item = {}
  req.item.group_id = group_id
  req.item.name = name

  getOne(req)
    .then(req => {
      res.json(req.item)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({error: 'Could not get a contact'})
    })
})

router.delete('/:group_id/:name', function (req, res) {
  console.log('contact-delete - starting')
  const {group_id, name} = req.params

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
      res.status(400).json({error: 'Could not delete contact'})
    }
    if (result) {
      console.log('Contact was Deleted')
      res.send(result)
    }
  })
})

module.exports = router
