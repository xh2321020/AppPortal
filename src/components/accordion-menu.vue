<style scoped>
ul {
	list-style-type: none;
}

a {
	color: #b63b4d;
	text-decoration: none;
}

/** =======================
 * Contenedor Principal
 ===========================*/
h1 {
 	color: #FFF;
 	font-size: 24px;
 	font-weight: 400;
 	text-align: center;
 	margin-top: 80px;
 }

h1 a {
 	color: #c12c42;
 	font-size: 16px;
 }

 .accordion {
 	width: 100%;
 	max-width: 360px;
 	margin: 30px auto 20px;
 	background: #FFF;
 	-webkit-border-radius: 4px;
 	-moz-border-radius: 4px;
 	border-radius: 4px;
 }

.accordion .link {
	cursor: pointer;
	display: block;
	padding: 15px 15px 15px 42px;
	color: #739217;
	font-size: 14px;
	font-weight: 400;
	border-bottom: 1px solid #CCC;
	position: relative;
	-webkit-transition: all 0.4s ease;
	-o-transition: all 0.4s ease;
	transition: all 0.4s ease;
}

.accordion li:last-child .link {
	border-bottom: 0;
}

.accordion li i {
	position: absolute;
	top: 16px;
	left: 12px;
	font-size: 18px;
	color: #739217;
	-webkit-transition: all 0.4s ease;
	-o-transition: all 0.4s ease;
	transition: all 0.4s ease;
}

.accordion li i.fa-chevron-down,.accordion li i.fa-plus{
	right: 12px;
	left: auto;
	font-size: 16px;
}

.accordion li.open .link {
	color: #739217;
}

.accordion li.open i {
	color: #739217;
}
.accordion li.open i.fa-chevron-down{
	-webkit-transform: rotate(180deg);
	-ms-transform: rotate(180deg);
	-o-transform: rotate(180deg);
	transform: rotate(180deg);
}
.accordion .open>.link .fa-plus{
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	-o-transform: rotate(45deg);
	transform: rotate(45deg);
}

/**
 * Submenu
 -----------------------------*/
 .submenu {
 	display: none;
 	background: #444359;
 	font-size: 14px;
 	max-height: 30rem;
 	overflow-y: auto;
 }

 .submenu li {
 	border-bottom: 1px solid #4b4a5e;
 }
 .submenu .link{
	color:white!important;
}
.submenu .link i{
	color:white!important;
}
 
 .submenu a {
 	display: block;
 	text-decoration: none;
 	color: #d9d9d9;
 	padding: 12px;
 	padding-left: 42px;
 	-webkit-transition: all 0.25s ease;
 	-o-transition: all 0.25s ease;
 	transition: all 0.25s ease;
 }

 .submenu a:hover {
 	background: #739217;
 	color: #FFF;
 }
 .submenu .selected{
 	background: #A1C636;
 	color: #000;
 }
</style>
<!-- Contenedor -->
<template>
<div style="display:inline-block;">
 <button type="button" class="btn  btn-sm" style="vertical-align: baseline;" data-toggle="modal" :data-target="'#'+modal_id">{{btn_title}}</button>
<!-- Modal -->
<div class="modal fade" :id="modal_id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	<h4 class="modal-title">部门列表</h4>
      </div>
      <div class="modal-body">

		<!--accordion start -->
		
			<ul :id="accordion_id" class="accordion">
				<li v-for="org in orgs">
					<div class="link"><i class="fa fa-th-list"></i>{{org.shortname?org.shortname:name}}<i class="fa fa-chevron-down"></i></div>
					<ul class="submenu">
						
						<li  v-for="dept in depts[org.ou]">
						<template v-if="sections[dept.ou]">
							<div class="link" ><i class="fa fa-th-list"></i>{{dept.name}}<i class="fa fa-plus"></i></div>
							<ul class="submenu">
								<li v-for="section in sections[dept.ou]"><a @click="selectDept(section,$event)">{{section.name}}</a></li>
							</ul>
						</template>
							<template v-else>
								<a @click="selectDept(dept,$event)">{{dept.name}}</a>
							</template>
						</li>
					</ul>
				</li>			
			</ul>
		</div>
		<!-- accordion end -->
		  <div class="modal-footer">
     	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
     </div>
      </div>
    
    </div>
  </div>
