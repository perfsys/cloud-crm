const
  express = require('express')

const router = express.Router()

const data = require('../data/statuses.json')

router.get('', function (req, res) {
  console.log('statuses-list - starting')

  res.json(data)
})

module.exports = router
