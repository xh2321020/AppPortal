<style scoped>
.title{
	padding: 0 1.5rem;
}
	.date{
		float: right;
    	color: #999999;
	}
</style>
<!-- movie template -->
<template>
	<div class="movie-panel">
		 <video style="width: 100%;margin-top: 1rem;" height="240" controls="controls"
                   :poster="'assets/images/default-pics/'+Math.round(Math.random()*50)+'.png'">
                <source v-bind:src="list[0].imagePath" type="video/ogg">
                <source v-bind:src="list[0].imagePath" type="video/mp4">
    
                Your browser does not support the video tag.
            </video>
            <p class="subject-font title"><a :class="{'latest':list[0].latest}" :href="list[0].linkAddr"
                                             target="_blank">{{list[0].title}}</a>
                                              <span class="date" v-text='list[0].publishDate'></span></p>
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
		props:['dataSource'],
		created(){
			let _this=this;
			let dataSource=this.dataSource;
			fetchAjaxService(dataSource,_this);
			this.$watch("list",(val)=>{
				 val[0].imagePath=val[0].imagePath.substr(val[0].imagePath.indexOf("/"));
			});
		}
	};
</script>