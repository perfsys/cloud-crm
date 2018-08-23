const
  express = require('express')
const
  persistence_lib = require('../libs/persistence')
const groupsHelper = require('../helpers/groupsHelper')

const router = express.Router()

const R = require('ramda')

const constructContactItem = function (req) {
  const
    groups = req.groups

  return new Promise(function (resolve, reject) {
    console.log('constructContactItem - starting')
    const {
      group_id, // partition key
      name,
      email,
      phone_number,
      text
    } = req.body

    const item = {}

    if (group_id && typeof group_id === 'string') {
      let group_name = groups.find(i => i.id === group_id) ? groups.find(i => i.id === group_id).name : null

      if (group_name && typeof group_name === 'string') {
        item.group_id = group_id // partition key
        item.group_name = group_name
      } else {
        reject({error: `Not able to find "group name" by id: ${group_id} `})
      }
    } else {
      reject({error: '"group_id" must be a string'})
    }

    if (typeof name !== 'string') {
      reject({error: '"name" must be a string'})
    }

    if (name) {
      item.name = R.pipe(
        R.trim(),
        R.replace(' ', '_'),
        R.toLower()
      )(name)
    }

    if (typeof email !== 'string') {
      reject({error: '"email" must be a string'})
    }

    if (typeof text !== 'string') {
      reject({error: '"text" must be a string'})
    }

    if (email) {
      item.email = R.pipe(
        R.trim()
        // R.replace(' ', '_'),
        // R.toLower()
      )(email)
    }

    if (phone_number) {
      item.phone_number = R.pipe(
        R.trim()
        // R.replace(' ', '_'),
        // R.toLower()
      )(phone_number)
    }

    req.item = item
    resolve(req)
  })
}

const findGroups = function (req) {
  return new Promise(function (resolve, reject) {
    groupsHelper.getGroups()
      .then(result => {
        if (result && result.Items) {
          req.groups = result.Items
          resolve(req)
        } else {
          reject({error: 'Groups were not found'})
        }
      }, err => {
        reject(err)
      })
  })
}

router.post('/contacts', function (req, res) {
  console.log('external-contacts - starting')
  console.log(req.body)

  findGroups(req)
    .then(constructContactItem)
    .then(persistence_lib.preCreate)
    .then(persistence_lib.saveContact)
    .then(req => {
      res.json({})
      // res.json(req.item)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json(error)
    })
})

module.exports = router
