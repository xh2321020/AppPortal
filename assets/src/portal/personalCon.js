/**
 * Created by kingsinsd on 2016/6/7.
 */

var Vue = require("vue");

var personalVm = new Vue({
    el: "#article",
    data: {
        findcount: 291,
        //数据未读条数
        taskCount: [{
            "ST":0,
            "DY":4292,
            "GB":0,
            "GC":0,
            "WT":0,
            "DB":50
        }],
        //个人待阅
        personalread: [{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=1150278D0202A94B8E258ACE298E43C2&workflowName=SendAdminLetterProcess&handID=1003453","created":"2016-05-30","creator":"20120013","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于恳请向商务部亚洲司报送对韩合作情况报告的请示"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=E7CEFABD3B393B4FB4421B8112260B24&workflowName=ReceiveAdminLetterProcess&handID=1010930","created":"2016-06-03","creator":"20120013","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于各相关部门（单位）报送与国家部委“十三五”规划对接进展情况的通知"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=0E1EAB0A8A4CCB499D9DDF54C37D5C33&workflowName=SendAdminLetterProcess&handID=1010893","created":"2016-05-24","creator":"20120013","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于中国核能电力股份有限公司部门职责调整的通知"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=E73CF306A22E4440827CEE6A97249412&workflowName=SendAdminLetterProcess&handID=1008151","created":"2016-05-30","creator":"20067119","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于报送中核集团核电厂核事故场内应急支援基地项目建议书的请示"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=7A6F1A0D42453C49ADE3BFDADF4DFDA0&workflowName=SendAdminLetterProcess&handID=1008141","created":"2016-06-02","creator":"20067119","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于审查《中国核能电力股份有限公司核电项目前期准备工作指导意见》的请示"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=8C40874E81FD3C4A9AAFC8C92D395583&workflowName=SendAdminLetterProcess&handID=1008081","created":"2016-05-31","creator":"20067119","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于拜访浙江省衢州市发展和改革委员会商议浙西龙游核电厂址保护事宜的函"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=77F2846F6A2C3242AA07F052DEFDD835&workflowName=SendAdminLetterProcess&handID=1007980","created":"2016-06-01","creator":"20067119","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于成立中国核电运行安全研究机构筹备组的通知"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=FB6BC110BF10B74FAE9032969EDF36EE&workflowName=ReceiveAdminLetterProcess&handID=1003487","created":"2016-05-30","creator":"20120013","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于秦山核电厂扩建项目（方家山核电工程）申请环保验收监测的函"}],
        //个人待办
        personal:[{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=process&wobNum=6DC48F211B80D54A9F8581D5F919D4F0&stepName=Application","created":"2013-09-11","creator":"20120014","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"中国核能电力股份有限公司N1-ECM系统管理规定"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=process&wobNum=90C582442BD0394BBEB8BC4379E7E8F9&stepName=Undertake","created":"2014-06-18","creator":"htnpcws_z","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于工程建设项目造价审核情况的复函"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=process&wobNum=7E9286F1209EBC45A24EBA4EC89A0380&stepName=Establishment","created":"2014-12-22","creator":"20120014","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"中国核能电力股份有限公司投资管理制度"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=process&wobNum=2AEC6D7FBB2B6A45B2EEABDAD915F81F&stepName=Undertake","created":"2015-08-20","creator":"20120010","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于征求《中国核工业集团公司对外战略合作协议管理办法(征求意见稿)》意见的函"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=process&wobNum=14F3697106CF2D43801E83A691206E37&stepName=Undertake","created":"2015-08-19","creator":"20120010","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于上报秦山核电有限公司国光宾馆改单身公寓可行性研究报告（代初步设计）的报告"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=process&wobNum=5D174187BE6EEC4F9227B2BA74246D26&stepName=Undertake","created":"2015-08-25","creator":"jnpcws_z","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于田湾核电站建设蓄电池维护厂房的请示"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=process&wobNum=A6C76527F23BD946A066F51DD17DD305&stepName=Undertake","created":"2015-10-14","creator":"20120010","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于上报方家山核电工程及秦山核电基地自筹项目2016年度投资建议计划的请示"},{"affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=process&wobNum=E4780052E93A2C489923D1222879001D&stepName=Undertake","created":"2015-11-03","creator":"20120010","moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/","subject":"关于2016年投资建议计划（一上审查后）的请示"}],
        //公办待办
        public: [
            {
                "affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=7A6F1A0D42453C49ADE3BFDADF4DFDA0&workflowName=SendAdminLetterProcess&handID=1008141",
                "created":"2016-06-02",
                "creator":"20067119",
                "moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/",
                "subject":"关于审查《中国核能电力股份有限公司核电项目前期准备工作指导意见》的请示"
            },
            {
                "affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=7A6F1A0D42453C49ADE3BFDADF4DFDA0&workflowName=SendAdminLetterProcess&handID=1008141",
                "created":"2016-06-02",
                "creator":"20067119",
                "moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/",
                "subject":"关于审查《中国核能电力股份有限公司核电项目前期准备工作指导意见》的请示"
            },
            {
                "affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=7A6F1A0D42453C49ADE3BFDADF4DFDA0&workflowName=SendAdminLetterProcess&handID=1008141",
                "created":"2016-06-02",
                "creator":"20067119",
                "moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/",
                "subject":"关于审查《中国核能电力股份有限公司核电项目前期准备工作指导意见》的请示"
            }
        ],
        //公办待阅
        publicread: [
            {
                "affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=7A6F1A0D42453C49ADE3BFDADF4DFDA0&workflowName=SendAdminLetterProcess&handID=1008141",
                "created":"2016-06-02",
                "creator":"20067119",
                "moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/",
                "subject":"关于审查《中国核能电力股份有限公司核电项目前期准备工作指导意见》的请示"
            },
            {
                "affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=7A6F1A0D42453C49ADE3BFDADF4DFDA0&workflowName=SendAdminLetterProcess&handID=1008141",
                "created":"2016-06-02",
                "creator":"20067119",
                "moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/",
                "subject":"关于审查《中国核能电力股份有限公司核电项目前期准备工作指导意见》的请示"
            },
            {
                "affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=7A6F1A0D42453C49ADE3BFDADF4DFDA0&workflowName=SendAdminLetterProcess&handID=1008141",
                "created":"2016-06-02",
                "creator":"20067119",
                "moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/",
                "subject":"关于审查《中国核能电力股份有限公司核电项目前期准备工作指导意见》的请示"
            }
        ],
        //领导批示
        find: [
            {
                "recipient": "20120014",
                "subject": "关于中国核能电力股份有限公司部门职责调整的通知",
                "signDate":"2016-06-07",
            },
            {
                "recipient": "20120014",
                "subject": "关于中国核能电力股份有限公司部门职责调整的通知",
                "signDate":"2016-06-07",
            },
            {
                "recipient": "20120014",
                "subject": "关于中国核能电力股份有限公司部门职责调整的通知",
                "signDate":"2016-06-07",
            }
        ],
        //受托待办
        specialSuggest:[
            {
                "affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=7A6F1A0D42453C49ADE3BFDADF4DFDA0&workflowName=SendAdminLetterProcess&handID=1008141",
                "created":"2016-06-02",
                "creator":"20067119",
                "moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/",
                "subject":"关于审查《中国核能电力股份有限公司核电项目前期准备工作指导意见》的请示"
            }
        ],
        //委托待办
        memberStates:[
            {
                "affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=7A6F1A0D42453C49ADE3BFDADF4DFDA0&workflowName=SendAdminLetterProcess&handID=1008141",
                "created":"2016-06-02",
                "creator":"20067119",
                "moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/",
                "subject":"关于审查《中国核能电力股份有限公司核电项目前期准备工作指导意见》的请示"
            }
        ],
        //消息提醒
        cultureColumn:[
            {
                "affairUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/processWorkflow.do?action=view&workflowNumber=7A6F1A0D42453C49ADE3BFDADF4DFDA0&workflowName=SendAdminLetterProcess&handID=1008141",
                "created":"2016-06-02",
                "creator":"20067119",
                "moreUrl":"http://bjecm.cnnp.com.cn:80/cnnpbpm/web/",
                "subject":"关于审查《中国核能电力股份有限公司核电项目前期准备工作指导意见》的请示"
            }
        ]
    },
    //ready: function () {
    //    var _this=this;
    //    var fetchArray=["PERSONAL","PUBLIC","PUBLICREAD","PERSONALREAD"];
    //    var nameArray=["personalred","personal","public","publicread","findcount"];
    //    //var taskCount="";
    //    //var task
    //
    //    for(var i=0,len=fetchArray.length+1 ;i<len;i++) {
    //        let url="";
    //        if(i==4){
    //        //    url = "http://bjecm.cnnp.com.cn/cnnpbpm/web/getTaskCount.do";
    //        //}else if(i==5){
    //            url = "http://bjecm.cnnp.com.cn/cnnpbpm/web/leaderCommentCollections.do?action=count";
    //        }else{
    //            url = "http://bjecm.cnnp.com.cn/cnnpbpm/web/getPortalWorklist.do?action=" + fetchArray[i] + "&count=8";
    //        }
    //
    //        $.ajax({
    //            type: "get",
    //            dataType: "text",
    //
    //            //url: "http://social.au-syd.mybluemix.net/news/7?size=20",
    //            url: url,
    //            success: function (data,state,jqxhr) {
    //                alert(url);
    //                let index=jqxhr.index;
    //                    let jsonArray = JSON.parse(data);
    //                    _this[nameArray[index]]=jsonArray;
    //                //let jsonArray = JSON.parse(data);
    //
    //                if(jqxhr.index==0)console.log(data)
    //            },
    //
    //            error: function (err) {
    //                console.log(err);
    //            }
    //        }).index=i;
    //    }
    //}
});