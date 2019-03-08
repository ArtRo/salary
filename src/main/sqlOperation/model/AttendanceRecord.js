class AttendanceRecord{


    get employeeId() {
        return this._employeeId;
    }

    set employeeId(value) {
        this._employeeId = value;
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
    get other() {
        return this._other;
    }


    set other(value) {
        this._other = value;
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