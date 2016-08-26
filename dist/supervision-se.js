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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _defineProperty2 = __webpack_require__(2);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _computed; /**
	                * Created by Mattia on 2016/8/23.
	                */


	var _commonFunction = __webpack_require__(21);

	var _userSelector = __webpack_require__(24);

	var _userSelector2 = _interopRequireDefault(_userSelector);

	var _accordionMenu = __webpack_require__(31);

	var _accordionMenu2 = _interopRequireDefault(_accordionMenu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var supervisionRequest = window.interfaceSettings.supervisionRequest.api;
	var selectUserVm = new Vue({
	    el: "#article",
	    data: {
	        // responsibleOptions: [{
	        //     uid:"",
	        //     displayname:""
	        // }],    
	        responsibleOptions: [],
	        responsibleParams: {
	            searchuserUrl: window.interfaceSettings.supervisionRequest.api.searchuserUrl,
	            multiple: true,
	            leaderOnly: false,
	            title: "管理员："
	        },
	        // memberOptions: [{
	        //     uid:"",
	        //     displayname:""
	        // }],
	        memberOptions: [],
	        memberParams: {
	            searchuserUrl: window.interfaceSettings.supervisionRequest.api.searchuserUrl,
	            multiple: true,
	            leaderOnly: false,
	            title: "成员："
	        },
	        selectedDepts: [],
	        selectedDept: [],
	        requests: supervisionRequest

	    },
	    computed: (_computed = {
	        responsibledeptname: function responsibledeptname() {
	            return this.selectedDept.length > 0 ? this.selectedDept[0].name : "";
	        },
	        responsiblename: function responsiblename() {
	            return this.responsibleOptions.length > 0 ? this.responsibleOptions[0].displayname : "";
	        }
	    }, (0, _defineProperty3.default)(_computed, "responsiblename", function responsiblename() {
	        return this.responsibleOptions.length > 0 ? this.responsibleOptions[0].displayname : "";
	    }), (0, _defineProperty3.default)(_computed, "responsiblenames", function responsiblenames() {
	        var names = $.map(this.responsibleOptions, function (item) {
	            return item.displayname;
	        });
	        return names.join(",");
	    }), (0, _defineProperty3.default)(_computed, "membername", function membername() {
	        return this.memberOptions.length > 0 ? this.memberOptions[0].displayname : "";
	    }), (0, _defineProperty3.default)(_computed, "membernames", function membernames() {
	        var names = $.map(this.memberOptions, function (item) {
	            return item.displayname;
	        });
	        return names.join(",");
	    }), (0, _defineProperty3.default)(_computed, "memberuids", function memberuids() {
	        var uids = $.map(this.memberOptions, function (item) {
	            return item.uid;
	        });
	        return uids.join(",");
	    }), (0, _defineProperty3.default)(_computed, "scope", function scope() {
	        var depts = $.map(this.selectedDepts, function (item) {
	            return item.name;
	        });
	        return depts.join(",");
	    }), _computed),
	    created: function created() {
	        var _this = this;
	        // this.fetchOriginSupervision();
	    }, ready: function ready() {
	        //alert("haha")
	    },
	    methods: {
	        fetchOriginSupervision: function fetchOriginSupervision() {
	            var _this = this;
	            // alert(supervisionRequest.searchuserUrl)
	            $.ajax({
	                type: "get",
	                dataType: "json",
	                url: (0, _commonFunction.setSupervisionHeader)(supervisionRequest.supDetailUrl, null, this.id),
	                success: function success(result) {
	                    //alert(123)
	                    for (var i = 0, len = result.length; i < len; i++) {
	                        var item = result[i];
	                        if (item.id == _this.id) {
	                            for (var key in item) {
	                                _this[key] = item[key];
	                            }
	                            _this.sourceSelected = item.source;
	                            _this.areaSelected = item.area;
	                            _this.leaders = [{
	                                uid: item.accountablesn,
	                                displayname: item.accountablename
	                            }];
	                            _this.selectedDept = [{
	                                ou: item.responsibledeptcode,
	                                name: item.responsibledeptname
	                            }];
	                            _this.responsibleOptions = [{
	                                uid: item.responsiblesn,
	                                displayname: item.responsiblename
	                            }];
	                            break;
	                        }
	                    }

	                    // console.log(JSON.stringify(_this.children))
	                },
	                error: function error(data) {
	                    // alert(data)
	                    console.log(data);
	                }
	            });
	        }
	    },
	    components: {
	        userSelector: _userSelector2.default,
	        comAccordion: _accordionMenu2.default
	    }

	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(3);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	var $Object = __webpack_require__(8).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(16), 'Object', {defineProperty: __webpack_require__(12).f});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , ctx       = __webpack_require__(9)
	  , hide      = __webpack_require__(11)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(10);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(12)
	  , createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(16) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(13)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , toPrimitive    = __webpack_require__(19)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(16) && !__webpack_require__(17)(function(){
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(14);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.fetchAjaxService = exports.loadingCover = exports.getQueryString = exports.deleteCookie = exports.getCookie = exports.setCookie = exports.add_supervision = exports.fetch_sourceFromServer = exports.fetch_areaFromServer = exports.fetch_deptsFromServer = exports.fetch_serviceByHttpProtocol = exports.setSupervisionHeader = undefined;

	var _stringify = __webpack_require__(22);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var supervisionRequest = window.interfaceSettings.supervisionRequest;

	var setSupervisionHeader = function setSupervisionHeader(url, paramObj, iid) {
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
		setCookie(name, "", expdate);
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(23), __esModule: true };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(8)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(25)
	__vue_script__ = __webpack_require__(29)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\user-selector.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(30)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./user-selector.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(28)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-a96821a4&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./user-selector.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-a96821a4&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./user-selector.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(27)();
	// imports


	// module
	exports.push([module.id, "\n.inner[_v-a96821a4] {\n    position: static;\n    float: none;\n    border: 0;\n    padding: 0;\n    margin: 0;\n    border-radius: 0;\n    max-height: 16rem;\n    overflow-y: auto;\n    /*min-height: 80px;*/\n}\n\n.dropdown-menu.open[_v-a96821a4] {\n    width: 100%;\n}\n\n.dropdown-toggle .fa[_v-a96821a4] {\n    float: right;\n    margin-right: -6px;\n}\n\n.bs-searchbox .form-control[_v-a96821a4] {\n    border: 1px solid skyblue;\n    border-radius: 5px;\n}\n\n.input-group > .btn[_v-a96821a4] {\n    width: 100%;\n    text-align: left;\n    background: white;\n}\n\n.result[_v-a96821a4] {\n    border: 1px solid lightgrey;\n    width: 100%;\n    margin: 2rem 0 0;\n    padding: 0.5rem 0.5rem;\n    height: 4.5rem;\n    border-radius: 0.5rem;\n}\n\n.list[_v-a96821a4] {\n    list-style: none;\n}\n\n.table th[_v-a96821a4] {\n    width: 25%;\n    text-align: center;\n}\n\n.table td[_v-a96821a4] {\n    text-align: center;\n    vertical-align: middle;\n}\n.outer-container[_v-a96821a4]{\n\tdisplay: inline-block;\n}\n.search-result[_v-a96821a4]{\n    position: relative;\n    z-index: 1;\n}\n/*遮罩start*/\n    @-webkit-keyframes loadingRotate\n{\n 100%   {-webkit-transform: rotate(360deg);transform: rotate(360deg)};\n}\n    @keyframes loadingRotate\n{\n 100%   {-webkit-transform: rotate(360deg);transform: rotate(360deg)};\n}\n .cover[_v-a96821a4]{\n  /*  position:absolute;\n    width: 100%;\n    height: 100%;\n    z-index: 100;\n    background: #fff;\n    opacity: 0;\n    text-align: center;\n    display: table;\n    left: 0;\n    top: 0;*/\n    display: none;\n }\n .cover .loading[_v-a96821a4]{\n     position:absolute;\n\n    width: 16rem;\n    height: 16rem;\n      left: calc( 50% - 8rem);\n     top: calc( 50% - 8rem);\n    display: table-cell;\n    vertical-align: middle;\n    margin:0 auto ;\n    border-radius: 50%;\n    /*background: none;*/\n    opacity: 0.8;\n/*animation: loadingRotate 1s linear 0.05s  infinite;*/\n }\n /*cover end*/\n\n", ""]);

	// exports


/***/ },
/* 27 */
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
/* 28 */
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
/* 29 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <style scoped>
	//     .inner {
	//         position: static;
	//         float: none;
	//         border: 0;
	//         padding: 0;
	//         margin: 0;
	//         border-radius: 0;
	//         max-height: 16rem;
	//         overflow-y: auto;
	//         /*min-height: 80px;*/
	//     }
	//
	//     .dropdown-menu.open {
	//         width: 100%;
	//     }
	//
	//     .dropdown-toggle .fa {
	//         float: right;
	//         margin-right: -6px;
	//     }
	//
	//     .bs-searchbox .form-control {
	//         border: 1px solid skyblue;
	//         border-radius: 5px;
	//     }
	//
	//     .input-group > .btn {
	//         width: 100%;
	//         text-align: left;
	//         background: white;
	//     }
	//
	//     .result {
	//         border: 1px solid lightgrey;
	//         width: 100%;
	//         margin: 2rem 0 0;
	//         padding: 0.5rem 0.5rem;
	//         height: 4.5rem;
	//         border-radius: 0.5rem;
	//     }
	//
	//     .list {
	//         list-style: none;
	//     }
	//
	//     .table th {
	//         width: 25%;
	//         text-align: center;
	//     }
	//
	//     .table td {
	//         text-align: center;
	//         vertical-align: middle;
	//     }
	//     .outer-container{
	//     	display: inline-block;
	//     }
	//     .search-result{
	//         position: relative;
	//         z-index: 1;
	//     }
	//     /*遮罩start*/
	//         @keyframes loadingRotate
	//     {
	//      100%   {transform: rotate(360deg)};
	//     }
	//      .cover{
	//       /*  position:absolute;
	//         width: 100%;
	//         height: 100%;
	//         z-index: 100;
	//         background: #fff;
	//         opacity: 0;
	//         text-align: center;
	//         display: table;
	//         left: 0;
	//         top: 0;*/
	//         display: none;
	//      }
	//      .cover .loading{
	//          position:absolute;
	//
	//         width: 16rem;
	//         height: 16rem;
	//           left: calc( 50% - 8rem);
	//          top: calc( 50% - 8rem);
	//         display: table-cell;
	//         vertical-align: middle;
	//         margin:0 auto ;
	//         border-radius: 50%;
	//         /*background: none;*/
	//         opacity: 0.8;
	//     /*animation: loadingRotate 1s linear 0.05s  infinite;*/
	//      }
	//      /*cover end*/
	//
	// </style>
	// <template> 
	// <div class="outer-container">
	//     <div class="input-grout" style="width: 50%;position: relative;">
	//      <button type="button" class="btn btn-sm" data-toggle="modal" :data-target="'#'+modal_id">请选择</button>
	//     </div>
	//     <div class="modal fade" :id="modal_id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	//         <div class="modal-dialog" role="document">
	//             <div class="modal-content">
	//                 <div class="modal-header">
	//                     <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
	//                             aria-hidden="true">&times;</span></button>
	//                     <h4 class="modal-title">{{givenParams.title}}</h4>
	//                 </div>
	//                 <div class="modal-body">
	//                 <div v-show="(currentView=='business')" >
	//                     <div class="input" style="height:4rem;"><input type="text" style="height:4rem;" class="form-control inputSuccess1" v-model="input"
	//                                               @keyup="searchInput"></div>
	//                    <section class="search-result">
	//
	//                     <table class="table table-hover table-condensed content-key">
	//                         <thead>
	//                         <th>单位</th>
	//                         <th>处室</th>
	//                         <th>科室</th>
	//                         <th>姓名</th>
	//                         <th></th>
	//                         </thead>
	//                         <tbody>
	//                         <tr v-for="member in members">
	//                             <td v-for="n in 3">{{member.orgtree[n+1]?member.orgtree[n+1].name:""}}</td>
	//                             <td>{{member.displayname}}</td>
	//                             <td>
	//                                 <button class="btn btn-default" @click="addUser(member)">添加</button>
	//                             </td>
	//                         </tr>
	//
	//                         </tbody>
	//                     </table>
	//                     <div class="result">
	//                         <ul class="list">
	//                             <li v-for="user in selectedUsers" class="btn btn-primary" @click="removeUser($index,event)">
	//                                 <a v-text="user.displayname" style="color: white;">
	//                                 </a><i class="glyphicon glyphicon-remove"></i></li>
	//                         </ul>
	//                     </div>
	//                         <div class="cover">
	//                             <img class="loading" :src="'assets/images/loading3.gif'">
	//                         </div>
	//                    </section>
	//                 </div>
	//                 <div v-show="currentView=='dialog1'">
	//                       <p style="margin: 0 auto;">不可重复添加</p>
	//                 </div>
	//                  <div v-show="currentView=='dialog2'">
	//                      <p >只能选择一个候选人，请移除后再添加..</p>
	//                  </div>
	//
	//                 </div>
	//                 <div class="modal-footer">
	//
	//                       <button type="button" v-show="currentView!='business'" class="btn btn-default" @click="dialogClose">确定</button>
	//                     <!-- <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button> -->
	//                     <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
	//                 </div>
	//             </div>
	//         </div>
	//     </div>
	//     </div>
	// </template>
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            modal_id: "modal" + new Date().getTime(),
	            members: [],
	            // options:[],
	            input: "",
	            request: {},
	            multiple: true,
	            leaderOnly: true,
	            searchuserUrl: "",
	            title: "",
	            currentView: "business"
	        };
	    },

	    props: ["givenParams", 'selectedUsers'],

	    created: function created() {
	        this.multiple = this.givenParams.multiple;
	        this.leaderOnly = this.givenParams.leaderOnly;
	        this.searchuserUrl = this.givenParams.searchuserUrl;
	    },

	    methods: {
	        dialogClose: function dialogClose() {
	            // body...
	            this.currentView = "business";
	        },
	        selectMember: function selectMember(item) {
	            this.selected = item;
	        },
	        searchInput: function searchInput() {
	            var _this2 = this;

	            var _this = this;
	            var input = this.input.replace(/(^\s*)|(\s*$)/g, "");
	            if (input == "") {
	                if (_this.request.readyState && _this.request.readyState != 4) {
	                    _this.request.abort();
	                    $(".cover").hide();
	                }
	                return;
	            }
	            var timer = setTimeout(function () {
	                clearTimeout(timer);
	                var inputVal = _this.input.replace(/(^\s*)|(\s*$)/g, "");
	                if (inputVal != input) {
	                    return;
	                } else {
	                    if (inputVal == "") return;
	                    if (_this.request.readyState && _this.request.readyState != 4) {
	                        _this.request.abort();
	                        $(".cover").hide();
	                    }
	                    _this.request = $.ajax({
	                        type: "get",
	                        url: _this2.searchuserUrl + "?" + $.param($.extend(window.interfaceSettings.supervisionRequest.header, { q: inputVal })),
	                        success: function success(result, state, jqxhr) {
	                            var members = [];
	                            var count = 0;
	                            for (var i = 0, len = result.length; i < len; i++) {
	                                //leaders only
	                                if (_this.leaderOnly && (typeof result[i].isleader == "undefined" || result[i].isleader != 1)) {
	                                    continue;
	                                }
	                                var orgtree = result[i].orgtree;
	                                if (orgtree) {
	                                    for (var orgi in orgtree) {
	                                        for (var key in orgtree[orgi]) {
	                                            orgtree[orgi].name = orgtree[orgi][key];
	                                        }
	                                    }
	                                }
	                                result.orgtree = orgtree;
	                                members.push(result[i]);
	                                count++;
	                                if (count == 4) break;
	                            }
	                            console.log("members", members);
	                            _this.members = [];
	                            _this.members = members;
	                            $(".cover").hide();
	                        },
	                        error: function error(result, state, jqxhr) {
	                            $(".cover").hide();
	                            console.log("error", jqxhr);
	                        }
	                    });
	                    $(".cover").show();
	                }
	            }, 1000);
	        },
	        addUser: function addUser(item) {
	            if (item.selected) {
	                this.currentView = "dialog1";
	                return;
	            }
	            if (this.multiple || this.selectedUsers.length == 0) {
	                this.selectedUsers.push(item);
	                item.selectedUsers = true;
	            } else {
	                this.currentView = "dialog2";
	            }
	        },
	        removeUser: function removeUser(index) {
	            this.selectedUsers[index].selected = false;
	            this.selectedUsers.splice(index, 1);
	        }
	    }
	};

	// </script>
	// </body>
	// </html>

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n  \n<div class=\"outer-container\" _v-a96821a4=\"\">\n    <div class=\"input-grout\" style=\"width: 50%;position: relative;\" _v-a96821a4=\"\">\n     <button type=\"button\" class=\"btn btn-sm\" data-toggle=\"modal\" :data-target=\"'#'+modal_id\" _v-a96821a4=\"\">请选择</button>\n    </div>\n    <div class=\"modal fade\" :id=\"modal_id\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" _v-a96821a4=\"\">\n        <div class=\"modal-dialog\" role=\"document\" _v-a96821a4=\"\">\n            <div class=\"modal-content\" _v-a96821a4=\"\">\n                <div class=\"modal-header\" _v-a96821a4=\"\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" _v-a96821a4=\"\"><span aria-hidden=\"true\" _v-a96821a4=\"\">×</span></button>\n                    <h4 class=\"modal-title\" _v-a96821a4=\"\">{{givenParams.title}}</h4>\n                </div>\n                <div class=\"modal-body\" _v-a96821a4=\"\">\n                <div v-show=\"(currentView=='business')\" _v-a96821a4=\"\">\n                    <div class=\"input\" style=\"height:4rem;\" _v-a96821a4=\"\"><input type=\"text\" style=\"height:4rem;\" class=\"form-control inputSuccess1\" v-model=\"input\" @keyup=\"searchInput\" _v-a96821a4=\"\"></div>\n                   <section class=\"search-result\" _v-a96821a4=\"\">\n                                                  \n                    <table class=\"table table-hover table-condensed content-key\" _v-a96821a4=\"\">\n                        <thead _v-a96821a4=\"\">\n                        <tr _v-a96821a4=\"\"><th _v-a96821a4=\"\">单位</th>\n                        <th _v-a96821a4=\"\">处室</th>\n                        <th _v-a96821a4=\"\">科室</th>\n                        <th _v-a96821a4=\"\">姓名</th>\n                        <th _v-a96821a4=\"\"></th>\n                        </tr></thead>\n                        <tbody _v-a96821a4=\"\">\n                        <tr v-for=\"member in members\" _v-a96821a4=\"\">\n                            <td v-for=\"n in 3\" _v-a96821a4=\"\">{{member.orgtree[n+1]?member.orgtree[n+1].name:\"\"}}</td>\n                            <td _v-a96821a4=\"\">{{member.displayname}}</td>\n                            <td _v-a96821a4=\"\">\n                                <button class=\"btn btn-default\" @click=\"addUser(member)\" _v-a96821a4=\"\">添加</button>\n                            </td>\n                        </tr>\n\n                        </tbody>\n                    </table>\n                    <div class=\"result\" _v-a96821a4=\"\">\n                        <ul class=\"list\" _v-a96821a4=\"\">\n                            <li v-for=\"user in selectedUsers\" class=\"btn btn-primary\" @click=\"removeUser($index,event)\" _v-a96821a4=\"\">\n                                <a v-text=\"user.displayname\" style=\"color: white;\" _v-a96821a4=\"\">\n                                </a><i class=\"glyphicon glyphicon-remove\" _v-a96821a4=\"\"></i></li>\n                        </ul>\n                    </div>\n                        <div class=\"cover\" _v-a96821a4=\"\">\n                            <img class=\"loading\" :src=\"'assets/images/loading3.gif'\" _v-a96821a4=\"\">\n                        </div>\n                   </section>\n                </div>\n                <div v-show=\"currentView=='dialog1'\" _v-a96821a4=\"\">\n                      <p style=\"margin: 0 auto;\" _v-a96821a4=\"\">不可重复添加</p>\n                </div>\n                 <div v-show=\"currentView=='dialog2'\" _v-a96821a4=\"\">\n                     <p _v-a96821a4=\"\">只能选择一个候选人，请移除后再添加..</p>\n                 </div>\n                    \n                </div>\n                <div class=\"modal-footer\" _v-a96821a4=\"\">\n\n                      <button type=\"button\" v-show=\"currentView!='business'\" class=\"btn btn-default\" @click=\"dialogClose\" _v-a96821a4=\"\">确定</button>\n                    <!-- <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button> -->\n                    <!-- <button type=\"button\" class=\"btn btn-primary\">Save changes</button> -->\n                </div>\n            </div>\n        </div>\n    </div>\n    </div>\n";

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(32)
	__vue_script__ = __webpack_require__(34)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\accordion-menu.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(35)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./accordion-menu.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(33);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(28)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-9e0aeef2&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./accordion-menu.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-9e0aeef2&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./accordion-menu.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(27)();
	// imports


	// module
	exports.push([module.id, "\r\nul[_v-9e0aeef2] {\r\n\tlist-style-type: none;\r\n}\r\n\r\na[_v-9e0aeef2] {\r\n\tcolor: #b63b4d;\r\n\ttext-decoration: none;\r\n}\r\n\r\n/** =======================\r\n * Contenedor Principal\r\n ===========================*/\r\nh1[_v-9e0aeef2] {\r\n \tcolor: #FFF;\r\n \tfont-size: 24px;\r\n \tfont-weight: 400;\r\n \ttext-align: center;\r\n \tmargin-top: 80px;\r\n }\r\n\r\nh1 a[_v-9e0aeef2] {\r\n \tcolor: #c12c42;\r\n \tfont-size: 16px;\r\n }\r\n\r\n .accordion[_v-9e0aeef2] {\r\n \twidth: 100%;\r\n \tmax-width: 360px;\r\n \tmargin: 30px auto 20px;\r\n \tbackground: #FFF;\r\n \tborder-radius: 4px;\r\n }\r\n\r\n.accordion .link[_v-9e0aeef2] {\r\n\tcursor: pointer;\r\n\tdisplay: block;\r\n\tpadding: 15px 15px 15px 42px;\r\n\tcolor: #739217;\r\n\tfont-size: 14px;\r\n\tfont-weight: 400;\r\n\tborder-bottom: 1px solid #CCC;\r\n\tposition: relative;\r\n\t-webkit-transition: all 0.4s ease;\r\n\ttransition: all 0.4s ease;\r\n}\r\n\r\n.accordion li:last-child .link[_v-9e0aeef2] {\r\n\tborder-bottom: 0;\r\n}\r\n\r\n.accordion li i[_v-9e0aeef2] {\r\n\tposition: absolute;\r\n\ttop: 16px;\r\n\tleft: 12px;\r\n\tfont-size: 18px;\r\n\tcolor: #739217;\r\n\t-webkit-transition: all 0.4s ease;\r\n\ttransition: all 0.4s ease;\r\n}\r\n\r\n.accordion li i.fa-chevron-down[_v-9e0aeef2],.accordion li i.fa-plus[_v-9e0aeef2]{\r\n\tright: 12px;\r\n\tleft: auto;\r\n\tfont-size: 16px;\r\n}\r\n\r\n.accordion li.open .link[_v-9e0aeef2] {\r\n\tcolor: #739217;\r\n}\r\n\r\n.accordion li.open i[_v-9e0aeef2] {\r\n\tcolor: #739217;\r\n}\r\n.accordion li.open i.fa-chevron-down[_v-9e0aeef2]{\r\n\t-webkit-transform: rotate(180deg);\r\n\ttransform: rotate(180deg);\r\n}\r\n.accordion .open>.link .fa-plus[_v-9e0aeef2]{\r\n\t-webkit-transform: rotate(45deg);\r\n\ttransform: rotate(45deg);\r\n}\r\n\r\n/**\r\n * Submenu\r\n -----------------------------*/\r\n .submenu[_v-9e0aeef2] {\r\n \tdisplay: none;\r\n \tbackground: #444359;\r\n \tfont-size: 14px;\r\n \tmax-height: 30rem;\r\n \toverflow-y: auto;\r\n }\r\n\r\n .submenu li[_v-9e0aeef2] {\r\n \tborder-bottom: 1px solid #4b4a5e;\r\n }\r\n .submenu .link[_v-9e0aeef2]{\r\n\tcolor:white!important;\r\n}\r\n.submenu .link i[_v-9e0aeef2]{\r\n\tcolor:white!important;\r\n}\r\n \r\n .submenu a[_v-9e0aeef2] {\r\n \tdisplay: block;\r\n \ttext-decoration: none;\r\n \tcolor: #d9d9d9;\r\n \tpadding: 12px;\r\n \tpadding-left: 42px;\r\n \t-webkit-transition: all 0.25s ease;\r\n \ttransition: all 0.25s ease;\r\n }\r\n\r\n .submenu a[_v-9e0aeef2]:hover {\r\n \tbackground: #739217;\r\n \tcolor: #FFF;\r\n }\r\n .submenu .selected[_v-9e0aeef2]{\r\n \tbackground: #A1C636;\r\n \tcolor: #000;\r\n }\r\n", ""]);

	// exports


