Component({
    data: {
        colorName: ''
    },
    options: {
        addGlobalClass: true
    },
    properties: {
        data: {
            type: Object,
            optionalTypes: Array,
            value: {}
        }
    },
    lifetimes: {
        attached() {
            this.setData({
                colorName: this.getColor()
            });
        }
    },
    methods:{
        //随机生成库内颜色名
        getColor() {
            let colorArr = ['yellow', 'orange', 'red', 'pink', 'mauve', 'purple', 'blue', 'cyan', 'green', 'olive', 'grey', 'brown'];
            return colorArr[Math.floor(Math.random() * colorArr.length)]
        }
    },
})