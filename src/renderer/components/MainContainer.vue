<template>
    <div>
        <el-container style="height: 500px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-setting"></i>员工管理</template>
                        <router-link to="/employee">
                            <el-menu-item index="1-1">员工列表</el-menu-item>
                        </router-link>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>薪资管理</template>
                        <router-link to="/specialDeduction">
                            <el-menu-item index="2-1">专项扣除</el-menu-item>
                        </router-link>
                        <router-link to="/monthlyAudit">
                            <el-menu-item index="2-2">月度审核</el-menu-item>
                        </router-link>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-message"></i>工资管理</template>
                        <router-link to="/salary">
                            <el-menu-item index="3-1">薪资查看</el-menu-item>
                        </router-link>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                </el-header>

                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: "SiderContainer",
        data() {
            return {
            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>