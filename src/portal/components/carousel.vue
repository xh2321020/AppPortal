<style scoped>
	.carousel-inner{
		height: 100%;
	}
	.carousel-inner .item{
		height: 100%;
	}
</style>
<template>	
	 	 <div :id="carousel_id" class="carousel slide" data-interval="5000" data-ride="carousel" style="height: 100%;">
            <!-- Indicators -->
            <ol class="carousel-indicators">
                <li v-for="n in carousel.length" :class="{'active':n==0}" :data-target="'#'+carousel_id"
                    :data-slide-to="n"></li>

            </ol>
				
            <!-- Wrapper for slides -->
            <div class="carousel-inner" role="listbox">
                <template v-for="car in carousel">
                    <div :class="['item',{'active':$index==0}]">
                        <a :href="car.linkAddr" target="_blank">
                        <img :src="car.imagePath" @error="imgErrorLoad"
                         style="width: 100%;margin:0 auto;" alt="...">
                        </a>

                        <div class="carousel-caption" v-text="car.title">
                        </div>
                    </div>
                </template>
            </div>
            <!-- Controls -->
            <a class="left carousel-control" :href="'#'+carousel_id" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" :href="'#'+carousel_id" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
	
</template>
<script>
	export default{
		data:function(){
			return{				
		        carousel_id:"carousel_id"+(new Date().getTime()),
				requestBody:{
				URL:"http://bjecmportal.cnnp.com.cn:8000/news/2?size=4",
		        METHOD:"",
		        CONTENT_TYPE:"",
		        PAYLOAD:"",
		        QueryString:"",
		    },		       
		        carousel:[]
			};
		},
		props:["dataSource"],
		created(){
			let _this=this;
			$.ajax({
				type:"get",
				url:this.dataSource.URL+this.dataSource.QueryString,
				success:function(result,status,xhr){
                    let jsonArray = result;
                     for(let i=0,len=jsonArray.length;i<len;i++){
                     	let imgpath=jsonArray[i].imagePath;
                            if(imgpath==null){
                                let randNum=Math.round(Math.random()*22);
                                jsonArray[i].imagePath="assets/images/default-pics/"+randNum+".png";
                            }else{
                             jsonArray[i].imagePath=imgpath.substr(imgpath.indexOf("/"));
                            }
                        }
                        _this.carousel=jsonArray;
				},
				error:function(result,status,xhr){
					console.log("error",result);
				}
			});
		},
		ready(){},
		methods:{
			imgErrorLoad:function (ev) {
			    // body...
			var tar=ev.currentTarget;
			tar.src='assets/images/default-pics/'+Math.round(Math.random()*50)+'.png';
			}
		}
	};
</script>