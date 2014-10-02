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

  this._startPeriod(0, this.config.epochs.length, 0);
};

Interactions.prototype._startPeriod = function(i, max, currentEpoch) {
  var self = this, delay, epoch = self.config.epochs[i];
  if (i < max) {
    self.currentEpoch = epoch;

    delay = epoch.epoch - currentEpoch;
    self.timer = setTimeout(function() {
      if (epoch["hook"]) {
        epoch.hook();
      }
      self._executeAndDrainActions();
      self._startPeriod(i + 1, max, epoch.epoch);
    }, delay);
  } else {
    self.completionHook();
  }
};

Interactions.prototype._executeAndDrainActions = function() {
  var i = this.actions.length - 1;
  for (; i >= 0; i--) {
    this.actions.splice(i, 1)[0]();
  }
};

Interactions.prototype.queueAction = function(action) {
  var self = this;
  if (self.currentEpoch.interruptible) {
    clearTimeout(self.timer);
    self.actions = [];
    self._executeAction(action);
    self.completionHook();
  } else {
    self._pushAction(action);
  }
};

Interactions.prototype._executeAction = function(action) {
  var self = this, i, max;
  if (action instanceof Function) {
    action();
  } else if (action instanceof Array) {
    max = action.length;
    for (i = 0; i < max; i++) {
      self._executeAction(action[i]);
    }
  } else if (action instanceof Object) {
    if (action.hasOwnProperty("action")) {
      self._executeAction(action.action);
    }
  } else {
    console.log("Invalid action");
  }
};

Interactions.prototype._pushAction = function(action) {
  var self = this, i, max;
  if (action instanceof Function) {
    self.actions.push(action);
  } else if (action instanceof Array) {
    max = action.length;
    for (i = 0; i < max; i++) {
      self._pushAction(action[i]);
    }
  } else if (action instanceof Object) {
    self._handleActionObject(action);
  } else {
    console.log("Invalid action");
  }
};

Interactions.prototype._handleActionObject = function(action) {
  var self = this;
  if (action.hasOwnProperty("action")) {
    if (action.hasOwnProperty("terminating") && action["terminating"]) {
      self.actions = [];
      self._executeAction(action);
      self.completionHook();
      if (self.currentEpoch["hook"]) {
        self.currentEpoch.hook();
      }
    } else {
      self._pushAction(action.action);
    }
  } else {
    console.log("Invalid action");
  }
};
