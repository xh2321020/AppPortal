// alert(123);
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
var currentUserName=getCookie("username");
// alert();
$("#createdBy").html("创建人：" + currentUserName);

$(".make-switch").on('switchChange.bootstrapSwitch', function (e) {
	$('.make-switch').bootstrapSwitch('state');
});
