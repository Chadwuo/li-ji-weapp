<template>
    <div class="mt-24">
        <div>
            <uv-avatar :src="userInfo.avatarUrl" shape="square"></uv-avatar>
            <div>
                <div class="text-xl">{{ welcome() }}，{{ userInfo.nickName }}</div>
                <div class="text-gray text-sm pt-2">jinrishici</div>
            </div>
        </div>
        <div>
            
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { welcome } from "~/utils"

const { userInfo } = storeToRefs(useUserStore())



</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "style": {
        "navigationStyle": "custom"
    }
}</route>