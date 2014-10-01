var Test = require("./test-utils");

describe("actions", function() {
  beforeEach(function() {
    Test.reset();
  });

  describe("specified as different types", function() {
    var consecution, fireCount;

    function init(epochs, interruptible) {
      consecution = Test.startConsecution(epochs, interruptible);
      jasmine.Clock.tick(50);
      fireCount = 0;
    }

    it("should execute a valid function", function() {
      init([100]);
      consecution.queueAction(function() {
        fireCount++;
      });
      checkFireCount(1);
    });

    it("should execute immediately a valid function", function() {
      init([100], [true]);
      consecution.queueAction(function() {
        fireCount++;
      });
      checkFireCount(1);
    });

    it("should execute an array of functions", function() {
      init([100]);
      var action = function() {
        fireCount++;
      };
      consecution.queueAction([action, action, action]);
      checkFireCount(3);
    });

    it("should execute immediately an array of functions", function() {
      init([100], [true]);
      var action = function() {
        fireCount++;
      };
      consecution.queueAction([action, action, action]);
      checkFireCount(3);
    });

    it("should execute an action object", function() {
      init([100]);
      consecution.queueAction({
        action: function() {
          fireCount++;
        }
      });
      checkFireCount(1);
    });

    it("should execute immediately an action object", function() {
      init([100], [true]);
      consecution.queueAction({
        action: function() {
          fireCount++;
        }
      });
      checkFireCount(1);
    });

    it("should execute an array of actions objects", function() {
      init([100]);
      var action = {
        action: function() {
          fireCount++;
        }
      };
      consecution.queueAction([action, action, action]);
      checkFireCount(3);
    });

    it("should execute immediately array of actions objects", function() {
      init([100], [true]);
      var action = {
        action: function() {
          fireCount++;
        }
      };
      consecution.queueAction([action, action, action]);
      checkFireCount(3);
    });

    function checkFireCount(expected) {
      jasmine.Clock.tick(50);
      expect(fireCount).toBe(expected);
    }
  });

  xdescribe("terminating actions", function() {
    it("should cause no other actions at the epoch", function() {
      Test.startConsecution([100]);
      Test.fireAction("action-one", 30);
      Test.fireAction("action-two", 30);
      Test.fireAction("terminating-action", 30);

      Test.checkAction("terminating-action", 10);
      Test.checkActionHasNotFired("action-one");
      Test.checkActionHasNotFired("action-two");
    });
  });
});