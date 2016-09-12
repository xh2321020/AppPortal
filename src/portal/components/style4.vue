<!-- pure text 文字型 bulletin 通知公告 -->
<template>
	<div class="pure-txt">
        <ul class="list subject-font">
            <li v-for="item in list" class="list-item">
                <p class="title"><a :class="{'latest':item.latest}" :href="item.linkAddr" target="_blank" v-text="item.title"></a>
                </p>
                <span class="date" v-text='item.publishDate'></span>
            </li>    
         </ul>
    </div>
</template>
<script >
import {fetchAjaxService} from "../../common-function.js";
	export default{
		data(){
			return{
				list:[]
			};
		},
		props:['dataSource'],
		created(){
			let _this=this;
			let dataSource=this.dataSource;
			fetchAjaxService(dataSource,_this);
		}
	};
</script>