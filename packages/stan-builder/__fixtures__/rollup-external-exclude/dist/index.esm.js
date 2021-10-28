function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var check = function check(it) {
  return it && it.Object === Object && it;
};
/**
 * global
 */


var _global = check((typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global);
/**
 * window
 */


var _window = check((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window);
/**
 * globalThis
 */


var _globalThis = check((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) == 'object' && globalThis);
/**
 * self
 */
// eslint-disable-next-line no-restricted-globals


var _self = check((typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self);
/**
 * func this
 */


var _fnThis = function () {
  // @ts-ignore
  return this; // eslint-disable-next-line no-new-func
}() || Function('return this')();
/**
 * 全局对象
 */


var root = _globalThis || _window || _global || _self || _fnThis;
var global$1 = root;

console.log(global$1);
