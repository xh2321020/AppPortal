<style scoped>
	.comment{
		margin-top: 1rem;
	}

</style>
<template>
	<div class="com-container">
	<form class="form-horizontal">
	  <div class="form-group">
	    <label  class="col-sm-2 control-label">日期</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" :id="input_id"/>
	    </div>
	  </div>
	  <div class="form-group">
	    <label  class="col-sm-2 control-label">延期原因</label>
	    <div class="col-sm-10">
	   <textarea class="form-control comment" v-model="comment"></textarea>
	    </div>
	  </div>
  	</form>
	
	</div>
</template>
<script >
	export default{
		data:function(){
			let timeNow=new Date().getTime();
			return{
				input_id:"dateInput"+timeNow
			};
		},props:["estimatedcompletetiontime","comment"],
		created:function(){
			let _this=this;
			this.$watch("estimatedcompletetiontime",function(newVal, oldVal){
				$("#"+_this.input_id).val(newVal);
			});
		},ready:function(){
			let _this=this;
			$("#"+this.input_id).daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
      //       locale: {
		    //   format: 'YYYY-MM-DD'
		    // },
	    startDate: this.estimatedcompletetiontime
        }, function (start, end, label) {
            _this.estimatedcompletetiontime =  start.format('YYYY-MM-DD');
         
        });
		}
	};
</script>