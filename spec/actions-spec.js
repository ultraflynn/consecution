var Test = require("./test-utils");

describe("actions", function() {
  var consecution, fireCount;

  function init(initialTick, epochs, interruptible) {
    consecution = Test.startConsecution(epochs, interruptible);
    jasmine.Clock.tick(initialTick);
    fireCount = 0;
  }

  beforeEach(function() {
    Test.reset();
  });

  describe("specified as different types", function() {
    it("should execute a function", function() {
      init(50, [100]);
      consecution.queueAction(function() {
        fireCount++;
      });
      checkFireCount(50, 1);
    });

    it("should execute immediately a function", function() {
      init(50, [100], [true]);
      consecution.queueAction(function() {
        fireCount++;
      });
      checkFireCount(50, 1);
    });

    it("should execute an array of functions", function() {
      init(50, [100]);
      var action = function() {
        fireCount++;
      };
      consecution.queueAction([action, action, action]);
      checkFireCount(50, 3);
    });

    it("should execute immediately an array of functions", function() {
      init(50, [100], [true]);
      var action = function() {
        fireCount++;
      };
      consecution.queueAction([action, action, action]);
      checkFireCount(50, 3);
    });

    it("should execute an action object", function() {
      init(50, [100]);
      consecution.queueAction({
        action: function() {
          fireCount++;
        }
      });
      checkFireCount(50, 1);
    });

    it("should execute immediately an action object", function() {
      init(50, [100], [true]);
      consecution.queueAction({
        action: function() {
          fireCount++;
        }
      });
      checkFireCount(50, 1);
    });

    it("should execute an array of actions objects", function() {
      init(50, [100]);
      var action = {
        action: function() {
          fireCount++;
        }
      };
      consecution.queueAction([action, action, action]);
      checkFireCount(50, 3);
    });

    it("should execute immediately array of actions objects", function() {
      init(50, [100], [true]);
      var action = {
        action: function() {
          fireCount++;
        }
      };
      consecution.queueAction([action, action, action]);
      checkFireCount(50, 3);
    });
  });

  describe("terminating setting on action object", function() {

    it("should execute object action and all other actions when not terminating", function() {
      Test.startConsecution([100]);
      Test.fireAction("action-one", 30);
      Test.fireAction("action-two", 30);
      Test.fireActionWithTermination("non-terminating-action", 30, false);

      Test.checkAction("non-terminating-action", 10);
      Test.checkActionHasFired("action-one");
      Test.checkActionHasFired("action-two");
    });

    it("should execute object action and stop other actions from executing when terminating", function() {
      Test.startConsecution([100]);
      Test.fireAction("action-one", 30);
      Test.fireAction("action-two", 30);
      Test.fireActionWithTermination("non-terminating-action", 30, true);

      Test.checkActionHasFired("non-terminating-action");
      Test.checkActionHasNotFired("action-one");
      Test.checkActionHasNotFired("action-two");

      jasmine.Clock.tick(10);
    });
  });

  function checkFireCount(finalTick, expected) {
    jasmine.Clock.tick(finalTick);
    expect(fireCount).toBe(expected);
  }
});