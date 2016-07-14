<style scoped>
	.outer-container .progress-container{
		margin: 0 auto;
	}
	.comment{
		width: 90%;
		margin: 3rem auto;
	}
	/*.comment textarea{
		width: 100%;
	}*/
</style>
<template>
	<div class="outer-container">
		<modal-pop :modal_id="modal_id">
			<div slot="body">
				<form class="form-horizontal">
				  <div class="form-group">
				    <label  class="col-sm-2 control-label">进度</label>
				    <div class="col-sm-10">
				    <progress-bar :rate.sync="rate.rate"></progress-bar>
				    </div>
				  </div>
					<div class="form-group">
					<label class="col-sm-2 control-label"></label>
					<textarea class="form-control" v-model="rate.comment"></textarea>
					</div>					
					</form>
				</div>
		</modal-pop>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			};
		},
		props:["rate","modal_id"],
		components:{
		modalPop:require("../../components/modal-pop.vue"),
		progressBar:require("../../components/progressbar-drag.vue")
		},
		created:function () {
			// body...
			console.log("rate",this.rate)
		},ready:function () {
		}
	};
</script>