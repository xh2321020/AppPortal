var newsDetailApp = angular.module("newsDetailApp", []);

newsDetailApp.controller("newsDetailAppCtrl", function($scope, $http, $sce) {
      var hostName = 'http://192.168.252.1:8000/';

      $http.get(hostName + 'api/v1.0/news/one?newid=' + '7493', '').success(function(response){
                console.log('result:' + ':' + response);
                $scope.newsDetail = response;
                $scope.newsDetail.content = $sce.trustAsHtml($scope.newsDetail.content);
                for(var i = 0, j = $scope.newsDetail.attachments.length; i < j; i++){
                    var attachment = $scope.newsDetail.attachments[i];
                    if(attachment.file_type == 'pdf'){
                        attachment.url = 'assets/css/portal/IFC.pdf';
                    } else if(attachment.file_type == 'jpg'){
                        //attachment.url = "http://bjecm.cnnp.com.cn/" + attachment.url;
                        attachment.url = "http://172.16.51.144/assets/images/default-pics/0.png";
                    }
                }
          }
      );

});