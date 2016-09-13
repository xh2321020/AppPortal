/**
 * Created by Mattia on 2016/5/26.
 */
//window.$=require("jquery")
//    alert(11)
 var fetchArray=[2,9999,5,4,2,7,null,17034,17035,17033,17037,3,17032],sizeArray=[4,10,3,8,3,3,0,4,8,8,4,2,8];
        var txtArray=[3,7,8,9,11];
        var nameArray=["carousel","scrollList","cnnpTrends","bulletin","specialSuggest","memberStates",null,"cultureColumn","cultureStates","partyZone",
        "innerReadding","movie","mediaNews"];



var articleVm = new Vue({
    el: "#article",
    data: {
        carousel:[
       ],
        scrollList: [],
        bulletin: [
         
        ],
        cultureColumn: [
           
        ],
        cnnpTrends: [],
        specialSuggest:[
            ],

memberStates:[
            ],
cultureColumn:[
            ],
            cultureStates:[
            ],
            partyZone:[
            ],
innerReadding:[
            ],
            movie:[
            ],
            mediaNews:[
            ]
    },
    created: function () {
        let _this=this;
       this.bindMore();
        for(let i=0,len=fetchArray.length;i<len;i++) {
            if(i==6)continue;
            let url = "http://172.16.51.137:8000/api/v1.0/news/" + fetchArray[i] + "?size=" + sizeArray[i];
            $.ajax({
                type: "get",
                dataType: "json",

                //url: "http://social.au-syd.mybluemix.net/news/7?size=20",
                url: url,
                success: function (data,state,jqxhr) {
                    let index=jqxhr.index;
                    // let jsonArray = JSON.parse(data);
                    let jsonArray = data;
                    if($.inArray(index,txtArray)==-1){
                        for(let i=0,len=jsonArray.length;i<len;i++){
                            if(jsonArray[i].imagePath==null){
                                let randNum=Math.round(Math.random()*22);
                                jsonArray[i].imagePath="assets/images/default-pics/"+randNum+".png";                                
                            }
                             jsonArray[i].linkAddr="/pages/portal/news_detail.html?id="+jsonArray[i].id;
                        }                       
                    }
                    _this[nameArray[index]]=jsonArray;
                    if(jqxhr.index==2)console.log(data)
                   
                },

                error: function (err) {
                    console.log(err);
                }
            }).index=i;
        }

      



      
        // $.ajax({
        //     type:"get",
        //     dataType:"json",
        //     url:"http://192.168.1.101:3000/jsonp?callback=?&cardid=5&count=3",
        //     success:function(data){
        //     _this.cnnpTrends=data;
        //     },
        //     error:function(err){
        //         console.log(err);
        //     }
        // });

        // $.ajax({
        //     type:"get",
        //     dataType:"json",
        //     url:"http://192.168.1.101:3000/jsonp?callback=?&cardid=4&count=8",
        //     success:function(data){
        //     _this.bulletin=data;
        //     },
        //     error:function(err){
        //         console.log(err);
        //     }
        // });
    },
    methods: {
        scrollPanel: function (ev) {
            var btn = ev.currentTarget;
            var list = this.scrollList;
            /*   var panel=$(document.getElementById("scrollList"));
             var isUp=$(btn).hasClass("up");
             if(isUp){
             panel.animate({top:panel.position().top-115+"px"},"fast");
             }else{
             panel.animate({top:panel.position().top+115+"px"},"fast");
             }*/
            var panel = document.getElementById("scrollList");
            var index = parseInt(panel.getAttribute("data-index"));
            var isUp = $(btn).hasClass("up");
            if (isUp && index > 0) {
                $(panel.children[index - 1]).show(100);
                panel.setAttribute("data-index", index - 1);
            } else if (!isUp && index < list.length - 4) {
                $(panel.children[index]).hide(100);
                panel.setAttribute("data-index", index + 1);
            }
        },
imgErrorLoad:function (ev) {
    // body...
var tar=ev.currentTarget;
tar.src='assets/images/default-pics/'+Math.round(Math.random()*50)+'.png';
},
        bindMore:function (argument) {
            // body...
             $(document).on("click",".find-more",function (ev) {
            // body...
            var btn=ev.currentTarget;
            let url="/pages/portal/news_more.html?type=";
            let index=parseInt(btn.getAttribute("data-index"));
            url+=fetchArray[index];
            window.open(url);
        });
        }
    }
});