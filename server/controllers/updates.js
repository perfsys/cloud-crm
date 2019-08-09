const AWS = require('aws-sdk')
const R = require('ramda')

const randomstring = require('randomstring')
const persistence_lib = require('../libs/persistence')
const updatesHelper = require('../helpers/updatesHelper')

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
    console.log('deleteItemFromUpdates - starting')

    let {item} = req
    if (item && item.id) {
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
    } else {
      resolve(req)
    }
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
    if (updatesIds.length === 0) {
      req.item.data = []
      resolve(req)
    }

    const listObjects = updatesIds.map(item => { return {id: item} })

    const params = {}
    params.RequestItems = {}
    params.RequestItems[`${CONTACT_UPDATES_TABLE}`] = {}
    params.RequestItems[`${CONTACT_UPDATES_TABLE}`].Keys = listObjects

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

const deleteItemFromContact = function (req) {
  return new Promise(function (resolve, reject) {
    console.log('deleteItemFromContact - starting')

    const {item} = req
    const {group_id, name, id} = item

    let updates = req.contact.updates

    let newUpdates = updates.filter(i => i !== id)

    const params = {
      TableName: CONTACTS_TABLE,
      Key: {
        group_id: group_id,
        name: name

      },
      UpdateExpression: 'SET updates = :i',
      ExpressionAttributeValues: {
        ':i': newUpdates
      },
      ReturnValues: 'ALL_NEW'
    }

    dynamoDb.update(params, (error, data) => {
      if (error) {
        console.log('deleteItemFromContact - error')
        reject(error)
      } else {
        console.log(data)
        req.contact = data.Attributes
        resolve(req)
      }
    })
  })
}

router.use(require('../middlewares/group-id'))
router.use(require('../middlewares/contact-name'))

router.post('', function (req, res) {
  console.log('comments-contact-create - starting')
  console.log(req)

  const {
    groupId,
    contactName
  } = req

  console.log(groupId, contactName)

  const prepareItem = function (req) {
    return new Promise(function (resolve, reject) {
      console.log('prepareItem - starting')
      const { type } = req.body
      let item = {}
      item.id = randomstring.generate(7)
      item.create_dt = new Date().toISOString()
      item.type = type
      if (type === 'TEXT' || type === 'GMAIL') {
        item.text = req.body.text
      } else if (type === 'FILE') {
        item.key = req.body.key
        item.file_name = req.body.file_name
        item.mime_type = req.body.mime_type
        item.location = req.body.location
      }
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
        // Todo delete from s3
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

  var sortByCreatedDate = R.sort(R.descend(R.prop('create_dt')))

  prepareItem(req)
    .then(persistence_lib.findContact)
    .then(findUpdatesIdsInContact)
    .then(getUpdatesByIds)
    .then(req => {
      res.json(sortByCreatedDate(req.item.data))
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

  req.update_id = update_id

  updatesHelper.getUpdate(req)
    .then(req => {
      if (req.result.Item) {
        res.json(req.result.Item)
      } else {
        res.status(404).json({error: 'Update not found'})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).json(error)
    })
})

// Update One
router.put('/:update_id', function (req, res) {
  console.log('updates-contact-updateOne - starting')
  const {update_id} = req.params
  req.update_id = update_id

  const checkResult = function (req) {
    return new Promise(function (resolve, reject) {
      if (req.result.Item) {
        req.item = req.result.Item
        resolve(req)
      }
      reject({error: 'Update not found'})
    })
  }

  const prepareItem = function (req) {
    return new Promise(function (resolve, reject) {
      const {text} = req.body
      const {item} = req

      item.text = text
      item.update_dt = new Date().toISOString()

      req.item = item
      resolve(req)
    })
  }

  updatesHelper.getUpdate(req)
    .then(checkResult)
    .then(prepareItem)
    .then(saveItemToUpdates)
    .then(req => {
      res.json(req.item)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json(error)
    })
})

// Delete One
router.delete('/:deleted_id', function (req, res) {
  console.log('updates-contact-deleteOne - starting')
  const {deleted_id} = req.params
  const {
    groupId,
    contactName
  } = req
  console.log(groupId, contactName, deleted_id)

  let item = {}
  item.group_id = groupId
  item.name = contactName
  item.id = deleted_id

  req.item = item

  const checkResultExists = function (result) {
    return new Promise(function (resolve, reject) {
      const id = req.item.id
      if (result.Item && result.Item.updates.includes(id)) {
        req.contact = result.Item
        resolve(req)
      }
      reject({error: 'Update not found'})
    })
  }

  persistence_lib.findContact(req)
    .then(checkResultExists)
    .then(deleteItemFromContact)
    .then(deleteItemFromUpdates)
    .then(req => {
      res.send(req.contact)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json(error)
    })
})

module.exports = router
