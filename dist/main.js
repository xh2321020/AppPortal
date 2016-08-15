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