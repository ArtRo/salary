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


    //累积附加扣除
    get cumulAdditionDudection() {
        return this._cumulAdditionDudection;
    }

    set cumulAdditionDudection(value) {
        this._cumulAdditionDudection = value;
    }


    //累积应发数
    get cumulAccruals() {
        return this._cumulAccruals;
    }


    set cumulAccruals(value) {
        this._cumulAccruals = value;
    }

    //应纳税额
    get taxPayable() {
        return this._taxPayable;
    }

    set taxPayable(value) {
        this._taxPayable = value;
    }

    //累计扣税
    get accuTaxDeduction() {
        return this._accuTaxDeduction;
    }

    set accuTaxDeduction(value) {
        this._accuTaxDeduction = value;
    }

    //扣税
    get taxDeduction() {
        return this._taxDeduction;
    }

    set taxDeduction(value) {
        this._taxDeduction = value;
    }

    //实发工资
    get realWages() {
        return this._realWages;
    }

    set realWages(value) {
        this._realWages = value;
    }

}

module.exports = SalaryOper;
