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
        width: 20rem;
    }
    #depPortalNav{
        display: none;
    }
    .nav-action{
        /*border: 1px solid blue;*/
        position: absolute;
        top: 0;
        right: 0;
        line-height: 3.2rem;
        list-style: none;
        font-size: 1.6rem;
        font-weight: 700;
        color: grey;
    }
    .nav-action .login{
        min-width:12rem;
        text-align: center;
    }
    .nav-action .search{
        min-width: 22rem;
        border-left: solid 1px lightgrey;
        text-align: left;
    }
    .nav-action .form-control{
        display: inline;
        /*width: auto;*/
        width: 15rem;
    }
    .nav-action .search{
        padding-left: 3rem;
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
    }
    .company>ul:first-child{
        padding-top: 2rem;
    }
    .nav-panel .list{
        border-top: 1px solid lightgrey;

    }
    .nav-panel ul{
        padding: 0 2rem;
        list-style: none;
    }

    .nav-panel .list-item{
        float: left;
        width: 14%;
        text-align: center;
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
        margin-bottom: -1rem;
    }
    .dept-subj .title{
        margin-bottom: -2rem;
    }

    .list.dept{
        position: relative;
    }
    .dept .split{
        position: absolute;
        top: 0;
        right: 0;
    }
    /*顶部导航结束*/
    /*logo*/
    .logo{
        width: 100%;
        padding: 0 1px;
    }
    /*logo end*/
</style>
<template>
    <!--<base href="../../../">-->
    <div class="navbar navbar-default">
        <div class="container-fluid nav-header">
            <img class="brand" :src="'assets/images/portal/brand_big.png'" />

            <div class="nav-link" id="navLink">
                <ul class="nav-list">
                    <li class="nav-list-item" id="comPortalNav">
                        <a class="navbar-link com-portal" href="www.baidu.com">公司门户</a>

                        <div class="nav-panel company">
                            <ul class="list">
                                <li class="list-item"><a class="btn" href="http://bjportal.cnnp.com.cn/wps/portal"
                                                         target="_blank">中国核电旧主页</a></li>
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn" href="http://www.cnnc.com.cn"
                                                         target="_blank">中国核工业集团公司</a></li>
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn" href="http://10.16.15.38"
                                                         target="_blank">中核运行</a></li>
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn" href="" target="_blank">中浙能源</a></li>
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn"
                                                         href="http://10.16.15.38:10039/wps/portal/Home/cnnc_index"
                                                         target="_blank">秦山(筹)</a></li>
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
                                <li class="list-item"><a class="btn" href="#" target="_blank">辽宁核电</a></li>
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn" href="http://fsecm.cnnp.com.cn/wps/portal"
                                                         target="_blank">三明核电</a></li>
                                <!-- /.list-item -->
                                <li class="list-item"><a class="btn" href="http://zgecm.cnnp.com.cn/wps/portal"
                                                         target="_blank">漳州核电</a></li>
                                <!-- /.list-item -->
                                <li class="list-item">&nbsp;</li>
                                <!-- /.list-item -->
                            </ul>
                        </div>
                    </li>
                    <li class="nav-list-item dept-subj" id="depPortalNav">
                        <a class="navbar-link dep-portal">部门及专题门户</a>

                        <div class="nav-panel row">
                            <div class="list dept col-md-6">
                                <p class="title">部门门户</p>
                                <!-- /.title -->
                                <ul>
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                </ul>
                                <ul>
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                </ul>
                                <ul>
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                </ul>
                                <img :src="'assets/images/portal/dash_line.png'" alt="" class="split"/>
                                <!-- /.split -->
                            </div>
                            <!-- /.list -->
                            <div class="list col-md-6">
                                <p class="title">专题门户</p>
                                <!-- /.title -->
                                <ul>
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                </ul>
                                <ul>
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                    <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                                    <!-- /.list-item -->
                                </ul>
                            </div>
                            <!-- /.list -->
                        </div>
                    </li>
                    <li class="nav-list-item"><a class="navbar-link workbench" href="pages/portal/portal-personalCon.html">个人工作台</a></li>
                </ul>
            </div>
            <!-- /.nav-link -->

            <ul class="nav-action" id="nav-action">
                <li class="nav-list-item search"><input type="text" class="form-control" placeholder="搜索" v-model="searchInputVal"/>
                    <a class="btn-search" @click="doSearch"><span class="glyphicon glyphicon-search"></span>
                        <!-- /.glyphicon glyphicon-search --></a>
                    <!-- /.search -->
                </li>
                <!-- <li class="nav-list-item login"><a :href="f2000"></a></li> -->
            </ul>
            <!-- /.nav-action -->
        </div>
        <!-- /.container -->

        <!-- /.nav-panel -->
    </div>
    <div>
        <img :src="'assets/images/portal/portal-logo1.jpg'" alt="" class="logo" />
        <!-- /.logo -->
    </div>
</template>
<script>
    module.exports={
         data:function(){
             return{
                 searchInputVal:""
             }
         },
        methods:{
            doSearch:function (argument) {
                // body...
                // var qstr = this.searchInputVal;
                var url = "http://bjportal.cnnp.com.cn/publish2/newsShow/search?qstr="+this.searchInputVal;
                window.open(url);
            }
        },
        ready:function () {
             $("#comPortalNav").hover(function (ev) {
            $(this.querySelector(".nav-panel")).show();
        }, function () {
            $(this.querySelector(".nav-panel")).hide();
        });
        }
    }
</script>
