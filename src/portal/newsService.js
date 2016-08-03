/**
 * Created by canice_yuan on 2016/6/28.
 */
var newsApp = angular.module("newsApp", []);

newsApp.service( 'NewsService', [ '$rootScope', '$http', function( $rootScope, $http) {
    //var hostName = 'http://172.16.51.137:8010/';
    var hostName = 'http://192.168.252.1:8000/';

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
            $http.post(hostName + url, params)
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
            $http.get(hostName + url, '')
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

        getUrlParamsString: function(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return '';
        },
    };

    return service;
}]);