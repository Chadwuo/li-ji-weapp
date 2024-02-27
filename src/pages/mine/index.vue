<template>
    <div mt-24>
        <div>欢迎{{ userInfo.nickName }}</div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
const { userInfo } = storeToRefs(useUserStore())

</script>

<style lang="scss" scoped></style>

<route lang="json">
{
    "style": {
        "navigationStyle": "custom"
    }
}
</route>