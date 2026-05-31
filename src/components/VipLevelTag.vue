<script setup>
const props = defineProps(['accountType'])

const vipLevelInfo = computed(() => {
  switch (props.accountType) {
    case 1:
      return {
        name: 'PRO',
        color: '#F2CB69',
        bgColor: '#332B49',
      }
    case 2:
      return {
        name: 'SVIP',
        color: '#EC70AE',
        bgColor: '#EDB0E5',
      }
    case 9:
      return {
        name: 'VIP',
        color: '#DB695B',
        bgColor: '#FCA69F',
      }
    default:
      return {
        name: '普通用户',
        color: '#FBFFFC',
        bgColor: '#B2B6BE',
      }
  }
})
</script>

<template>
  <div>
    <div :style="{ backgroundColor: vipLevelInfo.bgColor, color: vipLevelInfo.color }" class="rounded-full p-1">
      <div class="flex items-center text-3">
        <i class="i-hugeicons-crown-03 mr-1" />
        <div class="leading-0">
          {{ vipLevelInfo.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
