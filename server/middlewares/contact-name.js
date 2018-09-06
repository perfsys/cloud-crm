module.exports = function (req, res, next, contactName) {
  console.log('[app.param] - contactName: ' + contactName)
  req.contactName = contactName
  next()
}
