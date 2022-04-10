import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';

function log() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return console.log.apply(null, args);
}

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

  log(o);
  return (_args$name = args === null || args === void 0 ? void 0 : args.name) !== null && _args$name !== void 0 ? _args$name : 'stan';
}

export { index as default };