/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <style scoped>
	// ul {
	// 	list-style-type: none;
	// }
	//
	// a {
	// 	color: #b63b4d;
	// 	text-decoration: none;
	// }
	//
	// /** =======================
	//  * Contenedor Principal
	//  ===========================*/
	// h1 {
	//  	color: #FFF;
	//  	font-size: 24px;
	//  	font-weight: 400;
	//  	text-align: center;
	//  	margin-top: 80px;
	//  }
	//
	// h1 a {
	//  	color: #c12c42;
	//  	font-size: 16px;
	//  }
	//
	//  .accordion {
	//  	width: 100%;
	//  	max-width: 360px;
	//  	margin: 30px auto 20px;
	//  	background: #FFF;
	//  	-webkit-border-radius: 4px;
	//  	-moz-border-radius: 4px;
	//  	border-radius: 4px;
	//  }
	//
	// .accordion .link {
	// 	cursor: pointer;
	// 	display: block;
	// 	padding: 15px 15px 15px 42px;
	// 	color: #739217;
	// 	font-size: 14px;
	// 	font-weight: 400;
	// 	border-bottom: 1px solid #CCC;
	// 	position: relative;
	// 	-webkit-transition: all 0.4s ease;
	// 	-o-transition: all 0.4s ease;
	// 	transition: all 0.4s ease;
	// }
	//
	// .accordion li:last-child .link {
	// 	border-bottom: 0;
	// }
	//
	// .accordion li i {
	// 	position: absolute;
	// 	top: 16px;
	// 	left: 12px;
	// 	font-size: 18px;
	// 	color: #739217;
	// 	-webkit-transition: all 0.4s ease;
	// 	-o-transition: all 0.4s ease;
	// 	transition: all 0.4s ease;
	// }
	//
	// .accordion li i.fa-chevron-down,.accordion li i.fa-plus{
	// 	right: 12px;
	// 	left: auto;
	// 	font-size: 16px;
	// }
	//
	// .accordion li.open .link {
	// 	color: #739217;
	// }
	//
	// .accordion li.open i {
	// 	color: #739217;
	// }
	// .accordion li.open i.fa-chevron-down{
	// 	-webkit-transform: rotate(180deg);
	// 	-ms-transform: rotate(180deg);
	// 	-o-transform: rotate(180deg);
	// 	transform: rotate(180deg);
	// }
	// .accordion .open>.link .fa-plus{
	// 	-webkit-transform: rotate(45deg);
	// 	-ms-transform: rotate(45deg);
	// 	-o-transform: rotate(45deg);
	// 	transform: rotate(45deg);
	// }
	//
	// /**
	//  * Submenu
	//  -----------------------------*/
	//  .submenu {
	//  	display: none;
	//  	background: #444359;
	//  	font-size: 14px;
	//  	max-height: 30rem;
	//  	overflow-y: auto;
	//  }
	//
	//  .submenu li {
	//  	border-bottom: 1px solid #4b4a5e;
	//  }
	//  .submenu .link{
	// 	color:white!important;
	// }
	// .submenu .link i{
	// 	color:white!important;
	// }
	//
	//  .submenu a {
	//  	display: block;
	//  	text-decoration: none;
	//  	color: #d9d9d9;
	//  	padding: 12px;
	//  	padding-left: 42px;
	//  	-webkit-transition: all 0.25s ease;
	//  	-o-transition: all 0.25s ease;
	//  	transition: all 0.25s ease;
	//  }
	//
	//  .submenu a:hover {
	//  	background: #739217;
	//  	color: #FFF;
	//  }
	//  .submenu .selected{
	//  	background: #A1C636;
	//  	color: #000;
	//  }
	// </style>
	// <!-- Contenedor -->
	// <template>
	// <div style="display:inline-block;">
	//  <button type="button" class="btn  btn-sm" style="vertical-align: baseline;" data-toggle="modal" :data-target="'#'+modal_id">{{btn_title}}</button>
	// <!-- Modal -->
	// <div class="modal fade" :id="modal_id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	//   <div class="modal-dialog" role="document">
	//     <div class="modal-content">
	//       <div class="modal-header">
	// 	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	// 	<h4 class="modal-title">部门列表</h4>
	//       </div>
	//       <div class="modal-body">
	//
	// 		<!--accordion start -->
	//
	// 			<ul :id="accordion_id" class="accordion">
	// 				<li v-for="org in orgs">
	// 					<div class="link"><i class="fa fa-th-list"></i>{{org.name}}<i class="fa fa-chevron-down"></i></div>
	// 					<ul class="submenu">
	//
	// 						<li  v-for="dept in depts[org.ou]">
	// 						<template v-if="sections[dept.ou]">
	// 							<div class="link" ><i class="fa fa-th-list"></i>{{dept.name}}<i class="fa fa-plus"></i></div>
	// 							<ul class="submenu">
	// 								<li v-for="section in sections[dept.ou]"><a @click="selectDept(section,$event)">{{section.name}}</a></li>
	// 							</ul>
	// 						</template>
	// 							<template v-else>
	// 								<a @click="selectDept(dept,$event)">{{dept.name}}</a>
	// 							</template>
	// 						</li>
	// 					</ul>
	// 				</li>			
	// 			</ul>
	// 		</div>
	// 		<!-- accordion end -->
	//
	//        <!-- <com-accordion :selected-Depts.sync="selectedDepts" :supervision-request="requests" multiple="true"></com-accordion> -->
	//       </div>
	//      <!--  <div class="modal-footer">
	//      	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	//      	<button type="button" class="btn btn-primary">Save changes</button>
	//      </div> -->
	//     </div>
	//   </div>
	// </div>
	// <!--modal end-->
	//
	//
	//
	// </template>
	// <script >
	exports.default = {
		data: function data() {
			return {
				modal_id: "deptModal" + new Date().getTime(),
				accordion_id: "accordion" + new Date().getTime(),
				orgs: [],
				depts: {},
				sections: {},
				times: {}
			};
		},

		props: ["supervisionRequest", "selectedDepts", "multiple", "btn_title"],
		created: function created() {
			// console.log(this.supervisionRequest)	

			var _this = this;
			$.ajax({
				type: "get",
				dataType: "json",
				url: this.supervisionRequest.orgUrl,
				success: function success(result, state, jqxhr) {
					_this.orgs = result;
					_this.fetchDepts();
				},
				error: function error(data, state, jqxhr) {
					console.log(jqxhr.key);
					console.log(data);
				}
			});
		},
		ready: function ready() {
			var _this = this;
			var Accordion = function Accordion(el, multiple) {
				this.el = el || {};
				this.multiple = multiple || false;
				this.el.on("click", ".link", { el: this.el, multiple: this.multiple }, this.dropdown);
			};
			Accordion.prototype.dropdown = function (e) {
				var $el = e.data.el,
				    $this = $(this),
				    $next = $this.next();
				$next.toggle();
				$this.parent().toggleClass('open');
				var parentBro = $this.parent().siblings();
				for (var i = 0; i < parentBro.length; i++) {
					var single = $(parentBro[i]);
					if (single.hasClass("open")) {
						single.find(">.submenu").toggle();
						single.toggleClass("open");
						break;
					}
				}
			};

			var accordion = new Accordion($('#' + _this.accordion_id), true);
		},

		methods: {
			selectDept: function selectDept(dept, event) {
				var selectedDepts = this.selectedDepts;
				dept.selected = !dept.selected;
				if (this.multiple == "false") {
					if (selectedDepts.length > 0) {
						selectedDepts[0].selected = false;
						if (this.selected) {
							this.selected.toggleClass("selected");
						}
					}
					this.selectedDepts = [];
					if (dept.selected) {
						this.selectedDepts.push(dept);
						this.selected = $(event.currentTarget).toggleClass("selected");
					}
					return;
				}

				$(event.currentTarget).toggleClass("selected");
				if (dept.selected) {
					selectedDepts.push(dept);
				} else {
					for (var i in selectedDepts) {
						if (selectedDepts[i].id == dept.id) {
							selectedDepts.splice(i, 1);
							break;
						}
					}
				}
			},
			fetchDepts: function fetchDepts() {
				var _this = this;
				this.times.dept = 0;
				$.ajax({
					type: "get",
					dataType: "json",
					url: this.supervisionRequest.deptUrl,
					success: function success(result, state, jqxhr) {
						if (result && result.length > 0) {
							// _this.depts[jqxhr.index.toString()]=result;	
							for (var i = 0; i < result.length; i++) {
								result[i].selected = false;
							}
							var depts = result;
							var orgs = _this.orgs,
							    department = {},
							    sections = {};
							for (var _i = 0, len = orgs.length; _i < len; _i++) {
								var pid = orgs[_i].id;
								var new_depts = [];
								for (var di = 0; di < depts.length; di++) {
									if (depts[di].pid == pid) {
										new_depts.push(depts[di]);
										depts.splice(di, 1);
										di--;
									}
								}
								department[pid] = new_depts;
							}
							for (var key in department) {
								var dept = department[key];
								for (var _i2 = 0; _i2 < dept.length; _i2++) {
									var _pid = dept[_i2].id;
									sections[_pid] = [];
									for (var si = 0; si < depts.length; si++) {
										if (_pid == depts[si].pid) {
											sections[_pid].push(depts[si]);
											depts.splice(si, 1);
											si--;
										}
									}
									if (sections[_pid].length == 0) delete sections[_pid];
								}
							}
							_this.depts = department;
							_this.sections = sections;
						}
					},
					error: function error(data) {
						console.log(data);
					}
				});
			},
			fetchSections: function fetchSections(iid) {
				var _this = this,
				    depts = this.depts[iid];
				this.times[iid] = 0;
				for (var i = 0, len = depts.length; i < len; i++) {
					$.ajax({
						type: "get",
						dataType: "json",
						url: this.supervisionRequest.deptUrl + depts[i].ou,
						success: function success(result, state, jqxhr) {
							for (var j = 0; j < result.length; j++) {
								result[j].selected = false;
							}
							if (result && result.length > 0) {

								var ou = jqxhr.index.toString();
								_this.sections[ou] = result;
								// let sections=_this.sections;						
								// _this.sections={};
								// _this.sections=sections;		
							}

							if (++_this.times[iid] == _this.depts[iid].length) {
								var sections = _this.sections;
								_this.sections = {};
								_this.sections = sections;
							}
						},
						error: function error(data) {
							console.log(data);
						}
					}).index = depts[i].ou;
				}
			}
		}
	};

	// </script>

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div style=\"display:inline-block;\" _v-9e0aeef2=\"\">\n <button type=\"button\" class=\"btn  btn-sm\" style=\"vertical-align: baseline;\" data-toggle=\"modal\" :data-target=\"'#'+modal_id\" _v-9e0aeef2=\"\">{{btn_title}}</button>\n<!-- Modal -->\n<div class=\"modal fade\" :id=\"modal_id\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" _v-9e0aeef2=\"\">\n  <div class=\"modal-dialog\" role=\"document\" _v-9e0aeef2=\"\">\n    <div class=\"modal-content\" _v-9e0aeef2=\"\">\n      <div class=\"modal-header\" _v-9e0aeef2=\"\">\n\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" _v-9e0aeef2=\"\"><span aria-hidden=\"true\" _v-9e0aeef2=\"\">×</span></button>\n\t<h4 class=\"modal-title\" _v-9e0aeef2=\"\">部门列表</h4>\n      </div>\n      <div class=\"modal-body\" _v-9e0aeef2=\"\">\n\n\t\t<!--accordion start -->\n\t\t\n\t\t\t<ul :id=\"accordion_id\" class=\"accordion\" _v-9e0aeef2=\"\">\n\t\t\t\t<li v-for=\"org in orgs\" _v-9e0aeef2=\"\">\n\t\t\t\t\t<div class=\"link\" _v-9e0aeef2=\"\"><i class=\"fa fa-th-list\" _v-9e0aeef2=\"\"></i>{{org.name}}<i class=\"fa fa-chevron-down\" _v-9e0aeef2=\"\"></i></div>\n\t\t\t\t\t<ul class=\"submenu\" _v-9e0aeef2=\"\">\n\t\t\t\t\t\t\n\t\t\t\t\t\t<li v-for=\"dept in depts[org.ou]\" _v-9e0aeef2=\"\">\n\t\t\t\t\t\t<template v-if=\"sections[dept.ou]\">\n\t\t\t\t\t\t\t<div class=\"link\" _v-9e0aeef2=\"\"><i class=\"fa fa-th-list\" _v-9e0aeef2=\"\"></i>{{dept.name}}<i class=\"fa fa-plus\" _v-9e0aeef2=\"\"></i></div>\n\t\t\t\t\t\t\t<ul class=\"submenu\" _v-9e0aeef2=\"\">\n\t\t\t\t\t\t\t\t<li v-for=\"section in sections[dept.ou]\" _v-9e0aeef2=\"\"><a @click=\"selectDept(section,$event)\" _v-9e0aeef2=\"\">{{section.name}}</a></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t<template v-else=\"\">\n\t\t\t\t\t\t\t\t<a @click=\"selectDept(dept,$event)\" _v-9e0aeef2=\"\">{{dept.name}}</a>\n\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</li>\t\t\t\n\t\t\t</ul>\n\t\t</div>\n\t\t<!-- accordion end -->\n\n       <!-- <com-accordion :selected-Depts.sync=\"selectedDepts\" :supervision-request=\"requests\" multiple=\"true\"></com-accordion> -->\n      </div>\n     <!--  <div class=\"modal-footer\">\n     \t<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>\n     \t<button type=\"button\" class=\"btn btn-primary\">Save changes</button>\n     </div> -->\n    </div>\n  </div>\n</div>\n<!--modal end-->\n\n\n\t\n";

/***/ }
/******/ ]);