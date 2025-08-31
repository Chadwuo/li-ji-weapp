<script setup lang="ts">
import { useMessage } from 'wot-design-uni'
import { apiUserDelete } from '@/api/modules/user'

const message = useMessage()
const loading = ref(false)

const onConfirmDelete = async () => {
  try {
    loading.value = true
    await apiUserDelete()

    // #ifdef H5
    uni.clearStorageSync()
    // 跳转到登录页面
    uni.redirectTo({
      url: '/pages/login/index',
    })
    // #endif

    // #ifdef MP-WEIXIN
    // 跳转到登录页面
    wx.exitMiniProgram()
    // #endif
  }
  finally {
    loading.value = false
  }
}

const showDeleteConfirm = () => {
  message.confirm({
    title: '确认注销账号',
    msg: '账号注销后，您的所有数据将被永久删除，且无法恢复。\n\n确定要继续注销账号吗？',
    confirmButtonText: '确认注销',
    cancelButtonText: '我再想想',
  }).then(() => {
    onConfirmDelete()
  }).catch(() => {
    // 用户取消注销
  })
}
</script>

<template>
  <div class="mx-3 mt-5">
    <!-- 风险提示 -->
    <div class="mb-6 rounded-2xl bg-red-50 p-3">
      <div class="text-center text-lg text-red-700 font-semibold">
        你正在申请注销账号
      </div>
      <div class="mt-2 text-center text-red-600">
        账号注销是不可恢复的操作，请您谨慎操作！
      </div>
    </div>

    <!-- 注销说明 -->
    <div class="p-5 space-y-4">
      <div class="space-y-2">
        <h3 class="text-base text-gray-800 font-medium">
          注销后将会发生什么？
        </h3>
        <div class="ml-2">
          <div class="mb-2 block text-[14.5px] text-[#515154]">
            <span class="mr-2 inline-block text-red font-bold">•</span>
            <span>您的个人信息、礼簿数据、亲友关系等所有数据将被永久删除且无法恢复</span>
          </div>
          <div class="mb-2 block pl-0 text-[14.5px] text-[#515154]">
            <span class="mr-2 inline-block text-red font-bold">•</span>
            <span>您将无法使用该账号再次登录礼记应用</span>
          </div>
          <div class="mb-2 block pl-0 text-[14.5px] text-[#515154]">
            <span class="mr-2 inline-block text-red font-bold">•</span>
            <span>您将失去所有已购买的会员权益</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 注销条件 -->
    <div class="p-5 space-y-4">
      <div class="space-y-2">
        <h3 class="text-base text-gray-800 font-medium">
          注销前请确认
        </h3>
        <div class="ml-2">
          <div class="mb-2 block text-sm text-[#515154]">
            <span class="mr-2 inline-block text-red font-bold">•</span>
            <span>您已备份导出所有重要数据</span>
          </div>
          <div class="mb-2 block pl-0 text-sm text-[#515154]">
            <span class="mr-2 inline-block text-red font-bold">•</span>
            <span>您清楚了解注销后果并自愿注销</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="p-5 space-y-3">
      <wd-button block size="large" :loading="loading" @click="showDeleteConfirm">
        确认注销账号
      </wd-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "账号注销"
  }
}
</route>
