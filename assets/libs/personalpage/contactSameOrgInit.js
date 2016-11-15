/**
 * Created by kingsinsd on 2016/7/8.
 */
function myFunction(parmar){
    var url = "pages/personalpage/personalpage-detail.html?uid="+parmar;
    window.open(url,"_blank");
}
$(document).ready(function () {
    var personalpageRequest = window.interfaceSettings.personalpageRequest.api;
    var setPersonalpageHeader=function(url,paramObj,iid){
        return (iid?url.replace("%id%",iid):url)+"?"+(paramObj?$.param($.extend({},window.interfaceSettings.personalpageRequest.header,paramObj)):$.param(window.interfaceSettings.personalpageRequest.header));
    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var sameOu=getQueryString("ou");
    $.ajax({
        type: "get",
        dataType:"json",
        url: setPersonalpageHeader(personalpageRequest.getSameOrgDetails,{ou:sameOu},null),
        success: function (data, state, jqxhr) {
            var html='';
            for(var i=0; i<data.length; i++){
                var iconImages = "";
                var department = "";
                if ((typeof(data[i].imageurl) == "undefined") || (typeof(data[i].imageurl) == "")) {
                    iconImages = "assets/images/personalpage/defaultUserPhoto.png";
                } else {
                    iconImages = window.interfaceSettings.personalpageRequest.server + data[i].imageurl;
                }
                for (var j = 1; j < data[i].orgtree.length; j++) {
                    for (var key in data[i].orgtree[j]) {
                        sameOrgOu = key;
                        sameOrgName = data[i].orgtree[j][key];
                        if(j == "1"){
                            // department = department + '<span>' + sameOrgName + '</span><br>'
                            department = department + '<span class="ma-detail-title-span-suo">' + sameOrgName + '</span><br>'
                        }else{
                            department = department + '<span class="ma-detail-title-span-suo">' + sameOrgName + '</span><br>'
                        }
                    }
                }
                html= html + '<div class="sameOrg-class-result"><div class="sameOrg-class" onclick="myFunction(\''+data[i].uid +'\')">'+
                    '<img class="img sameOrg-class-img" src="'+iconImages+'"/>'+
                    '<div class="sameOrg-class-div"><span class="sameOrg-class-div-p-span">'+data[i].displayName+'</span><br><div>'+
                    department+'</div><span>'+data[i].mail+'</span></div></div></div>';
            }
            $("#userInfo").html(html);
        },
        error: function (err) {
            console.log(err);
        }
    });
    function getValue(key){
        if ((typeof(key) == "undefined") || (typeof(key) == "")) {
            return  "";
        } else {
            return  key;
        }
    }
});