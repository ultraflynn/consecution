var Test = require("./test-utils");

describe("completion hook", function() {
  beforeEach(function() {
    Test.reset();
  });

  it("should fire at the end of an era", function() {
    var completionHookFired = false;

    Test.addCompletionHook(function() {
      completionHookFired = true;
    });
    Test.startConsecution([100]);
    Test.fireAction("action", 50);
    jasmine.Clock.tick(50);

    expect(completionHookFired).toBe(true);
  });

  it("should fire at the end of an interrupted era", function() {
    var completionHookFired = false;

    Test.addCompletionHook(function() {
      completionHookFired = true;
    });
    Test.startConsecution([100], [true]);
    Test.fireAction("action", 50);

    expect(completionHookFired).toBe(true);
    jasmine.Clock.tick(50);
  });

  it("should fire at the end of an era with multiple epochs", function() {
    var completionHookFired = false;

    Test.addCompletionHook(function() {
      completionHookFired = true;
    });
    Test.startConsecution([100,200]);
    Test.fireAction("action", 50);
    Test.fireAction("action", 100);
    jasmine.Clock.tick(50);

    expect(completionHookFired).toBe(true);
  });

  it("should fire at the end of an epoch", function() {
    var epochHookFired = false;

    Test.startConsecution([100], [false], [function() {
      epochHookFired = true;
    }]);

    Test.fireAction("action", 50);
    Test.checkAction("action", 50);

    expect(epochHookFired).toBe(true);
  });
});