const { google } = require('googleapis')

const s3Utils = require('./s3utils')
const dblUtils = require('./dbUtils')

const getJWTClient = (req) => {
  console.log(req)

  const clientEmail = req.keys.client_email
  const privateKey = req.keys.private_key
  const email = req.email

  if (!clientEmail || !privateKey || !email) return null

  console.log(clientEmail)
  console.log(privateKey)
  console.log(email)

  let jwtClient = new google.auth.JWT(
    clientEmail,
    null,
    privateKey,
    ['https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.labels'
    ],
    email
  )
  return jwtClient
}

exports.authorizeGmail = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('authorizeGmail - starting')

    console.log(req)

    let jwtClient = getJWTClient(req)
    if (!jwtClient) reject('Keys are wrong!')
    console.log('authorizeGmail - jwtClient')
    console.log(jwtClient)

    jwtClient.authorize()
      .then(tokens => {
        console.log(tokens)
        req.tokens = tokens
        resolve(req)
      })
      .catch(err => reject(err))
  })
}

const getGmailClientWithCredentials = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('getGmailClientWithCredentials - starting')

    console.log(req)

    let jwtClient = getJWTClient(req)

    if (!jwtClient) reject('Keys are wrong!')

    jwtClient.credentials = req.tokens
    console.log(jwtClient)

    req.jwtClient = jwtClient
    resolve(req)
  })
}

const prepareKeys = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('prepareKey - starting')

    console.log(req)

    if (req.dbToken) {
      req.key = `${req.dbToken.email}/keys.json`
      req.email = req.dbToken.email
      req.tokens = req.dbToken.tokens

      resolve(req)
    } else {
      reject('DB Access Token is wrong - error')
    }
  })
}

exports.getAuthorizedGmailClient = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('getAuthorizedGmailClient - starting')
    console.log(req)

    dblUtils.getGmailAccessToken(req)
      .then(prepareKeys)
      .then(s3Utils.getKeysFromBucket)
      .then(getGmailClientWithCredentials)
      .then(req => {
        resolve(req)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}
