var Component = require("montage/ui/component").Component;

exports.Login = Component.specialize({
  username: { value: null },

  password: { value: null },

  error: { value: null },

  signup: { value: true },

  handleButtonLoginAction: {
    value: function(ev) {
      var event, name;
      
      if (!this.password || !this.username)
        return this.error = "You must enter an e-mail address and password";
   
      if (this.signup && this.password !== this.templateObjects.inputRepeat.value)
        return this.error = "Passwords must be the same";
 
      var name = this.signup ? "signup" : "login";
      var event = document.createEvent("CustomEvent");
      event.initCustomEvent(name, true, true, null);
      this.dispatchEvent(event);
    }
  }
});
