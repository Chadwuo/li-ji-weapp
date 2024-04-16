<template>
    <div class="pt-24 space-y-5">
        <div class="flex items-center" @click="router.push('/pages/settings/index')">
            <uv-avatar :src="userInfo.avatarUrl" shape="square" :size="55"></uv-avatar>
            <div class="ml-3">
                <div class="text-lg">{{ welcome() }}，{{ userInfo.nickName }}</div>
                <div class="text-gray text-sm mt-1">{{ jinrishici }}</div>
            </div>
            <div class="i-ri-settings-line ml-auto text-lg"></div>
        </div>
        <div class="bg-white rounded-2xl grid gap-5 grid-cols-2 divide-x p-5">
            <div class="text-center">
                <div class="text-lg font-bold text-black">
                    {{ formatMoney(staticData.giftIn.total) }}
                </div>
                <div class="text-sm text-gray flex justify-center items-center space-x-1">
                    <div class="i-icon-park-outline-income"></div>
                    <div>收礼({{ staticData.giftIn.count }})</div>
                </div>
            </div>
            <div class="text-center">
                <div class="text-lg font-bold text-black">
                    {{ formatMoney(staticData.giftOut.total) }}
                </div>
                <div class="text-sm text-gray flex justify-center items-center space-x-1">
                    <div class="i-icon-park-outline-expenses"></div>
                    <div>送礼({{ staticData.giftOut.count }})</div>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-2xl p-1">
            <uv-cell isLink :border="false" url="/pages/family/index" value="家人共享" v-if="userInfo.familyMembers">
                <template v-slot:title>
                    <uv-avatar-group :urls="userInfo.familyMembers.map(i => i.user.avatarUrl)" size="35" gap="0.4">
                    </uv-avatar-group>
                </template>
            </uv-cell>
            <uv-cell v-else title="开通家人共享" url="/pages/family/index" isLink :border="false">
                <template v-slot:icon>
                    <div class="i-material-symbols:family-home text-red text-lg mx-2"></div>
                </template>
            </uv-cell>
        </div>
        <div class="bg-white rounded-2xl py-3 space-y-3 px-1">
            <uv-cell title="支持礼记" url="/pages/sponsor/index" isLink :border="false">
                <template v-slot:icon>
                    <div class="i-bx-like text-red text-lg mx-2"></div>
                </template>
            </uv-cell>

            <uv-cell :border="false" isLink>
                <template v-slot:icon>
                    <div class="i-ri-wechat-fill text-green text-lg pr-4"></div>
                </template>
                <template v-slot:title>
                    <button class="uv-reset-button w-full text-left" open-type="share">分享好友</button>
                </template>
            </uv-cell>
            <uv-cell title="常见问题" :border="false" url="/pages/FAQs/index" isLink>
                <template v-slot:icon>
                    <div class="i-ic-round-question-answer text-blue text-lg mx-2"></div>
                </template>
            </uv-cell>
            <uv-cell title="个人设置" :border="false" url="/pages/settings/index" isLink>
                <template v-slot:icon>
                    <div class="i-mingcute-settings-1-fill text-gray text-lg mx-2"></div>
                </template>
            </uv-cell>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { welcome, formatMoney } from "~/utils"
import { onLoad } from '@dcloudio/uni-app'
import jinrishiciApi from "@/utils/jinrishici.js"
import { statistics as staticGiftOut } from "@/alicloud/services/giftOut"
import { statistics as staticGiftIn } from '@/alicloud/services/giftReceive'

const { userInfo } = storeToRefs(useUserStore())
const jinrishici = ref('')

onLoad(() => {
    jinrishiciApi((result) => {
        jinrishici.value = result.data.content
    });
    statistics()
})

const staticData = ref({
    giftOut: {},
    giftIn: {}
})
const statistics = async () => {
    const [giftOutRes, giftInRes] = await Promise.all([staticGiftOut(), staticGiftIn()])
    if (giftOutRes.success) {
        staticData.value.giftOut = giftOutRes.data
    }
    if (giftInRes.success) {
        staticData.value.giftIn = giftInRes.data
    }
}

onShareAppMessage(() => {
    return {
        title: "可能是东半球最好用的人情记账工具",
        path: `/pages/index`,
        imageUrl: "/static/share.png",
    };
})

</script>

<style lang="scss" scoped>
:deep(.uv-cell__title) {
    flex: none
}
</style>

<route lang="json">{
    "style": {
        "navigationStyle": "custom"
    }
}</route>