<style scoped>
.scale_panel{
	font-size:12px;
	color:#999;
	width:70%;
	position:absolute; 
	line-height:18px; 
	left:60px;
	top:-0px;
}
.scale_panel .r{
	float:right;
}
.scale span{
	
	width:8px;
	height:16px; 
	position:absolute; 
	left:-2px;
	top:-5px;
	cursor:pointer;
	/*background-color: lightgrey;*/
}
.scale{ background-repeat: repeat-x; background-position: 0 100%; background-color: #E4E4E4; border-left: 1px #83BBD9 solid;  width: 100%; height: 3px; position: relative; font-size: 0px; border-radius: 3px; }
.scale .bar{ background-repeat: repeat-x; background-color: #3BE3FF; width: 0px; position: absolute; height: 3px; width: 0; left: 0; bottom: 0; }

</style>
<template>
	<div class="progress-container">
		<span :id="title_id">0</span>
<div class="scale_panel">
	<span class="r">100</span>0
	<div class="scale" :id="bar_id">
		<div class="bar"></div>
		<span :id="btn_id" style="background: url(assets/images/progressdrag.gif) no-repeat; "></span>
	</div> 
</div> 
	</div>
</template>

<script>
let	scale=function (btn,bar,title,_this){
	this.btn=document.getElementById(btn);
	this.bar=document.getElementById(bar);
	this.title=document.getElementById(title);
	this.step=this.bar.getElementsByTagName("div")[0];
	this.init(_this);
};
scale.prototype={
	init:function (_this){
		var f=this,g=document,b=window,m=Math;
		f.btn.onmousedown=function (e){
			var x=(e||b.event).clientX;
			var l=this.offsetLeft;
			var max=f.bar.offsetWidth-this.offsetWidth;
			g.onmousemove=function (e){
				var thisX=(e||b.event).clientX;
				var to=m.min(max,m.max(-2,l+(thisX-x)));
				f.btn.style.left=to+'px';
				f.ondrag(m.round(m.max(0,to/max)*100),to);
				b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
				_this.rate=m.round(m.max(0,to/max)*100);
			};
			g.onmouseup=new Function('this.onmousemove=null');
		};
	},
	ondrag:function (pos,x){
		this.step.style.width=Math.max(0,x)+'px';
		this.title.innerHTML=pos+'%';
	}
}

  export default {
  	data(){
  		let timeStr=new Date().getTime();
  		return {
  			btn_id:"btn"+timeStr,
  			bar_id:"bar"+timeStr,
  			title_id:"title"+timeStr
  		};
  	},
  	props:["rate"],
  	created:function(){

  	},
  	ready:function(){ 
  		new scale(this.btn_id,this.bar_id,this.title_id,this);
  	},
  	methods:{

  	}
 };
  

</script>