var Montage = require("montage").Montage;
var Map = require("collections/map").Map;

exports.Router = Montage.specialize({
  routes: { value: [] },

  parts: { value: null },

  path: { value: null },

  default: { value: null },

  constructor: {
    value: function() {
      var _this = this;
      window.onpopstate = function(e) { _this.updatePath(); };
    }
  },

  updatePath: {
    value: function(path) {
      this.path = path && ("#!/" + path) || window.location.hash.slice(1);
      
      if (path)
        history.pushState(this.path, this.path, this.path);

      this.parts = this.compare(this.path);
    }
  },

  compare: {
    value: function(target) {
      var items = (target.replace(/^#?!\//, "") || this["default"]).split("/");

      for (var i = 0; i < this.routes.length; i++) {
        var path = this.routes[i];
        var route = path.split("/");

        if (route.length >= items.length) {
          matches = [];
          for (var iter = 0; iter < route.length; iter++) {
            var item = items[iter] || "";
            var el = route[iter].split(":");
            var test = RegExp("^" + el[1] + "$").test(item);
            matches.push([el[0], test ? item : false]);
          }

          if (matches.every(function(x) { return x[1] !== false; }))
            return Map(matches);
        }
      }

      return Map();
    }
  }
});
