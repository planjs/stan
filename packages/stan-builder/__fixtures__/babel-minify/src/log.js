function log() {
  return console.log.apply(this, arguments);
}

module.exports = log;
