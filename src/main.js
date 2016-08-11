$.ajax({
	url:'./dist/webconfig.json',
	type:"get",
	dataType:"json",
	success:function(interfaceSettings){
	let supervisionRequest=interfaceSettings.supervisionRequest,
	portalRequest=interfaceSettings.portalRequest,
	queryString=$.param(interfaceSettings.additionalParams);
	for(let prop in supervisionRequest)supervisionRequest[prop]=interfaceSettings.serverAddress+supervisionRequest[prop]+"?"+queryString;
	for(let prop in portalRequest)portalRequest[prop]=interfaceSettings.serverAddress+portalRequest[prop]+"?"+queryString;
		
	window.interfaceSettings=interfaceSettings;
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