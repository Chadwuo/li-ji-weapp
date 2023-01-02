module.exports = {
    //随机字符串操作
    isRandom: {
        NUM: '0123456789',
        XEU: 'abcdefghijklmnopqrstuvwxyz',
        DEU: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        //生成随机字符串,默认为全部类型
        getRandom(num, chars) {
            if (!chars) chars = this.NUM + this.XEU + this.DEU
            let maxPos = chars.length, value = '';
            for (let i = 0; i < num; i++) {
                value += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return value;
        },
        //数字
        getRandomNUM(num) {
            return this.getRandom(num, this.NUM);
        },
        //小写字母
        getRandomXEU(num) {
            return this.getRandom(num, this.XEU);
        },
        //大写字母
        getRandomDEU(num) {
            return this.getRandom(num, this.DEU);
        },
        //数字+ 小写字母
        getRandomNUM_XEU(num) {
            return this.getRandom(num, this.NUM + this.XEU);
        },
        //数字 + 大写字母
        getRandomNUM_DEU(num) {
            return this.getRandom(num, this.NUM + this.DEU);
        },
        //小写字母 + 大写字母
        getRandomXEU_DEU(num) {
            return this.getRandom(num, this.XEU + this.DEU);
        },
        //范围随机数
        getRandomFrom(lower, upper) {
            return Math.floor(Math.random() * (upper - lower + 1) + lower);
        }
    }
}