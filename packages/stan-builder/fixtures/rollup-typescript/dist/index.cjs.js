'use strict';

var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);

function index (args) {
  var _args$name;

  var name = args.name,
      o = _objectWithoutProperties__default['default'](args, ["name"]);

  console.log(o);
  return (_args$name = args === null || args === void 0 ? void 0 : args.name) !== null && _args$name !== void 0 ? _args$name : 'stan';
}

module.exports = index;
//# sourceMappingURL=index.cjs.js.map