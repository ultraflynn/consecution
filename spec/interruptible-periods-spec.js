var Test = require("./test-utils");

describe("interruptible periods", function() {
  beforeEach(function() {
    Test.reset();
  });

  it("should interrupt when action occurs", function() {
    Test.startConsecution([100], [true]);

    Test.fireAction("action", 50);
    Test.checkActionHasFired("action");
  });

  it("should interrupt second epoch when action occurs", function() {
    Test.startConsecution([100, 200], [false, true]);

    Test.fireAction("action", 150);
    Test.checkActionHasFired("action");
  });
});