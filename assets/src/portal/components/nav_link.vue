<template>
    <div class="nav-link" id="navLink">
        <ul class="nav-list">
            <li class="nav-list-item" id="comPortalNav" @hover="">
                <a class="navbar-link com-portal">��˾�Ż�</a>

                <div class="nav-panel company">
                    <ul v-for="list in ">
                    <ul class="list">
                        <li class="list-item"><a class="btn">�ƻ���չ��</a>
                            <!-- /.btn btn-default --></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn btn-success">�ƻ���չ��</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                        <!-- /.list-item -->
                    </ul>
                    <ul>
                        <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                        <!-- /.list-item -->
                        <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                        <!-- /.list-item -->
                    </ul>
                </div>
            </li>
            <li class="nav-list-item dept-subj" id="depPortalNav">
                <a class="navbar-link dep-portal">���ż�ר���Ż�</a>

                <div class="nav-panel row">
                    <div class="list dept col-md-6">
                        <p class="title">��˾�Ż�</p>
                        <!-- /.title -->
                        <ul v-for="list in items.company">

                            <li v-for="item in list" class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                        </ul>
                        <ul>
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                        </ul>
                        <ul>
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                        </ul>
                        <img src="/images/portal/dash_line.png" alt="" class="split"/>
                        <!-- /.split -->
                    </div>
                    <!-- /.list -->
                    <div class="list col-md-6">
                        <p class="title">ר���Ż�</p>
                        <!-- /.title -->
                        <ul>
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                        </ul>
                        <ul>
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                            <li class="list-item"><a href="" class="btn">�ƻ���չ��</a></li>
                            <!-- /.list-item -->
                        </ul>
                    </div>
                    <!-- /.list -->
                </div>
            </li>
            <li class="nav-list-item"><a class="navbar-link workbench">���˹���̨</a></li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">

    module.export= {
        data :function() {
        return {
    company:[ ["�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��"], ["�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��"]]
    department: ["�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��"],
    subject: ["�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��","�ƻ���չ��"],
}
    }
    }
</script>

