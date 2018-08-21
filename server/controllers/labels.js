const express = require('express')
const AWS = require('aws-sdk')
const R = require('ramda')

const router = express.Router()
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const GROUPS_TABLE = process.env.GROUPS_TABLE

// add label to group
router.use(require('../middlewares/group-id'))

router.post('', function (req, res) {
  console.log('label-create - starting')

  const id = req.groupId
  let {name} = req.body
  console.log('name=' + name)
  console.log('group_id=' + id)
  if (!name || typeof name !== 'string') {
    res.status(400).json({error: 'Label must have a name'})
  }

  let item = {}
  item.name = name
  item.name_normalized = R.pipe(
    R.trim(),
    R.replace(' ', '_'),
    R.toLower()
  )(name)

  const params = {
    TableName: GROUPS_TABLE,
    Key: {id: id},
    UpdateExpression: 'SET labels = list_append(labels, :i)',
    ExpressionAttributeValues: {
      ':i': [item]
    },
    ReturnValues: 'ALL_NEW'
  }

  dynamoDb.update(params, (error, data) => {
    if (error) {
      console.log('label-create - error')
      console.log(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})

// get all labels in group
router.get('', function (req, res) {
  const id = req.groupId
  console.log('group id=' + id)

  const params = {
    TableName: GROUPS_TABLE,
    Key: {
      id: id
    }
  }

  dynamoDb.get(params, (error, result) => {
    console.log(result)

    if (error) {
      console.log('get - error')
    }
    if (result && result.Item) {
      console.log(result.Item)
      res.json(result.Item.labels)
    }
  })
})

module.exports = router
