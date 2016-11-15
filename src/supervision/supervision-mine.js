/**
 * Created by Mattia on 2016/6/12.
 */
// var requestInterfaces=require("../webconfig.js")

import {getQueryString,getCookie,setSupervisionHeader} from '../common-function';
let supervisionRequest=window.interfaceSettings.supervisionRequest.api;
window.userLoginInfo={
    userid:getCookie("userid"),
    username:getCookie("username")
};
let filterVm = new Vue({
    el: "#filterSection",
    data: {
        userLoginInfo:{},
        filterOptions: {
            areaCode: [],
            sourceCode: [],
            // accountablesn:"",
            responsiblesn:""
        },
        dateFilter: [
            {title: "全部", status: true},
            {title: "上周", status: true},
            {title: "本周", status: true},
            {title: "下周", status: true},
            {title: "时段", status: true}
        ],
        dateOptions: {
            show: false,
            type: "date", //date datetime
            value: "2016-6-21",
            begin: "2016-6-20",
            end: "2016-12-25",
            x: 0,
            y: 0,
            range: true,//是否多选
        },
        area: [], source: [],
        derivedMeeting:[],
        stateList: [
            {label: "正常", value: true, feature: "label-success", margin: '50%'},
            {label: "一周内过期", value: true, feature: "label-warning", margin: ''},
            {label: "已过期", value: true, feature: "label-danger", margin: ''},
            {label: "已完成", value: false, feature: "label-default", margin: ''}
        ]
    },
    methods: {
        changeTime: function (ev) {
            // 日期条件选择
            let that = this;
            ev.stopPropagation();
            let curtar = ev.currentTarget;
            let btn = $(curtar)
            let mark = curtar.getAttribute("data-mark");
            if (!btn.hasClass("btn-success")||mark=="custom") {
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
                    this.filterOptions.searchBeginDate=$("#startDate").val();
                   this.filterOptions.searchEndDate= $("#endDate").val();
                    break;
                }  
                resultVm.fetchTransactions(supervisionRequest.searchUrl);
            }
        },
        changeArea: function (index,filter) {
            // console.log(JSON.stringify(this.area.show));return;
            if(filter=="source"&&(index==0||this.source[index].diccode=="MEETING")){
                let sourceArray=this.filterOptions["sourceCode"];
                 let meetings=this.derivedMeeting;
            for(let i=0;i<meetings.length;i++){
                let metindex=$.inArray(meetings[i].diccode,sourceArray);
                if(metindex>-1){
                    sourceArray.splice(metindex,1);
                    this.derivedMeeting[i].status="0";
                }
            }
           }

             let area = this[filter];
            if (index == 0) {          
                if(area[0].status=="1")return;      //all
                area[0].status = "1";
                for (let i = 1, len = area.length; i < len; i++) {
                    area[i].status = "0";
                }
                this.filterOptions[filter+"Code"] = [];
            } else {
                //other
                let areaCode = this.filterOptions[filter+"Code"];
                area[0].status = "0";
                if (area[index].status == "1") {
                    area[index].status = "0";

                    for (let i in areaCode) {
                        if (areaCode[i] == area[index].diccode) {
                            areaCode.splice(i, 1);
                        }
                    }
                }
                else {
                    area[index].status = "1";
                    areaCode.push(area[index].diccode);
                }
                this.filterOptions[filter+"Code"] = areaCode;
            }
             this[filter]=area;
            //
            resultVm.fetchTransactions(supervisionRequest.searchUrl);
        },
        changeMeeting:function (index) {
            // body...
            let source =this.source;
            let options=this.filterOptions["sourceCode"];
            if(source[0].status=="1"){
                 source[0].status="0";
                 let indMeeting0=$.inArray(source[0].diccode,options);
                  options.splice(indMeeting0,1);//markable for responsive options
              }
            for(let i=1;i<source.length;i++){
                if(source[i].diccode=="MEETING"&&source[i].status=="1"){
                    source[i].status="0";                   
                  let indMeeting=$.inArray(source[i].diccode,options);
                  options.splice(indMeeting,1);//markable for responsive options
                  break;
                }
            }
            let targetOption=this.derivedMeeting[index];
            let targetIndex=$.inArray(targetOption.diccode,options);
            if(targetIndex>-1){
                options.splice(targetIndex,1);
                targetOption.status="0";
            }else{
                targetOption.status="1";
                options.push(targetOption.diccode);
            }

             resultVm.fetchTransactions(supervisionRequest.searchUrl);
        }

    },
    created: function () {
        let _this = this;        
        var urls = {
            'supAreaUrl': supervisionRequest["supAreaUrl"],
            "supSourceUrl": supervisionRequest["supSourceUrl"],
            "completedRateStatistics":supervisionRequest["completedRateStatistics"]
        };
        for (let key in urls) {
             if(key=="completedRateStatistics") {
                urls[key]=setSupervisionHeader(urls[key],null,window.userLoginInfo.userid);
             }
                else urls[key]=setSupervisionHeader(urls[key]);
           
            $.ajax({
                type: "get",
                dataType: "json",
                // contentType:"application/json;charset=UTF-8",
                url: urls[key],
                success: function (result, state, jqxhr) {
                    let name = jqxhr.key;
                     if(name=="completedRateStatistics"){
                        let completedRateStatistics=result[1]+"/"+(result[0]+result[1]);
                        $("#completedRateStatistics").text(completedRateStatistics);
                        return;
                     }
                    for (let i in result) {
                        result[i].status = "0";
                    }
                  
                    let show = [{status: "1", dicname: "全部"}];
                    if (name == "supAreaUrl") {
                        //领域
                        _this.area =show.concat(result);
                    } else {
                        //督办来源
                         let derived=[],spliced=[];
                        for(let sourcei=0;sourcei<result.length;sourcei++){
                            if(result[sourcei].parentid=="10019"){
                                derived.push(result[sourcei]);
                            }else{
                                spliced.push(result[sourcei]);
                            }
                        }  
                        _this.derivedMeeting=derived;
                        _this.source = show.concat(spliced);
                    }
                },
                error: function (data, state, jqxhr) {
                    // console.log(jqxhr.key)
                    // console.log(data)
                }
            }).key = key;
        }


    },
    ready: function () {
        // body...
        $("#startDate").daterangepicker({
            language:"zh-CN",
            singleDatePicker: true,
            showDropdowns: true
        });
        $("#endDate").daterangepicker({
            singleDatePicker: true,
            showDropdowns: true
        });
    }
});
let sortings = new Array(8);
(function () {
    for (leti = 0; i > 8; i++) {
        sortings[i] = "sorting";
    }
});
for (let i = 0; i < 8; i++)sortings[i] = "sorting";

