<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

defineProps({
  adtyle: {
    type: String,
    default: 'banner',
  },
})
const { userInfo } = storeToRefs(useUserStore())
</script>

<template>
  <div v-if="userInfo.enableAD">
    <ad v-if="adtyle === 'banner'" unit-id="adunit-64aefbe92c2dc7bf" />
    <ad v-if="adtyle === 'video'" unit-id="adunit-45fd166651f430ec" ad-type="video" ad-theme="white" />
    <div class="mt-2 flex text-xs text-gray">
      <i class="i-carbon-information-filled mx-2" /><span>广告可以在设置中关闭</span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
