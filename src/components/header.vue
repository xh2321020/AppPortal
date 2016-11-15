<style>
    *,article,section,ul,div,p,td,li{
        margin: 0;padding: 0;
    }
    html {font-size: 62.5%;/*10 ÷ 16 × 100% = 62.5%*/}
    body {font-size: 1.4rem;/*1.4 × 10px = 14px */
        font-family: 'microsoft yahei', Verdana, Arial, Helvetica, sans-serif;
        min-width: 1024px;   
        max-width: 80%;    
        margin: 0 auto;
    }
    
    h1 { font-size: 2.4rem;/*2.4 × 10px = 24px*/}


    /*顶部导航开始*/
    .navbar{
        width: 100%;
        margin: 0 auto;
    }

    .navbar .container-fluid{
        position: relative;
        padding: 0;
        background: #ffffff;
    }
    .brand{
        float: left;
        width: 25.8rem;
        height: 5.2rem;
    }

    .nav-list{
        list-style: none;
        float: left;
        border-left: 1px solid lightgrey;
        font-size: 14px;
        font-weight: 400;
        color: #797979!important;
        cursor: pointer;
    }
    .navbar-link.com-portal:hover{
        background: #00a2e5;
        color: #ffffff;
    }
    .dep-portal:hover{
        background: #FFB341;
        color: #ffffff;
    }
    .navbar-link.workbench:hover{
        background: #ABCB27;
        color: #ffffff;
    }

    .navbar-link{
        display: inline-block;
        height: 100%;
        position: relative;
        padding:0 3rem;
        color: #797979;
        width: 100%;
    }
   
    .nav-list .navbar-link:hover{
        color: #ffffff;
        text-decoration: none;

    }
    .nav-list .active{
        color: #0066cc;
    }
    .nav-list-item{
        float: left;
        border-right: 1px solid lightgrey;
        line-height: 5.2rem;
        text-align: center;
        min-width: 15rem;
    }
    .user-container{
        border-left: none;text-align: center;width: 17rem;float: right;
    } @media screen and (min-width:1024px) and (max-width: 1235px){
         .nav-action .search{
            padding-right: 22px!important;
        }
    }
    @media screen and (min-width:1350px) and (max-width: 1400px){
         body{
            max-width: 85%;
    }
    }
     @media screen and (min-width:1024px) and (max-width:1350px){
     .nav-list-item{
        float: left;
        border-right: 1px solid lightgrey;
        line-height: 5.2rem;
        text-align: center;
        width: auto;
        min-width: 0!important;
    }
    .navbar-link{
        padding: 0 2rem;
    }
    .nav-action .search{
        min-width: 0!important;
        border-right: none;
    }
    .user-container{
    width: 16rem;
    }
    }
    .nav-action{
        /*border: 1px solid blue;*/
       float: right;
        line-height: 3.2rem;
        font-size: 1.6rem;
        font-weight: 700;
        color: grey;
        margin-right:10px;
    }.nav-action::after{
        display: inline-block;
        width: 0;
        height: 0;
        content: "";
    }
    .nav-action .login{
        min-width:12rem;
        text-align: center;
    }
    .nav-action .search{
        border-left: solid 1px lightgrey;
        text-align: center;
        min-width: 0!important;
    }
    .nav-action .form-control{
        display: inline;
        width: 12rem;
    }
    .nav-action .search{
        padding-left:5%;
        padding-right: 5%;
        border-right: none!important;
    }
    .search input{width: 70%;}
    .user{
    overflow: hidden;
    height: 4.2rem;
    }
    .nav-link{
        position: relative;
    }
    .nav-panel{
        background-color: white;
        display: none;
        left: 0;
        top: 0;
        position: absolute;
        margin-top: 5.2rem;
        width: 100%;
        height: 16.5rem;
        z-index: 1030;
        font-size: 14px;
        font-weight: 400;
        color: #797979!important;
        margin-left: 0!important;
        margin-right: 0!important;
        border: 1px solid lightgrey;
        overflow: hidden;
    }
    .nav-panel .title{
            margin-bottom: -2rem;
    }
   
    .nav-panel ul{
        padding: 0 2rem;
        list-style: none;
    }

    .nav-panel .list-item{
        float: left;
        width: 14%;
        text-align: center;
        margin-bottom: -1.5rem;
    }
    .company .btn:hover{
        background-color: #00a2e5;
        color:#fff
    }
    .dept-subj .btn:hover{
        background-color: #FFB341;
        color:#fff
    }
    .dept-subj .list-item{
        width: 25%;
    }
    

    .list.dept{
        position: relative;
    }
    .dept .split{
        position: absolute;
        top: 0;
        right: 0;
        height: 16.4rem;
        border-right: 1px solid lightgrey;
    }
    /*顶部导航结束*/
    /*logo*/
    .logo{
        width: 100%;
        padding: 1px;
        height: 16.5rem;
    }
    @import './swiper/idangerous.swiper2.7.6.css';
    /*logo end*/
