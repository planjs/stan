"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("./index.css");

require("./sass.scss");

function _default(args) {
  var _args$name;

  var name = args.name,
      o = (0, _objectWithoutProperties2.default)(args, ["name"]);
  console.log(o);
  return (_args$name = args === null || args === void 0 ? void 0 : args.name) !== null && _args$name !== void 0 ? _args$name : 'stan';
}