<style scoped>
    .style8{
        width: 100%;
        height: 100%;
    }
    .style8 iframe{
        width: 100%;
        height: 100%;
    }
</style>
<template>
	<div class="style8">
		<iframe frameborder="no" border="0" :src="dataSource.URL"></iframe>
	</div>
</template>
<script>
    export default{
        data(){
            //
        },
        props:["dataSource"]

    };
</script>