const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const external = require('./controllers/external')
const contacts = require('./controllers/contacts')
const sources = require('./controllers/sources')
const groups = require('./controllers/groups')
const types = require('./controllers/types')
const countries = require('./controllers/countries')
const statuses = require('./controllers/statuses')
const labels = require('./controllers/labels')

const app = express()

app.use(cors())
app.use(bodyParser.json({strict: false}))
app.param('groupId', require('./middlewares/group-id'))

app.use('/contacts', contacts)
app.use('/external', external)
app.use('/sources', sources)
app.use('/groups', groups)
app.use('/groups/:groupId/labels', labels)
app.use('/types', types)
app.use('/countries', countries)
app.use('/statuses', statuses)

app.get('/', function (req, res) {
  res.send('HEALTHY')
})

module.exports.handler = serverless(app, {
  request: function (request, event, context) {
    // Transfer context from Lambda Event to HTTP request object
    request.context = event.requestContext
  }
})
