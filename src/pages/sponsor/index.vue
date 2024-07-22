<script setup>

</script>

<template>
  <div class="mt-5">
    <div class="indent-8 text-sm leading-relaxed">
      礼记 是一个开源项目，使用完全免费，维护这样一个项目需要很大的精力和服务器费用。
    </div>
    <div class="indent-8 text-sm leading-relaxed">
      为了维持礼记的健康运营，部分页面中增加了广告，敬请理解，当然，如果你对广告容忍度很低，可以在<text
        class="text-red"
        @click="router.push('/pages/settings/index')"
      >
        设置
      </text>中关闭广告！
    </div>
  </div>
  <Advertisement class="mt-auto" adtyle="video" />
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "支持礼记"
  }
}
</route>
