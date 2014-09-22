var Config = require("./consecution/config");

consecution = module.exports = {};

function exportedExpose(obj, methodName, newMethodName) {
  consecution[newMethodName || methodName] = obj[methodName].bind(obj);
}

var config = consecution.config = new Config(ko);

exportedExpose(config, "init", "initConfig");