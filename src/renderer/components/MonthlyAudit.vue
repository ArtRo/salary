<template>
    <div>
        <el-row style="margin: 10px">
            <el-col :span="4">
                <el-button type="success" @click="addDeduction">添加</el-button>
            </el-col>
            <el-col :span="6">
                <el-input placeholder="请输入员工名称" prefix-icon="el-icon-search" v-model="searchName"/>
            </el-col>
            <el-col :span="8">
                <el-date-picker
                        style="margin-left: 20px"
                        v-model="value7"
                        type="month"
                        value-format="yyyy-MM"
                        format="yyyy-MM"
                        placeholder="选择月">
                </el-date-picker>
            </el-col>
            <el-col :span="3" style="text-align: end">
                <el-button type="info" @click="searchAudit">搜索</el-button>
            </el-col>
            <el-col :span="3" style="text-align: end">
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-col>
        </el-row>
        <el-table id="out-table"
                  v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="monthlyAudits" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="请假小时">
                            <span>{{ props.row.leaveHours}}</span>
                        </el-form-item>
                        <el-form-item label="请假天数">
                            <span>{{ props.row.leaveDays}}</span>
                        </el-form-item>
                        <el-form-item label="矿工天数">
                            <span>{{ props.row.absenteeismDays }}</span>
                        </el-form-item>
                        <el-form-item label="迟到次数">
                            <span>{{ props.row.lateTimes}}</span>
                        </el-form-item>
                        <el-form-item label="迟到分钟">
                            <span>{{ props.row.lateMinutes}}</span>
                        </el-form-item>
                        <el-form-item label="迟到小时">
                            <span>{{ props.row.lateHours}}</span>
                        </el-form-item>
                        <el-form-item label="早退次数">
                            <span>{{ props.row.leaveEarlyTimes}}</span>
                        </el-form-item>
                        <el-form-item label="早退小时">
                            <span>{{ props.row.leaveEarlyHours}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="员工名称" prop="name"/>
            <el-table-column label="月法定工作日" prop="workingDay"/>
            <el-table-column label="奖金" prop="bonus"/>
            <el-table-column label="其他奖励" prop="otherReward"/>
            <el-table-column label="罚款" prop="fine"/>
            <el-table-column label="所处月份" prop="currentMonth" sortable/>
            <el-table-column label="应税工资" prop="taxableSalary" sortable/>
            <el-table-column label="应税工资(对外)" prop="outTaxableSalary" sortable/>
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
        <el-dialog title="月度考核信息" :visible.sync="dialogFormVisible">
            <el-form v-if="auditInfo" :model="auditInfo">
                <el-form-item label="所属员工" :label-width="'120px'">
                    <select v-model="auditInfo.empId" placeholder="请选择员工" @change="getUserSalary"
                            :disabled="operateType == 1?true:false">
                        <option v-for="(item,index) in empInfos" :value="item.empId">{{item.name}}</option>
                    </select>
                </el-form-item>
                <el-form-item label="考核月份" :label-width="'120px'">
                    <el-date-picker
                            v-model="currentMonth"
                            v-on:change="changeTime"
                            type="month"
                            value-format="yyyy-MM"
                            format="yyyy-MM"
                            placeholder="选择月">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="工作天数" :label-width="'120px'">
                    <input type="number" v-model="auditInfo.workingDay"></input>
                </el-form-item>
                <el-form-item label="早退小时数" :label-width="'120px'">
                    <input type="number" v-model="auditInfo.leaveEarlyHours"></input>
                </el-form-item>
                <el-form-item label="早退次数" :label-width="'120px'">
                    <input type="number" v-model="auditInfo.leaveEarlyTimes"></input>
                </el-form-item>
                <el-form-item label="迟到分钟数" :label-width="'120px'">
                    <input type="number" v-model="auditInfo.lateMinutes"></input>
                </el-form-item>
                <el-form-item label="迟到小时数" :label-width="'120px'">
                    <input type="number" v-model="auditInfo.lateHours"></input>
                </el-form-item>
                <el-form-item label="迟到次数" :label-width="'120px'">
                    <input type="number" v-model="auditInfo.lateTimes"></input>
                </el-form-item>
                <el-form-item label="旷工天数" :label-width="'120px'">
                    <input type="number" v-model="auditInfo.absenteeismDays"></input>
                </el-form-item>
                <el-form-item label="请假天数" :label-width="'120px'">
                    <input type="number" v-model="auditInfo.leaveDays"></input>
                </el-form-item>
                <el-form-item label="请假小时" :label-width="'120px'">
                    <input type="number" v-model="auditInfo.leaveHours"></input>
                </el-form-item>
                <el-form-item label="奖金" :label-width="'120px'">
                    <input type="number" v-model="auditInfo.bonus"></input>
                </el-form-item>
                <el-form-item label="其他奖励" :label-width="'120px'">
                    <input type="number" v-model="auditInfo.otherReward"></input>
                </el-form-item>
                <el-form-item label="罚款" :label-width="'120px'">
                    <input type="number" v-model="auditInfo.fine"></input>
                </el-form-item>
                <el-form-item label="应税工资" :label-width="'120px'">
                    <input type="number" v-model="auditInfo.outTaxableSalary"></input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureOperate">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import comFunc from '@/assets/js/common.js'
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'

    const AttendanceRecord = require('../../main/sqlOperation/model/AttendanceRecord');
    const Salary = require('../../main/sqlOperation/model/Salary');
    const MonthlyAudit = require('../assets/Vo/MonthlyAudit');

    export default {
        name: "Salary",
        data() {
            return {
                monthlyAudits: [],
                loading: true,
                searchName: '',
                value7: '',
                currentMonth: '',
                currentPage: 0,
                pageSize: 10,
                total: 0,
                dialogFormVisible: false,
                auditInfo: null,
                empInfos: [],
                operateType: 0, // 0 添加 1 修改
                where: {}
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
            this.getMonthlyAudits();
        },
        methods: {
            exportExcel: function () {
                /* generate workbook object from table */
                let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
                /* get binary string as output */
                let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
                try {
                    FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '员工月度审核.xlsx')
                } catch (e) {
                    if (typeof console !== 'undefined') console.log(e, wbout)
                }
                return wbout
            },
            getMonthlyAudits: function () {
                const _this = this;
                this.sqlOperate.selectSql("select monthly_audit.*,employee.name,employee.tel,salary.* from monthly_audit " +
                    "inner join employee on monthly_audit.empId = employee.empId " +
                    "inner join salary on salary.employeeId = employee.empId where 1=1",
                    this.where, null, [this.pageSize, this.currentPage * this.pageSize], function (res) {
                        if (res.error) {
                            console.log(res.error);
                        } else {
                            _this.monthlyAudits = [];
                            res.forEach(data => {
                                let ma = MonthlyAudit.objectFromObject(true, data, null);
                                ma.salaryInfo = Salary.objectFromObject(false, data, null);
                                _this.monthlyAudits.push(ma);
                            });
                            console.log(_this.monthlyAudits);
                            _this.total = res.length;
                        }
                        _this.loading = false;
                    })
            },
            getUserSalary: function () {
                const _this = this;
                this.sqlOperate.selectSql("select salary.* from salary where employeeId=" + this.auditInfo.empId,
                    null, null, null, function (res) {
                        if (res.error) {
                            console.log(res.error)
                        } else {
                            if (res.length > 0)
                                _this.auditInfo.salaryInfo = Salary.objectFromObject(false, res, null);
                        }
                    })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getMonthlyAudits();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getMonthlyAudits();
            },
            addDeduction: function () {
                this.dialogFormVisible = true;
                this.auditInfo = new MonthlyAudit();
                this.currentMonth = this.auditInfo.currentMonth;
                this.operateType = 0;
            },
            handleEdit: function (data) {
                this.operateType = 1;
                this.auditInfo = MonthlyAudit.objectFromObject(false, data, null);
                this.dialogFormVisible = true;
                this.currentMonth = this.auditInfo.currentMonth;
            },
            searchAudit: function () {
                if (this.value7) {
                    this.where['monthly_audit.currentMonth'] = "'" + this.value7 + "'";
                }
                if (this.searchName) {
                    this.where['employee.name'] = "'" + this.searchName + "'";
                }
                this.getMonthlyAudits();
            }
            ,
            sureOperate: function () {
                for (let key in this.auditInfo) {
                    if (undefined == this.auditInfo[key]) {
                        alert(key + "不能为空");
                        return;
                    }
                }
                const _this = this;
                if (this.operateType == 0) {
                    this.sqlOperate.insertSql("monthly_audit",
                        AttendanceRecord.delDownslide(AttendanceRecord.yuanTransToFen(this.auditInfo)), function (res) {
                            if (res.error) {
                                console.log(res.error)
                            } else {
                                _this.getMonthlyAudits();
                            }
                            _this.dialogFormVisible = false;
                        })
                } else {
                    this.sqlOperate.updateSql("monthly_audit",
                        AttendanceRecord.delDownslide(AttendanceRecord.yuanTransToFen(this.auditInfo,new AttendanceRecord())),
                        {'auditId': this.auditInfo.auditId}, function (res) {
                            if (res.error) {
                                console.log(res.error);
                            } else {
                                _this.getMonthlyAudits();
                            }
                            _this.dialogFormVisible = false;
                        })
                }
            }
            ,
            changeTime: function () {
                this.auditInfo.currentMonth = this.currentMonth;
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