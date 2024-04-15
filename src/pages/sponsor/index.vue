<template>
    <div class="mt-5">
        <div class="indent-8 leading-relaxed text-sm">
            礼记 是一个开源项目，使用完全免费，维护这样一个项目需要很大的精力和服务器费用。
        </div>
        <div class="indent-8 leading-relaxed text-sm">
            为了维持礼记的健康运营，部分页面中增加了广告，敬请理解，当然，如果你对广告容忍度很低，可以在<text class="text-red"
                @click="router.push('/pages/settings/index')"> 设置 </text>中关闭广告！
        </div>
        <div class="indent-8 leading-relaxed text-sm">
            倘若 礼记 于你有益，欢迎你通过下方观看广告视频的形式助力 礼记 发展。用爱发电，你也可以！
        </div>

        <div class="text-center my-5">
            <uv-button type="primary" shape="circle" text="观看广告视频" @click="onSupport"></uv-button>
        </div>
    </div>
    <div class="mt-auto">
        <ad unit-id="adunit-45fd166651f430ec" ad-type="video" ad-theme="white"></ad>
    </div>
</template>

<script setup>
let rewardedVideoAd = null

onLoad(() => {
    // 创建广告
    if (wx.createRewardedVideoAd) {
        rewardedVideoAd = wx.createRewardedVideoAd({
            adUnitId: 'adunit-3095dee4fe741a53'
        })
        rewardedVideoAd.onLoad(() => {
            console.log('激励视频 广告加载成功')
        })
        rewardedVideoAd.onError((err) => {
            console.log('onError event emit', err)
        })
        rewardedVideoAd.onClose((res) => {
            // 用户点击了【关闭广告】按钮
            if (res && res.isEnded) {
                // 正常播放结束，可以下发游戏奖励
                rewardedSuccess()
            } else {
                // 播放中途退出，不下发游戏奖励
                wx.showToast({
                    title: '没关系，下次一定',
                    icon: 'none',
                    duration: 3000
                })
            }
        })
    }
})

const onSupport = () => {
    rewardedVideoAd.show()
        .catch(() => {
            rewardedVideoAd.load()
                .then(() => rewardedVideoAd.show())
                .catch(err => {
                    console.log('激励视频 广告显示失败', err)
                    wx.showToast({
                        title: '广告显示失败',
                        icon: 'error',
                        duration: 3000
                    })
                })
        })
}

const rewardedSuccess = () => {
    wx.showToast({
        title: '充电成功，感谢有你',
        icon: 'none',
        duration: 3000
    })
}

</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "style": {
        "navigationBarTitleText": "开发团队"
    }
}</route>