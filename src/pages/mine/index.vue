<template>
    <div class="mt-24 mx-5">
        <div class="flex items-center">
            <uv-avatar :src="userInfo.avatarUrl" shape="square" :size="55"></uv-avatar>
            <div class="ml-3">
                <div class="text-lg">{{ welcome() }}，{{ userInfo.nickName }}</div>
                <div class="text-gray text-sm mt-1">{{ jinrishici }}</div>
            </div>
            <div class="i-carbon:chevron-right ml-auto"></div>
        </div>
        <div class="bg-white rounded-xl grid gap-5 grid-cols-2 divide-x mt-5 p-5">
            <div class="text-center">
                <div class="text-lg font-bold text-black">
                    1000
                </div>
                <div class="text-sm text-gray flex justify-center items-center space-x-1">
                    <div class="i-carbon:home"></div>
                    <div>收礼</div>
                </div>
            </div>
            <div class="text-center">
                <div class="text-lg font-bold text-black">
                    1000
                </div>
                <div class="text-sm text-gray flex justify-center items-center space-x-1">
                    <div class="i-carbon:home"></div>
                    <div>收礼</div>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-xl mt-5 py-5">
            <uv-cell title="个人设置" isLink :border="false">
                <template v-slot:icon>
                    <div class="i-mingcute:settings-1-fill text-gray text-lg pr-2"></div>
                </template>
            </uv-cell>
            <uv-cell title="常见问题" isLink :border="false">
                <template v-slot:icon>
                    <div class="i-ri:quill-pen-fill text-blue text-lg pr-2"></div>
                </template>
            </uv-cell>
            <uv-cell title="分享好友" isLink :border="false">
                <template v-slot:icon>
                    <div class="i-ri:wechat-fill text-green text-lg pr-2"></div>
                </template>
            </uv-cell>
            <uv-cell title="关于礼记" isLink :border="false" url="/pages/about/index">
                <!-- 自定义左侧图标 -->
                <template v-slot:icon>
                    <div class="i-ri:quill-pen-fill text-red text-lg pr-2"></div>
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

<style lang="scss" scoped></style>

<route lang="json">{
    "style": {
        "navigationStyle": "custom"
    }
}</route>