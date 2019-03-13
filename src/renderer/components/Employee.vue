<template>
    <div>
        <el-row style="margin: 10px">
            <el-col :span="4">
                <el-button type="success" @click="addEmployee">添加</el-button>
            </el-col>
            <el-col :span="8">
                <el-date-picker
                        :span="12"
                        v-model="value7"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                </el-date-picker>
            </el-col>
            <el-col :span="6">
                <label> 是否试用</label>
                <select placeholder="是否在试用" v-model="onTrial">
                    <option label="" value=""></option>
                    <option label="否" value="0"></option>
                    <option label="是" value="1"></option>
                </select>
            </el-col>
            <el-col :span="6" style="text-align: end">
                <el-button type="info" @click="searchEmployee">搜索</el-button>
            </el-col>
        </el-row>
        <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="employees"
                style="width: 100%"
                :default-sort="{prop: 'createTime', order: 'descending'}"
                border stripe
        >
            <el-table-column prop="empId" label="员工ID" sortable/>
            <el-table-column prop="name" label="姓名"/>
            <el-table-column prop="tel" label="手机号"/>
            <el-table-column label="性别">
                <template slot-scope="scope">
                    {{scope.row.sex==1?'女':'男'}}
                </template>
            </el-table-column>
            <el-table-column prop="entryTime" label="入职时间"/>
            <el-table-column label="是否试用">
                <template slot-scope="scope">
                    {{scope.row.onTrial==1?'是':'否'}}
                </template>
            </el-table-column>
            <el-table-column label="转正时间" prop="regularTime"/>
            <el-table-column label="是否在职">
                <template slot-scope="scope">
                    {{scope.row.onJob==1?'是':'否'}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

        <el-dialog title="员工信息" :visible.sync="dialogFormVisible">
            <el-form :model="employeeInfo">
                <el-form-item v-if="operateType==1" label="员工ID" :label-width="'120px'">
                    <el-input v-model="employeeInfo.empId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="员工姓名" :label-width="'120px'">
                    <el-input v-model="employeeInfo.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="'120px'">
                    <el-input v-model="employeeInfo.tel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="员工性别" :label-width="'120px'">
                    <select v-model="employeeInfo.sex" placeholder="请选择性别">
                        <option label="女" value="1"></option>
                        <option label="男" value="2"></option>
                    </select>
                </el-form-item>
                <el-form-item label="入职时间" :label-width="'120px'">
                    <el-date-picker
                            v-model="employeeInfo.entryTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否试用" :label-width="'120px'">
                    <select v-model="employeeInfo.onTrial" placeholder="是否在试用">
                        <option label="否" value="0"></option>
                        <option label="是" value="1"></option>
                    </select>
                </el-form-item>
                <el-form-item v-if="employeeInfo.onTrial==0" label="转正时间" :label-width="'120px'">
                    <el-date-picker
                            v-model="employeeInfo.regularTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否在职" :label-width="'120px'">
                    <select v-model="employeeInfo.onJob" placeholder="是否在职">
                        <option label="否" value="0"></option>
                        <option label="是" value="1"></option>
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
    import Moment from 'moment'
    import comFunc from '@/assets/js/common.js'
    export default {
        name: "Employee",
        data() {
            return {
                employees: [],
                currentPage: 0,
                pageSize: 10,
                total: 0,
                dialogFormVisible: false,
                where:{},
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                employeeInfo: {},
                value7: '',
                onTrial:'',
                loading: true,
                operateType: ''  //0添加 1 修改

            }
        },
        mounted() {
            this.getEmployees();
        },
        methods: {
            searchEmployee:function(){
                this.where = {};
                if(this.onTrial){
                    this.where['onTrial']=this.onTrial;
                }
                this.getEmployees();
            },
            getEmployees: function () {
                const _this = this;
                let timeGap = '';
                if(_this.value7 && _this.value7.length == 2){
                     timeGap += " where entryTime between '"+ Moment(_this.value7[0]).format('YYYY-MM-DD')+ "' and '"+
                        Moment(_this.value7[1]).format('YYYY-MM-DD')+"'";
                }
                timeGap = timeGap || ' where 1=1 ';
                comFunc.getempInfos(_this.sqlOperate,timeGap,_this.where,
                    [_this.pageSize, _this.pageSize * _this.currentPage],null, function (res) {
                        if (res.error) {
                            console.log(res.error);
                        } else {
                            _this.total = res.length;
                            _this.employees = res;
                        }
                        _this.loading = false;
                    });
            },
            addEmployee: function () {
                this.dialogFormVisible = true;
                this.employeeInfo = {empId: null};
                this.operateType = 0;
            },
            handleEdit: function (row) {
                console.log(row);
                this.employeeInfo = JSON.parse(JSON.stringify(row));
                this.dialogFormVisible = true;
                this.operateType = 1;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getEmployees();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getEmployees();
            },
            sureOperate() {
                let _this = this;
                if (_this.operateType == 0) {
                    this.sqlOperate.insertSql("employee", _this.employeeInfo, function (res) {
                        if (res.error) {
                            console.log(res.error);
                        } else {
                            _this.getEmployees();
                        }
                        _this.dialogFormVisible = false;
                    })
                } else {
                    this.sqlOperate.updateSql('employee', _this.employeeInfo,{empId:_this.employeeInfo.empId}, function (res) {
                        if (res.error) {
                            console.log(res.error);
                        } else {
                            _this.getEmployees();
                        }
                        _this.dialogFormVisible = false;
                    })
                }
            }
        }
    }
</script>

<style scoped>
    select {
        margin: 2px;
        margin: 2px;
        width: 80px;
        height: 30px;
        padding: 2px;
        font-size: 16px;
        text-align: center;
    }
</style>