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

    .input-group > .btn {
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
    }
    .search-result{
        position: relative;
        z-index: 1;
    }
    /*遮罩start*/
        @keyframes loadingRotate
    {
     100%   {transform: rotate(360deg)};
    }
     .cover{
      /*  position:absolute;
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
         top: calc( 50% - 8rem);
        display: table-cell;
        vertical-align: middle;
        margin:0 auto ;
        border-radius: 50%;
        /*background: none;*/
        opacity: 0.8;
    /*animation: loadingRotate 1s linear 0.05s  infinite;*/
     }
     /*cover end*/

</style>
<template>  
<div class="outer-container">
    <div class="input-grout" style="width: 50%;position: relative;">
     <button type="button" class="btn btn-sm" data-toggle="modal" :data-target="'#'+modal_id">请选择</button>
    </div>
    <div class="modal fade" :id="modal_id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{givenParams.title}}</h4>
                </div>
                <div class="modal-body">
                <div v-show="(currentView=='business')">
                    <div class="input"><input type="text" class="form-control inputSuccess1" v-model="input"
                                              @keyup="searchInput"></div>
                   <section class="search-result">
                                                  
                    <table class="table table-hover table-condensed content-key">
                        <thead>
                        <th>单位</th>
                        <th>处室</th>
                        <th>科室</th>
                        <th>姓名</th>
                        <th></th>
                        </thead>
                        <tbody>
                        <tr v-for="member in members">
                            <td v-for="n in 3">{{member.orgtree[n+1]?member.orgtree[n+1].name:""}}</td>
                            <td>{{member.displayName}}</td>
                            <td>
                                <button class="btn btn-default" @click="addUser(member)">添加</button>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                    <div class="result">
                        <ul class="list">
                            <li v-for="user in selectedUsers" class="btn btn-primary" @click="removeUser($index,event)">
                                <a v-text="user.displayName" style="color: white;">
                                </a><i class="glyphicon glyphicon-remove"></i></li>
                        </ul>
                    </div>
                        <div class="cover">
                            <img class="loading" :src="'assets/images/loading3.gif'">
                        </div>
                   </section>
                </div>
                <div v-show="currentView=='dialog1'">
                      <p style="margin: 0 auto;">不可重复添加</p>
                </div>
                 <div v-show="currentView=='dialog2'">
                     <p >只能选择一个候选人，请移除后再添加..</p>
                 </div>
                    
                </div>
                <div class="modal-footer">

                      <button type="button" v-show="currentView!='business'" class="btn btn-default" @click="dialogClose">确定</button>
                    <!-- <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button> -->
                    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                </div>
            </div>
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
            // options:[],
            input: "",
            request: {},
            multiple:true,
            leaderOnly:true,
            searchuserUrl:"",
            title:"",
            currentView:"business"
        };
    }
    ,
    props:["givenParams",'selectedUsers'],
           
    created()
    {
        this.multiple=this.givenParams.multiple;
        this.leaderOnly=this.givenParams.leaderOnly;
        this.searchuserUrl=this.givenParams.searchuserUrl;      
    },
    methods:{
        dialogClose:function () {
        // body...
        this.currentView="business";
        },
        selectMember:function (item) {
            this.selected = item;
        },
        searchInput()
        {
            let _this = this;
            let input = this.input.replace(/(^\s*)|(\s*$)/g,"");
            if (input == ""){
                 if (_this.request.readyState && _this.request.readyState != 4) {
                        _this.request.abort();
                        $(".cover").hide();
                    }
                return;}
            let timer = setTimeout(() =>{   
                clearTimeout(timer);
                let inputVal = _this.input.replace(/(^\s*)|(\s*$)/g,""); 
                if (inputVal != input) {
                    return;
                } else {
                    if (inputVal == "")return;
                    if (_this.request.readyState && _this.request.readyState != 4) {
                        _this.request.abort();
                        $(".cover").hide();
                    }
                    _this.request = $.ajax({
                        type: "get",
                        url: this.searchuserUrl +"?"+$.param($.extend(window.interfaceSettings.supervisionRequest.header,{q:encodeURIComponent(inputVal)})),
                        timeout:6000,
                        success(result, state, jqxhr)
                    {
                        let members = [];
                        let count = 0;
                        for (let i = 0, len = result.length; i < len; i++) {
                            //leaders only
                            if (_this.leaderOnly && (typeof result[i].isleader =="undefined"||result[i].isleader != 1)) {
                                continue;
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
                            count++
                            if (count == 4)break;
                        }
                        // console.log("members",members)
                        _this.members=[];
                        _this.members = members;
                         $(".cover").hide();
                    }
                ,
                　complete : function(xhr,status){ //请求完成后最终执行参数
            　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
                    $(".cover").hide();
             　　　　　 _this.request.abort();
            　　　　　  alert("请求超时");
            　　　　}
            　　},
                    error(result, state, jqxhr)
                    {   $(".cover").hide();
                        // console.log("error", jqxhr);
                    }
                }
            );
                     $(".cover").show();
            }
        }
    ,
        1000
    )
        ;
    }
    ,
    addUser(item)
    {
        if (item.selected) {
            this.currentView="dialog1";
            return;
        }
        if (this.multiple || this.selectedUsers.length == 0) {
            this.selectedUsers.push(item);
            item.selectedUsers = true;
        } else {
            this.currentView="dialog2";
        }
    }
    ,
    removeUser(index)
    {
        this.selectedUsers[index].selected = false;
        this.selectedUsers.splice(index, 1);
    }
    }
    }

</script>
</body>
</html>
