const
    express = require('express'),
    router = express.Router();
const countries = require('../data/country-by-abbreviation.json')


router.get('', function (req, res) {
    console.log('countries-list - starting')

    res.json(countries)
})

module.exports = router;
