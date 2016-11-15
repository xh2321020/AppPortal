/**
 * Created by kingsinsd on 2016/7/19.
 */
    //contact.js
//get Commnutity Managers and Members
var getUserInfo = "http://172.16.51.137:8010/api/contact/getUserInfo?apikey=e71982d5401b488da4acef8827c41845&pid=";
var getMember =  "http://172.16.51.137:8010/api/contact/getFileinfo?apikey=e71982d5401b488da4acef8827c41845&pid=";

    //contactMembers.js
var getMemberDetails = "http://172.16.51.137:8010/api/contact/getuserlist?apikey=e71982d5401b488da4acef8827c41845&uid=";
var getChainsDetails = "http://172.16.51.137:8010/api/contact/Reportchain?apikey=e71982d5401b488da4acef8827c41845&uid=";
var getXingChengDetails = "http://172.16.51.137:8000/api/V1.0/schedule/schedule/";
var getSameOrgDetails = "http://172.16.51.137:8010/api/contact/getorgmember?apikey=e71982d5401b488da4acef8827c41845&ou=";
var updateUserProfile = "http://172.16.51.137:8010/api/contact/updateUserProfile?apikey=e71982d5401b488da4acef8827c41845&uid=";