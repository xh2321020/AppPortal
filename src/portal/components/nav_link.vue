<template>
    <div class="nav-link" id="navLink">
        <ul class="nav-list">
            <li class="nav-list-item" id="comPortalNav" @hover="">
                <a class="navbar-link com-portal">公司门户</a>

                <div class="nav-panel company">
                    <ul v-for="list in ">
                    <ul class="list">
                        <li class="list-item"><a class="btn">计划发展部</a>
                            <!-- /.btn btn-default --></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn btn-success">计划发展部</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                        <!-- /.list-item -->
                    </ul>
                    <ul>
                        <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                        <!-- /.list-item -->
                    </ul>
                </div>
            </li>
            <li class="nav-list-item dept-subj" id="depPortalNav">
                <a class="navbar-link dep-portal">部门及专题门户</a>

                <div class="nav-panel row">
                    <div class="list dept col-md-6">
                        <p class="title">公司门户</p>
                        <!-- /.title -->
                        <ul v-for="list in items.company">

                            <li v-for="item in list" class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                        </ul>
                        <ul>
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                        </ul>
                        <ul>
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                        </ul>
                        <img src="../../assets/images/portal/dash_line.png" alt="" class="split"/>
                        <!-- /.split -->
                    </div>
                    <!-- /.list -->
                    <div class="list col-md-6">
                        <p class="title">专题门户</p>
                        <!-- /.title -->
                        <ul>
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                        </ul>
                        <ul>
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">计划发展部</a></li>
                            <!-- /.list-item -->
                        </ul>
                    </div>
                    <!-- /.list -->
                </div>
            </li>
            <li class="nav-list-item"><a class="navbar-link workbench">个人工作台</a></li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">

    module.export= {
        data :function() {
        return {
    company:[ ["计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部"], ["计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部"]]
    department: ["计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部"],
    subject: ["计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部","计划发展部"],
}
    }
    }
</script>

