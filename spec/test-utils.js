var Consecution = require("../lib/consecution");

var firedActions;
var completionHook;

module.exports = {
  reset: function() {
    firedActions = {};
    completionHook = null;
    jasmine.Clock.useMock();
  },

  addCompletionHook: function(hook) {
    completionHook = hook;
  },

  startConsecution: function(epochs, interruptible, hooks) {
    var i, max = epochs.length, config = [];
    interruptible = interruptible ||
        Array.apply(null, new Array(epochs.length)).map(Boolean.prototype.valueOf, false);
    hooks = hooks ||
        Array.apply(null, new Array(epochs.length)).map(Function.prototype.valueOf, function() {});

    for (i = 0; i < max; i++) {
      config.push({
        epoch: epochs[i],
        interruptible: interruptible[i],
        hook: hooks[i]
      });
    }
    Consecution.initConfig(config);
    if (completionHook) {
      Consecution.start(completionHook);
    } else {
      Consecution.start();
    }
    return Consecution;
  },

  fireAction: function(name, delay) {
    jasmine.Clock.tick(delay);
    Consecution.queueAction(function() {
      firedActions[name] = true;
    });
  },

  checkAction: function(name, delay) {
    this.checkActions([name], delay);
  },

  checkActions: function(names, delay) {
    var i, max = names.length;

    jasmine.Clock.tick(delay - 1);
    for (i = 0; i < max; i++) {
      expect(firedActions.hasOwnProperty(names[i])).toBe(false);
    }

    jasmine.Clock.tick(1);
    for (i = 0; i < max; i++) {
      expect(firedActions.hasOwnProperty(names[i])).toBe(true);
    }
  },

  checkActionHasFired: function(name) {
    expect(firedActions.hasOwnProperty(name)).toBe(true);
  },

  checkActionHasNotFired: function(name) {
    expect(firedActions.hasOwnProperty(name)).toBe(false);
  }
};