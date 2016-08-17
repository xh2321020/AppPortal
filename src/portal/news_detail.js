newsApp.controller("newsDetailAppCtrl", function($scope, $http, $sce, NewsService, $timeout) {

    var getNewsDetail = function(id){
        NewsService.sendGetRequest('/api/news/one?newid=' + id, function(response){
            $scope.newsDetail = response;
            $scope.newsDetail.content = $sce.trustAsHtml($scope.newsDetail.content);
            $timeout(
                function() {
                    if($scope.newsDetail.attachments){
                        for(var i = 0, j = $scope.newsDetail.attachments.length; i < j; i++){
                            var attachment = $scope.newsDetail.attachments[i];
                            //if(attachment.file_type == 'other' && attachment.name.indexOf(".mp4") > -1){
                            //    attachment.newUrl = attachment.path + ".mp4"
                            //}
                        }
                    }
                },
                100
            );
        });
    };

    var id = NewsService.getUrlParamsString('id');
    if(id && id.length > 0){
        getNewsDetail(id);
    } else{
        getNewsDetail(7493);
    }
});