<script setup lang="ts">

</script>

<template>
  <div class="w-full">
    <div class="mb-6 text-center text-xl text-gray-800 font-bold">
      方案对比
    </div>

    <!-- 对比表格 -->
    <div class="rounded-lg bg-white shadow">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-gray-500 font-medium">
              会员权益
            </th>
            <th class="px-4 py-3 text-gray-500 font-medium">
              普通用户
            </th>
            <th class="px-4 py-3 text-amber font-medium">
              VIP
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- 权益项 -->
          <tr class="border-t border-gray-100">
            <td class="px-4 py-3 text-gray-600">
              家人共享
            </td>
            <td class="px-4 py-3 text-center text-sm text-gray-500">
              2 人
            </td>
            <td class="px-4 py-3 text-center text-amber font-medium">
              不限人数
            </td>
          </tr>
          <tr class="border-t border-gray-100">
            <td class="px-4 py-3 text-gray-600">
              定制服务
            </td>
            <td class="px-4 py-3 text-center">
              <svg class="mx-auto h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </td>
            <td class="px-4 py-3 text-center">
              <svg class="mx-auto h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </td>
          </tr>
          <tr class="border-t border-gray-100">
            <td class="px-4 py-3 text-gray-600">
              优先响应
            </td>
            <td class="px-4 py-3 text-center text-sm text-gray-500">
              普通通道
            </td>
            <td class="px-4 py-3 text-center text-amber font-medium">
              VIP通道
            </td>
          </tr>
          <tr class="border-t border-gray-100">
            <td class="px-4 py-3 text-gray-600">
              数据导出
            </td>
            <td class="px-4 py-3 text-center text-gray-500">
              每月3次
            </td>
            <td class="px-4 py-3 text-center text-amber font-medium">
              无限制
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 常见问题 -->
    <div class="mb-6 mt-6 text-center text-xl text-gray-800 font-bold">
      常见问题
    </div>
    <div class="mt-2 text-sm text-gray">
      我们列举了一些你可能关注的话题。如果没能找你想要的信息，可以联系在线客服获取更多支持。
    </div>
    <!-- 问题项 -->
    <div class="mt-6 space-y-3">
      <!-- 问题1 -->
      <details class="group border border-gray-100 rounded-lg bg-white shadow-sm">
        <summary class="flex cursor-pointer items-center justify-between p-4">
          <span class="text-gray-700 font-medium">什么是永久会员？</span>
          <svg class="h-5 w-5 transform text-red transition-transform group-open:rotate-180"
               fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div class="border-t border-gray-100 px-4 pb-4 pt-2 text-gray-600">
          <p>支持用户永久使用，且支持全版本免费升级。</p>
        </div>
      </details>

      <!-- 问题2 -->
      <details class="group border border-gray-100 rounded-lg bg-white shadow-sm">
        <summary class="flex cursor-pointer items-center justify-between p-4">
          <span class="text-gray-700 font-medium">升级VIP后权益立即生效吗？</span>
          <svg class="h-5 w-5 transform text-red transition-transform group-open:rotate-180"
               fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div class="border-t border-gray-100 px-4 pb-4 pt-2 text-gray-600">
          <p>是的，成功升级后所有VIP权益将立即生效，部分需要人工配置的服务最迟在2小时内完成开通。</p>
        </div>
      </details>

      <!-- 问题3 -->
      <details class="group border border-gray-100 rounded-lg bg-white shadow-sm">
        <summary class="flex cursor-pointer items-center justify-between p-4">
          <span class="text-gray-700 font-medium">可以取消订阅吗？</span>
          <svg class="h-5 w-5 transform text-red transition-transform group-open:rotate-180"
               fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div class="border-t border-gray-100 px-4 pb-4 pt-2 text-gray-600">
          <p>你购买的是永久会员权益，在交易成功后的一年内（支付平台支持的最长时间），可以申请无条件退款。</p>
        </div>
      </details>

      <!-- 问题4 -->
      <!-- <details class="group border border-gray-100 rounded-lg bg-white shadow-sm">
          <summary class="flex cursor-pointer items-center justify-between p-4">
            <span class="text-gray-700 font-medium">如何联系VIP专属客服？</span>
            <svg class="h-5 w-5 transform text-purple-600 transition-transform group-open:rotate-180"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div class="border-t border-gray-100 px-4 pb-4 pt-2 text-gray-600">
            <p>开通后可在个人中心找到24小时在线客服入口，或拨打专属服务热线 400-123-4567</p>
          </div>
        </details> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
