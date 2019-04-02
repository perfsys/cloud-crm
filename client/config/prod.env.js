'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_BASE_URL: `'${process.env.API_BASE_URL}'`,
  S3_UPDATES_DATA_BUCKET: `'${process.env.S3_UPDATES_DATA_BUCKET}'`,
  IDENTITY_POOL_ID: `'${process.env.IDENTITY_POOL_ID}'`,
  REGION: `'${process.env.REGION}'`
}
