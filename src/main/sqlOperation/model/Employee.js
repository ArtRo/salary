const SqlModel = require('./SqlModel')
class EmployeeInfo extends SqlModel{

    //是否试用 1 使用 0 正式
    get onTrial() {
        return this._onTrial;
    }

    set onTrial(value) {
        this._onTrial = value;
    }

    //在职 1 在职 0 不在
    get onJob() {
        return this._onJob;
    }

    set onJob(value) {
        this._onJob = value;
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    //性别 1 女 2 男
    get sex() {
        return this._sex;
    }

    set sex(value) {
        this._sex = value;
    }

    //入职时间
    get entryTime() {
        return this._entryTime;
    }

    set entryTime(value) {
        this._entryTime = value;
    }

    //员工ID
    get empId() {
        return this._empId;
    }

    set empId(value) {
        this._empId = value;
    }

    //转正时间
    get regularTime() {
        return this._regularTime;
    }

    set regularTime(value) {
        this._regularTime = value;
    }

    //手机号
    get tel() {
        return this._tel;
    }

    set tel(value) {
        this._tel = value;
    }
}
module.exports =  EmployeeInfo;