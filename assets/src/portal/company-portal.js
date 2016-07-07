/**
 * Created by Mattia on 2016/5/26.
 */
//window.$=require("jquery")
//    alert(11)
var Vue = require("vue");
var navLink = new Vue({
    el: "#article",
    data: {
        scrollList: [{
            "title": "【卓越文化】中国核电卓越文化体系手册",
            "subTitle": "核电厂统一内容管理平台项目N1ECM_工作流模块",
            "author": null,
            "site": "福清核电站",
            "publishDate": "2016-04-07",
            "priority": null,
            "imagePath": "/AppPortal/assets/images/portal/u347.jpg",
            "belongCard": null
        }, {
            "title": "【卓越文化】中国核电卓越文化体系手册",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2016-04-07",
            "priority": null,
            "imagePath": null,
            "belongCard": null
        },  {
            "title": "10 漳州核电彭科夫（优秀奖，《激扬青春，织梦核电》《Globalization》）",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2014-04-25",
            "priority": null,
            "imagePath": "/attachment/show?fileId=6914",
            "belongCard": null
        }, {
            "title": "09 江苏核电王楠(优秀奖，《走改革之路，建和谐田湾》《Our Journey Will Never End》",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2014-04-25",
            "priority": null,
            "imagePath": "/attachment/show?fileId=6916",
            "belongCard": null
        }, {
            "title": " 08 中核运行金磊（三等奖，《用青春描绘改革的画卷》《The Secret Of Being Forever Young》）",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2014-04-25",
            "priority": null,
            "imagePath": "/attachment/show?fileId=6919",
            "belongCard": null
        }, {
            "title": "07 海南核电刘芳（三等奖，《让青春在改革的大道上流光溢彩》《Reforming And Innovating,We Are On The Road All The Time》）",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2014-04-25",
            "priority": null,
            "imagePath": "/attachment/show?fileId=6921",
            "belongCard": null
        }, {
            "title": "06 江苏核电程曦冉(三等奖，《让青春在核电事业里闪亮》《Youth Glittering In Nuclear Power Career》",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2014-04-25",
            "priority": null,
            "imagePath": "/attachment/show?fileId=6924",
            "belongCard": null
        }, {
            "title": "05 三门核电陈云飞（三等奖、《青春与梦想》《A Story Of A Nuclear Man》）",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2014-04-25",
            "priority": null,
            "imagePath": "/attachment/show?fileId=6926",
            "belongCard": null
        }, {
            "title": "04 福清核电冯予(二等奖，《当你老了》《Flying Youth,Master Our Future》）",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2014-04-25",
            "priority": null,
            "imagePath": "/attachment/show?fileId=6928",
            "belongCard": null
        }, {
            "title": " 03  中核辽宁核电张博（二等奖，《我的核电梦》《Contribute To CNLN With Excellence》",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2014-04-25",
            "priority": null,
            "imagePath": "/attachment/show?fileId=6931",
            "belongCard": null
        }, {
            "title": "02 中核运行郑宗宇（二等奖，《用青春点亮核电梦》《Nuclear Power：The Career I Choose To Offer All My Youth》）",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2014-04-25",
            "priority": null,
            "imagePath": "/attachment/show?fileId=6933",
            "belongCard": null
        }, {
            "title": "01 中核运行石进（一等奖，《历史由我们书写》《Back To The Future》",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2014-04-25",
            "priority": null,
            "imagePath": "/attachment/show?fileId=6935",
            "belongCard": null
        }, {
            "title": " 福清核电副总工毕宏达点评",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2014-04-25",
            "priority": null,
            "imagePath": "/attachment/show?fileId=6906",
            "belongCard": null
        }, {
            "title": "江苏核电“两学一做”动员会：用学习教育成效破解公司发展难题",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2016-05-27",
            "priority": null,
            "imagePath": null,
            "belongCard": null
        }, {
            "title": "田湾核电站5、6号机组建设项目（江苏省十大重点工程）劳动竞赛正式启动",
            "subTitle": null,
            "author": null,
            "site": null,
            "publishDate": "2016-05-27",
            "priority": null,
            "imagePath": null,
            "belongCard": null
        }],
        nuclearTrend:[
            {title:"中国核电更正公告",date:"2016-03-31"},
            {title:"中国核电更正公告",date:"2016-03-31"},
            {title:"中国核电更正公告",date:"2016-03-31"},
            {title:"中国核电更正公告",date:"2016-03-31"},
            {title:"中国核电更正公告",date:"2016-03-31"}
        ],
        bulletin:[
            {title:"中国核电更正公告",date:"2016-03-31"},
            {title:"中国核电更正公告",date:"2016-03-31"},
            {title:"中国核电更正公告",date:"2016-03-31"},
            {title:"中国核电更正公告",date:"2016-03-31"},
            {title:"中国核电更正公告",date:"2016-03-31"},
            {title:"中国核电更正公告",date:"2016-03-31"},
            {title:"中国核电更正公告",date:"2016-03-31"},
            {title:"中国核电更正公告",date:"2016-03-31"},
            {title:"中国核电更正公告",date:"2016-03-31"}
        ],
        cultureColumn:[
            {url:"http://bjecm.cnnp.com.cn/publish2/newsShow/list?catId=17034",
                imgPath:"/AppPortal/assets/images/portal/u224.png"},
            {url:"http://bjecm.cnnp.com.cn/publish2/newsShow/list?catId=17034",
                imgPath:"/AppPortal/assets/images/portal/u226.png"},
            {url:"http://bjecm.cnnp.com.cn/publish2/newsShow/list?catId=17034",
                imgPath:"/AppPortal/assets/images/portal/u228.png"}
        ]

    },
    ready:function(){
        $.ajax({
            type:"get",
            dataType:"jsonp",
            url:"http://social.au-syd.mybluemix.net/news/7?size=20",
            //data:{},back:"?
            jsonp:"",
            jsonpCallback:"?",
            success:function(data){
                alert(JSON.stringify(data))
            },
            error:function(err){
                console.log(err)
            }
        });
    },
    methods:{
        scrollPanel:function(ev){
            var btn=ev.currentTarget;
            var list=this.scrollList;
         /*   var panel=$(document.getElementById("scrollList"));
            var isUp=$(btn).hasClass("up");
            if(isUp){
                panel.animate({top:panel.position().top-115+"px"},"fast");
            }else{
                panel.animate({top:panel.position().top+115+"px"},"fast");
            }*/
            var panel=document.getElementById("scrollList");
            var index=parseInt(panel.getAttribute("data-index"));
            var isUp=$(btn).hasClass("up");
            if(isUp&&index>0){
                  $(panel.children[index-1]).show(100);
                panel.setAttribute("data-index",index-1);
            }else if(!isUp&&index<list.length-4){
                $(panel.children[index]).hide(100);
                panel.setAttribute("data-index",index+1);
            }
        },
        scrollPanelLocation:function(ev){
            var btn=ev.currentTarget;
            var list=this.scrollList;
            /*   var panel=$(document.getElementById("scrollList"));
             var isUp=$(btn).hasClass("up");
             if(isUp){
             panel.animate({top:panel.position().top-115+"px"},"fast");
             }else{
             panel.animate({top:panel.position().top+115+"px"},"fast");
             }*/
            var panel=document.getElementById("scrollList");
            var index=parseInt(panel.getAttribute("data-index"));
            var isUp=$(btn).hasClass("up");
            if(isUp&&index>0){
                $(panel.children[index-1]).show(100);
                panel.setAttribute("data-index",index-1);
            }else if(!isUp&&index<list.length-4){
                $(panel.children[index]).hide(100);
                panel.setAttribute("data-index",index+1);
            }
        }
    }
});