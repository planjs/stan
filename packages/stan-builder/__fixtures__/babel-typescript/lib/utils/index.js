"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;

function log() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return console.log.apply(null, args);
}