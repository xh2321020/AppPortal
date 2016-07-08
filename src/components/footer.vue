<style>
    
/*----底部样式-----*/
.footer{ background-color:#6a7986; height:80px; margin-top: 2rem;}
.footer_content{ width:490px; margin:0 auto; padding-top:10px; color:#fff;}
.sina{ width:58px; height:65px; text-align:center; float:left; font-size:12px; }
.con{ width:245px; float:left; text-align:center; margin:0 0 0 60px;}
.weixin{ height:65px; text-align:center; float:right; font-size:12px;}
/***************************************end***********************************/
</style>
<template>
     <div class="footer">
        <div class="footer_content">
            <div class="sina">
                <p><img :src="'assets/images/portal/sina.jpg'" width="50" height="50"></p>
                <a>新浪微博</a>
            </div>
            <div class="con">
                <p>运维支持：5484 5483</p>

                <p>技术支持：核工业计算机应用研究所</p>

                <p>版权所有：中国核能电力股份有限公司</p>
            </div>
            <div class="weixin">
                <p><img :src="'assets/images/portal/weixin.jpg'" width="50" height="50"></p>
                <a>微信公众平台</a>
            </div>
        </div>
    </div>
</template>