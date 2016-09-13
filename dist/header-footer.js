/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _header = __webpack_require__(1);

	var _header2 = _interopRequireDefault(_header);

	var _footer = __webpack_require__(13);

	var _footer2 = _interopRequireDefault(_footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var headerVm = new Vue({
	    el: "header",
	    components: {
	        ComHeader: _header2.default
	    }
	});
	var footerVm = new Vue({
	    el: "footer",
	    components: {
	        ComFooter: _footer2.default
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(2)
	__vue_script__ = __webpack_require__(7)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\header.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(12)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./header.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./header.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./header.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	exports.i(__webpack_require__(5), "");

	// module
	exports.push([module.id, "\n*,article,section,ul,div,p,td,li{\n    margin: 0;padding: 0;\n}\nhtml {font-size: 62.5%;/*10 ÷ 16 × 100% = 62.5%*/}\nbody {font-size: 1.4rem;/*1.4 × 10px = 14px */\n    font-family: 'microsoft yahei', Verdana, Arial, Helvetica, sans-serif;\n    min-width: 1024px;   \n    max-width: 80%;    \n    margin: 0 auto;\n}\n\nh1 { font-size: 2.4rem;/*2.4 × 10px = 24px*/}\n\n\n/*顶部导航开始*/\n.navbar{\n    width: 100%;\n    margin: 0 auto;\n}\n\n.navbar .container-fluid{\n    position: relative;\n    padding: 0;\n    background: #ffffff;\n}\n.brand{\n    float: left;\n    width: 25.8rem;\n    height: 5.2rem;\n}\n\n.nav-list{\n    list-style: none;\n    float: left;\n    border-left: 1px solid lightgrey;\n    font-size: 14px;\n    font-weight: 400;\n    color: #797979!important;\n    cursor: pointer;\n}\n.navbar-link.com-portal:hover{\n    background: #00a2e5;\n    color: #ffffff;\n}\n.dep-portal:hover{\n    background: #FFB341;\n    color: #ffffff;\n}\n.navbar-link.workbench:hover{\n    background: #ABCB27;\n    color: #ffffff;\n}\n\n.navbar-link{\n    display: inline-block;\n    height: 100%;\n    position: relative;\n    padding:0 3rem;\n    color: #797979;\n    width: 100%;\n}\n\n.nav-list .navbar-link:hover{\n    color: #ffffff;\n    text-decoration: none;\n\n}\n.nav-list .active{\n    color: #0066cc;\n}\n.nav-list-item{\n    float: left;\n    border-right: 1px solid lightgrey;\n    line-height: 5.2rem;\n    text-align: center;\n    min-width: 15rem;\n}\n.user-container{\n    border-left: none;text-align: center;width: 17rem;float: right;\n} @media screen and (min-width:1024px) and (max-width: 1235px){\n     .nav-action .search{\n        padding-right: 22px!important;\n}\n}\n @media screen and (min-width:1024px) and (max-width:1350px){\n .nav-list-item{\n    float: left;\n    border-right: 1px solid lightgrey;\n    line-height: 5.2rem;\n    text-align: center;\n    width: auto;\n    min-width: 0!important;\n}\n.navbar-link{\n    padding: 0 2rem;\n}\n.nav-action .search{\n    min-width: 0!important;\n    border-right: none;\n}\n.user-container{\nwidth: 16rem;\n}\n}\n.nav-action{\n    /*border: 1px solid blue;*/\n   float: right;\n    line-height: 3.2rem;\n    font-size: 1.6rem;\n    font-weight: 700;\n    color: grey;\n    margin-right:10px;\n}.nav-action::after{\n    display: inline-block;\n    width: 0;\n    height: 0;\n    content: \"\";\n}\n.nav-action .login{\n    min-width:12rem;\n    text-align: center;\n}\n.nav-action .search{\n    border-left: solid 1px lightgrey;\n    text-align: center;\n    min-width: 0!important;\n}\n.nav-action .form-control{\n    display: inline;\n    width: 12rem;\n}\n.nav-action .search{\n    padding-left:5%;\n    padding-right: 5%;\n    border-right: none!important;\n}\n.search input{width: 70%;}\n.user{\noverflow: hidden;\nheight: 4.2rem;\n}\n.nav-link{\n    position: relative;\n}\n.nav-panel{\n    background-color: white;\n    display: none;\n    left: 0;\n    top: 0;\n    position: absolute;\n    margin-top: 5.2rem;\n    width: 100%;\n    height: 16.5rem;\n    z-index: 1030;\n    font-size: 14px;\n    font-weight: 400;\n    color: #797979!important;\n    margin-left: 0!important;\n    margin-right: 0!important;\n    border: 1px solid lightgrey;\n    overflow: hidden;\n}\n.nav-panel .title{\n        margin-bottom: -2rem;\n}\n\n.nav-panel ul{\n    padding: 0 2rem;\n    list-style: none;\n}\n\n.nav-panel .list-item{\n    float: left;\n    width: 14%;\n    text-align: center;\n    margin-bottom: -1.5rem;\n}\n.company .btn:hover{\n    background-color: #00a2e5;\n    color:#fff\n}\n.dept-subj .btn:hover{\n    background-color: #FFB341;\n    color:#fff\n}\n.dept-subj .list-item{\n    width: 25%;\n}\n\n\n.list.dept{\n    position: relative;\n}\n.dept .split{\n    position: absolute;\n    top: 0;\n    right: 0;\n    height: 16.4rem;\n    border-right: 1px solid lightgrey;\n}\n/*顶部导航结束*/\n/*logo*/\n.logo{\n    width: 100%;\n    padding: 1px;\n    height: 16.5rem;\n}\n/*logo end*/\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "/*\n * Swiper 2.7.6\n * Mobile touch slider and framework with hardware accelerated transitions\n *\n * http://www.idangero.us/sliders/swiper/\n *\n * Copyright 2010-2015, Vladimir Kharlampidi\n * The iDangero.us\n * http://www.idangero.us/\n *\n * Licensed under GPL & MIT\n *\n * Released on: February 11, 2015\n*/\n/* ===============================================================\nBasic Swiper Styles \n================================================================*/\n.swiper-container {\n\tmargin:0 auto;\n\tposition:relative;\n\toverflow:hidden;\n\tdirection:ltr;\n\t-webkit-backface-visibility:hidden;\n\t-moz-backface-visibility:hidden;\n\t-ms-backface-visibility:hidden;\n\t-o-backface-visibility:hidden;\n\tbackface-visibility:hidden;\n\t/* Fix of Webkit flickering */\n\tz-index:1;\n}\n.swiper-wrapper {\n\tposition:relative;\n\twidth:100%;\n\t-webkit-transition-property:-webkit-transform, left, top;\n\t-webkit-transition-duration:0s;\n\t-webkit-transform:translate3d(0px,0,0);\n\t-webkit-transition-timing-function:ease;\n\t\n\t-moz-transition-property:-moz-transform, left, top;\n\t-moz-transition-duration:0s;\n\t-moz-transform:translate3d(0px,0,0);\n\t-moz-transition-timing-function:ease;\n\t\n\t-o-transition-property:-o-transform, left, top;\n\t-o-transition-duration:0s;\n\t-o-transform:translate3d(0px,0,0);\n\t-o-transition-timing-function:ease;\n\t-o-transform:translate(0px,0px);\n\t\n\t-ms-transition-property:-ms-transform, left, top;\n\t-ms-transition-duration:0s;\n\t-ms-transform:translate3d(0px,0,0);\n\t-ms-transition-timing-function:ease;\n\t\n\ttransition-property:transform, left, top;\n\ttransition-duration:0s;\n\ttransform:translate3d(0px,0,0);\n\ttransition-timing-function:ease;\n\n\t-webkit-box-sizing: content-box;\n\t-moz-box-sizing: content-box;\n\tbox-sizing: content-box;\n}\n.swiper-free-mode > .swiper-wrapper {\n\t-webkit-transition-timing-function: ease-out;\n\t-moz-transition-timing-function: ease-out;\n\t-ms-transition-timing-function: ease-out;\n\t-o-transition-timing-function: ease-out;\n\ttransition-timing-function: ease-out;\n\tmargin: 0 auto;\n}\n.swiper-slide {\n\tfloat: left;\n\t-webkit-box-sizing: content-box;\n\t-moz-box-sizing: content-box;\n\tbox-sizing: content-box;\n}\n\n/* IE10 Windows Phone 8 Fixes */\n.swiper-wp8-horizontal {\n\t-ms-touch-action: pan-y;\n}\n.swiper-wp8-vertical {\n\t-ms-touch-action: pan-x;\n}\n\n/* ===============================================================\nYour custom styles, here you need to specify container's and slide's\nsizes, pagination, etc.\n================================================================*/\n.swiper-container {\n\t/* Specify Swiper's Size: */\n\n\t/*width:200px;\n\theight: 100px;*/\n}\n.swiper-slide {\n\t/* Specify Slides's Size: */\n\t\n\t/*width: 100%;\n\theight: 100%;*/\n}\n.swiper-slide-active {\n\t/* Specific active slide styling: */\n\t\n}\n.swiper-slide-visible {\n\t/* Specific visible slide styling: */\t\n\n}\n/* ===============================================================\nPagination Styles\n================================================================*/\n.swiper-pagination-switch {\n\t/* Stylize pagination button: */\t\n\n}\n.swiper-active-switch {\n\t/* Specific active button style: */\t\n\t\n}\n.swiper-visible-switch {\n\t/* Specific visible button style: */\t\n\t\n}\n", ""]);

	// exports


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _commonFunction = __webpack_require__(8);

	var portalRequest = window.interfaceSettings.portalRequest; // <style>
	//     *,article,section,ul,div,p,td,li{
	//         margin: 0;padding: 0;
	//     }
	//     html {font-size: 62.5%;/*10 ÷ 16 × 100% = 62.5%*/}
	//     body {font-size: 1.4rem;/*1.4 × 10px = 14px */
	//         font-family: 'microsoft yahei', Verdana, Arial, Helvetica, sans-serif;
	//         min-width: 1024px;  
	//         max-width: 80%;   
	//         margin: 0 auto;
	//     }
	//
	//     h1 { font-size: 2.4rem;/*2.4 × 10px = 24px*/}
	//
	//
	//     /*顶部导航开始*/
	//     .navbar{
	//         width: 100%;
	//         margin: 0 auto;
	//     }
	//
	//     .navbar .container-fluid{
	//         position: relative;
	//         padding: 0;
	//         background: #ffffff;
	//     }
	//     .brand{
	//         float: left;
	//         width: 25.8rem;
	//         height: 5.2rem;
	//     }
	//
	//     .nav-list{
	//         list-style: none;
	//         float: left;
	//         border-left: 1px solid lightgrey;
	//         font-size: 14px;
	//         font-weight: 400;
	//         color: #797979!important;
	//         cursor: pointer;
	//     }
	//     .navbar-link.com-portal:hover{
	//         background: #00a2e5;
	//         color: #ffffff;
	//     }
	//     .dep-portal:hover{
	//         background: #FFB341;
	//         color: #ffffff;
	//     }
	//     .navbar-link.workbench:hover{
	//         background: #ABCB27;
	//         color: #ffffff;
	//     }
	//
	//     .navbar-link{
	//         display: inline-block;
	//         height: 100%;
	//         position: relative;
	//         padding:0 3rem;
	//         color: #797979;
	//         width: 100%;
	//     }
	//
	//     .nav-list .navbar-link:hover{
	//         color: #ffffff;
	//         text-decoration: none;
	//
	//     }
	//     .nav-list .active{
	//         color: #0066cc;
	//     }
	//     .nav-list-item{
	//         float: left;
	//         border-right: 1px solid lightgrey;
	//         line-height: 5.2rem;
	//         text-align: center;
	//         min-width: 15rem;
	//     }
	//     .user-container{
	//         border-left: none;text-align: center;width: 17rem;float: right;
	//     } @media screen and (min-width:1024px) and (max-width: 1235px){
	//          .nav-action .search{
	//             padding-right: 22px!important;
	//     }
	//     }
	//      @media screen and (min-width:1024px) and (max-width:1350px){
	//      .nav-list-item{
	//         float: left;
	//         border-right: 1px solid lightgrey;
	//         line-height: 5.2rem;
	//         text-align: center;
	//         width: auto;
	//         min-width: 0!important;
	//     }
	//     .navbar-link{
	//         padding: 0 2rem;
	//     }
	//     .nav-action .search{
	//         min-width: 0!important;
	//         border-right: none;
	//     }
	//     .user-container{
	//     width: 16rem;
	//     }
	//     }
	//     .nav-action{
	//         /*border: 1px solid blue;*/
	//        float: right;
	//         line-height: 3.2rem;
	//         font-size: 1.6rem;
	//         font-weight: 700;
	//         color: grey;
	//         margin-right:10px;
	//     }.nav-action::after{
	//         display: inline-block;
	//         width: 0;
	//         height: 0;
	//         content: "";
	//     }
	//     .nav-action .login{
	//         min-width:12rem;
	//         text-align: center;
	//     }
	//     .nav-action .search{
	//         border-left: solid 1px lightgrey;
	//         text-align: center;
	//         min-width: 0!important;
	//     }
	//     .nav-action .form-control{
	//         display: inline;
	//         width: 12rem;
	//     }
	//     .nav-action .search{
	//         padding-left:5%;
	//         padding-right: 5%;
	//         border-right: none!important;
	//     }
	//     .search input{width: 70%;}
	//     .user{
	//     overflow: hidden;
	//     height: 4.2rem;
	//     }
	//     .nav-link{
	//         position: relative;
	//     }
	//     .nav-panel{
	//         background-color: white;
	//         display: none;
	//         left: 0;
	//         top: 0;
	//         position: absolute;
	//         margin-top: 5.2rem;
	//         width: 100%;
	//         height: 16.5rem;
	//         z-index: 1030;
	//         font-size: 14px;
	//         font-weight: 400;
	//         color: #797979!important;
	//         margin-left: 0!important;
	//         margin-right: 0!important;
	//         border: 1px solid lightgrey;
	//         overflow: hidden;
	//     }
	//     .nav-panel .title{
	//             margin-bottom: -2rem;
	//     }
	//
	//     .nav-panel ul{
	//         padding: 0 2rem;
	//         list-style: none;
	//     }
	//
	//     .nav-panel .list-item{
	//         float: left;
	//         width: 14%;
	//         text-align: center;
	//         margin-bottom: -1.5rem;
	//     }
	//     .company .btn:hover{
	//         background-color: #00a2e5;
	//         color:#fff
	//     }
	//     .dept-subj .btn:hover{
	//         background-color: #FFB341;
	//         color:#fff
	//     }
	//     .dept-subj .list-item{
	//         width: 25%;
	//     }
	//
	//
	//     .list.dept{
	//         position: relative;
	//     }
	//     .dept .split{
	//         position: absolute;
	//         top: 0;
	//         right: 0;
	//         height: 16.4rem;
	//         border-right: 1px solid lightgrey;
	//     }
	//     /*顶部导航结束*/
	//     /*logo*/
	//     .logo{
	//         width: 100%;
	//         padding: 1px;
	//         height: 16.5rem;
	//     }
	//     @import './swiper/idangerous.swiper2.7.6.css';
	//     /*logo end*/
	// </style>
	// <template>
	//     <!--<base href="../../../">-->
	//     <div class="navbar navbar-default">
	//         <div class="container-fluid nav-header">
	//             <img class="brand" :src="'assets/images/portal/brand_big.png'" />
	//
	//             <div class="nav-link" id="navLink">
	//                 <ul class="nav-list">
	//                     <li class="nav-list-item" id="comPortalNav">
	//                         <a class="navbar-link com-portal" href="pages/portal/index.html">公司门户▼</a>
	//
	//                         <div class="nav-panel company">
	//                             <p class="title">公司门户</p>
	//                             <ul class="list">
	//                                 <!-- href="http://bjportal.cnnp.com.cn/wps/portal" -->
	//                                 <li class="list-item"><a class="btn"  href="http://bjecm.cnnp.com.cn/newportal/news/home.action"
	//                                  target="_blank">中国核电旧主页</a></li>
	//                                 <!-- /.list-item -->
	//                                 <li class="list-item"><a class="btn" href="http://www.cnnc.com.cn"
	//                                                          target="_blank">中国核工业集团公司</a></li>
	//                                 <!-- /.list-item -->
	//                                 <li class="list-item"><a class="btn" href="http://10.16.15.38"
	//                                                          target="_blank">中核运行</a></li>
	//                                 <!-- /.list-item -->
	//                                 <li class="list-item"><a class="btn" href="" target="_blank">中浙能源</a></li>
	//                                 <!-- /.list-item -->
	//                                 <li class="list-item"><a class="btn"
	//                                                          href="http://10.16.15.38:10039/wps/portal/Home/cnnc_index"
	//                                                          target="_blank">秦山(筹)</a></li>
	//                                 <!-- /.list-item -->
	//                                 <li class="list-item"><a class="btn" href="#" target="_blank">江苏核电</a></li>
	//                                 <!-- /.list-item -->
	//                                 <li class="list-item"><a class="btn" href="#" target="_blank">三门核电</a></li>
	//                                 <!-- /.list-item -->
	//                             </ul>
	//                             <ul>
	//                                 <!-- /.list-item -->
	//                                 <li class="list-item"><a class="btn" href="http://fqecm.cnnp.com.cn/wps/portal"
	//                                                          target="_blank">福清核电</a></li>
	//                                 <li class="list-item"><a class="btn" href="#" target="_blank">海南核电</a></li>
	//                                 <!-- /.list-item -->
	//                                 <li class="list-item"><a class="btn" href="#" target="_blank">桃花江核电</a></li>
	//                                 <!-- /.list-item -->
	//                                 <li class="list-item"><a class="btn" href="#" target="_blank">辽宁核电</a></li>
	//                                 <!-- /.list-item -->
	//                                 <li class="list-item"><a class="btn" href="http://fsecm.cnnp.com.cn/wps/portal"
	//                                                          target="_blank">三明核电</a></li>
	//                                 <!-- /.list-item -->
	//                                 <li class="list-item"><a class="btn" href="http://zgecm.cnnp.com.cn/wps/portal"
	//                                                          target="_blank">漳州核电</a></li>
	//                                 <!-- /.list-item -->
	//                                 <li class="list-item">&nbsp;</li>
	//                                 <!-- /.list-item -->
	//                             </ul>
	//                         </div>
	//                     </li>
	//                     <li class="nav-list-item dept-subj" id="depPortalNav">
	//                         <a class="navbar-link dep-portal">部门及专题门户▼</a>
	//
	//                         <div class="nav-panel row">
	//                             <div class="list dept col-md-6" >
	//                                 <div class="title">部门门户
	//                                     <div style="position:absolute;top: 0;right:1rem;">
	//                                      <a @click="turnMenuPage('depts','left')" :class="['btn','glyphicon','glyphicon-arrow-left',{'disabled':deptsCount<=12}]" ></a>
	//                                      <a @click="turnMenuPage('depts','right')" :class="['btn','glyphicon','glyphicon-arrow-right',{'disabled':deptsCount==deptsOrigin.length}]" ></a>
	//                                      </div>
	//                                 </div>
	//                                 <!-- /.title -->
	//
	//                                 <ul v-for="n in (parseInt(depts.length/4)+(depts.length%4==0?0:1))">
	//                                     <li v-for="m in n<parseInt(depts.length/4)?4:(depts.length%4)" class="list-item">
	//                                         <a class="btn" v-text="depts[n*4+m].name" :href="depts[n*4+m].webtype=='1'?('pages/portal/index.html?type='+depts[n*4+m].hptype+'&node='+depts[n*4+m].id):depts[n*4+m].url"></a>
	//                                     </li>
	//                                 </ul>
	//                                 <div class="split"></div> 
	//                             </div>
	//                             <!-- /.list -->
	//                             <div class="list col-md-6">
	//                                 <div class="title">专题门户
	//                                     <div style="position:absolute;top: 0;right:1rem;">
	//                                          <a @click="turnMenuPage('themes','left')"  :class="['btn','glyphicon','glyphicon-arrow-left',{'disabled':themesCount<=12}]" ></a>
	//                                          <a @click="turnMenuPage('themes','right')" :class="['btn','glyphicon','glyphicon-arrow-right',{'disabled':themesCount==themesOrigin.length}]">
	//                                          </a>
	//                                     </div>
	//                                 </div>
	//                                 <!-- /.title -->
	//                                 <ul v-for="n in (parseInt(themes.length/4)+(themes.length%4==0?0:1))">
	//                                     <li v-for="m in n<parseInt(themes.length/4)?4:themes.length%4" class="list-item">
	//                                      <a class="btn" v-text="themes[n*4+m].name" :href="themes[n*4+m].webtype=='1'?('pages/portal/index.html?type='+themes[n*4+m].hptype+'&node='+themes[n*4+m].id):themes[n*4+m].url">                                        
	//                                      </a>
	//                                     </li>
	//                                 </ul> 
	//                             </div>
	//                             <!-- /.list -->
	//                         </div>
	//                     </li>
	//                     <li class="nav-list-item"><a @click="gotoWorkbench" class="navbar-link workbench" >个人工作台</a></li>
	//
	//                 </ul>
	//             </div>
	//             <!-- /.nav-link -->
	//
	//             <div class="nav-action" id="nav-action">
	//                 <div class="nav-list-item search"><input @keyup.enter="doSearch" type="text" class="form-control" placeholder="搜索" v-model="searchInputVal"/>
	//
	//                 </div>
	//                 <!-- <li class="nav-list-item login"><a :href="f2000"></a></li> -->
	//             </div>
	//                 <iframe  id="logoutIframe" hidden="hidden"></iframe>
	//                   <div class="user-container"  v-if="isLogin" style="border-left: 1px solid lightgrey;">         
	//                      <div class="user" v-text="username"  style="float: left;width: 60%;line-height: 4.2rem;text-align: right;border-right: 1px solid lightgrey;margin: 5px 0;text-align: center;"></div>
	//                              <div class="logout" style="text-align: center;float: left;width: 40%;line-height: 4.2rem;text-align: left;margin: 5px 0;">
	//                              <a  class="btn" @click="loginOut">登出</a>
	//                          </div>
	//                   </div>
	//                    <div  v-else class="login" style="line-height: 4.2rem; float: right;border-left: 1px solid lightgrey;">
	//                    <a @click="loginIn" class="btn" style="line-height: 3.8rem;">登录</a>                     
	//                    </div>
	//
	//         </div>
	//         <!-- /.container -->
	//
	//         <!-- /.nav-panel -->
	//     </div>
	//     <div :id="swiper_id" class="swiper-container" style="width: 100%;">
	//         <div class="swiper-wrapper">
	//             <div  v-for="n in 3" class="swiper-slide">
	//                 <img  :src="'assets/images/portal/portal-logo'+n+'.jpg'"  class="logo"/>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	// <script>

	module.exports = {
	    data: function data() {
	        return {
	            swiper_id: "swiper" + new Date().getTime(),
	            searchInputVal: "",
	            username: "",
	            list: [],
	            depts: [],
	            themes: [],
	            deptsCount: 0,
	            themesCount: 0,
	            deptsOrigin: [],
	            themesOrigin: [],
	            isLogin: true
	        };
	    },
	    created: function created() {
	        var that = this;
	        var userid = (0, _commonFunction.getCookie)("userid"),
	            username = (0, _commonFunction.getCookie)("username");
	        if (userid && userid != "" && username) {
	            window.userLogin = {
	                userid: userid,
	                username: username
	            };
	            this.isLogin = true;
	            this.username = username;
	        } else {
	            var suffix = Base64.decode(location.search.substr(1));
	            var uidIndex = suffix.indexOf("uid=");
	            if (uidIndex > -1) {
	                that.isLogin = true;
	                userid = suffix.substr(4, 8);
	                (0, _commonFunction.setCookie)("userid", userid, 30, "/");
	                var personalpageRequest = window.interfaceSettings.personalpageRequest;
	                var url = personalpageRequest.api.getMemberDetails + "?" + $.param($.extend({}, personalpageRequest.header, { "uid": userid }));
	                this.fetchUsername(url);
	            } else {
	                this.isLogin = false;
	            }
	        }
	        // body...
	        var sectorUrl = portalRequest.api.portalSectorUrl;
	        var dataSource = {
	            URL: sectorUrl,
	            QueryString: "?" + $.param(portalRequest.header)
	        };
	        (0, _commonFunction.fetchAjaxService)(dataSource, this);
	    },
	    ready: function ready() {
	        var _this = this;
	        $("#depPortalNav").hover(function (ev) {
	            $(this.querySelector(".nav-panel")).show();
	        }, function () {
	            $(this.querySelector(".nav-panel")).hide();
	        });

	        $("#comPortalNav").hover(function (ev) {
	            $(this.querySelector(".nav-panel")).show();
	        }, function () {
	            $(this.querySelector(".nav-panel")).hide();
	        });
	        var swiper = new Swiper("#" + this.swiper_id, {
	            autoplay: 5000,
	            autoplayDisableOnInteraction: false,
	            loop: true,
	            effect: 'fade',
	            calculateHeight: true,
	            speed: 2000
	        });
	    },
	    methods: {
	        gotoWorkbench: function gotoWorkbench() {
	            var url = window.location.href;
	            var host = url.substring(0, url.indexOf('/pages'));
	            url = host + "/pages/portal/workspace.html";
	            url = Base64.encode(url);
	            window.location.href = "http://bjecm.cnnp.com.cn/pt/LoginServlet?url=" + url;
	        },
	        successNext: function successNext() {
	            // body...
	            var themesOrigin = [],
	                deptsOrigin = [];
	            for (var i = 0, len = this.list.length; i < len; i++) {
	                if (this.list[i].hptype == "2") themesOrigin.push(this.list[i]);else deptsOrigin.push(this.list[i]);
	            }
	            this.themesOrigin = themesOrigin;
	            this.deptsOrigin = deptsOrigin;
	            this.themes = themesOrigin.length <= 12 ? themesOrigin : themesOrigin.slice(0, 12);
	            this.depts = deptsOrigin.length <= 12 ? deptsOrigin : deptsOrigin.slice(0, 12);
	            this.deptsCount = this.depts.length;
	            this.themesCount = this.themes.length;
	        },
	        turnMenuPage: function turnMenuPage(type, direction) {
	            var origin = this[type + "Origin"];
	            var count = this[type + "Count"];
	            if (direction == "left") {
	                if (count <= 12) return;
	                count = count - this[type].length;
	                this[type] = origin.slice(count - 12, count);
	                this[type + "Count"] = count;
	            } else {
	                if (count == origin.length) return;
	                this[type] = origin.slice(count, count + 12);
	                this[type + "Count"] = count + this[type].length;
	            }
	        },
	        doSearch: function doSearch() {
	            var url = "/pages/portal/news_search.html?keyWords=" + this.searchInputVal;
	            window.open(url);
	        },
	        loginIn: function loginIn() {
	            window.location.href = "http://bjecm.cnnp.com.cn/pt/LoginServlet?url=" + Base64.encode(window.location.href);
	        },
	        loginOut: function loginOut() {
	            document.getElementById("logoutIframe").src = 'http://bjecm.cnnp.com.cn/pkmslogout';
	            delete window.userLogin;
	            (0, _commonFunction.deleteCookie)("userid");
	            (0, _commonFunction.deleteCookie)("username");
	            (0, _commonFunction.deleteCookie)("userorg");
	            this.username = "";
	            this.isLogin = false;
	            location.href = location.protocol + "//" + location.host + "/pages/portal/index.html";
	        },

	        fetchUsername: function fetchUsername(url) {
	            var that = this;
	            $.ajax({
	                url: url,
	                type: "post",
	                data: "",
	                success: function success(result) {
	                    var data = result[0];
	                    that.username = data.displayName;
	                    var orgtree = data.orgtree;
	                    (0, _commonFunction.setCookie)("username", data.displayName, 30, "/");
	                    (0, _commonFunction.setCookie)("userorg", orgtree, 30, "/");
	                },
	                error: function error(result) {
	                    console.log("error", result);
	                }
	            });
	        }

	    }

	};
	// </script>

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.fetchAjaxService = exports.loadingCover = exports.getQueryString = exports.deleteCookie = exports.getCookie = exports.setCookie = exports.add_supervision = exports.fetch_sourceFromServer = exports.fetch_areaFromServer = exports.fetch_deptsFromServer = exports.fetch_serviceByHttpProtocol = exports.setSupervisionHeader = undefined;

	var _stringify = __webpack_require__(9);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var supervisionRequest = window.interfaceSettings.supervisionRequest;

	var setSupervisionHeader = function setSupervisionHeader(url, paramObj, iid) {
		if (paramObj) ;else paramObj = { stamp: new Date().getTime() };
		return (iid ? url.replace("%id%", iid) : url) + "?" + (paramObj ? $.param($.extend({}, supervisionRequest.header, paramObj)) : $.param(supervisionRequest.header));
	};

	//ajax
	var fetch_serviceByHttpProtocol = function fetch_serviceByHttpProtocol(url, type, requestData, successHandler, errorHandler) {
		if (type == "post") requestData = (0, _stringify2.default)(requestData);
		$.ajax({
			url: url,
			type: type,
			data: requestData,
			// dataType:"json",
			contentType: "application/json",
			success: function success(result, state, jqxhr) {
				console.log("success");
				successHandler(result, state, jqxhr);
			},
			error: function error(result, state, jqxhr) {
				console.log("error");
				errorHandler(result, state, jqxhr);
			}
		});
	};
	//fetch organization

	//fetch depts   部门
	var fetch_deptsFromServer = function fetch_deptsFromServer(pid, success) {
		var url = setSupervisionHeader(supervisionRequest.api["deptUrl"], null, pid);
		fetch_serviceByHttpProtocol(url, "get", {}, success, function (result, state, jqxhr) {
			console.log(result);
		});
	};
	//supervision source
	var fetch_sourceFromServer = function fetch_sourceFromServer(success) {
		var url = setSupervisionHeader(supervisionRequest.api["supSourceUrl"]);
		fetch_serviceByHttpProtocol(url, "get", {}, success, function (result, state, jqxhr) {
			console.log(result);
		});
	};
	//supervision area
	var fetch_areaFromServer = function fetch_areaFromServer(success) {
		var url = setSupervisionHeader(supervisionRequest.api["supAreaUrl"]);
		fetch_serviceByHttpProtocol(url, "get", {}, success, function (result, state, jqxhr) {
			console.log(result);
		});
	};

	//accountable sn

	//add new supervision
	var add_supervision = function add_supervision(options, success) {
		var url = setSupervisionHeader(supervisionRequest.api["supAddUrl"]);
		fetch_serviceByHttpProtocol(url, "post", options, success, function (result, state, jqxhr) {
			console.log(result);
		});
	};
	//*cookies*/

	function setCookie(name, value, days, path, domain, secure) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			var expires = date.toGMTString();
		} else var expires = "";
		var cookieString = name + "=" + escape(value);
		if (expires) cookieString += ";expires=" + expires;
		if (path) cookieString += ";path=" + escape(path);
		if (domain) cookieString += ";domain=" + escape(domain);
		if (secure) cookieString += ";secure=" + secure;
		document.cookie = cookieString;
	}
	function getCookie(name) {
		var arr,
		    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
	} //读取cookie

	function deleteCookie(name) {
		var expdate = new Date();
		expdate.setTime(expdate.getTime() - 86400 * 1000 * 1);
		setCookie(name, "", expdate, "/");
	}
	//*cookies*/
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		} else {
			return null;
		}
	}

	/*covering loading function*/
	function loadingCover() {
		$.blockUI({ message: '数据获取中，请稍候... ...',
			css: {
				border: 'none',
				padding: '15px',
				backgroundColor: '#000',
				'-webkit-border-radius': '10px',
				'-moz-border-radius': '10px',
				opacity: .5,
				color: '#fff'
			}
		});
	}

	function fetchAjaxService(dataSource, _this) {
		var successHandler = function successHandler(result, status, xhr) {
			_this.list = result;
			if (_this.successNext) _this.successNext();
		};
		var error = function error(result, status, xhr) {
			console.log("error", result);
		};
		var ajaxOptions = {
			type: 'get',
			url: dataSource.URL + dataSource.QueryString,
			success: successHandler,
			error: error
		};
		if (dataSource.METHOD == "post") {
			ajaxOptions = {
				type: 'post',
				url: dataSource.URL + dataSource.QueryString,
				data: dataSource.PLAYLOAD,
				contentType: dataSource.CONTENT_TYPE,
				success: successHandler,
				error: error
			};
		}
		$.ajax(ajaxOptions);
	}

	exports.setSupervisionHeader = setSupervisionHeader;
	exports.fetch_serviceByHttpProtocol = fetch_serviceByHttpProtocol;
	exports.fetch_deptsFromServer = fetch_deptsFromServer;
	exports.fetch_areaFromServer = fetch_areaFromServer;
	exports.fetch_sourceFromServer = fetch_sourceFromServer;
	exports.add_supervision = add_supervision;
	exports.setCookie = setCookie;
	exports.getCookie = getCookie;
	exports.deleteCookie = deleteCookie;
	exports.getQueryString = getQueryString;
	exports.loadingCover = loadingCover;
	exports.fetchAjaxService = fetchAjaxService;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(10), __esModule: true };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(11)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<!--<base href=\"../../../\">-->\n<div class=\"navbar navbar-default\">\n    <div class=\"container-fluid nav-header\">\n        <img class=\"brand\" :src=\"'assets/images/portal/brand_big.png'\" />\n\n        <div class=\"nav-link\" id=\"navLink\">\n            <ul class=\"nav-list\">\n                <li class=\"nav-list-item\" id=\"comPortalNav\">\n                    <a class=\"navbar-link com-portal\" href=\"pages/portal/index.html\">公司门户▼</a>\n\n                    <div class=\"nav-panel company\">\n                        <p class=\"title\">公司门户</p>\n                        <ul class=\"list\">\n                            <!-- href=\"http://bjportal.cnnp.com.cn/wps/portal\" -->\n                            <li class=\"list-item\"><a class=\"btn\"  href=\"http://bjecm.cnnp.com.cn/newportal/news/home.action\"\n                             target=\"_blank\">中国核电旧主页</a></li>\n                            <!-- /.list-item -->\n                            <li class=\"list-item\"><a class=\"btn\" href=\"http://www.cnnc.com.cn\"\n                                                     target=\"_blank\">中国核工业集团公司</a></li>\n                            <!-- /.list-item -->\n                            <li class=\"list-item\"><a class=\"btn\" href=\"http://10.16.15.38\"\n                                                     target=\"_blank\">中核运行</a></li>\n                            <!-- /.list-item -->\n                            <li class=\"list-item\"><a class=\"btn\" href=\"\" target=\"_blank\">中浙能源</a></li>\n                            <!-- /.list-item -->\n                            <li class=\"list-item\"><a class=\"btn\"\n                                                     href=\"http://10.16.15.38:10039/wps/portal/Home/cnnc_index\"\n                                                     target=\"_blank\">秦山(筹)</a></li>\n                            <!-- /.list-item -->\n                            <li class=\"list-item\"><a class=\"btn\" href=\"#\" target=\"_blank\">江苏核电</a></li>\n                            <!-- /.list-item -->\n                            <li class=\"list-item\"><a class=\"btn\" href=\"#\" target=\"_blank\">三门核电</a></li>\n                            <!-- /.list-item -->\n                        </ul>\n                        <ul>\n                            <!-- /.list-item -->\n                            <li class=\"list-item\"><a class=\"btn\" href=\"http://fqecm.cnnp.com.cn/wps/portal\"\n                                                     target=\"_blank\">福清核电</a></li>\n                            <li class=\"list-item\"><a class=\"btn\" href=\"#\" target=\"_blank\">海南核电</a></li>\n                            <!-- /.list-item -->\n                            <li class=\"list-item\"><a class=\"btn\" href=\"#\" target=\"_blank\">桃花江核电</a></li>\n                            <!-- /.list-item -->\n                            <li class=\"list-item\"><a class=\"btn\" href=\"#\" target=\"_blank\">辽宁核电</a></li>\n                            <!-- /.list-item -->\n                            <li class=\"list-item\"><a class=\"btn\" href=\"http://fsecm.cnnp.com.cn/wps/portal\"\n                                                     target=\"_blank\">三明核电</a></li>\n                            <!-- /.list-item -->\n                            <li class=\"list-item\"><a class=\"btn\" href=\"http://zgecm.cnnp.com.cn/wps/portal\"\n                                                     target=\"_blank\">漳州核电</a></li>\n                            <!-- /.list-item -->\n                            <li class=\"list-item\">&nbsp;</li>\n                            <!-- /.list-item -->\n                        </ul>\n                    </div>\n                </li>\n                <li class=\"nav-list-item dept-subj\" id=\"depPortalNav\">\n                    <a class=\"navbar-link dep-portal\">部门及专题门户▼</a>\n\n                    <div class=\"nav-panel row\">\n                        <div class=\"list dept col-md-6\" >\n                            <div class=\"title\">部门门户\n                                <div style=\"position:absolute;top: 0;right:1rem;\">\n                                 <a @click=\"turnMenuPage('depts','left')\" :class=\"['btn','glyphicon','glyphicon-arrow-left',{'disabled':deptsCount<=12}]\" ></a>\n                                 <a @click=\"turnMenuPage('depts','right')\" :class=\"['btn','glyphicon','glyphicon-arrow-right',{'disabled':deptsCount==deptsOrigin.length}]\" ></a>\n                                 </div>\n                            </div>\n                            <!-- /.title -->\n                           \n                            <ul v-for=\"n in (parseInt(depts.length/4)+(depts.length%4==0?0:1))\">\n                                <li v-for=\"m in n<parseInt(depts.length/4)?4:(depts.length%4)\" class=\"list-item\">\n                                    <a class=\"btn\" v-text=\"depts[n*4+m].name\" :href=\"depts[n*4+m].webtype=='1'?('pages/portal/index.html?type='+depts[n*4+m].hptype+'&node='+depts[n*4+m].id):depts[n*4+m].url\"></a>\n                                </li>\n                            </ul> \n                            <div class=\"split\"></div>  \n                        </div>\n                        <!-- /.list -->\n                        <div class=\"list col-md-6\">\n                            <div class=\"title\">专题门户\n                                <div style=\"position:absolute;top: 0;right:1rem;\">\n                                     <a @click=\"turnMenuPage('themes','left')\"  :class=\"['btn','glyphicon','glyphicon-arrow-left',{'disabled':themesCount<=12}]\" ></a>\n                                     <a @click=\"turnMenuPage('themes','right')\" :class=\"['btn','glyphicon','glyphicon-arrow-right',{'disabled':themesCount==themesOrigin.length}]\">\n                                     </a>\n                                </div>\n                            </div>\n                            <!-- /.title -->\n                            <ul v-for=\"n in (parseInt(themes.length/4)+(themes.length%4==0?0:1))\">\n                                <li v-for=\"m in n<parseInt(themes.length/4)?4:themes.length%4\" class=\"list-item\">\n                                 <a class=\"btn\" v-text=\"themes[n*4+m].name\" :href=\"themes[n*4+m].webtype=='1'?('pages/portal/index.html?type='+themes[n*4+m].hptype+'&node='+themes[n*4+m].id):themes[n*4+m].url\">                                         \n                                 </a>\n                                </li>\n                            </ul>  \n                        </div>\n                        <!-- /.list -->\n                    </div>\n                </li>\n                <li class=\"nav-list-item\"><a @click=\"gotoWorkbench\" class=\"navbar-link workbench\" >个人工作台</a></li>\n                \n            </ul>\n        </div>\n        <!-- /.nav-link -->\n\n        <div class=\"nav-action\" id=\"nav-action\">\n            <div class=\"nav-list-item search\"><input @keyup.enter=\"doSearch\" type=\"text\" class=\"form-control\" placeholder=\"搜索\" v-model=\"searchInputVal\"/>\n               \n            </div>\n            <!-- <li class=\"nav-list-item login\"><a :href=\"f2000\"></a></li> -->\n        </div>\n            <iframe  id=\"logoutIframe\" hidden=\"hidden\"></iframe>\n              <div class=\"user-container\"  v-if=\"isLogin\" style=\"border-left: 1px solid lightgrey;\">          \n                 <div class=\"user\" v-text=\"username\"  style=\"float: left;width: 60%;line-height: 4.2rem;text-align: right;border-right: 1px solid lightgrey;margin: 5px 0;text-align: center;\"></div>\n                         <div class=\"logout\" style=\"text-align: center;float: left;width: 40%;line-height: 4.2rem;text-align: left;margin: 5px 0;\">\n                         <a  class=\"btn\" @click=\"loginOut\">登出</a>\n                     </div>\n              </div>\n               <div  v-else class=\"login\" style=\"line-height: 4.2rem; float: right;border-left: 1px solid lightgrey;\"> \n               <a @click=\"loginIn\" class=\"btn\" style=\"line-height: 3.8rem;\">登录</a>                      \n               </div>\n         \n    </div>\n    <!-- /.container -->\n\n    <!-- /.nav-panel -->\n</div>\n<div :id=\"swiper_id\" class=\"swiper-container\" style=\"width: 100%;\">\n    <div class=\"swiper-wrapper\">\n        <div  v-for=\"n in 3\" class=\"swiper-slide\">\n            <img  :src=\"'assets/images/portal/portal-logo'+n+'.jpg'\"  class=\"logo\"/>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(14)
	__vue_template__ = __webpack_require__(16)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./footer.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./footer.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./footer.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "\r\n    \r\n/*----底部样式-----*/\r\n.footer{ background-color:#6a7986; height:95px; margin-top: 2rem;}\r\n.footer_content{ width:490px; margin:0 auto; padding-top:10px; color:#fff;}\r\n.sina{ width:58px; height:65px; text-align:center; float:left; font-size:12px; }\r\n.con{ width:245px; float:left; text-align:center; margin:0 0 0 60px;}\r\n.weixin{ height:65px; text-align:center; float:right; font-size:12px;}\r\n/***************************************end***********************************/\r\n", ""]);

	// exports


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n <div class=\"footer\">\n    <div class=\"footer_content\">\n        <div class=\"sina\">\n            <p><img :src=\"'assets/images/portal/sina.jpg'\" width=\"50\" height=\"50\"></p>\n            <a style=\"color: #fff;\">新浪微博</a>\n        </div>\n        <div class=\"con\">\n            <p>运维支持：5484 5483</p>\n\n            <p>技术支持：核工业计算机应用研究所\n            <br/>&nbsp&nbsp&nbsp&nbsp&nbsp核动力运行研究所</p>\n\n            <p>版权所有：中国核能电力股份有限公司</p>\n        </div>\n        <div class=\"weixin\">\n            <p><img :src=\"'assets/images/portal/weixin.jpg'\" width=\"50\" height=\"50\"></p>\n            <a style=\"color: #fff;\">微信公众平台</a>\n        </div>\n    </div>\n</div>\n";

/***/ }
/******/ ]);