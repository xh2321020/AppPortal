newsApp.controller("newsDetailAppCtrl", function($scope, $http, $sce, NewsService, $timeout) {

    var getNewsDetail = function(id){
        NewsService.sendGetRequest('/api/news/one?newid=' + id, function(response){
            $scope.newsDetail = response;
            $scope.newsDetail.content = $sce.trustAsHtml($scope.newsDetail.content);
        });
    };

    var id = NewsService.getUrlParamsString('id');
    if(id && id.length > 0){
        //alert("id:" + id);
        $.ajax({
            type: "get",
            dataType: "json",
            contentType:'application/json; charset=utf-8;',
            url: 'http://10.15.251.110:8010/api/news/one?size=200&apikey=a16cb0c916404be78cb0805fefc7d26a&newid=' + id,
            success: function (response) {
                $scope.$apply(
                    function(){
                        $scope.newsDetail = response;
                        $scope.newsDetail.content = $sce.trustAsHtml($scope.newsDetail.content);
                    }
                );
            }, error: function (err) {
                console.log(err);
            }
        });
    } else{
        getNewsDetail(7493);
    }
});