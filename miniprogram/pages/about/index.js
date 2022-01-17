// pages/about/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    micahh(){
        const arr = ['你拍了拍作者头顶\r\n却没摸到秀发', '要不要来一把LOL', '花生，你发现了彩蛋']
        const index = Math.floor(Math.random() * arr.length)
        wx.showToast({
            title: arr[index],
            icon:'none',
            duration: 2500
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        
    },
})