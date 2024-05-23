<script setup>
import { useUserStore } from '~/stores/user'

const disabled = ref(false)
const btnText = ref('重试')
const codeRef = ref(null)

function codeChange(text) {
  btnText.value = text
}

async function onRetry() {
  uni.showLoading({
    title: '正在重新连接...',
  })

  setTimeout(async () => {
    const userStore = useUserStore()
    try {
      await userStore.getUserInfo()
      router.push({
        path: '/pages/book/index',
        tabBar: true,
      })
    }
    catch (error) {
      console.log('mpserverless error :>>', error)
      uni.hideLoading()
      codeRef.value.start()
    }
  }, 1500)
}
</script>

<template>
  <div class="mt-auto flex flex-col items-center text-gray">
    <div class="i-iconoir-wifi-error text-12" />
    <div class="mt-8 text-sm">
      网络连接断开，请检查网络哦~
    </div>
    <div class="mt-8 min-w-24">
      <uv-code
        ref="codeRef" :seconds="3" start-text="重试" change-text="X秒后再试" end-text="重试" @change="codeChange"
        @start="disabled = true" @end="disabled = false"
      />
      <uv-button type="primary" shape="circle" :text="btnText" :disabled="disabled" @click="onRetry" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationStyle": "custom"
  }
}
</route>
