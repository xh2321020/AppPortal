/**
 * Created by Mattia on 2016/6/23.
 */
import {getQueryString,getCookie,setCookie,setSupervisionHeader} from "../common-function.js";
let supervisionRequest=window.interfaceSettings.supervisionRequest.api;
let timeNow=new Date().getTime();
let detailVm = new Vue({
    el: "#article",
    data: {
        previous:null,
        id:null,
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
        children: [
        ],
        progressModalId:"progressModal"+timeNow,
        modalId:"modal"+timeNow,
        progressRate:0,
        currentModal:"close",
        updateItem:{},
        userLogin:{},
        traceHistory:[],
        alertMessage:"保存成功",
        area_name:"",
        source_name:"",
        reason:""
    }, 
    computed:{
        escapeName:function(){
            return escape(this.name);
        }
    },
    created: function () {
        let _this = this;
        if(window.userLogin);
        else
        window.userLogin={
             updateuserid:getCookie("userid"),
            updateusername:getCookie("username")
        }
        this.userLogin=window.userLogin;
        this.userLogin={
            updateuserid:getCookie("userid"),
            updateusername:getCookie("username")
        };
        this.id=getQueryString("id");
        this.fetchOriginSupervision(this.id);
        this.fetchTrace();
        this.previous=getQueryString("previous");      

    },
    methods:{
        alertModal:function(message){
            this.alertMessage=message;
            $("#alertModal").modal("show");
        },
        missrole:function(){
              this.currentModal="missrole";
                 this.showModal();
                         
        },
        fetchOriginSupervision:function(iid){
            let _this=this;
              $.ajax({
            type: "get",
            dataType: "json",
            url: setSupervisionHeader(supervisionRequest.supDetailUrl,null,iid),
            success: function (result) {
                let children = [];
                for (let i = 0, len = result.length; i < len; i++) {
                    let item = result[i];
                    if (item.id == iid) {
                        for (let key in item) {
                            _this[key] = item[key];
                        }
                        if(item.latestTrace)
                          _this.progressRate=item.latestTrace.rate?item.latestTrace.rate:0;

                    } else {
                        children.push(item);
                    }
                }

                _this.children = children;
            },
            error: function (data) {
                // console.log(data);
            }
        });
        },
        fetchTrace:function(){
              let _this=this;
              $.ajax({
                type:"get",
                url:setSupervisionHeader(supervisionRequest.traceHistory,null,this.id),
                success:function(result,state,xhr){
                    _this.traceHistory=result;
                },
                error:function(result,state,xhr){
                    // console.log("error",result);
                }
              });
        },
        updateProgress:function(){
          if(this.userLogin.updateuserid!=this.accountablesn&&this.userLogin.updateuserid!=this.responsiblesn){
               this.alertModal('仅“发起人”和“责任人”角色有此操作权限');
                return;
            }
            this.updateItem.id=this.id;
             this.currentModal="updateProgress";
             this.showModal();
        },
        showModal:function(){            
                 $("#"+this.modalId).modal({backdrop: 'static', keyboard: false});
        },
          editOperation:function(id){
             if(this.userLogin.updateuserid!=this.accountablesn){
               this.alertModal("仅“发起人”角色有此操作权限");
                return;
            }
            window.location.href='/pages/supervision/supervision-edit.html?id='+id+'&previous=detail';
          },
        postphone:function(param){
            let item=(param=="parent")?this:param;          
            if(this.userLogin.updateuserid!=item.accountablesn){
               this.alertModal("仅“发起人”角色有此操作权限");
                return;
            }
            this.currentModal="postphone";            
            this.postphoneDate=item.estimatedcompletetiontime;
            this.updateItem={
                id:item.id,
                postphoneDate:item.estimatedcompletetiontime 
                }     
            this.showModal();  

        },
        revoke:function(item){
            item=item=="parent"?this:item;
           if(this.userLogin.updateuserid!=item.accountablesn){
             this.alertModal("仅“发起人”角色有此操作权限");
                return;
            }
            this.currentModal="revoke";
            this.updateItem={
                id:item.id
            };
            this.showModal();
        },
        close:function(item){ 
            item=item=="parent"?this:item;
            if(this.userLogin.updateuserid!=item.accountablesn){
              this.alertModal("仅“发起人”角色有此操作权限");
                return;
            }
            this.currentModal="close";
            this.updateItem={
                id:item.id
            };
            this.showModal();
        },
        saveChanges:function(){
            let _this=this;
            let item=this.updateItem;
            let url="",type="";
             let options={};
            switch(this.currentModal){
                case "updateProgress":
                options={ 
                    "operatorname":this.userLogin.updateusername,
                    "operatorsn":this.userLogin.updateuserid,
                  "description":this.reason,
                  "rate": this.progressRate,
                  "supervisionid": this.updateItem.id
              };
                url=setSupervisionHeader(supervisionRequest.traceUrl,null,this.id);
                // type="put";
                break;
                case "postphone":
                url=setSupervisionHeader(supervisionRequest.postphoneUrl,{newDateStr:item.postphoneDate},item.id);
                // type="put";
                break;
                case "revoke":
                url=setSupervisionHeader(supervisionRequest.revokeUrl,null,item.id);
                // type="delete";               
                break;
                case "close":
                url=setSupervisionHeader(supervisionRequest.closeUrl,null,item.id);                
                // type="delete";                
                break;
            }
            if(this.currentModal!="updateProgress"){
                  options={
                    "updateuserid": this.userLogin.updateuserid,
                    "updateusername": this.userLogin.updateusername,
                    "reason": this.reason
                };
           }
             $.ajax({
                type:"post",
                data:JSON.stringify(options),
                url:url,
                success(result,state,xhr){
                     $("#"+_this.modalId).modal("hide");
                    let messageCode=result.messagecode;
                    if(messageCode==200){
                         _this.alertModal("保存成功");
                          let timer=setTimeout(()=>{
                            clearTimeout(timer);
                            location.reload();
                        },500);
                    }else{
                        _this.alertModal("保存失败");
                    }
                                           
                },
                error:function(result,state,xhr){
                    // _this.alertModal(JSON.stringify(result))
                    // console.log("error",result);
                      _this.alertModal("保存失败");
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

