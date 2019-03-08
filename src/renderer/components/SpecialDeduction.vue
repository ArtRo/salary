<template>
    <div>
        <el-row style="margin: 10px">
            <el-col :span="4">
                <el-button type="success" @click="addDeduction">添加</el-button>
            </el-col>
            <el-col :span="6">
                <el-input
                        placeholder="请输入员工名称"
                        prefix-icon="el-icon-search"
                        v-model="searchName">
                </el-input>
            </el-col>
            <el-col :span="6" style="text-align: end">
                <el-button type="info" @click="searchDeduction">搜索</el-button>
            </el-col>
        </el-row>
        <el-table
                :data="salaryList"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="五险个人">
                            <span>{{ props.row.fiveRisksByPerson }}</span>
                        </el-form-item>
                        <el-form-item label="五险公司">
                            <span>{{ props.row.fiveRisksByCompany }}</span>
                        </el-form-item>
                        <el-form-item label="一金个人">
                            <span>{{ props.row.oneGoldByperson }}</span>
                        </el-form-item>
                        <el-form-item label="一金公司">
                            <span>{{ props.row.oneGoldByCompany }}</span>
                        </el-form-item>
                        <el-form-item label="子女">
                            <span>{{ props.row.children }}</span>
                        </el-form-item>
                        <el-form-item label="教育">
                            <span>{{ props.row.education }}</span>
                        </el-form-item>
                        <el-form-item label="住房">
                            <span>{{ props.row.housing }}</span>
                        </el-form-item>
                        <el-form-item label="大病">
                            <span>{{ props.row.seriousIllness }}</span>
                        </el-form-item>
                        <el-form-item label="赡养">
                            <span>{{ props.row.support }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="员工名称"
                    prop="empName">
            </el-table-column>
            <el-table-column
                    label="专项扣除"
                    prop="deduction">
            </el-table-column>
            <el-table-column
                    label="税前工资"
                    prop="grossPay">
            </el-table-column>
            <el-table-column
                    label="package"
                    prop="package">
            </el-table-column>
            <el-table-column
                    label="是否生效"
                    prop="status">
            </el-table-column>
        </el-table>
        <el-dialog title="专项扣除信息" :visible.sync="dialogFormVisible">
            <el-form :model="deductionInfo">
                <el-form-item label="所属员工" :label-width="'120px'">
                    <select v-model="deductionInfo.employeeId" placeholder="请选择员工">
                        <option v-for="(item,index) in empInfos" :value="item.empId">{{item.name}}</option>
                    </select>
                </el-form-item>
                <el-form-item label="五险(个人)" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.fiveRisksByPerson"  autocomplete="off"></input>
                </el-form-item>
                <el-form-item label="五险(公司)" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.fiveRisksByCompany"  autocomplete="off"></input>
                </el-form-item>
                <el-form-item label="公积金(个人)" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.oneGoldByperson" autocomplete="off"></input>
                </el-form-item>
                <el-form-item label="公积金(公司)" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.oneGoldByCompany" autocomplete="off"></input>
                </el-form-item>
                <el-form-item label="税前工资" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.grossPay" autocomplete="off"></input>
                </el-form-item>
                <el-form-item label="子女" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.children" autocomplete="off"></input>
                </el-form-item>
                <el-form-item label="教育" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.education" autocomplete="off"></input>
                </el-form-item>
                <el-form-item label="住房" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.housing" autocomplete="off"></input>
                </el-form-item>
                <el-form-item label="大病" :label-width="'120px'">
                    <!--<input type="number" :v-model="deductionInfo.seriousIllness" autocomplete="off"></input>-->
                    <input type="number" :value="deductionInfo.seriousIllness" @input="setasd($event)"></input>
                </el-form-item>
                <el-form-item label="赡养" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.support" autocomplete="off"></input>
                </el-form-item>
                <el-form-item label="额外扣除" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.addition" autocomplete="off"></input>
                </el-form-item>
                <el-form-item label="专项扣除" :label-width="'120px'">
                    <input type="number" :value="deductionInfo.deduction" disabled="disabled"></input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureOperate()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import comFunc from '@/assets/js/common.js'
    const Salary = require('../../main/sqlOperation/model/Salary');
    export default {
        name: "SpecialDeduction",
        data() {
            return {
                empInfos: [],
                salaryList: [],
                searchName: '',
                dialogFormVisible: false,
                deductionInfo: new Salary(),
                operateType: 0, //0 添加 1 修改,
                asdf: 0
            }
        },
        mounted() {
            const _this = this;
            comFunc.getempInfos(this.sqlOperate, null, null, null, null, function (res) {
                if (res.error) {
                    console.log(res.error);
                } else {
                    _this.empInfos = res;
                }
            });
            window.a = this;
        },
        methods: {
            searchDeduction: function () {
                console.log(this.searchName);
            },
            addDeduction: function () {
                this.dialogFormVisible = true;
                let _this = this;
                this.deductionInfo = new Salary(() => {
                    _this.asdf = _this.deductionInfo.deduction;
                });
                this.operateType = 0;
                window.asd = this.deductionInfo;
            },
            sureOperate: function () {
                const _this = this;
                for (let key in this.deductionInfo) {
                    if (!this.deductionInfo[key]) {
                        alert(key + "不能为空");
                        return;
                    }
                }
                this.sqlOperate.insertSql("salary", this.deductionInfo, function (res) {
                    if (res.error) {
                        console.log(res.error);
                    } else {
                        _this.salaryList = res;
                    }
                    _this.dialogFormVisible = false;
                })
            },
            setasd($event) {
                this.deductionInfo.seriousIllness = $event.target.value;
            }
        }
    }
</script>

<style scoped>

</style>