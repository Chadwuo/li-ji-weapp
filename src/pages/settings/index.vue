<template>
    <div class="mt-3 space-y-3">
        <div class="bg-white rounded-2xl p-1">
            <uv-cell isLink :border="false">
                <template v-slot:title>
                    <button class="uv-reset-button w-full text-left" open-type="chooseAvatar"
                        @chooseavatar="onChooseAvatar">头像</button>
                </template>
                <template v-slot:value>
                    <uv-avatar :src="userInfo.avatarUrl"></uv-avatar>
                </template>
            </uv-cell>
            <uv-cell title="昵称" :border="false" isLink>
                <template v-slot:value>
                    <input class="text-right text-sm" v-model="nickName_edit" type="nickname" @blur="onBlur" />
                </template>
            </uv-cell>
        </div>
        <div class="bg-white rounded-2xl p-1">
            <uv-cell title="关闭广告" :label="userInfo.skipAD ? '礼记会继续努力，期待得到你的认可！' : '页面广告已开启，礼记因你更美好！'" :border="false">
                <template v-slot:value>
                    <uv-switch v-model="userInfo.skipAD" @change="onChange"></uv-switch>
                </template>
            </uv-cell>
        </div>
        <div class="bg-white rounded-2xl p-1">
            <uv-cell isLink :border="false">
                <template v-slot:title>
                    <button class="uv-reset-button w-full text-left" open-type="contact">在线客服</button>
                </template>
            </uv-cell>
            <uv-cell isLink :border="false">
                <template v-slot:title>
                    <button class="uv-reset-button w-full text-left" open-type="feedback">意见反馈</button>
                </template>
            </uv-cell>

            <uv-cell title="开发团队" :border="false" isLink url="/pages-sub/contributors/index">
            </uv-cell>
            <uv-cell title="开源协议" :border="false" value="GPL-3.0 license"></uv-cell>
        </div>
        <div class="bg-white rounded-2xl p-1">
            <uv-cell title="备案号" :border="false" value="皖ICP备2023023087号-1X"></uv-cell>
            <uv-cell title="隐私政策" :border="false" isLink @click="openPrivacyContract">
            </uv-cell>
            <uv-cell title="关于礼记" isLink :border="false" url="/pages/about/index">
            </uv-cell>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
const { userInfo } = storeToRefs(useUserStore())
import { update } from '@/alicloud/services/user'
import mpserverless from "~/alicloud/index";
const onChange = (val) => {
    update({ skipAD: val })
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

const onChooseAvatar = (e) => {
    mpserverless.file.uploadFile({
        filePath: e.detail.avatarUrl,
    }).then((res) => {
        const { fileUrl } = res;
        update({
            avatarUrl: fileUrl
        }).then(res => {
            if (res.success) {
                wx.showToast({
                    title: '修改成功',
                    icon: 'none',
                    duration: 2000
                })
                userInfo.value.avatarUrl = fileUrl
            }
        })
    });
}
const nickName_edit = ref(userInfo.value.nickName)
const onBlur = () => {
    if (nickName_edit.value != userInfo.value.nickName) {
        update({
            nickName: nickName_edit.value
        }).then(res => {
            if (res.success) {
                wx.showToast({
                    title: '修改成功',
                    icon: 'none',
                    duration: 2000
                })
                userInfo.value.nickName = nickName_edit.value
            }
        })
    }
}
</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "style": {
        "navigationBarTitleText": "设置"
    }
}</route>