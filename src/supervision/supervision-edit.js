/**
 * Created by Mattia on 2016/6/23.
 */
// import Vue from "vue"
  /*common function start********************/
import {getQueryString,getCookie,setSupervisionHeader} from "../common-function";
 
import {add_supervision} from "../common-function";
let supervisionRequest=window.interfaceSettings.supervisionRequest.api;
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

import comAccordion from "../components/accordion-menu.vue";
import leaderSelect from "../components/user-selector.vue";
import updateRate from "./components/update-rate.vue";
import modalPop from "../components/modal-pop.vue";
window.userLogin={
    userid:getCookie("userid"),
    username:getCookie("username")
}
let createVm = new Vue({
    el: "#article",
    data: {   
        save_modal:"savemodal"+(new Date().getTime()),
    accessory_modal:"accessory_modal"+(new Date().getTime()),    
        previous:"all",
        pid: null,
        pname:null,
        id: null,
        code:"",
        name: "",
        area_name:"",
        source_name:"",
        source:"",
        area:"",
        sourceOptions: [{ text: "请选择", value: ""}],
        sourceSelected: "",
        areaSelected: "",
        areaOptions: [{ text: "请选择", value: ""}],
        estimatedcompletetiontime: "",
        urgency: 1,
        urgencyOptions: levelArray.concat(),
        importance: 1,
        importanceOptions: levelArray.concat(), 
        responsibleOptions: [],
        comments: "",
        accessory: {},
        leaderParams:{
            searchuserUrl:supervisionRequest.searchuserUrl,
            multiple:false,
            leaderOnly:false,
            title:"发起人选择"
        },
        responsibleParams:{
            searchuserUrl:supervisionRequest.searchuserUrl,
            multiple:false,
            leaderOnly:false,
            title:"责任人选择"
        },
        saveState:"",
        save_modal_txt:"保存成功",
        selectedDepts: [],
        selectedDept:[],
        leaders:[{uid:window.userLogin.userid,
            displayName:window.userLogin.username}],
        requests:supervisionRequest
    },
    computed: {
        scope: function () {
            let depts = $.map(this.selectedDepts, function (item) {
                return item.name;
            })
            return depts.join(",");
        },
       accountablesn:function () {
           // body...
           let uids=$.map(this.leaders,function(item){
                return item.uid;
            });
            return uids.join(",");
       },
        accountablename:function(){ 
            let names=$.map(this.leaders,function(item){
                return item.displayName;
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
        	return this.responsibleOptions.length>0?this.responsibleOptions[0].displayName:"";
        }                  
    },
    created: function () {
        let _this = this;
        let pid=getQueryString("pid");
        if(pid)this.pid=pid;
        this.pname=unescape(getQueryString("pname"));
        let iid=getQueryString("id");
        if(iid){  
            this.id=iid;          
            this.fetchOriginSupervision();
        }
       this.previous=getQueryString("previous");      
        $.ajax({
            type:"get",
            url:setSupervisionHeader(supervisionRequest.supAreaUrl),
            success:function(result, state, jqxhr){
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
                _this.areaOptions = area;
            },error:function(result){
                // console.log("error",JSON.stringify(result));
            }
        });
        // fetch source
         $.ajax({
            type:"get",
            url:setSupervisionHeader(supervisionRequest.supSourceUrl),
            success:function(result, state, jqxhr){
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
             _this.sourceOptions =[];
            _this.sourceOptions = source;
        },error:function(result){
                // console.log("error",JSON.stringify(result));
            }
        });
       window.addEventListener("message",(ev)=>{
        let message=ev.data;
        // console.log("message",message);
        //callback
       });
        // body...
    }, ready: function () {
        let _this = this;
        $("#completeDate").daterangepicker({
            singleDatePicker: true,
            showDropdowns: true
        });
        // $("#iframe_accessory").attr("src","http://192.168.0.163:8080/cnnpdm/service.jsp?action=uploadAndView");
    },
    methods: {
        fetchOriginSupervision(){
            let _this=this;
        $.ajax({
            type: "get",
            dataType: "json",
            url: setSupervisionHeader(supervisionRequest.supDetailUrl ,null, this.id),
            success: function (result) {
                for (let i = 0, len = result.length; i < len; i++) {
                    let item = result[i];
                    if (item.id == _this.id) {
                        for (let key in item) {
                            _this[key] = item[key];
                        }
                        _this.sourceSelected=item.source;
                        _this.areaSelected=item.area;
                       _this.leaders=[{
                        uid:item.accountablesn,
                        displayName:item.accountablename
                       }];
                       _this.selectedDept=[{
                        ou:item.responsibledeptcode,
                        name:item.responsibledeptname
                       }];
                       _this.responsibleOptions=[{
                        uid:item.responsiblesn,
                        displayName:item.responsiblename
                       }];
                        break;
                    } 
                }

                // console.log(JSON.stringify(_this.children))
            },
            error: function (data) {
                // console.log(data);
            }
        });
        },
        submit_handler () {
              let _this=this;
            if(this.responsibleOptions.length==0||this.name==""||this.leaders.length==0||this.sourceSelected==""||this.areaSelected==""||this.selectedDept.length==0){
                this.save_modal_txt="请确保必填项全部有效";
                 $("#"+this.save_modal).modal("show");
                  let timer=setTimeout(()=>{
                     $("#"+this.save_modal).modal("hide");
                    clearTimeout(timer);
                },700);
            return;
        }
            let options = {
                "accountablesn": this.accountablesn,
                accountablename:this.accountablename,
                "area": this.areaSelected,
                // "code": "string",
                "comments": this.comments,
                "estimatedcompletetiontime": $("#completeDate").val(),
                 "importance": this.importance,
                "name": this.name,
                "pid": this.pid,
                "responsibledeptcode":this.responsibledeptcode,
                "responsibledeptname":this.responsibledeptname,
                "responsiblesn": this.responsibleOptions[0].uid,
                responsiblename:this.responsibleOptions[0].displayName,
                "scope": this.scope,
                "source": this.sourceSelected,
                "status": 0,
                "urgency":this.urgency,
                "id":this.id
            };
            // return;
            add_supervision(options,(result, state, jqxhr)=>{
                this.save_modal_txt="保存成功";
                    $("#"+this.save_modal).modal("show");
                let timer=setTimeout(()=>{
                    clearTimeout(timer);
                    _this.id=result;
                    location.href='/pages/supervision/supervision-detail.html?id='+result;
                },700);
            },(result,state,jqxhr)=>{
                this.save_modal_txt="保存失败";
                 $("#"+this.save_modal).modal();
                // console.log(result)
            });
        },
        navtoAll(){
            window.location.href="/pages/supervision/supervision-all.html";
        },
        navtomine:function(){
             window.location.href="/pages/supervision/supervision-mine.html";
        },cancel:function(){
            if(this.previous=="all") window.location.href="/pages/supervision/supervision-all.html";
            else window.location.href="/pages/supervision/supervision-mine.html";
        },
        showAccessoryModal:function() {
            // body...
            // $("#"+this.accessory_modal).modal();
            window.open("http://192.168.0.163:8080/cnnpdm/service.jsp?action=uploadAndView","_blank");
        }
    },
    components: {
        comAccordion,
        leaderSelect,
        updateRate,
        modalPop
    }

});