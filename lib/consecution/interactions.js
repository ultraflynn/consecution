function Interactions(config) {
  if (!(this instanceof Interactions)) {
    return new Interactions(config);
  }
  this.config = config;
  this.events = [];
}
module.exports = Interactions;

Interactions.prototype.start = function() {
  var self = this;
  if (self.config.epochs.length > 0) {
    setTimeout(function() {
      self.executeActions();
    }, self.config.epochs[0].epoch);
  }
};

Interactions.prototype.queueEvent = function(event) {
  this.events.push(event);
};

Interactions.prototype.executeActions = function() {
  var i, max = this.events.length;
  for (i = 0; i < max; i++) {
    this.events[i]();
  }
};
