!function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}({0:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var i=o(3),s=n(i),r=o(1),a=window.interfaceSettings.supervisionRequest.api,d=(new Date).getTime();new Vue({el:"#article",data:{previous:null,id:null,code:"",pid:null,pcode:null,name:"",source:"",area:"",status:1,importance:4,urgency:5,scope:"",estimatedcompletetiontime:"",actualcompletetiontime:null,accountablesn:"",accountablename:"",responsiblesn:"",responsiblename:" ",responsibledeptcode:null,responsibledeptname:null,comments:null,latestTrace:{},children:[],progressModalId:"progressModal"+d,modalId:"modal"+d,progressRate:4,currentModal:"close",updateItem:{},userLogin:{}},computed:{escapeName:function(){return escape(this.name)}},created:function(){(0,r.setCookie)("userid","20120014",7),(0,r.setCookie)("username","谢波",7),window.userLogin||(window.userLogin={updateuserid:(0,r.getCookie)("userid"),updateusername:(0,r.getCookie)("username")}),this.userLogin=window.userLogin,this.userLogin={updateuserid:(0,r.getCookie)("userid"),updateusername:(0,r.getCookie)("username")},this.id=(0,r.getQueryString)("id"),this.fetchOriginSupervision(this.id),this.previous=(0,r.getQueryString)("previous")},methods:{missrole:function(){var e=this;this.currentModal="missrole",this.showModal();var t=setTimeout(function(){clearTimeout(t),$("#"+e.modalId).modal("hide")},1e3)},fetchOriginSupervision:function(e){var t=this;$.ajax({type:"get",dataType:"json",url:(0,r.setSupervisionHeader)(a.supDetailUrl,null,e),success:function(o){for(var n=[],i=0,s=o.length;s>i;i++){var r=o[i];if(r.id==e){for(var a in r)t[a]=r[a];r.latestTrace&&(t.progressRate=r.latestTrace.rate?r.latestTrace.rate:0)}else n.push(r)}t.children=n},error:function(e){console.log(e)}})},updateProgress:function(){this.updateItem.id=this.id,this.currentModal="updateProgress",this.showModal()},showModal:function(){$("#"+this.modalId).modal({backdrop:"static",keyboard:!1})},postphone:function(e){return this.userLogin.updateuserid!=this.accountablesn?void this.missrole():(this.currentModal="postphone",this.postphoneDate=e.estimatedcompletetiontime,this.updateItem={id:e.id,postphoneDate:e.estimatedcompletetiontime,comment:""},console.log("postphoneDate",this.postphoneDate),void this.showModal())},revoke:function(e){this.currentModal="revoke",this.updateItem={id:e.id,comment:""},this.showModal()},close:function(e){this.currentModal="close",this.updateItem={id:e.id,comment:""},this.showModal()},saveChanges:function(){var e=this,t=this.updateItem,o="",n="",i={updateuserid:this.userLogin.updateuserid,updateusername:this.userLogin.updateusername};switch(this.currentModal){case"updateProgress":i=$.extend({},i,{description:this.comments,rate:this.progressRate,supervisionid:this.updateItem.id}),o=(0,r.setSupervisionHeader)(a.traceUrl,null,this.id),n="put";break;case"postphone":o=(0,r.setSupervisionHeader)(a.postphoneUrl,{newDateStr:t.postphoneDate},t.id),n="put";break;case"revoke":o=(0,r.setSupervisionHeader)(a.revokeUrl,null,t.id),n="delete";break;case"close":o=(0,r.setSupervisionHeader)(a.closeUrl,null,t.id),n="delete"}"updateProgress"!=this.currentModal&&(i=$.extend({},i,{description:this.comments,rate:this.progressRate,supervisionid:this.updateItem.id})),$.ajax({type:n,contentType:"application/json",data:(0,s["default"])(i),url:o,success:function(t,o,n){var i=t.messagecode;200==i?e.currentModal="success":e.currentModal="fail";var s=setTimeout(function(){clearTimeout(s),$("#"+e.modalId).modal("hide"),location.reload()},500)},error:function(t,o,n){console.log("error",t),e.currentModal="fail";var i=setTimeout(function(){clearTimeout(i),$("#"+e.modalId).modal("hide")},1e3)}})}},components:{postphone:o(136),modalPop:o(20),progressBar:o(38)}})},1:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,o,n,i,s){if(o){var r=new Date;r.setTime(r.getTime()+24*o*60*60*1e3);var a=r.toGMTString()}else var a="";var d=e+"="+escape(t);a&&(d+=";expires="+a),n&&(d+=";path="+escape(n)),i&&(d+=";domain="+escape(i)),s&&(d+=";secure="+s),document.cookie=d}function s(e){var t,o=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(o))?unescape(t[2]):null}function r(e){var t=new Date;t.setTime(t.getTime()-864e5),i(e,"",t)}function a(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),o=window.location.search.substr(1).match(t);return null!=o?unescape(o[2]):null}function d(){$.blockUI({message:"数据获取中，请稍候... ...",css:{border:"none",padding:"15px",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px",opacity:.5,color:"#fff"}})}function l(e,t){var o=function(e,o,n){t.list=e,t.successNext&&t.successNext()},n=function(e,t,o){console.log("error",e)},i={type:"get",url:e.URL+e.QueryString,success:o,error:n};"post"==e.METHOD&&(i={type:"post",url:e.URL+e.QueryString,data:e.PLAYLOAD,contentType:e.CONTENT_TYPE,success:o,error:n}),$.ajax(i)}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchAjaxService=t.loadingCover=t.getQueryString=t.deleteCookie=t.getCookie=t.setCookie=t.add_supervision=t.fetch_sourceFromServer=t.fetch_areaFromServer=t.fetch_deptsFromServer=t.fetch_serviceByHttpProtocol=t.setSupervisionHeader=void 0;var u=o(3),c=n(u),p=window.interfaceSettings.supervisionRequest,f=function(e,t,o){return(o?e.replace("%id%",o):e)+"?"+(t?$.param($.extend({},p.header,t)):$.param(p.header))},m=function(e,t,o,n,i){"post"==t&&(o=(0,c["default"])(o)),$.ajax({url:e,type:t,data:o,contentType:"application/json",success:function(e,t,o){console.log("success"),n(e,t,o)},error:function(e,t,o){console.log("error"),i(e,t,o)}})},v=function(e,t){var o=f(p.api.deptUrl,null,e);m(o,"get",{},t,function(e,t,o){console.log(e)})},h=function(e){var t=f(p.api.supSourceUrl);m(t,"get",{},e,function(e,t,o){console.log(e)})},g=function(e){var t=f(p.api.supAreaUrl);m(t,"get",{},e,function(e,t,o){console.log(e)})},b=function(e,t){var o=f(p.api.supAddUrl);m(o,"post",e,t,function(e,t,o){console.log(e)})};t.setSupervisionHeader=f,t.fetch_serviceByHttpProtocol=m,t.fetch_deptsFromServer=v,t.fetch_areaFromServer=g,t.fetch_sourceFromServer=h,t.add_supervision=b,t.setCookie=i,t.getCookie=s,t.deleteCookie=r,t.getQueryString=a,t.loadingCover=d,t.fetchAjaxService=l},2:function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var o=this[t];o[2]?e.push("@media "+o[2]+"{"+o[1]+"}"):e.push(o[1])}return e.join("")},e.i=function(t,o){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},i=0;i<this.length;i++){var s=this[i][0];"number"==typeof s&&(n[s]=!0)}for(i=0;i<t.length;i++){var r=t[i];"number"==typeof r[0]&&n[r[0]]||(o&&!r[2]?r[2]=o:o&&(r[2]="("+r[2]+") and ("+o+")"),e.push(r))}},e}},3:function(e,t,o){e.exports={"default":o(6),__esModule:!0}},4:function(e,t){var o=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=o)},5:function(e,t,o){function n(e,t){for(var o=0;o<e.length;o++){var n=e[o],i=c[n.id];if(i){i.refs++;for(var s=0;s<i.parts.length;s++)i.parts[s](n.parts[s]);for(;s<n.parts.length;s++)i.parts.push(d(n.parts[s],t))}else{for(var r=[],s=0;s<n.parts.length;s++)r.push(d(n.parts[s],t));c[n.id]={id:n.id,refs:1,parts:r}}}}function i(e){for(var t=[],o={},n=0;n<e.length;n++){var i=e[n],s=i[0],r=i[1],a=i[2],d=i[3],l={css:r,media:a,sourceMap:d};o[s]?o[s].parts.push(l):t.push(o[s]={id:s,parts:[l]})}return t}function s(e,t){var o=m(),n=g[g.length-1];if("top"===e.insertAt)n?n.nextSibling?o.insertBefore(t,n.nextSibling):o.appendChild(t):o.insertBefore(t,o.firstChild),g.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");o.appendChild(t)}}function r(e){e.parentNode.removeChild(e);var t=g.indexOf(e);t>=0&&g.splice(t,1)}function a(e){var t=document.createElement("style");return t.type="text/css",s(e,t),t}function d(e,t){var o,n,i;if(t.singleton){var s=h++;o=v||(v=a(t)),n=l.bind(null,o,s,!1),i=l.bind(null,o,s,!0)}else o=a(t),n=u.bind(null,o),i=function(){r(o)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else i()}}function l(e,t,o,n){var i=o?"":n.css;if(e.styleSheet)e.styleSheet.cssText=b(t,i);else{var s=document.createTextNode(i),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(s,r[t]):e.appendChild(s)}}function u(e,t){var o=t.css,n=t.media,i=t.sourceMap;if(n&&e.setAttribute("media",n),i&&(o+="\n/*# sourceURL="+i.sources[0]+" */",o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var c={},p=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},f=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),m=p(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,h=0,g=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=f()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var o=i(e);return n(o,t),function(e){for(var s=[],r=0;r<o.length;r++){var a=o[r],d=c[a.id];d.refs--,s.push(d)}if(e){var l=i(e);n(l,t)}for(var r=0;r<s.length;r++){var d=s[r];if(0===d.refs){for(var u=0;u<d.parts.length;u++)d.parts[u]();delete c[d.id]}}}};var b=function(){var e=[];return function(t,o){return e[t]=o,e.filter(Boolean).join("\n")}}()},6:function(e,t,o){var n=o(4),i=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return i.stringify.apply(i,arguments)}},20:function(e,t,o){var n,i;n=o(21),i=o(36),e.exports=n||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=i)},21:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={data:function(){return(new Date).getTime(),{}},props:["modalTitle","modal_id"]}},22:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,o,n){this.btn=document.getElementById(e),this.bar=document.getElementById(t),this.title=document.getElementById(o),this.step=this.bar.getElementsByTagName("div")[0],this.init(n)};o.prototype={init:function(e){var t=this,o=document,n=window,i=Math;t.btn.onmousedown=function(s){var r=(s||n.event).clientX,a=this.offsetLeft,d=t.bar.offsetWidth-this.offsetWidth;o.onmousemove=function(s){var l=(s||n.event).clientX,u=i.min(d,i.max(-2,a+(l-r)));t.btn.style.left=u+"px",t.ondrag(i.round(100*i.max(0,u/d)),u),n.getSelection?n.getSelection().removeAllRanges():o.selection.empty(),e.rate=i.round(100*i.max(0,u/d))},o.onmouseup=new Function("this.onmousemove=null")}},ondrag:function(e,t){this.step.style.width=Math.max(0,t)+"px",this.title.innerHTML=e+"%"}},t["default"]={data:function(){var e=(new Date).getTime();return{btn_id:"btn"+e,bar_id:"bar"+e,title_id:"title"+e}},props:["rate"],created:function(){},ready:function(){new o(this.btn_id,this.bar_id,this.title_id,this)},methods:{}}},35:function(e,t,o){t=e.exports=o(2)(),t.push([e.id,".scale_panel[_v-1214d038]{font-size:12px;color:#999;width:70%;position:absolute;line-height:18px;left:60px;top:0}.scale_panel .r[_v-1214d038]{float:right}.scale span[_v-1214d038]{width:8px;height:16px;position:absolute;top:-5px;cursor:pointer}.scale[_v-1214d038]{background-repeat:repeat-x;background-position:0 100%;background-color:#e4e4e4;border-left:1px solid #83bbd9;width:100%;height:3px;position:relative;font-size:0;border-radius:3px}.scale .bar[_v-1214d038]{background-repeat:repeat-x;background-color:#3be3ff;position:absolute;height:3px;width:0;left:0;bottom:0}",""])},36:function(e,t){e.exports='<div class="modal fade" :id=modal_id tabindex=-1 role=dialog aria-labelledby=myModalLabel> <div class=modal-dialog role=document> <div class=modal-content> <div class=modal-header> <button type=button class=close data-dismiss=modal aria-label=Close><span aria-hidden=true>&times;</span></button> <h4 class=modal-title></h4> </div> <div class=modal-body> <slot name=body></slot> </div> <div class=modal-footer> <slot name=save></slot> <button type=button class="btn btn-default" data-dismiss=modal>关闭</button> </div> </div> </div> </div>'},37:function(e,t){e.exports='<div class=progress-container _v-1214d038=""> <span :id=title_id v-text="rate+\'%\'" _v-1214d038=""></span> <div class=scale_panel _v-1214d038=""> <span class=r _v-1214d038="">100</span>0 <div class=scale :id=bar_id _v-1214d038=""> <div class=bar :style="{width:rate+\'%\'}" _v-1214d038=""></div> <span :id=btn_id style="background: url(assets/images/progressdrag.gif) no-repeat" :style="{left:rate+\'%\'}" _v-1214d038=""></span> </div> </div> </div>'},38:function(e,t,o){var n,i;o(39),n=o(22),i=o(37),e.exports=n||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=i)},39:function(e,t,o){var n=o(35);"string"==typeof n&&(n=[[e.id,n,""]]),o(5)(n,{}),n.locals&&(e.exports=n.locals)},62:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={data:function(){var e=(new Date).getTime();return{input_id:"dateInput"+e}},props:["estimatedcompletetiontime","comment"],created:function(){var e=this;this.$watch("estimatedcompletetiontime",function(t,o){$("#"+e.input_id).val(t)})},ready:function(){var e=this;$("#"+this.input_id).daterangepicker({singleDatePicker:!0,showDropdowns:!0,startDate:this.estimatedcompletetiontime},function(t,o,n){e.estimatedcompletetiontime=t.format("YYYY-MM-DD")})}}},102:function(e,t,o){t=e.exports=o(2)(),t.push([e.id,".comment[_v-2a88e1ae]{margin-top:1rem}",""])},118:function(e,t){e.exports='<div class=com-container _v-2a88e1ae=""> <form class=form-horizontal _v-2a88e1ae=""> <div class=form-group _v-2a88e1ae=""> <label class="col-sm-2 control-label" _v-2a88e1ae="">日期</label> <div class=col-sm-10 _v-2a88e1ae=""> <input type=text class=form-control :id=input_id _v-2a88e1ae=""> </div> </div> <div class=form-group _v-2a88e1ae=""> <label class="col-sm-2 control-label" _v-2a88e1ae="">延期原因</label> <div class=col-sm-10 _v-2a88e1ae=""> <textarea class="form-control comment" v-model=comment _v-2a88e1ae=""></textarea> </div> </div> </form> </div>'},136:function(e,t,o){var n,i;o(142),n=o(62),i=o(118),e.exports=n||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=i)},142:function(e,t,o){var n=o(102);"string"==typeof n&&(n=[[e.id,n,""]]),o(5)(n,{}),n.locals&&(e.exports=n.locals)}});