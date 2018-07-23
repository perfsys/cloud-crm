const
  express = require('express')

const router = express.Router()

const data = require('../data/groups.json')

router.get('', function (req, res) {
  console.log('groups-list - starting')

  res.json(data)
})

module.exports = router
