const
  express = require('express')

const AWS = require('aws-sdk')
const R = require('ramda')

const router = express.Router()
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const groupsHelper = require('../helpers/groupsHelper')

const GROUPS_TABLE = process.env.GROUPS_TABLE

const checkGroupHasStatusField = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('checkGroupHasStatusField - starting')

    const {item} = req

    if (!item.groupResult || !item.groupResult.Item) {
      reject({error: 'Group doesn\'t exists'})
    }

    if (item.groupResult.Item.statuses) {
      item.groupHasStatusfield = true
    } else {
      item.groupHasStatusfield = false
    }

    req.item = item

    resolve(req)
  })
}

const saveStatusInGroup = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('saveStatusInGroup - starting')

    let {item} = req
    let updateExpression

    if (item.groupHasStatusfield) {
      updateExpression = 'SET statuses = list_append(statuses, :i)'
    } else {
      updateExpression = 'SET statuses = :i'
    }

    let status = {}
    status.id = item.id
    status.name = item.name

    const params = {
      TableName: GROUPS_TABLE,
      Key: {id: item.group_id},
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: {
        ':i': [status]
      },
      ReturnValues: 'ALL_NEW'
    }

    dynamoDb.update(params, (error, data) => {
      if (error) {
        console.log('saveStatusInGroup - error')
        console.log(error)
        reject(error)
      } else {
        console.log(data)
        resolve(req)
      }
    })
  })
}

// add status to group
router.use(require('../middlewares/group-id'))

router.post('', function (req, res) {
  console.log('status-create - starting')

  const group_id = req.groupId
  let {name} = req.body
  console.log('name=' + name)
  console.log('group_id=' + group_id)
  if (!name || typeof name !== 'string') {
    res.status(400).json({error: 'Status must have a name'})
  }

  let item = {}
  item.name = name
  item.id = R.pipe(
    R.trim(),
    R.replace(' ', '_'),
    R.toLower()
  )(name)

  item.group_id = group_id
  req.item = item

  groupsHelper.getGroup(req)
    .then(checkGroupHasStatusField)
    .then(saveStatusInGroup)
    .then(req => {
      res.json(req.item)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json(error)
    })
})

// get all statuses in group
router.get('', function (req, res) {
  const id = req.groupId
  console.log('group id=' + id)
  req.item = {}
  req.item.group_id = id
  groupsHelper.getGroup(req)
    .then(req => {
      res.json(req.item.groupResult.Item)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json(error)
    })
})

module.exports = router
