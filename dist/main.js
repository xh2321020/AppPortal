!function(r){function t(n){if(e[n])return e[n].exports;var a=e[n]={exports:{},id:n,loaded:!1};return r[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var e={};return t.m=r,t.c=e,t.p="",t(0)}([function(r,exports){"use strict";$.ajax({url:"./dist/webconfig.json",type:"get",dataType:"json",success:function(r){window.interfaceSettings={};var t=["api_mattia","api_sking"];$.each(t,function(t,e){var n=r[e],a=n.ulrs;for(var i in a){var o=a[i];for(var s in o)o[s]=n.server+o[s]+"?"+$.param(n.additionalParams);window.interfaceSettings[i]=o}});for(var e=0;e<scriptList.length;e++){var n=document.createElement("script");n.src=scriptList[e],document.getElementsByTagName("body")[0].appendChild(n)}},error:function(r){console.log("error",r)}})}]);