/**
 * Created by Mattia on 2016/6/23.
 */
import Vue from "vue"
import { supervisionRequest } from '../webconfig';
import ComHeader from "../components/header.vue";
import ComFooter from "../components/footer.vue";
import {getQueryString,getCookie} from '../common-function';

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
let timeNow=new Date().getTime();
let detailVm = new Vue({
    el: "#article",
    data: {
        previous:null,
        id:null,
        "code": "",
        "pid": null,
        "pcode": null,
        "pname": null,
        "name": "",
        "source": "",
        "area": "",
        "status": 1,
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
        children: [
        ],
        progressModalId:"progressModal"+timeNow,
        modalId:"modal"+timeNow,
        progressRate:{rate:4,comment:""},
        currentModal:"close",
        updateItem:{},
        userLogin:{}
    },  
    created: function () {
        let _this = this;
        this.userLogin={
            updateuserid:getCookie("userid"),
            updateusername:getCookie("username")
        };
        this.id=getQueryString("id");
        this.fetchOriginSupervision(this.id);
        this.previous=getQueryString("previous");      
    },
    methods:{
        fetchOriginSupervision:function(iid){
            let _this=this;
              $.ajax({
            type: "get",
            dataType: "json",
            url: supervisionRequest.supDetailUrl + iid,
            success: function (result) {
                console.log("result",result)
                let children = [];
                for (let i = 0, len = result.length; i < len; i++) {
                    let item = result[i];
                    if (item.id == iid) {
                        for (let key in item) {
                            _this[key] = item[key];
                        }

                    } else {
                        children.push(item);
                    }
                }

                _this.children = children;
            },
            error: function (data) {
                console.log(data);
            }
        });
        },
        updateProgress:function(iid){
            // $("#"+this.progressModalId).modal({backdrop: 'static', keyboard: false});
             this.currentModal="updateProgress";
             this.showModal();
        },
        showModal:function(){            
                 $("#"+this.modalId).modal({backdrop: 'static', keyboard: false});
        },
        postphone:function(item){
            this.currentModal="postphone";  
            this.postphoneDate=item.estimatedcompletetiontime;
            this.updateItem={
                id:item.id,
                postphoneDate:item.estimatedcompletetiontime,
                comment:""
            };  
            console.log("postphoneDate",this.postphoneDate)
            this.showModal();     
        },
        revoke:function(item){
            this.currentModal="revoke";
            this.updateItem={
                id:item.id,
                comment:""
            };
            this.showModal();
        },
        close:function(item){
            this.currentModal="close";
            this.updateItem={
                id:item.id,
                comment:""
            };
            this.showModal();
        },
        saveChanges:function(){
            console.log(this.updateItem)
            let item=this.updateItem;
            let url="",type="";
             let options={
                    "updateuserid": this.userLogin.updateuserid,
                    "updateusername": this.userLogin.updateusername,
                    "reason":this.updateItem.comment
                };
            switch(this.currentModal){
                // case "updateProgress":
                // url=""
                case "postphone":
                url=supervisionRequest.postphoneUrl+item.id+"?newDateStr="+item.postphoneDate;
                type="put";
                break;
                case "revoke":
                url=supervisionRequest.revokeUrl;
                type="delete";
                break;
                case "close":
                url=supervisionRequest.closeUrl+item.id;
                type="delete";
                break;
            }
             $("#"+this.modalId).modal("hide");
             $.ajax({
                type:type,
                contentType:"application/json",
                data:JSON.stringify(options),
                url:url,
                success(result,state,xhr){
                    console.log("updateresult",result);
                },
                error:function(result,state,xhr){
                    console.log("error",result);
                }
             });
        }
    },
    components:{
         // updateRate:require("../supervision/components/update-rate.vue"),
         postphone:require("../supervision/components/postphone.vue"),
         modalPop:require("../components/modal-pop.vue"),
        progressBar:require("../components/progressbar-drag.vue")
    }

});

