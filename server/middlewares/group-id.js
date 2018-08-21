module.exports = function (req, res, next, groupId) {
  console.log('[app.param] - groupId: ' + groupId)
  req.groupId = groupId
  next()
}
