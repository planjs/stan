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

/**
 * 判断是否为function
 * https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
 * @param func
 * @category Is
 */
function isFunction(func) {
  return func && {}.toString.call(func) === '[object Function]';
}

isBrowser() ? window.navigator.userAgent : '';
/**
 * 检查是否浏览器环境
 * @category Is
 */

function isBrowser() {
  return (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.window === window;
}

/**
 * 定义一个参数是否是object类型的，不等同于javascript中的 typeof
 * null 不是对象
 * @param value
 * @category Is
 */

function isObject(value) {
  return value === Object(value);
}

/**
 * 判断是否为平台原生对象
 * @link https://davidwalsh.name/detect-native-function
 * @example
 *
 * isNative(window) // true
 * isNative(alert) // true
 * @category Is
 */

function isNative(value) {
  var toString = Object.prototype.toString;
  var fnToString = Function.prototype.toString;
  var regxHostCtor = /^[object .+?Constructor]$/;
  var reNative = RegExp('^' + String(toString) // eslint-disable-next-line no-useless-escape
  .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&') // eslint-disable-next-line no-useless-escape
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  return isFunction(value) ? reNative.test(fnToString.call(value)) : value && isObject(value) && regxHostCtor.test(toString.call(value)) || false;
}

/**
 * requestAnimationFrame polyfill
 * @category Bom
 */

var RAF = function () {
  return root.requestAnimationFrame || root.webkitRequestAnimationFrame || root.mozRequestAnimationFrame || root.oRequestAnimationFrame || root.msRequestAnimationFrame || function (callback) {
    return root.setTimeout(callback, 1000 / 60);
  };
}();

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * Assert a condition.
 * @param condition The condition that it should satisfy.
 * @param message The error message.
 * @param args The arguments for replacing placeholders in the message.
 */
function assertType(condition, message, ...args) {
    if (!condition) {
        throw new TypeError(format(message, args));
    }
}
/**
 * Convert a text and arguments to one string.
 * @param message The formating text
 * @param args The arguments.
 */
function format(message, args) {
    let i = 0;
    return message.replace(/%[os]/gu, () => anyToString(args[i++]));
}
/**
 * Convert a value to a string representation.
 * @param x The value to get the string representation.
 */
function anyToString(x) {
    if (typeof x !== "object" || x === null) {
        return String(x);
    }
    return Object.prototype.toString.call(x);
}

let currentErrorHandler;
/**
 * Print a error message.
 * @param maybeError The error object.
 */
function reportError(maybeError) {
    try {
        const error = maybeError instanceof Error
            ? maybeError
            : new Error(anyToString(maybeError));
        // Call the user-defined error handler if exists.
        if (currentErrorHandler) ;
        // Dispatch an `error` event if this is on a browser.
        if (typeof dispatchEvent === "function" &&
            typeof ErrorEvent === "function") {
            dispatchEvent(new ErrorEvent("error", { error, message: error.message }));
        }
        // Emit an `uncaughtException` event if this is on Node.js.
        //istanbul ignore else
        else if (typeof process !== "undefined" &&
            typeof process.emit === "function") {
            process.emit("uncaughtException", error);
            return;
        }
        // Otherwise, print the error.
        console.error(error);
    }
    catch (_a) {
        // ignore.
    }
}

/**
 * The global object.
 */
//istanbul ignore next
const Global = typeof window !== "undefined"
    ? window
    : typeof self !== "undefined"
        ? self
        : typeof global !== "undefined"
            ? global
            : typeof globalThis !== "undefined"
                ? globalThis
                : undefined;

let currentWarnHandler;
/**
 * The warning information.
 */
class Warning {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    /**
     * Report this warning.
     * @param args The arguments of the warning.
     */
    warn(...args) {
        var _a;
        try {
            // Call the user-defined warning handler if exists.
            if (currentWarnHandler) ;
            // Otherwise, print the warning.
            const stack = ((_a = new Error().stack) !== null && _a !== void 0 ? _a : "").replace(/^(?:.+?\n){2}/gu, "\n");
            console.warn(this.message, ...args, stack);
        }
        catch (_b) {
            // Ignore.
        }
    }
}

const InitEventWasCalledWhileDispatching = new Warning("W01", "Unable to initialize event under dispatching.");
const FalsyWasAssignedToCancelBubble = new Warning("W02", "Assigning any falsy value to 'cancelBubble' property has no effect.");
const TruthyWasAssignedToReturnValue = new Warning("W03", "Assigning any truthy value to 'returnValue' property has no effect.");
const NonCancelableEventWasCanceled = new Warning("W04", "Unable to preventDefault on non-cancelable events.");
const CanceledInPassiveListener = new Warning("W05", "Unable to preventDefault inside passive event listener invocation.");
const EventListenerWasDuplicated = new Warning("W06", "An event listener wasn't added because it has been added already: %o, %o");
const OptionWasIgnored = new Warning("W07", "The %o option value was abandoned because the event listener wasn't added as duplicated.");
const InvalidEventListener = new Warning("W08", "The 'callback' argument must be a function or an object that has 'handleEvent' method: %o");
new Warning("W09", "Event attribute handler must be a function: %o");

/*eslint-disable class-methods-use-this */
/**
 * An implementation of `Event` interface, that wraps a given event object.
 * `EventTarget` shim can control the internal state of this `Event` objects.
 * @see https://dom.spec.whatwg.org/#event
 */
class Event$1 {
    /**
     * @see https://dom.spec.whatwg.org/#dom-event-none
     */
    static get NONE() {
        return NONE;
    }
    /**
     * @see https://dom.spec.whatwg.org/#dom-event-capturing_phase
     */
    static get CAPTURING_PHASE() {
        return CAPTURING_PHASE;
    }
    /**
     * @see https://dom.spec.whatwg.org/#dom-event-at_target
     */
    static get AT_TARGET() {
        return AT_TARGET;
    }
    /**
     * @see https://dom.spec.whatwg.org/#dom-event-bubbling_phase
     */
    static get BUBBLING_PHASE() {
        return BUBBLING_PHASE;
    }
    /**
     * Initialize this event instance.
     * @param type The type of this event.
     * @param eventInitDict Options to initialize.
     * @see https://dom.spec.whatwg.org/#dom-event-event
     */
    constructor(type, eventInitDict) {
        Object.defineProperty(this, "isTrusted", {
            value: false,
            enumerable: true,
        });
        const opts = eventInitDict !== null && eventInitDict !== void 0 ? eventInitDict : {};
        internalDataMap.set(this, {
            type: String(type),
            bubbles: Boolean(opts.bubbles),
            cancelable: Boolean(opts.cancelable),
            composed: Boolean(opts.composed),
            target: null,
            currentTarget: null,
            stopPropagationFlag: false,
            stopImmediatePropagationFlag: false,
            canceledFlag: false,
            inPassiveListenerFlag: false,
            dispatchFlag: false,
            timeStamp: Date.now(),
        });
    }
    /**
     * The type of this event.
     * @see https://dom.spec.whatwg.org/#dom-event-type
     */
    get type() {
        return $(this).type;
    }
    /**
     * The event target of the current dispatching.
     * @see https://dom.spec.whatwg.org/#dom-event-target
     */
    get target() {
        return $(this).target;
    }
    /**
     * The event target of the current dispatching.
     * @deprecated Use the `target` property instead.
     * @see https://dom.spec.whatwg.org/#dom-event-srcelement
     */
    get srcElement() {
        return $(this).target;
    }
    /**
     * The event target of the current dispatching.
     * @see https://dom.spec.whatwg.org/#dom-event-currenttarget
     */
    get currentTarget() {
        return $(this).currentTarget;
    }
    /**
     * The event target of the current dispatching.
     * This doesn't support node tree.
     * @see https://dom.spec.whatwg.org/#dom-event-composedpath
     */
    composedPath() {
        const currentTarget = $(this).currentTarget;
        if (currentTarget) {
            return [currentTarget];
        }
        return [];
    }
    /**
     * @see https://dom.spec.whatwg.org/#dom-event-none
     */
    get NONE() {
        return NONE;
    }
    /**
     * @see https://dom.spec.whatwg.org/#dom-event-capturing_phase
     */
    get CAPTURING_PHASE() {
        return CAPTURING_PHASE;
    }
    /**
     * @see https://dom.spec.whatwg.org/#dom-event-at_target
     */
    get AT_TARGET() {
        return AT_TARGET;
    }
    /**
     * @see https://dom.spec.whatwg.org/#dom-event-bubbling_phase
     */
    get BUBBLING_PHASE() {
        return BUBBLING_PHASE;
    }
    /**
     * The current event phase.
     * @see https://dom.spec.whatwg.org/#dom-event-eventphase
     */
    get eventPhase() {
        return $(this).dispatchFlag ? 2 : 0;
    }
    /**
     * Stop event bubbling.
     * Because this shim doesn't support node tree, this merely changes the `cancelBubble` property value.
     * @see https://dom.spec.whatwg.org/#dom-event-stoppropagation
     */
    stopPropagation() {
        $(this).stopPropagationFlag = true;
    }
    /**
     * `true` if event bubbling was stopped.
     * @deprecated
     * @see https://dom.spec.whatwg.org/#dom-event-cancelbubble
     */
    get cancelBubble() {
        return $(this).stopPropagationFlag;
    }
    /**
     * Stop event bubbling if `true` is set.
     * @deprecated Use the `stopPropagation()` method instead.
     * @see https://dom.spec.whatwg.org/#dom-event-cancelbubble
     */
    set cancelBubble(value) {
        if (value) {
            $(this).stopPropagationFlag = true;
        }
        else {
            FalsyWasAssignedToCancelBubble.warn();
        }
    }
    /**
     * Stop event bubbling and subsequent event listener callings.
     * @see https://dom.spec.whatwg.org/#dom-event-stopimmediatepropagation
     */
    stopImmediatePropagation() {
        const data = $(this);
        data.stopPropagationFlag = data.stopImmediatePropagationFlag = true;
    }
    /**
     * `true` if this event will bubble.
     * @see https://dom.spec.whatwg.org/#dom-event-bubbles
     */
    get bubbles() {
        return $(this).bubbles;
    }
    /**
     * `true` if this event can be canceled by the `preventDefault()` method.
     * @see https://dom.spec.whatwg.org/#dom-event-cancelable
     */
    get cancelable() {
        return $(this).cancelable;
    }
    /**
     * `true` if the default behavior will act.
     * @deprecated Use the `defaultPrevented` proeprty instead.
     * @see https://dom.spec.whatwg.org/#dom-event-returnvalue
     */
    get returnValue() {
        return !$(this).canceledFlag;
    }
    /**
     * Cancel the default behavior if `false` is set.
     * @deprecated Use the `preventDefault()` method instead.
     * @see https://dom.spec.whatwg.org/#dom-event-returnvalue
     */
    set returnValue(value) {
        if (!value) {
            setCancelFlag($(this));
        }
        else {
            TruthyWasAssignedToReturnValue.warn();
        }
    }
    /**
     * Cancel the default behavior.
     * @see https://dom.spec.whatwg.org/#dom-event-preventdefault
     */
    preventDefault() {
        setCancelFlag($(this));
    }
    /**
     * `true` if the default behavior was canceled.
     * @see https://dom.spec.whatwg.org/#dom-event-defaultprevented
     */
    get defaultPrevented() {
        return $(this).canceledFlag;
    }
    /**
     * @see https://dom.spec.whatwg.org/#dom-event-composed
     */
    get composed() {
        return $(this).composed;
    }
    /**
     * @see https://dom.spec.whatwg.org/#dom-event-istrusted
     */
    //istanbul ignore next
    get isTrusted() {
        return false;
    }
    /**
     * @see https://dom.spec.whatwg.org/#dom-event-timestamp
     */
    get timeStamp() {
        return $(this).timeStamp;
    }
    /**
     * @deprecated Don't use this method. The constructor did initialization.
     */
    initEvent(type, bubbles = false, cancelable = false) {
        const data = $(this);
        if (data.dispatchFlag) {
            InitEventWasCalledWhileDispatching.warn();
            return;
        }
        internalDataMap.set(this, {
            ...data,
            type: String(type),
            bubbles: Boolean(bubbles),
            cancelable: Boolean(cancelable),
            target: null,
            currentTarget: null,
            stopPropagationFlag: false,
            stopImmediatePropagationFlag: false,
            canceledFlag: false,
        });
    }
}
//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------
const NONE = 0;
const CAPTURING_PHASE = 1;
const AT_TARGET = 2;
const BUBBLING_PHASE = 3;
/**
 * Private data for event wrappers.
 */
const internalDataMap = new WeakMap();
/**
 * Get private data.
 * @param event The event object to get private data.
 * @param name The variable name to report.
 * @returns The private data of the event.
 */
function $(event, name = "this") {
    const retv = internalDataMap.get(event);
    assertType(retv != null, "'%s' must be an object that Event constructor created, but got another one: %o", name, event);
    return retv;
}
/**
 * https://dom.spec.whatwg.org/#set-the-canceled-flag
 * @param data private data.
 */
function setCancelFlag(data) {
    if (data.inPassiveListenerFlag) {
        CanceledInPassiveListener.warn();
        return;
    }
    if (!data.cancelable) {
        NonCancelableEventWasCanceled.warn();
        return;
    }
    data.canceledFlag = true;
}
// Set enumerable
Object.defineProperty(Event$1, "NONE", { enumerable: true });
Object.defineProperty(Event$1, "CAPTURING_PHASE", { enumerable: true });
Object.defineProperty(Event$1, "AT_TARGET", { enumerable: true });
Object.defineProperty(Event$1, "BUBBLING_PHASE", { enumerable: true });
const keys = Object.getOwnPropertyNames(Event$1.prototype);
for (let i = 0; i < keys.length; ++i) {
    if (keys[i] === "constructor") {
        continue;
    }
    Object.defineProperty(Event$1.prototype, keys[i], { enumerable: true });
}
// Ensure `event instanceof window.Event` is `true`.
if (typeof Global !== "undefined" && typeof Global.Event !== "undefined") {
    Object.setPrototypeOf(Event$1.prototype, Global.Event.prototype);
}

/**
 * Create a new InvalidStateError instance.
 * @param message The error message.
 */
function createInvalidStateError(message) {
    if (Global.DOMException) {
        return new Global.DOMException(message, "InvalidStateError");
    }
    if (DOMException == null) {
        DOMException = class DOMException extends Error {
            constructor(msg) {
                super(msg);
                if (Error.captureStackTrace) {
                    Error.captureStackTrace(this, DOMException);
                }
            }
            // eslint-disable-next-line class-methods-use-this
            get code() {
                return 11;
            }
            // eslint-disable-next-line class-methods-use-this
            get name() {
                return "InvalidStateError";
            }
        };
        Object.defineProperties(DOMException.prototype, {
            code: { enumerable: true },
            name: { enumerable: true },
        });
        defineErrorCodeProperties(DOMException);
        defineErrorCodeProperties(DOMException.prototype);
    }
    return new DOMException(message);
}
//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------
let DOMException;
const ErrorCodeMap = {
    INDEX_SIZE_ERR: 1,
    DOMSTRING_SIZE_ERR: 2,
    HIERARCHY_REQUEST_ERR: 3,
    WRONG_DOCUMENT_ERR: 4,
    INVALID_CHARACTER_ERR: 5,
    NO_DATA_ALLOWED_ERR: 6,
    NO_MODIFICATION_ALLOWED_ERR: 7,
    NOT_FOUND_ERR: 8,
    NOT_SUPPORTED_ERR: 9,
    INUSE_ATTRIBUTE_ERR: 10,
    INVALID_STATE_ERR: 11,
    SYNTAX_ERR: 12,
    INVALID_MODIFICATION_ERR: 13,
    NAMESPACE_ERR: 14,
    INVALID_ACCESS_ERR: 15,
    VALIDATION_ERR: 16,
    TYPE_MISMATCH_ERR: 17,
    SECURITY_ERR: 18,
    NETWORK_ERR: 19,
    ABORT_ERR: 20,
    URL_MISMATCH_ERR: 21,
    QUOTA_EXCEEDED_ERR: 22,
    TIMEOUT_ERR: 23,
    INVALID_NODE_TYPE_ERR: 24,
    DATA_CLONE_ERR: 25,
};
function defineErrorCodeProperties(obj) {
    const keys = Object.keys(ErrorCodeMap);
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        const value = ErrorCodeMap[key];
        Object.defineProperty(obj, key, {
            get() {
                return value;
            },
            configurable: true,
            enumerable: true,
        });
    }
}

/**
 * An implementation of `Event` interface, that wraps a given event object.
 * This class controls the internal state of `Event`.
 * @see https://dom.spec.whatwg.org/#interface-event
 */
class EventWrapper extends Event$1 {
    /**
     * Wrap a given event object to control states.
     * @param event The event-like object to wrap.
     */
    static wrap(event) {
        return new (getWrapperClassOf(event))(event);
    }
    constructor(event) {
        super(event.type, {
            bubbles: event.bubbles,
            cancelable: event.cancelable,
            composed: event.composed,
        });
        if (event.cancelBubble) {
            super.stopPropagation();
        }
        if (event.defaultPrevented) {
            super.preventDefault();
        }
        internalDataMap$1.set(this, { original: event });
        // Define accessors
        const keys = Object.keys(event);
        for (let i = 0; i < keys.length; ++i) {
            const key = keys[i];
            if (!(key in this)) {
                Object.defineProperty(this, key, defineRedirectDescriptor(event, key));
            }
        }
    }
    stopPropagation() {
        super.stopPropagation();
        const { original } = $$1(this);
        if ("stopPropagation" in original) {
            original.stopPropagation();
        }
    }
    get cancelBubble() {
        return super.cancelBubble;
    }
    set cancelBubble(value) {
        super.cancelBubble = value;
        const { original } = $$1(this);
        if ("cancelBubble" in original) {
            original.cancelBubble = value;
        }
    }
    stopImmediatePropagation() {
        super.stopImmediatePropagation();
        const { original } = $$1(this);
        if ("stopImmediatePropagation" in original) {
            original.stopImmediatePropagation();
        }
    }
    get returnValue() {
        return super.returnValue;
    }
    set returnValue(value) {
        super.returnValue = value;
        const { original } = $$1(this);
        if ("returnValue" in original) {
            original.returnValue = value;
        }
    }
    preventDefault() {
        super.preventDefault();
        const { original } = $$1(this);
        if ("preventDefault" in original) {
            original.preventDefault();
        }
    }
    get timeStamp() {
        const { original } = $$1(this);
        if ("timeStamp" in original) {
            return original.timeStamp;
        }
        return super.timeStamp;
    }
}
/**
 * Private data for event wrappers.
 */
const internalDataMap$1 = new WeakMap();
/**
 * Get private data.
 * @param event The event object to get private data.
 * @returns The private data of the event.
 */
function $$1(event) {
    const retv = internalDataMap$1.get(event);
    assertType(retv != null, "'this' is expected an Event object, but got", event);
    return retv;
}
/**
 * Cache for wrapper classes.
 * @type {WeakMap<Object, Function>}
 * @private
 */
const wrapperClassCache = new WeakMap();
// Make association for wrappers.
wrapperClassCache.set(Object.prototype, EventWrapper);
if (typeof Global !== "undefined" && typeof Global.Event !== "undefined") {
    wrapperClassCache.set(Global.Event.prototype, EventWrapper);
}
/**
 * Get the wrapper class of a given prototype.
 * @param originalEvent The event object to wrap.
 */
function getWrapperClassOf(originalEvent) {
    const prototype = Object.getPrototypeOf(originalEvent);
    if (prototype == null) {
        return EventWrapper;
    }
    let wrapper = wrapperClassCache.get(prototype);
    if (wrapper == null) {
        wrapper = defineWrapper(getWrapperClassOf(prototype), prototype);
        wrapperClassCache.set(prototype, wrapper);
    }
    return wrapper;
}
/**
 * Define new wrapper class.
 * @param BaseEventWrapper The base wrapper class.
 * @param originalPrototype The prototype of the original event.
 */
function defineWrapper(BaseEventWrapper, originalPrototype) {
    class CustomEventWrapper extends BaseEventWrapper {
    }
    const keys = Object.keys(originalPrototype);
    for (let i = 0; i < keys.length; ++i) {
        Object.defineProperty(CustomEventWrapper.prototype, keys[i], defineRedirectDescriptor(originalPrototype, keys[i]));
    }
    return CustomEventWrapper;
}
/**
 * Get the property descriptor to redirect a given property.
 */
function defineRedirectDescriptor(obj, key) {
    const d = Object.getOwnPropertyDescriptor(obj, key);
    return {
        get() {
            const original = $$1(this).original;
            const value = original[key];
            if (typeof value === "function") {
                return value.bind(original);
            }
            return value;
        },
        set(value) {
            const original = $$1(this).original;
            original[key] = value;
        },
        configurable: d.configurable,
        enumerable: d.enumerable,
    };
}

/**
 * Create a new listener.
 * @param callback The callback function.
 * @param capture The capture flag.
 * @param passive The passive flag.
 * @param once The once flag.
 * @param signal The abort signal.
 * @param signalListener The abort event listener for the abort signal.
 */
function createListener(callback, capture, passive, once, signal, signalListener) {
    return {
        callback,
        flags: (capture ? 1 /* Capture */ : 0) |
            (passive ? 2 /* Passive */ : 0) |
            (once ? 4 /* Once */ : 0),
        signal,
        signalListener,
    };
}
/**
 * Set the `removed` flag to the given listener.
 * @param listener The listener to check.
 */
function setRemoved(listener) {
    listener.flags |= 8 /* Removed */;
}
/**
 * Check if the given listener has the `capture` flag or not.
 * @param listener The listener to check.
 */
function isCapture(listener) {
    return (listener.flags & 1 /* Capture */) === 1 /* Capture */;
}
/**
 * Check if the given listener has the `passive` flag or not.
 * @param listener The listener to check.
 */
function isPassive(listener) {
    return (listener.flags & 2 /* Passive */) === 2 /* Passive */;
}
/**
 * Check if the given listener has the `once` flag or not.
 * @param listener The listener to check.
 */
function isOnce(listener) {
    return (listener.flags & 4 /* Once */) === 4 /* Once */;
}
/**
 * Check if the given listener has the `removed` flag or not.
 * @param listener The listener to check.
 */
function isRemoved(listener) {
    return (listener.flags & 8 /* Removed */) === 8 /* Removed */;
}
/**
 * Call an event listener.
 * @param listener The listener to call.
 * @param target The event target object for `thisArg`.
 * @param event The event object for the first argument.
 * @param attribute `true` if this callback is an event attribute handler.
 */
function invokeCallback({ callback }, target, event) {
    try {
        if (typeof callback === "function") {
            callback.call(target, event);
        }
        else if (typeof callback.handleEvent === "function") {
            callback.handleEvent(event);
        }
    }
    catch (thrownError) {
        reportError(thrownError);
    }
}

/**
 * Find the index of given listener.
 * This returns `-1` if not found.
 * @param list The listener list.
 * @param callback The callback function to find.
 * @param capture The capture flag to find.
 */
function findIndexOfListener({ listeners }, callback, capture) {
    for (let i = 0; i < listeners.length; ++i) {
        if (listeners[i].callback === callback &&
            isCapture(listeners[i]) === capture) {
            return i;
        }
    }
    return -1;
}
/**
 * Add the given listener.
 * Does copy-on-write if needed.
 * @param list The listener list.
 * @param callback The callback function.
 * @param capture The capture flag.
 * @param passive The passive flag.
 * @param once The once flag.
 * @param signal The abort signal.
 */
function addListener(list, callback, capture, passive, once, signal) {
    let signalListener;
    if (signal) {
        signalListener = removeListener.bind(null, list, callback, capture);
        signal.addEventListener("abort", signalListener);
    }
    const listener = createListener(callback, capture, passive, once, signal, signalListener);
    if (list.cow) {
        list.cow = false;
        list.listeners = [...list.listeners, listener];
    }
    else {
        list.listeners.push(listener);
    }
    return listener;
}
/**
 * Remove a listener.
 * @param list The listener list.
 * @param callback The callback function to find.
 * @param capture The capture flag to find.
 * @returns `true` if it mutated the list directly.
 */
function removeListener(list, callback, capture) {
    const index = findIndexOfListener(list, callback, capture);
    if (index !== -1) {
        return removeListenerAt(list, index);
    }
    return false;
}
/**
 * Remove a listener.
 * @param list The listener list.
 * @param index The index of the target listener.
 * @param disableCow Disable copy-on-write if true.
 * @returns `true` if it mutated the `listeners` array directly.
 */
function removeListenerAt(list, index, disableCow = false) {
    const listener = list.listeners[index];
    // Set the removed flag.
    setRemoved(listener);
    // Dispose the abort signal listener if exists.
    if (listener.signal) {
        listener.signal.removeEventListener("abort", listener.signalListener);
    }
    // Remove it from the array.
    if (list.cow && !disableCow) {
        list.cow = false;
        list.listeners = list.listeners.filter((_, i) => i !== index);
        return false;
    }
    list.listeners.splice(index, 1);
    return true;
}

/**
 * Create a new `ListenerListMap` object.
 */
function createListenerListMap() {
    return Object.create(null);
}
/**
 * Get the listener list of the given type.
 * If the listener list has not been initialized, initialize and return it.
 * @param listenerMap The listener list map.
 * @param type The event type to get.
 */
function ensureListenerList(listenerMap, type) {
    var _a;
    return ((_a = listenerMap[type]) !== null && _a !== void 0 ? _a : (listenerMap[type] = {
        attrCallback: undefined,
        attrListener: undefined,
        cow: false,
        listeners: [],
    }));
}

/**
 * An implementation of the `EventTarget` interface.
 * @see https://dom.spec.whatwg.org/#eventtarget
 */
class EventTarget {
    /**
     * Initialize this instance.
     */
    constructor() {
        internalDataMap$2.set(this, createListenerListMap());
    }
    // Implementation
    addEventListener(type0, callback0, options0) {
        const listenerMap = $$2(this);
        const { callback, capture, once, passive, signal, type, } = normalizeAddOptions(type0, callback0, options0);
        if (callback == null || (signal === null || signal === void 0 ? void 0 : signal.aborted)) {
            return;
        }
        const list = ensureListenerList(listenerMap, type);
        // Find existing listener.
        const i = findIndexOfListener(list, callback, capture);
        if (i !== -1) {
            warnDuplicate(list.listeners[i], passive, once, signal);
            return;
        }
        // Add the new listener.
        addListener(list, callback, capture, passive, once, signal);
    }
    // Implementation
    removeEventListener(type0, callback0, options0) {
        const listenerMap = $$2(this);
        const { callback, capture, type } = normalizeOptions(type0, callback0, options0);
        const list = listenerMap[type];
        if (callback != null && list) {
            removeListener(list, callback, capture);
        }
    }
    // Implementation
    dispatchEvent(e) {
        const list = $$2(this)[String(e.type)];
        if (list == null) {
            return true;
        }
        const event = e instanceof Event$1 ? e : EventWrapper.wrap(e);
        const eventData = $(event, "event");
        if (eventData.dispatchFlag) {
            throw createInvalidStateError("This event has been in dispatching.");
        }
        eventData.dispatchFlag = true;
        eventData.target = eventData.currentTarget = this;
        if (!eventData.stopPropagationFlag) {
            const { cow, listeners } = list;
            // Set copy-on-write flag.
            list.cow = true;
            // Call listeners.
            for (let i = 0; i < listeners.length; ++i) {
                const listener = listeners[i];
                // Skip if removed.
                if (isRemoved(listener)) {
                    continue;
                }
                // Remove this listener if has the `once` flag.
                if (isOnce(listener) && removeListenerAt(list, i, !cow)) {
                    // Because this listener was removed, the next index is the
                    // same as the current value.
                    i -= 1;
                }
                // Call this listener with the `passive` flag.
                eventData.inPassiveListenerFlag = isPassive(listener);
                invokeCallback(listener, this, event);
                eventData.inPassiveListenerFlag = false;
                // Stop if the `event.stopImmediatePropagation()` method was called.
                if (eventData.stopImmediatePropagationFlag) {
                    break;
                }
            }
            // Restore copy-on-write flag.
            if (!cow) {
                list.cow = false;
            }
        }
        eventData.target = null;
        eventData.currentTarget = null;
        eventData.stopImmediatePropagationFlag = false;
        eventData.stopPropagationFlag = false;
        eventData.dispatchFlag = false;
        return !eventData.canceledFlag;
    }
}
/**
 * Internal data.
 */
const internalDataMap$2 = new WeakMap();
/**
 * Get private data.
 * @param target The event target object to get private data.
 * @param name The variable name to report.
 * @returns The private data of the event.
 */
function $$2(target, name = "this") {
    const retv = internalDataMap$2.get(target);
    assertType(retv != null, "'%s' must be an object that EventTarget constructor created, but got another one: %o", name, target);
    return retv;
}
/**
 * Normalize options.
 * @param options The options to normalize.
 */
function normalizeAddOptions(type, callback, options) {
    var _a;
    assertCallback(callback);
    if (typeof options === "object" && options !== null) {
        return {
            type: String(type),
            callback: callback !== null && callback !== void 0 ? callback : undefined,
            capture: Boolean(options.capture),
            passive: Boolean(options.passive),
            once: Boolean(options.once),
            signal: (_a = options.signal) !== null && _a !== void 0 ? _a : undefined,
        };
    }
    return {
        type: String(type),
        callback: callback !== null && callback !== void 0 ? callback : undefined,
        capture: Boolean(options),
        passive: false,
        once: false,
        signal: undefined,
    };
}
/**
 * Normalize options.
 * @param options The options to normalize.
 */
function normalizeOptions(type, callback, options) {
    assertCallback(callback);
    if (typeof options === "object" && options !== null) {
        return {
            type: String(type),
            callback: callback !== null && callback !== void 0 ? callback : undefined,
            capture: Boolean(options.capture),
        };
    }
    return {
        type: String(type),
        callback: callback !== null && callback !== void 0 ? callback : undefined,
        capture: Boolean(options),
    };
}
/**
 * Assert the type of 'callback' argument.
 * @param callback The callback to check.
 */
function assertCallback(callback) {
    if (typeof callback === "function" ||
        (typeof callback === "object" &&
            callback !== null &&
            typeof callback.handleEvent === "function")) {
        return;
    }
    if (callback == null || typeof callback === "object") {
        InvalidEventListener.warn(callback);
        return;
    }
    throw new TypeError(format(InvalidEventListener.message, [callback]));
}
/**
 * Print warning for duplicated.
 * @param listener The current listener that is duplicated.
 * @param passive The passive flag of the new duplicated listener.
 * @param once The once flag of the new duplicated listener.
 * @param signal The signal object of the new duplicated listener.
 */
function warnDuplicate(listener, passive, once, signal) {
    EventListenerWasDuplicated.warn(isCapture(listener) ? "capture" : "bubble", listener.callback);
    if (isPassive(listener) !== passive) {
        OptionWasIgnored.warn("passive");
    }
    if (isOnce(listener) !== once) {
        OptionWasIgnored.warn("once");
    }
    if (listener.signal !== signal) {
        OptionWasIgnored.warn("signal");
    }
}
// Set enumerable
const keys$1 = Object.getOwnPropertyNames(EventTarget.prototype);
for (let i = 0; i < keys$1.length; ++i) {
    if (keys$1[i] === "constructor") {
        continue;
    }
    Object.defineProperty(EventTarget.prototype, keys$1[i], { enumerable: true });
}
// Ensure `eventTarget instanceof window.EventTarget` is `true`.
if (typeof Global !== "undefined" &&
    typeof Global.EventTarget !== "undefined") {
    Object.setPrototypeOf(EventTarget.prototype, Global.EventTarget.prototype);
}

/*#__PURE__*/(function (_EventTarget) {
  _inherits(AbortSignal, _EventTarget);

  var _super2 = _createSuper(AbortSignal);

  function AbortSignal() {
    var _this2;

    _classCallCheck(this, AbortSignal);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "aborted", false);

    return _this2;
  }

  return _createClass(AbortSignal);
})(EventTarget);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/**
 * cancelAnimationFrame polyfill
 * @category Bom
 */

