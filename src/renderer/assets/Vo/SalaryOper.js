const MonthlyAudit = require('./MonthlyAudit');
const Employee = require('../../../main/sqlOperation/model/Employee');

class SalaryOper {

    get monthlyAudit() {
        return this._monthlyAudit;
    }

    set monthlyAudit(value) {
        this._monthlyAudit = value;
    }

    get Employee() {
        return this._Employee;
    }

    set Employee(value) {
        this._Employee = value;
    }

    //累积扣税达到3万 则显示红色
    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    getAccumulateInfo(){
        this.monthlyAudit.getAccuAdditionDeduction();
        this.monthlyAudit.getAccuTaxableSalary();
        this.monthlyAudit.getTaxableSalaryOnMonth();
        if(this.monthlyAudit.taxableSalaryOnMonth > 3000000){
            this.color = 'red';
        }
        this.monthlyAudit.getAccuTaxed();
        this.monthlyAudit.getTaxedOnMonth();
        this.monthlyAudit.getActualSalaryOnMonth();
        this.monthlyAudit.getCash();
        this.monthlyAudit.getOutPackage();
        this.monthlyAudit.getAccuFiveRiskeAndFund();
    }

}

module.exports = SalaryOper;
