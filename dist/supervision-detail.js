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

	var _stringify = __webpack_require__(1);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _commonFunction = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var supervisionRequest = window.interfaceSettings.supervisionRequest.api; /**
	                                                                           * Created by Mattia on 2016/6/23.
	                                                                           */

	var timeNow = new Date().getTime();
	var detailVm = new Vue({
	    el: "#article",
	    data: {
	        previous: null,
	        id: null,
	        "code": "",
	        "pid": null,
	        "pcode": null,
	        "name": "",
	        "source": "",
	        "area": "",
	        "status": "0",
	        "importance": 4,
	        "urgency": 5,
	        "scope": "",
	        "estimatedcompletetiontime": "",
	        "actualcompletetiontime": null,
	        "accountablesn": "",
	        "accountablename": "",
	        "responsiblesn": "",
	        "responsiblename": " ",
	        "responsibledeptcode": null,
	        "responsibledeptname": null,
	        "comments": null,
	        "latestTrace": {},
	        children: [],
	        progressModalId: "progressModal" + timeNow,
	        modalId: "modal" + timeNow,
	        progressRate: 4,
	        currentModal: "close",
	        updateItem: {},
	        userLogin: {},
	        traceHistory: [],
	        alertMessage: "保存成功",
	        area_name: "",
	        source_name: ""
	    },
	    computed: {
	        escapeName: function escapeName() {
	            return escape(this.name);
	        }
	    },
	    created: function created() {
	        var _this = this;
	        if (window.userLogin) ;else window.userLogin = {
	            updateuserid: (0, _commonFunction.getCookie)("userid"),
	            updateusername: (0, _commonFunction.getCookie)("username")
	        };
	        this.userLogin = window.userLogin;
	        this.userLogin = {
	            updateuserid: (0, _commonFunction.getCookie)("userid"),
	            updateusername: (0, _commonFunction.getCookie)("username")
	        };
	        this.id = (0, _commonFunction.getQueryString)("id");
	        this.fetchOriginSupervision(this.id);
	        this.fetchTrace();
	        this.previous = (0, _commonFunction.getQueryString)("previous");
	    },
	    methods: {
	        alertModal: function alertModal(message) {
	            this.alertMessage = message;
	            $("#alertModal").modal("show");
	        },
	        missrole: function missrole() {
	            this.currentModal = "missrole";
	            this.showModal();
	        },
	        fetchOriginSupervision: function fetchOriginSupervision(iid) {
	            var _this = this;
	            $.ajax({
	                type: "get",
	                dataType: "json",
	                url: (0, _commonFunction.setSupervisionHeader)(supervisionRequest.supDetailUrl, null, iid),
	                success: function success(result) {
	                    var children = [];
	                    for (var i = 0, len = result.length; i < len; i++) {
	                        var item = result[i];
	                        if (item.id == iid) {
	                            for (var key in item) {
	                                _this[key] = item[key];
	                            }
	                            if (item.latestTrace) _this.progressRate = item.latestTrace.rate ? item.latestTrace.rate : 0;
	                        } else {
	                            children.push(item);
	                        }
	                    }

	                    _this.children = children;
	                },
	                error: function error(data) {
	                    console.log(data);
	                }
	            });
	        },
	        fetchTrace: function fetchTrace() {
	            var _this = this;
	            $.ajax({
	                type: "get",
	                url: (0, _commonFunction.setSupervisionHeader)(supervisionRequest.traceHistory, null, this.id),
	                success: function success(result, state, xhr) {
	                    console.log("result", (0, _stringify2.default)(result));
	                    _this.traceHistory = result;
	                },
	                error: function error(result, state, xhr) {
	                    console.log("error", result);
	                }
	            });
	        },
	        updateProgress: function updateProgress() {
	            // $("#"+this.progressModalId).modal({backdrop: 'static', keyboard: false});
	            this.updateItem.id = this.id;
	            this.currentModal = "updateProgress";
	            this.showModal();
	        },
	        showModal: function showModal() {
	            $("#" + this.modalId).modal({ backdrop: 'static', keyboard: false });
	        },
	        editOperation: function editOperation(id) {
	            if (this.userLogin.updateuserid != this.accountablesn) {
	                this.alertModal("非发起人角色无此操作权限");
	                return;
	            }
	            window.location.href = '/pages/supervision/supervision-edit.html?id=' + id + '&previous=detail';
	        },
	        postphone: function postphone(param) {
	            var item = parent == "parent" ? this : param;
	            if (this.userLogin.updateuserid != item.accountablesn) {
	                this.alertModal("非发起人角色无此操作权限");
	                return;
	            }
	            this.currentModal = "postphone";
	            this.postphoneDate = item.estimatedcompletetiontime;
	            this.updateItem = {
	                id: item.id,
	                postphoneDate: item.estimatedcompletetiontime,
	                comment: ""
	            };
	            this.showModal();
	        },
	        revoke: function revoke(item) {
	            item = item == "parent" ? this : item;
	            if (this.userLogin.updateuserid != item.accountablesn) {
	                this.alertModal("非发起人角色无此操作权限");
	                return;
	            }
	            this.currentModal = "revoke";
	            this.updateItem = {
	                id: item.id,
	                comment: ""
	            };
	            this.showModal();
	        },
	        close: function close(item) {
	            item = item == "parent" ? this : item;
	            if (this.userLogin.updateuserid != item.accountablesn) {
	                this.alertModal("非发起人角色无此操作权限");
	                return;
	            }
	            this.currentModal = "close";
	            this.updateItem = {
	                id: item.id,
	                comment: ""
	            };
	            this.showModal();
	        },
	        saveChanges: function saveChanges() {
	            var _this = this;
	            var item = this.updateItem;
	            var url = "",
	                type = "";
	            var options = {};
	            switch (this.currentModal) {
	                case "updateProgress":
	                    options = {
	                        "operatorname": this.userLogin.username,
	                        "operatorsn": this.userLogin.userid,
	                        "description": this.comments,
	                        "rate": this.progressRate,
	                        "supervisionid": this.updateItem.id
	                    };
	                    url = (0, _commonFunction.setSupervisionHeader)(supervisionRequest.traceUrl, null, this.id);
	                    type = "put";
	                    break;
	                case "postphone":
	                    url = (0, _commonFunction.setSupervisionHeader)(supervisionRequest.postphoneUrl, { newDateStr: item.postphoneDate }, item.id);
	                    type = "put";
	                    break;
	                case "revoke":
	                    url = (0, _commonFunction.setSupervisionHeader)(supervisionRequest.revokeUrl, null, item.id);
	                    type = "delete";
	                    break;
	                case "close":
	                    url = (0, _commonFunction.setSupervisionHeader)(supervisionRequest.closeUrl, null, item.id);
	                    type = "delete";
	                    break;
	            }
	            if (this.currentModal != "updateProgress") {
	                options = {
	                    "updateuserid": this.userLogin.updateuserid,
	                    "updateusername": this.userLogin.updateusername,
	                    "reason": this.comments
	                };
	            }
	            $.ajax({
	                type: type,
	                contentType: "application/json",
	                data: (0, _stringify2.default)(options),
	                url: url,
	                success: function success(result, state, xhr) {
	                    $("#" + _this.modalId).modal("hide");
	                    var messageCode = result.messagecode;
	                    if (messageCode == 200) {
	                        (function () {
	                            _this.alertModal("保存成功");
	                            var timer = setTimeout(function () {
	                                clearTimeout(timer);
	                                location.reload();
	                            }, 500);
	                        })();
	                    } else {
	                        _this.alertModal("保存失败");
	                    }
	                },

	                error: function error(result, state, xhr) {
	                    console.log("error", result);
	                    this.alertModal("保存失败");
	                }
	            });
	        }
	    },
	    components: {
	        // updateRate:require("../supervision/components/update-rate.vue"),
	        postphone: __webpack_require__(5),
	        modalPop: __webpack_require__(12),
	        progressBar: __webpack_require__(15)
	    }

	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(3)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.fetchAjaxService = exports.loadingCover = exports.getQueryString = exports.deleteCookie = exports.getCookie = exports.setCookie = exports.add_supervision = exports.fetch_sourceFromServer = exports.fetch_areaFromServer = exports.fetch_deptsFromServer = exports.fetch_serviceByHttpProtocol = exports.setSupervisionHeader = undefined;

	var _stringify = __webpack_require__(1);

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(6)
	__vue_script__ = __webpack_require__(10)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\supervision\\components\\postphone.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(11)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./postphone.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-2a88e1ae&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./postphone.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-2a88e1ae&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./postphone.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n.comment[_v-2a88e1ae]{\n\tmargin-top: 1rem;\n}\n\n", ""]);

	// exports


/***/ },
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <style scoped>
	// 	.comment{
	// 		margin-top: 1rem;
	// 	}
	//
	// </style>
	// <template>
	// 	<div class="com-container">
	// 	<form class="form-horizontal">
	// 	  <div class="form-group">
	// 	    <label  class="col-sm-2 control-label">日期</label>
	// 	    <div class="col-sm-10">
	// 	      <input type="text" class="form-control" :id="input_id"/>
	// 	    </div>
	// 	  </div>
	// 	  <div class="form-group">
	// 	    <label  class="col-sm-2 control-label">延期原因</label>
	// 	    <div class="col-sm-10">
	// 	   <textarea class="form-control comment" v-model="comment"></textarea>
	// 	    </div>
	// 	  </div>
	//   	</form>
	//
	// 	</div>
	// </template>
	// <script >
	exports.default = {
		data: function data() {
			var timeNow = new Date().getTime();
			return {
				input_id: "dateInput" + timeNow
			};
		}, props: ["estimatedcompletetiontime", "comment"],
		created: function created() {
			var _this = this;
			this.$watch("estimatedcompletetiontime", function (newVal, oldVal) {
				$("#" + _this.input_id).val(newVal);
			});
		}, ready: function ready() {
			var _this = this;
			$("#" + this.input_id).daterangepicker({
				singleDatePicker: true,
				showDropdowns: true,
				//       locale: {
				//   format: 'YYYY-MM-DD'
				// },
				startDate: this.estimatedcompletetiontime
			}, function (start, end, label) {
				_this.estimatedcompletetiontime = start.format('YYYY-MM-DD');
			});
		}
	};
	// </script>

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\t<div class=\"com-container\" _v-2a88e1ae=\"\">\n\t<form class=\"form-horizontal\" _v-2a88e1ae=\"\">\n\t  <div class=\"form-group\" _v-2a88e1ae=\"\">\n\t    <label class=\"col-sm-2 control-label\" _v-2a88e1ae=\"\">日期</label>\n\t    <div class=\"col-sm-10\" _v-2a88e1ae=\"\">\n\t      <input type=\"text\" class=\"form-control\" :id=\"input_id\" _v-2a88e1ae=\"\">\n\t    </div>\n\t  </div>\n\t  <div class=\"form-group\" _v-2a88e1ae=\"\">\n\t    <label class=\"col-sm-2 control-label\" _v-2a88e1ae=\"\">延期原因</label>\n\t    <div class=\"col-sm-10\" _v-2a88e1ae=\"\">\n\t   <textarea class=\"form-control comment\" v-model=\"comment\" _v-2a88e1ae=\"\"></textarea>\n\t    </div>\n\t  </div>\n  \t</form>\n\t\n\t</div>\n";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(13)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\modal-pop.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(14)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./modal-pop.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// <!-- <button class="btn btn-sm" data-toggle="modal" :data-target="'#'+modal_id">button</button> -->
	// <div class="modal fade" :id="modal_id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	//   <div class="modal-dialog" role="document">
	//     <div class="modal-content">
	//       <div class="modal-header">
	// 		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	// 		<h4 class="modal-title"></h4>
	//       </div>
	//       <div class="modal-body">
	//       <slot name="body"></slot>
	// 		</div>
	// 		<!-- accordion end -->
	// 		<div class="modal-footer">
	// 		<slot name="save"></slot>
	// 	     	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	//      	</div>
	//       </div>   
	//     </div>
	//   </div>
	// </template>
	// <script >
	exports.default = {
		data: function data() {
			var timeNow = new Date().getTime();
			return {
				// :"modal"+timeNow
			};
		},

		props: ["modalTitle", "modal_id"]
	};

	// </script>

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "\r\n<!-- <button class=\"btn btn-sm\" data-toggle=\"modal\" :data-target=\"'#'+modal_id\">button</button> -->\r\n<div class=\"modal fade\" :id=\"modal_id\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\r\n\t\t<h4 class=\"modal-title\"></h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n      <slot name=\"body\"></slot>\r\n\t\t</div>\r\n\t\t<!-- accordion end -->\r\n\t\t<div class=\"modal-footer\">\r\n\t\t<slot name=\"save\"></slot>\r\n\t     \t<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>\r\n     \t</div>\r\n      </div>    \r\n    </div>\r\n  </div>\r\n";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(16)
	__vue_script__ = __webpack_require__(18)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\progressbar-drag.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(19)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./progressbar-drag.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1214d038&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./progressbar-drag.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1214d038&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./progressbar-drag.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\r\n.scale_panel[_v-1214d038]{\r\n\tfont-size:12px;\r\n\tcolor:#999;\r\n\twidth:70%;\r\n\tposition:absolute; \r\n\tline-height:18px; \r\n\tleft:60px;\r\n\ttop:-0px;\r\n}\r\n.scale_panel .r[_v-1214d038]{\r\n\tfloat:right;\r\n}\r\n.scale span[_v-1214d038]{\r\n\t\r\n\twidth:8px;\r\n\theight:16px; \r\n\tposition:absolute; \r\n\t/*left:-2px;*/\r\n\ttop:-5px;\r\n\tcursor:pointer;\r\n\t/*background-color: lightgrey;*/\r\n}\r\n.scale[_v-1214d038]{ background-repeat: repeat-x; background-position: 0 100%; background-color: #E4E4E4; border-left: 1px #83BBD9 solid;  width: 100%; height: 3px; position: relative; font-size: 0px; border-radius: 3px; }\r\n.scale .bar[_v-1214d038]{ background-repeat: repeat-x; background-color: #3BE3FF; width: 0px; position: absolute; height: 3px; width: 0; left: 0; bottom: 0; }\r\n\r\n", ""]);

	// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <style scoped>
	// .scale_panel{
	// 	font-size:12px;
	// 	color:#999;
	// 	width:70%;
	// 	position:absolute;
	// 	line-height:18px;
	// 	left:60px;
	// 	top:-0px;
	// }
	// .scale_panel .r{
	// 	float:right;
	// }
	// .scale span{
	//
	// 	width:8px;
	// 	height:16px;
	// 	position:absolute;
	// 	/*left:-2px;*/
	// 	top:-5px;
	// 	cursor:pointer;
	// 	/*background-color: lightgrey;*/
	// }
	// .scale{ background-repeat: repeat-x; background-position: 0 100%; background-color: #E4E4E4; border-left: 1px #83BBD9 solid;  width: 100%; height: 3px; position: relative; font-size: 0px; border-radius: 3px; }
	// .scale .bar{ background-repeat: repeat-x; background-color: #3BE3FF; width: 0px; position: absolute; height: 3px; width: 0; left: 0; bottom: 0; }
	//
	// </style>
	// <template>
	// 	<div class="progress-container">
	// 		<span :id="title_id" v-text="rate+'%'"></span>
	// <div class="scale_panel">
	// 	<span class="r">100</span>0
	// 	<div class="scale" :id="bar_id">
	// 		<div class="bar" :style="{width:rate+'%'}"></div>
	// 		<span :id="btn_id" style="background: url(assets/images/progressdrag.gif) no-repeat; " :style="{left:rate+'%'}"></span>
	// 	</div>
	// </div>
	// 	</div>
	// </template>
	//
	// <script>
	var scale = function scale(btn, bar, title, _this) {
		this.btn = document.getElementById(btn);
		this.bar = document.getElementById(bar);
		this.title = document.getElementById(title);
		this.step = this.bar.getElementsByTagName("div")[0];
		this.init(_this);
	};
	scale.prototype = {
		init: function init(_this) {
			var f = this,
			    g = document,
			    b = window,
			    m = Math;
			f.btn.onmousedown = function (e) {
				var x = (e || b.event).clientX;
				var l = this.offsetLeft;
				var max = f.bar.offsetWidth - this.offsetWidth;
				g.onmousemove = function (e) {
					var thisX = (e || b.event).clientX;
					var to = m.min(max, m.max(-2, l + (thisX - x)));
					f.btn.style.left = to + 'px';
					f.ondrag(m.round(m.max(0, to / max) * 100), to);
					b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
					_this.rate = m.round(m.max(0, to / max) * 100);
				};
				g.onmouseup = new Function('this.onmousemove=null');
			};
		},
		ondrag: function ondrag(pos, x) {
			this.step.style.width = Math.max(0, x) + 'px';
			this.title.innerHTML = pos + '%';
		}
	};

	exports.default = {
		data: function data() {
			var timeStr = new Date().getTime();
			return {
				btn_id: "btn" + timeStr,
				bar_id: "bar" + timeStr,
				title_id: "title" + timeStr
			};
		},

		props: ["rate"],
		created: function created() {},
		ready: function ready() {
			new scale(this.btn_id, this.bar_id, this.title_id, this);
		},
		methods: {}
	};

	// </script>

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t<div class=\"progress-container\" _v-1214d038=\"\">\n\t\t<span :id=\"title_id\" v-text=\"rate+'%'\" _v-1214d038=\"\"></span>\n<div class=\"scale_panel\" _v-1214d038=\"\">\n\t<span class=\"r\" _v-1214d038=\"\">100</span>0\n\t<div class=\"scale\" :id=\"bar_id\" _v-1214d038=\"\">\n\t\t<div class=\"bar\" :style=\"{width:rate+'%'}\" _v-1214d038=\"\"></div>\n\t\t<span :id=\"btn_id\" style=\"background: url(assets/images/progressdrag.gif) no-repeat; \" :style=\"{left:rate+'%'}\" _v-1214d038=\"\"></span>\n\t</div> \n</div> \n\t</div>\n";

/***/ }
/******/ ]);