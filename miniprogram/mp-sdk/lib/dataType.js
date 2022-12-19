module.exports = {
    //判断数据类型
    isDataType: {
        ifNull(value) {
            return value === undefined || value === null || value === '';
        },
        ifBoolean(value) {
            return typeof value == 'boolean';
        },
        ifFunction(value) {
            return typeof value == 'function';
        },
        ifObject(value) {
            return Object.prototype.toString.call(value) === '[object Object]';
        },
        ifArray(value) {
            return value instanceof Array || Object.prototype.toString.call(value) === '[object Array]';
        },
        ifDate(value) {
            return value instanceof Date || Object.prototype.toString.call(value) === '[object Date]';
        },
        ifNumber(value) {
            return value instanceof Number || Object.prototype.toString.call(value) === '[object Number]';
        },
        ifString(value) {
            return value instanceof String || Object.prototype.toString.call(value) === '[object String]';
        }
    }
}
