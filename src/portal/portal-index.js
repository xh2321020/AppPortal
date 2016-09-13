/**
 * Created by Mattia on 2016/5/26.
 */
//window.$=require("jquery")
import ComCatalog from "./components/catalog-panel.vue";

import {getQueryString} from "../common-function.js";
  
var articleVm = new Vue({
    el: "#article",
    data: {
        catalogs:[]
       
    },
    created: function () {
        let _this=this;
        let url=null;        
        let node=getQueryString("node"),type=getQueryString("type");
        let  portalRequest=window.interfaceSettings.portalRequest;
        if(type){
            url=portalRequest.api.catalogUrl.replace("%id%",node)+"?"+$.param(portalRequest.header);
            if(type=="1")document.title="部门门户";
            else document.title="专题门户";
        }else{
           url=portalRequest.api.catalogUrl.replace("%id%","0")+"?"+$.param(portalRequest.header);
        }
      /*  window.ajaxService({
            type:"get",
            url:url,
            dataType:"text",
            success:function(result){
                result=eval('(' + result + ')');
                // let list=result
                let list=new Array(result.length);
                for(let i =0;i<result.length;i++){
                    list[result[i].card_INDEX-1]=result[i];
                }            
                _this.catalogs=list;
            },
            error:function(result){
                console.log("error",result)
            }
        });*/
        $.ajax({
             type:"get",
            url:url,
            dataType:"text",
            success:function(result){
                result=eval('(' + result + ')');
                // let list=result
                let list=new Array(result.length);
                for(let i =0;i<result.length;i++){
                    list[result[i].card_INDEX-1]=result[i];
                }            
                _this.catalogs=list;
            },
            error:function(result){
                console.log("error",result)
            }
        });
    },
    methods: {
        imgErrorLoad:function (ev) {
            // body...
        var tar=ev.currentTarget;
        tar.src='assets/images/default-pics/'+Math.round(Math.random()*50)+'.png';
        }       
    },
    components:{
        comCatalog:ComCatalog
    }
});