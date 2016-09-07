var cloumnList = [];
var newsDetil = {};
var curCloumnId = "";

var newsApp =  new Vue({
    el: '#newsApp',
    data: {
        cloumnList: cloumnList,
        newsDetil: newsDetil,
    },
    methods: {
    },
});

function obj2str(o){
    var r = [];
    if(typeof o =="string") return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
    if(typeof o =="undefined") return "";
    if(typeof o == "object"){
        if(o===null) return "\"\"";
        else if(!o.sort){
            for(var i in o)
                r.push("\"" + i + "\"" + ":"+obj2str(o[i]))
            r="{"+r.join()+"}"
        }else{
            for(var i =0;i<o.length;i++)
                r.push(obj2str(o[i]))
            r="["+r.join()+"]"
        }
        return r;
    }
    return o.toString();
}

function cloumnClick(self){
    var index = $(self).index();
    curCloumnId = newsApp.cloumnList[index].id;
    $(".ul-org li").each(function () {
        var curIndex = $(this).index();
        if(index == curIndex){
            $(this).find("span").removeClass("span-org");
            $(this).find("span").addClass("span-org-selected");
        } else{
            $(this).find("span").removeClass("span-org-selected");
            $(this).find("span").addClass("span-org");
        }
    });
};

function publish(){
    newsApp.newsDetil.cat_id = curCloumnId;
    newsApp.newsDetil.att = newsApp.newsDetil.attachments;
    $.ajax({
        type: "post",
        dataType: "json",
        data: obj2str(newsApp.newsDetil),
        contentType:'application/json',
        url: 'http://172.16.51.137:8010/api/news/add?apikey=e71982d5401b488da4acef8827c41845',
        success: function (data) {
            $.blockUI({
                message: '祝贺你，投稿成功！',
                timeout: 1200,
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
        },
        error: function (err) {
            $.blockUI({
                message: '很遗憾，投稿失败！',
                timeout: 1200,
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
    });
};

var getCloumnList = function(){
    $.ajax({
        type: "get",
        dataType: "json",
        contentType:'application/json; charset=utf-8;',
        url: 'http://10.15.251.110:8010/api/homepage/homepageform/?hpid=100&apikey=a16cb0c916404be78cb0805fefc7d26a',
        success: function (data) {
            newsApp.cloumnList = data;
            for(var i = 0, j = newsApp.cloumnList.length; i < j; i++){
                if(i == 0){
                    curCloumnId = newsApp.cloumnList[i].id;
                    newsApp.cloumnList[i].isSelected = true;
                } else{
                    newsApp.cloumnList[i].isSelected = false;
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
};

var getNewsDetail = function(id){
    $.ajax({
        type: "get",
        dataType: "json",
        contentType:'application/json; charset=utf-8;',
        url: 'http://10.15.251.110:8010/api/news/one?newid=' + id + '&apikey=a16cb0c916404be78cb0805fefc7d26a',
        success: function (data) {
            newsApp.newsDetil = data;
        },
        error: function (err) {
            console.log(err);
        }
    });
};

var getUrlParamsString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
};

var id = getUrlParamsString('id');
if(id && id.length > 0){
    getNewsDetail(id);
} else{
    getNewsDetail('7493');
}

getCloumnList();
