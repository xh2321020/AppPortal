/**
 * Created by Mattia on 2016/8/23.
 */
import {getQueryString,getCookie,setSupervisionHeader} from "../common-function";
import userSelector from "../components/user-selector-workspace.vue";
import comAccordion from "../components/accordion-menu-workspace.vue";
let supervisionRequest=window.interfaceSettings.supervisionRequest.api;
let selectUserVm = new Vue({
    el: "#article",
    data: {
        // responsibleOptions: [{
        //     uid:"",
        //     displayname:""
        // }],     
        responsibleOptions: [],
        responsibleParams:{
            searchuserUrl:window.interfaceSettings.supervisionRequest.api.searchuserUrl,
            multiple:true,
            leaderOnly:false,
            title:"管理员："
        },
        // memberOptions: [{
        //     uid:"",
        //     displayname:""
        // }],
        memberOptions: [],
        memberParams:{
            searchuserUrl:window.interfaceSettings.supervisionRequest.api.searchuserUrl,
            multiple:true,
            leaderOnly:false,
            title:"成员："
        },
        selectedDepts: [],
        selectedDept:[],
        requests:supervisionRequest

    },
    computed: {
        responsibledeptname:function(){
            return this.selectedDept.length>0?this.selectedDept[0].name:"";
        },
        responsiblename:function(){
            return this.responsibleOptions.length>0?this.responsibleOptions[0].displayname:"";
        },
        responsiblename:function(){
            return this.responsibleOptions.length>0?this.responsibleOptions[0].displayname:"";
        },
        responsiblenames:function(){
            let names=$.map(this.responsibleOptions,function(item){
                return item.displayname;
            });
            return names.join(",");
        },
        membername:function(){
            return this.memberOptions.length>0?this.memberOptions[0].displayname:"";
        },
        membernames:function(){
            let names=$.map(this.memberOptions,function(item){
                return item.displayname;
            });
            return names.join(",");
        },
        memberuids:function(){
            let uids=$.map(this.memberOptions,function(item){
                return item.uid;
            });
            return uids.join(",");
        },
        scope: function () {
            let depts = $.map(this.selectedDepts, function (item) {
                return item.name;
            })
            return depts.join(",");
        }
    },
    created: function () {
        let _this = this;
        // this.fetchOriginSupervision();
    }, ready: function () {
        //alert("haha")
    },
    methods: {

        fetchOriginSupervision(){
            let _this=this;
            // alert(supervisionRequest.searchuserUrl)
            $.ajax({
                type: "get",
                dataType: "json",
                url: setSupervisionHeader(supervisionRequest.supDetailUrl ,null, this.id),
                success: function (result) {
                    //alert(123)
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
                    // alert(data)
                    console.log(data);
                }
            });
        }
    },
    components: {
        userSelector,
        comAccordion
    }

});