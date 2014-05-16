var Component = require("montage/ui/component").Component;

exports.Location = Component.specialize({
  latitude: { value: null },

  longitude: { value: null },

  query: { value: null },

  results: { value: null },

  dispatch: {
    value: function(name, obj) {
      var event = document.createEvent("CustomEvent");
      event.initCustomEvent(name, true, true, obj);
      return this.dispatchEvent(event);
    }
  },

  templateDidLoad: {
    value: function() {
      this.refreshLocation();
    }
  },

  refreshLocation: {
    value: function() {
      var _this = this;
      navigator.geolocation.getCurrentPosition(function(pos) {
        _this.latitude = pos.coords.latitude;
        _this.longitude = pos.coords.longitude;
      });
    }
  },

  handleButtonCancelAction: {
    value: function() {
      this.dispatch("cancel");
    }
  },

  handleButtonAddAction: {
    value: function(ev) {
      return this.dispatch("add", ev.detail.get("place"));
    }
  },

  handleButtonSearchAction: {
    value: function() {
      var attrib = document.getElementById("attribution");
      var places = new google.maps.places.PlacesService(attrib);
      var location = new google.maps.LatLng(this.latitude, this.longitude);

      var request = {
        radius: 5000,
        keyword: this.query,
        location: location,
        types: ["restaurant"]
      };

      var _this = this;
      places.nearbySearch(request, function(results, status) {
        _this.results = results;
      });
    }
  }
});
