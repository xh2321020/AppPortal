var currentSel = null;
var usersid = getCookie("userid")
var personalpageRequest = window.interfaceSettings.personalpageRequest.api;
var personalpageRequestKey = "?apikey=" + window.interfaceSettings.personalpageRequest.header.apikey;
var setPersonalpageHeader=function(url,paramObj,iid){
    return (iid?url.replace("%id%",iid):url)+"?"+(paramObj?$.param($.extend({},window.interfaceSettings.personalpageRequest.header,paramObj)):$.param(window.interfaceSettings.personalpageRequest.header));
};
function setPersonal_isolate(name,paramObj,iid){
    var requestBody=window.interfaceSettings.personalpage_isolateRequest;
    var url=requestBody.api[name];
    return (iid?url.replace("%id%",iid):url)+"?"+(paramObj?$.param($.extend({},requestBody.header,paramObj)):$.param(requestBody.header));
}
function opentask(parmar){
      var url = "/pages/schedule/personal.html";
    window.open(url,"_blank");
}
    function setButton(obj){  
        if(obj.length==0) return;
        currentSel = obj;
        if(obj.id=="leftSel"){
            $("#btnLeft").disabled = true;
            $("#btnRight").disabled = false;                
            reSelect($("#rightSel"));
        }else{
            $("#btnLeft").disabled = false;
            $("#btnRight").disabled = true;               
            reSelect($("#leftSel"));                
        }       
    }

      function move(){
          if(arguments.length==1){
              moveUp(arguments[0]);
          }else if(arguments.length==2){
              moveRight(arguments[0],arguments[1]);
          }
      }

      function moveUp(direction){
          if(currentSel == null) return;
          if(direction){//up
            if (currentSel.selectedIndex > 0) {  
                for(var i=0;i<currentSel.length;i++){
                    if(currentSel[i].selected){
                        var oOption = currentSel.options[i];
                        var oPrevOption = currentSel.options[i---1];
                        currentSel.insertBefore(oOption, oPrevOption);
                    }
                }
                
            } 
          }else{//down
            for(var i=currentSel.length-1;i>=0;i--){
                if(currentSel[i].selected){
                    if(i==currentSel.length-1) return;
                    var oOption = currentSel.options[i];
                    var oNextOption = currentSel.options[i+1];
                    currentSel.insertBefore(oNextOption, oOption);                        
                }
            }
          }
      }

    function moveRight(src,des){
        if(src.selectedIndex==-1){
            alert("请先选择相关工作入口！");
            return;
        }
        for(var i=0;i<src.length;i++){
            if(src[i].selected){
                des.appendChild(src.options[i--]);
            }
        }
        setButton(des);
    }
    
    function reSelect(obj){
        for(var i=0; i<obj.length; i++){
            if(obj[i].selected) obj[i].selected = false;
        }
    }
    function moveAllLtoR(){
      $("#rightSel").append($("#leftSel").html());
      $("#leftSel").html("");
    }
    function moveAllRtoL(){
      $("#leftSel").append($("#rightSel").html());
      $("#rightSel").html("");
    }

    function submitResultStatus(obj){
        if(obj.length==0) return;
        currentSelSubmit = obj;
        var test="";
        var objJson = []; 
        for(var i=0;i<currentSelSubmit.length;i++){
            var json =  {"linkid": currentSelSubmit.options[i].value, "orderid":currentSelSubmit.options[i].index};
            objJson.push(json);
        }
        $.ajax({
            type: "post",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            url:setPersonal_isolate("popViewEdit",{type:"edit", userid:usersid}),
            data: JSON.stringify(objJson),
            success: function success(data, state, jqxhr) {
                alert("数据更新成功");
                setTimeout("updatePopView('refresh');",500);
            },
            error: function error(err) {
                alert("提交失败，请刷新后重试");
            }
        });
    }
    updatePopView("init");
    function updatePopView(parmar){
        $.ajax({
            type: "get",
            dataType: "json",
            url:setPersonal_isolate("getYonghuKuaiJieRuKou",null,usersid),
            success: function success(data, state, jqxhr) {
                if(data.length == 0){
                    specialInit();
                }else{
                    var kuaijierukouLeft="";
                    var kuaijierukouselector="";   
                    var max=8;
                    if(window.plantName=="FQ-plant")max=10;                    
                    for(var j=0; j<data.length;j++){
                        if(j<max){
                            kuaijierukouLeft = kuaijierukouLeft + '<li class="article-list-item"><a href="'+data[j].link+'" target="_blank">'+                            '<img src="'+data[j].icoa+'" class="article-list-item-icon">'+
                            '<span class="article-list-item-span">'+data[j].description+'</span></a></li>';
                        }                        
                        kuaijierukouselector = kuaijierukouselector + '<option value="'+data[j].linkid+'">'+data[j].description+'</option>';
                    }
                    //主页面工作快捷入口
                    $("#gongzuokuaijierukouUl").html(kuaijierukouLeft);
                    //编辑选择框已添加的工作快捷入口
                    if(parmar=="init"){
                        $("#leftSel").html(kuaijierukouselector);
                    }
                    updateEdidPopView();
                }
                
            },
            error: function error(err) {
                console.log(err);
            }
        });
    }
    function updateEdidPopView(){
        $.ajax({
            type: "get",
            dataType: "json",
            contentType: "application/json",
            url:setPersonal_isolate("initUserKuaiJieRuKou"),
            data: "",
            success: function success(data, state, jqxhr) {
                var n=0;
                var arr = new Array();
                var restPort = "";
                $("#leftSel option").each(function (){  
                    if($(this).text()!="0"){   
                    arr[n]=$(this).text();
                    n++;
                }}); 
                var tt="";
                for(var m=0; m<arr.length;m++){
                    tt = tt + arr[m];
                }
                for(var j=0; j<data.length;j++){
                    restPort = restPort + '<option value="'+data[j].id+'">'+data[j].description+'</option>';
                }
                $("#rightSel").html(restPort);
                var currentSelLU = null;
                var currentSelRU = null;
                currentSelLU = document.getElementById('leftSel');
                currentSelRU = document.getElementById('rightSel');
                for(var k=0;k<currentSelLU.length;k++){
                    for(var j=0; j<currentSelRU.length; j++){
                        // alert(currentSelL.options[k].value + "   " + currentSelR.options[j].value)
                        if (currentSelLU.options[k].value == currentSelRU.options[j].value){
                            var removeIndex = currentSelRU.options[j].index;
                            currentSelRU.options.remove(removeIndex);
                        }
                    }
                }
            },
            error: function error(err) {
                console.log(err);
            }
        });
    }

    function specialInit(){
        $.ajax({
            type: "get",
            dataType: "json",
            contentType: "application/json",
            url:setPersonal_isolate("initUserKuaiJieRuKou"),
            success: function success(data, state, jqxhr) {
                var kuaijierukouLeft="";
                    var kuaijierukoupop="";
                    var kuaijierukouselector="";  
                    var max=8;
                    if(window.plantName=="FQ-plant")max=10;                     
                    for(var j=0; j<data.length;j++){
                        if(j<max){
                            kuaijierukouLeft = kuaijierukouLeft + '<li class="article-list-item"><a href="'+data[j].link+'" target="_blank">'+                            '<img src="'+data[j].icoa+'" class="article-list-item-icon">'+
                            '<span class="article-list-item-span">'+data[j].description+'</span></a></li>';
                        }
                        kuaijierukoupop = kuaijierukoupop + '<li class="ul-wedigt-item">'+
                        '<a href="'+data[j].link+'" target="_blank">'+
                        '<img src="'+data[j].icoa+'"><span style="margin-left: 1rem;">'+data[j].description+'</span></a></li>';
                        kuaijierukouselector = kuaijierukouselector + '<option value="'+data[j].id+'">'+data[j].description+'</option>';
                    }
                    //主页面工作快捷入口
                    $("#gongzuokuaijierukouUl").html(kuaijierukouLeft);
                    //弹框页面工作快捷入口（编辑页面）
                    $("#gongzuokuaijirukouhidePopUl").html(kuaijierukoupop);
                    //编辑选择框已添加的工作快捷入口
                    $("#leftSel").html(kuaijierukouselector);
            },
            error: function error(err) {
                console.log(err);
            }
        });
    }

    function getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    };