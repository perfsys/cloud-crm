const dblUtils = require('../libs/dbUtils')

exports.handler = (event, context, callback) => {
  console.log('Find-contacts - starting')
  console.log(JSON.stringify(event, null, 2))

  event.Records.forEach((record) => {

    let mailId = record.messageAttributes.MailId.stringValue
    let contactIds = JSON.parse(record.body)

    console.log(contactIds)

    await  dblUtils.getGmailMessage()(mailId)

    for (let i = 0; i < contactIds.length; i++) {




    }

    callback(null, 'Success')
}

