<template>
    <div class="mt-24 space-y-5">
        <div class="flex items-center">
            <uv-avatar :src="userInfo.avatarUrl" shape="square" :size="55"></uv-avatar>
            <div class="ml-3">
                <div class="text-lg">{{ welcome() }}，{{ userInfo.nickName }}</div>
                <div class="text-gray text-sm mt-1">{{ jinrishici }}</div>
            </div>
            <div @click="router.push('/pages/settings/index')" class="i-ri:settings-line ml-auto text-lg"></div>
        </div>
        <div class="bg-white rounded-xl grid gap-5 grid-cols-2 divide-x p-5">
            <div class="text-center">
                <div class="text-lg font-bold text-black">
                    1000
                </div>
                <div class="text-sm text-gray flex justify-center items-center space-x-1">
                    <div class="i-icon-park-outline:income"></div>
                    <div>收礼</div>
                </div>
            </div>
            <div class="text-center">
                <div class="text-lg font-bold text-black">
                    1000
                </div>
                <div class="text-sm text-gray flex justify-center items-center space-x-1">
                    <div class="i-icon-park-outline:expenses"></div>
                    <div>送礼</div>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-xl p-1">
            <uv-cell isLink :border="false" url="/pages/family/index" cellStyle="background-color:white" value="家人共享">
                <template v-slot:title>
                    <uv-avatar-group :urls="[
                'https://cdn.uviewui.com/uview/album/1.jpg',
                'https://cdn.uviewui.com/uview/album/2.jpg',
            ]" size="35" gap="0.4"></uv-avatar-group>
                </template>
            </uv-cell>
        </div>
        <div class="bg-white rounded-xl py-3 space-y-2">
            <uv-cell isLink cellStyle="background-color:white">
                <template v-slot:icon>
                    <div class="i-ri:customer-service-2-fill text-orange text-lg mx-2"></div>
                </template>
                <template v-slot:title>
                    <button class="uv-reset-button w-full text-left" open-type="contact">在线客服</button>
                </template>
            </uv-cell>
            <uv-cell isLink cellStyle="background-color:white">
                <template v-slot:icon>
                    <div class="i-icon-park-outline:topic text-rose text-lg mx-2"></div>
                </template>
                <template v-slot:title>
                    <button class="uv-reset-button w-full text-left" open-type="feedback">意见反馈</button>
                </template>
            </uv-cell>
            <uv-cell isLink cellStyle="background-color:white">
                <template v-slot:icon>
                    <div class="i-ri:wechat-fill text-green text-lg pr-4"></div>
                </template>
                <template v-slot:title>
                    <button class="uv-reset-button w-full text-left" open-type="share">分享好友</button>
                </template>
            </uv-cell>
            <uv-cell title="常见问题" url="/pages/FAQs/index" isLink cellStyle="background-color:white">
                <template v-slot:icon>
                    <div class="i-ic:round-question-answer text-blue text-lg mx-2"></div>
                </template>
            </uv-cell>
            <uv-cell title="个人设置" :border="false" url="/pages/settings/index" isLink cellStyle="background-color:white">
                <template v-slot:icon>
                    <div class="i-mingcute:settings-1-fill text-gray text-lg mx-2"></div>
                </template>
            </uv-cell>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { welcome } from "~/utils"
import { onLoad } from '@dcloudio/uni-app'
import jinrishiciApi from "@/utils/jinrishici.js"

const { userInfo } = storeToRefs(useUserStore())
const jinrishici = ref('')

onLoad(() => {
    jinrishiciApi((result) => {
        jinrishici.value = result.data.content
    });
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