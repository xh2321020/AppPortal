<style scoped>
    
/*----底部样式-----*/
.footer{ background-color:#6a7986; height:95px; margin-top: 2rem;}
.footer_content{ width:490px; margin:0 auto; padding-top:10px; color:#fff;}
.sina{ width:58px; height:65px; text-align:center; float:left; font-size:12px; position: relative; }
.con{ width:245px; float:left; text-align:center; margin:0 0 0 60px;}
.weixin{ height:65px; text-align:center; float:right; font-size:12px; position: relative;}
.fade-in{
    position: absolute;
    bottom: -1rem;
    left: -7rem;
    z-index: 1000;
    display: none;
    padding-right: 1rem;
}
/***************************************end***********************************/
</style>
<template>
     <div class="footer">
        <div class="footer_content">
            <div class="sina" @mouseover="hover_in($event)" @mouseout="hover_out($event)">
                <p><img  :src="'assets/images/portal/sina.jpg'" width="50" height="50"></p>
                <a style="color: #fff;">新浪微博</a>
                  <div class="fade-in">
                  <img :src="'assets/images/portal/sina.jpg'" width="200" height="200">
                </div>
            </div>
            <div class="con" v-if="plantname=='FQ-plant'"><br/>

                <p>技术支持：信息文档处
              </p>
            </div>
            <div class="con" v-if="plantname=='headquaters'">
                <p>运维支持：5484 5483</p>

                <p>技术支持：核工业计算机应用研究所
                <br/>&nbsp&nbsp&nbsp&nbsp&nbsp核动力运行研究所</p>

                <p>版权所有：中国核能电力股份有限公司</p>
            </div>
            <div class="weixin"  @mouseover="hover_in($event)" @mouseout="hover_out($event)">
                <p><img :src="'assets/images/portal/weixin.jpg'"  width="50" height="50"></p>
                <a style="color: #fff;">微信公众平台</a>
                <div class="fade-in">
                <img :src="'assets/images/portal/weixin.jpg'"  width="200" height="200">
                </div>
            </div>
        </div>
    </div>
</template>
<script >
    export default{  
    data(){
        return {
            plantname:window.plantName
        }
    },      
    methods:{
        hover_in:function(ev){
            if(this.plantname=="FQ-plant"){
                  var tar=ev.currentTarget;
            $(tar).find(".fade-in").show();
            }
          
        },
        hover_out:function(ev){
             if(this.plantname=="FQ-plant"){
            var tar=ev.currentTarget;
            $(tar).find(".fade-in").hide();
        }
    }
    }
}
</script>
