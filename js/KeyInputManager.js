function KeyboardInputManager() {
  this.events = {};

  this.listen();
}

KeyboardInputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

KeyboardInputManager.prototype.bindButtonPress = function (selector, fn) {
  var button = document.querySelector(selector);
  button.addEventListener("click", fn.bind(this));
  button.addEventListener(this.eventTouchend, fn.bind(this));
};

KeyboardInputManager.prototype.listen = function(){
  var self = this;
  var languageSelection = document.getElementsByClassName("ln-selection")[0];
  languageSelection.addEventListener("change", function(event){
    var ln = event.target.value;
    self.emit("translateUI", ln)
  });

  this.bindButtonPress(".button-random", this.newQuestion);

};

KeyboardInputManager.prototype.newQuestion = function(event){
  event.preventDefault();
  this.emit("newQuestion");
};
