!function(e){function t(s){if(r[s])return r[s].exports;var o=r[s]={exports:{},id:s,loaded:!1};return e[s].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}for(var o=r(3),a=s(o),n=r(1),i=window.interfaceSettings.supervisionRequest.api,c=new Vue({el:"#filterSection",data:{filterOptions:{areaCode:[],sourceCode:[],deptsCode:[]},dateFilter:[{title:"全部",status:!0},{title:"上周",status:!0},{title:"本周",status:!0},{title:"下周",status:!0},{title:"时段",status:!0}],dateOptions:{show:!1,type:"date",value:"2016-6-21",begin:"2016-6-20",end:"2016-12-25",x:0,y:0,range:!0},area:{show:[{status:"1",name:"全部"}],more:[]},source:{show:[],more:[]},derivedMeeting:[],org:{show:[],more:[]},depts:{show:[],more:[]},stateList:[]},methods:{changeTime:function(e){e.stopPropagation();var t=e.currentTarget,r=$(t),s=t.getAttribute("data-mark");if(!r.hasClass("btn-success")||"custom"==s){switch($("#datePicker").find(".btn").removeClass("btn-success"),r.addClass("btn-success"),s){case"all":delete this.filterOptions.searchBeginDate,delete this.filterOptions.searchEndDate;break;case"lastweek":this.filterOptions.searchBeginDate=moment().day(-6).format("YYYY-MM-DD"),this.filterOptions.searchEndDate=moment().day(0).format("YYYY-MM-DD");break;case"thisweek":this.filterOptions.searchBeginDate=moment().weekday(1).format("YYYY-MM-DD"),this.filterOptions.searchEndDate=moment().day(7).format("YYYY-MM-DD");break;case"nextweek":this.filterOptions.searchBeginDate=moment().day(8).format("YYYY-MM-DD"),this.filterOptions.searchEndDate=moment().day(14).format("YYYY-MM-DD");break;case"custom":var o=$("#startDate").val().split("/"),a=$("#endDate").val().split("/");this.filterOptions.searchBeginDate=o[2]+"-"+o[0]+"-"+o[1],this.filterOptions.searchEndDate=a[2]+"-"+a[0]+"-"+a[1]}d.fetchTransactions(i.searchUrl)}},changeArea:function(e,t,r){if("source"==r&&("MEETING"==this.source[t][e].diccode||0==e&&"show"==t))for(var s=this.filterOptions.sourceCode,o=this.derivedMeeting,a=0;a<o.length;a++){var n=$.inArray(o[a].diccode,s);n>-1&&(s.splice(n,1),this.derivedMeeting[a].status="0")}var c=this[r].show[0],u=this[r].show;if("more"==t&&(u=this[r].more),0==e&&"show"==t){if("1"==c.status)return;c.status="1";for(var l=1,p=u.length;p>l;l++)u[l].status="0";this.filterOptions[r+"Code"]=[];for(var h=this[r].more,f=0,g=h.length;g>f;f++)h[f].status="0";this[r].more=h}else{c.status="0";var v=this.filterOptions[r+"Code"],m="diccode";if("depts"==r&&(m="ou"),"1"==u[e].status){u[e].status="0";for(var y in v)v[y]==u[e][m]&&v.splice(y,1)}else u[e].status="1",v.push(u[e][m]);this.filterOptions[r+"Code"]=v}if("more"==t){var w=this[r].show;this[r]={show:w,more:u}}else{var k=this[r].more;this[r]={show:u,more:k}}d.fetchTransactions(i.searchUrl)},changeMeeting:function(e){for(var t=this.source.show,r=this.filterOptions.sourceCode,s=0;s<t.length;s++)if((0==s||"会议"==t[s].dicname)&&"1"==t[s].status){t[s].status="0";var o=$.inArray(t[s].diccode,r);r.splice(o,1)}var a=this.derivedMeeting[e],n=$.inArray(a.diccode,r);n>-1?(r.splice(n,1),a.status="0"):(a.status="1",r.push(a.diccode)),d.fetchTransactions(i.searchUrl)},changeOrg:function(e,t){var r=this.org.show,s=this.org.more;if("more"==t&&(r=this.org.more,s=this.org.show),"1"!=r[e].status){for(var o=0,a=r.length;a>o;o++)r[o].status="0";for(var i=0,c=s.length;c>i;i++)s[i].status="0";r[e].status="1","more"==t?this.org={show:s,more:r}:this.org={show:r,more:s},(0,n.loadingCover)(),this.fetchDepts(r[e].ou)}},fetchDepts:function(e){var t=this;$.ajax({type:"get",dataType:"json",url:(0,n.setSupervisionHeader)(i.deptListUrl,null,e),success:function(e,r,s){var o=[];for(var a in e)2==e[a].level&&(e[a].status="0",o.push(e[a]));var n=[{status:"1",name:"全部"}];t.depts={show:n.concat(o.slice(0,6)),more:o.slice(6)},$.unblockUI()},error:function(e,t,r){$.unblockUI(),console.log(r.key),console.log(e)}})}},created:function(){var e=this,t={supAreaUrl:i.supAreaUrl,supSourceUrl:i.supSourceUrl,orgUrl:i.orgUrl};for(var r in t)$.ajax({type:"get",dataType:"json",url:(0,n.setSupervisionHeader)(t[r]),success:function(t,r,s){for(var o in t)t[o].status="0";var a=s.key,n=[{status:"1",dicname:"全部"}];if("orgUrl"==a&&(n=[{status:"1",name:"全部"}]),"supAreaUrl"==a)e.area={show:n.concat(t.slice(0,6)),more:t.slice(6)};else if("supSourceUrl"==a){for(var i=[],u=[],l=0;l<t.length;l++)"10019"==t[l].parentid?i.push(t[l]):u.push(t[l]);e.derivedMeeting=i,e.source={show:n.concat(u.slice(0,6)),more:u.slice(6)}}else"orgUrl"==a?(e.org={show:t.slice(0,6),more:t.slice(6)},c.changeOrg(0,"show")):e.depts={show:n.concat(t.slice(0,6)),more:t.slice(6)}},error:function(e,t,r){console.log(r.key),console.log(e)}}).key=r},ready:function(){$("#startDate").daterangepicker({singleDatePicker:!0,showDropdowns:!0},function(e,t,r){}),$("#endDate").daterangepicker({singleDatePicker:!0,showDropdowns:!0}),$("#filterSection").on("click","a.drop-menu-btn",function(e){e.stopPropagation()})}}),u=new Array(8),l=0;8>l;l++)u[l]="sorting";var d=new Vue({el:"#result-section",data:{ths:[{key:"code",val:"督办编号"},{key:"name",val:"督办事项名称"},{key:"accountablename",val:"责任领导(A)"},{key:"responsiblename",val:"责任人(R)"},{key:"estimatedcompletetiontime",val:"计划完成时间"},{key:"urgency",val:"紧急程度"},{key:"importance",val:"重要程度"},{key:"rate",val:"最新进展"}],keyItems:{sorting:u,total:[],show:[],current:1},pageSize:3,levelBackground:["gray","#A1C636","#5CB85C","#F0AD4E","#D9534F"]},created:function(){this.fetchTransactions(i.searchUrl)},methods:{changePage:function(e,t,r,s){var o=this[s+"Items"];o.current=e,this.changeHandler(e,s,o)},sortColumn:function(e,t){function r(e,t){return/^\d/.test(e)^/^\D/.test(t)?e>t?1:e==t?0:-1:e>t?-1:e==t?0:1}var s=this,o=this[t+"Items"],a=o.sorting[e];"sorting_asc"==a?!function(){var a=u.concat();a[e]="sorting_desc",o.sorting=a;var n=s.ths[e].key;o.total.sort(function(e,t){return r(t[n],e[n])}),s.changeHandler(o.current,t,o)}():!function(){var a=u.concat();a[e]="sorting_asc",o.sorting=a;var n=s.ths[e].key;o.total.sort(function(e,t){return r(e[n],t[n])}),s.changeHandler(o.current,t,o)}()},changeHandler:function(e,t,r){var s=this.pageSize;r.show=r.total.slice((e-1)*s,s*e)},fetchTransactions:function(e){var t={};for(var r in c.filterOptions)t[r]=c.filterOptions[r];0==t.areaCode.length?delete t.areaCode:t.areaCode=t.areaCode.join(","),t.scope=t.deptsCode,delete t.deptsCode,0==t.scope.length?delete t.scope:t.scope=t.scope.join(","),t.source=t.sourceCode,delete t.sourceCode,0==t.source.length?delete t.source:t.source=t.source.join(",");var s=this;t=(0,a["default"])(t),$.ajax({type:"POST",dataType:"json",data:t,contentType:"application/json",url:(0,n.setSupervisionHeader)(e,{page:0,size:1e3}),success:function(e,t,r){for(var o=[],a=0,n=e.length;n>a;a++){var i=e[a];i.latestTrace?(i.rate=i.latestTrace.rate,i.latestDesc=i.latestTrace.description):(i.rate=0,i.latestDesc=""),i.rate<25?i.rateState="progress-bar-danger":i.rate<75?i.rateState="progress-bar-warning":i.rateState="progress-bar-success",o.push(i)}var c=u.concat(),l=s.pageSize;s.keyItems={total:o,show:o.slice(0,l),sorting:c,current:1};var d=Number(s.pageSize)||10,p=Number(s.keyItems.total.length);$("#key-pagination").extendPagination({totalCount:p,limit:d,name:"key",callback:function(e,t,r,o){s.changePage(e,t,r,o)}})},error:function(e,t,r){console.log(e)}})},newfunc:function(){}}})},function(e,t,r){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}function o(e,t,r,s,o,a){if(r){var n=new Date;n.setTime(n.getTime()+24*r*60*60*1e3);var i=n.toGMTString()}else var i="";var c=e+"="+escape(t);i&&(c+=";expires="+i),s&&(c+=";path="+escape(s)),o&&(c+=";domain="+escape(o)),a&&(c+=";secure="+a),document.cookie=c}function a(e){var t,r=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(r))?unescape(t[2]):null}function n(e){var t=new Date;t.setTime(t.getTime()-864e5),o(e,"",t)}function i(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),r=window.location.search.substr(1).match(t);return null!=r?unescape(r[2]):null}function c(){$.blockUI({message:"数据获取中，请稍候... ...",css:{border:"none",padding:"15px",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px",opacity:.5,color:"#fff"}})}function u(e,t){var r=function(e,r,s){t.list=e,t.successNext&&t.successNext()},s=function(e,t,r){console.log("error",e)},o={type:"get",url:e.URL+e.QueryString,success:r,error:s};"post"==e.METHOD&&(o={type:"post",url:e.URL+e.QueryString,data:e.PLAYLOAD,contentType:e.CONTENT_TYPE,success:r,error:s}),$.ajax(o)}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchAjaxService=t.loadingCover=t.getQueryString=t.deleteCookie=t.getCookie=t.setCookie=t.add_supervision=t.fetch_sourceFromServer=t.fetch_areaFromServer=t.fetch_deptsFromServer=t.fetch_serviceByHttpProtocol=t.setSupervisionHeader=void 0;var l=r(3),d=s(l),p=window.interfaceSettings.supervisionRequest,h=function(e,t,r){return(r?e.replace("%id%",r):e)+"?"+(t?$.param($.extend({},p.header,t)):$.param(p.header))},f=function(e,t,r,s,o){"post"==t&&(r=(0,d["default"])(r)),$.ajax({url:e,type:t,data:r,contentType:"application/json",success:function(e,t,r){console.log("success"),s(e,t,r)},error:function(e,t,r){console.log("error"),o(e,t,r)}})},g=function(e,t){var r=h(p.api.deptUrl,null,e);f(r,"get",{},t,function(e,t,r){console.log(e)})},v=function(e){var t=h(p.api.supSourceUrl);f(t,"get",{},e,function(e,t,r){console.log(e)})},m=function(e){var t=h(p.api.supAreaUrl);f(t,"get",{},e,function(e,t,r){console.log(e)})},y=function(e,t){var r=h(p.api.supAddUrl);f(r,"post",e,t,function(e,t,r){console.log(e)})};t.setSupervisionHeader=h,t.fetch_serviceByHttpProtocol=f,t.fetch_deptsFromServer=g,t.fetch_areaFromServer=m,t.fetch_sourceFromServer=v,t.add_supervision=y,t.setCookie=o,t.getCookie=a,t.deleteCookie=n,t.getQueryString=i,t.loadingCover=c,t.fetchAjaxService=u},,function(e,t,r){e.exports={"default":r(6),__esModule:!0}},function(e,t){var r=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=r)},,function(e,t,r){var s=r(4),o=s.JSON||(s.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}}]);