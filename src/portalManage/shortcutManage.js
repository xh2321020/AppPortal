portalApp.controller("PortalAdminCtrl", function($scope, $window, $http, PortalService, $timeout) {
      $scope.listClick = function(){
            $('#myTab a:first').tab('show');
      };

      $scope.addClick = function(isAdd, shortcut){
            if(isAdd){
                  $scope.curShortcut = {
                        "id": '',
                        "link": "",
                        "icoa": "",
                        "description": ""
                  };
            } else{
                  $scope.curShortcut = shortcut;
            }
            $('#myTab a:last').tab('show');
      };

      $scope.portalOperate = function(index, operate){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/homepage/homepage/edittype?hpid=" + $scope.portalList[index].id + "&type=" + operate, function(response){
                  console.log(response);
                  if(true){
                        PortalService.showAlert("操作成功");
                  }
                  if(operate == "del"){
                        $scope.portalList.splice(index, 1);
                  } else if(operate == "start"){
                        $scope.portalList[index].status = 0;
                  } else if(operate == "stop"){
                        $scope.portalList[index].status = 1;
                  }
            });
      };

      $scope.addPortal = function(){
            $scope.curPortal.webtype = $('input:radio:checked').val();
            $scope.curPortal.hptype = $("#portalType option:selected").val();
            var requestUrl = PortalService.getHostName();
            if($scope.curPortal.id && $scope.curPortal.id != ""){
                  requestUrl += "/api/homepage/homepage/edit";
            } else{
                  requestUrl += "/api/homepage/homepage/add";
            }
            PortalService.sendPostRequest(requestUrl, $scope.curPortal, function(response){
                  console.log("curPortal:" + response);
                  if(true){
                        PortalService.showAlert("提交成功");
                        $scope.listClick();
                        if($scope.curPortal.id && $scope.curPortal.id != ""){
                              getPortalListData();
                        }
                  }
            });
      };

      var getShortcutListData = function(){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/work/link?apikey=a16cb0c916404be78cb0805fefc7d26a", function(response){
                  console.log(response);
                  $scope.shortcutList = response;
                  for(var i = 0, j = $scope.shortcutList.length; i < j; i++){
                        if($scope.shortcutList[i].link.length > 30){
                              $scope.shortcutList[i].shortLink = $scope.shortcutList[i].link.substring(0, 50);
                        } else{
                              $scope.shortcutList[i].shortLink = $scope.shortcutList[i].link
                        }

                  }
            });
      };
      getShortcutListData();
});