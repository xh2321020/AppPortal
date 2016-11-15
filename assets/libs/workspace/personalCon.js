$(document).ready(function () {
        //1.领导批示
        //2.办公待阅
        //3.个人待办
        //4.公办待办
        //5.受托待办
        //6.个人待阅
        //7.委托待办
        //8.消息提醒
    var url = window.location.href;
     //url = "http://tst-ecm-app.cnnp.com.cn/pages/portal/workspace.html?dWlkPTIwMTIwMDE0MTQ3MTUxNDYyNTE2OQ==";
    var mm = url.substring(url.indexOf('?')+1, url.length);
    var currentHost = url.substring(0,url.indexOf('/pages'));
    var Base64 = {  
    // 转码表  
    table : [  
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',  
            'I', 'J', 'K', 'L', 'M', 'N', 'O' ,'P',  
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',  
            'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',  
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',  
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',  
            'w', 'x', 'y', 'z', '0', '1', '2', '3',  
            '4', '5', '6', '7', '8', '9', '+', '/' 
    ],  
    UTF16ToUTF8 : function(str) {  
        var res = [], len = str.length;  
        for (var i = 0; i < len; i++) {  
            var code = str.charCodeAt(i);  
            if (code > 0x0000 && code <= 0x007F) {  
                // 单字节，这里并不考虑0x0000，因为它是空字节  
                // U+00000000 – U+0000007F  0xxxxxxx  
                res.push(str.charAt(i));  
            } else if (code >= 0x0080 && code <= 0x07FF) {  
                // 双字节  
                // U+00000080 – U+000007FF  110xxxxx 10xxxxxx  
                // 110xxxxx  
                var byte1 = 0xC0 | ((code >> 6) & 0x1F);  
                // 10xxxxxx  
                var byte2 = 0x80 | (code & 0x3F);  
                res.push(  
                    String.fromCharCode(byte1),   
                    String.fromCharCode(byte2)  
                );  
            } else if (code >= 0x0800 && code <= 0xFFFF) {  
                // 三字节  
                // U+00000800 – U+0000FFFF  1110xxxx 10xxxxxx 10xxxxxx  
                // 1110xxxx  
                var byte1 = 0xE0 | ((code >> 12) & 0x0F);  
                // 10xxxxxx  
                var byte2 = 0x80 | ((code >> 6) & 0x3F);  
                // 10xxxxxx  
                var byte3 = 0x80 | (code & 0x3F);  
                res.push(  
                    String.fromCharCode(byte1),   
                    String.fromCharCode(byte2),   
                    String.fromCharCode(byte3)  
                );  
            } else if (code >= 0x00010000 && code <= 0x001FFFFF) {  
                // 四字节  
                // U+00010000 – U+001FFFFF  11110xxx 10xxxxxx 10xxxxxx 10xxxxxx  
            } else if (code >= 0x00200000 && code <= 0x03FFFFFF) {  
                // 五字节  
                // U+00200000 – U+03FFFFFF  111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx  
            } else /** if (code >= 0x04000000 && code <= 0x7FFFFFFF)*/ {  
                // 六字节  
                // U+04000000 – U+7FFFFFFF  1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx  
            }  
        }  
 
        return res.join('');  
    },  
    UTF8ToUTF16 : function(str) {  
        var res = [], len = str.length;  
        var i = 0;  
        for (var i = 0; i < len; i++) {  
            var code = str.charCodeAt(i);  
            // 对第一个字节进行判断  
            if (((code >> 7) & 0xFF) == 0x0) {  
                // 单字节  
                // 0xxxxxxx  
                res.push(str.charAt(i));  
            } else if (((code >> 5) & 0xFF) == 0x6) {  
                // 双字节  
                // 110xxxxx 10xxxxxx  
                var code2 = str.charCodeAt(++i);  
                var byte1 = (code & 0x1F) << 6;  
                var byte2 = code2 & 0x3F;  
                var utf16 = byte1 | byte2;  
                res.push(String.fromCharCode(utf16));
            } else if (((code >> 4) & 0xFF) == 0xE) {  
                // 三字节  
                // 1110xxxx 10xxxxxx 10xxxxxx  
                var code2 = str.charCodeAt(++i);  
                var code3 = str.charCodeAt(++i);  
                var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);  
                var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);  
                utf16 = ((byte1 & 0x00FF) << 8) | byte2  
                res.push(String.fromCharCode(utf16));  
            } else if (((code >> 3) & 0xFF) == 0x1E) {  
                // 四字节  
                // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx  
            } else if (((code >> 2) & 0xFF) == 0x3E) {  
                // 五字节  
                // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx  
            } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {  
                // 六字节  
                // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx  
            }  
        }  
 
        return res.join('');  
    },  
    encode : function(str) {  
        if (!str) {  
            return '';  
        }  
        var utf8    = this.UTF16ToUTF8(str); // 转成UTF8  
        var i = 0; // 遍历索引  
        var len = utf8.length;  
        var res = [];  
        while (i < len) {  
            var c1 = utf8.charCodeAt(i++) & 0xFF;  
            res.push(this.table[c1 >> 2]);  
            // 需要补2个=  
            if (i == len) {  
                res.push(this.table[(c1 & 0x3) << 4]);  
                res.push('==');  
                break;  
            }  
            var c2 = utf8.charCodeAt(i++);  
            // 需要补1个=  
            if (i == len) {  
                res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);  
                res.push(this.table[(c2 & 0x0F) << 2]);  
                res.push('=');  
                break;  
            }  
            var c3 = utf8.charCodeAt(i++);  
            res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);  
            res.push(this.table[((c2 & 0x0F) << 2) | ((c3 & 0xC0) >> 6)]);  
            res.push(this.table[c3 & 0x3F]);  
        }  
 
        return res.join('');  
    },  
    decode : function(str) {  
        if (!str) {  
            return '';  
        }  
 
        var len = str.length;  
        var i   = 0;  
        var res = [];  
 
        while (i < len) {  
            code1 = this.table.indexOf(str.charAt(i++));  
            code2 = this.table.indexOf(str.charAt(i++));  
            code3 = this.table.indexOf(str.charAt(i++));  
            code4 = this.table.indexOf(str.charAt(i++));  
 
            c1 = (code1 << 2) | (code2 >> 4);  
            c2 = ((code2 & 0xF) << 4) | (code3 >> 2);  
            c3 = ((code3 & 0x3) << 6) | code4;  
 
            res.push(String.fromCharCode(c1));  
 
            if (code3 != 64) {  
                res.push(String.fromCharCode(c2));  
            }  
            if (code4 != 64) {  
                res.push(String.fromCharCode(c3));  
            }  
        }
        return this.UTF8ToUTF16(res.join(''));  
    }  
};
    var cookiesId =  Base64.decode(mm).substring(4,12);
    if(document.cookie && document.cookie != ''){
        updateCookie("userid",cookiesId,30);
        //updateCookie(username,cookiesId,30);
    }else{
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = "userid=" + cookiesId + ";expires=" + exp.toGMTString()+";path=/";
    }
