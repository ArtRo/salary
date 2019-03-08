class commClass {
    static getempInfos(sqlOper, timeGap, where, limit, orderBy, callback) {
        timeGap = timeGap || ' where 1=1';
        sqlOper.selectSql("SELECT * from employee" + timeGap, where,
            orderBy, limit, callback || commonCallBack);
    }
}

function commonCallBack(res) {
    if (res.error) {
        console.log(res.error);
    } else {
        return res;
    }
}

module.exports = commClass;