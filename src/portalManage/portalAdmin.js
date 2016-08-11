portalApp.controller("PortalAdminCtrl", function($scope, $window, $http, PortalService, $timeout) {
      $scope.listClick = function(){
            $('#myTab a:first').tab('show');
      };

      $scope.addClick = function(isAdd, portal){
            if(isAdd){
                  $scope.curPortal = {
                        "createuserid": "1234567",
                        "createusername": "asdfasd",
                        "description": "",
                        "hptype": "",
                        "name": "",
                        "status": "0",
                        "styleid": "",
                        "updatetime": "",
                        "webtype": "0",
                        "url": "",
                        "admin":[]
                  };
            } else{
                  $scope.curPortal = portal;
                  $("#portalType").val($scope.curPortal.hptype);
            }
            $('#myTab a:last').tab('show');
      };

      $scope.portalBuild = function(portal){

      };

      $scope.portalOperate = function(index, operate){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/V1.0/homepage/homepage/edittype?hpid=" + $scope.portalList[index].id + "&type=" + operate, function(response){
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
                  requestUrl += "/api/V1.0/homepage/homepage/edit";
            } else{
                  requestUrl += "/api/V1.0/homepage/homepage/add";
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

      $scope.addPeopleClick = function(){
            $scope.searchParams = {
                  "content": '',
                  "result": '',
            };
            $('#peopleSelectModal').modal('show');
      };

      $scope.addPeopleCancleClick = function(){
            $('#peopleSelectModal').modal('hide');
      };

      $scope.searchPeople = function(){
            PortalService.sendGetRequest(PortalService.getUserHostName() + 'api/contact/searchuser?apikey=e71982d5401b488da4acef8827c41845&id=&q=' + $scope.searchParams.content, function(response){
                  $scope.searchParams.result = response;
                  for (var i = 0, j = $scope.searchParams.result.length; i < j; i++) {
                        var people = $scope.searchParams.result[i];
                        var orgtree = people.orgtree;
                        var title = '';
                        if (orgtree) {
                              for (var orgi in orgtree) {
                                    for (var key in orgtree[orgi]){
                                          title += orgtree[orgi][key];
                                    }
                              }
                        }
                        people.orgtree = title;
                        people.isChecked = false;
                  }
            });
      };

      $scope.userClick = function(user){
            for (var i = 0, j = $scope.searchParams.result.length; i < j; i++) {
                  $scope.searchParams.result[i].isChecked = false;
            }
            user.isChecked = true;
            var admin = {
                  "hpid": 3,
                  "type": "",
                  "userid": user.uid,
                  "username": user.displayname,
                  "updatetime": "",
                  "columnid": "",
            };
            $scope.curPortal.admin.push(admin);
      };

      $scope.peopleConfig = function(){
            $('#peopleSelectModal').modal('hide');
      };

      var getPortalListData = function(){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/V1.0/homepage/homepage/" + PortalService.getUserId(), function(response){
                  console.log(response);
                  $scope.portalList = response;
            });
      };
      getPortalListData();
});