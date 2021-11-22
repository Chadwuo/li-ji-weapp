// pages/appreciate/index.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        barrageList: [{
                "name": "紫花纱",
                "money": "99",
                "words": "恭喜橙cc ʚ🧸ྀིɞ抽到米丽Molly",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKN7icTnnckpsFYianVNtSgSRh1eGHQqUBsGKOjqxWViczy4ich7GYZaNYBFVibo3RpbuHcgffYlzmbu4A/132"
            },
            {
                "words": "恭喜Tᴀɴɢᴇʀɪɴᴇ橘···抽到木筏",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELHXR7cXiciczWZYeG6zy30pT7YHqiar46ypKcsWziaUgJr1oiciaCDckvojibMNRia6nPC47pASJGCDoag8w/132"
            },
            {
                "words": "恭喜HviviN抽到木筏",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/38gT6kFbfMQWicpibcpSumdxJKZSvVVKbM4nwUZF0dIBp8rWnuXUz4Amo6nAHQrJy6XjRYfC0DMYdlX4D2n3zVibw/132"
            },
            {
                "words": "恭喜✨爱❤️小陶抽到木筏",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIPPp6tia03NZejI7MjWrAccv0IwP6W6QBG3HS31AtUqnY5bXKAo1ChFOK3sjLnMtaKcdGlib3wiaOmw/132"
            },
            {
                "words": "恭喜Panda抽到海星",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Dk9Br14qh0AWblZib3nRdhhJdngRibacIVTNJuQ9TPCTblQxxdic6fwGydL7icXb5bQ8Df7b1EoIsniatNNSbC31VnA/132"
            },
            {
                "words": "恭喜团子抽到旅行",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erLgVaV7RGvmVUBusU4QVjQKPNYccjMfZbicWZZfichtkiaxGFcXzZJ5ic0MUImIx9aatiaFZocjK62azQ/132"
            },
            {
                "words": "恭喜n抽到万圣节印克Molly",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Wul1bxtlYVlVvXIBGwmmiaDg4lfsTmS2DUtkiathDgCqQUBgWwiaq6vSIIPMPLp0Obia5tDBBy3SlLPAUVzeEzSMRw/132"
            },
            {
                "words": "恭喜🌵皮皮象🐘抽到双子座",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqQMnYlcuIuVNSaSerHwr0J8EoWLAMInEPgnibiaTcZpKQibiaoeq4x1zeUKdyViahewaU5NLpWicq3Hxvg/132"
            },
            {
                "words": "恭喜静静抽到砍柴",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/fh5t8woWHfWUicDS1YYicNI4pNiazBg7NLgUpCf74LcQdsicNu8q5ll0gCfmpaEybWU1H466lXRNcxVGttpbcNibW9g/132"
            },
            {
                "words": "恭喜十六抽到皮艇",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIw9DQgYakaZlbCI16yjOiaRo9vQR4ukhCplXVp8cTI7hEBF064LjI3dGOLOtSEETjpWtgQZIvSpCA/132"
            },
            {
                "words": "恭喜🍇抽到砍柴",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL84AUC4PsNXlJR1cA7QoqIAGvp1GAyYD5QBfrKuxpFVqMySYn6PeV49SxmI7ycKGN2wdSjIFpX7w/132"
            },
            {
                "words": "恭喜💕抽到皮艇",
                "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKW8Eicmrdn75qxdibpjW57S2w6kXLUAsOwibtjr3ffEn1rZuJZNXfbibxcsE9GkgnYwJhA4L1GCragKw/132"
            },
            {
                "words": "恭喜🐮.L抽到涂鸦奥斯卡",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/1tD0RricaTLzwomfHHufenPmUXPiaMFjOOOXLzKddicDLiaA1rS8xHhHWJlswicNiamHZZfRxtXesYoLOJYiahUBskk2g/132"
            },
            {
                "words": "恭喜💋Melody _···抽到登山",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ephiahO1BnkTrvm8adQrau81O5xU9nYuic3BL8vr33zXhgia4TZh7Wic0rhiccT2z27qEicpWibkYBt7edjw/132"
            },
            {
                "words": "恭喜GavinZCY抽到火堆",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoibIPRa2kiaqf6aiaWWDHNfcePDE78yEIvicNprdRaPUWl4YtYeHLXF9du2N63l7iazD7K9iaMJbDQHo5w/132"
            },
            {
                "words": "恭喜欢抽到北极熊",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJotkWUtM26UIXHtTvqFibxayia5q3ylnKDeo8bic5r7PhkgW9Id1YObFv0rUbXa9z9Gx6yI8iaUZmjnQ/132"
            },
            {
                "words": "恭喜ᴋɪᴋɪ抽到企鹅",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ9hS8j2p0QsCITUVEuPtHxGQPvyGDgHolHZQwPf4GHwQNia7u8lmEpmRRUOWg8me6rvkO7IH4Uibtw/132"
            },
            {
                "words": "恭喜Carson抽到火堆",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKhfJq2F0dAr1XDstAibjia7e5EiaCeWsVEcRncDXHW8DWRia9uiccBic2aUWYiaC3iaiakXEDuNibpct2LTZ1A/132"
            },
            {
                "words": "恭喜冷眼看你装抽到雪地旅行者",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Gk4AZcP2TQd4VPxe8jJ3SnsNP5dhyicsvCbE1RkGfmiaRj59jrjiatuYsKYtoOM7tQia9vlQT4cdE2Gznj3yp4kotg/132"
            },
            {
                "words": "恭喜hulahala抽到雪地旅行者",
                "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTICow4PNkygn26VmDQTwT5PBhaASdYno69Zav18q3CMqcaicG0iab2JE1lwOEnlDOnUnX5pdXvo6Picg/132"
            },
            {
                "words": "恭喜零抽到雪地旅行者",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/67ahwboZZxY1XrBfJLqbiaMtMHBPYnEAMJCfibib7U4ybJnUssE07ToeJZCSafTIrv8gxBnicvZWBPVpqPfMsO5tJw/132"
            },
            {
                "words": "恭喜iiiamlyd1a···抽到六角恐龙",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/6BY0kMKB861fABGP1dupicA5ibfxMFSx2gYOiae6shrjrATlVBQrdibtBXufESnMVmrrf59icYhLmkqqY61hBqicp3CA/132"
            },
            {
                "words": "恭喜5Am抽到牛奶小可爱",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLaZrBxV8PAfbMh57fIVFowEnr0HNTkOvcM3xAs0W2jE4xRxQtvNYbWtu8bkSBNlD06LhBAomMH9g/132"
            },
            {
                "words": "恭喜Dr.焦健抽到火堆",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83era28Dia2Ga3rP852PdwoGa0jP8Z0GzUDZUXiaoEWxrDWxP68UkneYjMNeV6FEGxOPlqkNcSjXfRnKQ/132"
            },
            {
                "words": "恭喜渼雯抽到加欧Molly",
                "avatar": "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEI2b67MQUP19wxicvRpJZJA7f03r1hUg9ACg6cYfP71ILtEdXGd3PGicianGsuqaOtR7DQ9gicle67jaw/132"
            },
            {
                "words": "恭喜mdk妈幸 1868···抽到企鹅",
                "avatar": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo87joibViaflIBTySnZJ5spvEDXr39vJGKRQNRtsM0NzIgsTunqNiaibh2HcTjpaVWFaFc8QvxicKGfCw/132"
            },
            {
                "words": "恭喜💎逸小兔👑抽到皮艇",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ4asTs6OWT5X4ChJywfEF5SPvic0X7QLqMOtLNgsPey6zraeb0MDRLBINNHgqq5hzEXb9NAUpgKVw/132"
            },
            {
                "words": "恭喜岁杪拾伊抽到珊瑚",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/3oImemj5RiaKBZ3gtw845q3xphNzibG98BnG2MI7kV0mSibd49rMxnsWz8k52BCZX1ficuzLH9Ku0u6RlYl9qOy8Uw/132"
            },
            {
                "words": "恭喜🦄抽到木筏",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Odhicd3gdPPIT5PEmMAfxst32mMgg3ALcVZyAZGROE1UbJ4CiajkLibuo4SvvWzUYrZ9jPXo1jMdmdRROxMoOoM1A/132"
            },
            {
                "words": "恭喜Janelle💭抽到徒步",
                "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epO6Y8SNhHED1icNqINFIfEeCcY3YqDPbsZU6QsbA1NB2gviadG6IbT4ibIWkficc3blKt3LkEZiaWKiaqw/132"
            }
        ]
    },
    barrageDone() {
        console.log('回调完成')
    },
    previewImage() {
        wx.previewImage({
            urls: ['cloud://liji-1gzjub9o9bdf6d00.6c69-liji-1gzjub9o9bdf6d00-1308229258/appreciate_code.jpg'] // 需要预览的图片http链接列表
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

    }
})