!function(e){function t(a){if(r[a])return r[a].exports;var s=r[a]={exports:{},id:a,loaded:!1};return e[a].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}for(var s=r(3),n=a(s),o=r(1),i=window.interfaceSettings.supervisionRequest.api,c=new Vue({el:"#filterSection",data:{userLoginInfo:{},filterOptions:{areaCode:[],sourceCode:[],responsiblesn:""},dateFilter:[{title:"全部",status:!0},{title:"上周",status:!0},{title:"本周",status:!0},{title:"下周",status:!0},{title:"时段",status:!0}],dateOptions:{show:!1,type:"date",value:"2016-6-21",begin:"2016-6-20",end:"2016-12-25",x:0,y:0,range:!0},area:[],source:[],derivedMeeting:[],stateList:[{label:"正常",value:!0,feature:"label-success",margin:"50%"},{label:"一周内过期",value:!0,feature:"label-warning",margin:""},{label:"已过期",value:!0,feature:"label-danger",margin:""},{label:"已完成",value:!1,feature:"label-default",margin:""}]},methods:{changeTime:function(e){e.stopPropagation();var t=e.currentTarget,r=$(t),a=t.getAttribute("data-mark");if(!r.hasClass("btn-success")||"custom"==a){switch($("#datePicker").find(".btn").removeClass("btn-success"),r.addClass("btn-success"),a){case"all":delete this.filterOptions.searchBeginDate,delete this.filterOptions.searchEndDate;break;case"lastweek":this.filterOptions.searchBeginDate=moment().day(-6).format("YYYY-MM-DD"),this.filterOptions.searchEndDate=moment().day(0).format("YYYY-MM-DD");break;case"thisweek":this.filterOptions.searchBeginDate=moment().weekday(1).format("YYYY-MM-DD"),this.filterOptions.searchEndDate=moment().day(7).format("YYYY-MM-DD");break;case"nextweek":this.filterOptions.searchBeginDate=moment().day(8).format("YYYY-MM-DD"),this.filterOptions.searchEndDate=moment().day(14).format("YYYY-MM-DD");break;case"custom":var s=$("#startDate").val().split("/"),n=$("#endDate").val().split("/");this.filterOptions.searchBeginDate=s[2]+"-"+s[0]+"-"+s[1],this.filterOptions.searchEndDate=n[2]+"-"+n[0]+"-"+n[1]}d.fetchTransactions(i.searchUrl)}},changeArea:function(e,t){if("source"==t&&(0==e||"MEETING"==this.source[e].diccode))for(var r=this.filterOptions.sourceCode,a=this.derivedMeeting,s=0;s<a.length;s++){var n=$.inArray(a[s].diccode,r);n>-1&&(r.splice(n,1),this.derivedMeeting[s].status="0")}var o=this[t];if(0==e){if("1"==o[0].status)return;o[0].status="1";for(var c=1,u=o.length;u>c;c++)o[c].status="0";this.filterOptions[t+"Code"]=[]}else{var l=this.filterOptions[t+"Code"];if(o[0].status="0","1"==o[e].status){o[e].status="0";for(var f in l)l[f]==o[e].diccode&&l.splice(f,1)}else o[e].status="1",l.push(o[e].diccode);this.filterOptions[t+"Code"]=l}this[t]=o,d.fetchTransactions(i.searchUrl)},changeMeeting:function(e){var t=this.source,r=this.filterOptions.sourceCode;if("1"==t[0].status){t[0].status="0";var a=$.inArray(t[0].diccode,r);r.splice(a,1)}for(var s=1;s<t.length;s++)if("MEETING"==t[s].diccode&&"1"==t[s].status){t[s].status="0";var n=$.inArray(t[s].diccode,r);r.splice(n,1);break}var o=this.derivedMeeting[e],c=$.inArray(o.diccode,r);c>-1?(r.splice(c,1),o.status="0"):(o.status="1",r.push(o.diccode)),d.fetchTransactions(i.searchUrl)}},created:function(){var e=this,t={supAreaUrl:i.supAreaUrl,supSourceUrl:i.supSourceUrl};for(var r in t)$.ajax({type:"get",dataType:"json",url:(0,o.setSupervisionHeader)(t[r]),success:function(t,r,a){for(var s in t)t[s].status="0";var n=a.key,o=[{status:"1",dicname:"全部"}];if("supAreaUrl"==n)e.area=o.concat(t);else{for(var i=[],c=[],u=0;u<t.length;u++)"10019"==t[u].parentid?i.push(t[u]):c.push(t[u]);e.derivedMeeting=i,e.source=o.concat(c)}},error:function(e,t,r){console.log(r.key),console.log(e)}}).key=r},ready:function(){$("#startDate").daterangepicker({singleDatePicker:!0,showDropdowns:!0},function(e,t,r){}),$("#endDate").daterangepicker({singleDatePicker:!0,showDropdowns:!0})}}),u=new Array(8),l=0;8>l;l++)u[l]="sorting";var d=new Vue({el:"#result-section",data:{ths:[{key:"code",val:"督办编号"},{key:"name",val:"督办事项名称"},{key:"accountablename",val:"责任领导(A)"},{key:"responsiblename",val:"责任人(R)"},{key:"estimatedcompletetiontime",val:"计划完成时间"},{key:"urgency",val:"紧急程度"},{key:"importance",val:"重要程度"},{key:"rate",val:"最新进展"}],keyItems:{sorting:u,total:[],show:[],current:1},otherItems:{sorting:u,total:[],show:[],current:1},doneItems:{sorting:u,total:[],show:[],current:1},pageSize:3,levelBackground:["gray","#A1C636","#5CB85C","#F0AD4E","#D9534F"],sizeOptions:[{text:"3",value:"3"},{text:"10",value:"10"},{text:"20",value:"20"}]},created:function(){this.userLoginInfo={userid:"20120014",username:(0,o.getCookie)("username")},this.fetchTransactions(i.searchUrl)},methods:{changePage:function(e,t,r,a){var s=this[a+"Items"];s.current=e,this.changeHandler(e,a,s)},sortColumn:function(e,t){function r(e,t){return/^\d/.test(e)^/^\D/.test(t)?e>t?1:e==t?0:-1:e>t?-1:e==t?0:1}var a=this,s=this[t+"Items"],n=s.sorting[e];"sorting_asc"==n?!function(){var n=u.concat();n[e]="sorting_desc",s.sorting=n;var o=a.ths[e].key;s.total.sort(function(e,t){return r(t[o],e[o])}),a.changeHandler(s.current,t,s)}():!function(){var n=u.concat();n[e]="sorting_asc",s.sorting=n;var o=a.ths[e].key;s.total.sort(function(e,t){return r(e[o],t[o])}),a.changeHandler(s.current,t,s)}()},changeHandler:function(e,t,r){var a=this.pageSize;r.show=r.total.slice((e-1)*a,a*e)},fetchTransactions:function(e){e=(0,o.setSupervisionHeader)(e,{page:0,size:1e3});var t={};for(var r in c.filterOptions)t[r]=c.filterOptions[r];0==t.areaCode.length?delete t.areaCode:t.areaCode=t.areaCode.join(","),t.source=t.sourceCode,delete t.sourceCode,0==t.source.length?delete t.source:t.source=t.source.join(",");var a=this;t.accountableSN=this.userLoginInfo.userid,t.responsibleSN=this.userLoginInfo.userid,t=(0,n["default"])(t),$.ajax({type:"POST",dataType:"json",data:t,contentType:"application/json",url:e,success:function(e,t,r){for(var s=[],n=[],o=[],i=0,c=e.length;c>i;i++){var l=e[i];if(l.latestTrace?(l.rate=l.latestTrace.rate,l.latestDesc=l.latestTrace.description):(l.rate=0,l.latestDesc=""),l.rate<25?l.rateState="progress-bar-danger":l.rate<75?l.rateState="progress-bar-warning":l.rateState="progress-bar-success",1==l.status)s.push(l);else{var d=new moment,f=new moment(l.estimatedcompletetiontime),p=f.diff(d,"days");p>6&&l.urgency<4&&l.importance<4?o.push(l):n.push(l)}}var g={doneList:s,keyList:n,otherList:o},h=u.concat(),v=a.pageSize,m=["key","other","done"];for(var y in m){var k=m[y];a[k+"Items"]={total:g[k+"List"],show:g[k+"List"].slice(0,v),sorting:h,current:1};var b=Number(a.pageSize)||10,D=Number(a[k+"Items"].total.length);$("#"+k+"-pagination").extendPagination({totalCount:D,limit:b,name:k,callback:function(e,t,r,s){a.changePage(e,t,r,s)}})}},error:function(e,t,r){console.log(e)}})},newfunc:function(){}}})},function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function s(e,t,r,a,s,n){if(r){var o=new Date;o.setTime(o.getTime()+24*r*60*60*1e3);var i=o.toGMTString()}else var i="";var c=e+"="+escape(t);i&&(c+=";expires="+i),a&&(c+=";path="+escape(a)),s&&(c+=";domain="+escape(s)),n&&(c+=";secure="+n),document.cookie=c}function n(e){var t,r=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(r))?unescape(t[2]):null}function o(e){var t=new Date;t.setTime(t.getTime()-864e5),s(e,"",t)}function i(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),r=window.location.search.substr(1).match(t);return null!=r?unescape(r[2]):null}function c(){$.blockUI({message:"数据获取中，请稍候... ...",css:{border:"none",padding:"15px",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px",opacity:.5,color:"#fff"}})}function u(e,t){var r=function(e,r,a){t.list=e,t.successNext&&t.successNext()},a=function(e,t,r){console.log("error",e)},s={type:"get",url:e.URL+e.QueryString,success:r,error:a};"post"==e.METHOD&&(s={type:"post",url:e.URL+e.QueryString,data:e.PLAYLOAD,contentType:e.CONTENT_TYPE,success:r,error:a}),$.ajax(s)}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchAjaxService=t.loadingCover=t.getQueryString=t.deleteCookie=t.getCookie=t.setCookie=t.add_supervision=t.fetch_sourceFromServer=t.fetch_areaFromServer=t.fetch_deptsFromServer=t.fetch_serviceByHttpProtocol=t.setSupervisionHeader=void 0;var l=r(3),d=a(l),f=window.interfaceSettings.supervisionRequest,p=function(e,t,r){return(r?e.replace("%id%",r):e)+"?"+(t?$.param($.extend({},f.header,t)):$.param(f.header))},g=function(e,t,r,a,s){"post"==t&&(r=(0,d["default"])(r)),$.ajax({url:e,type:t,data:r,contentType:"application/json",success:function(e,t,r){console.log("success"),a(e,t,r)},error:function(e,t,r){console.log("error"),s(e,t,r)}})},h=function(e,t){var r=p(f.api.deptUrl,null,e);g(r,"get",{},t,function(e,t,r){console.log(e)})},v=function(e){var t=p(f.api.supSourceUrl);g(t,"get",{},e,function(e,t,r){console.log(e)})},m=function(e){var t=p(f.api.supAreaUrl);g(t,"get",{},e,function(e,t,r){console.log(e)})},y=function(e,t){var r=p(f.api.supAddUrl);g(r,"post",e,t,function(e,t,r){console.log(e)})};t.setSupervisionHeader=p,t.fetch_serviceByHttpProtocol=g,t.fetch_deptsFromServer=h,t.fetch_areaFromServer=m,t.fetch_sourceFromServer=v,t.add_supervision=y,t.setCookie=s,t.getCookie=n,t.deleteCookie=o,t.getQueryString=i,t.loadingCover=c,t.fetchAjaxService=u},,function(e,t,r){e.exports={"default":r(6),__esModule:!0}},function(e,t){var r=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=r)},,function(e,t,r){var a=r(4),s=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return s.stringify.apply(s,arguments)}}]);