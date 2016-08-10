portalApp.controller("columnAdminCtrl", function($scope, $window, $http, PortalService, $timeout) {
      $scope.addParams = {
            'hpid': '',
            'addHpid': '',
      };

      $scope.listClick = function(){
            $('#myTab a:first').tab('show');
      };

      $scope.addClick = function(isAdd, column){
            if(isAdd){
                  $scope.curColumn = {
                        "admin": [],
                        "createuserid": "1234567",
                        "createusername": "asdfasdf",
                        "description": "",
                        "hpid": "",
                        "name": "",
                        "status": "0",
                        "type": "",
                        "updatetime": ""
                  };
                  $scope.addParams.addHpid = $scope.portalList[0];
                  $('#myTab a:last').tab('show');
            } else{
                  if($scope.portalList.length > 0){
                        var tmp = column;
                        $scope.curColumn = tmp;
                        for(var i = 0, j = $scope.portalList.length; i < j; i++){
                              if(column.hpid == $scope.portalList[i].id){
                                    $scope.addParams.addHpid = $scope.portalList[i];
                              }
                        }
                        $('#myTab a:last').tab('show');
                  } else{
                        PortalService.showAlert("您还没有添加任何门户，快去试试添加门户吧!");
                  }
            }
      };

      var getColumnListData = function(hpid, type){
            //门户0  栏目1
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/V1.0/homepage/homepagecolumn/?hpid=" + hpid + "&type=" + type, function(response){
                  $scope.columnList = response;
            });
      };

      var getPortalListData = function(){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/V1.0/homepage/homepage/" + PortalService.getUserId(), function(response){
                  $scope.portalList = response;
                  if($scope.portalList.length > 0){
                        $scope.portalSelect($scope.portalList[0]);
                        $scope.addParams.hpid = $scope.portalList[0];
                  } else{
                        PortalService.showAlert("您目前没有新建任何门户，快试试去新建门户吧！");
                  }
            });
      };
      getPortalListData();

      $scope.portalSelect = function(portal){
            getColumnListData(portal.id, 1);
      };

      $scope.columnOperate = function(index, operate){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/V1.0/homepage/homepagecolumn/edittype?hpid="
                + $scope.addParams.hpid.id +"&columnid=" + $scope.columnList[index].id + "&type=" + operate, function(response){
                  console.log(response);
                  if(true){
                        PortalService.showAlert("操作成功");
                  }
                  if(operate == "del"){
                        $scope.columnList.splice(index, 1);
                  } else if(operate == "start"){
                        $scope.columnList[index].status = 0;
                  } else if(operate == "stop"){
                        $scope.columnList[index].status = 1;
                  }
            });
      };

      $scope.addColumn = function(){
            $scope.curColumn.type = $scope.addParams.addHpid.hptype;
            $scope.curColumn.hpid = $scope.addParams.addHpid.id;
            PortalService.sendPostRequest(PortalService.getHostName() + "/api/V1.0/homepage/homepagecolumn/add", $scope.curColumn, function(response){
                  console.log("curColumn:" + response);
                  if(true){
                        PortalService.showAlert("新增成功");
                        $scope.listClick();
                        getColumnListData($scope.addParams.hpid.id, 1);
                  }
            });
      };
});