/**
 * Created by canice_yuan on 2016/6/28.
 */
var portalApp = angular.module("portalApp", []);

portalApp.service( 'PortalService', [ '$rootScope', '$http', '$timeout', function( $rootScope, $http, $timeout) {
//    var configHostName = 'http://172.16.51.144:8000';
	var configHostName = "http://10.15.251.110:8010";
    var configHostName = "http://w3.cnnp.com.cn:8010";
//    var userHostName = 'http://172.16.51.137:8010/';
    var userHostName = configHostName;
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
            $http.post(url + "?apikey=a16cb0c916404be78cb0805fefc7d26a", params)
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
            if(url.indexOf("apikey") < 0){
            	if(url.indexOf("?") < 0){
            		url = url + "?apikey=a16cb0c916404be78cb0805fefc7d26a"
            	} else{
            		url = url + "&apikey=a16cb0c916404be78cb0805fefc7d26a"
            	}
            }
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
        setHpId: function(id){
            window.localStorage.setItem("CNNP_ECM_HPID", id);
        },
        getHpId: function(){
            return window.localStorage.getItem("CNNP_ECM_HPID");
        },
        getData: function(){
          return [{
              PortalName_EN:"企业门户",
              CARD_GROUP:"",
              CARD_INDEX:0,
              CARD_WIDTH:"2",
              CARD_TOP_COLOR:"#00A2E5",
              SUBCARDS:[{
                  SUBACARD_EN:"",
                  SUBCRD_ZH:"经验反馈",
                  SUBCARD_TYPE:"style1",
                  SUBCARD_ISMORE:"0",
                  SUBCARD_MORE_URL:"",
                  SUBCARD_INDEX:"0",
                  DATASOURCE:{
                      URL:"http://10.15.251.110:8010/api/news/2?size=4",
                      METHOD:"get",
                      CONTENT_TYPE:"application/json",
                      PAYLOAD:"",
                      QueryString:"&apikey=a16cb0c916404be78cb0805fefc7d26a"
                  }
              }]

          },
              {
                  PortalName_EN:"企业门户",
                  CARD_GROUP:"",
                  CARD_INDEX:1,
                  CARD_WIDTH:"1",
                  CARD_TOP_COLOR:"#00A2E5",
                  SUBCARDS:[{
                      SUBCARD_EN:"",
                      SUBCARD_ZH:"门户热点",
                      SUBCARD_TYPE:"style2",
                      SUBCARD_ISMORE:"1",
                      SUBCARD_MORE_URL:"",
                      SUBCARD_INDEX:"1",
                      DATASOURCE:{
                          URL:"http://10.15.251.110:8010/api/news/9999?size=10",
                          METHOD:"get",
                          CONTENT_TYPE:"application/json",
                          PAYLOAD:"",
                          QueryString:"&apikey=a16cb0c916404be78cb0805fefc7d26a"
                      }
                  }]

              },
              {
                  PortalName_EN:"企业门户",
                  CARD_GROUP:"",
                  CARD_INDEX:2,
                  CARD_WIDTH:"1",
                  CARD_TOP_COLOR:"#00A2E5",
                  SUBCARDS:[{
                      SUBCARD_EN:"",
                      SUBCARD_ZH:"中国核电动态",
                      SUBCARD_TYPE:"style3",
                      SUBCARD_ISMORE:"1",
                      SUBCARD_MORE_URL:"",
                      SUBCARD_INDEX:"1",
                      DATASOURCE:{
                          URL:"http://10.15.251.110:8010/api/news/5?size=3",
                          METHOD:"get",
                          CONTENT_TYPE:"application/json",
                          PAYLOAD:"",
                          QueryString:"&apikey=a16cb0c916404be78cb0805fefc7d26a"
                      }
                  }]

              },
              {
                  PortalName_EN:"企业门户",
                  CARD_GROUP:"",
                  CARD_INDEX:3,
                  CARD_WIDTH:"1",
                  CARD_TOP_COLOR:"#00A2E5",
                  SUBCARDS:[{
                      SUBCARD_EN:"",
                      SUBCARD_ZH:"通知公告",
                      SUBCARD_TYPE:"style4",
                      SUBCARD_ISMORE:"1",
                      SUBCARD_MORE_URL:"",
                      SUBCARD_INDEX:"1",
                      DATASOURCE:{
                          URL:"http://10.15.251.110:8010/api/news/4?size=8",
                          METHOD:"get",
                          CONTENT_TYPE:"application/json",
                          PAYLOAD:"",
                          QueryString:"&apikey=a16cb0c916404be78cb0805fefc7d26a"
                      }
                  }]

              },
              {
                  PortalName_EN:"企业门户",
                  CARD_GROUP:"",
                  CARD_INDEX:4,
                  CARD_WIDTH:"1",
                  CARD_TOP_COLOR:"#00A2E5",
                  SUBCARDS:[{
                      SUBCARD_EN:"",
                      SUBCARD_ZH:"特别推荐",
                      SUBCARD_TYPE:"style7",
                      SUBCARD_ISMORE:"1",
                      SUBCARD_MORE_URL:"",
                      SUBCARD_INDEX:"1",
                      DATASOURCE:{
                          URL:"http://10.15.251.110:8010/api/news/2?size=3",
                          METHOD:"get",
                          CONTENT_TYPE:"application/json",
                          PAYLOAD:"",
                          QueryString:"&apikey=a16cb0c916404be78cb0805fefc7d26a"
                      }
                  }]

              },
              {
                  PortalName_EN:"企业门户",
                  CARD_GROUP:"",
                  CARD_INDEX:5,
                  CARD_WIDTH:"1",
                  CARD_TOP_COLOR:"#00A2E5",
                  SUBCARDS:[{
                      SUBCARD_EN:"",
                      SUBCARD_ZH:"成员公司动态",
                      SUBCARD_TYPE:"style7",
                      SUBCARD_ISMORE:"1",
                      SUBCARD_MORE_URL:"",
                      SUBCARD_INDEX:"1",
                      DATASOURCE:{
                          URL:"http://10.15.251.110:8010/api/news/7?size=3",
                          METHOD:"get",
                          CONTENT_TYPE:"application/json",
                          PAYLOAD:"",
                          QueryString:"&apikey=a16cb0c916404be78cb0805fefc7d26a"
                      }
                  }]

              },
              {
                  PortalName_EN:"企业门户",
                  CARD_GROUP:"",
                  CARD_INDEX:6,
                  CARD_WIDTH:"2",
                  CARD_TOP_COLOR:"#00A2E5",
                  SUBCARDS:[{
                      SUBCARD_EN:"",
                      SUBCARD_ZH:"核电在线",
                      SUBCARD_TYPE:"style8",
                      SUBCARD_ISMORE:"1",
                      SUBCARD_MORE_URL:"",
                      SUBCARD_INDEX:"1",
                      DATASOURCE:{
                          URL:"http://10.15.251.110:8010/api/news/7?size=3",
                          METHOD:"get",
                          CONTENT_TYPE:"application/json",
                          PAYLOAD:"",
                          QueryString:"&apikey=a16cb0c916404be78cb0805fefc7d26a"
                      }

                  }]

              },
              {
                  PortalName_EN:"企业门户",
                  CARD_GROUP:"",
                  CARD_INDEX:7,
                  CARD_WIDTH:"1",
                  CARD_TOP_COLOR:"#00A2E5",
                  SUBCARDS:[{
                      SUBCARD_EN:"",
                      SUBCARD_ZH:"文化动态",
                      SUBCARD_TYPE:"style4",
                      SUBCARD_ISMORE:"1",
                      SUBCARD_MORE_URL:"",
                      SUBCARD_INDEX:"1",
                      DATASOURCE:{
                          URL:"http://10.15.251.110:8010/api/news/17034?size=8",
                          METHOD:"get",
                          CONTENT_TYPE:"application/json",
                          PAYLOAD:"",
                          QueryString:"&apikey=a16cb0c916404be78cb0805fefc7d26a"
                      }
                  }]

              },
              {
                  PortalName_EN:"企业门户",
                  CARD_GROUP:"",
                  CARD_INDEX:8,
                  CARD_WIDTH:"1",
                  CARD_TOP_COLOR:"#00A2E5",
                  SUBCARDS:[{
                      SUBCARD_EN:"",
                      SUBCARD_ZH:"文化专栏",
                      SUBCARD_TYPE:"style3",
                      SUBCARD_ISMORE:"1",
                      SUBCARD_MORE_URL:"",
                      SUBCARD_INDEX:"1",
                      DATASOURCE:{
                          URL:"http://10.15.251.110:8010/api/news/17035?size=8",
                          METHOD:"get",
                          CONTENT_TYPE:"application/json",
                          PAYLOAD:"",
                          QueryString:"&apikey=a16cb0c916404be78cb0805fefc7d26a"
                      }
                  }]

              },
              {
                  PortalName_EN:"企业门户",
                  CARD_GROUP:"",
                  CARD_INDEX:9,
                  CARD_WIDTH:"1",
                  CARD_TOP_COLOR:"#f0A2b5",
                  SUBCARDS:[{
                      SUBCARD_EN:"",
                      SUBCARD_ZH:"党建专区",
                      SUBCARD_TYPE:"style4",
                      SUBCARD_ISMORE:"1",
                      SUBCARD_MORE_URL:"",
                      SUBCARD_INDEX:"1",
                      DATASOURCE:{
                          URL:"http://10.15.251.110:8010/api/news/17033?size=8",
                          METHOD:"get",
                          CONTENT_TYPE:"application/json",
                          PAYLOAD:"",
                          QueryString:"&apikey=a16cb0c916404be78cb0805fefc7d26a"
                      }
                  }]

              },
              {
                  PortalName_EN:"企业门户",
                  CARD_GROUP:"",
                  CARD_INDEX:10,
                  CARD_WIDTH:"1",
                  CARD_TOP_COLOR:"#00b2a5",
                  SUBCARDS:[{
                      SUBCARD_EN:"",
                      SUBCARD_ZH:"企业内刊",
                      SUBCARD_TYPE:"style9",
                      SUBCARD_ISMORE:"1",
                      SUBCARD_MORE_URL:"",
                      SUBCARD_INDEX:"1",
                      DATASOURCE:{
                          URL:"http://10.15.251.110:8010/api/news/17037?size=4",
                          METHOD:"get",
                          CONTENT_TYPE:"application/json",
                          PAYLOAD:"",
                          QueryString:"&apikey=a16cb0c916404be78cb0805fefc7d26a"
                      }
                  }]

              },
              {
                  PortalName_EN:"企业门户",
                  CARD_GROUP:"",
                  CARD_INDEX:11,
                  CARD_WIDTH:"1",
                  CARD_TOP_COLOR:"#00A2E5",
                  SUBCARDS:[{
                      SUBCARD_EN:"",
                      SUBCARD_ZH:"视频宣传",
                      SUBCARD_TYPE:"style5",
                      SUBCARD_ISMORE:"1",
                      SUBCARD_MORE_URL:"",
                      SUBCARD_INDEX:"1",
                      DATASOURCE:{
                          URL:"http://10.15.251.110:8010/api/news/3?size=2",
                          METHOD:"get",
                          CONTENT_TYPE:"application/json",
                          PAYLOAD:"",
                          QueryString:"&apikey=a16cb0c916404be78cb0805fefc7d26a"
                      }
                  }]

              },
              {
                  PortalName_EN:"企业门户",
                  CARD_GROUP:"",
                  CARD_INDEX:12,
                  CARD_WIDTH:"1",
                  CARD_TOP_COLOR:"#00A2E5",
                  SUBCARDS:[{
                      SUBCARD_EN:"",
                      SUBCARD_ZH:"媒体报导",
                      SUBCARD_TYPE:"style4",
                      SUBCARD_ISMORE:"1",
                      SUBCARD_MORE_URL:"",
                      SUBCARD_INDEX:"1",
                      DATASOURCE:{
                          URL:"http://10.15.251.110:8010/api/news/17032?size=8",
                          METHOD:"get",
                          CONTENT_TYPE:"application/json",
                          PAYLOAD:"",
                          QueryString:"&apikey=a16cb0c916404be78cb0805fefc7d26a"
                      }
                  }]

              }]
        },
    };

    return service;
}]);