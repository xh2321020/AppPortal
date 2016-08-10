/**
 * Created by canice_yuan on 2016/6/28.
 */
var portalApp = angular.module("portalApp", []);

portalApp.service( 'PortalService', [ '$rootScope', '$http', '$timeout', function( $rootScope, $http, $timeout) {
    //var configHostName = 'http://192.168.252.1:8000';
    var configHostName = 'http://172.16.51.144:8000/';
    var userHostName = 'http://172.16.51.137:8010/';
    var userId = '1234567';

    var showAlert = function(content){
        $.blockUI({
            message: content,
            timeout: 1200,
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });
    };

    var showLoading = function(content){
        $.blockUI({ message: content,
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });
    };

    var service = {
        sendPostRequest: function(url, params, callback){
            showLoading('数据提交中，请稍候...');
            $http.post(url, params)
                .success(function(response){
                    $.unblockUI();
                    console.log(url + ':' + response);
                    callback(response);
                }
            )
                .error(function(){
                    $.unblockUI();
                    console.log('error params:' + JSON.stringify(params));
                    showAlert('数据提交失败，请重试！');
            });
        },

        sendGetRequest: function(url, callback){
            showLoading('数据获取中，请稍候...');
            $http.get(url, '')
                .success(function(response){
                    $.unblockUI();
                    console.log(url + ':' + response);
                    callback(response);
                }
            )
                .error(function(){
                    $.unblockUI();
                    showAlert('数据获取失败，请重试！');
                });
        },

        showAlert: function(content){
            showAlert(content);
        },

        getUserId: function(){
            return userId;
        },

        getHostName: function(){
            return configHostName;
        },

        getUserHostName: function(){
            return userHostName;
        },
        getCookie: function(name) {
            var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr = document.cookie.match(reg)){
            } else{
                return null;
            }
        },
    };

    return service;
}]);