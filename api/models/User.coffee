
module.exports =
  schema: true

  attributes:
    username:
      type: "string"
      unique: true
      required: true
    password:
      type: "string"
      minLength: 5
      required: true

    toJSON: ->
      obj = @toObject()
      delete obj.password
      delete obj.username
      return obj

  beforeCreate: (attrs, next) ->
    bcrypt = require "bcrypt"
    bcrypt.genSalt 10, (err, salt) =>
      return next err if err
      bcrypt.hash attrs.password, salt, (err, hash) =>
        return next err if err
        attrs.password = hash
        next()

  validation:
    username:
      required: "You must provide a valid e-mail address"
      unique: "There is already an account with that e-mail address"
    password:
      required: "You must provide a valid password"
      minLength: "Your password must be at least five characters long"
