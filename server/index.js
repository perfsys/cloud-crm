const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');


const contacts = require('./controllers/contacts');
const sources = require('./controllers/sources');
const groups = require('./controllers/groups');
const types = require('./controllers/types');
const countries = require('./controllers/countries');

const app = express();


app.use(cors());
app.use(bodyParser.json({strict: false}));


app.use('/contacts', contacts)
app.use('/sources', sources)
app.use('/groups', groups)
app.use('/types', types)
app.use('/countries', countries)

app.get('/', function (req, res) {
    res.send('HEALTHY')
});


module.exports.handler = serverless(app, {
    request: function (request, event, context) {
        // Transfer context from Lambda Event to HTTP request object
        request.context = event.requestContext;
    },
});
