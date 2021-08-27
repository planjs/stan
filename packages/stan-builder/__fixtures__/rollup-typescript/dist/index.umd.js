(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.pkg = factory());
}(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var objectWithoutProperties = {exports: {}};

	var objectWithoutPropertiesLoose = {exports: {}};

	(function (module) {
	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	module.exports = _objectWithoutPropertiesLoose;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	}(objectWithoutPropertiesLoose));

	(function (module) {
	var objectWithoutPropertiesLoose$1 = objectWithoutPropertiesLoose.exports;

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};
	  var target = objectWithoutPropertiesLoose$1(source, excluded);
	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	module.exports = _objectWithoutProperties;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	}(objectWithoutProperties));

	var _objectWithoutProperties = /*@__PURE__*/getDefaultExportFromCjs(objectWithoutProperties.exports);

	function styleInject(css, ref) {
	  if ( ref === void 0 ) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') { return; }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css_248z$2 = ".body {\n  font-size: 0;\n}\n";
	styleInject(css_248z$2);

	var css_248z$1 = ".scss {\n  font-size: 13px; }\n  .scss .scss-gray {\n    color: red; }\n";
	styleInject(css_248z$1);

	var css_248z = ".index {\n  color: red;\n  font-size: 20px;\n  display: block; }\n";
	styleInject(css_248z);

	var _excluded = ["name"];
	function index (args) {
	  var _args$name;

	  args.name;
	      var o = _objectWithoutProperties(args, _excluded);

	  console.log(o);
	  return (_args$name = args === null || args === void 0 ? void 0 : args.name) !== null && _args$name !== void 0 ? _args$name : 'stan';
	}

	return index;

})));
