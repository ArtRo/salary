const SqlModel = require('./SqlModel');
class Salary extends SqlModel {

    constructor(setDeduction, setPackage) {
        super();
        this.setDeduction = setDeduction;
        this.setPackage = setPackage;
    }

    get salaryId() {
        return this._salaryId;
    }

    set salaryId(value) {
        this._salaryId = value;
    }

    get employeeId() {
        return this._employeeId;
    }

    set employeeId(value) {
        this._employeeId = value;
    }

    get fiveRisksByPerson() {  //五险
        return this._fiveRisksByPerson;
    }

    set fiveRisksByPerson(value) {
        this._fiveRisksByPerson = value;
    }

    get fiveRisksByCompany() {
        return this._fiveRisksByCompany;
    }

    set fiveRisksByCompany(value) {
        this._fiveRisksByCompany = value;
        this.syncPackage();
    }

    //一金
    get oneGoldByperson() {
        return this._oneGoldByperson;
    }

    set oneGoldByperson(value) {
        this._oneGoldByperson = value;
    }

    get oneGoldByCompany() {
        return this._oneGoldByCompany;
    }

    set oneGoldByCompany(value) {
        this._oneGoldByCompany = value;
        this.syncPackage();
    }

    //税前工资
    get grossPay() {
        return this._grossPay;
    }

    set grossPay(value) {
        this._grossPay = value;
        this.syncPackage();
    }

    //子女
    get children() {
        return this._children;
    }

    set children(value) {
        this._children = value;
        this.syncDeduction();
    }

    //教育
    get education() {
        return this._education;
    }

    set education(value) {
        this._education = value;
        this.syncDeduction();
    }

    //住房
    get housing() {
        return this._housing;
    }

    set housing(value) {
        this._housing = value;
        this.syncDeduction();
    }

    //大病
    get seriousIllness() {
        return this._seriousIllness;
    }

    set seriousIllness(value) {
        this._seriousIllness = value;
        this.syncDeduction();
    }

    //赡养
    get support() {
        return this._support;
    }

    set support(value) {
        this._support = value;
        this.syncDeduction();
    }


    //状态 1 在使用 0 未使用
    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    //额外扣除项
    get addition() {
        return this._addition;
    }

    set addition(value) {
        this._addition = value;
    }

    //专项扣除  = 住房+子女+教育+大病+赡养
    syncDeduction() {
        this.deduction = ~~this.support + ~~this.seriousIllness + ~~this.housing + ~~this.education + ~~this.children;
        this.setDeduction && this.setDeduction();
    }

    //企业五险一金+税前工资
    syncPackage() {
        this.package = ~~this.grossPay + ~~this.fiveRisksByCompany + ~~this.oneGoldByCompany;
        this.setPackage && this.setPackage();
    }

    static notNeedTrans() {
        return ['package', 'deduction', '_package', '_deduction'];
    }

    static needTranslateDatas() {
        return ['fiveRisksByPerson', 'fiveRisksByCompany', 'oneGoldByperson', 'oneGoldByCompany',
            'grossPay', 'children', 'education', 'housing', 'seriousIllness', 'support', 'addition',
            '_fiveRisksByPerson', '_fiveRisksByCompany', '_oneGoldByperson', '_oneGoldByCompany',
            '_grossPay', '_children', '_education', '_housing', '_seriousIllness', '_support', '_addition'];
    }

}

module.exports = Salary;