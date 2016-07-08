
import { supervisionRequest } from './webconfig';


//ajax
let  fetch_serviceByHttpProtocol =(url,type,requestData,successHandler,errorHandler)=>{
	if(type=="post")
	    requestData = JSON.stringify(requestData);
	$.ajax({
		url:url,
		type:type,
		data:requestData,
		// dataType:"json",
		contentType:"application/json",
		success:function(result,state,jqxhr){
			console.log("success");
			successHandler(result,state,jqxhr);
		},
		error:function(result,state,jqxhr){
			console.log("error");
			errorHandler(result,state,jqxhr);
		}
	});
};
//fetch organization

//fetch depts   部门
let fetch_deptsFromServer=(pid,success)=>{
	let url=supervisionRequest["deptUrl"]+pid;
	fetch_serviceByHttpProtocol(url,"get",{},success,(result,state,jqxhr)=>{console.log(result);})
};
//supervision source
let fetch_sourceFromServer=(success)=>{
	let url=supervisionRequest["supSourceUrl"];
	fetch_serviceByHttpProtocol(url,"get",{},success,(result,state,jqxhr)=>{console.log(result);})
};
//supervision area
let fetch_areaFromServer=(success)=>{
	let url=supervisionRequest["supAreaUrl"];
	fetch_serviceByHttpProtocol(url,"get",{},success,(result,state,jqxhr)=>{console.log(result);})
};

//accountable sn

//add new supervision
let add_supervision=(options,success)=>{
	let url=supervisionRequest["supAddUrl"];
	fetch_serviceByHttpProtocol(url,"post",options,success,(result,state,jqxhr)=>{console.log(result);})
}

export {fetch_serviceByHttpProtocol,fetch_deptsFromServer,fetch_areaFromServer,fetch_sourceFromServer,add_supervision};