newsApp.controller("newsDetailAppCtrl", function($scope, $http, $sce, NewsService, $timeout) {

    $scope.params = {
        'isShowAttach' : false,
        'isShowHeadPic' : true,
    };
    var getNewsDetail = function(id){
        NewsService.sendGetRequest('/api/news/one?newid=' + id, function(response){
            $scope.newsDetail = response;
            $scope.newsDetail.content = $sce.trustAsHtml($scope.newsDetail.content);
        });
    };

    var id = NewsService.getUrlParamsString('id');
    if(id && id.length > 0){
        $.ajax({
            type: "get",
            dataType: "json",
            contentType:'application/json; charset=utf-8;',
            url: 'http://10.15.251.110:8010/api/news/one?size=200&apikey=a16cb0c916404be78cb0805fefc7d26a&newid=' + id,
            success: function (response) {
                $scope.$apply(
                    function(){
                        $scope.newsDetail = response;
                        $scope.newsDetail.audit_date = $scope.newsDetail.audit_date.substring(0, $scope.newsDetail.audit_date.indexOf('.'))
                        for(var i = 0, j = 5; i < j; i++){
                            if($scope.newsDetail.content && $scope.newsDetail.content.length > 0 && $scope.newsDetail.content.indexOf('/publish2/attachment/show?fileId=') > 0){
                                $scope.newsDetail.content = $scope.newsDetail.content.replace('/publish2/attachment/show?fileId=', '/cnnp/publish2/attachment/'
                                    + $scope.newsDetail.content.substring($scope.newsDetail.content.indexOf('/publish2/attachment/show?fileId=')
                                        + '/publish2/attachment/show?fileId='.length, $scope.newsDetail.content.indexOf('/publish2/attachment/show?fileId=')
                                        + '/publish2/attachment/show?fileId='.length + 2) + '/');
                            }
                        }
                        $scope.newsDetail.content = $sce.trustAsHtml($scope.newsDetail.content);

                        if($scope.newsDetail.attachments && $scope.newsDetail.attachments.length > 0){
                            for(var i = 0, j = $scope.newsDetail.attachments.length; i < j; i++){
                                if($scope.newsDetail.attachments[i].file_from == '¸½¼þÇø'){
                                    $scope.params.isShowAttach = true;
                                }
                                if($scope.newsDetail.attachments[i].file_type == 'pdf'){
                                    $scope.params.isShowHeadPic = false;
                                }
                            }
                        }
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