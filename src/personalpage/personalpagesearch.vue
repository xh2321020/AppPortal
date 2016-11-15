<style scoped>
    .inner {
            position: static;
            float: none;
            border: 0;
            padding: 0;
            margin: 0;
            border-radius: 0;
            max-height: 16rem;
            overflow-y: auto;
            /*min-height: 80px;*/
        }
        .vue-font{
            margin-left:5%;
            color:lightgrey;
            width:100%;
            font-size:1.2rem;
            font-family: 'Microsoft YaHei Regular','microsoft yahei', Verdana, Arial, Helvetica, sans-serif;
        }
        .emp-note{
            margin-left:10%;
            float:left; 
            font-size:1.4rem;
            width: 80%;
            font-family: 'Microsoft YaHei Regular','microsoft yahei', Verdana, Arial, Helvetica, sans-serif;
        }
        .emp-class {
             height: 100%;
           /* margin-left: 1.5rem;
            float: left;
            border: 1px solid #CCCCCC;
            margin: 0.25rem;
            border-right-style: groove;
            border-right: 2px solid #CCCCCC;*/
        }
        .emp-class-result{
            border: 1px solid lightgrey;
            float: left;
            margin-left: 0.5rem;
            margin-top: 0.5rem;
            width: 24%;
            cursor: pointer;
            height: 10rem;
        }
        .emp-class-result:hover{
            box-shadow: 0  15px 30px rgba(0,0,0,.1);
            transform: translate3d(0,-2px,0);
            cursor: pointer;
        }
        .emp-class-img {
            width: 60px;
            float: left;
            margin-top: 1rem;
            border-radius: 50%;
            margin-left: 1.5rem;
        }
        .emp-class-div {
            color: #666666;
            font-size: 1rem;
            font-family: 'Microsoft YaHei Regular','microsoft yahei', Verdana, Arial, Helvetica, sans-serif;
            float: left;
            margin-left: 1rem;
            margin-top:0.5rem;
        }

        .emp-class-div-p-span {
            font-weight: bold;
            font-size:15px;
            font-family: 'Microsoft YaHei Regular','microsoft yahei', Verdana, Arial, Helvetica, sans-serif;
        }
        .emp-class-div-p-span-org {
            font-size:13px;
            font-family: 'Microsoft YaHei Regular','microsoft yahei', Verdana, Arial, Helvetica, sans-serif;
        }
        .dropdown-menu.open {
            width: 100%;
        }

        .dropdown-toggle .fa {
            float: right;
            margin-right: -6px;
        }

        .bs-searchbox .form-control {
            border: 1px solid skyblue;
            border-radius: 5px;
        }

        .btn {
            width: 100%;
            text-align: left;
            background: white;
        }

        .result {
            border: 1px solid lightgrey;
            width: 100%;
            margin: 2rem 0 0;
            padding: 0.5rem 0.5rem;
            height: 4.5rem;
            border-radius: 0.5rem;
        }

        .list {
            list-style: none;
        }

        .table th {
            width: 25%;
            text-align: center;
        }

        .table td {
            text-align: center;
            vertical-align: middle;
        }
        .outer-container{
        	display: inline-block;
        	width:100%;
        }
        .search-result{
            position: relative;
            z-index: 1;
            margin-top:1rem;
            width:100%;
        }
        /*遮罩start*/
        .cover{
            /*position:absolute;
            width: 100%;
            height: 100%;
            z-index: 100;
            background: #fff;
            opacity: 0;
            text-align: center;
            display: table;
            left: 0;
            top: 0;*/
            display: none;
         }
         .cover .loading{
             position:absolute;

            width: 16rem;
            height: 16rem;
              left: calc( 50% - 8rem);
             top: calc( 50% - 1rem);
            display: table-cell;
            vertical-align: middle;
            margin:0 auto ;
            border-radius: 50%;
            background: none;
            opacity: 0.8;
        /*animation: loadingRotate 1s linear 0.05s  infinite;*/
         }
         /*cover end*/
