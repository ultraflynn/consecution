var Consecution = require("../lib/consecution");

describe("interactions", function() {
  var firedActions;

  beforeEach(function() {
    firedActions = {};
    jasmine.Clock.useMock();
  });

  it("should fire a single action at the epoch", function() {
    startConsecution([100]);

    fireAction("action", 50);
    checkAction("action", 50);
  });

  it("should fire a single action at the second epoch", function() {
    startConsecution([100, 200]);

    fireAction("action", 150);
    checkAction("action", 50);
  });

  it("should fire a single action at both epochs", function() {
    startConsecution([100, 200]);

    fireAction("first-action", 50);
    checkAction("first-action", 50);

    fireAction("second-action", 50);
    checkAction("second-action", 50);
  });

  it("should fire two actions at the first epoch", function() {
    startConsecution([100]);

    fireAction("first-action", 49);
    fireAction("second-action", 1);

    checkActions(["first-action", "second-action"], 50);
  });

  it("should fire two actions at the second epoch", function() {
    startConsecution([100, 200]);

    fireAction("first-action", 149);
    fireAction("second-action", 1);

    checkActions(["first-action", "second-action"], 50);
  });

  it("should fire two actions at the first and second epochs", function() {
    startConsecution([100, 200]);

    fireAction("first-action", 147);
    fireAction("second-action", 1);
    fireAction("third-action", 1);
    fireAction("fourth-action", 1);

    checkActions(["first-action", "second-action", "third-action", "fourth-action"], 50);
  });

  function startConsecution(epochs) {
    var i, max = epochs.length, config = [];
    for (i = 0; i < max; i++) {
      config.push({
        epoch: epochs[i]
      });
    }
    Consecution.initConfig(config);
    Consecution.start();
  }

  function fireAction(name, delay) {
    jasmine.Clock.tick(delay);
    Consecution.queueAction(function() {
      firedActions[name] = true;
    });
  }

  function checkAction(name, delay) {
    checkActions([name], delay);
  }

  function checkActions(names, delay) {
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
});