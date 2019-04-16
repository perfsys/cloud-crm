let { google }  = require('googleapis');


exports.authorizeGmail = (req) => {
  return new Promise(function (resolve, reject) {
    console.log('authorizeGmail - starting')

    console.log(req)

    const clientEmail = req.keys.client_email
    const privateKey = req.keys.private_key
    const email = req.email

    if(!clientEmail || !privateKey || !email) reject('Keys are wrong!')

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
