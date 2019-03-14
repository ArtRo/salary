class SqlOperate {

    constructor() {
        let DBUrl  = `${global.__static}\\sqlFile\\salary.db`;
        this.SQLite = require('sqlite-sync');
        this.SQLite.connect(DBUrl);
    }

    //创建表
    createTable(sql, callBack) {
        this.SQLite.run(sql, callBack || commonCallBack);
    }

    //插入数据
    insertSql(tableName, params, callBack) {
        this.SQLite.insert(tableName, params, callBack || commonCallBack);
    }


    //更新数据
    updateSql(tableName, params, cause, callBack) {
        this.SQLite.update(tableName, params, cause, callBack || commonCallBack);
    }

    //查询数据
    selectSql(sql, where, orderBy, limit, callBack) {
        let appendSql = '';
        if (where) {
            for (let key in where) {
                appendSql += " and " + key + "=" + where[key];
            }
        }
        if (orderBy) {
            appendSql += " order by " + orderBy;
        }
        if (limit && limit.length == 2) {
            appendSql += " limit " + limit[0] + " offset " + limit[1];
        }
        if (appendSql.length > 0) {
            sql += appendSql;
        }
        console.log("sql====:" + sql);
        this.SQLite.run(sql, callBack || commonCallBack);
    }

    //数据库中添加方法
    createFunc(func) {
        this.SQLite.create_function(func);
    }
}

function commonCallBack(res) {
    if (res.error)
        throw res.error;
    console.log(res);
}

module.exports = SqlOperate;




