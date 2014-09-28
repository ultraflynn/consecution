var Test = require("./test-utils");

describe("duplicate epochs", function() {
  beforeEach(function() {
    Test.reset();
  });

  it("should reduce duplicate epochs down to a single epoch", function() {
    Test.startConsecution([100,100]);

    Test.fireAction("action", 50);
    Test.checkAction("action", 50);
  });

  it("should reorder epochs that are requested out of sequence", function() {
    Test.startConsecution([200, 100]);

    Test.fireAction("first-action", 50);
    Test.checkAction("first-action", 50);

    Test.fireAction("second-action", 50);
    Test.checkAction("second-action", 50);
  });
});