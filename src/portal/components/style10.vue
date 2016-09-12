
<template>
	<div class="style10">
		{{{list}}}
	</div>
</template>
<script>
import {fetchAjaxService} from "../../common-function.js";
    export default{
        data(){
            //
            list:""
        },
        props:["dataSource"],
        created:function(){
            let _this=this;
            let dataSource=this.dataSource;
            fetchAjaxService(dataSource,_this);
            }
      
    };
</script>