exports.handler = (event, context, callback) => {
  console.log('Find-contacts - starting')
  console.log(JSON.stringify(event, null, 2))

  event.Records.filter(item => item.eventName === 'INSERT').forEach((record) => {
    let mail = JSON.parse(record.dynamodb.NewImage.message.S)
    let emails = mailAddressParser(mail)

    console.log(emails)

  })

  callback(null, 'Success')
}

const  mailAddressParser = (mail) => {
  console.log('mailAddressParser - starting')

  let deliveredTo = mail.headers['delivered-to']
  let from =[], to = [], bcc = [], cc = []

  if(mail.headers.from) {
    from = extractEmail(mail.headers.from).filter(s => s !== deliveredTo)
    console.log(from)
  }

  if(mail.headers.to) {
    to = extractEmail(mail.headers.to).filter(s => s !== deliveredTo)
    console.log(to)
  }

  if(mail.headers.bcc) {
    bcc = extractEmail(mail.headers.bcc).filter(s => s !== deliveredTo)
    console.log(bcc)
  }

  if(mail.headers.cc) {
    cc = extractEmail(mail.headers.cc).filter(s => s !== deliveredTo)
    console.log(cc)
  }

  let result = [...new Set(from.concat(to).concat(bcc).concat(cc))];
  console.log(result)
  return result

}

const extractEmail = (str) => {
  console.log('extractEmail')
  return str.split(',').map(s => {
    if(s[s.length - 1] === '>' ) {
      return (s.substring(s.lastIndexOf('<') + 1, s.length - 1))
    } else {
      return s
    }
  })
}
