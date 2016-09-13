<template>
	 <!-- <div class="scroll-panel"> -->
	 <!-- start -->
	 		<div class="swiper-container scroll-panel" :id="swiper_id" style="height: 100%;border-top: 1px solid lightgrey;">
			  <div class="swiper-wrapper list">

				<div v-for="item in scrollList" class="swiper-slide row scroll-item" style="margin-top: -1px;border-top: 1px solid lightgrey;border-bottom: none;">
                    <img v-bind:src="item.imagePath" alt="" class="col-md-4" @error="imgErrorLoad"/>

                    <div class="col-md-8">
                        <p class="subject-font"><a :class="{'latest':item.latest}" :href="item.linkAddr"
                                                   target="_blank" v-text="item.title"></a></p>

                        <div class="desc-font">
                            <span class="site" v-text="item.site"></span>
                            <span class="date" v-text='item.publishDate'></span>
                        </div>
                        <!-- /.mark -->
                    </div>
                </div>
			  </div>
			<!-- </div> -->
           <!-- end -->
	</div>
</template>
<script>
	export default{
			data(){return {
				swiper_id:"swiper"+(new Date().getTime()),
				requestBody:{
				URL:"http://bjecmportal.cnnp.com.cn:8000/news/9999?size=10",
				// URL:"http://192.168.252.1:8000/news/9999?size=10",
		        METHOD:"",
		        CONTENT_TYPE:"",
		        PAYLOAD:"",
		        QueryString:""
		    },
		    scrollList:[],
		    fetched:false
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
                                let randNum=Math.round(Math.random()*50);
                                jsonArray[i].imagePath="assets/images/default-pics/"+randNum+".png";
                            }else{
                             jsonArray[i].imagePath=imgpath.substr(imgpath.indexOf("/"));
                            }
                        }
                        _this.scrollList=jsonArray;
                        _this.fetched=true;
                        // _this.swipe();
                      _this.$nextTick(function () {
       				if(_this.fetched)_this.swipe();
      			});
				},
				error:function(result,status,xhr){
					console.log("error",result);
				}
			});
			;
		},
		ready(){
			let _this=this;
		},
		methods:{
			swipe:function(){
			let swiper=new Swiper("#"+this.swiper_id,{
				  autoplay:1000,
				  autoplayDisableOnInteraction : false,
				  loop : true,
				  mode : 'vertical',
				   slidesPerView: 4
				});
			},
			imgErrorLoad:function (ev) {
			    // body...
			var tar=ev.currentTarget;
			tar.src='assets/images/default-pics/'+Math.round(Math.random()*50)+'.png';
			}
		}
	};
</script>