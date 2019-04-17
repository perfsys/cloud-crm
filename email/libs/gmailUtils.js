let { google } = require('googleapis')

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

exports.getAuthorizedGmailClient = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('getAuthorizedGmailClient - starting')

    console.log(req)

    let jwtClient = getJWTClient(req)

    if (!jwtClient) reject('Keys are wrong!')

    jwtClient.credentials = req.tokens
    console.log(jwtClient)

    req.jwtClient = jwtClient
    resolve(req)
  })
}

exports.getGmailMessages = (req) => {
  return new Promise(async function (resolve, reject) {
    console.log('getGmailMessages - starting')
    console.log(req)

    const gmail = google.gmail({
      version: 'v1',
      auth: req.jwtClient
    })

    const res = await gmail.users.messages.list({userId: 'me'})

    console.log(res.data)
    req.data = res.data

    resolve(req)
  })
}
