<template>
    <div class="mt-3 space-y-3">
        <div class="bg-white rounded-xl p-1">
            <uv-cell title="开源协议" value="GPL-3.0 license"></uv-cell>
            <uv-cell title="开发团队" :border="false" isLink url="/pages-sub/contributors/index"
                cellStyle="background-color:white"></uv-cell>

        </div>
        <div class="bg-white rounded-xl p-1">
            <uv-cell title="隐私政策" isLink cellStyle="background-color:white"
                @click="openPrivacyContract"></uv-cell>
            <uv-cell title="备案号" value="皖ICP备2023023087号-1X" :border="false"></uv-cell>
        </div>

        <div class="bg-white rounded-xl p-1">
            <uv-cell title="关于礼记" :border="false" isLink url="/pages/about/index" cellStyle="background-color:white"></uv-cell>
        </div>
    </div>
</template>

<script setup>

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