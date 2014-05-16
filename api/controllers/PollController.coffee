
module.exports =
  vote: (req, res) ->
    userid = req.session.user || null
    placeid = req.param "place"
    pollid = req.param "id"

    return res.json err: "Must specify a valid place" unless placeid
    return res.json err: "Must specify a valid poll" unless pollid

    Poll.findOne(pollid).populate("places").populate("votes").exec (err, poll) =>
      unless "#{placeid}" in ("#{place.id}" for place in poll.places)
        return res.json err: "Must specify a place that is in the poll"

      if userid
        for vote in poll.votes when vote.user == userid
          return Vote.update vote.id, {place: placeid}, (err, vote) =>
            Poll.publishUpdate pollid, vote: vote[0]
            res.json updated: vote[0]

      Vote.create poll: pollid, place: placeid, user: userid
        .exec (err, vote) =>
          Poll.publishUpdate pollid, vote: vote
          res.json vote: vote
