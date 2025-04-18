<script setup lang="ts">

</script>

<template>
  <div class="w-full">
    <!-- 方案对比 -->
    <div class="mb-6 text-center text-xl text-gray-800 font-bold">
      方案对比
    </div>

    <!-- 对比表格 -->
    <div class="overflow-hidden rounded-2xl bg-white shadow">
      <!-- 表头 -->
      <div class="grid grid-cols-3 justify-items-center bg-gray-50">
        <div class="px-4 py-3 text-left text-gray-500 font-medium">
          会员权益
        </div>
        <div class="px-4 py-3 text-gray-500 font-medium">
          普通用户
        </div>
        <div class="px-4 py-3 text-amber font-medium">
          VIP
        </div>
      </div>
      <!-- 权益项 -->
      <div class="grid grid-cols-3 justify-items-center border-t border-gray-100">
        <div class="px-4 py-3 text-gray-600">
          家人共享
        </div>
        <div class="px-4 py-3 text-center text-sm text-gray-500">
          2 人
        </div>
        <div class="px-4 py-3 text-center text-amber font-medium">
          无限制
        </div>
      </div>
      <div class="grid grid-cols-3 justify-items-center border-t border-gray-100">
        <div class="px-4 py-3 text-gray-600">
          定制服务
        </div>
        <div class="px-4 py-3 text-center">
          🚫
        </div>
        <div class="px-4 py-3 text-center">
          ✅
        </div>
      </div>
      <div class="grid grid-cols-3 justify-items-center border-t border-gray-100">
        <div class="px-4 py-3 text-gray-600">
          优先响应
        </div>
        <div class="px-4 py-3 text-center text-sm text-gray-500">
          普通通道
        </div>
        <div class="px-4 py-3 text-center text-amber font-medium">
          VIP通道
        </div>
      </div>
      <div class="grid grid-cols-3 justify-items-center border-t border-gray-100">
        <div class="px-4 py-3 text-gray-600">
          数据导出
        </div>
        <div class="px-4 py-3 text-center text-sm text-gray-500">
          每月3次
        </div>
        <div class="px-4 py-3 text-center text-amber font-medium">
          无限制
        </div>
      </div>
    </div>

    <!-- 常见问题 -->
    <div class="mt-6 text-center text-xl text-gray-800 font-bold">
      常见问题
    </div>
    <div class="mt-2 text-sm text-gray">
      我们列举了一些你可能关注的话题。如果没能找你想要的信息，可以联系在线客服获取更多支持。
    </div>

    <div class="mt-6 rounded-2xl bg-white shadow">
      <uv-collapse accordion :border="false">
        <uv-collapse-item :clickable="false" title="什么是永久会员？">
          <text class="uv-collapse-content">
            永久会员指通过一次性支付费用，即可永久享受会员权益，无需定期续费
          </text>
        </uv-collapse-item>
        <uv-collapse-item :clickable="false" title="升级VIP后权益立即生效吗？">
          <text class="uv-collapse-content">
            是的，成功升级后所有VIP权益将立即生效，部分需要人工配置的服务最迟在2小时内完成开通。
          </text>
        </uv-collapse-item>
        <uv-collapse-item :clickable="false" title="可以取消订阅吗？">
          <text class="uv-collapse-content">
            你购买的是永久会员权益，在交易成功后的一年内（支付平台支持的最长时间），可以申请无条件退款。
          </text>
        </uv-collapse-item>
      </uv-collapse>
    </div>
    <!-- 问题项 -->
    <!-- <div class="mt-6 space-y-3">
      <details class="group border border-gray-100 rounded-lg bg-white shadow-sm">
        <summary class="flex cursor-pointer items-center justify-between p-4">
          <span class="text-gray-700 font-medium">什么是永久会员？</span>
          <svg class="h-5 w-5 transform text-red transition-transform group-open:rotate-180" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div class="border-t border-gray-100 px-4 pb-4 pt-2 text-gray-600">
          <p>支持用户永久使用，且支持全版本免费升级。</p>
        </div>
      </details>
      <details class="group border border-gray-100 rounded-lg bg-white shadow-sm">
        <summary class="flex cursor-pointer items-center justify-between p-4">
          <span class="text-gray-700 font-medium">升级VIP后权益立即生效吗？</span>
          <svg class="h-5 w-5 transform text-red transition-transform group-open:rotate-180" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div class="border-t border-gray-100 px-4 pb-4 pt-2 text-gray-600">
          <p>是的，成功升级后所有VIP权益将立即生效，部分需要人工配置的服务最迟在2小时内完成开通。</p>
        </div>
      </details>
      <details class="group border border-gray-100 rounded-lg bg-white shadow-sm">
        <summary class="flex cursor-pointer items-center justify-between p-4">
          <span class="text-gray-700 font-medium">可以取消订阅吗？</span>
          <svg class="h-5 w-5 transform text-red transition-transform group-open:rotate-180" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div class="border-t border-gray-100 px-4 pb-4 pt-2 text-gray-600">
          <p>你购买的是永久会员权益，在交易成功后的一年内（支付平台支持的最长时间），可以申请无条件退款。</p>
        </div>
      </details>
    </div> -->
  </div>
</template>

<style lang="scss" scoped></style>
