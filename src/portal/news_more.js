var newsList = [];
var curNewList = [];

var newsApp =  new Vue({
    el: '#newsApp',
    data: {
        curPageIndex: 1,
        curIndex: 1,
        newsListLength: 0,
        pageSize: 0,
        newsList: newsList,
        curNewList: curNewList,
    },
    methods: {
        pageClick: function (pageNo) {
            pageNo = pageNo + (newsApp.curPageIndex - 1) * 10 + 1;
            newsApp.curIndex = pageNo;
            newsApp.curNewList = newsApp.newsList.slice((pageNo - 1) * 20, pageNo * 20);
            var str;
            for (var i = 0, j = $(".pagination li").length; i < j; i++) {
                str = '.pagination li:eq(' + i + ')';
                $(str).removeClass("active");
            }
            str = '.pagination li:eq(' + pageNo + ')';
            $(str).addClass("active");
        },
        newsClick: function(id){
            window.open('/pages/portal/news_detail.html?id=' + id);
        },
        preClick: function () {
            if(newsApp.curPageIndex > 1){
                newsApp.curPageIndex--;
            }
        },
        nextClick: function () {
            if(newsApp.curPageIndex < newsApp.pageSize / 10){
                newsApp.curPageIndex++;
            }
        },
    },
});

var getUrlParamsString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
};

var getNewsList = function(type){
    $.ajax({
        type: "get",
        dataType: "json",
        contentType:'application/json; charset=utf-8;',
        url: 'http://10.15.251.110:8010/api/news/' + type + '?size=1000&apikey=a16cb0c916404be78cb0805fefc7d26a',
        success: function (data) {
            newsApp.newsList = data;
            newsApp.newsListLength = data.length;
            newsApp.pageSize = newsApp.newsListLength / 20 > parseInt(newsApp.newsListLength / 20) + 1 ? parseInt(newsApp.newsListLength / 20) + 1 : parseInt(newsApp.newsListLength / 20);
            newsApp.curNewList = newsApp.newsList.slice(0, 20);
        },
        error: function (err) {
            console.log(err);
        }
    });
};

var type = getUrlParamsString('type');
if(type && type.length > 0){
    getNewsList(type);
} else{
    getNewsList(1);
}
