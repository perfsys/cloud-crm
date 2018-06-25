const
    express = require('express'),
    router = express.Router();

const data = require('../data/sources.json')


router.get('', function (req, res) {
    console.log('sources-list - starting')

    res.json(data)
})

module.exports = router;
