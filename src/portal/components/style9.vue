<!-- style9 example as 企业内刊 -->
<template>
	<div class="style9 poster">
		 <a href="http://bjecm.cnnp.com.cn/publish2/newsShow/list?catId=17037" target="_blank">
            <img :src="'./assets/images/portal/u402.png'" alt=""/>
        </a>
        <ul class="list">
            <li class="list-item" v-for="pitem in list">
                <p class="title"><a :class="{'latest':pitem.latest}" :href="pitem.linkAddr" target="_blank" v-text='pitem.title'></a>
                </p>
                <span class="date" v-text="pitem.publishDate"></span>
            </li>
        </ul>
	</div>
</template>
<script>
import {fetchAjaxService} from "../../common-function.js";
	export default{
		data(){
			return{
				list:[]
			};
		},
		props:["dataSource"],
		created(){
			let _this=this;
			let dataSource=this.dataSource;
			fetchAjaxService(dataSource,_this);			
		},
		methods:{
			imgErrorLoad:function (ev) {
				var tar=ev.currentTarget;
				tar.src='assets/images/default-pics/'+Math.round(Math.random()*50)+'.png';
			}
		}
	};
</script>