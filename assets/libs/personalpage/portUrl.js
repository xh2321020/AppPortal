/**
 * Created by kingsinsd on 2016/7/8.
 */
//contact.js
// var serveAddress = "http://10.15.251.110:8010";
// var apikey = "a16cb0c916404be78cb0805fefc7d26a";
var serveAddress = "http://172.16.51.137:8010";
var apikey = "e71982d5401b488da4acef8827c41845"
// http://10.25.251.110:8010/api/xxxx?api_key=a16cb0c916404be78cb0805fefc7d26a

//获取更新个人信息
var updateUserProfile = serveAddress + "/api/contact/updateUserProfile?api_key=" + apikey + "&uid=";
// http://10.15.251.110:8010/api/stock/StockDataAction?code=sh601985&api_key=a16cb0c916404be78cb0805fefc7d26a

//personalCon.js
//SinglePowAction
var SinglePowAction="http://10.15.251.110:8010/api/echarts/SinglePowAction";
//PowDataAction
var PowDataAction="http://10.15.251.110:8010/api/EchartsCaini/PowDataAction";
//stock
var stockURL = serveAddress + "/api/stock/StockDataAction?code=sh601985&api_key="+apikey;
// var stockURL = "http://10.15.251.110:8010/api/stock/StockDataAction?code=sh601985&api_key=a16cb0c916404be78cb0805fefc7d26a";
//各个电厂的电量
var iframeUrl = "http://10.15.251.126:8080/EchartsCaini/ProdDataAction?strdate=";
//http://10.15.251.126:8080/EchartsCaini/ProdDataAction?strdate=2015-06-06&rid=1

// http://10.15.251.110:8010/echarts-total/ProdDataAction?strdate=2016-06-06&api_key=a16cb0c916404be78cb0805fefc7d26a