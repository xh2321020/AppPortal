import Vue from "vue";
let supervisionRequest={searchuserUrl:"http://172.16.51.137:8010/api/contact/searchuser?apikey=e71982d5401b488da4acef8827c41845&id=20116636"};
let selectUserVm=new Vue({
el:"body",
	data:{
		leaders:[],
		requests:supervisionRequest
	},
	components:{ userSelect:require("../components/user-selector.vue")},
	created:function(){
		this.$watch("leaders",function(newval){
			window.selectedUsers=newval;
		});
	}
}); 
