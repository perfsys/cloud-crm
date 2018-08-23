const AWS = require('aws-sdk')

const randomstring = require('randomstring')
const persistence_lib = require('../libs/persistence')

const express = require('express')
const router = express.Router()

const dynamoDb = new AWS.DynamoDB.DocumentClient()

const CONTACTS_TABLE = process.env.CONTACTS_TABLE
const CONTACT_UPDATES_TABLE = process.env.CONTACT_UPDATES_TABLE

const saveItemToUpdates = function (req) {
  return new Promise(function (resolve, reject) {
    let {item} = req
    console.log('saveItemToUpdates - starting')
    const params = {
      TableName: CONTACT_UPDATES_TABLE,
      Item: item
    }

    dynamoDb.put(params, (error, data) => {
      if (error) {
        console.log('saveItemToUpdates - error')
        reject(error)
      } else {
        console.log(data)
        resolve(req)
      }
    })
  })
}

const deleteItemFromUpdates = function (req) {
  return new Promise(function (resolve, reject) {
    let {item} = req
    console.log('deleteItemFromUpdates - starting')
    const params = {
      TableName: CONTACT_UPDATES_TABLE,
      Key: {
        id: item.id
      }
    }

    dynamoDb.delete(params, (error, data) => {
      if (error) {
        console.log('deleteItemFromUpdates - error')
        reject(error)
      } else {
        console.log(data)
        resolve(req)
      }
    })
  })
}

const addItemToContact = function (req) {
  return new Promise(function (resolve, reject) {
    console.log('addItemToContact - starting')
    const params = {
      TableName: CONTACTS_TABLE,
      Key: {
        group_id: req.groupId,
        name: req.contactName

      },
      UpdateExpression: 'SET updates = list_append(updates, :i)',
      ExpressionAttributeValues: {
        ':i': [req.item.id]
      },
      ReturnValues: 'ALL_NEW'
    }

    dynamoDb.update(params, (error, data) => {
      if (error) {
        console.log('addItemToContact - error')
        reject(error)
      } else {
        console.log(data)
        resolve(req)
      }
    })
  })
}

const getUpdatesByIds = function (req) {
  return new Promise(function (resolve, reject) {
    console.log('getUpdatesByIds - starting')
    const {updatesIds} = req.item
    console.log(updatesIds)
    const str = `{"RequestItems": { "${CONTACT_UPDATES_TABLE}": {
      "Keys": `
    const listObjects = updatesIds.map(item => { return {id: item} })

    const str1 = JSON.stringify(listObjects)
    const str2 = str + str1 + '}}}'
    console.log(str2)

    const params = JSON.parse(str2)
    dynamoDb.batchGet(params, (error, data) => {
      if (error) {
        console.log('getUpdatesByIds - error')
        console.log(error)
        reject(error)
      } else {
        console.log('getUpdatesByIds - success')
        console.log(data)
        req.item.data = data.Responses[`${CONTACT_UPDATES_TABLE}`]
        resolve(req)
      }
    })
  })
}

router.use(require('../middlewares/group-id'))
router.use(require('../middlewares/contact-name'))

router.post('', function (req, res) {
  console.log('comments-contact-create - starting')
  const {
    text
  } = req.body

  const {
    groupId,
    contactName
  } = req

  console.log(groupId, contactName)

  if (!text || typeof text !== 'string') {
    res.status(400).json({error: 'text must be String'})
  }

  const prepareItem = function (req) {
    return new Promise(function (resolve, reject) {
      console.log('prepareItem - starting')
      let item = {}
      item.id = randomstring.generate(7)
      item.create_dt = new Date().toISOString()
      item.text = text
      req.item = item
      resolve(req)
    })
  }

  prepareItem(req)
    .then(saveItemToUpdates)
    .then(addItemToContact)
    .then(req => {
      res.json(req.item)
    }, error => {
      deleteItemFromUpdates(req)
        .then(req => {
          res.status(400).json(error)
        })
    })
    .catch(error => {
      console.log(error)

      res.status(400).json(error)
    })
})

// Get all in contact
router.get('', function (req, res) {
  console.log('updates-contact-getAll - starting')
  const {
    groupId,
    contactName
  } = req

  const prepareItem = function (req) {
    return new Promise(function (resolve, reject) {
      console.log('prepareItem - starting')
      let item = {}
      item.group_id = groupId
      item.name = contactName
      req.item = item
      resolve(req)
    })
  }

  const findUpdatesIdsInContact = function (result) {
    return new Promise(function (resolve, reject) {
      console.log('findUpdatesIdsInContact - starting')
      console.log(result)

      if (result && result.Item) {
        const updates = result.Item.updates
        req.item.updatesIds = updates
        resolve(req)
      }
      reject({error: 'Updates in contact could not be found'})
    })
  }

  prepareItem(req)
    .then(persistence_lib.findContact)
    .then(findUpdatesIdsInContact)
    .then(getUpdatesByIds)
    .then(req => {
      res.json(req.item.data.sort((a, b) => a.create_dt.localeCompare(b.create_dt)))
    })
    .catch(error => {
      console.log(error)
      res.status(400).json(error)
    })
})

// Get One
router.get('/:update_id', function (req, res) {
  console.log('updates-contact-getOne - starting')

  const {update_id} = req.params

  const params = {
    TableName: CONTACT_UPDATES_TABLE,
    Key: {
      id: update_id
    }
  }

  dynamoDb.get(params, (error, result) => {
    console.log(result)

    if (error) {
      console.log(error)
      res.status(400).json({error: 'Could not query update'})
    }
    if (result.Item) {
      res.json(result.Item)
    } else {
      res.status(404).json({error: 'Update not found'})
    }
  })
})

// Update One
router.put('/:update_id', function (req, res) {
  console.log('updates-contact-updateOne - starting')

  const prepareItem = function (req) {
    return new Promise(function (resolve, reject) {
      const {text, create_dt} = req.body

      const {update_id} = req.params

      if (!create_dt || isNaN(Date.parse(create_dt))) {
        res.status(400).json({error: 'create_dt must be in request'})
      }

      let item = {}
      item.id = update_id
      item.text = text
      item.create_dt = create_dt
      item.update_dt = new Date().toISOString()

      req.item = item
      resolve(req)
    })
  }

  prepareItem(req)
    .then(saveItemToUpdates)
    .then(req => {
      res.json(req.item)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json(error)
    })
})

module.exports = router
