module.exports = {
    //金额处理:保留几位小数，不四舍五入(关于金额数值的处理用这个方法,以防金额计算出错)
    priceFormat(price, decimal=2) {
        if (price) {
            let price = (price * 100) / 100;
            return parseFloat(price)
                .toFixed(decimal)
                .toString()
                .split('')
                .reverse()
                .join('')
                .replace(/(\d{3})/g, '$1,')
                .replace(/\,$/, '')
                .split('')
                .reverse()
                .join('')
        } else {
            return 0;
        }
    },
    //数字格式化
    numberFormat(num) {
        if (num > 1000 && num < 10000) {
            return Math.floor(num / 1000) + 'k';
        } else if (num > 10000) {
            return Math.floor(num / 10000) + 'W';
        } else {
            return num;
        }
    },
}
