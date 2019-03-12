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
        return obj;
    }

    //去掉object 变量的下划线
    static delDownslide(object,toObject){
        let obj = toObject || {};
        let keys = Object.keys(object);
        keys.forEach(key =>{
            if(toObject){
                obj.__lookupSetter__(this.addOrDelDownslide(false, key)) && obj.__lookupSetter__(this.addOrDelDownslide(false, key)).call(obj, object[key]);
            }else {
                obj[this.addOrDelDownslide(false,key)] = object[key];
            }
        });
        if(toObject){
            return this.delDownslide(obj);
        }
        return obj;
    }


    //将元转化成分 *100
    static yuanTransToFen(object,toObject) {
        let finishedData = toObject || {};
        let needTrans = this.needTranslateDatas();
        let keys = Object.keys(object);
        keys.forEach(key => {
            if (key && needTrans && needTrans.includes(key)) {
                if(toObject){
                    finishedData.__lookupSetter__(this.addOrDelDownslide(false, key)) &&
                    finishedData.__lookupSetter__(this.addOrDelDownslide(false, key)).call(finishedData, object[key]*100);
                }else {
                    finishedData[this.addOrDelDownslide(false, key)] = object[key] * 100;
                }
            } else if (key && this.notNeedTrans() && !this.notNeedTrans().includes(key) && !(object[key] instanceof Function)) {
                if(toObject){
                    finishedData.__lookupSetter__(this.addOrDelDownslide(false, key)) &&
                    finishedData.__lookupSetter__(this.addOrDelDownslide(false, key)).call(finishedData, object[key]);
                }else {
                    finishedData[this.addOrDelDownslide(false, key)] = object[key];
                }

            }
        });
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