function Config() {
  if (!(this instanceof Config)) {
    return new Config();
  }
  this.epochs = [];
}
module.exports = Config;

Config.prototype.init = function(epochs) {
  this.epochs = this.sortEpochs(epochs) || [];
};

Config.prototype.sortEpochs = function(epochs) {
  return epochs.sort(function(a, b) {
    return a.epoch - b.epoch;
  });
};

