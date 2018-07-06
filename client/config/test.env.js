node_modules/.bin/cross-env API_BASE_URL=https://dnc2oskit7.execute-api.eu-west-1.amazonaws.com/dev npm run dev'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
