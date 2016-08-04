/**
 * Created by canice_yuan on 2016/6/28.
 */
var eventApp = angular.module("eventApp", []);

eventApp.service( 'EventService', [ '$rootScope', '$http', '$timeout', function( $rootScope, $http, $timeout) {
    var events = new Array();
    var peoples = new Array();
    var names = new Array();
    var scheduletypes = new Array();
    var scope = new Array();
    var eventClasss = [];
//    var hostName = "http://192.168.252.1:8000";
    var hostName = "http://172.16.51.137:8000";
    var configHostName = "http://172.16.51.137:8000";

    $http.get(configHostName + "/api/v1.0/cache/find/type/OPEN_TYPE", "")
    .success(function(response){
        scope = response;
    });
    $http.get(configHostName + "/api/v1.0/cache/find/type/CAL_TYPE", "")
    .success(function(response){
        scheduletypes = response;
        var tmpClass = ["event-meeting", "event-travel", "event-duty", "event-agent", "event-holiday"];
        for(var i = 0, j = response.length; i < j; i++){
            var eventClass = {
                "id": response[i].id,
                "class": tmpClass[i],
            };
            eventClasss.push(eventClass);
        }
    });

    $timeout(
        function() {
            $('.form_date').datetimepicker({
                language:  'zh-CN',
                weekStart: 1,
                todayBtn:  1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0,
            });
        },
        100
    );

    Date.prototype.format = function(format) {
        var o = {
            "M+" : this.getMonth() + 1,
            "d+" : this.getDate(),
            "h+" : this.getHours(),
            "m+" : this.getMinutes(),
            "s+" : this.getSeconds(),
            "q+" : Math.floor((this.getMonth() + 3) / 3),
            "S" : this.getMilliseconds()
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    Date.prototype.addDay = function(dayCount) {
        return new Date((this / 1000 + 86400) * 1000);
    }

    var convertEvent = function(curEvent, isMultiType){
        var event = {
            id: curEvent.id,
            title: curEvent.title,
            time: curEvent.starttime + '-' + curEvent.endtime,
            address: curEvent.address,
            start: new Date(curEvent.startdate).addDay(1),
            end: new Date(curEvent.enddate).addDay(1),
            className: eventClasss[curEvent.scheduletype],
            index: '',
            username: curEvent.username,
            isMultiType: isMultiType,
            scheduletype: curEvent.scheduletype,
        };
        for(var i = 0, j = eventClasss.length; i < j; i++){
            if(curEvent.scheduletype == eventClasss[i].id){
                event.className = eventClasss[i].class;
            }
        }

        if(isMultiType){
            event.isMultiType = true;
        }
        return event;
    }

    var service = {
        getEventClasss: function(){
            return eventClasss;
        },

        getEvents: function(urlParam, isMultiType, callback){
            if(isMultiType){
                urlParam = hostName + "/api/V1.0/schedule/scheduleCompanyPeoples?" + urlParam;
            } else{
                urlParam = hostName + '/api/V1.0/schedule/scheduleuserdate?' + urlParam;
            }
            $http.get(urlParam, "")
            .success(function(response){
                if(true){
                    events = response;
                    var resultEvents = new Array();

                    for(var i = 0, j = events.length; i < j; i++){
                        resultEvents.push(convertEvent(events[i], isMultiType));
                    }
                    callback(resultEvents);
                } else{
                    console.log("request event data fail!")
                }
                $.unblockUI();
            }).error(function(){
                    $.unblockUI();
            });
        },

        getEventsByPeople: function(urlParam, callback){
            $http.post(hostName + '/api/V1.0/schedule/scheduledepartmentdate?startdate=' + urlParam.startdate + '&enddate=' + urlParam.enddate, urlParam.userid)
                .success(function(response){
                    if(true){
                        events = response;
                        var resultEvents = new Array();

                        for(var i = 0, j = events.length; i < j; i++){
                            resultEvents.push(convertEvent(events[i], true));
                        }
                        callback(resultEvents);
                    } else{
                        console.log("request event data fail!")
                    }
                    $.unblockUI();
                });
        },

        updateEvents: function(urlParam, isMultiType){
            if(isMultiType){
                urlParam = hostName + "/api/V1.0/schedule/scheduleCompanyPeoples?" + urlParam;
            } else{
                urlParam = hostName + '/api/V1.0/schedule/scheduleuserdate?' + urlParam;
            }
            $http.get(urlParam, "")
                .success(function(response){
                    if(true){
                        events = response;
                        var resultEvents = new Array();

                        for(var i = 0, j = events.length; i < j; i++){
                            resultEvents.push(convertEvent(events[i], isMultiType));
                        }
                        $("#calendar").fullCalendar('addEventSource', [resultEvents]);
                    } else{
                        console.log("request event data fail!")
                    }
                });
        },

        getEventsByType: function(type, isMultiType){
            var resultEvents = new Array();

            for(var i = 0, j = events.length; i < j; i++){
                var curEvent = events[i];
                if(curEvent.scheduletype == type){
                    var event = convertEvent(events[i], isMultiType);
                    if(isMultiType){
                        event.index = $.inArray(event.username, names);
                    }
                    resultEvents.push(event);
                }
            }
            return resultEvents;
        },

        addEvent: function (event, isMultiType) {
            var url = hostName + '/api/V1.0/schedule/schedule/add?startdate=' + event.startdate + '&enddate=' + event.enddate;
            var tmpS = event.startdate;
            var tmpE = event.enddate;
            event.startdate = event.startdate + ' '  +  event.starttime;
            event.enddate = event.enddate + ' '  +  event.endtime;

            var requestEvents = [];
            requestEvents.push(event);
            console.log(JSON.stringify(requestEvents));
            $http.post(url, requestEvents)
             .success(function(response){
                if(true){
                    console.log("add success");
                    $("#add").removeClass("active").removeClass("in");
                    $("#schedule").addClass("active").addClass("in");
                    var curEvent = convertEvent(event, isMultiType);
                    if(isMultiType){
                        event.index = $.inArray(event.username, names);
                    }
                    event.startdate = tmpS;
                    event.enddate = tmpE;
                    if(event.createuserid == event.people.userid){
                        events.push(event);
                    }
                    $("#calendar").fullCalendar('addEventSource', [curEvent]);
                }else{
                    alert("新增失败，请重试！");
                }
                $.unblockUI();
            }).error(function(){
                $.unblockUI();
            });
        },

        editEvent: function (event, isMultiType) {
            $http.post(hostName + '/api/V1.0/schedule/schedule/edit', event)
            .success(function(response){
                if(true){
                    console.log("edit success");
                    $("#edit").removeClass("active").removeClass("in");
                    $("#schedule").addClass("active").addClass("in");
                    var curEvent = convertEvent(event, isMultiType);
                    if(isMultiType){
                        event.index = $.inArray(event.username, names);
                    }
                    $("#calendar").fullCalendar('removeEvents', curEvent.id);
                    $("#calendar").fullCalendar('addEventSource', [curEvent]);
                }else{
                    alert("编辑失败，请重试！");
                }
            });
        },

        getEventDetail: function(id){
            var resultEvent;
            for(var i = 0, j = events.length; i < j; i++){
                if(events[i].id == id){
                    return events[i];
                }
            }
            return '';
        },

        deleteEventById: function(id){
            $http.delete(hostName + '/api/V1.0/schedule/scheduledelone/' + id, '')
            .success(function(response){
                if(response == true){
                    console.log("delete success");
                    $("#detail").removeClass("active").removeClass("in");
                    $("#schedule").addClass("active").addClass("in");
                    $("#calendar").fullCalendar('removeEvents', id);
                    console.log(events.length);
                    for(var i = 0, j = events.length; i < j; i++){
                        if(events[i].id == id){
                            events.splice(i, 1);
                            return;
                        }
                    }
                }else{
                    alert("删除失败，请重试！");
                }
            });
        },

        getPeoples: function(urlParam, callback){
            $http.get(hostName + '/api/V1.0/schedule/scheduleCompanyPeoples?' + urlParam, '')
            .success(function(response){
                console.log(JSON.stringify(response));
                if(true){
                    peoples = response;
                    console.log("getPeoples success");
                    callback();
                }
            });
        },

        setPeoples: function(userList){
            peoples = userList;
        },

        getNames: function(){
            var resultNames = new Array();
            for(var i = 0, j = peoples.length; i < j; i++){
                resultNames.push(peoples[i].username);
            }
            names = resultNames;
            return resultNames;
        },

        parseParam: function(param, key){
            var parseParams = function(param, key){
                var paramStr = "";
                if(param instanceof String ||param instanceof Number || param instanceof Boolean){
                    paramStr += "&" + key + "=" + encodeURIComponent(param);
                }else{
                    $.each(param,function(i){
                        var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                        paramStr += '&' + parseParams(this, k);
                    });
                }
                return paramStr.substr(1);
            };
            return parseParams(param, key);
        },

        getScope: function(){
            return scope;
        },

        getScheduletypes: function(){
            return scheduletypes;
        },

        getOrg: function(){
            $http.get( 'http://172.16.51.137:8010/api/contact/getOrglist?apikey=e71982d5401b488da4acef8827c41845', '')
                .success(function(response){
                    if(true){
                        console.log(response);
                    }
                });
        },

        showAlert: function(content){
            $.blockUI({
                message: content,
                timeout: 800,
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
        },

        showLoading: function(content){
            $.blockUI({ message: content,
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
        },
        getCookie: function(name) {
            var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr = document.cookie.match(reg)){
            } else{
                return null;
            }
        },
    };

    return service;
}]);