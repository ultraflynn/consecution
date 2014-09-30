function Interactions(config) {
  if (!(this instanceof Interactions)) {
    return new Interactions(config);
  }
  this.config = config;
  this.completionHook = function() {
  };
  this.actions = [];
  this.timer = 0;
  this.epoch = {};
}
module.exports = Interactions;

Interactions.prototype.start = function(completionHook) {
  this.completionHook = completionHook || function() {
  };

  this.action = [];
  this.timer = 0;
  this.currentEpoch = {};

  this.startPeriod(0, this.config.epochs.length, 0);
};

Interactions.prototype.startPeriod = function(i, max, currentEpoch) {
  var self = this, delay, epoch = self.config.epochs[i];
  if (i < max) {
    self.currentEpoch = epoch;

    delay = epoch.epoch - currentEpoch;
    self.timer = setTimeout(function() {
      if (epoch["hook"]) {
        epoch.hook();
      }
      self.executeAndDrainActions();
      self.startPeriod(i + 1, max, epoch.epoch);
    }, delay);
  } else {
    self.completionHook();
  }
};

Interactions.prototype.queueAction = function(action) {
  var self = this;
  if (self.currentEpoch.interruptible) {
    clearTimeout(self.timer);
    action();
    self.completionHook();
  } else {
    self.actions.push(action);
  }
};

Interactions.prototype.executeAndDrainActions = function() {
  var i = this.actions.length - 1;
  for (; i >= 0; i--) {
    this.actions.splice(i, 1)[0]();
  }
};
