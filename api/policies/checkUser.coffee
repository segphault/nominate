
module.exports = (req, res, next) ->
    unless req.session.user
      return res.json err: "Only registered users can do that"
    req.body.user = req.session.user
    next()
