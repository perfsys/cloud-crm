const
  express = require('express')

const router = express.Router()

const data = require('../data/locations.json')

router.get('', function (req, res) {
  console.log('locations-list - starting')

  res.json(data)
})

module.exports = router
