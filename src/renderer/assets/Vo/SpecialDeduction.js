const Salary = require('../../../main/sqlOperation/model/Salary');

class SpecialDeduction extends Salary{

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get tel() {
        return this._tel;
    }

    set tel(value) {
        this._tel = value;
    }
}
module.exports=SpecialDeduction;