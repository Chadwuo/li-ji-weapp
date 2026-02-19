<script setup lang="ts">
interface Props {
  /** 金额值 */
  money?: number | null
  /** 文字大小类 */
  size?: string
  /** 是否加粗 */
  bold?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  money: 0,
  size: 'text-lg',
  bold: true,
})

const amount = computed(() => props.money ?? 0)
const colorClass = computed(() => amount.value > 0 ? 'text-red' : 'text-teal')
const displayMoney = computed(() => amount.value > 0 ? `+${amount.value}` : amount.value)
</script>

<template>
  <div
    :class="[
      size,
      colorClass,
      { 'font-bold': bold },
    ]"
  >
    {{ displayMoney }}
  </div>
</template>

<style lang="scss" scoped></style>
