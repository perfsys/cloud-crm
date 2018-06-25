const
    AWS = require('aws-sdk'),
    express = require('express'),
    randomstring = require("randomstring"),
    router = express.Router(),
    parse_link = require('parse-link')
R = require('ramda');

const dynamoDb = new AWS.DynamoDB.DocumentClient()

const CONTACTS_TABLE = process.env.CONTACTS_TABLE;

const getOne = function (item) {
    return new Promise(function (resolve, reject) {
        console.log('getOne - starting');
        const {group_id, name} = item

        const params = {
            TableName: CONTACTS_TABLE,
            Key: {
                group_id: group_id,
                name: name
            },
        };

        dynamoDb.get(params, (error, result) => {
            if (error) {
                reject(error)
            }
            if (result.Item) {
                resolve(result.Item)
            }
            else {
                reject({error: "Contact not found"})
            }
        });
    })
}

const constructContactItem = function (req) {

    const
        groups = require('../data/groups.json'),
        types = require('../data/types.json'),
        sources = require('../data/sources.json'),
        countries = require('../data/country-by-abbreviation.json')

    return new Promise(function (resolve, reject) {
        console.log('constructContactItem - starting');
        const {
            group_id, // partition key

            name, // sort key
            first_name,
            last_name,

            source_id,
            country_code,
            type_id,

            company_name,
            company_www,
            position,
            facebook_link,
            twitter_link,
            linkedin_link
        } = req.body;

        const item = {};

        if (group_id && typeof group_id === 'string') {

            // TODO
            let group_name = R.pipe(
                // find
                R.find(R.propEq('id', group_id)),

                // get name
                R.prop('name')
            )(groups)

            if (group_name && typeof group_name === 'string') {
                item.group_id = group_id; // partition key
                item.group_name = group_name;

            } else {
                reject({error: `Not able to find "group name" by id: ${group_id} `})
            }


        } else {
            reject({error: '"group_id" must be a string'})
        }

        if (name || (first_name && last_name)) {
            item.name = ((name) ? name : (`${last_name}_${first_name}`)).toLowerCase() // sort key
        } else {
            reject({error: '"name" or "first_name"+"last_name" must be a string'})
        }

        if (source_id && typeof source_id === 'string') {
            let source_name = R.pipe(
                // find
                R.find(R.propEq('id', source_id)),

                // get name
                R.prop('name')
            )(sources)

            if (source_name) {
                item.source_id = source_id
                item.source_name = source_name
            }
        } else {
            reject({error: '"source_id" must be a string'})
        }

        if (country_code) {
            let country = R.pipe(
                // find
                R.find(R.propEq('abbreviation', country_code)),

                // get country
                R.prop('country')
            )(countries)
            if (country) {
                item.country_code = country_code
                item.country_name = country
            }
        }

        if (type_id) {
            let type_name = R.pipe(
                // find
                R.find(R.propEq('id', type_id)),

                // get name
                R.prop('name')
            )(types)

            if (type_name) {
                item.type_id = type_id
                item.type_name = type_name
            }
        }

        if (company_name) {
            item.company_name = company_name
            item.company_normalized = R.pipe(
                R.trim(),
                R.replace(' ', '_'),
                R.toLower()
            )(company_name)
        }

        if (position) {
            item.position = position
        }

        if (company_www) {
            let www_obj = parse_link(company_www)
            if (www_obj.protocol && www_obj.host) {
                item.company_www = `${www_obj.protocol}//${www_obj.host}`
            }
        }

        if (facebook_link) {
            let www_obj = parse_link(facebook_link)
            if (www_obj.protocol && www_obj.host && www_obj.pathname) {
                item.facebook_link = `${www_obj.protocol}//${www_obj.host}${www_obj.pathname}`
            }
        }

        if (linkedin_link) {
            let www_obj = parse_link(linkedin_link)
            if (www_obj.protocol && www_obj.host && www_obj.pathname) {
                item.linkedin_link = `${www_obj.protocol}//${www_obj.host}${www_obj.pathname}`
            }
        }

        if (twitter_link) {
            let www_obj = parse_link(twitter_link)
            if (www_obj.protocol && www_obj.host && www_obj.pathname) {
                item.twitter_link = `${www_obj.protocol}//${www_obj.host}${www_obj.pathname}`
            }
        }

        resolve(item)


    })
}

const saveContact = function (item) {
    return new Promise(function (resolve, reject) {

        console.log('saveContact - starting');
        const params = {
            TableName: CONTACTS_TABLE,
            Item: item,
        };

        dynamoDb.put(params, (error, data) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            else {
                // resolve(data) // TODO ?
                resolve(item)
            }
        });

    })

}

router.post('', function (req, res) {
    console.log('contacts-create - starting');

    const preCreate = function (item) {
        return new Promise(function (resolve, reject) {
            item.create_dt = new Date().toISOString();
            resolve(item)
        })
    }

    constructContactItem(req)
        .then(preCreate)
        .then(saveContact)
        .then(getOne)
        .then(res.json)
        .catch(error => {
            console.log(error);
            res.status(400).json(error);
        })


});
router.put('', function (req, res) {
    console.log('contacts-update - starting');

    const preUpdate = function (item) {
        return new Promise(function (resolve, reject) {
            item.update_dt = new Date().toISOString();
            resolve(item)
        })
    }

    getOne(req)
        .then(preUpdate)

        .then(saveContact)
        .then(getOne)
        .then(res.json)
        .catch(error => {
            console.log(error);
            res.status(400).json({error: 'Could not create a contact'});
        })

});

router.put('/:group_id/:name', function (req, res) {

    console.log('contacts-update - starting');

    const preUpdate = function (item) {
        return new Promise(function (resolve, reject) {
            item.update_dt = new Date().toISOString();
            resolve(item)
        })
    }

    getOne(req.params)
        .then(preUpdate)
        .then(saveContact)
        .then(getOne)
        .then(res.json)
        .catch(error => {
            console.log(error);
            res.status(400).json({error: 'Could not create a contact'});
        })

});

router.get('/:group_id/:name', function (req, res) {
    console.log('contact-get - starting');

    getOne(req.params)
        .then(res.json)
        .catch(error => {
            console.log(error);
            res.status(400).json({error: 'Could not get contact'});
        })
});

router.get('', function (req, res) {

    console.log('contacts-list - starting');
    const params = {
        TableName: CONTACTS_TABLE,
    };

    dynamoDb.scan(params, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).json({error: 'Could not scan contacts'});
        }
        if (result.Items) {
            res.json(result.Items);
        }
        else {
            res.status(404).json({error: "Contact are empty"});
        }
    });
});

router.delete('/:group_id/:name', function (req, res) {
    console.log('contact-delete - starting');
    const {group_id, name} = req.params

    const params = {
        TableName: CONTACTS_TABLE,
        Key: {
            group_id: group_id,
            name: name
        },
    };

    dynamoDb.delete(params, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).json({error: 'Could not delete contact'});
        }
        if (result) {
            console.log('Contact was Deleted');
            res.send(result);
        }
    });
});





module.exports = router;
