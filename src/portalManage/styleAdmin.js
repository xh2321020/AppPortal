portalApp.controller("styleAdminCtrl", function($scope, $window, $http, PortalService, $timeout) {
      $scope.selectDate = {
            'listPortal': '',
            'addPortal': '',
            'style': '',
      };

      $scope.listClick = function(){
            $('#myTab a:first').tab('show');
      };

      $scope.addClick = function(isAdd, style){
            if(isAdd){
                  $scope.curStyle = {
//                        "createuserid": PortalService.getCookie("userid"),
//                        "createusername": PortalService.getCookie("name"),
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
                        "status": "1",
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
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/homepage/homepagestyle/" + hpid, function(response){
                  $scope.styleList = response;
            });
      };

      var getPortalListData = function(){
            PortalService.sendGetRequest(PortalService.getHostName() + "/api/homepage/homepage/" + PortalService.getUserId(), function(response){
                  $scope.portalList = response;
                  if($scope.portalList.length > 0){
                        $scope.portalSelect($scope.portalList[0]);
                        $scope.selectDate.listPortal = $scope.portalList[0];
                  } else{
                        PortalService.showAlert("您目前没有新建任何门户，快试试去新建门户吧！");
                  }
            });
      };
      getPortalListData();

      $scope.portalSelect = function(portal){
            getStyleListData(portal.id);
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
            // Change this to the location of your server-side upload handler:
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
            $scope.savStyle(function(){
                  window.open("pages/portal/index.html?type=" + $scope.selectDate.addPortal.hptype + "&node=" + $scope.selectDate.addPortal.id)
            });
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
            var index = document.getElementById('multiselect').options[document.getElementById('multiselect').selectedIndex].index;
            if(index < ($scope.addStyleList.length  - 1)){
                  var option = document.getElementById('multiselect_to').options[index];
                  document.getElementById('multiselect_to').options[index] = document.getElementById('multiselect_to').options[index + 1];
                  document.getElementById("multiselect_to").insertAfter(option, document.getElementById('multiselect_to').options[index]);
            }
      }
});