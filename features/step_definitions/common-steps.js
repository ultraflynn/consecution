var Consecution = require("../../lib/consecution");

var commonSteps = function CommonSteps() {
  var config, actions, lastEpoch, start, hookExecutedAt, tolerance = 50;

  this.Before(function(callback) {
    config = [];
    actions = {};
    lastEpoch = 0;
    start = 0;
    hookExecutedAt = null;
    callback();
  });

  this.Given(/^an interruptible epoch is added at "([^"]*)"$/, function(millis, callback) {
    var epoch = parseInt(millis);
    if (epoch > lastEpoch) {
      lastEpoch = epoch;
    }
    config.push({
      epoch: epoch,
      interruptible: true
    });
    callback();
  });

  this.Given(/^an epoch is added at "([^"]*)"$/, function(millis, callback) {
    var epoch = parseInt(millis);
    if (epoch > lastEpoch) {
      lastEpoch = epoch;
    }
    config.push({
      epoch: epoch
    });
    callback();
  });

  this.Given(/^the era is started$/, function(callback) {
    Consecution.initConfig(config);

    start = new Date().getTime();
    Consecution.start();

    callback();
  });

  this.Given(/^the era is started with a completion hook$/, function(callback) {
    Consecution.initConfig(config);

    start = new Date().getTime();
    Consecution.start(function() {
      hookExecutedAt = new Date().getTime()
    });

    callback();
  });

  this.When(/^an action named "([^"]*)" occurs after "([^"]*)"$/, function(name, delay, callback) {
    setTimeout(function() {
      Consecution.queueAction(function() {
        actions[name] = {
          executedAt: new Date().getTime()
        };
      });

      callback();
    }, parseInt(delay));
  });

  this.When(/^we wait "([^"]*)" after the last epoch$/, function(delay, callback) {
    var terminate = lastEpoch + parseInt(delay);
    setTimeout(function() {
      callback();
    }, terminate);
  });

  this.Then(/^the action named "([^"]*)" should be executed at "([^"]*)"$/, function(name, expected, callback) {
    var expectedAt = parseInt(expected);

    verifyActionHasExecuted(name,
            expectedAt - tolerance,
            expectedAt + tolerance, callback);
  });

  this.Then(/^the action named "([^"]*)" should be executed between "([^"]*)" and "([^"]*)"$/, function(name, expectedStart, expectedEnd, callback) {
    var startAt = parseInt(expectedStart),
        endAt = parseInt(expectedEnd);

    verifyActionHasExecuted(name, startAt - tolerance, endAt + tolerance, callback);
  });

  this.Then(/^the completion hook should be executed at "([^"]*)"$/, function(expected, callback) {
    var min = parseInt(expected) - tolerance, max = parseInt(expected) + tolerance;
    if (hookExecutedAt) {
      checkExecutionTime("Completion hook", hookExecutedAt, min, max, callback);
    } else {
      callback("Completion hook was not executed");
    }
  });

  function verifyActionHasExecuted(name, min, max, callback) {
    if (actions.hasOwnProperty(name)) {
      checkExecutionTime(name, actions[name].executedAt, min, max, callback);
    } else {
      callback("No action named " + name + " has been executed");
    }
  }

  function checkExecutionTime(name, executedAt, min, max, callback) {
    var actual = executedAt - start;
    if (actual > min && actual < max) {
      callback();
    } else {
      callback(name + " was executed at " + actual + " and not between " + min + " and " + max);
    }
  }
};

module.exports = commonSteps;