</style>
<template>
    <!--<base href="../../../">-->
    <div class="navbar navbar-default">
        <div class="container-fluid nav-header">
            <img class="brand" :src="'../../assets/images/portal/brand_big.png'" />

            <div class="nav-link" id="navLink">
                <ul class="nav-list">
                    <li class="nav-list-item" id="comPortalNav">
                        <a class="navbar-link com-portal" href="pages/portal/index.html">公司门户▼</a>

                        <div class="nav-panel company">
                            <div class="title">公司门户
                                   <!--  <div style="position:absolute;top: 0;right:1rem;">
                                     <a @click="turnMenuPage('company','left')" :class="['btn','glyphicon','glyphicon-arrow-left',{'disabled':companyCount<=21}]" ></a>
                                     <a @click="turnMenuPage('company','right')" :class="['btn','glyphicon','glyphicon-arrow-right',{'disabled':companyCount==companyOrigin.length}]" ></a>
                                     </div> -->
                                </div>
                               <!--  <ul v-for="n in (parseInt(companys.length/7)+(companys.length%7==0?0:1))">
                                    <li v-for="m in n<parseInt(companys.length/7)?7:(companys.length%7)" class="list-item">
                                        <a class="btn" v-text="companys[n*7+m].name" :href="companys[n*7+m].webtype=='0'?('pages/portal/index.html?type='+companys[n*7+m].hptype+'&node='+companys[n*7+m].id):companys[n*7+m].url" target="_blank"></a>
                                    </li>
                                </ul> -->
                            <ul class="list">
                                <!-- href="http://bjportal.cnnp.com.cn/wps/portal" -->
                                <li class="list-item"><a class="btn"  href="http://bjecm.cnnp.com.cn/newportal/news/home.action"
                                 target="_blank">中国核电旧主页</a></li>
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn" href="http://www.cnnc.com.cn"
                                                         target="_blank">中国核工业集团公司</a></li>
                                <!-- /.list-item -->
                                 <li class="list-item"><a class="btn"
                                                         href="http://10.16.15.38:10039/wps/portal/Home/cnnc_index"
                                                         target="_blank">秦山(筹)</a></li>
                                <li class="list-item"><a class="btn" href="http://10.16.15.38"
                                                         target="_blank">中核运行</a></li>
                                <!-- /.list-item -->
                               
                                <!-- /.list-item -->
                               
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn" href="#" target="_blank">江苏核电</a></li>
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn" href="#" target="_blank">三门核电</a></li>
                                <!-- /.list-item -->
                            </ul>
                            <ul>
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn" href="http://fqecm.cnnp.com.cn/wps/portal"
                                                         target="_blank">福清核电</a></li>
                                <li class="list-item"><a class="btn" href="#" target="_blank">海南核电</a></li>
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn" href="#" target="_blank">桃花江核电</a></li>
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn" href="http://lnecm.cnnp.com.cn/wps/portal" target="_blank">辽宁核电</a></li>
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn" href="http://fsecm.cnnp.com.cn/wps/portal"
                                                         target="_blank">三明核电</a></li>
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn" href="http://zgecm.cnnp.com.cn/wps/portal"
                                                         target="_blank">漳州核电</a></li>
                                 <li class="list-item"><a class="btn" href="http://hbecm.cnnp.com.cn/hbnews/f"  target="_blank">河北核电</a></li>
                                  <li class="list-item"><a class="btn" href="#"  target="_blank">霞浦核电</a></li>
                                <li class="list-item"><a class="btn" href="http://10.15.251.136:8080/cnnews/f"  target="_blank">中浙能源</a></li>
                                <!-- /.list-item -
                                <li class="list-item">&nbsp;</li>
                                <!-- /.list-item -->
                            </ul>
                        </div>
                    </li>
                    <li class="nav-list-item dept-subj" id="depPortalNav">
                        <a class="navbar-link dep-portal">部门及专题门户▼</a>

                        <div class="nav-panel row">
                            <div class="list dept col-md-6" >
                                <div class="title">部门门户
                                    <div style="position:absolute;top: 0;right:1rem;">
                                     <a @click="turnMenuPage('depts','left')" :class="['btn','glyphicon','glyphicon-arrow-left',{'disabled':deptsCount<=12}]" ></a>
                                     <a @click="turnMenuPage('depts','right')" :class="['btn','glyphicon','glyphicon-arrow-right',{'disabled':deptsCount==deptsOrigin.length}]" ></a>
                                     </div>
                                </div>
                                <!-- /.title -->
                               
                                <ul v-for="n in (parseInt(depts.length/4)+(depts.length%4==0?0:1))">
                                    <li v-for="m in n<parseInt(depts.length/4)?4:(depts.length%4)" class="list-item">
                                        <a class="btn" v-text="depts[n*4+m].name" :href="depts[n*4+m].webtype=='0'?('pages/portal/index.html?type='+depts[n*4+m].hptype+'&node='+depts[n*4+m].id):depts[n*4+m].url" target="_blank"></a>
                                    </li>
                                </ul> 
                                <div class="split"></div>  
                            </div>
                            <!-- /.list -->
                            <div class="list col-md-6">
                                <div class="title">专题门户
                                    <div style="position:absolute;top: 0;right:1rem;">
                                         <a @click="turnMenuPage('themes','left')"  :class="['btn','glyphicon','glyphicon-arrow-left',{'disabled':themesCount<=12}]" ></a>
                                         <a @click="turnMenuPage('themes','right')" :class="['btn','glyphicon','glyphicon-arrow-right',{'disabled':themesCount==themesOrigin.length}]">
                                         </a>
                                    </div>
                                </div>
                                <!-- /.title -->
                                <ul v-for="n in (parseInt(themes.length/4)+(themes.length%4==0?0:1))">
                                    <li v-for="m in n<parseInt(themes.length/4)?4:themes.length%4" class="list-item">
                                     <a class="btn" v-text="themes[n*4+m].name" :href="themes[n*4+m].webtype=='0'?('pages/portal/index.html?type='+themes[n*4+m].hptype+'&node='+themes[n*4+m].id):themes[n*4+m].url" target="_blank">                                         
                                     </a>
                                    </li>
                                </ul>  
                            </div>
                            <!-- /.list -->
                        </div>
                    </li>
                    <li class="nav-list-item"><a @click="gotoWorkbench" class="navbar-link workbench" >个人工作台</a></li>
                    
                </ul>
            </div>
            <!-- /.nav-link -->

            <div class="nav-action" id="nav-action">
                <div class="nav-list-item search"><input @keyup.enter="doSearch" type="text" class="form-control" placeholder="搜索" v-model="searchInputVal"/>
                   
                </div>
                <!-- <li class="nav-list-item login"><a :href="f2000"></a></li> -->
            </div>
                <iframe  id="logoutIframe" hidden="hidden"></iframe>
                 <div  style="line-height: 4.2rem; float: right;border-left: 1px solid lightgrey;"> 
                        <a href="http://w3.cnnp.com.cn/pages/portal/news_more.html?type=17149&column=新门户帮助文档" class="btn" style="line-height: 3.8rem;" target="_blank">帮助</a>                      
                 </div>
                  <div class="user-container"  v-if="isLogin" style="border-left: 1px solid lightgrey;">          
                     <div class="user" v-text="username"  style="float: left;width: 60%;line-height: 4.2rem;text-align: right;border-right: 1px solid lightgrey;margin: 5px 0;text-align: center;"></div>
                             <div class="logout" style="text-align: center;float: left;width: 40%;line-height: 4.2rem;text-align: left;margin: 5px 0;">
                             <a  class="btn" @click="loginOut">登出</a>
                         </div>
                  </div>
                   <div  v-else class="login" style="line-height: 4.2rem; float: right;border-left: 1px solid lightgrey;"> 
                   <a @click="loginIn" class="btn" style="line-height: 3.8rem;">登录</a>                      
                   </div>
                  
             
        </div>
        <!-- /.container -->

        <!-- /.nav-panel -->
    </div>
    <div v-if="showBanner" :id="swiper_id" class="swiper-container" style="width: 100%;">
        <div class="swiper-wrapper">
            <div  v-for="n in 3" class="swiper-slide">
                <img  :src="'../../assets/images/portal/portal-logo'+n+'.jpg'"  class="logo"/>
            </div>
        </div>
    </div>
