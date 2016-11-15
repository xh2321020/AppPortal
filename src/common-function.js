
let supervisionRequest=window.interfaceSettings.supervisionRequest;

let setSupervisionHeader=function(url,paramObj,iid){
	if(paramObj);else paramObj={stamp:(new Date().getTime())};
	return (iid?url.replace("%id%",iid):url)+"?"+(paramObj?$.param($.extend({},supervisionRequest.header,paramObj)):$.param(supervisionRequest.header));
}

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
			// console.log("success");
			successHandler(result,state,jqxhr);
		},
		error:function(result,state,jqxhr){
			// console.log("error");
			errorHandler(result,state,jqxhr);
		}
	});
};
//fetch organization

//fetch depts   部门
let fetch_deptsFromServer=(pid,success)=>{
	let url=setSupervisionHeader(supervisionRequest.api["deptUrl"],null,pid);
	fetch_serviceByHttpProtocol(url,"get",{},success,(result,state,jqxhr)=>{})
};
//supervision source
let fetch_sourceFromServer=(success)=>{
	let url=setSupervisionHeader(supervisionRequest.api["supSourceUrl"]);
	fetch_serviceByHttpProtocol(url,"get",{},success,(result,state,jqxhr)=>{})
};
//supervision area
let fetch_areaFromServer=(success)=>{
	let url=setSupervisionHeader(supervisionRequest.api["supAreaUrl"]);
	fetch_serviceByHttpProtocol(url,"get",{},success,(result,state,jqxhr)=>{})
};

//accountable sn

//add new supervision
let add_supervision=(options,success)=>{
	let url=setSupervisionHeader(supervisionRequest.api["supAddUrl"]);
	fetch_serviceByHttpProtocol(url,"post",options,success,(result,state,jqxhr)=>{})
}
//*cookies*/


function  setCookie(name,value,days,path,domain,secure){
    if(days){
        var date=new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires=date.toGMTString();
    }
    else var expires="";
    let cookieString=name+"="+escape(value);
    if(expires) cookieString+=";expires="+expires;
    if(path) cookieString+=";path="+escape(path);
    if(domain) cookieString+=";domain="+escape(domain);
    if(secure) cookieString+=";secure="+secure;
    document.cookie=cookieString;

}
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}//读取cookie

function deleteCookie(name)  
{  
                    var expdate = new Date();  
                    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));  
   setCookie(name, "", expdate,"/");  
}   
//*cookies*/
function getQueryString(name){
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null){
           return unescape(r[2]);
        } 
        else {
           return null;
        }
}

/*covering loading function*/
function loadingCover(){
	$.blockUI({ message: '数据获取中，请稍候... ...',
                  css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                  }
            });
}

function fetchAjaxService(dataSource,_this){
			let successHandler=(result,status,xhr)=>{
				for(let i=0,len=result.length;i<len;i++){
					if(result[i].publishDate)
					result[i].publishDate=result[i].publishDate.substring(5);
				}
				_this.list=result;
				if(_this.successNext)_this.successNext();
			};
			let error=(result,status,xhr)=>{
				// console.log("error",result);
			};
			let ajaxOptions={
				type:'get',
				url:dataSource.URL+dataSource.QueryString,
				success:successHandler,
				error:error
			};
			if(dataSource.METHOD=="post"){
				ajaxOptions={
					type:'post',
					url:dataSource.URL+dataSource.QueryString,
					data:dataSource.PLAYLOAD,
					contentType:dataSource.CONTENT_TYPE,
					success:successHandler,
					error:error
				};
			}
			$.ajax(ajaxOptions);
}



export {
	setSupervisionHeader,
	fetch_serviceByHttpProtocol,fetch_deptsFromServer,fetch_areaFromServer,fetch_sourceFromServer,add_supervision,
	setCookie,
	getCookie,
	deleteCookie,
	getQueryString,
	loadingCover,
	fetchAjaxService
};