function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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
 * 全局对象
 */


var root = _globalThis || _window || _global || _self || Function('return this')();
var global$1 = root;

console.log(global$1);
