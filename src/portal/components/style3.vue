<!-- img+desc/text/text 上图下文 中国核电动态 -->
<template>
	<div class="material">
        <div class="list-item" v-if="list.length>0" style="padding-top: 5px;padding-bottom: 1.6rem;">
            <a :href="list[0].linkAddr" target="_blank">
                <img v-bind:src="list[0].imagePath" alt="" />

                <p :class="['subject-font','subject',{'latest':list[0].latest}]" v-text="list[0].title" style="height: 4rem;"></p>

                <div class="desc-font desc" v-if="list[0].subTitle">{{list[0].subTitle}}
                </div>
                    <span class="date" style="bottom: -1rem;font-size: 1.2rem;"> {{list[0].publishDate}}</span>

            </a>
        </div>
        
        <template v-for="item in list|limitBy  2 1">
            <div class="list-item simple-item">
                <p class="subject-font"><a :class="{'latest':item.latest}" :href="item.linkAddr" target="_blank" v-text="item.title"></a>
                    <span class="date desc-font" v-text='item.publishDate' style="bottom: -1rem;"></span></p>
            </div>
        </template>
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
			this.$watch("list",(val)=>{
				if(val[0].imagePath==null)val[0].imagePath='assets/images/default-pics/'+Math.round(Math.random()*50)+'.png';
				else val[0].imagePath=val[0].imagePath.substr(val[0].imagePath.indexOf("/"));
			});
		},
		methods:{
			imgErrorLoad:function (ev) {
				var tar=ev.currentTarget;
				tar.src='assets/images/default-pics/'+Math.round(Math.random()*50)+'.png';
			}
		}
	};
</script>