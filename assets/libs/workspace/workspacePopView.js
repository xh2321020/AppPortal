var currentSel = null;
var usersid = getCookie("username")
function opentask(parmar){
    var url = "pages/supervision/supervision-detail.html?id="+parmar;
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
            alert("Please select first!");
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
            contentType: "application/json",
            url: "http://172.16.51.137:8000/api/V1.0/work/work/add?type=edit&userid=" + usersid,
            data: JSON.stringify(objJson),
            success: function success(data, state, jqxhr) {
                alert("数据更新成功");
                updatePopView();
            },
            error: function error(err) {
                console.log(err);
            }
        });
    }
    function updatePopView(){
        $.ajax({
            type: "get",
            dataType: "json",
            contentType: "application/json",
            url: "http://172.16.51.137:8000/api/V1.0/work/work/"+usersid,
            data:"",
            success: function success(data, state, jqxhr) {
                var kuaijierukouLeft="";
                var kuaijierukoupop="";
                var kuaijierukouselector="";                       
                for(var j=0; j<data.length;j++){
                    if(j<8){
                        kuaijierukouLeft = kuaijierukouLeft + '<li class="article-list-item"><a href="'+data[j].link+'" target="_blank">'+                            '<img src="'+data[j].icoa+'" class="article-list-item-icon">'+
                        '<span class="article-list-item-span">'+data[j].description+'</span></a></li>';
                    }
                    kuaijierukoupop = kuaijierukoupop + '<li class="ul-wedigt-item">'+
                    '<a href="'+data[j].link+'" target="_blank">'+
                    '<img src="'+data[j].icoa+'"><span>'+data[j].description+'</span></a></li>';
                    kuaijierukouselector = kuaijierukouselector + '<option value="'+data[j].linkid+'">'+data[j].description+'</option>';
                }
                //主页面工作快捷入口
                $("#gongzuokuaijierukouUl").html(kuaijierukouLeft);
                //弹框页面工作快捷入口（编辑页面）
                $("#gongzuokuaijirukouhidePopUl").html(kuaijierukoupop);
                //编辑选择框已添加的工作快捷入口
                // alert(kuaijierukouselector);
                $("#leftSel").html(kuaijierukouselector);
                updateEdidPopView();
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
            url: "http://172.16.51.137:8000/api/V1.0/work/work/link",
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
                alert(tt);
                for(var j=0; j<data.length;j++){
                    restPort = restPort + '<option value="'+data[j].id+'">'+data[j].description+'</option>';
                }
                $("#rightSel").html(restPort);
                $("#hideEditPopView").css("display","none");
                $("#hidePopView").css("display","block");
                var currentSelL = null;
                var currentSelR = null;
                currentSelL = document.getElementById('leftSel');
                currentSelR = document.getElementById('rightSel');
                for(var k=0;k<currentSelL.length;k++){
                    for(var j=0; j<currentSelR.length; j++){
                        if (currentSelL.options[k].value == currentSelR.options[j].value){
                            var removeIndex = currentSelR.options[j].index;
                            currentSelR.options.remove(removeIndex);
                        }
                    }
                }
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
    }