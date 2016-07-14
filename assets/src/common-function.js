
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
//*cookies*/


function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  var c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
   var c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
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


export {
	fetch_serviceByHttpProtocol,fetch_deptsFromServer,fetch_areaFromServer,fetch_sourceFromServer,add_supervision,
	getCookie,
	getQueryString,
	loadingCover
};