let { google } = require('googleapis')

const googleAuthUtils = require('./googleAuthUtils')

exports.getGmailMessages = (req) => {
  return new Promise(async function (resolve, reject) {
    console.log('getGmailMessages - starting')
    console.log(req)

    await googleAuthUtils.getAuthorizedGmailClient(req)

    console.log('jwtClient')
    console.log(req.jwtClient)

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

exports.getGmailHistory = (req, pageToken) => {
  return new Promise(async function (resolve, reject) {
    console.log('getGmailHistory - starting')
    console.log(req)
    console.log(pageToken)

    await googleAuthUtils.getAuthorizedGmailClient(req)

    const gmail = google.gmail({
      version: 'v1',
      auth: req.jwtClient
    })

    console.log('before gmail request')

    try {
      const result = await gmail.users.history.list({
        userId: 'me',
        historyTypes: 'messageAdded',
        startHistoryId: req.historyId,
        pageToken: pageToken
      })
      console.log(result)
      const res = result.data

      console.log(res)
      req.newHistoryId = res.historyId
      if (res.history && res.history) {
        res.history.forEach(h => {
          console.log(h)
          if (h.messagesAdded) {
            h.messagesAdded.forEach(item => {
              console.log(item)
              req.addedIds.push(item.message.id)
            })
          }
        })
      }
      if (res.nextPageToken) {
        this.getGmailHistory(req, res.nextPageToken)
      }
      // req.history = res.data
      resolve(req)
    } catch (e) {
      console.log(e)
      if (e.code === 400 || e.code === 404) {
        // return null
        resolve(null)
      } else {
        reject(e)
      }
    }
  })
}

exports.getGmailMessageById = (req, id) => {
  return new Promise(async function (resolve, reject) {
    console.log('getGmailMessageById - starting')
    console.log(req)
    console.log(id)

    await googleAuthUtils.getAuthorizedGmailClient(req)

    const gmail = google.gmail({
      version: 'v1',
      auth: req.jwtClient
    })

    try {
      const res = await gmail.users.messages.get({userId: 'me', id: id})
      console.log(res.data)
      // req.data = res.data
      resolve(res.data)
    } catch (err) {
      console.log(err)
      resolve(null)
    }
  })
}
