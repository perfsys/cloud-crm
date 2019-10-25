'use strict'

const gmailUtils = require('../libs/gmailUtils')
const dblUtils = require('../libs/dbUtils')
const parseMessage = require('gmail-api-parse-message')

exports.handler = (event, context, callback) => {
  console.log('Email-get - starting')
  console.log(JSON.stringify(event, null, 2))
  console.log(context)

  const fullSync = async (req) => {
    console.log('fullSync - starting')
    try {
      // get list messages
      await gmailUtils.getGmailMessages(req)
      if (req.data.resultSizeEstimate > 0) {
        // get last one
        console.log(req.data.resultSizeEstimate)

        let lastMessage = await gmailUtils.getGmailMessageById(req, req.data.messages[0].id)
        console.log(lastMessage)
        req.newHistoryId = lastMessage.historyId
        // put its historyId to db
        await dblUtils.saveHistoryId(req)
      }
      return req
    } catch (e) {
    }
  }

  const partialSync = async (req) => {
    console.log('partialSync - starting')
    try {
      // check history id
      await dblUtils.getGmailHistoryId(req)
      if (!req.dbHistoryId || !req.dbHistoryId.historyId) return null
      req.historyId = req.dbHistoryId.historyId
      // get added messages ids

      req.addedIds = []
      let res = await gmailUtils.getGmailHistory(req)
      console.log(res)
      if (!res) {
        return null
      }
      // save new history id to db
      await dblUtils.saveHistoryId(req)
      // get messages by ids and put to db
      console.log(req.addedIds)
      let id
      for (let i = 0; i < req.addedIds.length; i++) {
        id = req.addedIds[i]
        console.log(id)

        let data = await gmailUtils.getGmailMessageById(req, id)

        if (data) {
          // parse data
          console.log(parseMessage(data))
          // save to db
          await dblUtils.saveGmailMessage({id: data.id, message: parseMessage(data)})
        }
      }

      console.log('partialSync - completed')
      return req
    } catch (e) {
      console.log(e)
    }
  }

  async function gmailSync (req) {
    try {
      let result = await partialSync(req)
      if (!result) {
        await fullSync(req)
      }
    } catch (err) {
      console.log(err)
    }
  }

  let req = {}

  gmailSync(req)
    .catch(error =>
      console.log(error)
    )

  callback(null, 'Success')
}
