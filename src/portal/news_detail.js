newsApp.controller("newsDetailAppCtrl", function($scope, $http, $sce, NewsService) {

    var getNewsDetail = function(id){
        NewsService.sendGetRequest('api/v1.0/news/one?newid=' + id, function(response){
            $scope.newsDetail = response;
            $scope.newsDetail.content = $sce.trustAsHtml($scope.newsDetail.content);
            if($scope.newsDetail.attachments){
                for(var i = 0, j = $scope.newsDetail.attachments.length; i < j; i++){
                    var attachment = $scope.newsDetail.attachments[i];
                    if(attachment.file_type == 'pdf'){
                        attachment.url = 'assets/css/portal/IFC.pdf';
                    } else if(attachment.file_type == 'jpg'){
                        attachment.url = "http://bjecm.cnnp.com.cn/" + attachment.url;
                        //attachment.url = "http://172.16.51.144/assets/images/default-pics/0.png";
                    }
                }
            }
        });
    };

    var id = NewsService.getUrlParamsString('id');
    if(id && id.length > 0){
        getNewsDetail(id);
    } else{
        getNewsDetail(7493);
    }
});