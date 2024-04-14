<template>
    <div class="mt-3 space-y-3">
        <div class="bg-white rounded-2xl p-1">
            <uv-cell title="关闭广告" label="" :border="false" cellStyle="background-color:white">
                <template v-slot:value>
                    <uv-switch v-model="value" @change="onChange"></uv-switch>
                </template>
            </uv-cell>
        </div>
        <div class="bg-white rounded-2xl p-1">
            <uv-cell isLink :border="false" cellStyle="background-color:white">
                <template v-slot:title>
                    <button class="uv-reset-button w-full text-left" open-type="contact">在线客服</button>
                </template>
            </uv-cell>
            <uv-cell isLink :border="false" cellStyle="background-color:white">
                <template v-slot:title>
                    <button class="uv-reset-button w-full text-left" open-type="feedback">意见反馈</button>
                </template>
            </uv-cell>

            <uv-cell title="开发团队" :border="false" isLink url="/pages-sub/contributors/index" cellStyle="background-color:white">
            </uv-cell>
            <uv-cell title="开源协议" :border="false" value="GPL-3.0 license"></uv-cell>
        </div>
        <div class="bg-white rounded-2xl p-1">
            <uv-cell title="备案号" :border="false" value="皖ICP备2023023087号-1X"></uv-cell>
            <uv-cell title="隐私政策" :border="false" isLink cellStyle="background-color:white" @click="openPrivacyContract">
            </uv-cell>
            <uv-cell title="关于礼记" isLink :border="false" url="/pages/about/index" cellStyle="background-color:white">
            </uv-cell>
        </div>
    </div>
</template>

<script setup>

const onChange = (val) => {
    wx.showToast({
        title: val ? '页面广告已开启，礼记因你更美好！' : '礼记会继续努力，期待得到你的认可！',
        icon: 'none',
        duration: 3000
    })
}

const openPrivacyContract = () => {
    wx.openPrivacyContract({
        success: res => {
            console.log('openPrivacyContract success')
        },
        fail: res => {
            console.error('openPrivacyContract fail', res)
        }
    })
}
</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "style": {
        "navigationBarTitleText": "设置"
    }
}</route>