$.ajax({
	url:'./dist/webconfig.json',
	type:"get",
	dataType:"json",
	success:function(result){
		window.interfaceSettings={};
		let supervision=result.supervision;
		let api=supervision.api;
		for(let prop in api)api[prop]=supervision.server+api[prop];
		window.interfaceSettings.supervisionRequest=supervision;
		let portal=result.portal;
		api=portal.api;
		for(let prop in api)api[prop]=portal.server+api[prop];
		window.interfaceSettings.portalRequest=portal;
		let personalpage=result.personalpage;
		api=personalpage.api;
		for(let prop in api)api[prop]=personalpage.server+api[prop];
		window.interfaceSettings.personalpageRequest=personalpage;
	//****************************************
		for(let i=0;i<scriptList.length;i++){
		let scriptObj = document.createElement("script");
		 scriptObj.src =scriptList[i];
		 document.getElementsByTagName("body")[0].appendChild(scriptObj);
		}
	},
	error:function(result){
		console.log("error",result);
	}
});
!function(e){function r(n){if(t[n])return t[n].exports;var i=t[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r){"use strict";$.ajax({url:"./dist/webconfig.json",type:"get",dataType:"json",success:function(e){window.interfaceSettings={};var r=e.supervision,t=r.api;for(var n in t)t[n]=r.server+t[n];window.interfaceSettings.supervisionRequest=r;var i=e.portal;t=i.api;for(var o in t)t[o]=i.server+t[o];window.interfaceSettings.portalRequest=i;var s=e.personalpage;t=s.api;for(var a in t)t[a]=s.server+t[a];window.interfaceSettings.personalpageRequest=s;for(var p=0;p<scriptList.length;p++){var c=document.createElement("script");c.src=scriptList[p],document.getElementsByTagName("body")[0].appendChild(c)}},error:function(e){console.log("error",e)}})}]);
!function(e){function r(n){if(t[n])return t[n].exports;var i=t[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r){"use strict";$.ajax({url:"./dist/webconfig.json",type:"get",dataType:"json",success:function(e){window.interfaceSettings={};var r=e.supervision,t=r.api;for(var n in t)t[n]=r.server+t[n];window.interfaceSettings.supervisionRequest=r;var i=e.portal;t=i.api;for(var o in t)t[o]=i.server+t[o];window.interfaceSettings.portalRequest=i;var s=e.personalpage;t=s.api;for(var a in t)t[a]=s.server+t[a];window.interfaceSettings.personalpageRequest=s;for(var p=0;p<scriptList.length;p++){var c=document.createElement("script");c.src=scriptList[p],document.getElementsByTagName("body")[0].appendChild(c)}},error:function(e){console.log("error",e)}})}]);