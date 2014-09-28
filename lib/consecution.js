var Config = require("./consecution/config");
var Interactions = require("./consecution/interactions");

consecution = module.exports = {};

function exportedExpose(obj, methodName, newMethodName) {
  consecution[newMethodName || methodName] = obj[methodName].bind(obj);
}

var config = consecution.config = new Config();
var interactions = consecution.interactions = new Interactions(config);

exportedExpose(config, "init", "initConfig");
exportedExpose(interactions, "start");
exportedExpose(interactions, "queueAction");
