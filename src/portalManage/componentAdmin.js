portalApp.controller("componentAdminCtrl", function($scope, $window, $http, PortalService, $timeout) {
      $scope.addParams = {
            'hpid': '',
            'addHpid': '',
            'pageNo': 1,
            'columns': [],
      };

      $scope.listClick = function(){
            $('#myTab a:first').tab('show');
      };

      $scope.addClick = function(isAdd, component){
            if(isAdd){
                  $scope.curComponent =
                  {
                      "hpid": '',
                      "name": "",
                      "styleid": "",
                      "status": "",
                      "description": "",
                      "width": "",
                      "createuserid": '',
                      "createusername": '',
                      "updatetime": "",
                      "formin": [{
                            "hpid": '',
                            "name": "",
                            "form_inid": "1",
                            "columnid": '',
                            "styleid": "",
                            "updatetime": "",
                            "imgname": "",
                            "imgpath": "",
                            "code": ""
                      },
                            {
                                  "hpid": '',
                                  "name": "",
                                  "form_inid": "2",
                                  "columnid": '',
                                  "styleid": "",
                                  "updatetime": "",
                                  "imgname": "",
                                  "imgpath": "",
                                  "code": ""
                            },
                            {
                                  "hpid": '',
                                  "name": "",
                                  "form_inid": "3",
                                  "columnid": '',
                                  "styleid": "",
                                  "updatetime": "",
                                  "imgname": "",
                                  "imgpath": "",
                                  "code": ""
                            }]
                  };
            } else{
                  $scope.addParams.addHpid = $scope.addParams.hpid;
                  $scope.addPortalSelect($scope.addParams.hpid
                      , function(){
                        for(var i = 0, j = component.formin.length; i < j; i++){
                              for(var m = 0, n = $scope.columnList.length; m < n; m++){
                                    if($scope.columnList[m].id = component.formin[i].columnid){
                                          $scope.addParams.columns[i] = $scope.columnList[m];
                                    }
                              }
                        }
                  });
                  if(component.formin.length > 1){
                        $scope.addParams.pageNo = component.formin.length;
                  }
                  if($scope.portalList.length > 0){
                        $scope.curComponent = component;
                        $scope.curComponent.hpid = $scope.portalList[0];
                        for(var i = 0, j = $scope.portalList.length; i < j; i++){
                              if(component.hpid == $scope.portalList[i].id){
                                    $scope.addParams.addHpid = $scope.portalList[i];
                              }
                        }
                  } else{
                        PortalService.showAlert("您还没有添加任何组件，快去试试添加门户吧!");
                  }
            }
            $('#myTab a:last').tab('show');
      };

      var getComponentListData = function(hpid){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/V1.0/homepage/homepageform/?hpid=" + hpid, function(response){
                  $scope.componentList = response;
            });
      };

      $scope.componentOperate = function(index, action){

      };

      var getColumnListData = function(hpid, callback){
            //门户0  栏目1
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/V1.0/homepage/homepagecolumn/?hpid=" + hpid + "&type=" + 1, function(response){
                  $scope.columnList = response;
                  if(callback){
                        callback();
                  }
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
      $(".big").simpleLightbox();

      $scope.portalSelect = function(portal){
            getComponentListData(portal.id);
      };

      $scope.addPortalSelect = function(portal, callback){
            getColumnListData(portal.id, callback);
      };

      $scope.pageNoSelect = function(no){
            $scope.addParams.pageNo = $("#pageNo option:selected").val();
      };

      $scope.addComponent = function(){
            if($scope.addParams.pageNo == 1){
                  $scope.curComponent.formin.splice(1, 2);
            }
            if($scope.addParams.pageNo == 2){
                  $scope.curComponent.formin.splice(2, 1);
            }
            for(var i = 0, j = $scope.curComponent.formin.length; i < j; i++){
                  $scope.curComponent.formin[i].columnid = $scope.addParams.columns[i].id;
            }
            $scope.curComponent.hpid = $scope.addParams.addHpid.id;
            PortalService.sendPostRequest(PortalService.getHostName() + "/api/V1.0/homepage/homepageform/add", $scope.curComponent, function(response){
                  console.log("curComponent:" + response);
                  if(true){
                        PortalService.showAlert("新增成功");
                        $scope.listClick();
                        getComponentListData($scope.addParams.hpid.id);
                  }
            });
      };
});