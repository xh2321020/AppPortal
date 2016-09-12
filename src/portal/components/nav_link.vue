<template>
    <div class="nav-link" id="navLink">
        <ul class="nav-list">
            <li class="nav-list-item" id="comPortalNav" @hover="">
                <a class="navbar-link com-portal">¹«Ë¾ÃÅ»§</a>

                <div class="nav-panel company">
                    <ul v-for="list in ">
                    <ul class="list">
                        <li class="list-item"><a class="btn">¼Æ»®·¢Õ¹²¿</a>
                            <!-- /.btn btn-default --></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn btn-success">¼Æ»®·¢Õ¹²¿</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                        <!-- /.list-item -->
                    </ul>
                    <ul>
                        <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                        <!-- /.list-item -->
                    </ul>
                </div>
            </li>
            <li class="nav-list-item dept-subj" id="depPortalNav">
                <a class="navbar-link dep-portal">²¿ÃÅ¼°×¨ÌâÃÅ»§</a>

                <div class="nav-panel row">
                    <div class="list dept col-md-6">
                        <p class="title">¹«Ë¾ÃÅ»§</p>
                        <!-- /.title -->
                        <ul v-for="list in items.company">

                            <li v-for="item in list" class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                        </ul>
                        <ul>
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                        </ul>
                        <ul>
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                        </ul>
                        <img src="../../assets/images/portal/dash_line.png" alt="" class="split"/>
                        <!-- /.split -->
                    </div>
                    <!-- /.list -->
                    <div class="list col-md-6">
                        <p class="title">×¨ÌâÃÅ»§</p>
                        <!-- /.title -->
                        <ul>
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                        </ul>
                        <ul>
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">¼Æ»®·¢Õ¹²¿</a></li>
                            <!-- /.list-item -->
                        </ul>
                    </div>
                    <!-- /.list -->
                </div>
            </li>
            <li class="nav-list-item"><a class="navbar-link workbench">¸öÈË¹¤×÷Ì¨</a></li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">

    module.export= {
        data :function() {
        return {
    company:[ ["¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿"], ["¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿"]]
    department: ["¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿"],
    subject: ["¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿","¼Æ»®·¢Õ¹²¿"],
}
    }
    }
</script>

