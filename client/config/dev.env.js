'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  REGION: `'${process.env.REGION}'`,
  API_BASE_URL: `'${process.env.API_BASE_URL}'`,
  S3_UPDATES_DATA_BUCKET: `'${process.env.S3_UPDATES_DATA_BUCKET}'`,
  IDENTITY_POOL_ID: `'${process.env.IDENTITY_POOL_ID}'`
})
