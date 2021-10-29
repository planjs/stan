(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@planjs/utils')) :
	typeof define === 'function' && define.amd ? define(['@planjs/utils'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils));
})(this, (function (utils) { 'use strict';

	console.log(utils.global);

}));
