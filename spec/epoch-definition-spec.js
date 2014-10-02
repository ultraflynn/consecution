var Test = require("./test-utils");

describe("epochs", function() {
  beforeEach(function() {
    Test.reset();
  });

  describe("which are duplicates", function() {
    it("should be reduced down to a single epoch", function() {
      Test.startConsecution([100,100]);

      Test.fireAction("action", 50);
      Test.checkAction("action", 50);
    });
  });

  describe("which are out of order", function() {
    it("should reorder epochs that are requested out of sequence", function() {
      Test.startConsecution([200, 100]);

      Test.fireAction("first-action", 50);
      Test.checkAction("first-action", 50);

      Test.fireAction("second-action", 50);
      Test.checkAction("second-action", 50);
    });
  });
});