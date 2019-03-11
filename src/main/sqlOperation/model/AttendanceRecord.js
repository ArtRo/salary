import moment from 'moment'
const SqlModel = require('./SqlModel');
class AttendanceRecord extends SqlModel{

    constructor(){
        super();
        this.absenteeismDays = 0;
        this.currentMonth = moment(new Date()).format("YYYY-MM");
        this.leaveHours = 0;
        this.leaveDays = 0;
        this.lateTimes = 0;
        this.lateMinutes = 0;
        this.lateHours = 0;
        this.leaveEarlyTimes = 0;
        this.absenteeismDays = 0;
        this.leaveEarlyHours = 0;
        this.otherReward = 0;
        this.bonus = 0;
        this.fine = 0;
        this.workingDay = 21;
        this.empId = undefined;
    }

    get auditId() {
        return this._auditId;
    }

    set auditId(value) {
        this._auditId = value;
    }

    get empId() {
        return this._empId;
    }

    set empId(value) {
        this._empId = value;
    }


    get currentMonth() {
        return this._currentMonth;
    }

    set currentMonth(value) {
        this._currentMonth = value;
    }

    //请假小时
    get leaveHours() {
        return this._leaveHours;
    }

    set leaveHours(value) {
        this._leaveHours = value;
    }
    //请假天数
    get leaveDays() {
        return this._leaveDays;
    }

    set leaveDays(value) {
        this._leaveDays = value;
    }
    //矿工天数
    get absenteeismDays() {
        return this._absenteeismDays;
    }

    set absenteeismDays(value) {
        this._absenteeismDays = value;
    }
    //迟到次数
    get lateTimes() {
        return this._lateTimes;
    }

    set lateTimes(value) {
        this._lateTimes = value;
    }

    //迟到分钟
    get lateMinutes() {
        return this._lateMinutes;
    }

    set lateMinutes(value) {
        this._lateMinutes = value;
    }

    //迟到小时
    get lateHours() {
        return this._lateHours;
    }

    set lateHours(value) {
        this._lateHours = value;
    }

    //早退次数
    get leaveEarlyTimes() {
        return this._leaveEarlyTimes;
    }

    set leaveEarlyTimes(value) {
        this._leaveEarlyTimes = value;
    }

    //早退分钟
    get leaveEarlyHours() {
        return this._leaveEarlyHours;
    }

    set leaveEarlyHours(value) {
        this._leaveEarlyHours = value;
    }

    //法定工作时间
    get workingDay() {
        return this._workingDay;
    }

    set workingDay(value) {
        this._workingDay = value;
    }

    //其他
    get otherReward() {
        return this._otherReward;
    }


    set otherReward(value) {
        this._otherReward = value;
    }

    //奖金
    get bonus() {
        return this._bonus;
    }

    set bonus(value) {
        this._bonus = value;
    }

    //罚金
    get fine() {
        return this._fine;
    }

    set fine(value) {
        this._fine = value;
    }

}
module.exports= AttendanceRecord;