const express = require('express')
const AWS = require('aws-sdk')

const router = express.Router()
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const groupsHelper = require('../helpers/groupsHelper')

const GROUPS_TABLE = process.env.GROUPS_TABLE

router.post('', function (req, res) {
  console.log('group-create - starting')
  console.log(req)

  let {id, name} = req.body

  let group = {}
  group.id = id
  group.name = name
  group.labels = []

  const params = {
    TableName: GROUPS_TABLE,
    Item: group
  }

  dynamoDb.put(params, (error, data) => {
    if (error) {
      console.log('group-create - error')
    } else {
      console.log(data)
      res.json(data)
    }
  })
})

router.get('/:group_id', function (req, res) {
  const {group_id} = req.params

  var params = {
    TableName: GROUPS_TABLE,
    // IndexName: 'Index',
    KeyConditionExpression: 'group_id = :hkey',
    ExpressionAttributeValues: {
      ':hkey': group_id
    }
  }

  dynamoDb.query(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({error: 'Could not query groups'})
    }
    if (result.Items) {
      res.json(result.Items)
    } else {
      res.status(404).json({error: 'Group are empty'})
    }
  })
})

router.get('', function (req, res) {
  console.log('groups-list - starting')

  const ifGroupsExist = function (data) {
    return new Promise(function (resolve, reject) {
      console.log('ifGroupsExist - starting')
      if (data.Items && data.Count > 0) {
        res.json(data.Items.sort((a, b) => a.name.localeCompare(b.name)))
      } else {
        resolve()
      }
    })
  }

  groupsHelper.getGroups()
    .then(ifGroupsExist)
    .catch(error => {
      console.log(error)
      res.status(400).json(error)
    })
})

router.delete('/:group_id/', function (req, res) {
  console.log('group-delete - starting')
  const {group_id} = req.params

  const params = {
    TableName: GROUPS_TABLE,
    Key: {
      group_id: group_id
    }
  }

  dynamoDb.delete(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({error: 'Could not delete group'})
    }
    if (result) {
      console.log('Group was Deleted')
      res.send(result)
    }
  })
})

module.exports = router
