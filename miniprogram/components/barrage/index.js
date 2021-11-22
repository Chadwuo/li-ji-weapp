let maxTime=0,timer;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //距离屏幕顶部距离
    top: {
      type: String,
      value: "10vh"
    },
    //每行间距单位
    rowSpacing: {
      type: String,
      value: "40rpx",
    },
    //数据源
    list: {
      type: Array,
      value: []
    },
    //层级
    zIndex: {
      type: Number,
      value: 999
    },
    //一个等于屏幕宽度的弹幕 滚动所需要的时间 单位毫秒
    speed: {
      type: Number,
      value: 5000
    },
    //动画速度波动范围-500~500ms之间选取随机值,用于控制每条弹幕的速度
    shakeSpeed: {
      type: Number,
      value: 500
    },
    //动画延时执行时间波动范围上限值 0~500ms之间选取随机值, 用于控制弹幕出厂顺序
    shakeDelay: {
      type: Number,
      value: 500
    },
    //弹幕行数
    rows: {
      type: Number,
      value: 3
    },
     //每项弹幕右外边距
     marRight: {
      type: String,
      value: "40rpx"
    },
    //是否循环
    loop: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    barrageInfo: {
      list: []
    },
  },
  lifetimes: {
    attached: function () {
      
    }
  },
  observers:{
    list(data){
      if(data.length>0){
        clearTimeout(timer);
        this.initBarrage();
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initBarrage() {
      this.setData({
        barrageInfo:{
          list:[]
        }
      })
      this.groupData();
      this.computeEl();
    },
    //计算元素高度、长度信息、动画信息
    computeEl() {
      let list = this.data.barrageInfo.list;
      // const rowSpacingNum = this.data.rowSpacing.replace(/[^0-9]/ig,"");
      // const rowSpacingUnit = this.data.rowSpacing.replace(/[0-9]+/g,"");
      maxTime=0;
      let arr=[];
      list.map((item, index) => {
        let query = this.createSelectorQuery();
        query.select('#barr_' + index).boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(res=>{
          res = res[0];
          item.animation=this.createBarrageAnimation(res);
          let elHeight=res.height+"px";
          item.top=`calc(${this.data.top} +  ${index}*${this.data.rowSpacing} + ${index}*${elHeight})`;
          arr.push(item);
          if(index+1==list.length){
            console.log(maxTime,'最长一条弹幕用完所需要的时间');
            timer=setTimeout(() => {
                if(this.data.loop)  this.initBarrage();
                //单次滚动完成
                this.triggerEvent('done');
            }, maxTime);
            //query.exec是异步方法所以无法在循环外面写
            this.setData({
              ['barrageInfo.list']: arr
            })
          }
        })
      })
    },
    // rpx转化为px
    rpxToPx(val){
      const {windowWidth}=wx.getSystemInfoSync();
      return val*(windowWidth/750);
    },
    /**
     * 创建每一行的动画
     * @param {Objec} res  元素信息
     */
    createBarrageAnimation(res) {
      let screenWidth=this.rpxToPx(750);
      let elWidth = res.width;
      let speed = this.data.speed;
      speed += this.randomNum(this.data.shakeSpeed * -1, this.data.shakeSpeed)
      let duration = speed * (elWidth / screenWidth);
      let delay= this.randomNum(0, this.data.shakeDelay);
      let tempTime=delay+duration;
      maxTime=tempTime>=maxTime?tempTime:maxTime;
      let myAnimation = wx.createAnimation({
        delay,
        duration:duration<=0?1500:duration
      })
      myAnimation.translateX("-" + elWidth + "px").step();
      return myAnimation.export();
    },
    /**
     * 获取随机数
     * @param {*} minNum  最小值
     * @param {*} maxNum  最大值
     */
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    },
    //数据分组
    groupData() {
      let list = this.data.list;
      let arr = [];
      if (this.data.rows > 1) {
        let page = Math.ceil(list.length / this.data.rows);
        for (let index = 0; index < this.data.rows; index++) {
          if (index < list.length) {
            arr.push({list:this.pagination(index + 1, page, list)})
          }
        }
      } else {
        arr.push({list});
      }
      this.setData({
        ['barrageInfo.list']: arr
      })
    },
    pagination(pageNo, pageSize, array) {
      var offset = (pageNo - 1) * pageSize;
      return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
    }
  }
})