var resultVm = new Vue({
    el: "#result-section",
    data: {
        ths: [{key: "code", val: '督办编号'},
            {key: "name", val: '督办事项名称'},
            {key: "accountablename", val: '发起人(A)'},
            {key: "responsiblename", val: '责任人(R)'},
            {key: "estimatedcompletetiontime", val: '计划完成时间'},
            {key: "urgency", val: '紧急程度'},
            {key: "importance", val: '重要程度'},
            {key: "rate", val: '最新进展'}
        ],
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
        orgItems: {
            sorting: sortings,
            total: [],
            show: [],
            current: 1
        },
          levelBackground:["gray","#A1C636","#5CB85C","#F0AD4E","#D9534F"],
        sizeOptions:[
      { text: "3", value: "3"},
      { text: "10", value: "10"},
      { text: "20", value: "20"}
        ]

    },
    created: function () {
        let _this = this;
        let userid=getCookie("userid"),username=getCookie("username");
        if(userid&&userid!=""){
        this.userLoginInfo={
            userid:userid,
            username:username
        };
        //search for the initialization
        this.fetchTransactions(supervisionRequest.searchUrl);
    }else{
        location.href = "http://bjecm.cnnp.com.cn/pt/LoginServlet?url="+Base64.encode(window.location.href);
    }
        //fetch list end

    },ready:function(){
        let that=this;
        $(".pagesize").change((ev)=>{

            let target=ev.currentTarget;
            let key=target.getAttribute("data-key");
             var totalCount = Number(that[key + "Items"].total.length);
            $('#' + key + '-pagination').extendPagination({
                totalCount: totalCount,
                limit: target.value,
                name: key,
                callback: function (curr, limit, totalCount, key) {
                    that.changePage(curr, limit, totalCount, key);
                }
            });
               that.changePage(1, target.value, totalCount, key);
        });
    },
    methods: {
        changePage: function (curr, limit, totalCount, name) {
            let items = this[name + "Items"];
            items.current = curr;
            this.changeHandler(curr, name, items);
        },
        sortColumn: function (n, name) {

            let items = this[name + "Items"];
            let status = items.sorting[n];
            if (status == "sorting_asc") {
                //des sorting
                let sorting = sortings.concat();
                sorting[n] = "sorting_desc";
                items.sorting = sorting;
                let key = this.ths[n].key;
                items.total.sort(function (a, b) {
                    return sorter(b[key], a[key])
                });
                this.changeHandler(items.current, name, items);
            } else {
                //asc sorting
                let sorting = sortings.concat();
                sorting[n] = "sorting_asc";
                items.sorting = sorting;
                let key = this.ths[n].key;
                items.total.sort(function (a, b) {
                    return sorter(a[key], b[key])
                });
                this.changeHandler(items.current, name, items);
            }

            function sorter(a, b) {
                if (/^\d/.test(a) ^ /^\D/.test(b)) return a > b ? 1 : (a == b ? 0 : -1);
                return a > b ? -1 : (a == b ? 0 : 1);
            }

        },
        changeHandler: function (curr, name, items) {
            let pageSize = $("#"+name+"PagesizeSelect").find("select").val();
            items.show = items.total.slice((curr - 1) * pageSize, pageSize * (curr));
        },
        fetchTransactions: function (url) {
            url=setSupervisionHeader(url,{page:0,size:1000});
            // //search for the tablelist
            //  jQuery.support.cors = true;
            let options = {

            };
            for (let key in filterVm.filterOptions) {
                options[key] = filterVm.filterOptions[key];
            }
            if (options.areaCode.length == 0) {
                delete options.areaCode;
            }
            else {
                options.areaCode = options.areaCode.join(",");
            }
            options.source=options.sourceCode;
            delete options.sourceCode;
            if (options.source.length == 0) {
                delete options.source;
            }
            else {
                options.source = options.source.join(",");
            }
            let that = this;
            options.accountableSN=this.userLoginInfo.userid;
            options.responsibleSN=this.userLoginInfo.userid;
            options = JSON.stringify(options);
            $.ajax({
                type: "POST",
                dataType: "json",
                data: options,
                contentType: "application/json",
                url: url,
                success: function (result, state, jqxhr) {
                    let doneList = [], keyList = [], otherList = [],orgList=[];
                    for (let i = 0, len = result.length; i < len; i++) {
                        let item = result[i];
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
                        if(item.responsiblesn==that.userLoginInfo.userid){

                            if (item.status == 1) {
                                //已完成
                                doneList.push(item);
                            } else {
                                //未完成
                                let now = new moment(), comDate = new moment(item.estimatedcompletetiontime);
                                let days = comDate.diff(now, "days");
                                if (days > 6 && item.urgency < 4 && item.importance < 4) {
                                    //other
                                    otherList.push(item);
                                } else {
                                    //key
                                    keyList.push(item);
                                }
                            }
                    }else{
                        orgList.push(item);
                    }
                    }
                    let res = {doneList: doneList, keyList: keyList, otherList: otherList,orgList:orgList};
                    let sorting = sortings.concat(), pageSize =$("#"+name+"PagesizeSelect").find("select").val()||3;
                    let names = ['key', 'other', 'done','org'];
                    for (let i in names) {
                        let name = names[i];
                        that[name + 'Items'] = {
                            total: res[name + "List"],
                            show: res[name + "List"].slice(0, pageSize),
                            sorting: sorting,
                            current: 1
                        };

                        let limit = Number(pageSize) || 3;
                        var totalCount = Number(that[name + "Items"].total.length);
                        if(totalCount<4)$("#"+name+"PagesizeSelect").hide();
                        else $("#"+name+"PagesizeSelect").show();
                        $('#' + name + '-pagination').extendPagination({
                            totalCount: totalCount,
                            // showCount: showCount,
                            limit: limit,
                            name: name,
                            callback: function (curr, limit, totalCount, name) {
                                that.changePage(curr, limit, totalCount, name);
                            }
                        });
                    }

                },

                error: function (data, state, jqxhr) {
                    // console.log(data)
                }
            });

            //fetch list end
        },
        newfunc: function () {
            
        }
    }

    /* body... */
});
