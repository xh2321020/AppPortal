<table>
    <thead>
    <th>..</th>
    <th>..</th>
    <th>..</th>
    <th>..</th>
    <th>..</th>
    </thead>
    <tbody>
    <tr v-for="member in members">
        <td v-for="n in 3">{{member.orgtree[n+1]?member.orgtree[n+1].name:""}}</td>
        <td>{{member.displayname}}</td>
        <td>
            <button class="btn btn-default" @click="addUser(member)">添加</button>
        </td>
    </tr>
    </tbody>
</table>


<script type="text/javascript">
    $.ajax({
        type: "get",
        url: this.supervisionRequest.searchuserUrl + "&q=" + inputVal,
        success(result, state, jqxhr)
    {
        let members = [];
        let count = 0;
        for (let i = 0, len = result.length; i < len; i++) {
            //leaders only
            if (_this.leaderOnly && (typeof result[i].isleader == "undefined" || result[i].isleader != 1)) {
                continue;
            }
            let orgtree = result[i].orgtree;
            if (orgtree) {
                for (let orgi in orgtree) {
                    for (let key in orgtree[orgi])
                        orgtree[orgi].name = orgtree[orgi][key];
                }
            }
            result.orgtree = orgtree;
            members.push(result[i]);
            count++
            if (count == 4)break;
        }
        _this.members = members;
    }
    ,
    error(result, state, jqxhr)
    {
        console.log("error", jqxhr);
    }
    }
    )
    ;

</script>