(function () {
  return root.cancelAnimationFrame || root.webkitCancelAnimationFrame || root.mozCancelAnimationFrame || root.oCancelAnimationFrame || root.msCancelAnimationFrame || function (handle) {
    clearTimeout(handle);
  };
})();

isNative(RAF);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
freeGlobal$1 || freeSelf$1 || Function('return this')();

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
freeGlobal || freeSelf || Function('return this')();

var lodash_clonedeep = {exports: {}};

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

(function (module, exports) {
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `map.set` because it's not chainable in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  // Don't return `set.add` because it's not chainable in IE 11.
	  set.add(value);
	  return set;
	}

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    Symbol = root.Symbol,
	    Uint8Array = root.Uint8Array,
	    getPrototype = overArg(Object.getPrototypeOf, Object),
	    objectCreate = Object.create,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols,
	    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
	    nativeKeys = overArg(Object.keys, Object);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView'),
	    Map = getNative(root, 'Map'),
	    Promise = getNative(root, 'Promise'),
	    Set = getNative(root, 'Set'),
	    WeakMap = getNative(root, 'WeakMap'),
	    nativeCreate = getNative(Object, 'create');

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache) {
	    var pairs = cache.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      return this;
	    }
	    cache = this.__data__ = new MapCache(pairs);
	  }
	  cache.set(key, value);
	  return this;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {boolean} [isFull] Specify a clone including symbols.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (!isArr) {
	    var props = isFull ? getAllKeys(value) : keys(value);
	  }
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return result;
	}

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var result = new buffer.constructor(buffer.length);
	  buffer.copy(result);
	  return result;
	}

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor);
	}

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor);
	}

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}

	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge < 14, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, true, true);
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = cloneDeep;
} (lodash_clonedeep, lodash_clonedeep.exports));

var defaultId = Symbol('pref_default_id');
/**
 * 记录程序运行时间
 */

var Pref = /*#__PURE__*/_createClass(function Pref() {
  var _this = this;

  _classCallCheck(this, Pref);

  _defineProperty(this, "recorder", new Map());

  _defineProperty(this, "start", function () {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultId;

    _this.recorder.set(id, {
      start: Date.now()
    });
  });

  _defineProperty(this, "stop", function () {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultId;

    if (!_this.recorder.get(id)) {
      throw new Error('id does not exist, start must be executed first.');
    }

    var end = Date.now();

    var item = _this.recorder.get(id);

    _this.recorder.set(id, _objectSpread2(_objectSpread2({}, item), {}, {
      end: end
    }));
  });

  _defineProperty(this, "remove", function () {
    for (var _len = arguments.length, ids = new Array(_len), _key = 0; _key < _len; _key++) {
      ids[_key] = arguments[_key];
    }

    if (!ids.length) {
      ids.push(defaultId);
    }

    for (var _i = 0, _ids = ids; _i < _ids.length; _i++) {
      var id = _ids[_i];

      _this.recorder.delete(id);
    }
  });

  _defineProperty(this, "clear", function () {
    var _iterator = _createForOfIteratorHelper(_this.recorder),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            record = _step$value[1];

        if (record.end) {
          _this.recorder.delete(key);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });

  _defineProperty(this, "flush", function () {
    _this.recorder.clear();
  });

  _defineProperty(this, "recordPromise", function (promise) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultId;

    _this.start(id);

    var stop = function stop() {
      return _this.stop(id);
    };

    promise.then(stop, stop);
  });
});

new Pref();

var decimal = {exports: {}};

