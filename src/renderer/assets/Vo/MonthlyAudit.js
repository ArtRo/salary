const AttendanceRecord = require('../../../main/sqlOperation/model/AttendanceRecord');
const Salary = require('../../../main/sqlOperation/model/Salary');
const sqlOper = require('../../../main/sqlOperation/SqlOperate');
import Moment from 'moment'

class MonthlyAudit extends AttendanceRecord {

    constructor() {
        super();
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
            (~~this.salaryInfo.fiveRisksByPerson + ~~this.salaryInfo.oneGoldByperson) + ~~this.otherReward + ~~this.bonus - ~~this.fine);
    }

    //获取指定月份上一个月的月度审核 month 格式为 'yyyy-MM'
    getPrevious() {
        const _this = this;
        if (this.currentMonth && this.empId) {
            let month = this.currentMonth;
            let empId = this.empId;
            let previousMonth = Moment(month, 'YYYY-MM').month(Moment(month, 'YYYY-MM').month() - 1).format('YYYY-MM');
            sqlOper.selectSql("select * from monthly_audit inner join salary on monthly_audit.empId = salary.employeeId where 1=1", {
                'currentMonth': "'" + previousMonth + "'",
                'empId': empId
            }, null, null, function (res) {
                if (res.error) {
                    console.log(res.error);
                } else {
                    if (res.length > 0) {
                        _this.previous = MonthlyAudit.objectFromObject(false, res[0]);
                        _this.previous.salaryInfo = Salary.objectFromObject(false, res[0]);
                    }
                    _this.staAccuDeduction = _this.getStaAccuDeduction();
                    _this.staRisksAndFund = _this.getStaRisksAndFund();
                    _this.staTaxableSalary = _this.getStaTaxableSalary();
                    _this.staTaxed = _this.getStaTaxed();
                }
            })
        }
    }

    //累积应发数(累积到本月)
    get accuTaxableSalary() {
        return this._accuTaxableSalary;
    }

    set accuTaxableSalary(value) {
        this._accuTaxableSalary = value;
    }

    //累积附加扣除(累积到本月)
    get accuAdditionDeduction() {
        return this._accuAdditionDeduction;
    }

    set accuAdditionDeduction(value) {
        this._accuAdditionDeduction = value;
    }


    //本月应纳税额
    get taxableSalaryOnMonth() {
        return this._taxableSalaryOnMonth;
    }

    set taxableSalaryOnMonth(value) {
        this._taxableSalaryOnMonth = value;
    }

    //累积已扣税(到本月)
    get accuTaxed() {
        return this._accuTaxed;
    }

    set accuTaxed(value) {
        this._accuTaxed = value;
    }

    //累积本月社保
    get accuFiveRiskeAndFund() {
        return this._accuFiveRiskeAndFund;
    }

    set accuFiveRiskeAndFund(value) {
        this._accuFiveRiskeAndFund = value;
    }

//本月应扣税
    get taxedOnMonth() {
        return this._taxedOnMonth;
    }

    set taxedOnMonth(value) {
        this._taxedOnMonth = value;
    }

    // 本月实发工资
    get actualSalaryOnMonth() {
        return this._actualSalaryOnMonth;
    }

    set actualSalaryOnMonth(value) {
        this._actualSalaryOnMonth = value;
    }

    //现金
    get cash() {
        return this._cash;
    }

    set cash(value) {
        this._cash = value;
    }

    //外package
    get outPackage() {
        return this._outPackage;
    }

    set outPackage(value) {
        this._outPackage = value;
    }


    //获取累积应发数(上个月)
    getStaTaxableSalary() {
        if (this.previous && this.previous.salaryInfo) {
            return ~~this.previous.outTaxableSalary + ~~this.previous.staTaxableSalary;
        }
        return 0;
    }

    //获取累积附加扣除(累积到上个月)
    getStaAccuDeduction() {
        if (this.previous && this.previous.salaryInfo) {
            return ~~this.previous.salaryInfo.deduction + ~~this.previous.staAccuDeduction + ~~this.previous.salaryInfo.addition;
        }
        return 0;
    }

    //获取累积五险一金(上个月)
    getStaRisksAndFund() {
        if (this.previous && this.previous.salaryInfo) {
            return ~~this.previous.staRisksAndFund + ~~this.previous.salaryInfo.fiveRisksByPerson + ~~this.previous.salaryInfo.oneGoldByperson;
        }
        return 0
    }

    //获取上个月份的累积扣税
    getStaTaxed() {
        let taxableSalaryMonth = 0;
        if (this.previous && this.previous.salaryInfo) {
            taxableSalaryMonth = ~~this.previous.outTaxableSalary + ~~this.previous.staTaxableSalary -
                ~~this.previous.staAccuDeduction - ~~this.previous.salaryInfo.deduction - ~~this.previous.salaryInfo.addition;
        }
        return getTax(taxableSalaryMonth);
    }

    //获取累积附加扣除(累积到本月)
    getAccuAdditionDeduction() {
        this.accuAdditionDeduction = this.staAccuDeduction + this.salaryInfo.deduction + this.salaryInfo.addition;
    }

    //获取累积应发数(本月)
    getAccuTaxableSalary() {
        this.accuTaxableSalary = ~~this.staTaxableSalary + ~~this.outTaxableSalary;
    }


    getAccuFiveRiskeAndFund() {
        this.accuFiveRiskeAndFund = ~~this.staRisksAndFund + ~~this.salaryInfo.fiveRisksByPerson + ~~this.salaryInfo.oneGoldByperson;
    }

    //获取本月应税额
    getTaxableSalaryOnMonth() {
        this.taxableSalaryOnMonth = ~~this.accuTaxableSalary - ~~this.accuAdditionDeduction - ~~this.staRisksAndFund;
    }

    //获取累积已扣税(到本月)
    getAccuTaxed() {
        this.accuTaxed = getTax(~~this.taxableSalaryOnMonth);
    }

    //获取本月应扣税
    getTaxedOnMonth() {
        this.taxedOnMonth = Math.max(~~this.accuTaxed - ~~this.staTaxed, 0);
    }

    //获取本月实发工资
    getActualSalaryOnMonth() {
        this.actualSalaryOnMonth = ~~this.outTaxableSalary - ~~this.taxedOnMonth;
    }

    //获取现金
    getCash() {
        this.cash = ~~this.taxableSalary - ~~this.taxedOnMonth - this.actualSalaryOnMonth;
    }


    //获取外package
    getOutPackage() {
        this.outPackage = ~~this.cash + ~~this.actualSalaryOnMonth + ~~this.taxedOnMonth + ~~this.salaryInfo.fiveRisksByCompany + ~~this.salaryInfo.oneGoldByCompany;
    }
}

function getTax(salary) {
    if (salary > 0)
        return Math.round(Math.max(salary * 0.03 - 0, salary * 0.1 - 252000,
            salary * 0.2 - 1692000, salary * 0.25 - 3192000,
            salary * 0.3 - 5292000, salary * 0.35 - 8592000,
            salary * 0.45 - 18192000, 0));
    return 0;
}

module.exports = MonthlyAudit;