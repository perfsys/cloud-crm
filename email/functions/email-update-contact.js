const dblUtils = require('../libs/dbUtils')
const axios = require('../libs/http-common')

exports.handler = (event, context, callback) => {
  console.log('Find-contacts - starting')
  console.log(JSON.stringify(event, null, 2))

  event.Records.forEach((record) => {
    let mailId = record.messageAttributes.MailId.stringValue
    let body = JSON.parse(record.body)
    let contactIds = body.contactIds
    let req = {}
    req.gmailId = mailId

    console.log(contactIds)

    dblUtils.getGmailMessage(req)
      .then(req => {
        console.log(req)

        contactIds.forEach(contactId => {
          axios.HTTP.post(`/contacts/${contactId.groupId}/${contactId.contactName}/updates`,
            {
              text: req.gmailMessage,
              type: 'GMAIL'
            })
            .then(function (data) {
              console.log(data)
            }, function (err) {
              console.log(err)
            })
        })
      })
  })

  callback(null, 'Success')
}
