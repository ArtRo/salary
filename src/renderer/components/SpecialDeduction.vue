<template>
    <div>
        <el-row style="margin: 10px">
            <el-col :span="4">
                <el-button type="success" @click="addDeduction">添加</el-button>
            </el-col>
            <el-col :span="6">
                <el-input placeholder="请输入员工名称" prefix-icon="el-icon-search" v-model="searchName"/>
            </el-col>
            <el-col :span="6" style="text-align: end">
                <el-button type="info" @click="searchDeduction">搜索</el-button>
            </el-col>
        </el-row>
        <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="salaryList" style="width: 100%">
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
            <el-table-column label="员工名称" prop="name"/>
            <el-table-column label="专项扣除" prop="deduction"/>
            <el-table-column label="税前工资" prop="grossPay"/>
            <el-table-column label="package" prop="package"/>
            <el-table-column label="是否生效">
                <template slot-scope="scope">
                    {{scope.row.status==1?'是':'否'}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="专项扣除信息" :visible.sync="dialogFormVisible">
            <el-form v-if="deductionInfo" :model="deductionInfo">
                <el-form-item label="所属员工" :label-width="'120px'">
                    <select v-model="deductionInfo.employeeId" placeholder="请选择员工">
                        <option v-for="(item,index) in empInfos" :value="item.empId">{{item.name}}</option>
                    </select>
                </el-form-item>
                <el-form-item label="五险(个人)" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.fiveRisksByPerson"></input>
                </el-form-item>
                <el-form-item label="五险(公司)" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.fiveRisksByCompany"></input>
                </el-form-item>
                <el-form-item label="公积金(个人)" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.oneGoldByperson"></input>
                </el-form-item>
                <el-form-item label="公积金(公司)" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.oneGoldByCompany"></input>
                </el-form-item>
                <el-form-item label="税前工资" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.grossPay"></input>
                </el-form-item>
                <el-form-item label="子女" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.children"></input>
                </el-form-item>
                <el-form-item label="教育" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.education"></input>
                </el-form-item>
                <el-form-item label="住房" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.housing"></input>
                </el-form-item>
                <el-form-item label="大病" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.seriousIllness"></input>
                    <!--<input type="number" :value="deductionInfo.seriousIllness" @input="setasd($event)"></input>-->
                </el-form-item>
                <el-form-item label="赡养" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.support"></input>
                </el-form-item>
                <el-form-item label="额外扣除" :label-width="'120px'">
                    <input type="number" v-model="deductionInfo.addition"></input>
                </el-form-item>
                <el-form-item label="专项扣除" :label-width="'120px'">
                    <input type="number" :value="deduction" disabled="disabled"></input>
                </el-form-item>
                <el-form-item label="是否可用" :label-width="'120px'">
                    <select v-model="deductionInfo.status" placeholder="是否可用">
                        <option label="可用" value="1"></option>
                        <option label="不可用" value="0"></option>
                    </select>
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
    const SpecialDeduction = require('../assets/Vo/SpecialDeduction');
    export default {
        name: "SpecialDeduction",
        data() {
            return {
                currentPage: 0,
                pageSize: 10,
                total: 0,
                where: {},
                empInfos: [],
                salaryList: [],
                searchName: '',
                dialogFormVisible: false,
                deductionInfo: null,
                deduction: 0,
                package: 0,
                operateType: 0, //0 添加 1 修改,
                loading: true
            }
        },
        mounted() {
            const _this = this;
            this.getDeduction();
            comFunc.getempInfos(this.sqlOperate, null, null, null, null, function (res) {
                if (res.error) {
                    console.log(res.error);
                } else {
                    _this.empInfos = res;
                }
            });
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.getRoleList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getRoleList();
            },
            getDeduction: function () {
                let _this = this;
                this.sqlOperate.selectSql("Select * from salary inner join employee" +
                    " on employee.empId = salary.employeeId where 1=1", this.where, null,
                    [_this.pageSize, _this.currentPage * _this.pageSize], function (res) {
                        if (res.error) {
                            console.log(res.error)
                        } else {
                            _this.salaryList = [];
                            res.forEach(dedution => {
                                _this.salaryList.push(SpecialDeduction.objectFromObject(true, dedution))
                            });
                            _this.total = res.length;
                        }
                        _this.loading = false;
                    })
            },
            searchDeduction: function () {
                this.where = {};
                this.where['employee.name'] = "'" + this.searchName + "'";
                this.getDeduction();
            },
            addDeduction: function () {
                this.dialogFormVisible = true;
                let _this = this;
                this.deductionInfo = new Salary(() => {
                    _this.deduction = _this.deductionInfo.deduction;
                }, () => {
                    _this.package = _this.deductionInfo.package;
                });
                this.operateType = 0;
                window.a = this.deductionInfo;
            },
            handleEdit: function (data) {
                let _this = this;
                this.deductionInfo = new Salary(() => {
                    _this.deduction = _this.deductionInfo.deduction;
                }, () => {
                    _this.package = _this.deductionInfo.package;
                });
                Salary.objectFromObject(false, data, this.deductionInfo);
                this.dialogFormVisible = true;
                this.operateType = 1;
            },
            sureOperate: function () {
                const _this = this;
                for (let key in this.deductionInfo) {
                    if (undefined == this.deductionInfo[key]) {
                        alert(key + "不能为空");
                        return;
                    }
                }
                if (this.operateType == 0) {
                    this.sqlOperate.insertSql("salary", Salary.yuanTransToFen(this.deductionInfo), function (res) {
                        if (res.error) {
                            console.log(res.error);
                        } else {
                            _this.getDeduction();
                        }
                        _this.dialogFormVisible = false;
                    })
                } else {
                    this.sqlOperate.updateSql('salary', Salary.yuanTransToFen(this.deductionInfo),
                        {'salaryId': this.deductionInfo.salaryId}, function (res) {
                            if (res.error) {
                                console.log(res.error);
                            } else {
                                _this.getDeduction();
                            }
                            _this.dialogFormVisible = false;
                        })
                }

            }
        }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>