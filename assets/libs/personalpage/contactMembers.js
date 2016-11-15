/**
 * Created by kingsinsd on 2016/7/8.
 */
    //get current UserId from Section

function getUserCookies(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function opentask(parmar){
        var url = "";
        if(parmar == "xingcheng"){
            url = "/pages/schedule/personal.html";
        }else if(parmar == "duban"){
            url = "/pages/supervision/supervision-detail.html";
        }
        window.open(url,"_blank");
}

var currentUserId=getUserCookies("userid");
var pageUserUid="";
var cancelText = "";
function myFunction(parmar){
    var url = "pages/personalpage/personalpage-detail.html?uid="+parmar;
    window.open(url,"_blank");
}
function editWork(parmar){
    var span = "#span"+parmar;
    var input = "#input"+parmar;
    var btn = "#btn"+parmar;
    var buttonDiv = "#button"+parmar;
    var saveBtn = "#edit"+parmar+"Save";
    var cancelBtn = "#edit"+parmar+"Cancel";
    $(span).hide();
    $(input).show();
    $(btn).hide();
    cancelText = $(span).text();
    $(input).val($(span).text());
    $(buttonDiv).show();
    $(saveBtn).show();
    $(cancelBtn).show();
}
function editCancel(parmar){
    var buttonDiv = "#button"+parmar;
    var input = "#input"+parmar;
    var span = "#span"+parmar;
    var btn = "#btn"+parmar;
    $(buttonDiv).hide();
    $(input).hide();
    $(span).show();
    $(span).text(cancelText);
    $(btn).show();
}
function editSave(parmar,parmarKey){
    var input = "#input"+parmar;
    $.ajax({
        type: "post",
        contentType: "application/json",
        data:"" ,
        url: updateUserProfile + pageUserUid +'&'+parmarKey+'=' + encodeURIComponent($(input).val()),
        success: function (data, state, jqxhr) {
            if(data == "1"){
                var buttonDiv = "#button"+parmar;
                var span = "#span"+parmar;
                var btn = "#btn"+parmar;
                $(buttonDiv).hide();
                $(input).hide();
                $(span).show();
                $(span).text($(input).val());
                $(btn).show();
                alert("保存成功！");
            }else{
                var buttonDiv = "#button"+parmar;
                var span = "#span"+parmar;
                var btn = "#btn"+parmar;
                $(buttonDiv).hide();
                $(input).hide();
                $(span).show();
                $(span).text(cancelText);
                $(btn).show();
                alert("保存失败！");
            }
        },
        error: function (err) {
            console.log(err);
            alert("保存失败，请稍后再试！");
            editCancel(parmar);
        }
    });
}
$(document).ready(function () {
    var personalpageRequest = window.interfaceSettings.personalpageRequest.api;
    var personalpageRequestKey = "?apikey=" + window.interfaceSettings.personalpageRequest.header.apikey;
    var setPersonalpageHeader=function(url,paramObj,iid){
        return (iid?url.replace("%id%",iid):url)+"?"+(paramObj?$.param($.extend({},window.interfaceSettings.personalpageRequest.header,paramObj)):$.param(window.interfaceSettings.personalpageRequest.header));
    }

    var dateObj = new Date();
    var defaultArr=getWeeks(dateObj);
    var defaultMeetting = '<div style="margin-top: 10px;"><div style="float: left;border-right: 1px dashed black;">'
        +'<div><div class="round-data" style="margin-right: 5px;">'+defaultArr[0]+'</div><p class="right-p">'+defaultArr[1]
        +'</p></div></div><div style="float: left;"><div><span class="right-name">暂无数据！</span><br>'
        +'<span class="right-bottom-org"></span></div></div></div>';
    $("#defaultMeeting").append(defaultMeetting);
    $("#defaultAct").append(defaultMeetting);

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    window.pageUserUid=getQueryString("uid");
    var reportChainLine='<div id="reportChainId" class="container-div clear-float"><label for="exampleInputPassword1" class="title-label">汇报链</label><div style="width: 100%;">';
    var reportChainLineHtml = '<img id="u291_line" style="margin-left: 5px;width: 80%;height: 1px; vertical-align: top;" src="assets/images/personalpage/u291_line.png"/>';
    $("#userChains").html(reportChainLine + reportChainLineHtml + '</div></div>');

    var sameOrgMemberDiv = '<div id="sameOrgId" class="container-div clear-float"><label class="title-label">同一组织</label><div style="width: 100%;" >';
    var sameOrgLineHtml = '<img id="u291_line" class="img " style="margin-left: 5px;width: 80%;height: 1px;"'+
        'src="assets/images/personalpage/u291_line.png" alt="u291_line"/>';
    $("#sameOrgMember").html(sameOrgMemberDiv+sameOrgLineHtml + '</div></div>');

    var pageUser=window.pageUserUid;
    if(pageUser == null){
        pageUser = window.currentUserId;
        window.pageUserUid=window.currentUserId;
    }
    var currentUser=window.currentUserId;
    var sameOrgOu = "";
    var sameOrgName="";
    $.ajax({
        type: "post",
        contentType: "application/json",
        data: "",
        url: setPersonalpageHeader(personalpageRequest.getMemberDetails, {uid:pageUser},null),
        // url: getMemberDetails + pageUser,
        success: function (data, state, jqxhr) {
            var countLeaders=0;
            var countMembers=0;
            for (var i = 0; i < data.length; i++) {
                var personalhtml='<span class="font-fam">个人工作台 >个人页面 >'+data[i].displayName+ '</span>';
                $("#defaultTitle").remove();
                $("#personalPageId").html(personalhtml);
                var iconImages = "";
                var department = "";
                if ((typeof(data[i].imageurl) == "undefined") || (typeof(data[i].imageurl) == "") || (data[i].imageurl == null)) {
                    iconImages = "assets/images/personalpage/defaultUserPhoto.png";
                } else {
                    iconImages = window.interfaceSettings.personalpageRequest.server + data[i].imageurl;
                }
                for (var j = 1; j < data[i].orgtree.length; j++) {
                    for (var key in data[i].orgtree[j]) {
                        sameOrgOu = key;
                        sameOrgName = data[i].orgtree[j][key];
                        if(j == "1"){
                            department = department + '<span>' + sameOrgName + '</span><br>'
                        }else{
                            department = department + '<span class="ma-detail-title-span-suo">' + sameOrgName + '</span><br>'
                        }
                    }
                }
                var leaderHtml = '';
                leaderHtml = leaderHtml +'<div class="xc-main-image" style="width:24%;"> <img class="img xc-main-image-img" src="'+ iconImages +
                '" alt="u229"/><p class="xc-main-image-p"><span> ' + data[i].displayName  + '</span></p></div><div class="ma-detail-suo" style="padding-top:1.5rem;">'+
                '<div class="ma-detail-suo-org"><div class="ma-detail-title-suo">组&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;织：</div><div class="ma-detail-suo-org-title">'+department+'</div>';
                var titleArray = ["Title","Tel","Mob","Mail","Loc","Work","Anno","Date"];
                var keyArray = ["title","telephonenumber","mobile","mail","physicalDeliveryOfficeName","workitem","delegateannu","delegatedate"];
                var titleCharArray = ["职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务：","电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：","手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：","邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：","办公地点：","个人备注：","委托声明：","委托时间："];
                var interHtml="";
                for(var k = 0; k< titleArray.length; k++){
                    var keys = keyArray[k];
                    if(currentUser == pageUser){
                        interHtml = interHtml + '<div class="xc-member-data-div"><div class="ma-detail-title-suo">'
                        + titleCharArray[k]+'</div><div class="xc-member-data">'+
                        '<span id="span'+titleArray[k]+'" class="xc-workitemsdiv">'+getValue(data[i][keys])+'</span>'+
                        '<input id="input'+titleArray[k]+'" type="text" class="xc-workitems-input"/></div>'+
                        '<div id="button'+titleArray[k]+'" class="xc-edit-button-div">'+
                        '<button onclick="editSave(\''+titleArray[k]+'\',\''+keyArray[k]+'\');" id="edit'+titleArray[k]+
                        'Save" style="float: right;" class="btn btn-default xc-edit-btn-div xc-edit-btn">保存</button>'+
                        '<button onclick="editCancel(\''+titleArray[k]+'\');" id="edit'+titleArray[k]+
                        'Cancel" style="float: right;" class="btn btn-default xc-edit-btn-div xc-edit-btn">取消</button></div>'+
                        '<button type="button" class="btn btn-default xc-edit-btn-div" id="btn'+titleArray[k]+
                        '" onclick="editWork(\''+titleArray[k]+
                        '\')"><span class="glyphicon glyphicon-edit xc-edit-btn-char"></span></button></div>';
                    }else{
                      console.log("spantitle",getValue(data[i][keys]))
                        interHtml = interHtml + '<div class="xc-member-data-div"><div class="ma-detail-title-suo">'
                        + titleCharArray[k]+'</div><div class="xc-member-data">'+
                        '<span id="span'+titleArray[k]+'" class="xc-workitemsdiv">'+getValue(data[i][keys])+'</span>'+
                        '<input id="input'+titleArray[k]+'" type="text" class="xc-workitems-input"/></div>';
                    }
                }
                $("#userInfo").html(leaderHtml+interHtml+"</div>");
            }
            getChain(pageUser);
            getXinCheng(pageUser);
            getSameOrg(sameOrgOu);
        },
        error: function (err) {
            console.log(err);
        }
    });
    function getValue(key){
        if ((typeof(key) == "undefined") || (typeof(key) == "null") || (key == null)) {
            return  "";
        } else {
            return  key;
        }
    }
    function getChain(parmar){
        $.ajax({
            type: "get",
            dataType:"json",
            url: setPersonalpageHeader(personalpageRequest.getChainsDetails,{uid:parmar},null),
            // url: getChainsDetails + parmar,
            success: function (data, state, jqxhr) {
                var leveArray = new Array();
                var titleArray = new Array();
                var displaynames="";
                var currentposition = 0;
                if(data.length>0){
                    currentposition = data[0].position;
                }
                for (var i = 0; i < data.length; i++) {
                    if(data[i].position == currentposition){
                        var member = leveArray[currentposition-1];
                        var currentMember = member + '<a class="xc-org-chain-member-a" onclick="myFunction(\''+data[i].uid+'\')"> '+data[i].displayName+"</a>,";
                        leveArray[currentposition-1] = currentMember;
                        for (var m = 2; m < data[i].orgtree.length; m++) {
                            for (var key in data[i].orgtree[m]) {
                                titleArray[currentposition-1] = data[i].orgtree[m][key];
                            }
                        }
                    }else{
                        currentposition = data[i].position;
                        var member = leveArray[currentposition-1];
                        var currentMember = member + '<a class="xc-org-chain-member-a" onclick="myFunction(\''+data[i].uid+'\')"> '+data[i].displayName+"</a>,";
                        leveArray[currentposition-1] = currentMember;
                        for (var m = 2; m < data[i].orgtree.length; m++) {
                            for (var key in data[i].orgtree[m]) {
                                titleArray[currentposition-1] = data[i].orgtree[m][key];
                            }
                        }
                    }
                }
                var firstManageUrl = "";
                for(var i = 0; i< titleArray.length; i++){
                    titleArray[i] = titleArray[i].replace(/undefined/, "");
                }
                for(var i = 0; i< leveArray.length; i++){
                    leveArray[i] = leveArray[i].replace(/undefined/, "");
                    leveArray[i] = leveArray[i].substring(0,leveArray[i].length-1);
                    if(i == "0"){
                        firstManageUrl = '<div  style="width: 100%; text-align: center" style="background-color: red;"><span class="right-bottom-org-sp">'+titleArray[i]+
                        '</span><div class="right-bottom-org-sp-split" style="border: 0;">'+leveArray[i]+'</div></div>';
                    }else{
                        firstManageUrl = '<div  style="width: 100%; text-align: center;"><span class="right-bottom-org-sp">'+titleArray[i]+
                        '</span><div class="right-bottom-org-sp-split">'+leveArray[i]+'</div>'+
                        '<img id="u393" class="img kh-xz" src="assets/images/personalpage/u393.png" alt="u393"/></div>' + firstManageUrl;
                    }
                }
                if(data.length > 0){
                    $("#reportChainId").remove();
                    $("#userChains").html(reportChainLine + reportChainLineHtml + firstManageUrl + '</div></div>');
                }else{
                    $("#userChains").hide();
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
    function getWeeks(parmar){
        var oDate1 = new Date(parmar);
        var arrayChar=["日","一","二","三","四","五","六"];
        //var dataChar = parmar.substring(parmar.length-2, parmar.length);
        var weekDay = oDate1.getDate()+arrayChar[new Date(oDate1).getDay()];
        var monthChar = (oDate1.getMonth()+1)+"月";
        var weeksArr = [weekDay,monthChar];
        return weeksArr;
    }
    function getXinCheng(parmar){
        $.ajax({
            type: "get",
            dataType:"json",
            // url: setPersonalpageHeader(personalpageRequest.getChainsDetails,{uid:parmar},null),
            url: personalpageRequest.getXingChengDetails + parmar + personalpageRequestKey,
            success: function (data, state, jqxhr) {
                var xinChengIcon = "";
                for(var i = 0; i< data.length; i++){
                    var arrayChar=getWeeks(data[i].startdate);
                    xinChengIcon = xinChengIcon + '<div class="xc-div" style="cursor:pointer;" onclick=(opentask(\'xingcheng\'))><div class="xc-div-datediv">'+
                    '<div class="round-data">'+arrayChar[0]+'</div><p class="right-p">'+arrayChar[1]+'</p></div><div>'+
                    '<span class="xc-right-name" style="max-width: 18rem; margin-top:0.5rem; float:none;" title="'+data[i].title+'">&nbsp;&nbsp;'+ data[i].title+'</span>'+
                    '<span class="right-bottom-org">'+data[i].starttime+'~'+data[i].endtime+'</span></div></div>';
                }
                $("#xinChengDate").html(xinChengIcon);
                var newDate = new Date();
                var arrayDate = getWeeks(newDate);
                if(data.length == 0){
                    var xingChengD = '<div class="xc-div" style="margin-top: 0;"><div class="xc-div-datediv">'+
                        '<div class="round-data">'+arrayDate[0]+'</div><p class="right-p">'+arrayDate[1]+'</p></div><div>'+
                        '<span class="xc-right-name" style="max-width: 18rem; margin-top:0.5rem;" title="">暂无行程！</span><br>'+
                        '<span class="right-bottom-org"></span></div></div>';
                    $("#xinChengDate").html(defaultMeetting);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
    
    function getSameOrg(parpp){
        parpp = sameOrgOu;
        $.ajax({
            type: "get",
            dataType:"json",
            url: personalpageRequest.getSameOrgDetails + personalpageRequestKey + "&ou=" + parpp,
            success: function (data, state, jqxhr) {
                var sameOrgHtml = "";
                var sameOrgCount = "";
                var moreHtml = "";
                if(data.length < 4){
                    sameOrgCount=data.length;
                }else{
                    sameOrgCount=4;
                    moreHtml = '<div style="margin-right: 5px;min-height: 4.7rem;">'+
                    '<a href="pages/personalpage/personalpage-list-search.html?ou=' +parpp+ '" style="float:right; margin-top:3rem;">更多>></a></div>';
                }
                for(var i = 0; i< sameOrgCount; i++){
                    var iconImages=""
                    if ((typeof(data[i].imageurl) == "undefined") || (typeof(data[i].imageurl) == "") || (data[i].imageurl == null)) {
                        iconImages = "assets/images/personalpage/defaultUserPhoto.png";
                    } else {
                        iconImages = window.interfaceSettings.personalpageRequest.server + data[i].imageurl;
                    }
                    sameOrgHtml = sameOrgHtml +'<div class="tyzz-div" onclick="myFunction(\'' +data[i].uid +
                    '\')"><div style="float: left;"><div style="margin-right: 5px;">'+
                    '<img class="img right-bottom-img" src="'+iconImages+'" alt="u280"/></div></div>'+
                    '<span class="right-name">'+data[i].displayName+'</span><br>' +
                    '<span class="right-bottom-org">'+ sameOrgName + '</span></div>';
                }
                if(data.length > 0){
                    $("#sameOrgId").remove();
                    $("#sameOrgMember").html(sameOrgMemberDiv+sameOrgLineHtml+sameOrgHtml + moreHtml+ '</div></div>');
                }else{
                    //$("#sameOrgMember").hide();
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
});