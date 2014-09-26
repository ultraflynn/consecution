var Consecution = require("../lib/consecution");

describe("interactions", function() {
  it("should allow a configuration to be defined using initConfig", function() {
    Consecution.initConfig([]);
    Consecution.start();
  });

  it("should allow an event to be queued", function() {
    Consecution.initConfig([]);
    Consecution.start();
    Consecution.queueEvent(function() {
      // An event
    });
  });

  it("should fire an action", function() {
    jasmine.Clock.useMock();
    Consecution.initConfig([
      {epoch: 100}
    ]);

    var eventFired = false;

    Consecution.start();
    Consecution.queueEvent(function() {
      eventFired = true;
    });

    jasmine.Clock.tick(99);
    expect(eventFired).toBe(false);
    jasmine.Clock.tick(100);
    expect(eventFired).toBe(true);
  });
});