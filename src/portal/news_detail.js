newsApp.controller("newsDetailAppCtrl", function($scope, $http, $sce, NewsService, $timeout) {

    var getNewsDetail = function(id){
        NewsService.sendGetRequest('api/v1.0/news/one?newid=' + id, function(response){
            $scope.newsDetail = response;
            $scope.newsDetail.content = $sce.trustAsHtml($scope.newsDetail.content);
            $timeout(
                function() {
                    if($scope.newsDetail.attachments){
                        for(var i = 0, j = $scope.newsDetail.attachments.length; i < j; i++){
                            var attachment = $scope.newsDetail.attachments[i];
                            attachment.url = "http://bjecm.cnnp.com.cn/" + attachment.url;
                            if(attachment.file_type == 'pdf'){
                                //attachment.url = "http://172.16.51.144/assets/css/portal/IFC.pdf";
                                var id = "#" + attachment.id;
                                $(id).attr("src", attachment.url);
                            } else if(attachment.file_type == 'jpg'){
                                //attachment.url = "http://bjecm.cnnp.com.cn/" + attachment.url;
                                //attachment.url = "http://172.16.51.144/assets/images/default-pics/0.png";
                            }
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