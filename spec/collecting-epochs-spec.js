var Test = require("./test-utils");

xdescribe("collecting epochs", function() {
  beforeEach(function() {
    Test.reset();
  });

  it("should fire a single action at the epoch", function() {
    Test.startConsecution([100]);

    Test.fireAction("action", 50);
    Test.checkAction("action", 50);
  });

  it("should fire a single action at the second epoch", function() {
    Test.startConsecution([100, 200]);

    Test.fireAction("action", 150);
    Test.checkAction("action", 50);
  });

  it("should fire a single action at both epochs", function() {
    Test.startConsecution([100, 200]);

    Test.fireAction("first-action", 50);
    Test.checkAction("first-action", 50);

    Test.fireAction("second-action", 50);
    Test.checkAction("second-action", 50);
  });

  it("should fire two actions at the first epoch", function() {
    Test.startConsecution([100]);

    Test.fireAction("first-action", 49);
    Test.fireAction("second-action", 1);

    Test.checkActions(["first-action", "second-action"], 50);
  });

  it("should fire two actions at the second epoch", function() {
    Test.startConsecution([100, 200]);

    Test.fireAction("first-action", 149);
    Test.fireAction("second-action", 1);

    Test.checkActions(["first-action", "second-action"], 50);
  });

  it("should fire two actions at the first and second epochs", function() {
    Test.startConsecution([100, 200]);

    Test.fireAction("first-action", 147);
    Test.fireAction("second-action", 1);
    Test.fireAction("third-action", 1);
    Test.fireAction("fourth-action", 1);

    Test.checkActions(["first-action", "second-action", "third-action", "fourth-action"], 50);
  });
});