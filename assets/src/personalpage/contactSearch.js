/**
 * Created by kingsinsd on 2016/7/11.
 */
var Vue = require("vue");
import leaderSelect from "../portal/components/personalpagesearch.vue";
let headerVm=new Vue({
    el:"#article",
    components:{leaderSelect},
    data(){
        return{
            leaders:[]
        };
    }
});