</div>
<!--modal end-->


	
</template>
<script >
let supervisionRequest=window.interfaceSettings.supervisionRequest;
export default{
	data(){
		return{
			modal_id:"deptModal"+(new Date().getTime()),
			accordion_id:"accordion"+(new Date().getTime()),
orgs:[],
depts:{},
sections:{},
times:{}
		};
	},	
props:["supervisionRequest","selectedDepts","multiple","btn_title"],
	created(){
		// console.log(this.supervisionRequest)	

		let _this=this;
		    $.ajax({
                type: "get",
                dataType: "json",
                url: supervisionRequest.api.orgUrl+"?"+$.param(supervisionRequest.header),
                success: function (result, state, jqxhr) {
                    _this.orgs = result;
                    _this.fetchDepts();                   
                },
                error: function (data, state, jqxhr) {
                    // console.log(jqxhr.key)
                    // console.log(data)
                }
            });
	},
	ready(){		
		let _this=this;
		var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;
		this.el.on("click",".link",{el: this.el, multiple: this.multiple}, this.dropdown);	
	}
	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el,
			$this = $(this),
			$next = $this.next();
			$next.toggle();
		$this.parent().toggleClass('open');
		let parentBro=$this.parent().siblings();
		for(let i=0;i<parentBro.length;i++){
			let single=$(parentBro[i]);
			if(single.hasClass("open")){
				single.find(">.submenu").toggle();
				single.toggleClass("open");
				break;
			}
		}	
	}	

	var accordion = new Accordion($('#'+_this.accordion_id), true);
	},
	methods:{
	selectDept(dept,event){
		let selectedDepts=this.selectedDepts;
			dept.selected=!dept.selected;
		if(this.multiple=="false"){
			if(selectedDepts.length>0){
				selectedDepts[0].selected=false;
				if(this.selected){					
			this.selected.toggleClass("selected");
				}
			}
			this.selectedDepts=[];
			if(dept.selected){
			this.selectedDepts.push(dept);
			this.selected=$(event.currentTarget).toggleClass("selected");
			}
			return;
		}
	
		$(event.currentTarget).toggleClass("selected");
		if(dept.selected){
			selectedDepts.push(dept);
		}else{
			for(let i in selectedDepts){
				if (selectedDepts[i].id==dept.id){
					selectedDepts.splice(i,1);
					break;
				}
			}
		}
	},
		fetchDepts(){
			let _this=this;
			this.times.dept=0;
				$.ajax({
				type:"get",
				dataType: "json",
				url:supervisionRequest.api.deptUrl+"?"+$.param(supervisionRequest.header),
				success:function(result,state,jqxhr){
					if(result&&result.length>0){
						// _this.depts[jqxhr.index.toString()]=result;	
					for(let i=0;i<result.length;i++){
											result[i].selected=false;
										}
						let depts=result;
						let orgs=_this.orgs,department={},sections={};
						for(let i=0,len=orgs.length;i<len;i++){
							let pid=orgs[i].id;
							let new_depts=[];
							for(let di=0;di<depts.length;di++){							
								if(depts[di].pid==pid){
									new_depts.push(depts[di]);
									depts.splice(di,1);
									di--;
								}
							}
							department[pid]=new_depts;
						}
						for(let key in department){
							let dept=department[key];
							for(let i=0;i<dept.length;i++){
								let pid=dept[i].id;
								sections[pid]=[];
								for(let si=0;si<depts.length;si++){
									if(pid==depts[si].pid){
										sections[pid].push(depts[si]);
										depts.splice(si,1);
										si--;
									}
								}
								if(sections[pid].length==0)delete sections[pid];
							}
						}
						_this.depts=department;
						_this.sections=sections;												
					}					
				},
				error:function(data){
					// console.log(data)
				}
			});
		},
		fetchSections(iid){
			let _this=this,depts=this.depts[iid];
			this.times[iid]=0;
			for(let i=0,len=depts.length;i<len;i++){
				$.ajax({
				type:"get",
				dataType: "json",
				url:supervisionRequest.deptUrl.replace("%id%",depts[i].ou)+"?"+$.param(supervisionRequest.header),
				success:function(result,state,jqxhr){
					for(let j=0;j<result.length;j++){
						result[j].selected=false;
					}
					if(result&&result.length>0){

						let ou=jqxhr.index.toString();
						_this.sections[ou]=result;		
						// let sections=_this.sections;						
						// _this.sections={};
						// _this.sections=sections;		
						
					}
						
						if(++_this.times[iid]==_this.depts[iid].length){
						let sections=_this.sections;						
						_this.sections={};
						_this.sections=sections;	
						
						}				
				},
				error:function(data){
					// console.log(data)
				}
			}).index=depts[i].ou;
			}
		}
	}
}
	
</script>