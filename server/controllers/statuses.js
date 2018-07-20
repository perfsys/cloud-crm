const
    express = require('express'),
    router = express.Router();

const data = require('../data/statuses.json')


router.get('', function (req, res) {
    console.log('statuses-list - starting')

    res.json(data)
})


module.exports = router;
