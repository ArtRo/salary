<template>
    <div>
        <el-row style="margin: 10px">
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
                <el-button type="info" @click="searchSalary">搜索</el-button>
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
                  :data="salaries" style="width: 100%">
            <el-table-column label="入职月" prop="employee.entryTime"/>
            <el-table-column label="本月" prop="monthlyAudit.currentMonth"/>
            <el-table-column label="员工名称" prop="employee.name"/>
            <el-table-column label="电话" prop="employee.tel"/>
            <el-table-column label="五险(个人)">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.salaryInfo.fiveRisksByPerson/100}}
                </template>
            </el-table-column>
            <el-table-column label="公积金(个人)">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.salaryInfo.oneGoldByperson/100}}
                </template>
            </el-table-column>
            <el-table-column label="五险(企业)">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.salaryInfo.fiveRisksByCompany/100}}
                </template>
            </el-table-column>
            <el-table-column label="公积金(企业)">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.salaryInfo.oneGoldByCompany/100}}
                </template>
            </el-table-column>
            <el-table-column label="是否试用">
                <template slot-scope="scope">
                    {{scope.row.employee.onTrial==1?'是':'否'}}
                </template>
            </el-table-column>
            <el-table-column label="税前工资">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.salaryInfo.grossPay/100}}
                </template>
            </el-table-column>
            <el-table-column label="package">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.salaryInfo.package/100}}
                </template>
            </el-table-column>
            <el-table-column label="请假小时" prop="monthlyAudit.leaveHours"/>
            <el-table-column label="请假天数" prop="monthlyAudit.leaveDays"/>
            <el-table-column label="旷工天数" prop="monthlyAudit.absenteeismDays"/>
            <el-table-column label="迟到次数" prop="monthlyAudit.lateTimes"/>
            <el-table-column label="迟到分钟" prop="monthlyAudit.lateMinutes"/>
            <el-table-column label="迟到小时" prop="monthlyAudit.lateHours"/>
            <el-table-column label="早退次数" prop="monthlyAudit.leaveEarlyTimes"/>
            <el-table-column label="早退小时" prop="monthlyAudit.leaveEarlyHours"/>
            <el-table-column label="法定工作日" prop="monthlyAudit.workingDay"/>
            <el-table-column label="其他奖励" prop="monthlyAudit.otherReward">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.otherReward/100}}
                </template>
            </el-table-column>
            <el-table-column label="奖金" prop="monthlyAudit.bonus">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.bonus/100}}
                </template>
            </el-table-column>
            <el-table-column label="罚款">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.fine/100}}
                </template>
            </el-table-column>
            <el-table-column label="子女">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.salaryInfo.children/100}}
                </template>
            </el-table-column>
            <el-table-column label="教育">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.salaryInfo.education/100}}
                </template>
            </el-table-column>
            <el-table-column label="住房">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.salaryInfo.housing/100}}
                </template>
            </el-table-column>
            <el-table-column label="大病">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.salaryInfo.seriousIllness/100}}
                </template>
            </el-table-column>
            <el-table-column label="赡养">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.salaryInfo.support/100}}
                </template>
            </el-table-column>
            <el-table-column label="专项扣除">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.salaryInfo.deduction/100}}
                </template>
            </el-table-column>
            <el-table-column label="附加扣除合计">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.additionDudection/100}}
                </template>
            </el-table-column>
            <el-table-column label="累积附加合计">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.accuAdditionDeduction/100}}
                </template>
            </el-table-column>
            <el-table-column label="社保累积">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.accuFiveRiskeAndFund/100}}
                </template>
            </el-table-column>
            <el-table-column label="应税工资">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.taxableSalary/100}}
                </template>
            </el-table-column>
            <el-table-column label="应税工资(外)" prop="currentMonth">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.outTaxableSalary/100}}
                </template>
            </el-table-column>
            <el-table-column label="累计应发数">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.accuTaxableSalary/100}}
                </template>
            </el-table-column>
            <el-table-column label="应纳税额">
                <template slot-scope="scope">
                    <span :style="{'color':scope.row.color}"> {{scope.row.monthlyAudit.taxableSalaryOnMonth/100}}</span>
                </template>
            </el-table-column>
            <el-table-column label="累计扣税">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.accuTaxed/100}}
                </template>
            </el-table-column>
            <el-table-column label="扣税">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.taxedOnMonth/100}}
                </template>
            </el-table-column>
            <el-table-column label="实发工资">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.actualSalaryOnMonth/100}}
                </template>
            </el-table-column>
            <el-table-column label="现金">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.cash/100}}
                </template>
            </el-table-column>
            <el-table-column label="package(外)">
                <template slot-scope="scope">
                    {{scope.row.monthlyAudit.outPackage/100}}
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    const MonthlyAudit = require('../assets/Vo/MonthlyAudit');
    const Employee = require('../../main/sqlOperation/model/Employee');
    const Salary = require('../../main/sqlOperation/model/Salary');
    const SalaryOper = require('../assets/Vo/SalaryOper');
    export default {
        name: "Saraly",
        data() {
            return {
                salaries: [],
                loading: true,
                value7: '',
                searchName: '',
                where: {},
                currentPage: 0,
                pageSize: 10,
                total: 0,
            }
        },
        mounted() {
            this.getSalaries();
        },
        methods: {
            exportExcel: function () {
                /* generate workbook object from table */
                let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
                /* get binary string as output */
                let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
                try {
                    FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '员工工资详情.xlsx')
                } catch (e) {
                    if (typeof console !== 'undefined') console.log(e, wbout)
                }
                return wbout
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getRoleList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getRoleList();
            },
            searchSalary: function () {
                this.where = {};
                if (this.value7) {
                    this.where['monthly_audit.currentMonth'] = "'" + this.value7 + "'";
                }
                if (this.searchName) {
                    this.where['employee.name'] = "'" + this.searchName + "'";
                }
                this.getSalaries();
            },
            getSalaries: function () {
                const _this = this;
                this.sqlOperate.selectSql('select * from monthly_audit ' +
                    'inner join employee on monthly_audit.empId = employee.empId ' +
                    'inner join salary on employee.empId = salary.employeeId where 1=1',
                    this.where,
                    " monthly_audit.currentMonth desc ",
                    [this.pageSize, this.pageSize * this.currentPage], function (res) {
                        if (!res.error) {
                            _this.salaries = [];
                            res.forEach(data => {
                                let salaryOper = new SalaryOper();
                                salaryOper['monthlyAudit'] = MonthlyAudit.objectFromObject(false, data, null);
                                salaryOper['monthlyAudit'].salaryInfo = Salary.objectFromObject(false, data, null);
                                salaryOper['monthlyAudit'].getPrevious();
                                salaryOper['employee'] = Employee.objectFromObject(false, data, null);

                                salaryOper.getAccumulateInfo();
                                _this.salaries.push(salaryOper);
                            });
                            _this.total = res.length;
                        } else {
                            console.log(res.error)
                        }
                        _this.loading = false;
                    })
            }
        }
    }
</script>

<style scoped>

</style>