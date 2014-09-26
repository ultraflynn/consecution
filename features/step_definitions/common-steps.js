var Consecution = require("../../lib/consecution");

var commonSteps = function CommonSteps() {
  var config = [], actions = {};

  this.Given(/^an epoch is added at "([^"]*)"$/, function(millis, callback) {
    config.push({
      epoch: millis
    });
    callback();
  });

  this.Given(/^the era is started$/, function(callback) {
    Consecution.initConfig(config);
    Consecution.start();
    callback();
  });

  this.When(/^an action named "([^"]*)" occurs at "([^"]*)"$/, function(name, delay, callback) {
    setTimeout(function() {
      actions[name] = {
        executed: false,
        executedAt: 0
      };

      Consecution.queueEvent(function() {
        actions[name].executed = true;
        actions[name].executedAt = new Date().getTime();
      });

      callback();
    }, delay);
  });

  this.Then(/^the action named "([^"]*)" should be executed at "([^"]*)"$/, function(name, expected, callback) {
    if (!actions.hasOwnProperty(name)) {
      callback("No action named " + name + " has been executed");
    } else if (!actions[name].executed) {
      callback(name + " has not been executed at " + expected)
    } else if (actions[name].executedAt !== expected) {
      callback(name + " was executed at " + actions[name].executedAt + " and not at " + expected);
    } else {
      callback();
    }
  });

  this.Then(/^the action named "([^"]*)" should be executed between "([^"]*)" and "([^"]*)"$/, function(name, expectedStart, expectedEnd, callback) {
    if (!actions.hasOwnProperty(name)) {
      callback("No action named " + name + " has been executed");
    } else if (!actions[name].executed) {
      callback(name + " has not been executed between " + expectedStart + " and " + expectedEnd)
    } else if (actions[name].executedAt > expectedStart && actions[name].executedAt <= expectedEnd) {
      callback(name + " was executed at " + actions[name].executedAt +
          " and not between " + expectedStart + " and " + expectedEnd);
    } else {
      callback();
    }
  });
};

module.exports = commonSteps;
