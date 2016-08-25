var newsList = [];
var curNewList = [];

var newsApp =  new Vue({
    el: '#newsApp',
    data: {
        newsList: newsList,
        curNewList: curNewList,
    },
    methods: {
        pageClick: function (pageNo) {
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
    },
});

var getUrlParamsString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
};

var getSearchNewsList = function(str){
    alert("getSearchNewsList:" + str);
};

var keyWords = getUrlParamsString('keyWords');
if(keyWords && keyWords.length > 0){
    setTimeout(function(){
        $.ajax({
            type: "get",
            dataType: "json",
            contentType:'application/json; charset=utf-8;',
            url: 'http://10.15.251.110:8010/api/news/search?title=' + encodeURI(keyWords) + '&size=200&apikey=a16cb0c916404be78cb0805fefc7d26a',
            success: function (data) {
                newsApp.newsList = data;
                newsApp.curNewList = newsApp.newsList.slice(0, 20);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }, 1000);
} else{
    getSearchNewsList('能源');
}
