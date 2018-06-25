const
    express = require('express'),
    router = express.Router();

const data = require('../data/groups.json')


router.get('', function (req, res) {
    console.log('groups-list - starting')

    res.json(data)
})


module.exports = router;
