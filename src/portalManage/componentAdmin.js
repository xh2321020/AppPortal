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
                  //getColumnListData(100);
                  $scope.addParams.columns[0] = "";
                  $scope.addParams.columns[1] = "";
                  $scope.addParams.columns[2] = "";
                  $scope.curComponent =
                  {
                        "hpid": '100',
                        "name": "",
                        "styleid": "",
                        "status": "",
                        "description": "",
                        "width": "",
                        "createuserid": '',
                        "createusername": '',
                        "top_color": "#00A2E5",
                        "formin": [{
                              "name": "",
                              "form_inid": "1",
                              "columnid": '',
                              "styleid": "",
                              "code": "",
                              "more_url": "http://10.15.251.110/pages/portal/news_more.html?type=",
                              "ismore": "1",
                              "url": "",
                              "content_type": "application/json",
                              "method": "get",
                              "payload": "",
                              "querystring": "&apikey=a16cb0c916404be78cb0805fefc7d26a"
                        },{
                              "name": "",
                              "form_inid": "2",
                              "columnid": '',
                              "styleid": "",
                              "code": "",
                              "more_url": "",
                              "ismore": "0",
                              "url": "",
                              "content_type": "application/json",
                              "method": "get",
                              "payload": "",
                              "querystring": ""
                        }, {
                              "name": "",
                              "form_inid": "3",
                              "columnid": '',
                              "styleid": "",
                              "code": "",
                              "more_url": "",
                              "ismore": "0",
                              "url": "",
                              "content_type": "application/json",
                              "method": "get",
                              "payload": "",
                              "querystring": ""
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
                        if($scope.curComponent.formin.length == 1){
                              var formin1 = {
                                    "name": "",
                                    "form_inid": "2",
                                    "columnid": '',
                                    "styleid": "",
                                    "code": "",
                                    "more_url": "",
                                    "ismore": "0",
                                    "url": "",
                                    "content_type": "",
                                    "method": "",
                                    "payload": "",
                                    "querystring": ""
                              };
                              $scope.curComponent.formin.push(formin1);
                        } else if($scope.curComponent.formin.length == 2){
                              var formin2 = [{
                                    "name": "",
                                    "form_inid": "2",
                                    "columnid": '',
                                    "styleid": "",
                                    "code": "",
                                    "more_url": "",
                                    "ismore": "0",
                                    "url": "",
                                    "content_type": "",
                                    "method": "",
                                    "payload": "",
                                    "querystring": ""
                              }, {
                                    "name": "",
                                    "form_inid": "3",
                                    "columnid": '',
                                    "styleid": "",
                                    "code": "",
                                    "more_url": "",
                                    "ismore": "0",
                                    "url": "",
                                    "content_type": "",
                                    "method": "",
                                    "payload": "",
                                    "querystring": ""
                              }];
                              $scope.curComponent.formin.push(formin2);
                        }
                  } else{
                        PortalService.showAlert("您还没有添加任何组件，快去试试添加门户吧!");
                  }
            }
            $('#myTab a:last').tab('show');
      };

      var getComponentListData = function(hpid){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/homepage/homepageform/?hpid=" + hpid, function(response){
                  $scope.componentList = response;
            });
      };

      $scope.componentDel = function(index){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/homepage/homepageform/del?formid=" + $scope.componentList[index].id, function(response){
                  console.log(response);
                  if(true){
                        PortalService.showAlert("操作成功");
                  }
                  $scope.componentList.splice(index, 1);
            });
      };

      var getColumnListData = function(hpid, callback){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/homepage/homepagecolumn/?hpid=" + hpid, function(response){
                  $scope.columnList = response;
                  if(callback){
                        callback();
                  }
            });
      };

      var getPortalListData = function(){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/homepage/homepage/" + PortalService.getUserId(), function(response){
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
            }else if($scope.addParams.pageNo == 2){
                  $scope.curComponent.formin.splice(2, 1);
            }
            for(var i = 0, j = $scope.curComponent.formin.length; i < j; i++){
                  $scope.curComponent.formin[i].columnid = $scope.addParams.columns[i].id;
            }
            $scope.curComponent.hpid = $scope.addParams.addHpid.id;

            var requestUrl = PortalService.getHostName();
            if($scope.curComponent.id && $scope.curComponent.id != ""){
                  requestUrl += "/api/homepage/homepageform/edit";
            } else{
                  requestUrl += "/api/homepage/homepageform/add";
            }
            PortalService.sendPostRequest(requestUrl, $scope.curComponent, function(response){
                  console.log("curComponent:" + response);
                  if(true){
                        PortalService.showAlert("新增成功");
                        $scope.listClick();
                        getComponentListData($scope.addParams.hpid.id);
                  }
            });
      };

      //var dataList = PortalService.getData();
      //var columnid = [17041,17043,17044,17045, 17046,17047,17048,17049, 17050,17051,17052,17053,17054,17055];
      //for(var i = 0, j = dataList.length; i < j; i++){
      //      var tmp = dataList[i];
      //      var url = tmp.SUBCARDS[0].DATASOURCE.URL;
      //      var data = {
      //            "hpid": 100,
      //            "name": tmp.SUBCARDS[0].SUBCARD_ZH,
      //            "styleid": "",
      //            "status": "2",
      //            "description": tmp.SUBCARDS[0].SUBCARD_ZH,
      //            "width": tmp.CARD_WIDTH,
      //            "createuserid": '1',
      //            "createusername": '1',
      //            "top_color": "#00A2E5",
      //            "formin": [{
      //                  "name": tmp.SUBCARDS[0].SUBCARD_ZH,
      //                  "form_inid": "1",
      //                  "columnid": columnid[i],
      //                  "styleid": tmp.SUBCARDS[0].SUBCARD_TYPE,
      //                  "code": "",
      //                  "more_url": "http://10.15.251.110/pages/portal/news_more.html?type=" + url.substring(url.indexOf("news/") + 5, url.indexOf("?")),
      //                  "ismore": "1",
      //                  "url": url,
      //                  "content_type": "application/json",
      //                  "method": "get",
      //                  "payload": "",
      //                  "querystring": "&apikey=a16cb0c916404be78cb0805fefc7d26a"
      //            }]
      //      };
      //      var requestUrl = PortalService.getHostName();
      //      requestUrl += "/api/homepage/homepageform/add";
      //      PortalService.sendPostRequest(requestUrl, data, function(response){
      //            console.log("curComponent:" + response);
      //            if(true){
      //                  PortalService.showAlert("新增成功");
      //            }
      //      });
      //}
});