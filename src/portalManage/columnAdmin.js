portalApp.controller("columnAdminCtrl", function($scope, $window, $http, PortalService, $timeout) {
      $scope.addParams = {
            'hpid': '',
            'addHpid': '',
      };

      $scope.listClick = function(){
            $('#myTab a:first').tab('show');
      };

      $scope.addClick = function(isAdd, column){
            $scope.addParams.addHpid = $scope.addParams.hpid;
            if(isAdd){
                  $scope.curColumn = {
                      "auditor_ids": "",
                      "auditor_names": "",
                      "description": "",
                      "is_build": "",
                      "name": "",
                      "parent_id": 0,
                      "pre_view_name": "",
                      "seq": "",
                      "status": "2",
                      "version": ""
                  }
                  $('#myTab a:last').tab('show');
            } else{
                  $scope.curColumn = column;
                  if($scope.portalList.length > 0){
                        $('#myTab a:last').tab('show');
                  } else{
                        PortalService.showAlert("您还没有添加任何门户，快去试试添加门户吧!");
                  }
            }
      };

      var getColumnListData = function(hpid){
            //门户0  栏目1
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/homepage/homepagecolumn/?hpid=" + hpid, function(response){
                  $scope.columnList = response;
            });
      };

      var getPortalListData = function(){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/homepage/homepage/" + PortalService.getUserId(), function(response){
                  $scope.portalList = response;
                  if($scope.portalList.length > 0){
                        var hpId = PortalService.getHpId();
                        if(hpId && hpId.length > 0){
                              var isExist = false;
                              for(var i = 0, j = $scope.portalList.length; i < j; i++){
                                    if($scope.portalList[i].id == hpId){
                                          isExist = true;
                                          $scope.portalSelect($scope.portalList[i]);
                                          $scope.addParams.hpid = $scope.portalList[i];
                                    }
                              }
                              if(!isExist){
                                    $scope.portalSelect($scope.portalList[0]);
                                    $scope.addParams.hpid = $scope.portalList[0];
                              }
                        } else{
                              $scope.portalSelect($scope.portalList[0]);
                              $scope.addParams.hpid = $scope.portalList[0];
                        }
                  } else{
                        PortalService.showAlert("您目前没有新建任何门户，快试试去新建门户吧！");
                  }
            });
      };
      getPortalListData();

      $scope.portalSelect = function(portal){
            getColumnListData(portal.id);
            PortalService.setHpId(portal.id);
      };

      $scope.columnOperate = function(index, operate){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/homepage/homepagecolumn/edittype?hpid="
                + $scope.addParams.hpid.id +"&columnid=" + $scope.columnList[index].id + "&type=" + operate, function(response){
                  console.log(response);
                  if(true){
                        PortalService.showAlert("操作成功");
                  }
                  if(operate == "del"){
                        $scope.columnList.splice(index, 1);
                  } else if(operate == "start"){
                        $scope.columnList[index].status = 2;
                  } else if(operate == "stop"){
                        $scope.columnList[index].status = 0;
                  }
            });
      };

      $scope.addColumn = function(){
            //$scope.curColumn.type = $scope.addParams.addHpid.hptype;
            $scope.curColumn.parent_id = $scope.addParams.addHpid.id;

            var requestUrl = PortalService.getHostName();
            if($scope.curColumn.id && $scope.curColumn.id != ""){
                  requestUrl += "/api/homepage/homepagecolumn/edit";
            } else{
                  requestUrl += "/api/homepage/homepagecolumn/add";
            }
            PortalService.sendPostRequest(requestUrl, $scope.curColumn, function(response){
                  console.log("curColumn:" + response);
                  if(true){
                        PortalService.showAlert("新增成功");
                        $scope.listClick();
                        getColumnListData($scope.addParams.hpid.id);
                  }
            });
      };
});