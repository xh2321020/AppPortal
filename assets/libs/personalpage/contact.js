/**
 * Created by kingsinsd on 2016/7/8.
 */
function myFunction(parmar){
    var url = "pages/personalpage/personalpage-detail.html?uid="+parmar;
    window.open(url,"_blank");
}
$(document).ready(function () {
    var ou = "02";
    var loadingImg='<div style="width:10rem; height:10rem; margin-left: 3rem;"><img src="assets/images/loading3.gif"></img> </div>';
    $("#loadingImgs").html(loadingImg);
    getMembers(ou);
    getDepartments();
    function getDepartments() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: getDepartment,
            success: function (data, state, jqxhr) {
                var source =
                {
                    datatype: "json",
                    datafields: [
                        {name: 'ou'},
                        {name: 'pid'},
                        {name: 'name'},
                        {name: 'id'}
                    ],
                    id: 'ou',
                    localdata: data
                };

                // create data adapter.
                var dataAdapter = new $.jqx.dataAdapter(source);
                // perform Data Binding.
                dataAdapter.dataBind();
                // get the tree items. The first parameter is the item's id. The second parameter is the parent item's id. The 'items' parameter represents
                // the sub items collection name. Each jqxTree item has a 'label' property, but in the JSON data, we have a 'text' field. The last parameter
                // specifies the mapping between the 'text' and 'label' fields.
                var records = dataAdapter.getRecordsHierarchy('ou', 'pid', 'items', [{
                    name: 'name',
                    map: 'label'
                }]);
                $('#jqxWidget').jqxTree({source: records, width: '300px'});
                $('#jqxWidget').on('select', function (event) {
                    var args = event.args;
                    var item = $('#jqxWidget').jqxTree('getItem', args.element);
                    getMembers(item.id);
                });
                $("#loadingImgs").remove();
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    function getMembers(parmar) {
        $.ajax({
            type: "post",
            contentType: "application/json",
            data: "",
            url: getMember + parmar,
            success: function (data, state, jqxhr) {
                var leaderHtml = '<div style="margin-bottom:1rem;" id="defaultLeader">'+
                    '<img class="img " style="width: 6%;height: 2px;" src="assets/images/personalpage/u271_line.png" alt="u271_line"/>'+
                    '<span  class="font-fam" style="font-weight:600;">领导/负责人</span>'+
                    '<img id="u225_line" class="img" style="width: 73%;height: 2px;" src="assets/images/personalpage/u271_line.png" alt="u271_line"/></div>'+
                    '<div style="float: left;width: 100%;margin-top: 5px;" id="leaderResult">';
                var allMemberHtml = '<div style="margin-bottom:1rem;margin-left: 1rem;" id="defaultAllMember">'+
                    '<img class="img " style="width: 6%;height: 2px;" src="assets/images/personalpage/u271_line.png" alt="u271_line"/>'+
                    '<span  class="font-fam" style="font-weight:600;">所有员工</span>'+
                    '<img id="u225_line" class="img" style="width: 77%;height: 2px;" src="assets/images/personalpage/u271_line.png" alt="u271_line"/></div>'+
                    '<div style="float: left;margin-top: 5px; margin-left: 1.5rem;" id="memberResult">';
                var countLeaders=0;
                var countMembers=0;
                for (var i = 0; i < data.length; i++) {
                    var images = "";
                    var mobileNo = "";
                    var mailAdd = "";
                    var department = "";
                    if ((typeof(data[i].mobile) == "undefined") || (typeof(data[i].mobile) == "")) {
                        mobileNo = "";
                    } else {
                        mobileNo = data[i].mobile;
                    }
                    if ((typeof(data[i].telephoneNumber) == "undefined") || (typeof(data[i].telephoneNumber) == "")) {
                        mobileNo = mobileNo + "";
                    } else {
                        mobileNo = mobileNo + " ,分机号" + data[i].telephoneNumber;
                    }
                    if ((typeof(data[i].imageurl) == "undefined") || (typeof(data[i].imageurl) == "")) {
                        images = "assets/images/personalpage/defaultUserPhoto.png";
                    } else {
                        images = data[i].imageurl;
                    }
                    if ((typeof(data[i].mail) == "undefined") || (typeof(data[i].mail) == "")) {
                        mailAdd = "";
                    } else {
                        mailAdd = data[i].mail;
                    }
                    for (var j = 1; j < data[i].orgtree.length; j++) {
                        for (var key in data[i].orgtree[j]) {
                            if(j<=3){
                                department = department + '<span>' + data[i].orgtree[j][key] + '</span><br>';
                            }
                        }
                    }
                    if (data[i].isleader == "1") {
                        countLeaders ++;
                        if ((typeof(data[i].userstatus) == "undefined") || (data[i].userstatus == "")) {
                            leaderHtml = leaderHtml + '<div style="cursor:pointer" class="emp-class" onclick="myFunction(\''+data[i].uid+'\')">'+
                            '<img style="margin-left: 0.5rem;" class="img emp-class-img" src="' + images + '"/>' +
                            '<div class="emp-class-div" style="margin-left: 1rem;"><p><span class="emp-class-div-p-span">' + data[i].displayname +
                            '</span><br>' + department + '<span>' + mailAdd + '</span><br><span>' + mobileNo +
                            '</span></p></div></div>';
                        } else {
                            leaderHtml = leaderHtml + '<div style="cursor:pointer" class="emp-class" onclick="myFunction(\''+data[i].uid+'\')">'+
                            '<img  style="margin-left: 0.5rem;" class="img emp-class-img" src="' + images + '"/>' +
                            '<div class="emp-class-div"  style="margin-left: 1rem;"><p><span class="emp-class-div-s">授权信息</span><span class="emp-class-div-p-span">' + data[i].displayname +
                            '</span><br>' + department + '<span>' + mailAdd + '</span><br><span>' + mobileNo +
                            '</span></p></div></div>';
                        }
                    }else{
                        countMembers ++
                        if ((typeof(data[i].userstatus) == "undefined") || (data[i].userstatus == "")) {
                            allMemberHtml = allMemberHtml + '<div style="cursor:pointer" class="emp-class" onclick="myFunction(\''+data[i].uid+'\')">'+
                            '<img  style="margin-left: 0.5rem;" class="img emp-class-img" src="' + images + '"/>' +
                            '<div class="emp-class-div"  style="margin-left: 1rem;"><p><span class="emp-class-div-p-span">' + data[i].displayname +
                            '</span><br>' + department + '<span>' + mailAdd + '</span><br><span>' + mobileNo +
                            '</span></p></div></div>';
                        } else {
                            allMemberHtml = allMemberHtml + '<div style="cursor:pointer" class="emp-class" onclick="myFunction(\''+data[i].uid+'\')">'+
                            '<img  style="margin-left: 0.5rem;" class="img emp-class-img" src="' + images + '"/>' +
                            '<div class="emp-class-div" style="margin-left: 1rem;"><p><span class="emp-class-div-s">授权信息</span><span class="emp-class-div-p-span">' + data[i].displayname +
                            '</span><br>' + department + '<span>' + mailAdd + '</span><br><span>' + mobileNo +
                            '</span></p></div></div>';
                        }
                    }
                    $("#loadingimg").hide();
                }
                $("#defaultLeader").remove();
                $("#leaderResult").remove();
                $("#defaultAllMember").remove();
                $("#memberResult").remove();
                if(countLeaders>0){
                    $("#leaderArea").html(leaderHtml+'</div>');
                }
                if(countMembers>0){
                    $("#member").html(allMemberHtml+'</div>');
                }
                if((countLeaders==0)&&(countMembers==0)){
                    var noData='<div style="margin-bottom:1rem;" id="defaultLeader">'+
                    '<img class="img " style="width: 6%;height: 2px;" src="assets/images/personalpage/u271_line.png" alt="u271_line"/>'+
                    '<span  class="font-fam" style="font-weight:600;">所有员工</span>'+
                    '<img id="u225_line" class="img" style="width: 77%;height: 2px;" src="assets/images/personalpage/u271_line.png" alt="u271_line"/></div>';
                    $("#leaderArea").html(noData+"暂无相关人员信息！");
                }

            },
            error: function (err) {
                console.log(err);
            }
        });
    };
});