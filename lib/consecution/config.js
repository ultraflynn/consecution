function Config() {
  if (!(this instanceof Config)) {
    return new Config();
  }
  this.epochs = [];
}
module.exports = Config;

Config.prototype.init = function(epochs) {
  // TODO Check the epochs for duplicates and ignore them
  // TODO Order the epochs
  this.epochs = epochs || [];
};

