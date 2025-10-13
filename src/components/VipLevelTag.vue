<script setup>
const props = defineProps(['accountType'])

const vipLevelInfo = computed(() => {
  switch (props.accountType) {
    case 1:
      return {
        name: 'VIP PRO',
        color: '#F2CB69',
        bgColor: '#332B49',
      }
    case 2:
      return {
        name: 'VIP',
        color: '#DB695B',
        bgColor: '#FCA69F',
      }
    case 9:
      return {
        name: 'SVIP',
        color: '#EC70AE',
        bgColor: '#EDB0E5',
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
    <wd-tag :color="vipLevelInfo.color" :bg-color="vipLevelInfo.bgColor" round>
      <div class="flex items-center">
        <i class="i-hugeicons-crown-03 mr-1" />
        <div class="leading-none">
          {{ vipLevelInfo.name }}
        </div>
      </div>
    </wd-tag>
  </div>
</template>

<style lang="scss" scoped></style>
