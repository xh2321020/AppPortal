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
	                                                                           * Created by Mattia on 2016/6/12.
	                                                                           */
	// var requestInterfaces=require("../webconfig.js")

	var filterVm = new Vue({
	    el: "#filterSection",
	    data: {
	        userLoginInfo: {},
	        filterOptions: {
	            areaCode: [],
	            sourceCode: [],
	            // accountablesn:"",
	            responsiblesn: ""
	        },
	        dateFilter: [{ title: "全部", status: true }, { title: "上周", status: true }, { title: "本周", status: true }, { title: "下周", status: true }, { title: "时段", status: true }],
	        dateOptions: {
	            show: false,
	            type: "date", //date datetime
	            value: "2016-6-21",
	            begin: "2016-6-20",
	            end: "2016-12-25",
	            x: 0,
	            y: 0,
	            range: true },
	        //是否多选
	        area: [], source: [],
	        derivedMeeting: [],
	        stateList: [{ label: "正常", value: true, feature: "label-success", margin: '50%' }, { label: "一周内过期", value: true, feature: "label-warning", margin: '' }, { label: "已过期", value: true, feature: "label-danger", margin: '' }, { label: "已完成", value: false, feature: "label-default", margin: '' }]
	    },
	    methods: {
	        changeTime: function changeTime(ev) {
	            // 日期条件选择
	            var that = this;
	            ev.stopPropagation();
	            var curtar = ev.currentTarget;
	            var btn = $(curtar);
	            var mark = curtar.getAttribute("data-mark");
	            if (!btn.hasClass("btn-success") || mark == "custom") {
	                $("#datePicker").find(".btn").removeClass("btn-success");
	                btn.addClass("btn-success");

	                switch (mark) {
	                    case "all":
	                        delete this.filterOptions.searchBeginDate;
	                        delete this.filterOptions.searchEndDate;
	                        break;
	                    case "lastweek":
	                        this.filterOptions.searchBeginDate = moment().day(-6).format("YYYY-MM-DD");
	                        this.filterOptions.searchEndDate = moment().day(0).format("YYYY-MM-DD");
	                        break;
	                    case "thisweek":
	                        this.filterOptions.searchBeginDate = moment().weekday(1).format("YYYY-MM-DD");
	                        this.filterOptions.searchEndDate = moment().day(7).format("YYYY-MM-DD");
	                        break;
	                    case "nextweek":
	                        this.filterOptions.searchBeginDate = moment().day(8).format("YYYY-MM-DD");
	                        this.filterOptions.searchEndDate = moment().day(14).format("YYYY-MM-DD");
	                        break;
	                    case "custom":
	                        var start = $("#startDate").val().split("/");
	                        var end = $("#endDate").val().split("/");
	                        this.filterOptions.searchBeginDate = start[2] + "-" + start[0] + "-" + start[1];
	                        this.filterOptions.searchEndDate = end[2] + "-" + end[0] + "-" + end[1];
	                        break;
	                }
	                resultVm.fetchTransactions(supervisionRequest.searchUrl);
	            }
	        },
	        changeArea: function changeArea(index, filter) {
	            // console.log(JSON.stringify(this.area.show));return;
	            if (filter == "source" && (index == 0 || this.source[index].diccode == "MEETING")) {
	                var sourceArray = this.filterOptions["sourceCode"];
	                var meetings = this.derivedMeeting;
	                for (var _i = 0; _i < meetings.length; _i++) {
	                    var metindex = $.inArray(meetings[_i].diccode, sourceArray);
	                    if (metindex > -1) {
	                        sourceArray.splice(metindex, 1);
	                        this.derivedMeeting[_i].status = "0";
	                    }
	                }
	            }

	            var area = this[filter];
	            if (index == 0) {
	                if (area[0].status == "1") return; //all
	                area[0].status = "1";
	                for (var _i2 = 1, len = area.length; _i2 < len; _i2++) {
	                    area[_i2].status = "0";
	                }
	                this.filterOptions[filter + "Code"] = [];
	            } else {
	                //other
	                var areaCode = this.filterOptions[filter + "Code"];
	                area[0].status = "0";
	                if (area[index].status == "1") {
	                    area[index].status = "0";

	                    for (var _i3 in areaCode) {
	                        if (areaCode[_i3] == area[index].diccode) {
	                            areaCode.splice(_i3, 1);
	                        }
	                    }
	                } else {
	                    area[index].status = "1";
	                    areaCode.push(area[index].diccode);
	                }
	                this.filterOptions[filter + "Code"] = areaCode;
	            }
	            this[filter] = area;
	            //
	            resultVm.fetchTransactions(supervisionRequest.searchUrl);
	        },
	        changeMeeting: function changeMeeting(index) {
	            // body...
	            var source = this.source;
	            var options = this.filterOptions["sourceCode"];
	            if (source[0].status == "1") {
	                source[0].status = "0";
	                var indMeeting0 = $.inArray(source[0].diccode, options);
	                options.splice(indMeeting0, 1); //markable for responsive options
	            }
	            for (var _i4 = 1; _i4 < source.length; _i4++) {
	                if (source[_i4].diccode == "MEETING" && source[_i4].status == "1") {
	                    source[_i4].status = "0";
	                    var indMeeting = $.inArray(source[_i4].diccode, options);
	                    options.splice(indMeeting, 1); //markable for responsive options
	                    break;
	                }
	            }
	            var targetOption = this.derivedMeeting[index];
	            var targetIndex = $.inArray(targetOption.diccode, options);
	            if (targetIndex > -1) {
	                options.splice(targetIndex, 1);
	                targetOption.status = "0";
	            } else {
	                targetOption.status = "1";
	                options.push(targetOption.diccode);
	            }

	            resultVm.fetchTransactions(supervisionRequest.searchUrl);
	        }

	    },
	    created: function created() {
	        var _this = this;
	        var urls = {
	            'supAreaUrl': supervisionRequest["supAreaUrl"],
	            "supSourceUrl": supervisionRequest["supSourceUrl"]
	        };
	        for (var key in urls) {
	            $.ajax({
	                type: "get",
	                dataType: "json",
	                // contentType:"application/json;charset=UTF-8",
	                url: (0, _commonFunction.setSupervisionHeader)(urls[key]),
	                success: function success(result, state, jqxhr) {
	                    for (var _i5 in result) {
	                        result[_i5].status = "0";
	                    }
	                    var name = jqxhr.key;
	                    var show = [{ status: "1", dicname: "全部" }];
	                    if (name == "supAreaUrl") {

	                        //领域
	                        _this.area = show.concat(result);
	                    } else {
	                        //督办来源
	                        var derived = [],
	                            spliced = [];
	                        for (var sourcei = 0; sourcei < result.length; sourcei++) {
	                            if (result[sourcei].parentid == "10019") {
	                                derived.push(result[sourcei]);
	                            } else {
	                                spliced.push(result[sourcei]);
	                            }
	                        }
	                        _this.derivedMeeting = derived;
	                        _this.source = show.concat(spliced);
	                    }
	                },
	                error: function error(data, state, jqxhr) {
	                    console.log(jqxhr.key);
	                    console.log(data);
	                }
	            }).key = key;
	        }
	    },
	    ready: function ready() {
	        // body...
	        $("#startDate").daterangepicker({
	            singleDatePicker: true,
	            showDropdowns: true
	        }, function (start, end, label) {});
	        $("#endDate").daterangepicker({
	            singleDatePicker: true,
	            showDropdowns: true
	        });
	    }
	});
	var sortings = new Array(8);
	(function () {
	    for (leti = 0; i > 8; i++) {
	        sortings[i] = "sorting";
	    }
	});
	for (var _i6 = 0; _i6 < 8; _i6++) {
	    sortings[_i6] = "sorting";
	}var resultVm = new Vue({
	    el: "#result-section",
	    data: {
	        ths: [{ key: "code", val: '督办编号' }, { key: "name", val: '督办事项名称' }, { key: "accountablename", val: '责任领导(A)' }, { key: "responsiblename", val: '责任人(R)' }, { key: "estimatedcompletetiontime", val: '计划完成时间' }, { key: "urgency", val: '紧急程度' }, { key: "importance", val: '重要程度' }, { key: "rate", val: '最新进展' }],
	        keyItems: {
	            sorting: sortings,
	            total: [],
	            show: [],
	            current: 1
	        },
	        otherItems: {
	            sorting: sortings,
	            total: [],
	            show: [],
	            current: 1
	        },
	        doneItems: {
	            sorting: sortings,
	            total: [],
	            show: [],
	            current: 1
	        },
	        levelBackground: ["gray", "#A1C636", "#5CB85C", "#F0AD4E", "#D9534F"],
	        sizeOptions: [{ text: "3", value: "3" }, { text: "10", value: "10" }, { text: "20", value: "20" }]

	    },
	    created: function created() {
	        var _this = this;
	        this.userLoginInfo = {
	            userid: (0, _commonFunction.getCookie)("userid"),
	            username: (0, _commonFunction.getCookie)("username")
	        };
	        //search for the initialization
	        this.fetchTransactions(supervisionRequest.searchUrl);

	        //fetch list end
	    }, ready: function ready() {
	        var that = this;
	        $(".pagesize").change(function (ev) {

	            var target = ev.currentTarget;
	            var key = target.getAttribute("data-key");
	            var totalCount = Number(that[key + "Items"].total.length);
	            $('#' + key + '-pagination').extendPagination({
	                totalCount: totalCount,
	                limit: target.value,
	                name: key,
	                callback: function callback(curr, limit, totalCount, key) {
	                    that.changePage(curr, limit, totalCount, key);
	                }
	            });
	            that.changePage(1, target.value, totalCount, key);
	        });
	    },
	    methods: {
	        changePage: function changePage(curr, limit, totalCount, name) {
	            var items = this[name + "Items"];
	            items.current = curr;
	            this.changeHandler(curr, name, items);
	        },
	        sortColumn: function sortColumn(n, name) {
	            var _this2 = this;

	            var items = this[name + "Items"];
	            var status = items.sorting[n];
	            if (status == "sorting_asc") {
	                (function () {
	                    //des sorting
	                    var sorting = sortings.concat();
	                    sorting[n] = "sorting_desc";
	                    items.sorting = sorting;
	                    var key = _this2.ths[n].key;
	                    items.total.sort(function (a, b) {
	                        return sorter(b[key], a[key]);
	                    });
	                    _this2.changeHandler(items.current, name, items);
	                })();
	            } else {
	                (function () {
	                    //asc sorting
	                    var sorting = sortings.concat();
	                    sorting[n] = "sorting_asc";
	                    items.sorting = sorting;
	                    var key = _this2.ths[n].key;
	                    items.total.sort(function (a, b) {
	                        return sorter(a[key], b[key]);
	                    });
	                    _this2.changeHandler(items.current, name, items);
	                })();
	            }

	            function sorter(a, b) {
	                if (/^\d/.test(a) ^ /^\D/.test(b)) return a > b ? 1 : a == b ? 0 : -1;
	                return a > b ? -1 : a == b ? 0 : 1;
	            }
	        },
	        changeHandler: function changeHandler(curr, name, items) {
	            var pageSize = $("#" + name + "PagesizeSelect").find("select").val();
	            items.show = items.total.slice((curr - 1) * pageSize, pageSize * curr);
	        },
	        fetchTransactions: function fetchTransactions(url) {
	            url = (0, _commonFunction.setSupervisionHeader)(url, { page: 0, size: 1000 });
	            // //search for the tablelist
	            //  jQuery.support.cors = true;
	            var options = {};
	            for (var key in filterVm.filterOptions) {
	                options[key] = filterVm.filterOptions[key];
	            }
	            if (options.areaCode.length == 0) {
	                delete options.areaCode;
	            } else {
	                options.areaCode = options.areaCode.join(",");
	            }
	            options.source = options.sourceCode;
	            delete options.sourceCode;
	            if (options.source.length == 0) {
	                delete options.source;
	            } else {
	                options.source = options.source.join(",");
	            }
	            var that = this;
	            options.accountableSN = this.userLoginInfo.userid;
	            options.responsibleSN = this.userLoginInfo.userid;
	            options = (0, _stringify2.default)(options);
	            $.ajax({
	                type: "POST",
	                dataType: "json",
	                data: options,
	                contentType: "application/json",
	                url: url,
	                success: function success(result, state, jqxhr) {
	                    var doneList = [],
	                        keyList = [],
	                        otherList = [];
	                    for (var _i7 = 0, len = result.length; _i7 < len; _i7++) {
	                        var item = result[_i7];
	                        if (item.latestTrace) {
	                            item.rate = item.latestTrace.rate;
	                            item.latestDesc = item.latestTrace.description;
	                        } else {
	                            item.rate = 0;
	                            item.latestDesc = "";
	                        }
	                        if (item.rate < 25) {
	                            item.rateState = "progress-bar-danger";
	                        } else if (item.rate < 75) {
	                            item.rateState = "progress-bar-warning";
	                        } else {
	                            item.rateState = "progress-bar-success";
	                        }

	                        if (item.status == 1) {
	                            //已完成
	                            doneList.push(item);
	                        } else {
	                            //未完成
	                            var now = new moment(),
	                                comDate = new moment(item.estimatedcompletetiontime);
	                            var days = comDate.diff(now, "days");
	                            if (days > 6 && item.urgency < 4 && item.importance < 4) {
	                                //other
	                                otherList.push(item);
	                            } else {
	                                //key
	                                keyList.push(item);
	                            }
	                        }
	                    }
	                    var res = { doneList: doneList, keyList: keyList, otherList: otherList };
	                    var sorting = sortings.concat(),
	                        pageSize = $("#" + name + "PagesizeSelect").find("select").val() || 3;
	                    var names = ['key', 'other', 'done'];
	                    for (var _i8 in names) {
	                        var _name = names[_i8];
	                        that[_name + 'Items'] = {
	                            total: res[_name + "List"],
	                            show: res[_name + "List"].slice(0, pageSize),
	                            sorting: sorting,
	                            current: 1
	                        };

	                        var limit = Number(pageSize) || 3;
	                        var totalCount = Number(that[_name + "Items"].total.length);
	                        if (totalCount == 0) $("#" + _name + "PagesizeSelect").hide();else $("#" + _name + "PagesizeSelect").show();
	                        $('#' + _name + '-pagination').extendPagination({
	                            totalCount: totalCount,
	                            // showCount: showCount,
	                            limit: limit,
	                            name: _name,
	                            callback: function callback(curr, limit, totalCount, name) {
	                                that.changePage(curr, limit, totalCount, name);
	                            }
	                        });
	                    }
	                },

	                error: function error(data, state, jqxhr) {
	                    console.log(data);
	                }
	            });

	            //fetch list end
	        },
	        newfunc: function newfunc() {}
	    }

	    /* body... */
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

/***/ }
/******/ ]);