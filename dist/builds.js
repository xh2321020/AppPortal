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

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	var _stringify = __webpack_require__(3);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by kingsinsd on 2016/6/7.
	 */
	var personalVm = new Vue({
	    el: "#article",
	    data: {
	        findcount: 25,
	        //数据未读条数
	        taskCount: [{
	            //领导批示
	            "ST": 0,
	            //个人待阅
	            "DY": 4292,
	            //领导批示
	            "GB": 0,
	            //领导批示
	            "GC": 0,
	            //领导批示
	            "WT": 0,
	            //个人代办
	            "DB": 50
	        }],
	        //领导批示
	        find: [{}],
	        //公办待阅
	        publicread: [{}],
	        //个人待办
	        personal: [{}],
	        //公办待办
	        publicWork: [{}],
	        //受托待办
	        specialSuggest: [{}],
	        //个人待阅
	        personalread: [{}],
	        //委托待办
	        memberStates: [{}],
	        //消息提醒
	        cultureColumn: [{}],
	        dubanshixiang: [{}]
	    },
	    ready: function ready() {
	        //1.领导批示
	        //2.办公待阅
	        //3.个人待办
	        //4.公办待办
	        //5.受托待办
	        //6.个人待阅
	        //7.委托待办
	        //8.消息提醒
	        var _this = this;
	        var currentPort = new Array();
	        var fetchArray = ["USERKUAIJIERUKOU", "DUBANSHIXIANG", "QIRINEIRICHENG", "1", "2", "3", "4", "5", "6", "7", "8", "USERKUAIJIERUKOUAll"];
	        var nameArray = ["findcount", "dubanshixiang", "find1", "find2", "find3", "find4", "find5", "find6", "find7", "find8"];
	        var userid = _this.etCookie("username");
	        for (var i = 0, len = fetchArray.length + 1; i < len - 1; i++) {
	            var url = "";
	            var datas = "";
	            var contentTypes = "application/json";
	            var datatypes = "json";
	            var types = "post";
	            var arrayId = fetchArray[i];
	            if (fetchArray[i] == "DUBANSHIXIANG") {
	                url = "http://172.16.51.137:8000/api/v1.0/supervision/search?page=0&size=50";
	                datas = (0, _stringify2.default)({ "accountablesn": userid });
	            } else if (fetchArray[i] == "USERKUAIJIERUKOU") {
	                types = "get";
	                datatypes = "json", url = "http://192.168.252.1:8000/api/V1.0/work/work/" + userid;
	            } else if (fetchArray[i] == "QIRINEIRICHENG") {
	                var startDate = _this.dateFormatFun(new Date());
	                var stDate = new Date();
	                stDate.setDate(stDate.getDate() + 7);
	                var y = stDate.getYear();
	                var m = stDate.getMonth() + 1 < 10 ? "0" + (stDate.getMonth() + 1) : stDate.getMonth() + 1;
	                var d = stDate.getDate() < 10 ? "0" + stDate.getDate() : stDate.getDate();
	                var endDate = y + "-" + m + "-" + d;
	                types = "get";
	                datatypes = "json", url = "http://172.16.51.137:8000/api/V1.0/schedule/scheduleuserdate?userid=" + userid + "&startdate=" + startDate + "&enddate=" + endDate + "";
	            } else if (fetchArray[i] == "USERKUAIJIERUKOUAll") {
	                types = "get";
	                datatypes = "json", url = "http://172.16.51.137:8000/api/V1.0/work/work/link";
	            } else {
	                url = "http://172.16.51.137:8010/api/task/web/interfaceTaskListService.action";
	                datas = (0, _stringify2.default)({ F_BOUNDUSER: userid, Type: fetchArray[i] });
	            }
	            $.ajax({
	                type: types,
	                dataType: datatypes,
	                contentType: contentTypes,
	                url: url,
	                data: datas,
	                success: function success(data, state, jqxhr) {
	                    var tableHeader = "<section class='grid-table'><table class='table table-condensed head-title'><thead>" + "<tr><th style='text-align: center;'> 事项名称 </th>" + "<th style='text-align: center;'> 创建人员 </th><th style='text-align: center;'> 创建时间 </th></tr></thead><tbody>";
	                    var tableFooter = "</tbody></table></section>";
	                    if (fetchArray[jqxhr.index] == "DUBANSHIXIANG") {
	                        var dubanshixiang = "";
	                        var qiridubantixing = "";
	                        var qiridubantixingMore = '<div style="width:100%;margin-top:0.5rem;">' + '<a class="default-font" href="pages/supervision/supervision-mine.html" style="float:right;">更多 ></a></div>';
	                        for (var j = 0; j < data.length; j++) {
	                            var description = "";
	                            if (typeof data[j].description == "undefined" || typeof data[j].description == "") {
	                                description = "";
	                            } else {
	                                description = data[j].description;
	                            }
	                            dubanshixiang = dubanshixiang + '<li class="li-task-list"><div class="task-list-meet"><div class="default-font">督办</div></div>' + '<div class="task-list-detail" style="border: 1px dashed #a6cc38;cursor:pointer;" onclick="opentask(\'' + data[j].id + '\')"><div style="overflow: hidden; position: relative;">' + '<span class="task-list-detail-title  default-font" style="overflow: hidden; text-overflow: ellipsis; ' + 'white-space: nowrap; width: 100%; display: block; padding-top:0;" title="' + data[j].name + '">' + data[j].name + '</span></div><div><span class="task-list-detail-subtitle default-font">' + description + '</span></div></div> <div class="task-list-spack"></div></li>';
	                            if (data.length > 0 && j <= 1) {
	                                qiridubantixing = qiridubantixing + '<div class="task-list-detail-title-tomorrow qiRiTiXing" style="width:100%;">' + '<a href="pages/supervision/supervision-detail.html?id=1002&amp;previous=all" class="qiRiTiXing-a">' + '<div class="qiRiTiXing-a-div default-font" title="' + data[j].name + '">' + data[j].name + '</div></a></div>';
	                            }
	                        }
	                        $("#worksoftodayUl").append(dubanshixiang);
	                        $("#qirineidubanItems").html(qiridubantixing + qiridubantixingMore);
	                        $("#qirineidubanTitle").html("七日内督办提醒(" + data.length + ")");
	                    } else if (fetchArray[jqxhr.index] == "QIRINEIRICHENG") {
	                        var qirineirichengMore = '<div style="width:100%;margin-top:0.5rem;"><a class="default-font" href="pages/schedule/personal.html" style="float:right;">更多 ></a></div>';
	                        var qirineiricheng = "";
	                        for (var j = 0; j < data.length; j++) {
	                            if (data.length > 0 && j <= 1) {
	                                qirineiricheng = qirineiricheng + '<div class="task-list-detail-title-tomorrow qiRiTiXing" style="width:100%;">' + '<a href="pages/supervision/supervision-detail.html?id=1002&amp;previous=all" class="qiRiTiXing-a">' + '<div class="qiRiTiXing-a-div default-font" title="' + data[j].name + '">' + data[j].name + '</div></a></div>';
	                            } else {}
	                        }
	                        $("#qiribeirichengTitle").html("七日内日程提醒(" + data.length + ")");
	                        $("#qiribeirichengItems").html(qirineiricheng + qirineirichengMore);
	                    } else if (fetchArray[jqxhr.index] == "USERKUAIJIERUKOU") {
	                        var kuaijierukouLeft = "";
	                        var kuaijierukoupop = "";
	                        var kuaijierukouselector = "";
	                        for (var j = 0; j < data.length; j++) {
	                            if (j < 8) {
	                                kuaijierukouLeft = kuaijierukouLeft + '<li class="article-list-item"><a href="' + data[j].link + '" target="_blank">' + '<img src="' + data[j].icoa + '" class="article-list-item-icon">' + '<span class="article-list-item-span">' + data[j].description + '</span></a></li>';
	                            }
	                            kuaijierukoupop = kuaijierukoupop + '<li class="ul-wedigt-item">' + '<a href="' + data[j].link + '" target="_blank">' + '<img src="' + data[j].icoa + '"><span>' + data[j].description + '</span></a></li>';
	                            kuaijierukouselector = kuaijierukouselector + '<option value="' + data[j].linkid + '">' + data[j].description + '</option>';
	                        }
	                        //主页面工作快捷入口
	                        $("#gongzuokuaijierukouUl").html(kuaijierukouLeft);
	                        //弹框页面工作快捷入口（编辑页面）
	                        $("#gongzuokuaijirukouhidePopUl").html(kuaijierukoupop);
	                        //编辑选择框已添加的工作快捷入口
	                        $("#leftSel").html(kuaijierukouselector);
	                    } else if (fetchArray[jqxhr.index] == "USERKUAIJIERUKOUAll") {
	                        var restPort = "";
	                        for (var j = 0; j < data.length; j++) {
	                            restPort = restPort + '<option value="' + data[j].id + '">' + data[j].description + '</option>';
	                        }
	                        $("#rightSel").html(restPort);
	                        var currentSelL = null;
	                        var currentSelR = null;
	                        currentSelL = document.getElementById('leftSel');
	                        currentSelR = document.getElementById('rightSel');
	                        if (currentSelL.length > 0) {
	                            for (var k = 0; k < currentSelL.length; k++) {
	                                for (var j = 0; j < currentSelR.length; j++) {
	                                    if (currentSelL.options[k].value == currentSelR.options[j].value) {
	                                        var removeIndex = currentSelR.options[j].index;
	                                        currentSelR.options.remove(removeIndex);
	                                    }
	                                }
	                            }
	                        }
	                    } else if (fetchArray[jqxhr.index] == "1") {
	                        var currentHtml = _this.htmlcode(data);
	                        $("#lingdaopishiSpan").html(data.length);
	                        $("#lingdaopishitable").html(currentHtml);
	                    } else if (fetchArray[jqxhr.index] == "2") {
	                        var currentHtml = _this.htmlcode(data);
	                        $("#gongbandaiyueSpan").html(data.length);
	                        $("#gongbandaiyuetable").html(currentHtml);
	                    } else if (fetchArray[jqxhr.index] == "3") {
	                        var currentHtml = _this.htmlcode(data);
	                        $("#gerendaibanSpan").html(data.length);
	                        $("#gerendaibantable").html(currentHtml);
	                    } else if (fetchArray[jqxhr.index] == "4") {
	                        var currentHtml = _this.htmlcode(data);
	                        $("#gongbandaibanSpan").html(data.length);
	                        $("#gongbandaibantable").html(currentHtml);
	                    } else if (fetchArray[jqxhr.index] == "5") {
	                        var currentHtml = _this.htmlcode(data);
	                        $("#shoutuodaibanSpan").html(data.length);
	                        $("#shoutuodaibantable").html(currentHtml);
	                    } else if (fetchArray[jqxhr.index] == "6") {
	                        var currentHtml = _this.htmlcode(data);
	                        $("#gerendaiyueSpan").html(data.length);
	                        $("#gerendaiyuetable").html(currentHtml);
	                    } else if (fetchArray[jqxhr.index] == "7") {
	                        var currentHtml = _this.htmlcode(data);
	                        $("#weituodaibanSpan").html(data.length);
	                        $("#weituodaibantable").html(currentHtml);
	                    } else if (fetchArray[jqxhr.index] == "8") {
	                        var currentHtml = _this.htmlcode(data);
	                        $("#xiaoxitixingSpan").html(data.length);
	                        $("#xiaoxitixingtable").html(currentHtml);
	                    }
	                    var index = jqxhr.index;
	                    // _this[nameArray[index]] = data;
	                    if (jqxhr.index == 0) console.log(data);
	                },
	                error: function error(err) {
	                    console.log(err);
	                }
	            }).index = i;
	        }
	    },
	    methods: {
	        dateFormatFun: function dateFormatFun(parmar) {
	            var myDate = new Date(parmar);
	            return myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDate();
	        },
	        htmlcode: function htmlcode(data) {
	            var tableHeader = "<section class='grid-table'><table class='table table-condensed head-title'><thead>" + "<tr><th style='text-align: center; width:60%;'> 事项名称 </th>" + "<th style='text-align: center;'> 创建人员 </th><th style='text-align: center;'> 创建时间 </th></tr></thead><tbody>";
	            var tableFooter = "</tbody></table></section>";
	            var initHtml = "";
	            var moreUrlHtml = "";
	            var count = 0;
	            if (data.length == 0) {
	                initHtml = '<div class="todoIsNull">' + '<img src="assets/images/portal/workspace/todoIsNull.png" class="todoIsNull-img"/></div>';
	            } else {
	                if (data.length > 10) {
	                    count = 10;
	                    moreUrlHtml = '<a href="' + data[0].f_MODELVIEWURL + '" class="moreURL">' + '<div class="moreURL-div" style="float: right; padding-right:2rem;">更多 ></div></a>';
	                } else {
	                    count = data.length;
	                }
	                for (var j = 0; j < count; j++) {
	                    initHtml = initHtml + '<tr class="grid-content"style="border-bottom: 1px solid lightgrey;">' + '<td class=" default-font"><a href="' + data[j].f_URL + '" style="color: black;">' + data[j].f_SUBJECT + '</a></td>' + '<td class=" default-font" style="text-align: center;">' + data[j].f_SOURCE + '</td><td class=" default-font"  style="text-align: center;">' + this.dateFormatFun(data[j].f_RECEVIETIME) + '</td></tr>';
	                }
	                initHtml = tableHeader + initHtml + tableFooter;
	            }
	            return initHtml + moreUrlHtml;
	        },
	        etCookie: function etCookie(name) {
	            var arr,
	                reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	            if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
	        }
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(5)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }
/******/ ]);