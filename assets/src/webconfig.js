let serverAddress="http://172.16.51.137:8000",serverAddress2="";

var supSourceUrl=serverAddress+'/api/v1.0/cache/find/type/source-code';// 督办来源接口
var orgUrl='http://172.16.51.137:8010/api/contact/getOrglist?apikey=e71982d5401b488da4acef8827c41845'// 组织机构-公司接口';
var supAreaUrl=serverAddress+'/api/v1.0/cache/find/type/area-code'// 督办领域接口';
var deptUrl='http://172.16.51.137:8010/api/contact/getorgbyou?apikey=e71982d5401b488da4acef8827c41845&ou='//{组织机构-公司ID} 某公司下面部门接口';
var searchUrl=serverAddress+'/api/v1.0/supervision/search';
//?page={当前页码，第一页为0}&size={每页条数}';
// 最后一个接口为POST方式，其他的均为GET方式
var supDetailUrl=serverAddress+"/api/v1.0/supervision/findchildren/";//{id}
var supAddUrl=serverAddress+"/api/v1.0/supervision/add";//新增督办
var leaderUrl="http://172.16.51.137:8010/api/contact/getleader?apikey=e71982d5401b488da4acef8827c41845";//获取领导
var deptListUrl="http://172.16.51.137:8010/api/contact/getchlistbyou?apikey=e71982d5401b488da4acef8827c41845&ou=";//子部门;
var searchuserUrl="http://172.16.51.137:8010/api/contact/searchuser?apikey=e71982d5401b488da4acef8827c41845"//用户模糊查询
let postphoneUrl=serverAddress+'/api/v1.0/supervision/postpone/';


	var requestUrls={
		supervisionRequest:{
		supSourceUrl:supSourceUrl,
		orgUrl:orgUrl,
		supAreaUrl:supAreaUrl,
		deptUrl:deptUrl,
		searchUrl:searchUrl,
		supDetailUrl:supDetailUrl,
		supAddUrl:supAddUrl,
		searchuserUrl:searchuserUrl,
		deptListUrl:deptListUrl,
		postphoneUrl:postphoneUrl
	}
}
///getorgInfo

// export {requestUrls}
// export default requestUrls
module.exports=requestUrls