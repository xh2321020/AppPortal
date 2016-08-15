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
                        "createuserid": PortalService.getCookie("userid"),
                        "createusername": PortalService.getCookie("name"),
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
                        "status": "",
                        "updatetime": ""
                  };
            } else{
                  $scope.curStyle = style;
            }
            $('#myTab a:last').tab('show');
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
            $("#multiselect_to option").each(function(){
                  for(var i = 0, j = $scope.addStyleList.length; i < j; i++){
                        if($scope.addStyleList[i].id == $(this).val()){
                              var order = {
                                    "formid": $scope.addStyleList[i].id,
                                    "orderid": count++,
                                    "styleid":  $scope.addStyleList[i].styleid,
                              };
                              $scope.curStyle.order.push(order);
                        }
                  }
            });
            console.log($scope.curStyle);
            PortalService.sendPostRequest(PortalService.getHostName() + "/api/homepage/homepagestyle/add", $scope.curStyle, function(response){
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
});