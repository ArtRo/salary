const SQLite = require('sqlite-sync');
const DBUrl = `${__dirname}..\\..\\..\\..\\static\\sqlFile\\salary.db`;
SQLite.connect(DBUrl);

class SqlOperate {
    //创建表
    static createTable(sql, callBack) {
        SQLite.run(sql, callBack || commonCallBack);
    }

    //插入数据
    static insertSql(tableName, params, callBack) {
        SQLite.insert(tableName, params, callBack || commonCallBack);
    }


    //更新数据
    static updateSql(tableName, params, cause, callBack) {
        SQLite.update(tableName, params, cause, callBack || commonCallBack);
    }

    //查询数据
    static selectSql(sql, where, orderBy, limit, callBack) {
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
        SQLite.run(sql, callBack || commonCallBack);
    }

    //数据库中添加方法
    static createFunc(func) {
        SQLite.create_function(func);
    }
}

function commonCallBack(res) {
    if (res.error)
        throw res.error;
    console.log(res);
}

module.exports = SqlOperate;




