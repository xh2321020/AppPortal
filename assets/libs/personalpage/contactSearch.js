/**
 * Created by kingsinsd on 2016/7/11.
 */
var Vue = require("vue");
import LeaderSelect from "../../src/portal/components/personalpagesearch.vue";
// alert(LeaderSelect)
let headerVm=new Vue({
    el:"#article",
    data(){
        return{
            leaders:[]
        };
    },

    components:{leaderSelect:LeaderSelect}
});