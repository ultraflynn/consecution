var Consecution = require("../lib/consecution");

var firedActions;

module.exports = {
  reset: function() {
    firedActions = {};
    jasmine.Clock.useMock();
  },

  startConsecution: function(epochs) {
    var i, max = epochs.length, config = [];
    for (i = 0; i < max; i++) {
      config.push({
        epoch: epochs[i]
      });
    }
    Consecution.initConfig(config);
    Consecution.start();
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
  }
};