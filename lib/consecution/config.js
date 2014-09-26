function Config() {
  if (!(this instanceof Config)) {
    return new Config();
  }
  this.epochs = [];
}
module.exports = Config;

Config.prototype.init = function(epochs) {
  this.epochs = epochs || [];
};