//     <a href="http://172.16.51.131/portal/LoginServlet?url='
// +Base64.encode(currentHost + '/pages/teamworkspace/team-workspace.html') + '" target="_blank">
//                                 <img src="assets/images/portal/workspace/work_bg09.png" class="article-list-item-icon">
//                                 <span class="article-list-item-span" style="color:lightgray">协作空间</span>
//                             </a>
// <!-- <a href="http://172.16.51.131/portal/LoginServlet?url='
// +Base64.encode('/http://erp.cnnp.com.cn/irj') + '" target="_blank"> -->
//                             <img src="assets/images/portal/workspace/work_bg06.png" class="article-list-item-icon">
//                             <span class="article-list-item-span" style="color:lightgray">计划管理</span>
//                             <!-- </a> -->
var duBanGuanLiURL = '<li class="article-list-item"><a href="http://bjecm.cnnp.com.cn/pt/LoginServlet?url='
    +Base64.encode(currentHost + '/pages/supervision/supervision-mine.html') + '"  target="_blank">'
    +'<img src="assets/images/portal/workspace/work_bg01.png" class="article-list-item-icon">'
    +'<span class="article-list-item-span">督办管理</span></a></li>'
    +'<li class="article-list-item"><a href="http://bjecm.cnnp.com.cn/pt/LoginServlet?url='
    +Base64.encode(currentHost + '/pages/schedule/personal.html') + '" target="_blank">'
    +'<img src="assets/images/portal/workspace/work_bg01.png" class="article-list-item-icon">'
    +'<span class="article-list-item-span">日程管理</span></a></li>'
    +'<li class="article-list-item"><a href="http://bjecm.cnnp.com.cn/pt/LoginServlet?url='
    +Base64.encode(currentHost + '/pages/personalpage/personalpage-detail.html') + '" target="_blank">'
    +'<img src="assets/images/portal/workspace/work_bg011.png" class="article-list-item-icon">'
    +'<span class="article-list-item-span">个人页面</span></a></li>'
    +'<li class="article-list-item"><img src="assets/images/portal/workspace/work_bg09.png" class="article-list-item-icon">'
    +'<span class="article-list-item-span" style="color:lightgray">协作空间</span></li>'
    +'<li class="article-list-item"><img src="assets/images/portal/workspace/work_bg06.png" class="article-list-item-icon">'
    +'<span class="article-list-item-span" style="color:lightgray">计划管理</span></li>';
    $("#secondLogin").html(duBanGuanLiURL);
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
    var _this=this;
    var currentPort = new Array();
    var fetchArray = ["GETUSERNAME","USERKUAIJIERUKOU","DUBANSHIXIANG","XINGCHENG", "QIRINEIRICHENG","1", "2", "3", "4", "5", "6", "7", "8","USERKUAIJIERUKOUAll"];
    var nameArray = ["findcount","dubanshixiang", "find1","find2", "find3", "find4", "find5","find6","find7","find8"];
    var usersid =etCookie("userid");
    for (var i = 0, len = fetchArray.length + 1; i < len-1; i++) {
        var ajaxURL = "";
        var datas = "";
        var contentTypes = "application/json";
        var datatypes = "json";
        var types = "POST";
        var arrayId=fetchArray[i];
        if(fetchArray[i] == "GETUSERNAME"){
            ajaxURL = setPersonalpageHeader(personalpageRequest.getMemberDetails, {uid:usersid},null);
        }else if (fetchArray[i] == "XINGCHENG") {
            types="get";
            datatypes="json";
            ajaxURL = personalpageRequest.getXingChengDetails + usersid + personalpageRequestKey;
            // ajaxURL = personalpageRequest.getDuBanShiXiang+"&page=0&size=50";
        }else if (fetchArray[i] == "DUBANSHIXIANG") {
            ajaxURL = setPersonalpageHeader(personalpageRequest.getDuBanShiXiang,{page:0, size:50},null);
            // ajaxURL = personalpageRequest.getDuBanShiXiang+"&page=0&size=50";
            datas = JSON.stringify({ "accountableSN": usersid });
        } else if(fetchArray[i] == "USERKUAIJIERUKOU"){
            types = "get";
            datatypes = "json";
            ajaxURL = setPersonal_isolate("getYonghuKuaiJieRuKou",null,usersid);
        } else if(fetchArray[i] == "QIRINEIRICHENG"){
            var startDate = dateFormatFun(new Date());
            var stDate = new Date(); 
            stDate.setDate(stDate.getDate()+7);
            var y = stDate.getFullYear(); 
            var m = (stDate.getMonth()+1)<10?"0"+(stDate.getMonth()+1):(stDate.getMonth()+1);
            var d = stDate.getDate()<10?"0"+stDate.getDate():stDate.getDate();
            var endDate = y+"-"+m+"-"+d;
            types = "get";
            datatypes = "json";
            ajaxURL = setPersonalpageHeader(personalpageRequest.getRiChengTiXing,{userid:usersid, startdate:startDate, enddate:endDate},null);
        } else if(fetchArray[i] == "USERKUAIJIERUKOUAll"){
            types = "get";
            datatypes = "json";
            ajaxURL =setPersonal_isolate("initUserKuaiJieRuKou");
        } else {
            ajaxURL =setPersonal_isolate("getJinQiGongZuo");
            datas = JSON.stringify({F_BOUNDUSER: usersid, Type:fetchArray[i]});
        }
     
        $.ajax({
            type: types,
            dataType: datatypes,
            contentType:contentTypes,
            url: ajaxURL,
            data: datas,
            success: function success(data, state, jqxhr) {
                var tableHeader = "<section class='grid-table'><table class='table table-condensed head-title'><thead>"+
                "<tr><th style='text-align: center; color:black;background-color: white; '> 事项名称 </th>"+
                "<th style='text-align: center;color:black;background-color: white; '> 创建人员 </th><th style='text-align: center;color:black;background-color: white; '> 创建时间 </th></tr></thead><tbody>";
                var tableFooter = "</tbody></table>";
                if(fetchArray[jqxhr.index] == "GETUSERNAME"){
                    var chinesename="";
                    var orgTree = "";
                    chinesename = data[0].displayName;
                    orgTree = JSON.stringify(data[0].orgtree);
                    if(document.cookie && document.cookie != ''){
                        updateCookie("username",chinesename,30,"/");
                        updateCookie("userorg",orgTree,30,"/");
                    }
                }else if(fetchArray[jqxhr.index] == "DUBANSHIXIANG"){
                    var dubanshixiang="";
                    var qiridubantixing="";
                    var qiridubantixingMore='<div style="width:100%;margin-top:0.5rem;">'+
                    '<a class="default-font" href="pages/supervision/supervision-mine.html" style="float:right;"  target="_blank">更多 ></a></div>';
                        for(var j=0; j<data.length; j++){
                            var description = "";
                            if ((typeof(data[j].estimatedcompletetiontime) == "undefined") || (typeof(data[j].estimatedcompletetiontime) == "")) {
                                description = "";
                            } else {
                                description = data[j].estimatedcompletetiontime;
                            }
                            var url = "/pages/supervision/supervision-detail.html?id="+ data[j].id;
                            var divLable =  '<div class="task-list-detail" style="border: 1px dashed #a6cc38;cursor:pointer;" onClick="window.open(\'' + url + '\')"><div style="overflow: hidden; position: relative;">';
                            dubanshixiang=dubanshixiang+'<li class="li-task-list"><div class="task-list-meet"><div class="default-font">督办</div></div>'+
                                divLable +
                            '<span class="task-list-detail-title  default-font" style="overflow: hidden; text-overflow: ellipsis; '+
                            'white-space: nowrap; width: 100%; display: block; padding-top:0; margin-left: 1rem;" title="'+data[j].name+'">'+
                            data[j].name+'</span></div><div><span class="task-list-detail-subtitle default-font" style="margin-left:1rem;">'+description+
                            '</span></div></div> <div class="task-list-spack"></div></li>';
                            if((data.length>0)&&(j<=1)){
                                var url = "/pages/supervision/supervision-detail.html?id="+ data[j].id;
                                var aLable = '<a href="' + url +'" class="qiRiTiXing-a" target="_blank">';
                                qiridubantixing = qiridubantixing + '<div class="task-list-detail-title-tomorrow qiRiTiXing" style="width:100%;">'+
                                    aLable +
                                '<div class="qiRiTiXing-a-div default-font" title="'+data[j].name+'">'+data[j].name+'</div></a></div>';
                            }
                        }
                        $("#nodataDiv").remove();
                        $("#nodataDuBanUI").remove();
                        $("#worksoftodayUl").append(dubanshixiang);
                        $("#qirineidubanItems").html(qiridubantixing+qiridubantixingMore);
                        $("#qirineidubanTitle").html("七日内督办提醒("+data.length+")");
                    if(data.length == 0 ){
                        var nodateList = '<li class="li-task-list" id="nodataDiv" style="margin-top: 0.5rem;"><div class="task-list-meet"><div class="default-font">暂无</div></div>'+
                            '<div class="task-list-detail" style="border: 1px dashed #a6cc38;cursor:pointer;"><div style="overflow: hidden; position: relative;">'+
                            '<span class="task-list-detail-title  default-font" style="overflow: hidden; text-overflow: ellipsis; '+
                            'white-space: nowrap; width: 100%; display: block; padding-top:0;" title="暂无重点事宜提醒">暂无重点事宜提醒</span></div>'+
                            '<div><span class="task-list-detail-subtitle default-font"></span></div></div> <div class="task-list-spack"></div></li>';
                        var nodataUI='<div class="task-list-detail-title-tomorrow qiRiTiXing" style="width:100%;" id="nodataDuBanUI">'+
                            '<div class="qiRiTiXing-a-div default-font" title="暂无督办事宜提醒！">暂无督办事宜提醒！</div></div>';
                        $("#worksoftodayUl").html(nodateList);
                        $("#qirineidubanItems").html(nodataUI +qiridubantixingMore);
                    }
                }else if(fetchArray[jqxhr.index] == "QIRINEIRICHENG"){
                    var qirineirichengMore= '<div style="width:100%;margin-top:0.5rem;"><a class="default-font" href="pages/schedule/personal.html" style="float:right;" target="_blank">更多 ></a></div>';
                    var qirineiricheng = "";
                    for(var j=0; j<data.length; j++){
                        if((data.length>0)&&(j<=1)){
                            qirineiricheng = qirineiricheng + '<div class="task-list-detail-title-tomorrow qiRiTiXing" style="width:100%;">'+
                            '<a href="pages/schedule/personal.html" class="qiRiTiXing-a"  target="_blank">'+
                            '<div class="qiRiTiXing-a-div default-font" title="'+data[j].title+'">'+data[j].title+'</div></a></div>';
                        }
                    }
                    $("#qiribeirichengTitle").html("七日内日程提醒("+data.length+")");

                    if(data.length == 0 ){
                        var nodataUI = '<div class="task-list-detail-title-tomorrow qiRiTiXing" style="width:100%;">'+
                            '<div class="qiRiTiXing-a-div default-font" title="暂无日程事宜提醒!">暂无日程事宜提醒!</div></div>';

                        $("#qiribeirichengItems").html(nodataUI + qirineirichengMore);
                    }else{
                        $("#qiribeirichengItems").html(qirineiricheng+qirineirichengMore);
                    }
                }else if(fetchArray[jqxhr.index] == "USERKUAIJIERUKOU"){
                    if(data.length == 0){
                        initSpecialKuaiJieRuKou();
                    }else{
                        var kuaijierukouLeft="";
                        var kuaijierukoupop="";
                        var kuaijierukouselector="";
                        var max=8;
                        if(window.plantName=="FQ-plant")max=10;                  
                        for(var j=0; j<data.length;j++){
                            if(j<max){
                                kuaijierukouLeft = kuaijierukouLeft + '<li class="article-list-item"><a href="'+data[j].link+'" target="_blank">'+
                                '<img src="'+data[j].icoa+'" class="article-list-item-icon">'+
                                '<span class="article-list-item-span">'+data[j].description+'</span></a></li>';
                            }
                           
                            kuaijierukouselector = kuaijierukouselector + '<option value="'+data[j].linkid+'">'+data[j].description+'</option>';
                        }
                        //主页面工作快捷入口
                        $("#gongzuokuaijierukouUl").html(kuaijierukouLeft);
                        //弹框页面工作快捷入口（编辑页面）
                        // $("#gongzuokuaijirukouhidePopUl").html(kuaijierukoupop);
                        //编辑选择框已添加的工作快捷入口
                        $("#leftSel").html(kuaijierukouselector);
                    }
                }else if(fetchArray[jqxhr.index] == "USERKUAIJIERUKOUAll"){
                    var restPort = "";
                    var kuaijierukoupop="";
                    for(var j=0; j<data.length;j++){
                         kuaijierukoupop = kuaijierukoupop + '<li class="ul-wedigt-item">'+
                            '<a href="'+data[j].link+'" target="_blank">'+
                            '<img src="'+data[j].icoa+'"><span style="margin-left: 1rem;">'+data[j].description+'</span></a></li>';
                        restPort = restPort + '<option value="'+data[j].id+'">'+data[j].description+'</option>';
                    }
                     $("#gongzuokuaijirukouhidePopUl").html(kuaijierukoupop);
                    $("#rightSel").html(restPort);
                    var currentSelL = null;
                    var currentSelR = null;
                    currentSelL = document.getElementById('leftSel');
                    currentSelR = document.getElementById('rightSel');
                    if(currentSelL.length>0){
                        for(var k=0;k<currentSelL.length;k++){
                            for(var j=0; j<currentSelR.length; j++){
                                if (currentSelL.options[k].value == currentSelR.options[j].value){
                                    var removeIndex = currentSelR.options[j].index;
                                    currentSelR.options.remove(removeIndex);
                                }
                            }
                        }
                    }
                }else if(fetchArray[jqxhr.index] == "XINGCHENG"){
                    var xingcheng="";
                    for(var j=0; j<data.length; j++){
                        var description = "";
                        if ((typeof(data[j].enddate) == "undefined") || (typeof(data[j].enddate) == "")) {
                            description = "";
                        } else {
                            description = data[j].enddate;
                        }
                        xingcheng=xingcheng+'<li class="li-task-list"><div class="task-list-meet"><div class="default-font">行程</div></div>'+
                        '<div class="task-list-detail" style="border: 1px dashed #a6cc38;cursor:pointer;" onclick="opentask(\'xingcheng\')"><div style="overflow: hidden; position: relative;">'+
                        '<span class="task-list-detail-title  default-font" style="overflow: hidden; text-overflow: ellipsis; '+
                        'white-space: nowrap; width: 100%; display: block; padding-top:0; margin-left: 1rem;" title="'+data[j].title+'">'+
                        data[j].title+'</span></div><div><span class="task-list-detail-subtitle default-font" style="margin-left:1rem;">'+description+
                        '</span></div></div> <div class="task-list-spack"></div></li>';
                    }
                    $("#nodataDiv").remove();
                    $("#worksoftodayUl").append(xingcheng);
                }else if(fetchArray[jqxhr.index] == "1"){
                    var currentHtml=htmlcode(data);
                    $("#lingdaopishiSpan").html(data.length);
                    $("#lingdaopishitable").html(currentHtml);
                }else if(fetchArray[jqxhr.index] == "2"){
                    var currentHtml=htmlcode(data);
                    $("#gongbandaiyueSpan").html(data.length);
                    $("#gongbandaiyuetable").html(currentHtml);
                }else if(fetchArray[jqxhr.index] == "3"){
                    var currentHtml=htmlcode(data);
                    $("#gerendaibanSpan").html(data.length);
                    $("#gerendaibantable").html(currentHtml);
                }else if(fetchArray[jqxhr.index] == "4"){
                    var currentHtml=htmlcode(data);
                    $("#gongbandaibanSpan").html(data.length);
                    $("#gongbandaibantable").html(currentHtml);
                }else if(fetchArray[jqxhr.index] == "5"){
                    var currentHtml=htmlcode(data);
                    $("#shoutuodaibanSpan").html(data.length);
                    $("#shoutuodaibantable").html(currentHtml);
                }else if(fetchArray[jqxhr.index] == "6"){
                    var currentHtml=htmlcode(data);
                    $("#gerendaiyueSpan").html(data.length);
                    $("#gerendaiyuetable").html(currentHtml);
                }else if(fetchArray[jqxhr.index] == "7"){
                    var currentHtml=htmlcode(data);
                    $("#weituodaibanSpan").html(data.length);
                    $("#weituodaibantable").html(currentHtml);
                }else if(fetchArray[jqxhr.index] == "8"){
                    var currentHtml=htmlcode(data);
                    $("#xiaoxitixingSpan").html(data.length);
                    $("#xiaoxitixingtable").html(currentHtml);
                }
                var index = jqxhr.index;
                // _this[nameArray[index]] = data;
                if (jqxhr.index == 0){
                    console.log(data);
                }
            },
            error: function error(err,state,xhr) {
                // alert(xhr.index)
                // alert(fetchArray[xhr.index]+"\r\n"+JSON.stringify(err))
            }
        }).index = i;
    }
        (function(){
            var bodySection=$("#bodySection");
            switch(window.plantName){
                case "headquaters":
                bodySection.addClass("headquaters");
                break;
                case "FQ-plant":
                bodySection.addClass("FQ-plant");
                break;
                default:
                bodySection.addClass("headquaters");
                break;
            }

            var backlogVm=new Vue({
                el:"#backlogSection",
                data:{
                    list:[{name:"ERP"},{name:"EAM"},{name:"ESM"},{name:"FFBUS"}]
                },
                created:function(){
                    var _this=this;
                    if(window.plantName!="FQ-plant")return;
                    $.ajax({
                        url:setPersonal_isolate("taskCount",{uid:etCookie("userid"),'_':new Date().getTime()}),
                        type:"get",
                        success:function(result,state,xhr){
                            result=JSON.parse(result);
                            var urls={
                                FFBUS:'http://10.17.20.82/SSMISDIYWeb/default2.asp?DB=SSMISDIYDB',
                                EAM : 'http://eam01.cnnp.com.cn/faPROD/domain/workbenchrenderer',
                                ESM : 'http://10.17.16.43/SSMISDIYWeb/default1.asp?DB=esm',
                                ERP : 'http://erp.cnnp.com.cn/irj/portal'
                            }
                            var list=[];
                            list.push({
                                name:"ERP",
                                count:result.ERP,
                                url:urls["ERP"]
                            });
                            list.push({
                                name:"EAM",
                                count:result.EAMAS,
                                url:urls["EAM"]
                            });
                            list.push({
                                name:"ESM",
                                count:result.ESM,
                                url:urls["ESM"]
                            });
                            list.push({
                                name:"FFBUS",
                                count:result.FFBUS,
                                url:urls["FFBUS"]
                            });
                            
                            _this.list=list;
                        },
                        error:function(data){
                            alert(JSON.stringify(data));
                        }
                    });
                }
            });

        })();
    
    function dateFormatFun(parmar){
        var myDate = new Date(parmar);
        return myDate.getFullYear()+"-"+myDate.getMonth()+"-"+myDate.getDate();
    }
    function htmlcode(data){
        var tableHeader = "<section class='grid-table'><table class='table table-condensed head-title'><thead>"+
        "<tr><th style='text-align: center; width:60%; color:black;background-color: white; '> 事项名称 </th>"+
        "<th style='text-align: center;color: black;background-color: white; '> 创建人员 </th><th style='text-align: center;color: black;background-color: white; '> 创建时间 </th></tr></thead><tbody>";
        var tableFooter = "</tbody></table>";
        var initHtml = "";
        var moreUrlHtml = "";
        var count = 0;
        if (data.length == 0) {
            initHtml = '<div class="todoIsNull">' + '<img src="assets/images/portal/workspace/todoIsNull.png" class="todoIsNull-img"/></div>';
        } else {
            if (data.length > 10) {
                count = 10;
                // moreUrlHtml = '<a href="' + data[0].f_MODELVIEWURL + '" class="moreURL" target="_blank" style="margin-bottom: 0.5rem;">' + '<div class="moreURL-div" style="float: right; line-height:0;">更多 ></div></a>';
            } else {
                count = data.length;
            }
            for (var j = 0; j < count; j++) {
                if((j%2) == 1){
                    initHtml = initHtml + '<tr class="grid-content" style="border-bottom: 1px solid lightgrey; height:3rem;">' + '<td class=" default-font"><a href="'
                     + data[j].f_URL + '" style="color: black;"  target="_blank"><div style="height:2rem; overflow: hidden; width: 100%;">' 
                     + data[j].f_SUBJECT + '</div></a></td>' + '<td class=" default-font" style="text-align: center;">' 
                     + data[j].f_SOURCE + '</td><td class=" default-font"  style="text-align: center;">' + dateFormatFun(data[j].f_RECEVIETIME) + '</td></tr>';
                }else{
                    initHtml = initHtml + '<tr class="grid-content" style="border-bottom: 1px solid lightgrey; height:3rem; background-color:#f3f2f0;">' + '<td class=" default-font"><a href="'
                     + data[j].f_URL + '" style="color: black;"  target="_blank"><div style="height:2rem; overflow: hidden; width: 100%;">' 
                     + data[j].f_SUBJECT + '</div></a></td>' + '<td class=" default-font" style="text-align: center;">' 
                     + data[j].f_SOURCE + '</td><td class=" default-font"  style="text-align: center;">' + dateFormatFun(data[j].f_RECEVIETIME) + '</td></tr>';
                }

                
            }
            initHtml = tableHeader + initHtml + tableFooter;
        }
        return initHtml +"</section>";
    }
    function etCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    function  setCookie(name,value,days,path,domain,secure){
        if(days){
            var date=new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires=date.toGMTString();
        }
        else var expires="";
        var cookieString=name+"="+escape(value);
        if(expires) cookieString+=";expires="+expires;
        if(path) cookieString+=";path="+escape(path);
        if(domain) cookieString+=";domain="+escape(domain);
        if(secure) cookieString+=";secure="+secure;
        document.cookie=cookieString;
    }
    function updateCookie(name,value,days)
    {
        if(days){
            var date=new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires=date.toGMTString();
        }
        setCookie(name, value,expires,"/");
    }
    function initSpecialKuaiJieRuKou(){
        $.ajax({
            type: "get",
            dataType: "json",
            contentType: "application/json",
            url:setPersonal_isolate("initUserKuaiJieRuKou"),
            // data: "",
            success: function success(data, state, jqxhr) {
                var kuaijierukouLeft="";
                // var kuaijierukoupop="";
                var kuaijierukouselector="";
                var max=8;
                if(window.plantName=="FQ-plant")max=10;
                for(var j=0; j<data.length;j++){
                    if(j<max){
                        kuaijierukouLeft = kuaijierukouLeft + '<li class="article-list-item"><a href="'+data[j].link+'" target="_blank">'+                            '<img src="'+data[j].icoa+'" class="article-list-item-icon">'+
                        '<span class="article-list-item-span">'+data[j].description+'</span></a></li>';
                    }
                    // kuaijierukoupop = kuaijierukoupop + '<li class="ul-wedigt-item">'+
                    // '<a href="'+data[j].link+'" target="_blank">'+
                    // '<img src="'+data[j].icoa+'"><span style="margin-left: 1rem;">'+data[j].description+'</span></a></li>';
                    kuaijierukouselector = kuaijierukouselector + '<option value="'+data[j].id+'">'+data[j].description+'</option>';
                }
                //主页面工作快捷入口
                $("#gongzuokuaijierukouUl").html(kuaijierukouLeft);
                //弹框页面工作快捷入口（编辑页面）
                // $("#gongzuokuaijirukouhidePopUl").html(kuaijierukoupop);
                //编辑选择框已添加的工作快捷入口
                $("#leftSel").html(kuaijierukouselector);
            },
            error: function error(err) {
                console.log(err);
            }
        });
    }

});