(function (module) {
(function (globalScope) {


	  /*
	   *  decimal.js v10.3.1
	   *  An arbitrary-precision Decimal type for JavaScript.
	   *  https://github.com/MikeMcl/decimal.js
	   *  Copyright (c) 2021 Michael Mclaughlin <M8ch88l@gmail.com>
	   *  MIT Licence
	   */


	  // -----------------------------------  EDITABLE DEFAULTS  ------------------------------------ //


	    // The maximum exponent magnitude.
	    // The limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.
	  var EXP_LIMIT = 9e15,                      // 0 to 9e15

	    // The limit on the value of `precision`, and on the value of the first argument to
	    // `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
	    MAX_DIGITS = 1e9,                        // 0 to 1e9

	    // Base conversion alphabet.
	    NUMERALS = '0123456789abcdef',

	    // The natural logarithm of 10 (1025 digits).
	    LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',

	    // Pi (1025 digits).
	    PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',


	    // The initial configuration properties of the Decimal constructor.
	    DEFAULTS = {

	      // These values must be integers within the stated ranges (inclusive).
	      // Most of these values can be changed at run-time using the `Decimal.config` method.

	      // The maximum number of significant digits of the result of a calculation or base conversion.
	      // E.g. `Decimal.config({ precision: 20 });`
	      precision: 20,                         // 1 to MAX_DIGITS

	      // The rounding mode used when rounding to `precision`.
	      //
	      // ROUND_UP         0 Away from zero.
	      // ROUND_DOWN       1 Towards zero.
	      // ROUND_CEIL       2 Towards +Infinity.
	      // ROUND_FLOOR      3 Towards -Infinity.
	      // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
	      // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	      // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	      // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	      // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	      //
	      // E.g.
	      // `Decimal.rounding = 4;`
	      // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
	      rounding: 4,                           // 0 to 8

	      // The modulo mode used when calculating the modulus: a mod n.
	      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
	      // The remainder (r) is calculated as: r = a - n * q.
	      //
	      // UP         0 The remainder is positive if the dividend is negative, else is negative.
	      // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
	      // FLOOR      3 The remainder has the same sign as the divisor (Python %).
	      // HALF_EVEN  6 The IEEE 754 remainder function.
	      // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
	      //
	      // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
	      // division (9) are commonly used for the modulus operation. The other rounding modes can also
	      // be used, but they may not give useful results.
	      modulo: 1,                             // 0 to 9

	      // The exponent value at and beneath which `toString` returns exponential notation.
	      // JavaScript numbers: -7
	      toExpNeg: -7,                          // 0 to -EXP_LIMIT

	      // The exponent value at and above which `toString` returns exponential notation.
	      // JavaScript numbers: 21
	      toExpPos:  21,                         // 0 to EXP_LIMIT

	      // The minimum exponent value, beneath which underflow to zero occurs.
	      // JavaScript numbers: -324  (5e-324)
	      minE: -EXP_LIMIT,                      // -1 to -EXP_LIMIT

	      // The maximum exponent value, above which overflow to Infinity occurs.
	      // JavaScript numbers: 308  (1.7976931348623157e+308)
	      maxE: EXP_LIMIT,                       // 1 to EXP_LIMIT

	      // Whether to use cryptographically-secure random number generation, if available.
	      crypto: false                          // true/false
	    },


	  // ----------------------------------- END OF EDITABLE DEFAULTS ------------------------------- //


	    Decimal, inexact, noConflict, quadrant,
	    external = true,

	    decimalError = '[DecimalError] ',
	    invalidArgument = decimalError + 'Invalid argument: ',
	    precisionLimitExceeded = decimalError + 'Precision limit exceeded',
	    cryptoUnavailable = decimalError + 'crypto unavailable',
	    tag = '[object Decimal]',

	    mathfloor = Math.floor,
	    mathpow = Math.pow,

	    isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
	    isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
	    isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
	    isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,

	    BASE = 1e7,
	    LOG_BASE = 7,
	    MAX_SAFE_INTEGER = 9007199254740991,

	    LN10_PRECISION = LN10.length - 1,
	    PI_PRECISION = PI.length - 1,

	    // Decimal.prototype object
	    P = { toStringTag: tag };


	  // Decimal prototype methods


	  /*
	   *  absoluteValue             abs
	   *  ceil
	   *  clampedTo                 clamp
	   *  comparedTo                cmp
	   *  cosine                    cos
	   *  cubeRoot                  cbrt
	   *  decimalPlaces             dp
	   *  dividedBy                 div
	   *  dividedToIntegerBy        divToInt
	   *  equals                    eq
	   *  floor
	   *  greaterThan               gt
	   *  greaterThanOrEqualTo      gte
	   *  hyperbolicCosine          cosh
	   *  hyperbolicSine            sinh
	   *  hyperbolicTangent         tanh
	   *  inverseCosine             acos
	   *  inverseHyperbolicCosine   acosh
	   *  inverseHyperbolicSine     asinh
	   *  inverseHyperbolicTangent  atanh
	   *  inverseSine               asin
	   *  inverseTangent            atan
	   *  isFinite
	   *  isInteger                 isInt
	   *  isNaN
	   *  isNegative                isNeg
	   *  isPositive                isPos
	   *  isZero
	   *  lessThan                  lt
	   *  lessThanOrEqualTo         lte
	   *  logarithm                 log
	   *  [maximum]                 [max]
	   *  [minimum]                 [min]
	   *  minus                     sub
	   *  modulo                    mod
	   *  naturalExponential        exp
	   *  naturalLogarithm          ln
	   *  negated                   neg
	   *  plus                      add
	   *  precision                 sd
	   *  round
	   *  sine                      sin
	   *  squareRoot                sqrt
	   *  tangent                   tan
	   *  times                     mul
	   *  toBinary
	   *  toDecimalPlaces           toDP
	   *  toExponential
	   *  toFixed
	   *  toFraction
	   *  toHexadecimal             toHex
	   *  toNearest
	   *  toNumber
	   *  toOctal
	   *  toPower                   pow
	   *  toPrecision
	   *  toSignificantDigits       toSD
	   *  toString
	   *  truncated                 trunc
	   *  valueOf                   toJSON
	   */


	  /*
	   * Return a new Decimal whose value is the absolute value of this Decimal.
	   *
	   */
	  P.absoluteValue = P.abs = function () {
	    var x = new this.constructor(this);
	    if (x.s < 0) x.s = 1;
	    return finalise(x);
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
	   * direction of positive Infinity.
	   *
	   */
	  P.ceil = function () {
	    return finalise(new this.constructor(this), this.e + 1, 2);
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal clamped to the range
	   * delineated by `min` and `max`.
	   *
	   * min {number|string|Decimal}
	   * max {number|string|Decimal}
	   *
	   */
	  P.clampedTo = P.clamp = function (min, max) {
	    var k,
	      x = this,
	      Ctor = x.constructor;
	    min = new Ctor(min);
	    max = new Ctor(max);
	    if (!min.s || !max.s) return new Ctor(NaN);
	    if (min.gt(max)) throw Error(invalidArgument + max);
	    k = x.cmp(min);
	    return k < 0 ? min : x.cmp(max) > 0 ? max : new Ctor(x);
	  };


	  /*
	   * Return
	   *   1    if the value of this Decimal is greater than the value of `y`,
	   *  -1    if the value of this Decimal is less than the value of `y`,
	   *   0    if they have the same value,
	   *   NaN  if the value of either Decimal is NaN.
	   *
	   */
	  P.comparedTo = P.cmp = function (y) {
	    var i, j, xdL, ydL,
	      x = this,
	      xd = x.d,
	      yd = (y = new x.constructor(y)).d,
	      xs = x.s,
	      ys = y.s;

	    // Either NaN or ±Infinity?
	    if (!xd || !yd) {
	      return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
	    }

	    // Either zero?
	    if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;

	    // Signs differ?
	    if (xs !== ys) return xs;

	    // Compare exponents.
	    if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;

	    xdL = xd.length;
	    ydL = yd.length;

	    // Compare digit by digit.
	    for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
	      if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
	    }

	    // Compare lengths.
	    return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
	  };


	  /*
	   * Return a new Decimal whose value is the cosine of the value in radians of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-1, 1]
	   *
	   * cos(0)         = 1
	   * cos(-0)        = 1
	   * cos(Infinity)  = NaN
	   * cos(-Infinity) = NaN
	   * cos(NaN)       = NaN
	   *
	   */
	  P.cosine = P.cos = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.d) return new Ctor(NaN);

	    // cos(0) = cos(-0) = 1
	    if (!x.d[0]) return new Ctor(1);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
	    Ctor.rounding = 1;

	    x = cosine(Ctor, toLessThanHalfPi(Ctor, x));

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
	  };


	  /*
	   *
	   * Return a new Decimal whose value is the cube root of the value of this Decimal, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   *  cbrt(0)  =  0
	   *  cbrt(-0) = -0
	   *  cbrt(1)  =  1
	   *  cbrt(-1) = -1
	   *  cbrt(N)  =  N
	   *  cbrt(-I) = -I
	   *  cbrt(I)  =  I
	   *
	   * Math.cbrt(x) = (x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3))
	   *
	   */
	  P.cubeRoot = P.cbrt = function () {
	    var e, m, n, r, rep, s, sd, t, t3, t3plusx,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite() || x.isZero()) return new Ctor(x);
	    external = false;

	    // Initial estimate.
	    s = x.s * mathpow(x.s * x, 1 / 3);

	     // Math.cbrt underflow/overflow?
	     // Pass x to Math.pow as integer, then adjust the exponent of the result.
	    if (!s || Math.abs(s) == 1 / 0) {
	      n = digitsToString(x.d);
	      e = x.e;

	      // Adjust n exponent so it is a multiple of 3 away from x exponent.
	      if (s = (e - n.length + 1) % 3) n += (s == 1 || s == -2 ? '0' : '00');
	      s = mathpow(n, 1 / 3);

	      // Rarely, e may be one less than the result exponent value.
	      e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));

	      if (s == 1 / 0) {
	        n = '5e' + e;
	      } else {
	        n = s.toExponential();
	        n = n.slice(0, n.indexOf('e') + 1) + e;
	      }

	      r = new Ctor(n);
	      r.s = x.s;
	    } else {
	      r = new Ctor(s.toString());
	    }

	    sd = (e = Ctor.precision) + 3;

	    // Halley's method.
	    // TODO? Compare Newton's method.
	    for (;;) {
	      t = r;
	      t3 = t.times(t).times(t);
	      t3plusx = t3.plus(x);
	      r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);

	      // TODO? Replace with for-loop and checkRoundingDigits.
	      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
	        n = n.slice(sd - 3, sd + 1);

	        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
	        // , i.e. approaching a rounding boundary, continue the iteration.
	        if (n == '9999' || !rep && n == '4999') {

	          // On the first iteration only, check to see if rounding up gives the exact result as the
	          // nines may infinitely repeat.
	          if (!rep) {
	            finalise(t, e + 1, 0);

	            if (t.times(t).times(t).eq(x)) {
	              r = t;
	              break;
	            }
	          }

	          sd += 4;
	          rep = 1;
	        } else {

	          // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
	          // If not, then there are further digits and m will be truthy.
	          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

	            // Truncate to the first rounding digit.
	            finalise(r, e + 1, 1);
	            m = !r.times(r).times(r).eq(x);
	          }

	          break;
	        }
	      }
	    }

	    external = true;

	    return finalise(r, e, Ctor.rounding, m);
	  };


	  /*
	   * Return the number of decimal places of the value of this Decimal.
	   *
	   */
	  P.decimalPlaces = P.dp = function () {
	    var w,
	      d = this.d,
	      n = NaN;

	    if (d) {
	      w = d.length - 1;
	      n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;

	      // Subtract the number of trailing zeros of the last word.
	      w = d[w];
	      if (w) for (; w % 10 == 0; w /= 10) n--;
	      if (n < 0) n = 0;
	    }

	    return n;
	  };


	  /*
	   *  n / 0 = I
	   *  n / N = N
	   *  n / I = 0
	   *  0 / n = 0
	   *  0 / 0 = N
	   *  0 / N = N
	   *  0 / I = 0
	   *  N / n = N
	   *  N / 0 = N
	   *  N / N = N
	   *  N / I = N
	   *  I / n = I
	   *  I / 0 = I
	   *  I / N = N
	   *  I / I = N
	   *
	   * Return a new Decimal whose value is the value of this Decimal divided by `y`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   */
	  P.dividedBy = P.div = function (y) {
	    return divide(this, new this.constructor(y));
	  };


	  /*
	   * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
	   * by the value of `y`, rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   */
	  P.dividedToIntegerBy = P.divToInt = function (y) {
	    var x = this,
	      Ctor = x.constructor;
	    return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
	  };


	  /*
	   * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
	   *
	   */
	  P.equals = P.eq = function (y) {
	    return this.cmp(y) === 0;
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
	   * direction of negative Infinity.
	   *
	   */
	  P.floor = function () {
	    return finalise(new this.constructor(this), this.e + 1, 3);
	  };


	  /*
	   * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
	   * false.
	   *
	   */
	  P.greaterThan = P.gt = function (y) {
	    return this.cmp(y) > 0;
	  };


	  /*
	   * Return true if the value of this Decimal is greater than or equal to the value of `y`,
	   * otherwise return false.
	   *
	   */
	  P.greaterThanOrEqualTo = P.gte = function (y) {
	    var k = this.cmp(y);
	    return k == 1 || k === 0;
	  };


	  /*
	   * Return a new Decimal whose value is the hyperbolic cosine of the value in radians of this
	   * Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [1, Infinity]
	   *
	   * cosh(x) = 1 + x^2/2! + x^4/4! + x^6/6! + ...
	   *
	   * cosh(0)         = 1
	   * cosh(-0)        = 1
	   * cosh(Infinity)  = Infinity
	   * cosh(-Infinity) = Infinity
	   * cosh(NaN)       = NaN
	   *
	   *  x        time taken (ms)   result
	   * 1000      9                 9.8503555700852349694e+433
	   * 10000     25                4.4034091128314607936e+4342
	   * 100000    171               1.4033316802130615897e+43429
	   * 1000000   3817              1.5166076984010437725e+434294
	   * 10000000  abandoned after 2 minute wait
	   *
	   * TODO? Compare performance of cosh(x) = 0.5 * (exp(x) + exp(-x))
	   *
	   */
	  P.hyperbolicCosine = P.cosh = function () {
	    var k, n, pr, rm, len,
	      x = this,
	      Ctor = x.constructor,
	      one = new Ctor(1);

	    if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
	    if (x.isZero()) return one;

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
	    Ctor.rounding = 1;
	    len = x.d.length;

	    // Argument reduction: cos(4x) = 1 - 8cos^2(x) + 8cos^4(x) + 1
	    // i.e. cos(x) = 1 - cos^2(x/4)(8 - 8cos^2(x/4))

	    // Estimate the optimum number of times to use the argument reduction.
	    // TODO? Estimation reused from cosine() and may not be optimal here.
	    if (len < 32) {
	      k = Math.ceil(len / 3);
	      n = (1 / tinyPow(4, k)).toString();
	    } else {
	      k = 16;
	      n = '2.3283064365386962890625e-10';
	    }

	    x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);

	    // Reverse argument reduction
	    var cosh2_x,
	      i = k,
	      d8 = new Ctor(8);
	    for (; i--;) {
	      cosh2_x = x.times(x);
	      x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
	    }

	    return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
	  };


	  /*
	   * Return a new Decimal whose value is the hyperbolic sine of the value in radians of this
	   * Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-Infinity, Infinity]
	   *
	   * sinh(x) = x + x^3/3! + x^5/5! + x^7/7! + ...
	   *
	   * sinh(0)         = 0
	   * sinh(-0)        = -0
	   * sinh(Infinity)  = Infinity
	   * sinh(-Infinity) = -Infinity
	   * sinh(NaN)       = NaN
	   *
	   * x        time taken (ms)
	   * 10       2 ms
	   * 100      5 ms
	   * 1000     14 ms
	   * 10000    82 ms
	   * 100000   886 ms            1.4033316802130615897e+43429
	   * 200000   2613 ms
	   * 300000   5407 ms
	   * 400000   8824 ms
	   * 500000   13026 ms          8.7080643612718084129e+217146
	   * 1000000  48543 ms
	   *
	   * TODO? Compare performance of sinh(x) = 0.5 * (exp(x) - exp(-x))
	   *
	   */
	  P.hyperbolicSine = P.sinh = function () {
	    var k, pr, rm, len,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite() || x.isZero()) return new Ctor(x);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
	    Ctor.rounding = 1;
	    len = x.d.length;

	    if (len < 3) {
	      x = taylorSeries(Ctor, 2, x, x, true);
	    } else {

	      // Alternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
	      // i.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
	      // 3 multiplications and 1 addition

	      // Argument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
	      // i.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
	      // 4 multiplications and 2 additions

	      // Estimate the optimum number of times to use the argument reduction.
	      k = 1.4 * Math.sqrt(len);
	      k = k > 16 ? 16 : k | 0;

	      x = x.times(1 / tinyPow(5, k));
	      x = taylorSeries(Ctor, 2, x, x, true);

	      // Reverse argument reduction
	      var sinh2_x,
	        d5 = new Ctor(5),
	        d16 = new Ctor(16),
	        d20 = new Ctor(20);
	      for (; k--;) {
	        sinh2_x = x.times(x);
	        x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
	      }
	    }

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return finalise(x, pr, rm, true);
	  };


	  /*
	   * Return a new Decimal whose value is the hyperbolic tangent of the value in radians of this
	   * Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-1, 1]
	   *
	   * tanh(x) = sinh(x) / cosh(x)
	   *
	   * tanh(0)         = 0
	   * tanh(-0)        = -0
	   * tanh(Infinity)  = 1
	   * tanh(-Infinity) = -1
	   * tanh(NaN)       = NaN
	   *
	   */
	  P.hyperbolicTangent = P.tanh = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite()) return new Ctor(x.s);
	    if (x.isZero()) return new Ctor(x);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + 7;
	    Ctor.rounding = 1;

	    return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
	  };


	  /*
	   * Return a new Decimal whose value is the arccosine (inverse cosine) in radians of the value of
	   * this Decimal.
	   *
	   * Domain: [-1, 1]
	   * Range: [0, pi]
	   *
	   * acos(x) = pi/2 - asin(x)
	   *
	   * acos(0)       = pi/2
	   * acos(-0)      = pi/2
	   * acos(1)       = 0
	   * acos(-1)      = pi
	   * acos(1/2)     = pi/3
	   * acos(-1/2)    = 2*pi/3
	   * acos(|x| > 1) = NaN
	   * acos(NaN)     = NaN
	   *
	   */
	  P.inverseCosine = P.acos = function () {
	    var halfPi,
	      x = this,
	      Ctor = x.constructor,
	      k = x.abs().cmp(1),
	      pr = Ctor.precision,
	      rm = Ctor.rounding;

	    if (k !== -1) {
	      return k === 0
	        // |x| is 1
	        ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0)
	        // |x| > 1 or x is NaN
	        : new Ctor(NaN);
	    }

	    if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);

	    // TODO? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3

	    Ctor.precision = pr + 6;
	    Ctor.rounding = 1;

	    x = x.asin();
	    halfPi = getPi(Ctor, pr + 4, rm).times(0.5);

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return halfPi.minus(x);
	  };


	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic cosine in radians of the
	   * value of this Decimal.
	   *
	   * Domain: [1, Infinity]
	   * Range: [0, Infinity]
	   *
	   * acosh(x) = ln(x + sqrt(x^2 - 1))
	   *
	   * acosh(x < 1)     = NaN
	   * acosh(NaN)       = NaN
	   * acosh(Infinity)  = Infinity
	   * acosh(-Infinity) = NaN
	   * acosh(0)         = NaN
	   * acosh(-0)        = NaN
	   * acosh(1)         = 0
	   * acosh(-1)        = NaN
	   *
	   */
	  P.inverseHyperbolicCosine = P.acosh = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
	    if (!x.isFinite()) return new Ctor(x);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
	    Ctor.rounding = 1;
	    external = false;

	    x = x.times(x).minus(1).sqrt().plus(x);

	    external = true;
	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return x.ln();
	  };


	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic sine in radians of the value
	   * of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-Infinity, Infinity]
	   *
	   * asinh(x) = ln(x + sqrt(x^2 + 1))
	   *
	   * asinh(NaN)       = NaN
	   * asinh(Infinity)  = Infinity
	   * asinh(-Infinity) = -Infinity
	   * asinh(0)         = 0
	   * asinh(-0)        = -0
	   *
	   */
	  P.inverseHyperbolicSine = P.asinh = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite() || x.isZero()) return new Ctor(x);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
	    Ctor.rounding = 1;
	    external = false;

	    x = x.times(x).plus(1).sqrt().plus(x);

	    external = true;
	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return x.ln();
	  };


	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic tangent in radians of the
	   * value of this Decimal.
	   *
	   * Domain: [-1, 1]
	   * Range: [-Infinity, Infinity]
	   *
	   * atanh(x) = 0.5 * ln((1 + x) / (1 - x))
	   *
	   * atanh(|x| > 1)   = NaN
	   * atanh(NaN)       = NaN
	   * atanh(Infinity)  = NaN
	   * atanh(-Infinity) = NaN
	   * atanh(0)         = 0
	   * atanh(-0)        = -0
	   * atanh(1)         = Infinity
	   * atanh(-1)        = -Infinity
	   *
	   */
	  P.inverseHyperbolicTangent = P.atanh = function () {
	    var pr, rm, wpr, xsd,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite()) return new Ctor(NaN);
	    if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    xsd = x.sd();

	    if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);

	    Ctor.precision = wpr = xsd - x.e;

	    x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);

	    Ctor.precision = pr + 4;
	    Ctor.rounding = 1;

	    x = x.ln();

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return x.times(0.5);
	  };


	  /*
	   * Return a new Decimal whose value is the arcsine (inverse sine) in radians of the value of this
	   * Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-pi/2, pi/2]
	   *
	   * asin(x) = 2*atan(x/(1 + sqrt(1 - x^2)))
	   *
	   * asin(0)       = 0
	   * asin(-0)      = -0
	   * asin(1/2)     = pi/6
	   * asin(-1/2)    = -pi/6
	   * asin(1)       = pi/2
	   * asin(-1)      = -pi/2
	   * asin(|x| > 1) = NaN
	   * asin(NaN)     = NaN
	   *
	   * TODO? Compare performance of Taylor series.
	   *
	   */
	  P.inverseSine = P.asin = function () {
	    var halfPi, k,
	      pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (x.isZero()) return new Ctor(x);

	    k = x.abs().cmp(1);
	    pr = Ctor.precision;
	    rm = Ctor.rounding;

	    if (k !== -1) {

	      // |x| is 1
	      if (k === 0) {
	        halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
	        halfPi.s = x.s;
	        return halfPi;
	      }

	      // |x| > 1 or x is NaN
	      return new Ctor(NaN);
	    }

	    // TODO? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6

	    Ctor.precision = pr + 6;
	    Ctor.rounding = 1;

	    x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return x.times(2);
	  };


	  /*
	   * Return a new Decimal whose value is the arctangent (inverse tangent) in radians of the value
	   * of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-pi/2, pi/2]
	   *
	   * atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
	   *
	   * atan(0)         = 0
	   * atan(-0)        = -0
	   * atan(1)         = pi/4
	   * atan(-1)        = -pi/4
	   * atan(Infinity)  = pi/2
	   * atan(-Infinity) = -pi/2
	   * atan(NaN)       = NaN
	   *
	   */
	  P.inverseTangent = P.atan = function () {
	    var i, j, k, n, px, t, r, wpr, x2,
	      x = this,
	      Ctor = x.constructor,
	      pr = Ctor.precision,
	      rm = Ctor.rounding;

	    if (!x.isFinite()) {
	      if (!x.s) return new Ctor(NaN);
	      if (pr + 4 <= PI_PRECISION) {
	        r = getPi(Ctor, pr + 4, rm).times(0.5);
	        r.s = x.s;
	        return r;
	      }
	    } else if (x.isZero()) {
	      return new Ctor(x);
	    } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
	      r = getPi(Ctor, pr + 4, rm).times(0.25);
	      r.s = x.s;
	      return r;
	    }

	    Ctor.precision = wpr = pr + 10;
	    Ctor.rounding = 1;

	    // TODO? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);

	    // Argument reduction
	    // Ensure |x| < 0.42
	    // atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))

	    k = Math.min(28, wpr / LOG_BASE + 2 | 0);

	    for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));

	    external = false;

	    j = Math.ceil(wpr / LOG_BASE);
	    n = 1;
	    x2 = x.times(x);
	    r = new Ctor(x);
	    px = x;

	    // atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
	    for (; i !== -1;) {
	      px = px.times(x2);
	      t = r.minus(px.div(n += 2));

	      px = px.times(x2);
	      r = t.plus(px.div(n += 2));

	      if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--;);
	    }

	    if (k) r = r.times(2 << (k - 1));

	    external = true;

	    return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
	  };


	  /*
	   * Return true if the value of this Decimal is a finite number, otherwise return false.
	   *
	   */
	  P.isFinite = function () {
	    return !!this.d;
	  };


	  /*
	   * Return true if the value of this Decimal is an integer, otherwise return false.
	   *
	   */
	  P.isInteger = P.isInt = function () {
	    return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
	  };


	  /*
	   * Return true if the value of this Decimal is NaN, otherwise return false.
	   *
	   */
	  P.isNaN = function () {
	    return !this.s;
	  };


	  /*
	   * Return true if the value of this Decimal is negative, otherwise return false.
	   *
	   */
	  P.isNegative = P.isNeg = function () {
	    return this.s < 0;
	  };


	  /*
	   * Return true if the value of this Decimal is positive, otherwise return false.
	   *
	   */
	  P.isPositive = P.isPos = function () {
	    return this.s > 0;
	  };


	  /*
	   * Return true if the value of this Decimal is 0 or -0, otherwise return false.
	   *
	   */
	  P.isZero = function () {
	    return !!this.d && this.d[0] === 0;
	  };


	  /*
	   * Return true if the value of this Decimal is less than `y`, otherwise return false.
	   *
	   */
	  P.lessThan = P.lt = function (y) {
	    return this.cmp(y) < 0;
	  };


	  /*
	   * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
	   *
	   */
	  P.lessThanOrEqualTo = P.lte = function (y) {
	    return this.cmp(y) < 1;
	  };


	  /*
	   * Return the logarithm of the value of this Decimal to the specified base, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * If no base is specified, return log[10](arg).
	   *
	   * log[base](arg) = ln(arg) / ln(base)
	   *
	   * The result will always be correctly rounded if the base of the log is 10, and 'almost always'
	   * otherwise:
	   *
	   * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
	   * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
	   * between the result and the correctly rounded result will be one ulp (unit in the last place).
	   *
	   * log[-b](a)       = NaN
	   * log[0](a)        = NaN
	   * log[1](a)        = NaN
	   * log[NaN](a)      = NaN
	   * log[Infinity](a) = NaN
	   * log[b](0)        = -Infinity
	   * log[b](-0)       = -Infinity
	   * log[b](-a)       = NaN
	   * log[b](1)        = 0
	   * log[b](Infinity) = Infinity
	   * log[b](NaN)      = NaN
	   *
	   * [base] {number|string|Decimal} The base of the logarithm.
	   *
	   */
	  P.logarithm = P.log = function (base) {
	    var isBase10, d, denominator, k, inf, num, sd, r,
	      arg = this,
	      Ctor = arg.constructor,
	      pr = Ctor.precision,
	      rm = Ctor.rounding,
	      guard = 5;

	    // Default base is 10.
	    if (base == null) {
	      base = new Ctor(10);
	      isBase10 = true;
	    } else {
	      base = new Ctor(base);
	      d = base.d;

	      // Return NaN if base is negative, or non-finite, or is 0 or 1.
	      if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);

	      isBase10 = base.eq(10);
	    }

	    d = arg.d;

	    // Is arg negative, non-finite, 0 or 1?
	    if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
	      return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
	    }

	    // The result will have a non-terminating decimal expansion if base is 10 and arg is not an
	    // integer power of 10.
	    if (isBase10) {
	      if (d.length > 1) {
	        inf = true;
	      } else {
	        for (k = d[0]; k % 10 === 0;) k /= 10;
	        inf = k !== 1;
	      }
	    }

	    external = false;
	    sd = pr + guard;
	    num = naturalLogarithm(arg, sd);
	    denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);

	    // The result will have 5 rounding digits.
	    r = divide(num, denominator, sd, 1);

	    // If at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
	    // calculate 10 further digits.
	    //
	    // If the result is known to have an infinite decimal expansion, repeat this until it is clear
	    // that the result is above or below the boundary. Otherwise, if after calculating the 10
	    // further digits, the last 14 are nines, round up and assume the result is exact.
	    // Also assume the result is exact if the last 14 are zero.
	    //
	    // Example of a result that will be incorrectly rounded:
	    // log[1048576](4503599627370502) = 2.60000000000000009610279511444746...
	    // The above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7, but it
	    // will be given as 2.6 as there are 15 zeros immediately after the requested decimal place, so
	    // the exact result would be assumed to be 2.6, which rounded using ROUND_CEIL to 1 decimal
	    // place is still 2.6.
	    if (checkRoundingDigits(r.d, k = pr, rm)) {

	      do {
	        sd += 10;
	        num = naturalLogarithm(arg, sd);
	        denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
	        r = divide(num, denominator, sd, 1);

	        if (!inf) {

	          // Check for 14 nines from the 2nd rounding digit, as the first may be 4.
	          if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
	            r = finalise(r, pr + 1, 0);
	          }

	          break;
	        }
	      } while (checkRoundingDigits(r.d, k += 10, rm));
	    }

	    external = true;

	    return finalise(r, pr, rm);
	  };


	  /*
	   * Return a new Decimal whose value is the maximum of the arguments and the value of this Decimal.
	   *
	   * arguments {number|string|Decimal}
	   *
	  P.max = function () {
	    Array.prototype.push.call(arguments, this);
	    return maxOrMin(this.constructor, arguments, 'lt');
	  };
	   */


	  /*
	   * Return a new Decimal whose value is the minimum of the arguments and the value of this Decimal.
	   *
	   * arguments {number|string|Decimal}
	   *
	  P.min = function () {
	    Array.prototype.push.call(arguments, this);
	    return maxOrMin(this.constructor, arguments, 'gt');
	  };
	   */


	  /*
	   *  n - 0 = n
	   *  n - N = N
	   *  n - I = -I
	   *  0 - n = -n
	   *  0 - 0 = 0
	   *  0 - N = N
	   *  0 - I = -I
	   *  N - n = N
	   *  N - 0 = N
	   *  N - N = N
	   *  N - I = N
	   *  I - n = I
	   *  I - 0 = I
	   *  I - N = N
	   *  I - I = N
	   *
	   * Return a new Decimal whose value is the value of this Decimal minus `y`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   */
	  P.minus = P.sub = function (y) {
	    var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd,
	      x = this,
	      Ctor = x.constructor;

	    y = new Ctor(y);

	    // If either is not finite...
	    if (!x.d || !y.d) {

	      // Return NaN if either is NaN.
	      if (!x.s || !y.s) y = new Ctor(NaN);

	      // Return y negated if x is finite and y is ±Infinity.
	      else if (x.d) y.s = -y.s;

	      // Return x if y is finite and x is ±Infinity.
	      // Return x if both are ±Infinity with different signs.
	      // Return NaN if both are ±Infinity with the same sign.
	      else y = new Ctor(y.d || x.s !== y.s ? x : NaN);

	      return y;
	    }

	    // If signs differ...
	    if (x.s != y.s) {
	      y.s = -y.s;
	      return x.plus(y);
	    }

	    xd = x.d;
	    yd = y.d;
	    pr = Ctor.precision;
	    rm = Ctor.rounding;

	    // If either is zero...
	    if (!xd[0] || !yd[0]) {

	      // Return y negated if x is zero and y is non-zero.
	      if (yd[0]) y.s = -y.s;

	      // Return x if y is zero and x is non-zero.
	      else if (xd[0]) y = new Ctor(x);

	      // Return zero if both are zero.
	      // From IEEE 754 (2008) 6.3: 0 - 0 = -0 - -0 = -0 when rounding to -Infinity.
	      else return new Ctor(rm === 3 ? -0 : 0);

	      return external ? finalise(y, pr, rm) : y;
	    }

	    // x and y are finite, non-zero numbers with the same sign.

	    // Calculate base 1e7 exponents.
	    e = mathfloor(y.e / LOG_BASE);
	    xe = mathfloor(x.e / LOG_BASE);

	    xd = xd.slice();
	    k = xe - e;

	    // If base 1e7 exponents differ...
	    if (k) {
	      xLTy = k < 0;

	      if (xLTy) {
	        d = xd;
	        k = -k;
	        len = yd.length;
	      } else {
	        d = yd;
	        e = xe;
	        len = xd.length;
	      }

	      // Numbers with massively different exponents would result in a very high number of
	      // zeros needing to be prepended, but this can be avoided while still ensuring correct
	      // rounding by limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
	      i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;

	      if (k > i) {
	        k = i;
	        d.length = 1;
	      }

	      // Prepend zeros to equalise exponents.
	      d.reverse();
	      for (i = k; i--;) d.push(0);
	      d.reverse();

	    // Base 1e7 exponents equal.
	    } else {

	      // Check digits to determine which is the bigger number.

	      i = xd.length;
	      len = yd.length;
	      xLTy = i < len;
	      if (xLTy) len = i;

	      for (i = 0; i < len; i++) {
	        if (xd[i] != yd[i]) {
	          xLTy = xd[i] < yd[i];
	          break;
	        }
	      }

	      k = 0;
	    }

	    if (xLTy) {
	      d = xd;
	      xd = yd;
	      yd = d;
	      y.s = -y.s;
	    }

	    len = xd.length;

	    // Append zeros to `xd` if shorter.
	    // Don't add zeros to `yd` if shorter as subtraction only needs to start at `yd` length.
	    for (i = yd.length - len; i > 0; --i) xd[len++] = 0;

	    // Subtract yd from xd.
	    for (i = yd.length; i > k;) {

	      if (xd[--i] < yd[i]) {
	        for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
	        --xd[j];
	        xd[i] += BASE;
	      }

	      xd[i] -= yd[i];
	    }

	    // Remove trailing zeros.
	    for (; xd[--len] === 0;) xd.pop();

	    // Remove leading zeros and adjust exponent accordingly.
	    for (; xd[0] === 0; xd.shift()) --e;

	    // Zero?
	    if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);

	    y.d = xd;
	    y.e = getBase10Exponent(xd, e);

	    return external ? finalise(y, pr, rm) : y;
	  };


	  /*
	   *   n % 0 =  N
	   *   n % N =  N
	   *   n % I =  n
	   *   0 % n =  0
	   *  -0 % n = -0
	   *   0 % 0 =  N
	   *   0 % N =  N
	   *   0 % I =  0
	   *   N % n =  N
	   *   N % 0 =  N
	   *   N % N =  N
	   *   N % I =  N
	   *   I % n =  N
	   *   I % 0 =  N
	   *   I % N =  N
	   *   I % I =  N
	   *
	   * Return a new Decimal whose value is the value of this Decimal modulo `y`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   * The result depends on the modulo mode.
	   *
	   */
	  P.modulo = P.mod = function (y) {
	    var q,
	      x = this,
	      Ctor = x.constructor;

	    y = new Ctor(y);

	    // Return NaN if x is ±Infinity or NaN, or y is NaN or ±0.
	    if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);

	    // Return x if y is ±Infinity or x is ±0.
	    if (!y.d || x.d && !x.d[0]) {
	      return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
	    }

	    // Prevent rounding of intermediate calculations.
	    external = false;

	    if (Ctor.modulo == 9) {

	      // Euclidian division: q = sign(y) * floor(x / abs(y))
	      // result = x - q * y    where  0 <= result < abs(y)
	      q = divide(x, y.abs(), 0, 3, 1);
	      q.s *= y.s;
	    } else {
	      q = divide(x, y, 0, Ctor.modulo, 1);
	    }

	    q = q.times(y);

	    external = true;

	    return x.minus(q);
	  };


	  /*
	   * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
	   * i.e. the base e raised to the power the value of this Decimal, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   */
	  P.naturalExponential = P.exp = function () {
	    return naturalExponential(this);
	  };


	  /*
	   * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
	   * rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   */
	  P.naturalLogarithm = P.ln = function () {
	    return naturalLogarithm(this);
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
	   * -1.
	   *
	   */
	  P.negated = P.neg = function () {
	    var x = new this.constructor(this);
	    x.s = -x.s;
	    return finalise(x);
	  };


	  /*
	   *  n + 0 = n
	   *  n + N = N
	   *  n + I = I
	   *  0 + n = n
	   *  0 + 0 = 0
	   *  0 + N = N
	   *  0 + I = I
	   *  N + n = N
	   *  N + 0 = N
	   *  N + N = N
	   *  N + I = N
	   *  I + n = I
	   *  I + 0 = I
	   *  I + N = N
	   *  I + I = I
	   *
	   * Return a new Decimal whose value is the value of this Decimal plus `y`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   */
	  P.plus = P.add = function (y) {
	    var carry, d, e, i, k, len, pr, rm, xd, yd,
	      x = this,
	      Ctor = x.constructor;

	    y = new Ctor(y);

	    // If either is not finite...
	    if (!x.d || !y.d) {

	      // Return NaN if either is NaN.
	      if (!x.s || !y.s) y = new Ctor(NaN);

	      // Return x if y is finite and x is ±Infinity.
	      // Return x if both are ±Infinity with the same sign.
	      // Return NaN if both are ±Infinity with different signs.
	      // Return y if x is finite and y is ±Infinity.
	      else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);

	      return y;
	    }

	     // If signs differ...
	    if (x.s != y.s) {
	      y.s = -y.s;
	      return x.minus(y);
	    }

	    xd = x.d;
	    yd = y.d;
	    pr = Ctor.precision;
	    rm = Ctor.rounding;

	    // If either is zero...
	    if (!xd[0] || !yd[0]) {

	      // Return x if y is zero.
	      // Return y if y is non-zero.
	      if (!yd[0]) y = new Ctor(x);

	      return external ? finalise(y, pr, rm) : y;
	    }

	    // x and y are finite, non-zero numbers with the same sign.

	    // Calculate base 1e7 exponents.
	    k = mathfloor(x.e / LOG_BASE);
	    e = mathfloor(y.e / LOG_BASE);

	    xd = xd.slice();
	    i = k - e;

	    // If base 1e7 exponents differ...
	    if (i) {

	      if (i < 0) {
	        d = xd;
	        i = -i;
	        len = yd.length;
	      } else {
	        d = yd;
	        e = k;
	        len = xd.length;
	      }

	      // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
	      k = Math.ceil(pr / LOG_BASE);
	      len = k > len ? k + 1 : len + 1;

	      if (i > len) {
	        i = len;
	        d.length = 1;
	      }

	      // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
	      d.reverse();
	      for (; i--;) d.push(0);
	      d.reverse();
	    }

	    len = xd.length;
	    i = yd.length;

	    // If yd is longer than xd, swap xd and yd so xd points to the longer array.
	    if (len - i < 0) {
	      i = len;
	      d = yd;
	      yd = xd;
	      xd = d;
	    }

	    // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
	    for (carry = 0; i;) {
	      carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
	      xd[i] %= BASE;
	    }

	    if (carry) {
	      xd.unshift(carry);
	      ++e;
	    }

	    // Remove trailing zeros.
	    // No need to check for zero, as +x + +y != 0 && -x + -y != 0
	    for (len = xd.length; xd[--len] == 0;) xd.pop();

	    y.d = xd;
	    y.e = getBase10Exponent(xd, e);

	    return external ? finalise(y, pr, rm) : y;
	  };


	  /*
	   * Return the number of significant digits of the value of this Decimal.
	   *
	   * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
	   *
	   */
	  P.precision = P.sd = function (z) {
	    var k,
	      x = this;

	    if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);

	    if (x.d) {
	      k = getPrecision(x.d);
	      if (z && x.e + 1 > k) k = x.e + 1;
	    } else {
	      k = NaN;
	    }

	    return k;
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
	   * rounding mode `rounding`.
	   *
	   */
	  P.round = function () {
	    var x = this,
	      Ctor = x.constructor;

	    return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
	  };


	  /*
	   * Return a new Decimal whose value is the sine of the value in radians of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-1, 1]
	   *
	   * sin(x) = x - x^3/3! + x^5/5! - ...
	   *
	   * sin(0)         = 0
	   * sin(-0)        = -0
	   * sin(Infinity)  = NaN
	   * sin(-Infinity) = NaN
	   * sin(NaN)       = NaN
	   *
	   */
	  P.sine = P.sin = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite()) return new Ctor(NaN);
	    if (x.isZero()) return new Ctor(x);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
	    Ctor.rounding = 1;

	    x = sine(Ctor, toLessThanHalfPi(Ctor, x));

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
	  };


	  /*
	   * Return a new Decimal whose value is the square root of this Decimal, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   *  sqrt(-n) =  N
	   *  sqrt(N)  =  N
	   *  sqrt(-I) =  N
	   *  sqrt(I)  =  I
	   *  sqrt(0)  =  0
	   *  sqrt(-0) = -0
	   *
	   */
	  P.squareRoot = P.sqrt = function () {
	    var m, n, sd, r, rep, t,
	      x = this,
	      d = x.d,
	      e = x.e,
	      s = x.s,
	      Ctor = x.constructor;

	    // Negative/NaN/Infinity/zero?
	    if (s !== 1 || !d || !d[0]) {
	      return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
	    }

	    external = false;

	    // Initial estimate.
	    s = Math.sqrt(+x);

	    // Math.sqrt underflow/overflow?
	    // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	    if (s == 0 || s == 1 / 0) {
	      n = digitsToString(d);

	      if ((n.length + e) % 2 == 0) n += '0';
	      s = Math.sqrt(n);
	      e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);

	      if (s == 1 / 0) {
	        n = '5e' + e;
	      } else {
	        n = s.toExponential();
	        n = n.slice(0, n.indexOf('e') + 1) + e;
	      }

	      r = new Ctor(n);
	    } else {
	      r = new Ctor(s.toString());
	    }

	    sd = (e = Ctor.precision) + 3;

	    // Newton-Raphson iteration.
	    for (;;) {
	      t = r;
	      r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);

	      // TODO? Replace with for-loop and checkRoundingDigits.
	      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
	        n = n.slice(sd - 3, sd + 1);

	        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
	        // 4999, i.e. approaching a rounding boundary, continue the iteration.
	        if (n == '9999' || !rep && n == '4999') {

	          // On the first iteration only, check to see if rounding up gives the exact result as the
	          // nines may infinitely repeat.
	          if (!rep) {
	            finalise(t, e + 1, 0);

	            if (t.times(t).eq(x)) {
	              r = t;
	              break;
	            }
	          }

	          sd += 4;
	          rep = 1;
	        } else {

	          // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
	          // If not, then there are further digits and m will be truthy.
	          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

	            // Truncate to the first rounding digit.
	            finalise(r, e + 1, 1);
	            m = !r.times(r).eq(x);
	          }

	          break;
	        }
	      }
	    }

	    external = true;

	    return finalise(r, e, Ctor.rounding, m);
	  };


	  /*
	   * Return a new Decimal whose value is the tangent of the value in radians of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-Infinity, Infinity]
	   *
	   * tan(0)         = 0
	   * tan(-0)        = -0
	   * tan(Infinity)  = NaN
	   * tan(-Infinity) = NaN
	   * tan(NaN)       = NaN
	   *
	   */
	  P.tangent = P.tan = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite()) return new Ctor(NaN);
	    if (x.isZero()) return new Ctor(x);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + 10;
	    Ctor.rounding = 1;

	    x = x.sin();
	    x.s = 1;
	    x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
	  };


	  /*
	   *  n * 0 = 0
	   *  n * N = N
	   *  n * I = I
	   *  0 * n = 0
	   *  0 * 0 = 0
	   *  0 * N = N
	   *  0 * I = N
	   *  N * n = N
	   *  N * 0 = N
	   *  N * N = N
	   *  N * I = N
	   *  I * n = I
	   *  I * 0 = N
	   *  I * N = N
	   *  I * I = I
	   *
	   * Return a new Decimal whose value is this Decimal times `y`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   */
	  P.times = P.mul = function (y) {
	    var carry, e, i, k, r, rL, t, xdL, ydL,
	      x = this,
	      Ctor = x.constructor,
	      xd = x.d,
	      yd = (y = new Ctor(y)).d;

	    y.s *= x.s;

	     // If either is NaN, ±Infinity or ±0...
	    if (!xd || !xd[0] || !yd || !yd[0]) {

	      return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd

	        // Return NaN if either is NaN.
	        // Return NaN if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
	        ? NaN

	        // Return ±Infinity if either is ±Infinity.
	        // Return ±0 if either is ±0.
	        : !xd || !yd ? y.s / 0 : y.s * 0);
	    }

	    e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
	    xdL = xd.length;
	    ydL = yd.length;

	    // Ensure xd points to the longer array.
	    if (xdL < ydL) {
	      r = xd;
	      xd = yd;
	      yd = r;
	      rL = xdL;
	      xdL = ydL;
	      ydL = rL;
	    }

	    // Initialise the result array with zeros.
	    r = [];
	    rL = xdL + ydL;
	    for (i = rL; i--;) r.push(0);

	    // Multiply!
	    for (i = ydL; --i >= 0;) {
	      carry = 0;
	      for (k = xdL + i; k > i;) {
	        t = r[k] + yd[i] * xd[k - i - 1] + carry;
	        r[k--] = t % BASE | 0;
	        carry = t / BASE | 0;
	      }

	      r[k] = (r[k] + carry) % BASE | 0;
	    }

	    // Remove trailing zeros.
	    for (; !r[--rL];) r.pop();

	    if (carry) ++e;
	    else r.shift();

	    y.d = r;
	    y.e = getBase10Exponent(r, e);

	    return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
	  };


	  /*
	   * Return a string representing the value of this Decimal in base 2, round to `sd` significant
	   * digits using rounding mode `rm`.
	   *
	   * If the optional `sd` argument is present then return binary exponential notation.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toBinary = function (sd, rm) {
	    return toStringBinary(this, 2, sd, rm);
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
	   * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
	   *
	   * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
	   *
	   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toDecimalPlaces = P.toDP = function (dp, rm) {
	    var x = this,
	      Ctor = x.constructor;

	    x = new Ctor(x);
	    if (dp === void 0) return x;

	    checkInt32(dp, 0, MAX_DIGITS);

	    if (rm === void 0) rm = Ctor.rounding;
	    else checkInt32(rm, 0, 8);

	    return finalise(x, dp + x.e + 1, rm);
	  };


	  /*
	   * Return a string representing the value of this Decimal in exponential notation rounded to
	   * `dp` fixed decimal places using rounding mode `rounding`.
	   *
	   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toExponential = function (dp, rm) {
	    var str,
	      x = this,
	      Ctor = x.constructor;

	    if (dp === void 0) {
	      str = finiteToString(x, true);
	    } else {
	      checkInt32(dp, 0, MAX_DIGITS);

	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);

	      x = finalise(new Ctor(x), dp + 1, rm);
	      str = finiteToString(x, true, dp + 1);
	    }

	    return x.isNeg() && !x.isZero() ? '-' + str : str;
	  };


	  /*
	   * Return a string representing the value of this Decimal in normal (fixed-point) notation to
	   * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
	   * omitted.
	   *
	   * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
	   *
	   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
	   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
	   * (-0).toFixed(3) is '0.000'.
	   * (-0.5).toFixed(0) is '-0'.
	   *
	   */
	  P.toFixed = function (dp, rm) {
	    var str, y,
	      x = this,
	      Ctor = x.constructor;

	    if (dp === void 0) {
	      str = finiteToString(x);
	    } else {
	      checkInt32(dp, 0, MAX_DIGITS);

	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);

	      y = finalise(new Ctor(x), dp + x.e + 1, rm);
	      str = finiteToString(y, false, dp + y.e + 1);
	    }

	    // To determine whether to add the minus sign look at the value before it was rounded,
	    // i.e. look at `x` rather than `y`.
	    return x.isNeg() && !x.isZero() ? '-' + str : str;
	  };


	  /*
	   * Return an array representing the value of this Decimal as a simple fraction with an integer
	   * numerator and an integer denominator.
	   *
	   * The denominator will be a positive non-zero value less than or equal to the specified maximum
	   * denominator. If a maximum denominator is not specified, the denominator will be the lowest
	   * value necessary to represent the number exactly.
	   *
	   * [maxD] {number|string|Decimal} Maximum denominator. Integer >= 1 and < Infinity.
	   *
	   */
	  P.toFraction = function (maxD) {
	    var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r,
	      x = this,
	      xd = x.d,
	      Ctor = x.constructor;

	    if (!xd) return new Ctor(x);

	    n1 = d0 = new Ctor(1);
	    d1 = n0 = new Ctor(0);

	    d = new Ctor(d1);
	    e = d.e = getPrecision(xd) - x.e - 1;
	    k = e % LOG_BASE;
	    d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);

	    if (maxD == null) {

	      // d is 10**e, the minimum max-denominator needed.
	      maxD = e > 0 ? d : n1;
	    } else {
	      n = new Ctor(maxD);
	      if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
	      maxD = n.gt(d) ? (e > 0 ? d : n1) : n;
	    }

	    external = false;
	    n = new Ctor(digitsToString(xd));
	    pr = Ctor.precision;
	    Ctor.precision = e = xd.length * LOG_BASE * 2;

	    for (;;)  {
	      q = divide(n, d, 0, 1, 1);
	      d2 = d0.plus(q.times(d1));
	      if (d2.cmp(maxD) == 1) break;
	      d0 = d1;
	      d1 = d2;
	      d2 = n1;
	      n1 = n0.plus(q.times(d2));
	      n0 = d2;
	      d2 = d;
	      d = n.minus(q.times(d2));
	      n = d2;
	    }

	    d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
	    n0 = n0.plus(d2.times(n1));
	    d0 = d0.plus(d2.times(d1));
	    n0.s = n1.s = x.s;

	    // Determine which fraction is closer to x, n0/d0 or n1/d1?
	    r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1
	        ? [n1, d1] : [n0, d0];

	    Ctor.precision = pr;
	    external = true;

	    return r;
	  };


	  /*
	   * Return a string representing the value of this Decimal in base 16, round to `sd` significant
	   * digits using rounding mode `rm`.
	   *
	   * If the optional `sd` argument is present then return binary exponential notation.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toHexadecimal = P.toHex = function (sd, rm) {
	    return toStringBinary(this, 16, sd, rm);
	  };


	  /*
	   * Returns a new Decimal whose value is the nearest multiple of `y` in the direction of rounding
	   * mode `rm`, or `Decimal.rounding` if `rm` is omitted, to the value of this Decimal.
	   *
	   * The return value will always have the same sign as this Decimal, unless either this Decimal
	   * or `y` is NaN, in which case the return value will be also be NaN.
	   *
	   * The return value is not affected by the value of `precision`.
	   *
	   * y {number|string|Decimal} The magnitude to round to a multiple of.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   * 'toNearest() rounding mode not an integer: {rm}'
	   * 'toNearest() rounding mode out of range: {rm}'
	   *
	   */
	  P.toNearest = function (y, rm) {
	    var x = this,
	      Ctor = x.constructor;

	    x = new Ctor(x);

	    if (y == null) {

	      // If x is not finite, return x.
	      if (!x.d) return x;

	      y = new Ctor(1);
	      rm = Ctor.rounding;
	    } else {
	      y = new Ctor(y);
	      if (rm === void 0) {
	        rm = Ctor.rounding;
	      } else {
	        checkInt32(rm, 0, 8);
	      }

	      // If x is not finite, return x if y is not NaN, else NaN.
	      if (!x.d) return y.s ? x : y;

	      // If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
	      if (!y.d) {
	        if (y.s) y.s = x.s;
	        return y;
	      }
	    }

	    // If y is not zero, calculate the nearest multiple of y to x.
	    if (y.d[0]) {
	      external = false;
	      x = divide(x, y, 0, rm, 1).times(y);
	      external = true;
	      finalise(x);

	    // If y is zero, return zero with the sign of x.
	    } else {
	      y.s = x.s;
	      x = y;
	    }

	    return x;
	  };


	  /*
	   * Return the value of this Decimal converted to a number primitive.
	   * Zero keeps its sign.
	   *
	   */
	  P.toNumber = function () {
	    return +this;
	  };


	  /*
	   * Return a string representing the value of this Decimal in base 8, round to `sd` significant
	   * digits using rounding mode `rm`.
	   *
	   * If the optional `sd` argument is present then return binary exponential notation.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toOctal = function (sd, rm) {
	    return toStringBinary(this, 8, sd, rm);
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal raised to the power `y`, rounded
	   * to `precision` significant digits using rounding mode `rounding`.
	   *
	   * ECMAScript compliant.
	   *
	   *   pow(x, NaN)                           = NaN
	   *   pow(x, ±0)                            = 1

	   *   pow(NaN, non-zero)                    = NaN
	   *   pow(abs(x) > 1, +Infinity)            = +Infinity
	   *   pow(abs(x) > 1, -Infinity)            = +0
	   *   pow(abs(x) == 1, ±Infinity)           = NaN
	   *   pow(abs(x) < 1, +Infinity)            = +0
	   *   pow(abs(x) < 1, -Infinity)            = +Infinity
	   *   pow(+Infinity, y > 0)                 = +Infinity
	   *   pow(+Infinity, y < 0)                 = +0
	   *   pow(-Infinity, odd integer > 0)       = -Infinity
	   *   pow(-Infinity, even integer > 0)      = +Infinity
	   *   pow(-Infinity, odd integer < 0)       = -0
	   *   pow(-Infinity, even integer < 0)      = +0
	   *   pow(+0, y > 0)                        = +0
	   *   pow(+0, y < 0)                        = +Infinity
	   *   pow(-0, odd integer > 0)              = -0
	   *   pow(-0, even integer > 0)             = +0
	   *   pow(-0, odd integer < 0)              = -Infinity
	   *   pow(-0, even integer < 0)             = +Infinity
	   *   pow(finite x < 0, finite non-integer) = NaN
	   *
	   * For non-integer or very large exponents pow(x, y) is calculated using
	   *
	   *   x^y = exp(y*ln(x))
	   *
	   * Assuming the first 15 rounding digits are each equally likely to be any digit 0-9, the
	   * probability of an incorrectly rounded result
	   * P([49]9{14} | [50]0{14}) = 2 * 0.2 * 10^-14 = 4e-15 = 1/2.5e+14
	   * i.e. 1 in 250,000,000,000,000
	   *
	   * If a result is incorrectly rounded the maximum error will be 1 ulp (unit in last place).
	   *
	   * y {number|string|Decimal} The power to which to raise this Decimal.
	   *
	   */
	  P.toPower = P.pow = function (y) {
	    var e, k, pr, r, rm, s,
	      x = this,
	      Ctor = x.constructor,
	      yn = +(y = new Ctor(y));

	    // Either ±Infinity, NaN or ±0?
	    if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor(mathpow(+x, yn));

	    x = new Ctor(x);

	    if (x.eq(1)) return x;

	    pr = Ctor.precision;
	    rm = Ctor.rounding;

	    if (y.eq(1)) return finalise(x, pr, rm);

	    // y exponent
	    e = mathfloor(y.e / LOG_BASE);

	    // If y is a small integer use the 'exponentiation by squaring' algorithm.
	    if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
	      r = intPow(Ctor, x, k, pr);
	      return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
	    }

	    s = x.s;

	    // if x is negative
	    if (s < 0) {

	      // if y is not an integer
	      if (e < y.d.length - 1) return new Ctor(NaN);

	      // Result is positive if x is negative and the last digit of integer y is even.
	      if ((y.d[e] & 1) == 0) s = 1;

	      // if x.eq(-1)
	      if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
	        x.s = s;
	        return x;
	      }
	    }

	    // Estimate result exponent.
	    // x^y = 10^e,  where e = y * log10(x)
	    // log10(x) = log10(x_significand) + x_exponent
	    // log10(x_significand) = ln(x_significand) / ln(10)
	    k = mathpow(+x, yn);
	    e = k == 0 || !isFinite(k)
	      ? mathfloor(yn * (Math.log('0.' + digitsToString(x.d)) / Math.LN10 + x.e + 1))
	      : new Ctor(k + '').e;

	    // Exponent estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.

	    // Overflow/underflow?
	    if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s / 0 : 0);

	    external = false;
	    Ctor.rounding = x.s = 1;

	    // Estimate the extra guard digits needed to ensure five correct rounding digits from
	    // naturalLogarithm(x). Example of failure without these extra digits (precision: 10):
	    // new Decimal(2.32456).pow('2087987436534566.46411')
	    // should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
	    k = Math.min(12, (e + '').length);

	    // r = x^y = exp(y*ln(x))
	    r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);

	    // r may be Infinity, e.g. (0.9999999999999999).pow(-1e+40)
	    if (r.d) {

	      // Truncate to the required precision plus five rounding digits.
	      r = finalise(r, pr + 5, 1);

	      // If the rounding digits are [49]9999 or [50]0000 increase the precision by 10 and recalculate
	      // the result.
	      if (checkRoundingDigits(r.d, pr, rm)) {
	        e = pr + 10;

	        // Truncate to the increased precision plus five rounding digits.
	        r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);

	        // Check for 14 nines from the 2nd rounding digit (the first rounding digit may be 4 or 9).
	        if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
	          r = finalise(r, pr + 1, 0);
	        }
	      }
	    }

	    r.s = s;
	    external = true;
	    Ctor.rounding = rm;

	    return finalise(r, pr, rm);
	  };


	  /*
	   * Return a string representing the value of this Decimal rounded to `sd` significant digits
	   * using rounding mode `rounding`.
	   *
	   * Return exponential notation if `sd` is less than the number of digits necessary to represent
	   * the integer part of the value in normal notation.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toPrecision = function (sd, rm) {
	    var str,
	      x = this,
	      Ctor = x.constructor;

	    if (sd === void 0) {
	      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
	    } else {
	      checkInt32(sd, 1, MAX_DIGITS);

	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);

	      x = finalise(new Ctor(x), sd, rm);
	      str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
	    }

	    return x.isNeg() && !x.isZero() ? '-' + str : str;
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
	   * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
	   * omitted.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   * 'toSD() digits out of range: {sd}'
	   * 'toSD() digits not an integer: {sd}'
	   * 'toSD() rounding mode not an integer: {rm}'
	   * 'toSD() rounding mode out of range: {rm}'
	   *
	   */
	  P.toSignificantDigits = P.toSD = function (sd, rm) {
	    var x = this,
	      Ctor = x.constructor;

	    if (sd === void 0) {
	      sd = Ctor.precision;
	      rm = Ctor.rounding;
	    } else {
	      checkInt32(sd, 1, MAX_DIGITS);

	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);
	    }

	    return finalise(new Ctor(x), sd, rm);
	  };


	  /*
	   * Return a string representing the value of this Decimal.
	   *
	   * Return exponential notation if this Decimal has a positive exponent equal to or greater than
	   * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
	   *
	   */
	  P.toString = function () {
	    var x = this,
	      Ctor = x.constructor,
	      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

	    return x.isNeg() && !x.isZero() ? '-' + str : str;
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
	   *
	   */
	  P.truncated = P.trunc = function () {
	    return finalise(new this.constructor(this), this.e + 1, 1);
	  };


	  /*
	   * Return a string representing the value of this Decimal.
	   * Unlike `toString`, negative zero will include the minus sign.
	   *
	   */
	  P.valueOf = P.toJSON = function () {
	    var x = this,
	      Ctor = x.constructor,
	      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

	    return x.isNeg() ? '-' + str : str;
	  };


	  // Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.


	  /*
	   *  digitsToString           P.cubeRoot, P.logarithm, P.squareRoot, P.toFraction, P.toPower,
	   *                           finiteToString, naturalExponential, naturalLogarithm
	   *  checkInt32               P.toDecimalPlaces, P.toExponential, P.toFixed, P.toNearest,
	   *                           P.toPrecision, P.toSignificantDigits, toStringBinary, random
	   *  checkRoundingDigits      P.logarithm, P.toPower, naturalExponential, naturalLogarithm
	   *  convertBase              toStringBinary, parseOther
	   *  cos                      P.cos
	   *  divide                   P.atanh, P.cubeRoot, P.dividedBy, P.dividedToIntegerBy,
	   *                           P.logarithm, P.modulo, P.squareRoot, P.tan, P.tanh, P.toFraction,
	   *                           P.toNearest, toStringBinary, naturalExponential, naturalLogarithm,
	   *                           taylorSeries, atan2, parseOther
	   *  finalise                 P.absoluteValue, P.atan, P.atanh, P.ceil, P.cos, P.cosh,
	   *                           P.cubeRoot, P.dividedToIntegerBy, P.floor, P.logarithm, P.minus,
	   *                           P.modulo, P.negated, P.plus, P.round, P.sin, P.sinh, P.squareRoot,
	   *                           P.tan, P.times, P.toDecimalPlaces, P.toExponential, P.toFixed,
	   *                           P.toNearest, P.toPower, P.toPrecision, P.toSignificantDigits,
	   *                           P.truncated, divide, getLn10, getPi, naturalExponential,
	   *                           naturalLogarithm, ceil, floor, round, trunc
	   *  finiteToString           P.toExponential, P.toFixed, P.toPrecision, P.toString, P.valueOf,
	   *                           toStringBinary
	   *  getBase10Exponent        P.minus, P.plus, P.times, parseOther
	   *  getLn10                  P.logarithm, naturalLogarithm
	   *  getPi                    P.acos, P.asin, P.atan, toLessThanHalfPi, atan2
	   *  getPrecision             P.precision, P.toFraction
	   *  getZeroString            digitsToString, finiteToString
	   *  intPow                   P.toPower, parseOther
	   *  isOdd                    toLessThanHalfPi
	   *  maxOrMin                 max, min
	   *  naturalExponential       P.naturalExponential, P.toPower
	   *  naturalLogarithm         P.acosh, P.asinh, P.atanh, P.logarithm, P.naturalLogarithm,
	   *                           P.toPower, naturalExponential
	   *  nonFiniteToString        finiteToString, toStringBinary
	   *  parseDecimal             Decimal
	   *  parseOther               Decimal
	   *  sin                      P.sin
	   *  taylorSeries             P.cosh, P.sinh, cos, sin
	   *  toLessThanHalfPi         P.cos, P.sin
	   *  toStringBinary           P.toBinary, P.toHexadecimal, P.toOctal
	   *  truncate                 intPow
	   *
	   *  Throws:                  P.logarithm, P.precision, P.toFraction, checkInt32, getLn10, getPi,
	   *                           naturalLogarithm, config, parseOther, random, Decimal
	   */


	  function digitsToString(d) {
	    var i, k, ws,
	      indexOfLastWord = d.length - 1,
	      str = '',
	      w = d[0];

	    if (indexOfLastWord > 0) {
	      str += w;
	      for (i = 1; i < indexOfLastWord; i++) {
	        ws = d[i] + '';
	        k = LOG_BASE - ws.length;
	        if (k) str += getZeroString(k);
	        str += ws;
	      }

	      w = d[i];
	      ws = w + '';
	      k = LOG_BASE - ws.length;
	      if (k) str += getZeroString(k);
	    } else if (w === 0) {
	      return '0';
	    }

	    // Remove trailing zeros of last w.
	    for (; w % 10 === 0;) w /= 10;

	    return str + w;
	  }


	  function checkInt32(i, min, max) {
	    if (i !== ~~i || i < min || i > max) {
	      throw Error(invalidArgument + i);
	    }
	  }


	  /*
	   * Check 5 rounding digits if `repeating` is null, 4 otherwise.
	   * `repeating == null` if caller is `log` or `pow`,
	   * `repeating != null` if caller is `naturalLogarithm` or `naturalExponential`.
	   */
	  function checkRoundingDigits(d, i, rm, repeating) {
	    var di, k, r, rd;

	    // Get the length of the first word of the array d.
	    for (k = d[0]; k >= 10; k /= 10) --i;

	    // Is the rounding digit in the first word of d?
	    if (--i < 0) {
	      i += LOG_BASE;
	      di = 0;
	    } else {
	      di = Math.ceil((i + 1) / LOG_BASE);
	      i %= LOG_BASE;
	    }

	    // i is the index (0 - 6) of the rounding digit.
	    // E.g. if within the word 3487563 the first rounding digit is 5,
	    // then i = 4, k = 1000, rd = 3487563 % 1000 = 563
	    k = mathpow(10, LOG_BASE - i);
	    rd = d[di] % k | 0;

	    if (repeating == null) {
	      if (i < 3) {
	        if (i == 0) rd = rd / 100 | 0;
	        else if (i == 1) rd = rd / 10 | 0;
	        r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 50000 || rd == 0;
	      } else {
	        r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) &&
	          (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 ||
	            (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
	      }
	    } else {
	      if (i < 4) {
	        if (i == 0) rd = rd / 1000 | 0;
	        else if (i == 1) rd = rd / 100 | 0;
	        else if (i == 2) rd = rd / 10 | 0;
	        r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
	      } else {
	        r = ((repeating || rm < 4) && rd + 1 == k ||
	        (!repeating && rm > 3) && rd + 1 == k / 2) &&
	          (d[di + 1] / k / 1000 | 0) == mathpow(10, i - 3) - 1;
	      }
	    }

	    return r;
	  }


	  // Convert string of `baseIn` to an array of numbers of `baseOut`.
	  // Eg. convertBase('255', 10, 16) returns [15, 15].
	  // Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
	  function convertBase(str, baseIn, baseOut) {
	    var j,
	      arr = [0],
	      arrL,
	      i = 0,
	      strL = str.length;

	    for (; i < strL;) {
	      for (arrL = arr.length; arrL--;) arr[arrL] *= baseIn;
	      arr[0] += NUMERALS.indexOf(str.charAt(i++));
	      for (j = 0; j < arr.length; j++) {
	        if (arr[j] > baseOut - 1) {
	          if (arr[j + 1] === void 0) arr[j + 1] = 0;
	          arr[j + 1] += arr[j] / baseOut | 0;
	          arr[j] %= baseOut;
	        }
	      }
	    }

	    return arr.reverse();
	  }


	  /*
	   * cos(x) = 1 - x^2/2! + x^4/4! - ...
	   * |x| < pi/2
	   *
	   */
	  function cosine(Ctor, x) {
	    var k, len, y;

	    if (x.isZero()) return x;

	    // Argument reduction: cos(4x) = 8*(cos^4(x) - cos^2(x)) + 1
	    // i.e. cos(x) = 8*(cos^4(x/4) - cos^2(x/4)) + 1

	    // Estimate the optimum number of times to use the argument reduction.
	    len = x.d.length;
	    if (len < 32) {
	      k = Math.ceil(len / 3);
	      y = (1 / tinyPow(4, k)).toString();
	    } else {
	      k = 16;
	      y = '2.3283064365386962890625e-10';
	    }

	    Ctor.precision += k;

	    x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));

	    // Reverse argument reduction
	    for (var i = k; i--;) {
	      var cos2x = x.times(x);
	      x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
	    }

	    Ctor.precision -= k;

	    return x;
	  }


	  /*
	   * Perform division in the specified base.
	   */
	  var divide = (function () {

	    // Assumes non-zero x and k, and hence non-zero result.
	    function multiplyInteger(x, k, base) {
	      var temp,
	        carry = 0,
	        i = x.length;

	      for (x = x.slice(); i--;) {
	        temp = x[i] * k + carry;
	        x[i] = temp % base | 0;
	        carry = temp / base | 0;
	      }

	      if (carry) x.unshift(carry);

	      return x;
	    }

	    function compare(a, b, aL, bL) {
	      var i, r;

	      if (aL != bL) {
	        r = aL > bL ? 1 : -1;
	      } else {
	        for (i = r = 0; i < aL; i++) {
	          if (a[i] != b[i]) {
	            r = a[i] > b[i] ? 1 : -1;
	            break;
	          }
	        }
	      }

	      return r;
	    }

	    function subtract(a, b, aL, base) {
	      var i = 0;

	      // Subtract b from a.
	      for (; aL--;) {
	        a[aL] -= i;
	        i = a[aL] < b[aL] ? 1 : 0;
	        a[aL] = i * base + a[aL] - b[aL];
	      }

	      // Remove leading zeros.
	      for (; !a[0] && a.length > 1;) a.shift();
	    }

	    return function (x, y, pr, rm, dp, base) {
	      var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0,
	        yL, yz,
	        Ctor = x.constructor,
	        sign = x.s == y.s ? 1 : -1,
	        xd = x.d,
	        yd = y.d;

	      // Either NaN, Infinity or 0?
	      if (!xd || !xd[0] || !yd || !yd[0]) {

	        return new Ctor(// Return NaN if either NaN, or both Infinity or 0.
	          !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN :

	          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
	          xd && xd[0] == 0 || !yd ? sign * 0 : sign / 0);
	      }

	      if (base) {
	        logBase = 1;
	        e = x.e - y.e;
	      } else {
	        base = BASE;
	        logBase = LOG_BASE;
	        e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
	      }

	      yL = yd.length;
	      xL = xd.length;
	      q = new Ctor(sign);
	      qd = q.d = [];

	      // Result exponent may be one less than e.
	      // The digit array of a Decimal from toStringBinary may have trailing zeros.
	      for (i = 0; yd[i] == (xd[i] || 0); i++);

	      if (yd[i] > (xd[i] || 0)) e--;

	      if (pr == null) {
	        sd = pr = Ctor.precision;
	        rm = Ctor.rounding;
	      } else if (dp) {
	        sd = pr + (x.e - y.e) + 1;
	      } else {
	        sd = pr;
	      }

	      if (sd < 0) {
	        qd.push(1);
	        more = true;
	      } else {

	        // Convert precision in number of base 10 digits to base 1e7 digits.
	        sd = sd / logBase + 2 | 0;
	        i = 0;

	        // divisor < 1e7
	        if (yL == 1) {
	          k = 0;
	          yd = yd[0];
	          sd++;

	          // k is the carry.
	          for (; (i < xL || k) && sd--; i++) {
	            t = k * base + (xd[i] || 0);
	            qd[i] = t / yd | 0;
	            k = t % yd | 0;
	          }

	          more = k || i < xL;

	        // divisor >= 1e7
	        } else {

	          // Normalise xd and yd so highest order digit of yd is >= base/2
	          k = base / (yd[0] + 1) | 0;

	          if (k > 1) {
	            yd = multiplyInteger(yd, k, base);
	            xd = multiplyInteger(xd, k, base);
	            yL = yd.length;
	            xL = xd.length;
	          }

	          xi = yL;
	          rem = xd.slice(0, yL);
	          remL = rem.length;

	          // Add zeros to make remainder as long as divisor.
	          for (; remL < yL;) rem[remL++] = 0;

	          yz = yd.slice();
	          yz.unshift(0);
	          yd0 = yd[0];

	          if (yd[1] >= base / 2) ++yd0;

	          do {
	            k = 0;

	            // Compare divisor and remainder.
	            cmp = compare(yd, rem, yL, remL);

	            // If divisor < remainder.
	            if (cmp < 0) {

	              // Calculate trial digit, k.
	              rem0 = rem[0];
	              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

	              // k will be how many times the divisor goes into the current remainder.
	              k = rem0 / yd0 | 0;

	              //  Algorithm:
	              //  1. product = divisor * trial digit (k)
	              //  2. if product > remainder: product -= divisor, k--
	              //  3. remainder -= product
	              //  4. if product was < remainder at 2:
	              //    5. compare new remainder and divisor
	              //    6. If remainder > divisor: remainder -= divisor, k++

	              if (k > 1) {
	                if (k >= base) k = base - 1;

	                // product = divisor * trial digit.
	                prod = multiplyInteger(yd, k, base);
	                prodL = prod.length;
	                remL = rem.length;

	                // Compare product and remainder.
	                cmp = compare(prod, rem, prodL, remL);

	                // product > remainder.
	                if (cmp == 1) {
	                  k--;

	                  // Subtract divisor from product.
	                  subtract(prod, yL < prodL ? yz : yd, prodL, base);
	                }
	              } else {

	                // cmp is -1.
	                // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
	                // to avoid it. If k is 1 there is a need to compare yd and rem again below.
	                if (k == 0) cmp = k = 1;
	                prod = yd.slice();
	              }

	              prodL = prod.length;
	              if (prodL < remL) prod.unshift(0);

	              // Subtract product from remainder.
	              subtract(rem, prod, remL, base);

	              // If product was < previous remainder.
	              if (cmp == -1) {
	                remL = rem.length;

	                // Compare divisor and new remainder.
	                cmp = compare(yd, rem, yL, remL);

	                // If divisor < new remainder, subtract divisor from remainder.
	                if (cmp < 1) {
	                  k++;

	                  // Subtract divisor from remainder.
	                  subtract(rem, yL < remL ? yz : yd, remL, base);
	                }
	              }

	              remL = rem.length;
	            } else if (cmp === 0) {
	              k++;
	              rem = [0];
	            }    // if cmp === 1, k will be 0

	            // Add the next digit, k, to the result array.
	            qd[i++] = k;

	            // Update the remainder.
	            if (cmp && rem[0]) {
	              rem[remL++] = xd[xi] || 0;
	            } else {
	              rem = [xd[xi]];
	              remL = 1;
	            }

	          } while ((xi++ < xL || rem[0] !== void 0) && sd--);

	          more = rem[0] !== void 0;
	        }

	        // Leading zero?
	        if (!qd[0]) qd.shift();
	      }

	      // logBase is 1 when divide is being used for base conversion.
	      if (logBase == 1) {
	        q.e = e;
	        inexact = more;
	      } else {

	        // To calculate q.e, first get the number of digits of qd[0].
	        for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
	        q.e = i + e * logBase - 1;

	        finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
	      }

	      return q;
	    };
	  })();


	  /*
	   * Round `x` to `sd` significant digits using rounding mode `rm`.
	   * Check for over/under-flow.
	   */
	   function finalise(x, sd, rm, isTruncated) {
	    var digits, i, j, k, rd, roundUp, w, xd, xdi,
	      Ctor = x.constructor;

	    // Don't round if sd is null or undefined.
	    out: if (sd != null) {
	      xd = x.d;

	      // Infinity/NaN.
	      if (!xd) return x;

	      // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
	      // w: the word of xd containing rd, a base 1e7 number.
	      // xdi: the index of w within xd.
	      // digits: the number of digits of w.
	      // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
	      // they had leading zeros)
	      // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

	      // Get the length of the first word of the digits array xd.
	      for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
	      i = sd - digits;

	      // Is the rounding digit in the first word of xd?
	      if (i < 0) {
	        i += LOG_BASE;
	        j = sd;
	        w = xd[xdi = 0];

	        // Get the rounding digit at index j of w.
	        rd = w / mathpow(10, digits - j - 1) % 10 | 0;
	      } else {
	        xdi = Math.ceil((i + 1) / LOG_BASE);
	        k = xd.length;
	        if (xdi >= k) {
	          if (isTruncated) {

	            // Needed by `naturalExponential`, `naturalLogarithm` and `squareRoot`.
	            for (; k++ <= xdi;) xd.push(0);
	            w = rd = 0;
	            digits = 1;
	            i %= LOG_BASE;
	            j = i - LOG_BASE + 1;
	          } else {
	            break out;
	          }
	        } else {
	          w = k = xd[xdi];

	          // Get the number of digits of w.
	          for (digits = 1; k >= 10; k /= 10) digits++;

	          // Get the index of rd within w.
	          i %= LOG_BASE;

	          // Get the index of rd within w, adjusted for leading zeros.
	          // The number of leading zeros of w is given by LOG_BASE - digits.
	          j = i - LOG_BASE + digits;

	          // Get the rounding digit at index j of w.
	          rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
	        }
	      }

	      // Are there any non-zero digits after the rounding digit?
	      isTruncated = isTruncated || sd < 0 ||
	        xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));

	      // The expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
	      // of the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
	      // will give 714.

	      roundUp = rm < 4
	        ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
	        : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 &&

	          // Check whether the digit to the left of the rounding digit is odd.
	          ((i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
	            rm == (x.s < 0 ? 8 : 7));

	      if (sd < 1 || !xd[0]) {
	        xd.length = 0;
	        if (roundUp) {

	          // Convert sd to decimal places.
	          sd -= x.e + 1;

	          // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
	          x.e = -sd || 0;
	        } else {

	          // Zero.
	          xd[0] = x.e = 0;
	        }

	        return x;
	      }

	      // Remove excess digits.
	      if (i == 0) {
	        xd.length = xdi;
	        k = 1;
	        xdi--;
	      } else {
	        xd.length = xdi + 1;
	        k = mathpow(10, LOG_BASE - i);

	        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
	        // j > 0 means i > number of leading zeros of w.
	        xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
	      }

	      if (roundUp) {
	        for (;;) {

	          // Is the digit to be rounded up in the first word of xd?
	          if (xdi == 0) {

	            // i will be the length of xd[0] before k is added.
	            for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
	            j = xd[0] += k;
	            for (k = 1; j >= 10; j /= 10) k++;

	            // if i != k the length has increased.
	            if (i != k) {
	              x.e++;
	              if (xd[0] == BASE) xd[0] = 1;
	            }

	            break;
	          } else {
	            xd[xdi] += k;
	            if (xd[xdi] != BASE) break;
	            xd[xdi--] = 0;
	            k = 1;
	          }
	        }
	      }

	      // Remove trailing zeros.
	      for (i = xd.length; xd[--i] === 0;) xd.pop();
	    }

	    if (external) {

	      // Overflow?
	      if (x.e > Ctor.maxE) {

	        // Infinity.
	        x.d = null;
	        x.e = NaN;

	      // Underflow?
	      } else if (x.e < Ctor.minE) {

	        // Zero.
	        x.e = 0;
	        x.d = [0];
	        // Ctor.underflow = true;
	      } // else Ctor.underflow = false;
	    }

	    return x;
	  }


	  function finiteToString(x, isExp, sd) {
	    if (!x.isFinite()) return nonFiniteToString(x);
	    var k,
	      e = x.e,
	      str = digitsToString(x.d),
	      len = str.length;

	    if (isExp) {
	      if (sd && (k = sd - len) > 0) {
	        str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
	      } else if (len > 1) {
	        str = str.charAt(0) + '.' + str.slice(1);
	      }

	      str = str + (x.e < 0 ? 'e' : 'e+') + x.e;
	    } else if (e < 0) {
	      str = '0.' + getZeroString(-e - 1) + str;
	      if (sd && (k = sd - len) > 0) str += getZeroString(k);
	    } else if (e >= len) {
	      str += getZeroString(e + 1 - len);
	      if (sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k);
	    } else {
	      if ((k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k);
	      if (sd && (k = sd - len) > 0) {
	        if (e + 1 === len) str += '.';
	        str += getZeroString(k);
	      }
	    }

	    return str;
	  }


	  // Calculate the base 10 exponent from the base 1e7 exponent.
	  function getBase10Exponent(digits, e) {
	    var w = digits[0];

	    // Add the number of digits of the first word of the digits array.
	    for ( e *= LOG_BASE; w >= 10; w /= 10) e++;
	    return e;
	  }


	  function getLn10(Ctor, sd, pr) {
	    if (sd > LN10_PRECISION) {

	      // Reset global state in case the exception is caught.
	      external = true;
	      if (pr) Ctor.precision = pr;
	      throw Error(precisionLimitExceeded);
	    }
	    return finalise(new Ctor(LN10), sd, 1, true);
	  }


	  function getPi(Ctor, sd, rm) {
	    if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
	    return finalise(new Ctor(PI), sd, rm, true);
	  }


	  function getPrecision(digits) {
	    var w = digits.length - 1,
	      len = w * LOG_BASE + 1;

	    w = digits[w];

	    // If non-zero...
	    if (w) {

	      // Subtract the number of trailing zeros of the last word.
	      for (; w % 10 == 0; w /= 10) len--;

	      // Add the number of digits of the first word.
	      for (w = digits[0]; w >= 10; w /= 10) len++;
	    }

	    return len;
	  }


	  function getZeroString(k) {
	    var zs = '';
	    for (; k--;) zs += '0';
	    return zs;
	  }


	  /*
	   * Return a new Decimal whose value is the value of Decimal `x` to the power `n`, where `n` is an
	   * integer of type number.
	   *
	   * Implements 'exponentiation by squaring'. Called by `pow` and `parseOther`.
	   *
	   */
	  function intPow(Ctor, x, n, pr) {
	    var isTruncated,
	      r = new Ctor(1),

	      // Max n of 9007199254740991 takes 53 loop iterations.
	      // Maximum digits array length; leaves [28, 34] guard digits.
	      k = Math.ceil(pr / LOG_BASE + 4);

	    external = false;

	    for (;;) {
	      if (n % 2) {
	        r = r.times(x);
	        if (truncate(r.d, k)) isTruncated = true;
	      }

	      n = mathfloor(n / 2);
	      if (n === 0) {

	        // To ensure correct rounding when r.d is truncated, increment the last word if it is zero.
	        n = r.d.length - 1;
	        if (isTruncated && r.d[n] === 0) ++r.d[n];
	        break;
	      }

	      x = x.times(x);
	      truncate(x.d, k);
	    }

	    external = true;

	    return r;
	  }


	  function isOdd(n) {
	    return n.d[n.d.length - 1] & 1;
	  }


	  /*
	   * Handle `max` and `min`. `ltgt` is 'lt' or 'gt'.
	   */
	  function maxOrMin(Ctor, args, ltgt) {
	    var y,
	      x = new Ctor(args[0]),
	      i = 0;

	    for (; ++i < args.length;) {
	      y = new Ctor(args[i]);
	      if (!y.s) {
	        x = y;
	        break;
	      } else if (x[ltgt](y)) {
	        x = y;
	      }
	    }

	    return x;
	  }


	  /*
	   * Return a new Decimal whose value is the natural exponential of `x` rounded to `sd` significant
	   * digits.
	   *
	   * Taylor/Maclaurin series.
	   *
	   * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
	   *
	   * Argument reduction:
	   *   Repeat x = x / 32, k += 5, until |x| < 0.1
	   *   exp(x) = exp(x / 2^k)^(2^k)
	   *
	   * Previously, the argument was initially reduced by
	   * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
	   * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
	   * found to be slower than just dividing repeatedly by 32 as above.
	   *
	   * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
	   * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
	   * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
	   *
	   *  exp(Infinity)  = Infinity
	   *  exp(-Infinity) = 0
	   *  exp(NaN)       = NaN
	   *  exp(±0)        = 1
	   *
	   *  exp(x) is non-terminating for any finite, non-zero x.
	   *
	   *  The result will always be correctly rounded.
	   *
	   */
	  function naturalExponential(x, sd) {
	    var denominator, guard, j, pow, sum, t, wpr,
	      rep = 0,
	      i = 0,
	      k = 0,
	      Ctor = x.constructor,
	      rm = Ctor.rounding,
	      pr = Ctor.precision;

	    // 0/NaN/Infinity?
	    if (!x.d || !x.d[0] || x.e > 17) {

	      return new Ctor(x.d
	        ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0
	        : x.s ? x.s < 0 ? 0 : x : 0 / 0);
	    }

	    if (sd == null) {
	      external = false;
	      wpr = pr;
	    } else {
	      wpr = sd;
	    }

	    t = new Ctor(0.03125);

	    // while abs(x) >= 0.1
	    while (x.e > -2) {

	      // x = x / 2^5
	      x = x.times(t);
	      k += 5;
	    }

	    // Use 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
	    // necessary to ensure the first 4 rounding digits are correct.
	    guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
	    wpr += guard;
	    denominator = pow = sum = new Ctor(1);
	    Ctor.precision = wpr;

	    for (;;) {
	      pow = finalise(pow.times(x), wpr, 1);
	      denominator = denominator.times(++i);
	      t = sum.plus(divide(pow, denominator, wpr, 1));

	      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
	        j = k;
	        while (j--) sum = finalise(sum.times(sum), wpr, 1);

	        // Check to see if the first 4 rounding digits are [49]999.
	        // If so, repeat the summation with a higher precision, otherwise
	        // e.g. with precision: 18, rounding: 1
	        // exp(18.404272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
	        // `wpr - guard` is the index of first rounding digit.
	        if (sd == null) {

	          if (rep < 3 && checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
	            Ctor.precision = wpr += 10;
	            denominator = pow = t = new Ctor(1);
	            i = 0;
	            rep++;
	          } else {
	            return finalise(sum, Ctor.precision = pr, rm, external = true);
	          }
	        } else {
	          Ctor.precision = pr;
	          return sum;
	        }
	      }

	      sum = t;
	    }
	  }


	  /*
	   * Return a new Decimal whose value is the natural logarithm of `x` rounded to `sd` significant
	   * digits.
	   *
	   *  ln(-n)        = NaN
	   *  ln(0)         = -Infinity
	   *  ln(-0)        = -Infinity
	   *  ln(1)         = 0
	   *  ln(Infinity)  = Infinity
	   *  ln(-Infinity) = NaN
	   *  ln(NaN)       = NaN
	   *
	   *  ln(n) (n != 1) is non-terminating.
	   *
	   */
	  function naturalLogarithm(y, sd) {
	    var c, c0, denominator, e, numerator, rep, sum, t, wpr, x1, x2,
	      n = 1,
	      guard = 10,
	      x = y,
	      xd = x.d,
	      Ctor = x.constructor,
	      rm = Ctor.rounding,
	      pr = Ctor.precision;

	    // Is x negative or Infinity, NaN, 0 or 1?
	    if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
	      return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
	    }

	    if (sd == null) {
	      external = false;
	      wpr = pr;
	    } else {
	      wpr = sd;
	    }

	    Ctor.precision = wpr += guard;
	    c = digitsToString(xd);
	    c0 = c.charAt(0);

	    if (Math.abs(e = x.e) < 1.5e15) {

	      // Argument reduction.
	      // The series converges faster the closer the argument is to 1, so using
	      // ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
	      // multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
	      // 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
	      // later be divided by this number, then separate out the power of 10 using
	      // ln(a*10^b) = ln(a) + b*ln(10).

	      // max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
	      //while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
	      // max n is 6 (gives 0.7 - 1.3)
	      while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
	        x = x.times(y);
	        c = digitsToString(x.d);
	        c0 = c.charAt(0);
	        n++;
	      }

	      e = x.e;

	      if (c0 > 1) {
	        x = new Ctor('0.' + c);
	        e++;
	      } else {
	        x = new Ctor(c0 + '.' + c.slice(1));
	      }
	    } else {

	      // The argument reduction method above may result in overflow if the argument y is a massive
	      // number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
	      // function using ln(x*10^e) = ln(x) + e*ln(10).
	      t = getLn10(Ctor, wpr + 2, pr).times(e + '');
	      x = naturalLogarithm(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);
	      Ctor.precision = pr;

	      return sd == null ? finalise(x, pr, rm, external = true) : x;
	    }

	    // x1 is x reduced to a value near 1.
	    x1 = x;

	    // Taylor series.
	    // ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
	    // where x = (y - 1)/(y + 1)    (|x| < 1)
	    sum = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
	    x2 = finalise(x.times(x), wpr, 1);
	    denominator = 3;

	    for (;;) {
	      numerator = finalise(numerator.times(x2), wpr, 1);
	      t = sum.plus(divide(numerator, new Ctor(denominator), wpr, 1));

	      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
	        sum = sum.times(2);

	        // Reverse the argument reduction. Check that e is not 0 because, besides preventing an
	        // unnecessary calculation, -0 + 0 = +0 and to ensure correct rounding -0 needs to stay -0.
	        if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
	        sum = divide(sum, new Ctor(n), wpr, 1);

	        // Is rm > 3 and the first 4 rounding digits 4999, or rm < 4 (or the summation has
	        // been repeated previously) and the first 4 rounding digits 9999?
	        // If so, restart the summation with a higher precision, otherwise
	        // e.g. with precision: 12, rounding: 1
	        // ln(135520028.6126091714265381533) = 18.7246299999 when it should be 18.72463.
	        // `wpr - guard` is the index of first rounding digit.
	        if (sd == null) {
	          if (checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
	            Ctor.precision = wpr += guard;
	            t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
	            x2 = finalise(x.times(x), wpr, 1);
	            denominator = rep = 1;
	          } else {
	            return finalise(sum, Ctor.precision = pr, rm, external = true);
	          }
	        } else {
	          Ctor.precision = pr;
	          return sum;
	        }
	      }

	      sum = t;
	      denominator += 2;
	    }
	  }


	  // ±Infinity, NaN.
	  function nonFiniteToString(x) {
	    // Unsigned.
	    return String(x.s * x.s / 0);
	  }


	  /*
	   * Parse the value of a new Decimal `x` from string `str`.
	   */
	  function parseDecimal(x, str) {
	    var e, i, len;

	    // Decimal point?
	    if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

	    // Exponential form?
	    if ((i = str.search(/e/i)) > 0) {

	      // Determine exponent.
	      if (e < 0) e = i;
	      e += +str.slice(i + 1);
	      str = str.substring(0, i);
	    } else if (e < 0) {

	      // Integer.
	      e = str.length;
	    }

	    // Determine leading zeros.
	    for (i = 0; str.charCodeAt(i) === 48; i++);

	    // Determine trailing zeros.
	    for (len = str.length; str.charCodeAt(len - 1) === 48; --len);
	    str = str.slice(i, len);

	    if (str) {
	      len -= i;
	      x.e = e = e - i - 1;
	      x.d = [];

	      // Transform base

	      // e is the base 10 exponent.
	      // i is where to slice str to get the first word of the digits array.
	      i = (e + 1) % LOG_BASE;
	      if (e < 0) i += LOG_BASE;

	      if (i < len) {
	        if (i) x.d.push(+str.slice(0, i));
	        for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
	        str = str.slice(i);
	        i = LOG_BASE - str.length;
	      } else {
	        i -= len;
	      }

	      for (; i--;) str += '0';
	      x.d.push(+str);

	      if (external) {

	        // Overflow?
	        if (x.e > x.constructor.maxE) {

	          // Infinity.
	          x.d = null;
	          x.e = NaN;

	        // Underflow?
	        } else if (x.e < x.constructor.minE) {

	          // Zero.
	          x.e = 0;
	          x.d = [0];
	          // x.constructor.underflow = true;
	        } // else x.constructor.underflow = false;
	      }
	    } else {

	      // Zero.
	      x.e = 0;
	      x.d = [0];
	    }

	    return x;
	  }


	  /*
	   * Parse the value of a new Decimal `x` from a string `str`, which is not a decimal value.
	   */
	  function parseOther(x, str) {
	    var base, Ctor, divisor, i, isFloat, len, p, xd, xe;

	    if (str.indexOf('_') > -1) {
	      str = str.replace(/(\d)_(?=\d)/g, '$1');
	      if (isDecimal.test(str)) return parseDecimal(x, str);
	    } else if (str === 'Infinity' || str === 'NaN') {
	      if (!+str) x.s = NaN;
	      x.e = NaN;
	      x.d = null;
	      return x;
	    }

	    if (isHex.test(str))  {
	      base = 16;
	      str = str.toLowerCase();
	    } else if (isBinary.test(str))  {
	      base = 2;
	    } else if (isOctal.test(str))  {
	      base = 8;
	    } else {
	      throw Error(invalidArgument + str);
	    }

	    // Is there a binary exponent part?
	    i = str.search(/p/i);

	    if (i > 0) {
	      p = +str.slice(i + 1);
	      str = str.substring(2, i);
	    } else {
	      str = str.slice(2);
	    }

	    // Convert `str` as an integer then divide the result by `base` raised to a power such that the
	    // fraction part will be restored.
	    i = str.indexOf('.');
	    isFloat = i >= 0;
	    Ctor = x.constructor;

	    if (isFloat) {
	      str = str.replace('.', '');
	      len = str.length;
	      i = len - i;

	      // log[10](16) = 1.2041... , log[10](88) = 1.9444....
	      divisor = intPow(Ctor, new Ctor(base), i, i * 2);
	    }

	    xd = convertBase(str, base, BASE);
	    xe = xd.length - 1;

	    // Remove trailing zeros.
	    for (i = xe; xd[i] === 0; --i) xd.pop();
	    if (i < 0) return new Ctor(x.s * 0);
	    x.e = getBase10Exponent(xd, xe);
	    x.d = xd;
	    external = false;

	    // At what precision to perform the division to ensure exact conversion?
	    // maxDecimalIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
	    // log[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
	    // E.g. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
	    // maxDecimalFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
	    // Therefore using 4 * the number of digits of str will always be enough.
	    if (isFloat) x = divide(x, divisor, len * 4);

	    // Multiply by the binary exponent part if present.
	    if (p) x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
	    external = true;

	    return x;
	  }


	  /*
	   * sin(x) = x - x^3/3! + x^5/5! - ...
	   * |x| < pi/2
	   *
	   */
	  function sine(Ctor, x) {
	    var k,
	      len = x.d.length;

	    if (len < 3) {
	      return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
	    }

	    // Argument reduction: sin(5x) = 16*sin^5(x) - 20*sin^3(x) + 5*sin(x)
	    // i.e. sin(x) = 16*sin^5(x/5) - 20*sin^3(x/5) + 5*sin(x/5)
	    // and  sin(x) = sin(x/5)(5 + sin^2(x/5)(16sin^2(x/5) - 20))

	    // Estimate the optimum number of times to use the argument reduction.
	    k = 1.4 * Math.sqrt(len);
	    k = k > 16 ? 16 : k | 0;

	    x = x.times(1 / tinyPow(5, k));
	    x = taylorSeries(Ctor, 2, x, x);

	    // Reverse argument reduction
	    var sin2_x,
	      d5 = new Ctor(5),
	      d16 = new Ctor(16),
	      d20 = new Ctor(20);
	    for (; k--;) {
	      sin2_x = x.times(x);
	      x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
	    }

	    return x;
	  }


	  // Calculate Taylor series for `cos`, `cosh`, `sin` and `sinh`.
	  function taylorSeries(Ctor, n, x, y, isHyperbolic) {
	    var j, t, u, x2,
	      pr = Ctor.precision,
	      k = Math.ceil(pr / LOG_BASE);

	    external = false;
	    x2 = x.times(x);
	    u = new Ctor(y);

	    for (;;) {
	      t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
	      u = isHyperbolic ? y.plus(t) : y.minus(t);
	      y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
	      t = u.plus(y);

	      if (t.d[k] !== void 0) {
	        for (j = k; t.d[j] === u.d[j] && j--;);
	        if (j == -1) break;
	      }

	      j = u;
	      u = y;
	      y = t;
	      t = j;
	    }

	    external = true;
	    t.d.length = k + 1;

	    return t;
	  }


	  // Exponent e must be positive and non-zero.
	  function tinyPow(b, e) {
	    var n = b;
	    while (--e) n *= b;
	    return n;
	  }


	  // Return the absolute value of `x` reduced to less than or equal to half pi.
	  function toLessThanHalfPi(Ctor, x) {
	    var t,
	      isNeg = x.s < 0,
	      pi = getPi(Ctor, Ctor.precision, 1),
	      halfPi = pi.times(0.5);

	    x = x.abs();

	    if (x.lte(halfPi)) {
	      quadrant = isNeg ? 4 : 1;
	      return x;
	    }

	    t = x.divToInt(pi);

	    if (t.isZero()) {
	      quadrant = isNeg ? 3 : 2;
	    } else {
	      x = x.minus(t.times(pi));

	      // 0 <= x < pi
	      if (x.lte(halfPi)) {
	        quadrant = isOdd(t) ? (isNeg ? 2 : 3) : (isNeg ? 4 : 1);
	        return x;
	      }

	      quadrant = isOdd(t) ? (isNeg ? 1 : 4) : (isNeg ? 3 : 2);
	    }

	    return x.minus(pi).abs();
	  }


	  /*
	   * Return the value of Decimal `x` as a string in base `baseOut`.
	   *
	   * If the optional `sd` argument is present include a binary exponent suffix.
	   */
	  function toStringBinary(x, baseOut, sd, rm) {
	    var base, e, i, k, len, roundUp, str, xd, y,
	      Ctor = x.constructor,
	      isExp = sd !== void 0;

	    if (isExp) {
	      checkInt32(sd, 1, MAX_DIGITS);
	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);
	    } else {
	      sd = Ctor.precision;
	      rm = Ctor.rounding;
	    }

	    if (!x.isFinite()) {
	      str = nonFiniteToString(x);
	    } else {
	      str = finiteToString(x);
	      i = str.indexOf('.');

	      // Use exponential notation according to `toExpPos` and `toExpNeg`? No, but if required:
	      // maxBinaryExponent = floor((decimalExponent + 1) * log[2](10))
	      // minBinaryExponent = floor(decimalExponent * log[2](10))
	      // log[2](10) = 3.321928094887362347870319429489390175864

	      if (isExp) {
	        base = 2;
	        if (baseOut == 16) {
	          sd = sd * 4 - 3;
	        } else if (baseOut == 8) {
	          sd = sd * 3 - 2;
	        }
	      } else {
	        base = baseOut;
	      }

	      // Convert the number as an integer then divide the result by its base raised to a power such
	      // that the fraction part will be restored.

	      // Non-integer.
	      if (i >= 0) {
	        str = str.replace('.', '');
	        y = new Ctor(1);
	        y.e = str.length - i;
	        y.d = convertBase(finiteToString(y), 10, base);
	        y.e = y.d.length;
	      }

	      xd = convertBase(str, 10, base);
	      e = len = xd.length;

	      // Remove trailing zeros.
	      for (; xd[--len] == 0;) xd.pop();

	      if (!xd[0]) {
	        str = isExp ? '0p+0' : '0';
	      } else {
	        if (i < 0) {
	          e--;
	        } else {
	          x = new Ctor(x);
	          x.d = xd;
	          x.e = e;
	          x = divide(x, y, sd, rm, 0, base);
	          xd = x.d;
	          e = x.e;
	          roundUp = inexact;
	        }

	        // The rounding digit, i.e. the digit after the digit that may be rounded up.
	        i = xd[sd];
	        k = base / 2;
	        roundUp = roundUp || xd[sd + 1] !== void 0;

	        roundUp = rm < 4
	          ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2))
	          : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 ||
	            rm === (x.s < 0 ? 8 : 7));

	        xd.length = sd;

	        if (roundUp) {

	          // Rounding up may mean the previous digit has to be rounded up and so on.
	          for (; ++xd[--sd] > base - 1;) {
	            xd[sd] = 0;
	            if (!sd) {
	              ++e;
	              xd.unshift(1);
	            }
	          }
	        }

	        // Determine trailing zeros.
	        for (len = xd.length; !xd[len - 1]; --len);

	        // E.g. [4, 11, 15] becomes 4bf.
	        for (i = 0, str = ''; i < len; i++) str += NUMERALS.charAt(xd[i]);

	        // Add binary exponent suffix?
	        if (isExp) {
	          if (len > 1) {
	            if (baseOut == 16 || baseOut == 8) {
	              i = baseOut == 16 ? 4 : 3;
	              for (--len; len % i; len++) str += '0';
	              xd = convertBase(str, base, baseOut);
	              for (len = xd.length; !xd[len - 1]; --len);

	              // xd[0] will always be be 1
	              for (i = 1, str = '1.'; i < len; i++) str += NUMERALS.charAt(xd[i]);
	            } else {
	              str = str.charAt(0) + '.' + str.slice(1);
	            }
	          }

	          str =  str + (e < 0 ? 'p' : 'p+') + e;
	        } else if (e < 0) {
	          for (; ++e;) str = '0' + str;
	          str = '0.' + str;
	        } else {
	          if (++e > len) for (e -= len; e-- ;) str += '0';
	          else if (e < len) str = str.slice(0, e) + '.' + str.slice(e);
	        }
	      }

	      str = (baseOut == 16 ? '0x' : baseOut == 2 ? '0b' : baseOut == 8 ? '0o' : '') + str;
	    }

	    return x.s < 0 ? '-' + str : str;
	  }


	  // Does not strip trailing zeros.
	  function truncate(arr, len) {
	    if (arr.length > len) {
	      arr.length = len;
	      return true;
	    }
	  }


	  // Decimal methods


	  /*
	   *  abs
	   *  acos
	   *  acosh
	   *  add
	   *  asin
	   *  asinh
	   *  atan
	   *  atanh
	   *  atan2
	   *  cbrt
	   *  ceil
	   *  clamp
	   *  clone
	   *  config
	   *  cos
	   *  cosh
	   *  div
	   *  exp
	   *  floor
	   *  hypot
	   *  ln
	   *  log
	   *  log2
	   *  log10
	   *  max
	   *  min
	   *  mod
	   *  mul
	   *  pow
	   *  random
	   *  round
	   *  set
	   *  sign
	   *  sin
	   *  sinh
	   *  sqrt
	   *  sub
	   *  sum
	   *  tan
	   *  tanh
	   *  trunc
	   */


	  /*
	   * Return a new Decimal whose value is the absolute value of `x`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function abs(x) {
	    return new this(x).abs();
	  }


	  /*
	   * Return a new Decimal whose value is the arccosine in radians of `x`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function acos(x) {
	    return new this(x).acos();
	  }


	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic cosine of `x`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function acosh(x) {
	    return new this(x).acosh();
	  }


	  /*
	   * Return a new Decimal whose value is the sum of `x` and `y`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function add(x, y) {
	    return new this(x).plus(y);
	  }


	  /*
	   * Return a new Decimal whose value is the arcsine in radians of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function asin(x) {
	    return new this(x).asin();
	  }


	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic sine of `x`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function asinh(x) {
	    return new this(x).asinh();
	  }


	  /*
	   * Return a new Decimal whose value is the arctangent in radians of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function atan(x) {
	    return new this(x).atan();
	  }


	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic tangent of `x`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function atanh(x) {
	    return new this(x).atanh();
	  }


	  /*
	   * Return a new Decimal whose value is the arctangent in radians of `y/x` in the range -pi to pi
	   * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-pi, pi]
	   *
	   * y {number|string|Decimal} The y-coordinate.
	   * x {number|string|Decimal} The x-coordinate.
	   *
	   * atan2(±0, -0)               = ±pi
	   * atan2(±0, +0)               = ±0
	   * atan2(±0, -x)               = ±pi for x > 0
	   * atan2(±0, x)                = ±0 for x > 0
	   * atan2(-y, ±0)               = -pi/2 for y > 0
	   * atan2(y, ±0)                = pi/2 for y > 0
	   * atan2(±y, -Infinity)        = ±pi for finite y > 0
	   * atan2(±y, +Infinity)        = ±0 for finite y > 0
	   * atan2(±Infinity, x)         = ±pi/2 for finite x
	   * atan2(±Infinity, -Infinity) = ±3*pi/4
	   * atan2(±Infinity, +Infinity) = ±pi/4
	   * atan2(NaN, x) = NaN
	   * atan2(y, NaN) = NaN
	   *
	   */
	  function atan2(y, x) {
	    y = new this(y);
	    x = new this(x);
	    var r,
	      pr = this.precision,
	      rm = this.rounding,
	      wpr = pr + 4;

	    // Either NaN
	    if (!y.s || !x.s) {
	      r = new this(NaN);

	    // Both ±Infinity
	    } else if (!y.d && !x.d) {
	      r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
	      r.s = y.s;

	    // x is ±Infinity or y is ±0
	    } else if (!x.d || y.isZero()) {
	      r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
	      r.s = y.s;

	    // y is ±Infinity or x is ±0
	    } else if (!y.d || x.isZero()) {
	      r = getPi(this, wpr, 1).times(0.5);
	      r.s = y.s;

	    // Both non-zero and finite
	    } else if (x.s < 0) {
	      this.precision = wpr;
	      this.rounding = 1;
	      r = this.atan(divide(y, x, wpr, 1));
	      x = getPi(this, wpr, 1);
	      this.precision = pr;
	      this.rounding = rm;
	      r = y.s < 0 ? r.minus(x) : r.plus(x);
	    } else {
	      r = this.atan(divide(y, x, wpr, 1));
	    }

	    return r;
	  }


	  /*
	   * Return a new Decimal whose value is the cube root of `x`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function cbrt(x) {
	    return new this(x).cbrt();
	  }


	  /*
	   * Return a new Decimal whose value is `x` rounded to an integer using `ROUND_CEIL`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function ceil(x) {
	    return finalise(x = new this(x), x.e + 1, 2);
	  }


	  /*
	   * Return a new Decimal whose value is `x` clamped to the range delineated by `min` and `max`.
	   *
	   * x {number|string|Decimal}
	   * min {number|string|Decimal}
	   * max {number|string|Decimal}
	   *
	   */
	  function clamp(x, min, max) {
	    return new this(x).clamp(min, max);
	  }


	  /*
	   * Configure global settings for a Decimal constructor.
	   *
	   * `obj` is an object with one or more of the following properties,
	   *
	   *   precision  {number}
	   *   rounding   {number}
	   *   toExpNeg   {number}
	   *   toExpPos   {number}
	   *   maxE       {number}
	   *   minE       {number}
	   *   modulo     {number}
	   *   crypto     {boolean|number}
	   *   defaults   {true}
	   *
	   * E.g. Decimal.config({ precision: 20, rounding: 4 })
	   *
	   */
	  function config(obj) {
	    if (!obj || typeof obj !== 'object') throw Error(decimalError + 'Object expected');
	    var i, p, v,
	      useDefaults = obj.defaults === true,
	      ps = [
	        'precision', 1, MAX_DIGITS,
	        'rounding', 0, 8,
	        'toExpNeg', -EXP_LIMIT, 0,
	        'toExpPos', 0, EXP_LIMIT,
	        'maxE', 0, EXP_LIMIT,
	        'minE', -EXP_LIMIT, 0,
	        'modulo', 0, 9
	      ];

	    for (i = 0; i < ps.length; i += 3) {
	      if (p = ps[i], useDefaults) this[p] = DEFAULTS[p];
	      if ((v = obj[p]) !== void 0) {
	        if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
	        else throw Error(invalidArgument + p + ': ' + v);
	      }
	    }

	    if (p = 'crypto', useDefaults) this[p] = DEFAULTS[p];
	    if ((v = obj[p]) !== void 0) {
	      if (v === true || v === false || v === 0 || v === 1) {
	        if (v) {
	          if (typeof crypto != 'undefined' && crypto &&
	            (crypto.getRandomValues || crypto.randomBytes)) {
	            this[p] = true;
	          } else {
	            throw Error(cryptoUnavailable);
	          }
	        } else {
	          this[p] = false;
	        }
	      } else {
	        throw Error(invalidArgument + p + ': ' + v);
	      }
	    }

	    return this;
	  }


	  /*
	   * Return a new Decimal whose value is the cosine of `x`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function cos(x) {
	    return new this(x).cos();
	  }


	  /*
	   * Return a new Decimal whose value is the hyperbolic cosine of `x`, rounded to precision
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function cosh(x) {
	    return new this(x).cosh();
	  }


	  /*
	   * Create and return a Decimal constructor with the same configuration properties as this Decimal
	   * constructor.
	   *
	   */
	  function clone(obj) {
	    var i, p, ps;

	    /*
	     * The Decimal constructor and exported function.
	     * Return a new Decimal instance.
	     *
	     * v {number|string|Decimal} A numeric value.
	     *
	     */
	    function Decimal(v) {
	      var e, i, t,
	        x = this;

	      // Decimal called without new.
	      if (!(x instanceof Decimal)) return new Decimal(v);

	      // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
	      // which points to Object.
	      x.constructor = Decimal;

	      // Duplicate.
	      if (isDecimalInstance(v)) {
	        x.s = v.s;

	        if (external) {
	          if (!v.d || v.e > Decimal.maxE) {

	            // Infinity.
	            x.e = NaN;
	            x.d = null;
	          } else if (v.e < Decimal.minE) {

	            // Zero.
	            x.e = 0;
	            x.d = [0];
	          } else {
	            x.e = v.e;
	            x.d = v.d.slice();
	          }
	        } else {
	          x.e = v.e;
	          x.d = v.d ? v.d.slice() : v.d;
	        }

	        return;
	      }

	      t = typeof v;

	      if (t === 'number') {
	        if (v === 0) {
	          x.s = 1 / v < 0 ? -1 : 1;
	          x.e = 0;
	          x.d = [0];
	          return;
	        }

	        if (v < 0) {
	          v = -v;
	          x.s = -1;
	        } else {
	          x.s = 1;
	        }

	        // Fast path for small integers.
	        if (v === ~~v && v < 1e7) {
	          for (e = 0, i = v; i >= 10; i /= 10) e++;

	          if (external) {
	            if (e > Decimal.maxE) {
	              x.e = NaN;
	              x.d = null;
	            } else if (e < Decimal.minE) {
	              x.e = 0;
	              x.d = [0];
	            } else {
	              x.e = e;
	              x.d = [v];
	            }
	          } else {
	            x.e = e;
	            x.d = [v];
	          }

	          return;

	        // Infinity, NaN.
	        } else if (v * 0 !== 0) {
	          if (!v) x.s = NaN;
	          x.e = NaN;
	          x.d = null;
	          return;
	        }

	        return parseDecimal(x, v.toString());

	      } else if (t !== 'string') {
	        throw Error(invalidArgument + v);
	      }

	      // Minus sign?
	      if ((i = v.charCodeAt(0)) === 45) {
	        v = v.slice(1);
	        x.s = -1;
	      } else {
	        // Plus sign?
	        if (i === 43) v = v.slice(1);
	        x.s = 1;
	      }

	      return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
	    }

	    Decimal.prototype = P;

	    Decimal.ROUND_UP = 0;
	    Decimal.ROUND_DOWN = 1;
	    Decimal.ROUND_CEIL = 2;
	    Decimal.ROUND_FLOOR = 3;
	    Decimal.ROUND_HALF_UP = 4;
	    Decimal.ROUND_HALF_DOWN = 5;
	    Decimal.ROUND_HALF_EVEN = 6;
	    Decimal.ROUND_HALF_CEIL = 7;
	    Decimal.ROUND_HALF_FLOOR = 8;
	    Decimal.EUCLID = 9;

	    Decimal.config = Decimal.set = config;
	    Decimal.clone = clone;
	    Decimal.isDecimal = isDecimalInstance;

	    Decimal.abs = abs;
	    Decimal.acos = acos;
	    Decimal.acosh = acosh;        // ES6
	    Decimal.add = add;
	    Decimal.asin = asin;
	    Decimal.asinh = asinh;        // ES6
	    Decimal.atan = atan;
	    Decimal.atanh = atanh;        // ES6
	    Decimal.atan2 = atan2;
	    Decimal.cbrt = cbrt;          // ES6
	    Decimal.ceil = ceil;
	    Decimal.clamp = clamp;
	    Decimal.cos = cos;
	    Decimal.cosh = cosh;          // ES6
	    Decimal.div = div;
	    Decimal.exp = exp;
	    Decimal.floor = floor;
	    Decimal.hypot = hypot;        // ES6
	    Decimal.ln = ln;
	    Decimal.log = log;
	    Decimal.log10 = log10;        // ES6
	    Decimal.log2 = log2;          // ES6
	    Decimal.max = max;
	    Decimal.min = min;
	    Decimal.mod = mod;
	    Decimal.mul = mul;
	    Decimal.pow = pow;
	    Decimal.random = random;
	    Decimal.round = round;
	    Decimal.sign = sign;          // ES6
	    Decimal.sin = sin;
	    Decimal.sinh = sinh;          // ES6
	    Decimal.sqrt = sqrt;
	    Decimal.sub = sub;
	    Decimal.sum = sum;
	    Decimal.tan = tan;
	    Decimal.tanh = tanh;          // ES6
	    Decimal.trunc = trunc;        // ES6

	    if (obj === void 0) obj = {};
	    if (obj) {
	      if (obj.defaults !== true) {
	        ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'];
	        for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
	      }
	    }

	    Decimal.config(obj);

	    return Decimal;
	  }


	  /*
	   * Return a new Decimal whose value is `x` divided by `y`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function div(x, y) {
	    return new this(x).div(y);
	  }


	  /*
	   * Return a new Decimal whose value is the natural exponential of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} The power to which to raise the base of the natural log.
	   *
	   */
	  function exp(x) {
	    return new this(x).exp();
	  }


	  /*
	   * Return a new Decimal whose value is `x` round to an integer using `ROUND_FLOOR`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function floor(x) {
	    return finalise(x = new this(x), x.e + 1, 3);
	  }


	  /*
	   * Return a new Decimal whose value is the square root of the sum of the squares of the arguments,
	   * rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   * hypot(a, b, ...) = sqrt(a^2 + b^2 + ...)
	   *
	   * arguments {number|string|Decimal}
	   *
	   */
	  function hypot() {
	    var i, n,
	      t = new this(0);

	    external = false;

	    for (i = 0; i < arguments.length;) {
	      n = new this(arguments[i++]);
	      if (!n.d) {
	        if (n.s) {
	          external = true;
	          return new this(1 / 0);
	        }
	        t = n;
	      } else if (t.d) {
	        t = t.plus(n.times(n));
	      }
	    }

	    external = true;

	    return t.sqrt();
	  }


	  /*
	   * Return true if object is a Decimal instance (where Decimal is any Decimal constructor),
	   * otherwise return false.
	   *
	   */
	  function isDecimalInstance(obj) {
	    return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
	  }


	  /*
	   * Return a new Decimal whose value is the natural logarithm of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function ln(x) {
	    return new this(x).ln();
	  }


	  /*
	   * Return a new Decimal whose value is the log of `x` to the base `y`, or to base 10 if no base
	   * is specified, rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   * log[y](x)
	   *
	   * x {number|string|Decimal} The argument of the logarithm.
	   * y {number|string|Decimal} The base of the logarithm.
	   *
	   */
	  function log(x, y) {
	    return new this(x).log(y);
	  }


	  /*
	   * Return a new Decimal whose value is the base 2 logarithm of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function log2(x) {
	    return new this(x).log(2);
	  }


	  /*
	   * Return a new Decimal whose value is the base 10 logarithm of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function log10(x) {
	    return new this(x).log(10);
	  }


	  /*
	   * Return a new Decimal whose value is the maximum of the arguments.
	   *
	   * arguments {number|string|Decimal}
	   *
	   */
	  function max() {
	    return maxOrMin(this, arguments, 'lt');
	  }


	  /*
	   * Return a new Decimal whose value is the minimum of the arguments.
	   *
	   * arguments {number|string|Decimal}
	   *
	   */
	  function min() {
	    return maxOrMin(this, arguments, 'gt');
	  }


	  /*
	   * Return a new Decimal whose value is `x` modulo `y`, rounded to `precision` significant digits
	   * using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function mod(x, y) {
	    return new this(x).mod(y);
	  }


	  /*
	   * Return a new Decimal whose value is `x` multiplied by `y`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function mul(x, y) {
	    return new this(x).mul(y);
	  }


	  /*
	   * Return a new Decimal whose value is `x` raised to the power `y`, rounded to precision
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} The base.
	   * y {number|string|Decimal} The exponent.
	   *
	   */
	  function pow(x, y) {
	    return new this(x).pow(y);
	  }


	  /*
	   * Returns a new Decimal with a random value equal to or greater than 0 and less than 1, and with
	   * `sd`, or `Decimal.precision` if `sd` is omitted, significant digits (or less if trailing zeros
	   * are produced).
	   *
	   * [sd] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
	   *
	   */
	  function random(sd) {
	    var d, e, k, n,
	      i = 0,
	      r = new this(1),
	      rd = [];

	    if (sd === void 0) sd = this.precision;
	    else checkInt32(sd, 1, MAX_DIGITS);

	    k = Math.ceil(sd / LOG_BASE);

	    if (!this.crypto) {
	      for (; i < k;) rd[i++] = Math.random() * 1e7 | 0;

	    // Browsers supporting crypto.getRandomValues.
	    } else if (crypto.getRandomValues) {
	      d = crypto.getRandomValues(new Uint32Array(k));

	      for (; i < k;) {
	        n = d[i];

	        // 0 <= n < 4294967296
	        // Probability n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).
	        if (n >= 4.29e9) {
	          d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
	        } else {

	          // 0 <= n <= 4289999999
	          // 0 <= (n % 1e7) <= 9999999
	          rd[i++] = n % 1e7;
	        }
	      }

	    // Node.js supporting crypto.randomBytes.
	    } else if (crypto.randomBytes) {

	      // buffer
	      d = crypto.randomBytes(k *= 4);

	      for (; i < k;) {

	        // 0 <= n < 2147483648
	        n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 0x7f) << 24);

	        // Probability n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).
	        if (n >= 2.14e9) {
	          crypto.randomBytes(4).copy(d, i);
	        } else {

	          // 0 <= n <= 2139999999
	          // 0 <= (n % 1e7) <= 9999999
	          rd.push(n % 1e7);
	          i += 4;
	        }
	      }

	      i = k / 4;
	    } else {
	      throw Error(cryptoUnavailable);
	    }

	    k = rd[--i];
	    sd %= LOG_BASE;

	    // Convert trailing digits to zeros according to sd.
	    if (k && sd) {
	      n = mathpow(10, LOG_BASE - sd);
	      rd[i] = (k / n | 0) * n;
	    }

	    // Remove trailing words which are zero.
	    for (; rd[i] === 0; i--) rd.pop();

	    // Zero?
	    if (i < 0) {
	      e = 0;
	      rd = [0];
	    } else {
	      e = -1;

	      // Remove leading words which are zero and adjust exponent accordingly.
	      for (; rd[0] === 0; e -= LOG_BASE) rd.shift();

	      // Count the digits of the first word of rd to determine leading zeros.
	      for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;

	      // Adjust the exponent for leading zeros of the first word of rd.
	      if (k < LOG_BASE) e -= LOG_BASE - k;
	    }

	    r.e = e;
	    r.d = rd;

	    return r;
	  }


	  /*
	   * Return a new Decimal whose value is `x` rounded to an integer using rounding mode `rounding`.
	   *
	   * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function round(x) {
	    return finalise(x = new this(x), x.e + 1, this.rounding);
	  }


	  /*
	   * Return
	   *   1    if x > 0,
	   *  -1    if x < 0,
	   *   0    if x is 0,
	   *  -0    if x is -0,
	   *   NaN  otherwise
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function sign(x) {
	    x = new this(x);
	    return x.d ? (x.d[0] ? x.s : 0 * x.s) : x.s || NaN;
	  }


	  /*
	   * Return a new Decimal whose value is the sine of `x`, rounded to `precision` significant digits
	   * using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function sin(x) {
	    return new this(x).sin();
	  }


	  /*
	   * Return a new Decimal whose value is the hyperbolic sine of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function sinh(x) {
	    return new this(x).sinh();
	  }


	  /*
	   * Return a new Decimal whose value is the square root of `x`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function sqrt(x) {
	    return new this(x).sqrt();
	  }


	  /*
	   * Return a new Decimal whose value is `x` minus `y`, rounded to `precision` significant digits
	   * using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function sub(x, y) {
	    return new this(x).sub(y);
	  }


	  /*
	   * Return a new Decimal whose value is the sum of the arguments, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * Only the result is rounded, not the intermediate calculations.
	   *
	   * arguments {number|string|Decimal}
	   *
	   */
	  function sum() {
	    var i = 0,
	      args = arguments,
	      x = new this(args[i]);

	    external = false;
	    for (; x.s && ++i < args.length;) x = x.plus(args[i]);
	    external = true;

	    return finalise(x, this.precision, this.rounding);
	  }


	  /*
	   * Return a new Decimal whose value is the tangent of `x`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function tan(x) {
	    return new this(x).tan();
	  }


	  /*
	   * Return a new Decimal whose value is the hyperbolic tangent of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function tanh(x) {
	    return new this(x).tanh();
	  }


	  /*
	   * Return a new Decimal whose value is `x` truncated to an integer.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function trunc(x) {
	    return finalise(x = new this(x), x.e + 1, 1);
	  }


	  // Create and configure initial Decimal constructor.
	  Decimal = clone(DEFAULTS);
	  Decimal.prototype.constructor = Decimal;
	  Decimal['default'] = Decimal.Decimal = Decimal;

	  // Create the internal constants from their string values.
	  LN10 = new Decimal(LN10);
	  PI = new Decimal(PI);


	  // Export.


	  // AMD.
	  if (module.exports) {
	    if (typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol') {
	      P[Symbol['for']('nodejs.util.inspect.custom')] = P.toString;
	      P[Symbol.toStringTag] = 'Decimal';
	    }

	    module.exports = Decimal;

	  // Browser.
	  } else {
	    if (!globalScope) {
	      globalScope = typeof self != 'undefined' && self && self.self == self ? self : window;
	    }

	    noConflict = globalScope.Decimal;
	    Decimal.noConflict = function () {
	      globalScope.Decimal = noConflict;
	      return Decimal;
	    };

	    globalScope.Decimal = Decimal;
	  }
	})(commonjsGlobal);
} (decimal));

var Event = /*#__PURE__*/function () {
  function Event(opts) {
    _classCallCheck(this, Event);

    _defineProperty(this, "callbacks", {});

    if (typeof opts !== 'undefined' && opts.callbacks) {
      this.callbacks = opts.callbacks;
    } else {
      this.callbacks = {};
    }
  }

  _createClass(Event, [{
    key: "on",
    value: function on(eventName, callback, context) {
      var event, node, tail, list;

      if (!callback) {
        return this;
      }

      eventName = eventName.split(Event.eventSplitter);
      var calls = this.callbacks;

      while (event = eventName.shift()) {
        list = calls[event];
        node = list ? list.tail : {};
        node.next = tail = {};
        node.context = context;
        node.callback = callback;
        calls[event] = {
          tail: tail,
          next: list ? list.next : node
        };
      }

      return this;
    }
  }, {
    key: "once",
    value: function once(events, callback, context) {
      var _this = this;

      var wrapper = function wrapper() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        callback.apply(_this, args);

        _this.off(events, wrapper, context);
      };

      this.on(events, wrapper, context);
      return this;
    }
    /**
     * 如果什么都不传就off全部事件
     * @param events
     * @param callback
     * @param context
     */

  }, {
    key: "off",
    value: function off(events, callback, context) {
      var event, calls, node, tail, cb, ctx;

      if (!(calls = this.callbacks)) {
        return this;
      }

      if (!(events || callback || context)) {
        this.callbacks = {};
        return this;
      }

      events = events ? events.split(Event.eventSplitter) : Object.keys(calls);

      while (event = events.shift()) {
        node = calls[event];
        delete calls[event];

        if (!node || !(callback || context)) {
          continue;
        }

        tail = node.tail;

        while ((node = node.next) !== tail) {
          cb = node.callback;
          ctx = node.context;

          if (callback && cb !== callback || context && ctx !== context) {
            this.on(event, cb, ctx);
          }
        }
      }

      return this;
    }
  }, {
    key: "trigger",
    value: function trigger(events) {
      var event, node, calls, tail;

      if (!(calls = this.callbacks)) {
        return this;
      }

      events = events.split(Event.eventSplitter); // eslint-disable-next-line prefer-rest-params

      var rest = [].slice.call(arguments, 1);

      while (event = events.shift()) {
        if (node = calls[event]) {
          tail = node.tail;

          while ((node = node.next) !== tail) {
            node.callback.apply(node.context || this, rest);
          }
        }
      }

      return this;
    }
  }]);

  return Event;
}();

