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
         top: calc( 50% - 8rem);
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
    <div class="input-grout" style="width: 50%;position: relative;">
     <button type="button" class="btn btn-sm" data-toggle="modal" :data-target="'#'+modal_id">请选择</button>
    </div>
    <div class="modal fade" :id="modal_id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">责任领导选择(仅搜索领导)</h4>
                </div>
                <div class="modal-body">
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
                            <!-- <td >{{member.orgtree[1]?member.orgtree[1].name:""}}</td>
                            <td>{{member.orgtree[1]?member.orgtree[1].name:""}}</td> -->
                            <td>{{member.displayname}}</td>
                            <td>
                                <button class="btn btn-default" @click="addUser(member)">添加</button>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                    <div class="result">
                        <ul class="list">
                            <li v-for="user in selected" class="btn btn-primary" @click="removeUser($index,event)">
                                <a v-text="user.displayname" style="color: white;">
                                </a><i class="glyphicon glyphicon-remove"></i></li>
                        </ul>
                    </div>
                        <div class="cover">
                            <img class="loading" :src="'assets/images/loading3.gif'"></img>
                        </div>
                   </section>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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

    }
    ,
    methods:{
        selectMember:function (item) {
            this.selected = item;
        },
        searchInput()
        {
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

                    _this.request = $.ajax({
                        type: "get",
                        url: this.supervisionRequest.searchuserUrl + "&q=" + inputVal,
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
                        _this.members = members;
                         $(".cover").hide();
                    }
                ,
                    error(result, state, jqxhr)
                    {   $(".cover").hide();
                        console.log("error", jqxhr);
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
</body>
</html>
