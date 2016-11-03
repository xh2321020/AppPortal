portalApp.controller("styleAdminCtrl", function($scope, $window, $http, PortalService, $timeout) {
      $scope.selectDate = {
            'listPortal': '',
            'addPortal': '',
            'style': '',
      };

      $scope.listClick = function(){
            $('#myTab a:first').tab('show');
      };

      $scope.styleOperate = function(index, operate){
            PortalService.sendPostRequest(PortalService.getHostName() + "/api/homepage/style/enable/" + $scope.styleList[index].id, '',function(response){
                  if(true){
                        PortalService.showAlert("操作成功");
                  }
                  if(operate == "start"){
                        for(var i = 0, j = $scope.styleList.length; i < j; i++){
                              $scope.styleList[i].status = 0;
                        }
                        $scope.styleList[index].status = 1;
                  } else if(operate == "stop"){
                        $scope.styleList[index].status = 0;
                  }
            });
      };

      $scope.addClick = function(isAdd, style){
            $scope.selectDate.addPortal = $scope.selectDate.listPortal;
            if(isAdd){
                  $scope.addPortalselect();
                  $scope.curStyle = {
                        "createuserid": "1234567",
                        "createusername": "sdfas",
                        "description": "",
                        "hpid": "",
                        "img": [
                              {
                                    "imgname": "http://www.baidu.com",
                                    "imgpath": "http://www.baidu.com",
                                    "styleid": "",
                                    "updatetime": ""
                              }
                        ],
                        "name": "",
                        "order": [],
                        "status": "0",
                        "updatetime": ""
                  };
            } else{
                  $scope.curStyle = style;
                  for(var i = 0, j = $scope.portalList.length; i < j; i++){
                        if($scope.curStyle.hpid == $scope.portalList[i].id){
                              $scope.selectDate.addPortal = $scope.portalList[i];
                        }
                  }
                  $scope.addPortalselect();
            }
            $('#myTab a:last').tab('show');
      };

      $scope.del = function(index){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/homepage/homepagestyle/edittype?type=del&styleid=" + $scope.styleList[index].id, function(response){
                  console.log(response);
                  PortalService.showAlert("操作成功");
                  $scope.styleList.splice(index, 1);
            });
      };

      var getStyleListData = function(hpid){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/homepage/style/" + hpid, function(response){
                  $scope.styleList = response;
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
                                          $scope.selectDate.listPortal = $scope.portalList[i];
                                    }
                              }
                              if(!isExist){
                                    $scope.portalSelect($scope.portalList[0]);
                                    $scope.selectDate.listPortal = $scope.portalList[0];
                              }
                        } else{
                              $scope.portalSelect($scope.portalList[0]);
                              $scope.selectDate.listPortal = $scope.portalList[0];
                        }
                  } else{
                        PortalService.showAlert("您目前没有新建任何门户，快试试去新建门户吧！");
                  }
            });
      };
      getPortalListData();

      $scope.portalSelect = function(portal){
            getStyleListData(portal.id);
            PortalService.setHpId(portal.id);
      };

      $scope.addPortalselect = function(){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/homepage/homepageform/?hpid=" + $scope.selectDate.addPortal.id, function(response) {
                  $scope.addStyleList = response;
            });
      };

      $scope.savStyle = function(callback){
            $scope.curStyle.hpid = $scope.selectDate.addPortal.id;
            var count = 1;
            $scope.curStyle.order = [];
            $("#multiselect_to option").each(function(){
                  for(var i = 0, j = $scope.addStyleList.length; i < j; i++){
                        if($scope.addStyleList[i].id == $(this).val()){
                              var order = {
                                    "formid": $scope.addStyleList[i].id,
                                    "orderid": count++,
                                    "styleid": $scope.addStyleList[i].styleid,
                              };
                              $scope.curStyle.order.push(order);
                        }
                  }
            });
            console.log($scope.curStyle);
            var requestUrl = PortalService.getHostName();
            if($scope.curStyle.id && $scope.curStyle.id != ""){
                  requestUrl += "/api/homepage/homepagestyle/edit";
            } else{
                  requestUrl += "/api/homepage/homepagestyle/add";
            }
            PortalService.sendPostRequest(requestUrl, $scope.curStyle, function(response){
                  console.log("curPortal:" + response);
                  if(true){
                        PortalService.showAlert("提交成功");
                        if(callback){
                              callback();
                        } else{
                              $scope.listClick();
                        }

                  }
            });
      };

      var initMultiSelect = function(){
            $('#multiselect').multiselect();
            $('.multiselect').multiselect();
            $('.js-multiselect').multiselect({
                  right: '#js_multiselect_to_1',
                  rightAll: '#js_right_All_1',
                  rightSelected: '#js_right_Selected_1',
                  leftSelected: '#js_left_Selected_1',
                  leftAll: '#js_left_All_1'
            });
      };
      initMultiSelect();

      var initFileUpload = function(){
            'use strict';
            var url = window.location.hostname === 'blueimp.github.io' ?
                '//jquery-file-upload.appspot.com/' : 'server/php/';
            $('#fileupload').fileupload({
                  url: url,
                  dataType: 'json',
                  done: function (e, data) {
                        $.each(data.result.files, function (index, file) {
                              $('<p/>').text(file.name).appendTo('#files');
                        });
                  },
                  progressall: function (e, data) {
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        $('#progress .progress-bar').css(
                            'width',
                            progress + '%'
                        );
                  }
            }).prop('disabled', !$.support.fileInput)
                .parent().addClass($.support.fileInput ? undefined : 'disabled');
      };
      initFileUpload();

      $scope.preview = function(){
            $scope.curStyle.hpid = $scope.selectDate.addPortal.id;
            var count = 1;
            $scope.curStyle.order = [];
            $("#multiselect_to option").each(function(){
                  for(var i = 0, j = $scope.addStyleList.length; i < j; i++){
                        if($scope.addStyleList[i].id == $(this).val()){
                              var order = {
                                    "formid": $scope.addStyleList[i].id,
                                    "orderid": count++,
                                    "styleid": $scope.addStyleList[i].styleid,
                              };
                              $scope.curStyle.order.push(order);
                        }
                  }
            });
            console.log($scope.curStyle);
            var requestUrl = PortalService.getHostName();
            if($scope.curStyle.id && $scope.curStyle.id != ""){
                  requestUrl += "/api/homepage/homepagestyle/edit";
            } else{
                  requestUrl += "/api/homepage/homepagestyle/add";
            }
            PortalService.sendPostRequest(requestUrl, $scope.curStyle, function(response){
                  console.log("curPortal:" + response);
                  if($scope.curStyle.id && $scope.curStyle.id != ""){
                        PortalService.showAlert("提交成功");
                        window.open("http://w3.cnnp.com.cn/pages/portal/index.html?style="  + $scope.curStyle.id, "_blank");
                  } else{
                        PortalService.showAlert("提交成功");
                        window.open("http://w3.cnnp.com.cn/pages/portal/index.html?style="  + response, "_blank");
                  }
            });
      };

      $scope.preview2 = function(id){
            window.open("http://w3.cnnp.com.cn/pages/portal/index.html?style="  + id, "_blank");
      };

      $scope.moveUp = function(){
            var index = document.getElementById('multiselect_to').options[document.getElementById('multiselect_to').selectedIndex].index;
            if(index > 0){
                  var option = document.getElementById('multiselect_to').options[index - 1];
                  document.getElementById('multiselect_to').options[index - 1] = document.getElementById('multiselect_to').options[index];
                  document.getElementById("multiselect_to").insertBefore(option, document.getElementById('multiselect_to').options[index]);
            }
      }

      $scope.moveDown = function(){
            var index = document.getElementById('multiselect_to').options[document.getElementById('multiselect_to').selectedIndex].index;
            if(index < ($scope.addStyleList.length  - 1)){
                  var option = document.getElementById('multiselect_to').options[index];
                  document.getElementById('multiselect_to').options[index] = document.getElementById('multiselect_to').options[index + 1];
                  document.getElementById("multiselect_to").insertBefore(option, document.getElementById('multiselect_to').options[index + 1]);
            }
      }
});