</template>
<script>
import {getCookie,getQueryString,fetchAjaxService,setCookie,deleteCookie} from "../common-function.js";
let portalRequest=window.interfaceSettings.portalRequest;
    module.exports={
         data:function(){
             return{
                swiper_id:"swiper"+(new Date().getTime()),
                showBanner:true,
                 searchInputVal:"",
                 username:"",
                 list:[],
                 depts:[],
                 themes:[],
                 deptsCount:0,
                 themesCount:0,
                 deptsOrigin:[],
                 themesOrigin:[],
                isLogin:false
             }
         },
        created:function () {
            if(location.pagename=="portal-workspace")this.showBanner=false;
            else this.showBanner=true;
            let that=this;
            let userid=getCookie("userid"),username=getCookie("username");
            if(userid&&userid!=""&&username){
                window.userLogin={
                    userid:userid,
                    username:username
                }           
                this.isLogin=true;
                this.username=username;
            }else{  
              var suffix = Base64.decode(location.search.substr(1)); 
              let uidIndex=suffix.indexOf("uid=");
              if(uidIndex>-1){
                userid=suffix.substr(4,8);
                setCookie("userid",userid,30,"/");
                let personalpageRequest=window.interfaceSettings.personalpageRequest;
                let url=personalpageRequest.api.getMemberDetails+"?"+$.param($.extend({},personalpageRequest.header,{"uid":userid}));
                this.fetchUsername(url);
              }else{
                    this.isLogin=false;
              }
           
          
            }
            // body...
            let sectorUrl=portalRequest.api.portalSectorUrl;
            let dataSource={
                URL:sectorUrl,
                QueryString:"?"+$.param(portalRequest.header)
            };
            fetchAjaxService(dataSource,this);
        },
        ready:function () {
            let _this=this;
            $("#depPortalNav").hover(function (ev) {
                $(this.querySelector(".nav-panel")).show();
            }, function () {
                $(this.querySelector(".nav-panel")).hide();
            });
          
             $("#comPortalNav").hover(function (ev) {
                $(this.querySelector(".nav-panel")).show();
            }, function () {
                $(this.querySelector(".nav-panel")).hide();
            });
             let swiper=new Swiper("#"+this.swiper_id,{
                    autoplay:5000,
                    autoplayDisableOnInteraction : false,
                    loop : true,      
                    effect: 'fade',                    
                    calculateHeight : true,
                    speed:2000
                });
            document.getElementById("logoutIframe").onload=null; 
        },
        methods:{
            gotoWorkbench:function(){
                let url=window.location.href;
                // let host=url.substring(0,url.indexOf('/pages'));
                let host=location.protocol+"//"+location.host;
                url=host+"/pages/portal/workspace.html";
                url=Base64.encode(url);
                window.location.href="http://bjecm.cnnp.com.cn/pt/LoginServlet?url="+url;
            },
            successNext:function () {
                // body...
                let themesOrigin=[],deptsOrigin=[];
                for(let i=0,len=this.list.length;i<len;i++){
                    if(this.list[i].hptype=="2")themesOrigin.push(this.list[i]);
                    else deptsOrigin.push(this.list[i]);
                }
                this.themesOrigin=themesOrigin;
                this.deptsOrigin=deptsOrigin;
                this.themes=themesOrigin.length<=12?themesOrigin:themesOrigin.slice(0,12);
                this.depts=deptsOrigin.length<=12?deptsOrigin:deptsOrigin.slice(0,12);
                this.deptsCount=this.depts.length;
                this.themesCount=this.themes.length;
            }, 
            turnMenuPage:function(type,direction){
                let origin=this[type+"Origin"];
                let count=this[type+"Count"];
                if(direction=="left"){
                    if(count<=12)return;
                    count=count- this[type].length;                   
                 this[type]=origin.slice(count-12,count);
                 this[type+"Count"]=count;
                }else{
                 if(count==origin.length)return;     
                this[type]=origin.slice(count,count+12);
                 this[type+"Count"]=count+this[type].length;
                }
                  
                   
            },
            doSearch:function () {
                var url = "/pages/portal/news_search.html?keyWords="+this.searchInputVal;
                window.open(url);
            },
            loginIn:function(){
             window.location.href = "http://bjecm.cnnp.com.cn/pt/LoginServlet?url="+Base64.encode(window.location.href);
            },
             loginOut:function(){                 
                delete window.userLogin;
                 deleteCookie("userid");
                 deleteCookie("username");
                 deleteCookie("userorg");
                    this.username="";
                    this.isLogin=false;          
                let iframe=document.getElementById("logoutIframe");   
                iframe.onload=function(){
                    location.href=location.protocol+"//"+location.host+"/pages/portal/index.html";
                };
                iframe.src='http://bjecm.cnnp.com.cn/pkmslogout';
            },
            
            fetchUsername:function(url){
                let that =this;
                $.ajax({
                    url:url,
                    type:"get",
                    success:function(result){
                        if(result.length==0){  
                        
                            that.username=getCookie("userid");
                            setCookie("username",that.username,30,"/");
                        }else{
                            let data=result[0];
                            that.username=data.displayName;
                            let orgtree=data.orgtree;
                            setCookie("username",data.displayName,30,"/");
                            setCookie("userorg",orgtree,30,"/");
                        }
                        that.isLogin=true;
                       
                    },
                    error:function(result){
                        // console.log("error",result)
                    }
                });
            }

        }

    }
</script>