_defineProperty(Event, "eventSplitter", /\s+/);

var queryString = {};

var strictUriEncode = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

var decodeUriComponent = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};

var splitOnFirst = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};

var filterObj = function (obj, predicate) {
	var ret = {};
	var keys = Object.keys(obj);
	var isArr = Array.isArray(predicate);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var val = obj[key];

		if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
			ret[key] = val;
		}
	}

	return ret;
};

(function (exports) {
	const strictUriEncode$1 = strictUriEncode;
	const decodeComponent = decodeUriComponent;
	const splitOnFirst$1 = splitOnFirst;
	const filterObject = filterObj;

	const isNullOrUndefined = value => value === null || value === undefined;

	const encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');

	function encoderForArrayFormat(options) {
		switch (options.arrayFormat) {
			case 'index':
				return key => (result, value) => {
					const index = result.length;

					if (
						value === undefined ||
						(options.skipNull && value === null) ||
						(options.skipEmptyString && value === '')
					) {
						return result;
					}

					if (value === null) {
						return [...result, [encode(key, options), '[', index, ']'].join('')];
					}

					return [
						...result,
						[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
					];
				};

			case 'bracket':
				return key => (result, value) => {
					if (
						value === undefined ||
						(options.skipNull && value === null) ||
						(options.skipEmptyString && value === '')
					) {
						return result;
					}

					if (value === null) {
						return [...result, [encode(key, options), '[]'].join('')];
					}

					return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
				};

			case 'colon-list-separator':
				return key => (result, value) => {
					if (
						value === undefined ||
						(options.skipNull && value === null) ||
						(options.skipEmptyString && value === '')
					) {
						return result;
					}

					if (value === null) {
						return [...result, [encode(key, options), ':list='].join('')];
					}

					return [...result, [encode(key, options), ':list=', encode(value, options)].join('')];
				};

			case 'comma':
			case 'separator':
			case 'bracket-separator': {
				const keyValueSep = options.arrayFormat === 'bracket-separator' ?
					'[]=' :
					'=';

				return key => (result, value) => {
					if (
						value === undefined ||
						(options.skipNull && value === null) ||
						(options.skipEmptyString && value === '')
					) {
						return result;
					}

					// Translate null to an empty string so that it doesn't serialize as 'null'
					value = value === null ? '' : value;

					if (result.length === 0) {
						return [[encode(key, options), keyValueSep, encode(value, options)].join('')];
					}

					return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
				};
			}

			default:
				return key => (result, value) => {
					if (
						value === undefined ||
						(options.skipNull && value === null) ||
						(options.skipEmptyString && value === '')
					) {
						return result;
					}

					if (value === null) {
						return [...result, encode(key, options)];
					}

					return [...result, [encode(key, options), '=', encode(value, options)].join('')];
				};
		}
	}

	function parserForArrayFormat(options) {
		let result;

		switch (options.arrayFormat) {
			case 'index':
				return (key, value, accumulator) => {
					result = /\[(\d*)\]$/.exec(key);

					key = key.replace(/\[\d*\]$/, '');

					if (!result) {
						accumulator[key] = value;
						return;
					}

					if (accumulator[key] === undefined) {
						accumulator[key] = {};
					}

					accumulator[key][result[1]] = value;
				};

			case 'bracket':
				return (key, value, accumulator) => {
					result = /(\[\])$/.exec(key);
					key = key.replace(/\[\]$/, '');

					if (!result) {
						accumulator[key] = value;
						return;
					}

					if (accumulator[key] === undefined) {
						accumulator[key] = [value];
						return;
					}

					accumulator[key] = [].concat(accumulator[key], value);
				};

			case 'colon-list-separator':
				return (key, value, accumulator) => {
					result = /(:list)$/.exec(key);
					key = key.replace(/:list$/, '');

					if (!result) {
						accumulator[key] = value;
						return;
					}

					if (accumulator[key] === undefined) {
						accumulator[key] = [value];
						return;
					}

					accumulator[key] = [].concat(accumulator[key], value);
				};

			case 'comma':
			case 'separator':
				return (key, value, accumulator) => {
					const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
					const isEncodedArray = (typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator));
					value = isEncodedArray ? decode(value, options) : value;
					const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
					accumulator[key] = newValue;
				};

			case 'bracket-separator':
				return (key, value, accumulator) => {
					const isArray = /(\[\])$/.test(key);
					key = key.replace(/\[\]$/, '');

					if (!isArray) {
						accumulator[key] = value ? decode(value, options) : value;
						return;
					}

					const arrayValue = value === null ?
						[] :
						value.split(options.arrayFormatSeparator).map(item => decode(item, options));

					if (accumulator[key] === undefined) {
						accumulator[key] = arrayValue;
						return;
					}

					accumulator[key] = [].concat(accumulator[key], arrayValue);
				};

			default:
				return (key, value, accumulator) => {
					if (accumulator[key] === undefined) {
						accumulator[key] = value;
						return;
					}

					accumulator[key] = [].concat(accumulator[key], value);
				};
		}
	}

	function validateArrayFormatSeparator(value) {
		if (typeof value !== 'string' || value.length !== 1) {
			throw new TypeError('arrayFormatSeparator must be single character string');
		}
	}

	function encode(value, options) {
		if (options.encode) {
			return options.strict ? strictUriEncode$1(value) : encodeURIComponent(value);
		}

		return value;
	}

	function decode(value, options) {
		if (options.decode) {
			return decodeComponent(value);
		}

		return value;
	}

	function keysSorter(input) {
		if (Array.isArray(input)) {
			return input.sort();
		}

		if (typeof input === 'object') {
			return keysSorter(Object.keys(input))
				.sort((a, b) => Number(a) - Number(b))
				.map(key => input[key]);
		}

		return input;
	}

	function removeHash(input) {
		const hashStart = input.indexOf('#');
		if (hashStart !== -1) {
			input = input.slice(0, hashStart);
		}

		return input;
	}

	function getHash(url) {
		let hash = '';
		const hashStart = url.indexOf('#');
		if (hashStart !== -1) {
			hash = url.slice(hashStart);
		}

		return hash;
	}

	function extract(input) {
		input = removeHash(input);
		const queryStart = input.indexOf('?');
		if (queryStart === -1) {
			return '';
		}

		return input.slice(queryStart + 1);
	}

	function parseValue(value, options) {
		if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
			value = Number(value);
		} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
			value = value.toLowerCase() === 'true';
		}

		return value;
	}

	function parse(query, options) {
		options = Object.assign({
			decode: true,
			sort: true,
			arrayFormat: 'none',
			arrayFormatSeparator: ',',
			parseNumbers: false,
			parseBooleans: false
		}, options);

		validateArrayFormatSeparator(options.arrayFormatSeparator);

		const formatter = parserForArrayFormat(options);

		// Create an object with no prototype
		const ret = Object.create(null);

		if (typeof query !== 'string') {
			return ret;
		}

		query = query.trim().replace(/^[?#&]/, '');

		if (!query) {
			return ret;
		}

		for (const param of query.split('&')) {
			if (param === '') {
				continue;
			}

			let [key, value] = splitOnFirst$1(options.decode ? param.replace(/\+/g, ' ') : param, '=');

			// Missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			value = value === undefined ? null : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat) ? value : decode(value, options);
			formatter(decode(key, options), value, ret);
		}

		for (const key of Object.keys(ret)) {
			const value = ret[key];
			if (typeof value === 'object' && value !== null) {
				for (const k of Object.keys(value)) {
					value[k] = parseValue(value[k], options);
				}
			} else {
				ret[key] = parseValue(value, options);
			}
		}

		if (options.sort === false) {
			return ret;
		}

		return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
			const value = ret[key];
			if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
				// Sort object keys, not values
				result[key] = keysSorter(value);
			} else {
				result[key] = value;
			}

			return result;
		}, Object.create(null));
	}

	exports.extract = extract;
	exports.parse = parse;

	exports.stringify = (object, options) => {
		if (!object) {
			return '';
		}

		options = Object.assign({
			encode: true,
			strict: true,
			arrayFormat: 'none',
			arrayFormatSeparator: ','
		}, options);

		validateArrayFormatSeparator(options.arrayFormatSeparator);

		const shouldFilter = key => (
			(options.skipNull && isNullOrUndefined(object[key])) ||
			(options.skipEmptyString && object[key] === '')
		);

		const formatter = encoderForArrayFormat(options);

		const objectCopy = {};

		for (const key of Object.keys(object)) {
			if (!shouldFilter(key)) {
				objectCopy[key] = object[key];
			}
		}

		const keys = Object.keys(objectCopy);

		if (options.sort !== false) {
			keys.sort(options.sort);
		}

		return keys.map(key => {
			const value = object[key];

			if (value === undefined) {
				return '';
			}

			if (value === null) {
				return encode(key, options);
			}

			if (Array.isArray(value)) {
				if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
					return encode(key, options) + '[]';
				}

				return value
					.reduce(formatter(key), [])
					.join('&');
			}

			return encode(key, options) + '=' + encode(value, options);
		}).filter(x => x.length > 0).join('&');
	};

	exports.parseUrl = (url, options) => {
		options = Object.assign({
			decode: true
		}, options);

		const [url_, hash] = splitOnFirst$1(url, '#');

		return Object.assign(
			{
				url: url_.split('?')[0] || '',
				query: parse(extract(url), options)
			},
			options && options.parseFragmentIdentifier && hash ? {fragmentIdentifier: decode(hash, options)} : {}
		);
	};

	exports.stringifyUrl = (object, options) => {
		options = Object.assign({
			encode: true,
			strict: true,
			[encodeFragmentIdentifier]: true
		}, options);

		const url = removeHash(object.url).split('?')[0] || '';
		const queryFromUrl = exports.extract(object.url);
		const parsedQueryFromUrl = exports.parse(queryFromUrl, {sort: false});

		const query = Object.assign(parsedQueryFromUrl, object.query);
		let queryString = exports.stringify(query, options);
		if (queryString) {
			queryString = `?${queryString}`;
		}

		let hash = getHash(object.url);
		if (object.fragmentIdentifier) {
			hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
		}

		return `${url}${queryString}${hash}`;
	};

	exports.pick = (input, filter, options) => {
		options = Object.assign({
			parseFragmentIdentifier: true,
			[encodeFragmentIdentifier]: false
		}, options);

		const {url, query, fragmentIdentifier} = exports.parseUrl(input, options);
		return exports.stringifyUrl({
			url,
			query: filterObject(query, filter),
			fragmentIdentifier
		}, options);
	};

	exports.exclude = (input, filter, options) => {
		const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);

		return exports.pick(input, exclusionFilter, options);
	};
} (queryString));

var eventCenterKey = '__planjs_event_center__';
root[eventCenterKey] || (root[eventCenterKey] = new Event());

console.log(root);
