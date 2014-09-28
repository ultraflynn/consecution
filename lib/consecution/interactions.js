function Interactions(config) {
  if (!(this instanceof Interactions)) {
    return new Interactions(config);
  }
  this.config = config;
  this.actions = [];
}
module.exports = Interactions;

Interactions.prototype.start = function() {
  this.startPeriod(0, this.config.epochs.length, 0);
};

Interactions.prototype.startPeriod = function(i, max, currentEpoch) {
  var self = this, delay;
  if (i < max) {
    delay = self.config.epochs[i].epoch - currentEpoch;
    setTimeout(function() {
      self.executeAndDrainActions();
      self.startPeriod(i + 1, max, self.config.epochs[i].epoch);
    }, delay);
  }
};

Interactions.prototype.queueAction = function(action) {
  this.actions.push(action);
};

Interactions.prototype.executeAndDrainActions = function() {
  var i = this.actions.length - 1;
  for (; i >= 0; i--) {
    this.actions.splice(i, 1)[0]();
  }
};
