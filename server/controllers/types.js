const
    express = require('express'),
    router = express.Router();
const data = require('../data/types.json')


router.get('', function (req, res) {
    console.log('types-list - starting')

    res.json(data)
})

module.exports = router;
