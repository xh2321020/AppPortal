<template>
    <div class="panel col-md-4 right" v-bind:class="['panel','right',{CATALOG.CATALOG_WIDTH==2?'col-md-8':'col-md-4'}]">
        <div class="scroll-panel">
            <div class="scroll-icon">
                <em class="glyphicon glyphicon-menu-up"></em>
                <!-- /.glyphicon glyphicon-menu-up -->
            </div>
            <div class="row scroll-item"><img src="../../assets/images/portal/u347.jpg" alt="" class="col-md-4"/>
                <!-- /.col-md-4 -->
                <div class="col-md-8">
                    <p class="subject-font">2015年中国核电企业社会责任报告正式发布</p>

                    <div class="desc-font">
                        福建福清核电
                        <span>09-13</span>
                    </div>
                    <!-- /.mark -->
                </div>
            </div>
            <!-- /.row scroll-item -->
            <div class="row scroll-item"><img src="../../assets/images/portal/u347.jpg" alt="" class="col-md-4"/>
                <!-- /.col-md-4 -->
                <div class="col-md-8">
                    <p class="subject-font">2015年中国核电企业社会责任报告正式发布</p>

                    <div class="desc-font">
                        福建福清核电
                        <span>09-13</span>
                    </div>
                    <!-- /.mark -->
                </div>
            </div>
            <!-- /.row scroll-item -->
            <div class="row scroll-item"><img src="/images/portal/u347.jpg" alt="" class="col-md-4"/>
                <!-- /.col-md-4 -->
                <div class="col-md-8">
                    <p class="subject-font">2015年中国核电企业社会责任报告正式发布</p>

                    <div class="desc-font">
                        福建福清核电
                        <span>09-13</span>
                    </div>
                    <!-- /.mark -->
                </div>
            </div>
            <!-- /.row scroll-item -->
            <div class="row scroll-item"><img src="/images/portal/u347.jpg" alt="" class="col-md-4"/>
                <!-- /.col-md-4 -->
                <div class="col-md-8">
                    <p class="subject-font">2015年中国核电企业社会责任报告正式发布</p>

                    <div class="desc-font desc">
                        福建福清核电
                        <span>09-13</span>
                    </div>
                    <!-- /.mark -->
                </div>
            </div>
            <div class="scroll-icon down">
                <em class="glyphicon glyphicon-menu-down"></em>
                <!-- /.glyphicon glyphicon-menu-up -->
            </div>
            <!-- /.scroll-up -->
            <!-- /.scroll-up -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
module.export={
    data:function(){
        return{
            data:{
                'TITLE':'', IMGPATH:"",'SUBTITLE':"",
                CONTENT:'',AUTHOR:'AUTHOR',"SITE":"SITE",
                "PUBLISHDATE":"PUBLISHDATE",
                "PRIORITY":"PRIORITY",
                "LINKADDR":"LINKADDR",
                "CATALOG":{
                    CATALOG_EN:"栏目标识",
                    'CATALOG_ZH':"栏目中文名称",
                    CATALOG_TYPE:"栏目类型",
                    "CATALOG_WIDTH":"栏目布局",
                    CATALOG_ISMORE:"是否显示更多链接",
                    "CATALOG_MORE_URL":"更多链接地址",
                    CATALOG_TOP_COLOR:"栏目头部颜色"

                }
            }
        }
    }
};

</script>
