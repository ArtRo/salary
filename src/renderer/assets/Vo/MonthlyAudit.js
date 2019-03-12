const AttendanceRecord = require('../../../main/sqlOperation/model/AttendanceRecord');
const sqlOper = require('../../../main/sqlOperation/SqlOperate');
import Moment from 'moment'

class MonthlyAudit extends AttendanceRecord {

    constructor(flag) {
        super();
        let previous = this.getPrevious();
        if (previous && flag) {
            this.staAccuDeduction = previous.staAccuDeduction + previous.deduction;
            this.staRisksAndFund = previous.staRisksAndFund;
        }
    }

    get salaryInfo() {
        return this._salaryInfo;
    }

    set salaryInfo(value) {
        this._salaryInfo = value;
        this.taxableSalary = this.getTaxableSalary();
        this.additionDudection = this.salaryInfo.deduction + this.salaryInfo.addition;
        if (!this.outTaxableSalary || this.outTaxableSalary <= 0) this.outTaxableSalary = this.getTaxableSalary();
    }

    get taxableSalary() {
        return this._taxableSalary;
    }

    set taxableSalary(value) {
        this._taxableSalary = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    //附加扣除合计
    get additionDudection() {
        return this._additionDudection;
    }

    set additionDudection(value) {
        this._additionDudection = value;
    }

    //获取本月的应税工资(单位为分)
    getTaxableSalary() {
        return Math.round(~~this.salaryInfo.grossPay / 20.83 * (~~this.workingDay - ~~this.leaveHours / 9 -
            ~~this.leaveDays - ~~this.absenteeismDays * 2 - ~~this.lateHours / 60 * 2 / 8 - ~~this.leaveEarlyHours / 8) -
            Math.max(0, ~~this.lateTimes - 3) * 2000 - ~~this.leaveEarlyTimes * 5000 -
            (~~this.salaryInfo.fiveRisksByPerson + ~~this.salaryInfo.oneGoldByperson) + ~~this.otherReward + ~~this.bonus - ~~this.fine) / 100;
    }


    //获取指定月份上一个月的月度审核 month 格式为 'yyyy-MM'
    getPrevious() {
        let previous = null;
        if (this.currentMonth && this.empId) {
            let month = this.currentMonth;
            let empId = this.empId;
            let previousMonth = Moment(month, 'YYYY-MM').month(Moment(month, 'YYYY-MM').month() - 1).format('YYYY-MM');
            sqlOper.selectSql("select * from monthly_audit where 1=1", {
                'currentMonth': "'" + previousMonth + "'",
                'empId': empId
            }, null, null, function (res) {
                if (res.error) {
                    console.log(res.error);
                } else {
                    previous = AttendanceRecord.objectFromObject(false, res);
                }
            })
        }
        return previous;
    }

    getAccuTax() {

    }

    //获取累积应发数(累积到本月)
    get accuTaxableSalary() {
        return this._accuTaxableSalary;
    }

    set accuTaxableSalary(value) {
        this._accuTaxableSalary = this.outTaxableSalary + this.staTaxableSalary;
    }

    //累积附加扣除(累积到本月)
    get accuAdditionDeduction() {
        return this._accuAdditionDeduction;
    }

    set accuAdditionDeduction(value) {
        this._accuAdditionDeduction = this.salaryInfo.deduction + this.staAccuDeduction;
    }


    //本月应纳税额
    get taxableSalaryOnMonth() {
        return this._taxableSalaryOnMonth;
    }

    set taxableSalaryOnMonth(value) {
        this._taxableSalaryOnMonth = this.accuTaxableSalary - this.accuAdditionDeduction - this.staTaxed;
    }


}


module.exports = MonthlyAudit;