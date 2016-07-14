/**
 * Created by Mattia on 2016/6/23.
 */
import Vue from "vue"
import { supervisionRequest } from '../webconfig';
import ComHeader from "../components/header.vue";
import ComFooter from "../components/footer.vue";
/*common function start********************/
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
};
function getQueryString(name){
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null){
           return unescape(r[2]);
        } 
        else {
           return null;
        }
}

/*common function end*********************/
let headerVm = new Vue({
    el: "header",
    components: {
        ComHeader
    }
});
let footerVm = new Vue({
    el: "footer",
    components: {
        ComFooter
    }
});

import {fetch_deptsFromServer,fetch_areaFromServer,fetch_sourceFromServer,add_supervision} from "../common-function"
let levelArray = [{
    text: "1级", value: 1
}, {
    text: "2级", value: 2
}, {
    text: "3级", value: 3
}, {
    text: "4级", value: 4
}, {
    text: "5级", value: 5
}];
let createVm = new Vue({
    el: "#article",
    data: {       
        previous:"all",
        pid: null,
        id: null,
        name: "",
        sourceOptions: [{
            text: "请选择", value: ""
        }, {
            text: "hehe", value: "1"
        }, {
            text: "uiui", value: "2"
        }],
        sourceSelected: "",
        areaSelected: "",
        areaOptions: [{
            text: "请选择", value: ""
        }, {
            text: "hehe", value: "1"
        }, {
            text: "uiui", value: "2"
        }],
        estimatedcompletetiontime: "",
        urgency: 1,
        urgencyOptions: levelArray.concat(),
        importance: 1,
        importanceOptions: levelArray.concat(), 
        responsibleOptions: [],
        public: 1,
        publicOptions: levelArray.concat(),
        comments: "",
        accessory: {},
        requests: supervisionRequest,
        saveState:"",
        selectedDepts: [],
        selectedDept:[],
        leaders:[]
    },
    computed: {
        scope: function () {
            let depts = $.map(this.selectedDepts, function (item) {
                return item.name;
            })
            return depts.join(",");
        },
        accountablesn:function(){
            let names=$.map(this.leaders,function(item){
                return item.uid;
            });
            return names.join(",");
        },
        accountablename:function(){
            let names=$.map(this.leaders,function(item){
                return item.displayname;
            });
            return names.join(",");
        },
        responsibledeptcode: function(){
        	return this.selectedDept.length>0?this.selectedDept[0].ou:"";
        },
        responsibledeptname:function(){
        	return this.selectedDept.length>0?this.selectedDept[0].name:"";
        },
        responsiblename:function(){
        	return this.responsibleOptions.length>0?this.responsibleOptions[0].displayname:"";
        }                  
    },
    created: function () {
        let _this = this;
        let pid=getQueryString("pid");
        if(pid)this.pid=pid;
        let iid=getQueryString("id");
        if(iid){  
            this.id=iid;          
            this.fetchOriginSupervision();
        }
       this.previous=getQueryString("previous");
        fetch_areaFromServer((result, state, jqxhr)=> {
            let area = [{
                text: "请选择", value: ""
            }];
            // console.log(result)
            for (let i = 0, len = result.length; i < len; i++) {
                area.push({
                    text: result[i].dicname,
                    value: result[i].diccode
                });
            }
            this.areaOptions = area;
        });
        // fetch source
        fetch_sourceFromServer((result, state, jqxhr)=> {
            let source = [{
                text: "请选择", value: ""
            }];
            // console.log(result)
            for (let i = 0, len = result.length; i < len; i++) {
                source.push({
                    text: result[i].dicname,
                    value: result[i].diccode
                });
            }
            this.sourceOptions = source;
        });
        // body...
    }, ready: function () {
        let _this = this;
        $("#completeDate").daterangepicker({
            singleDatePicker: true,
            showDropdowns: true
        }, function (start, end, label) {
            _this.estimatedcompletetiontime = start;
            // alert(_this.estimatedcompletetiontime)
            // alert(start.format('YYYY-MM-DD'))
        });
    },
    methods: {
        fetchOriginSupervision(){
            let _this=this;
        $.ajax({
            type: "get",
            dataType: "json",
            url: supervisionRequest.supDetailUrl + this.id,
            success: function (result) {
                for (let i = 0, len = result.length; i < len; i++) {
                    let item = result[i];
                    if (item.id == _this.id) {
                        for (let key in item) {
                            _this[key] = item[key];
                        }
                        console.log("item:",item)
                       _this.leaders=[{
                        uid:item.accountablesn,
                        displayname:item.accountablename
                       }];
                       _this.selectedDept=[{
                        ou:item.responsibledeptcode,
                        name:item.responsibledeptname
                       }];
                       _this.responsibleOptions=[{
                        uid:item.responsiblesn,
                        displayname:item.responsiblename
                       }];
                        break;
                    } 
                }

                // console.log(JSON.stringify(_this.children))
            },
            error: function (data) {
                console.log(data);
            }
        });
        },
        submit_handler () {
            let options = {
                "accountablesn": this.accountablesn,
                "area": this.areaSelected,
                // "code": "string",
                "comments": this.comments,
                "estimatedcompletetiontime":moment(this.estimatedcompletetiontime).format('YYYY-MM-DD'),
                 "importance": this.importance,
                "name": this.name,
                "pid": this.pid,
                "responsibledeptcode":this.responsibledeptcode,
                "responsiblesn": this.responsiblesn,
                "scope": this.scope,
                "source": this.sourceSelected,
                "status": 0,
                "urgency":this.urgency,
                "public":this.public
            };
            add_supervision(options,(result, state, jqxhr)=>{
                this.saveState="保存成功";
                let timer=setTimeout(()=>{
                    clearTimeout(timer);
                    alert("hehe");
                },700);
            },(result,state,jqxhr)=>{
                this.saveState="保存失败";
                console.log(result)
            });
        },
        navtoAll(){
            window.location.href="pages/supervision/supervision-all.html";
        },
        navtomine:function(){
             window.location.href="pages/supervision/supervision-mine.html";
        },cancel:function(){
            if(this.previous=="all") window.location.href="pages/supervision/supervision-all.html";
            else window.location.href="pages/supervision/supervision-mine.html";
        }
    },
    components: {
        comAccordion: require("../components/accordion-menu.vue"),
        leaderSelect:require("../components/user-selector.vue"),
        updateRate:require("./components/update-rate.vue")
    }

});