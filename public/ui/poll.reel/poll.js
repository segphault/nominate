var Component = require("montage/ui/component").Component;
var Map = require("montage/collections/map");

exports.Poll = Component.specialize({
  showPicker: { value: false },

  pollid: { value: null },

  user: { value: null },

  places: { value: null },

  votes: { value: null },

  voted: { value: false },

  templateDidLoad: {
    value: function() {
      var _this = this;
      if (this.pollid) {
        io.socket.get("/poll/" + this.pollid, function(resp) {
          _this.voted = localStorage.getItem("poll:" + _this.pollid);
          _this.places = resp.places;
          _this.votes = resp.votes;
        });
      }

      io.socket.on("poll", function(update) {
        if (update.attribute === "places" && update.verb === "addedTo") {
          io.socket.get("/place/" + update.addedId, function(resp) {
            _this.places.push(resp);
          });
        } else if ((update.data || {}).vote) {
          io.socket.get("/poll/" + _this.pollid + "/votes", function(resp) {
            _this.votes = resp;
          });
        }
      });
    }
  },

  handleButtonVoteAction: {
    value: function(ev) {
      var _this = this;

      data = { place: ev.detail.get('place').id };
      io.socket.post("/poll/vote/" + this.pollid, data, function(resp) {
        localStorage.setItem("poll:" + _this.pollid, true);
        _this.voted = true;
      });
    }
  },

  handleButtonAddAction: {
    value: function() {
      this.showPicker = true;
    }
  },

  handleButtonNewAction: {
    value: function() {
      this.showPicker = true;
    }
  },

  handleLocationAdd: {
    value: function(ev) {
      this.showPicker = false;
      
      var data = {
        name: ev.detail.name,
        vicinity: ev.detail.vicinity,
        soruce: "google"
      };
      
      var _this = this;
      return io.socket.post("/poll/" + this.pollid + "/places", data, function(resp) {
        _this.places = resp.places;
      });
    }
  }
});
