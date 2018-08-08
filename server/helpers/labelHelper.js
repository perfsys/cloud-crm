const
  AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const GROUPS_TABLE = process.env.GROUPS_TABLE

const findGroup = function (req) {
  console.log(req)
  return new Promise(function (resolve, reject) {
    console.log('findGroup - starting')
    const {item} = req
    const groupId = item.group_id

    const params = {
      TableName: GROUPS_TABLE,
      Key: {
        id: groupId
      }
    }

    dynamoDb.get(params, (error, result) => {
      console.log(result)

      if (error) {
        console.log('findGroup - error')
        console.log(error)
        reject(error)
      }
      if (result) {
        console.log(result)
        resolve(result)
      }
    })
  })
}

const populateContactItemByLabels = function (req) {
  let {labels} = req.body

  return new Promise(function (resolve, reject) {
    console.log('populateContactItemByLabels - starting')

    if (labels && Array.isArray(labels)) {
      findGroup(req)
        .then(result => {
          if (result && result.Item && result.Item.labels) {
            let labelsIds = result.Item.labels.map(item => item.name_normalized)

            labels = labels.filter(label => labelsIds.includes(label))

            console.log(labels)
            req.item.labels = labels

            resolve(req)
          } else {
            reject({error: 'Labels not found'})
          }
        },
        error => {
          reject(error)
        })
    } else {
      resolve(req)
    }
  })
}

exports.populateContactItemByLabels = populateContactItemByLabels
