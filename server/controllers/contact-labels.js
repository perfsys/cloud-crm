const
  AWS = require('aws-sdk')

const express = require('express')

const router = express.Router()

const R = require('ramda')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

const CONTACTS_TABLE = process.env.CONTACTS_TABLE
const GROUPS_TABLE = process.env.GROUPS_TABLE

const findLabels = function (req) {
  console.log(req);
  return new Promise(function (resolve, reject) {

    console.log('findLabels - starting');
    const {item} = req,
      {groupId, contactName} = item

    const params = {
      TableName: CONTACTS_TABLE,
      Key: {
        group_id: groupId,
        name: contactName
      },
      // AttributesToGet: 'labels'
    };

    dynamoDb.get(params, (error, result) => {
      console.log(result);

      if (error) {
        console.log('findOne - error');
        console.log(error);
        reject(error)
      }
      if (result) {
        console.log(result)
        resolve(result)
      }
    });
  })
}

const findGroup = function (req) {
  console.log(req);
  return new Promise(function (resolve, reject) {

    console.log('findGroup - starting');
    const {item} = req,
      {groupId} = item

    const params = {
      TableName: GROUPS_TABLE,
      Key: {
        id: groupId,
      },
    };

    dynamoDb.get(params, (error, result) => {
      console.log(result);

      if (error) {
        console.log('findGroup - error');
        console.log(error);
        reject(error)
      }
      if (result) {
        console.log(result)
        resolve(result)
      }
    });
  })
}

const checkLabelsExistsInContact = function (req) {
  return new Promise(function (resolve, reject) {
    console.log('checkLabelsExistsInContact - starting');

    findLabels(req)
      .then(result => {
          if (result && result.Item) {
            console.log(result.Item);
            req.item.labels = result.Item.labels

            resolve(req)

          }
          else {
            reject({error: "Labels not found"})
          }
        },
        error =>{
          reject(error)
        })
  })
}

const checkLabelBelongToGroup = function (req) {
  return new Promise(function (resolve, reject) {
    console.log('checkLabelBelongToGroup - starting');
    const {item} = req,
      {nameNormalized} = item

    const labelByNameNormalized = (labels) => {
      return (labels) ? labels.find(i => i.name_normalized === nameNormalized) : {}
    }

    findGroup(req)
      .then(result => {

            console.log(result);
            if (result && result.Item && result.Item.labels) {

            let label = labelByNameNormalized(result.Item.labels)
            console.log(label);
            req.item.label = label

            resolve(req)

          }
          else {
            reject({error: "Labels not found"})
          }
        },
        error =>{
          reject(error)
        })

  })
}

const addLabelToContact = function (req) {
  return new Promise(function (resolve, reject) {
    console.log('addLabelToContact - starting');

    const {item} = req,
      {groupId, contactName, label, labels} = item

    console.log(groupId, contactName, label, labels)

    let updateExpr = null
    if(labels){
      updateExpr = "SET labels = list_append(labels, :i)"
    } else {
      updateExpr = "SET labels = :i"
    }

    const params = {
      TableName: CONTACTS_TABLE,
      Key: {group_id: groupId,
        name: contactName},
      UpdateExpression:  updateExpr,
      ExpressionAttributeValues: {
        ':i': [label],
      },
      ReturnValues:"ALL_NEW"
    }

    dynamoDb.update(params, (error, data) => {
      if (error) {
        console.log('addLabelToContact - error')
        console.log(error)
      } else {
        console.log(data)
        req.item.data = data
        resolve(req)
      }
    })
  })
}

router.use(require('../middlewares/group-id'));
router.use(require('../middlewares/contact-name'));


// add label to contact
// router.post('', function (req, res) {
//   console.log('add-label-to-contact - starting')
//   console.log(req)
//
//   const groupId = req.groupId, contactName = req.contactName
//
//   const {name_normalized} = req.body
//
//   console.log(groupId,contactName,name_normalized)
//
//   req.item = {}
//   req.item.groupId = groupId
//   req.item.contactName = contactName
//   req.item.nameNormalized = name_normalized
//   //check label exists in group
//   checkLabelBelongToGroup(req)
//     .then(checkLabelsExistsInContact)
//     .then(addLabelToContact)
//     .then(req => {
//       res.json(req.item.data)
//     })
//
// })

router.put('', function (req, res) {
  console.log('update-label-to-contact - starting')
  console.log(req)

  const groupId = req.groupId, contactName = req.contactName

  const {labels} = req.body

  if(!Array.isArray(labels)){
    res.status(400).json({error: '"labels" must be an array'});
  }
  console.log(groupId,contactName,labels)

  req.item = {}
  req.item.groupId = groupId
  req.item.contactName = contactName
  req.item.labels = labels
  //check label exists in group
  checkLabelBelongToGroup(req)
    .then(checkLabelsExistsInContact)
    .then(addLabelToContact)
    .then(req => {
      res.json(req.item.data)
    })

})



// add label to contact
router.delete('/:name_normalized', function (req, res) {
  console.log('remove-label-from-contact - starting')
  console.log(req)

  const {groupId,name,name_normalized} = req.params
  console.log(groupId,name,name_normalized)
  //
  // req.item = {}
  // req.item.group_id = groupId
  // req.item.name = name
  // req.item.name_normalized = name_normalized
  //
  // checkLabelExistsInGroup(req)
  //   .then(req => {
  //     res.json(req.item)
  //   })

  const params = {
    TableName: CONTACTS_TABLE,
    Key: {group_id: groupId,
      name: contactName},
    UpdateExpression:  updateExpr,
    ExpressionAttributeValues: {
      ':i': [label],
    },
    ReturnValues:"ALL_NEW"
  }

  dynamoDb.update(params, (error, data) => {
    if (error) {
      console.log('addLabelToContact - error')
      console.log(error)
    } else {
      console.log(data)
      req.item.data = data
      resolve(req)
    }
  })

})



module.exports = router
