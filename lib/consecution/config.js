function Config() {
  if (!(this instanceof Config)) {
    return new Config();
  }
}
module.exports = Config;

Config.prototype.init = function(data) {
  this.data = data || {};
};
