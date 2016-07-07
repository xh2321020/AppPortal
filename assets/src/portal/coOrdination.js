/**
 * Created by kingsinsd on 2016/6/15.
 */
var Vue = require("vue");
import ComHeader from "../components/header.vue";
import ComFooter from "../components/footer.vue";
let headerVm=new Vue({
    el:"header",
    components:{ComHeader}
});
let footerVm=new Vue({
    el:"footer",
    components:{ComFooter}
});
var coOrdinationVm = new Vue({
    el: "#tbody",
    data: {
        //我管理的
        myOwner:[
            {
                "spaceImg":"../assets/images/portal/coOrdination/u268.png",
                "spaceURL":"http://www.baidu.com",
                "spaceSubject":"1关于恳请向商务部亚洲司报送对韩合作情况报告的请示",
                "spaceMemeber":"20",
                "spackCreationdate":"2015-01-01",
                "spackCreator":"xxxxx",
                "spackCrrentUpdate":"2016-01-01"
            },
            {
                "spaceImg":"../assets/images/portal/coOrdination/u268.png",
                "spaceURL":"http://www.baidu.com",
                "spaceSubject":"2关于恳请向商务部亚洲司报送对韩合作情况报告的请示",
                "spaceMemeber":"20",
                "spackCreationdate":"2015-02-01",
                "spackCreator":"xxxxx",
                "spackCrrentUpdate":"2016-02-01"
            },
            {
                "spaceImg":"../assets/images/portal/coOrdination/u268.png",
                "spaceURL":"http://www.baidu.com",
                "spaceSubject":"3关于恳请向商务部亚洲司报送对韩合作情况报告的请示",
                "spaceMemeber":"20",
                "spackCreationdate":"2015-03-01",
                "spackCreator":"xxxxx",
                "spackCrrentUpdate":"2016-03-01"
            }
        ],
        //我加入的
        followed:[
            {
                "spaceImg":"../assets/images/portal/coOrdination/u268.png",
                "spaceURL":"http://www.baidu.com",
                "spaceSubject":"1关于恳请向商务部亚",
                "spaceMemeber":"20",
                "spackCreationdate":"2015-01-01",
                "spackCreator":"xxxxx",
                "spackCrrentUpdate":"2016-01-01"
            },
            {
                "spaceImg":"../assets/images/portal/coOrdination/u268.png",
                "spaceURL":"http://www.baidu.com",
                "spaceSubject":"2关于恳请向商务部亚",
                "spaceMemeber":"20",
                "spackCreationdate":"2015-02-01",
                "spackCreator":"xxxxx",
                "spackCrrentUpdate":"2016-02-01"
            },
            {
                "spaceImg":"../assets/images/portal/coOrdination/u268.png",
                "spaceURL":"http://www.baidu.com",
                "spaceSubject":"3关于恳请向商务部亚",
                "spaceMemeber":"20",
                "spackCreationdate":"2015-03-01",
                "spackCreator":"xxxxx",
                "spackCrrentUpdate":"2016-03-01"
            }
        ],
        //公共的
        publicSpace:[
            {
                "spaceImg":"../assets/images/portal/coOrdination/u268.png",
                "spaceURL":"http://www.baidu.com",
                "spaceSubject":"aaa关于恳请向商务部亚洲司报送对韩合作情况报告的请示",
                "spaceMemeber":"20",
                "spackCreationdate":"2015-01-01",
                "spackCreator":"xxxxx",
                "spackCrrentUpdate":"2016-01-01"
            },
            {
                "spaceImg":"../assets/images/portal/coOrdination/u268.png",
                "spaceURL":"http://www.baidu.com",
                "spaceSubject":"bbb关于恳请向商务部亚洲司报送对韩合作情况报告的请示",
                "spaceMemeber":"20",
                "spackCreationdate":"2015-02-01",
                "spackCreator":"xxxxx",
                "spackCrrentUpdate":"2016-02-01"
            },
            {
                "spaceImg":"../assets/images/portal/coOrdination/u268.png",
                "spaceURL":"http://www.baidu.com",
                "spaceSubject":"ccc关于恳请向商务部亚洲司报送对韩合作情况报告的请示",
                "spaceMemeber":"20",
                "spackCreationdate":"2015-03-01",
                "spackCreator":"xxxxx",
                "spackCrrentUpdate":"2016-03-01"
            }
        ],
        //公共的
        publisssc:[

        ]
    },
    ready: function () {
        var _this=this;
        var fetchArray=["myOwner","","PUBLICREAD","PERSONALREAD"];
        var nameArray=["myOwner","followed","publicSpace"];

        for(var i=0,len=fetchArray.length+1 ;i<len;i++) {
            let url="";
            if(i==4){
                url = "http://bjecm.cnnp.com.cn/cnnpbpm/web/leaderCommentCollections.do?action=count";
            }else{
                url = "http://bjecm.cnnp.com.cn/cnnpbpm/web/getPortalWorklist.do?action=" + fetchArray[i] + "&count=8";
            }
            $.ajax({
                type: "get",
                dataType: "text",
                url: url,
                success: function (data,state,jqxhr) {
                    let index=jqxhr.index;
                        let jsonArray = JSON.parse(data);
                        _this[nameArray[index]]=jsonArray;
                    if(jqxhr.index==0)console.log(data)
                },
                error: function (err) {
                    console.log(err);
                }
            }).index=i;
        }
    }
    //methods:{
    //    myOwner:function(ev){
    //        alert(localStorage.getItem("userId"));
    //        $.ajax({
    //            type: "get",
    //            dataType: "jsonp",
    //            url: "http+"+localStorage.getItem("userId")+"myOwner",
    //            success: function (data, state, jqxhr) {
    //                alert(url);
    //                let index = jqxhr.index;
    //                let jsonArray = JSON.parse(data);
    //                myOwner = jsonArray;
    //                if (jqxhr.index == 0)console.log(data)
    //            },
    //            error: function (err) {
    //                console.log(err);
    //            }
    //        });
    //    },
    //    followed:function(ev,e){
    //        alert(localStorage.getItem("userId"));
    //        $.ajax({
    //            type: "get",
    //            dataType: "jsonp",
    //            url: "http+"+localStorage.getItem("userId")+"myOwner",
    //            success: function (data, state, jqxhr) {
    //                alert(url);
    //                let index = jqxhr.index;
    //                let jsonArray = JSON.parse(data);
    //                followed = jsonArray;
    //                if (jqxhr.index == 0)console.log(data)
    //            },
    //
    //            error: function (err) {
    //                console.log(err);
    //            }
    //        });
    //    },
    //    publicSpace:function(ev,e){
    //        alert(localStorage.getItem("userId"));
    //        $.ajax({
    //            type: "get",
    //            dataType: "text",
    //            url: url,
    //            success: function (data, state, jqxhr) {
    //                alert(url);
    //                let index = jqxhr.index;
    //                let jsonArray = JSON.parse(data);
    //                publicSpace = jsonArray;
    //                if (jqxhr.index == 0)console.log(data)
    //            },
    //
    //            error: function (err) {
    //                console.log(err);
    //            }
    //        });
    //    }
    //}
});