</style>
<template>  
<div class="outer-container">
    <div class="modal-dialog" role="document"style="width:100%; height:100%; margin-top: 2rem;">
        <div style="width:100%; height:100%;">
            <div style="width: 100%;float: left;">
                <div class="input" >
                    <input id="inputField" type="text" class="form-control inputSuccess1" v-model="input"
                          @keyup="searchInput" style="border-radius: 0.5rem; width: 80%; height: 4rem; float:left; margin-left:10%;margin-bottom: 0.5rem;"></ br>
                    </div>
                    <div class="emp-note">
                        <div class="vue-font">
                            注：可以用多种方式搜索（无需回车）。如查找“张三”，可输入“张三”、“张”、“zhangsan”、“zs”等。
                        </div>
                    </div>
                </div>
                <section class="search-result" style="width:100%; float:left; padding-left:1%;">
                    <div class="cover">
                        <img class="loading" :src="'assets/images/loading3.gif'"></img>
                    </div>
                    <div v-for="member in members" class="emp-class-result">
                        <div class="emp-class" onclick="myFunction(\'{{member.employeeID}}\')">
                            <img class="img emp-class-img" :src="member.imageurl"/>
                            <div class="emp-class-div">
                                <span class="emp-class-div-p-span">{{member.displayName}}</span><br>
                                <div>
                                    <div v-for="n in 4" class="emp-class-div-p-span-org">
                                        {{member.orgtree[n+1]?member.orgtree[n+1].name:""}}
                                    </div>
                                </div>
                                <span>{{member.mail}}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data()
    {
        return {
            modal_id:"modal"+(new Date().getTime()),
            members: [],
            input: "",
            request: {}
        };
    }
    ,
    props:["supervisionRequest", "multiple", 'leaderOnly','selected'],     
    created()
    {
        if (this.multiple == "false")this.multiple = false;
        else this.multiple = true;
        if (this.leaderOnly == "false")this.leaderOnly = false;
        else this.leaderOnly = true;       
    }
    ,
    ready()
    {
        $("#"+this.modal_id).modal("show");
    }
    ,
    methods:{
        selectMember:function (item) {
            this.selected = item;
        },
        searchInput()
        {
            var personalpageRequestVue = window.interfaceSettings.personalpageRequest.api;
            let _this = this;
            let input = this.input.trim();
            if (input == ""){
                return;}
            let timer = setTimeout(() =>{   
                clearTimeout(timer);
                let inputVal = _this.input.trim();
                if (inputVal != input) {
                    return;
                } else {
                    if (inputVal == "")return;
                    if (_this.request.readyState && _this.request.readyState != 4) {
                        _this.request.abort();
                        $(".cover").hide();
                    }
                    $(".cover").show();
                    $("#userInfo").html("");
                    var searchuserURL= personalpageRequestVue.searchuserUrl +"?apikey=" + window.interfaceSettings.personalpageRequest.header.apikey+ "&q=" + inputVal
                    _this.request = $.ajax({
                        type: "get",
                        url: searchuserURL,
                        success(result, state, jqxhr)
                    {
                        let members = [];
                        let count = 0;
                        for (let i = 0, len = result.length; i < len; i++) {
                            if ((typeof(result[i].imageurl) == "undefined") || (typeof(result[i].imageurl) == "")) {
                                result[i].imageurl = "assets/images/personalpage/defaultUserPhoto.png";
                            } else {
                                result[i].imageurl = window.interfaceSettings.personalpageRequest.server + result[i].imageurl;
                            }
                            let orgtree = result[i].orgtree;
                            if (orgtree) {
                                for (let orgi in orgtree) {
                                    for (let key in orgtree[orgi])
                                        orgtree[orgi].name = orgtree[orgi][key];
                                }
                            }
                            result.orgtree = orgtree;
                            members.push(result[i]);

                        }
                        _this.members = members;
                        $(".cover").hide();
                    }
                ,
                    error(result, state, jqxhr)
                    {   
                        $(".cover").hide();
                        console.log("error", jqxhr);
                    }
                }
            );
            }
        }
    ,
        500
    )
        ;
    }
    ,
    addUser(item)
    {
        if (item.selected) {
            alert("不可重复添加")
            return;
        }
        if (this.multiple || this.selected.length == 0) {
            this.selected.push(item);
            item.selected = true;
        } else {
            alert("只能选择一个候选人，请移除后再添加..")
        }
    }
    ,
    removeUser(index)
    {
        this.selected[index].selected = false;
        this.selected.splice(index, 1);
    }
    }
    }

</script>

