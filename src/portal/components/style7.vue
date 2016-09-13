<!-- (img+text)*3  左图右文-->
<template>
	<div class="style7">
		 <template v-for="item in list">
                <div class="row scroll-item">
                    <img v-bind:src="item.imagePath" alt="" class="col-md-4" @error="imgErrorLoad"/>
                    <div class="col-md-8">
                        <p class="subject-font"><a :class="{'latest':item.latest}" :href="item.linkAddr"
                                                   target="_blank">{{item.title}}</a></p>
    
                        <div class="desc-font">
                            <span class="site">{{item.site}}</span>
                            <span class="date">{{item.publishDate}}</span>
                        </div>
                       
                    </div>
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
			this.$watch("list",(jsonArray)=>{
				for(let i =0,len=jsonArray.length;i<len;i++){
					let imgpath=jsonArray[i].imagePath;
                            if(imgpath==null){
                                let randNum=Math.round(Math.random()*50);
                                jsonArray[i].imagePath="assets/images/default-pics/"+randNum+".png";
                            }else{
                             jsonArray[i].imagePath=imgpath.substr(imgpath.indexOf("/"));
                            }
				}
				
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