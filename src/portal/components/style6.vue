<!-- img-scroll/text/text/text 杂志滚动新闻 -->
<style scoped>
.swiper-container{
	padding: 1.5rem 0;
}
	.swiper-slide img{
		width: 100%;
		height: 10rem;
		border: 1px solid lightgray;
	}
	.list-item{
		height: auto;
		border-top: 1px solid lightgray;
		margin: 6px 0 ;
		padding: 6px 0;
	}

</style>
<template>
	<div class="style6">        
    	<div class="swiper-container" :id="swiper_id" style="width: 100%;">
    		  <div class="swiper-wrapper">
    		  	<div v-for="item in list" class="swiper-slide">
    		  	<a :href="item.linkAddr">
    		  		  <img v-bind:src="item.imagePath"  
    		  		  alt="" @error="imgErrorLoad"/></a>
    		  	</div>
    		  </div>
    	</div>
        <div class="txt-content">
        	 <template v-for="item in list|limitBy  3">
	            <div class="list-item simple-item">
	                <p class="subject-font"><a :class="{'latest':item.latest}" :href="item.linkAddr" target="_blank" v-text="item.title"></a>
	                    <span class="date desc-font" v-text='item.publishDate'></span></p>
	            </div>
        	</template>
        </div>
       
    </div>
</template>
<script >
import {fetchAjaxService} from "../../common-function.js";
	export default{
		data(){
			return{	
				swiper_id:"swiper"+(new Date().getTime()),
				list:[]
			};
		},
		props:['dataSource'],
		created(){
			let _this=this;
			let dataSource=this.dataSource;
			fetchAjaxService(dataSource,_this);
			// this.$watch("list",(val)=>{
			// 	if(val[0].imagePath==null)val[0].imagePath='assets/images/default-pics/'+Math.round(Math.random()*50)+'.png';
			// });
		},
		methods:{
			successNext:function(){
				let _this=this;
				let list=this.list.slice(0,5);
				for(let i=0;i<5;i++){
					if(list[i].imagePath==null)
						list[i].imagePath='assets/images/default-pics/'+Math.round(Math.random()*50)+'.png';
					else list[i].imagePath=list[i].imagePath.substr(list[i].imagePath.indexOf("/"));
				}
				this.list=list;
				this.$nextTick(function(){
					_this.swipe();
				});			
			},
			swipe:function(){
			let swiper=new Swiper("#"+this.swiper_id,{
				  autoplay:1000,
				  autoplayDisableOnInteraction : false,
				  loop : true,
				   slidesPerView: 3,
				   calculateHeight:true
				});
			},
			imgErrorLoad:function (ev) {
				var tar=ev.currentTarget;
				tar.src='assets/images/default-pics/'+Math.round(Math.random()*50)+'.png';
			}
		}
	};
</script>