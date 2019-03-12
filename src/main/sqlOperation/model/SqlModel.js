class SqlModel {

    //两个model 相互转化
    static objectFromObject(isConversion, object, toObject) {
        let obj = toObject || new this();
        let neendTransDatas = this.needTranslateDatas();
        let keys = Object.keys(object);
        keys.forEach((key) => {
            if (typeof obj[key] === 'function') return;
            let value = object[key];
            if (isConversion && neendTransDatas && neendTransDatas.includes(key)) {
                value /= 100;
            }
            obj.__lookupSetter__(this.addOrDelDownslide(false, key)) && obj.__lookupSetter__(this.addOrDelDownslide(false, key)).call(obj, value);
        });
        console.log(obj);
        return obj;
    }

    static delDownslide(object){
        let obj = {};
        let keys = Object.keys(object);
        keys.forEach(key =>{
            obj[this.addOrDelDownslide(false,key)] = object[key];
        });
        console.log(obj);
        return obj;
    }
    //去掉object 变量的下划线

    //将元转化成分 *100
    static yuanTransToFen(object) {
        let finishedData = {};
        let needTrans = this.needTranslateDatas();
        let keys = Object.keys(object);
        keys.forEach(key => {
            if (key && needTrans && needTrans.includes(key)) {
                finishedData[this.addOrDelDownslide(false, key)] = object[key] * 100;
            } else if (key && this.notNeedTrans() && !this.notNeedTrans().includes(key) && !(object[key] instanceof Function)) {
                finishedData[this.addOrDelDownslide(false, key)] = object[key];
            }
        });
        console.log(finishedData);
        return finishedData;
    }


    static addOrDelDownslide(isAdd, key) {
        if (isAdd && !key.indexOf('_') == 0) {
            return "_" + key;
        }
        if (!isAdd && key.indexOf('_') == 0) {
            return key.substr(1, key.length);
        }
        return key;
    }

    static needTranslateDatas() {
    };

    static notNeedTrans() {
    };
}
module.exports= SqlModel;