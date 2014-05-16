
module.exports =
  schema: true

  attributes:
    user: model: "user"
    places: collection: "place"
    votes:
      collection: "vote"
      via: "poll"
