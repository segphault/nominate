
module.exports =
  whoami: (req, res) ->
    return res.json user: null unless req.session.user

    User.findOne req.session.user
      .exec (err, user) => res.json user: user

  register: (req, res) ->
    User.create(req.params.all()).exec (err, user) =>
      err = ValidationService.translate User, err
      return res.json err: err if err

      req.session.user = user.id
      res.json user

  login: (req, res) ->
    bcrypt = require "bcrypt"

    User.findOne username: req.param "username"
      .exec (err, user) =>
        return res.json err: "No Such User" unless user
        
        bcrypt.compare req.param("password"), user.password, (err, match) =>
          return res.json err: "Inavlid Password" unless match
          
          req.session.user = user.id
          res.json user
