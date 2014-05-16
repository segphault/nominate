var Component = require("montage/ui/component").Component;

exports.Main = Component.specialize({
  user: { value: null },

  updatePath: {
    value: function(path) {
      this.templateObjects.router.updatePath(path);
    }
  },

  login: {
    value: function(action, username, password) {
      var data = {
        username: username,
        password: password
      };

      var _this = this;
      io.socket.post("/user/" + action, data, function(resp) {
        if (resp.err)
          _this.templateObjects.identity.error = resp.err;
        
        _this.updatePath("home");
        _this.user = resp;
      });
    }
  },

  templateDidLoad: {
    value: function() {
      var _this = this;
      io.socket.get("/user/whoami", function(resp) {
        _this.user = resp.user;
      });
      
      this.updatePath();
    }
  },

  handleIdentityLogin: {
    value: function(ev) {
      this.login("login", ev.target.username, ev.target.password);
    }
  },

  handleIdentitySignup: {
    value: function(ev) {
      this.login("register", ev.target.username, ev.target.password);
    }
  },

  handleButtonSignupAction: {
    value: function() {
      this.updatePath("identity/signup");
    }
  },

  handleButtonLoginAction: {
    value: function() {
      this.updatePath("identity/login");
    }
  },

  handleButtonNewPollAction: {
    value: function() {
      var _this = this;
      io.socket.post("/poll/create", function(resp) {
        _this.updatePath("poll/" + resp.id);
      });
    }
  }
});
