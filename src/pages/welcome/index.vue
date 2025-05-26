<script setup lang="ts">
const showBtn = ref(false)
const loading = ref(false)
const onStart = async () => {
  try {
    const { login, setupApp } = useAuthStore()
    loading.value = true
    await login()
    await setupApp()
    uni.navigateBack()
  }
  catch (error) {
    console.error(error)
    uni.redirectTo({
      url: `/pages/exception/500?error=${error}`,
    })
  }
  finally {
    loading.value = false
  }
}

onLoad(() => {
  setTimeout(() => {
    showBtn.value = true
  }, 1500)
})
</script>

<template>
  <div class="bg-[url('https://liji.poetic.ltd/oss/assets/bg/bg_about.webp')] bg-contain bg-no-repeat">
    <safe-area-inset-top />
    <div class="mx-10">
      <wd-transition name="zoom-in" :duration="2000" show>
        <div class="w-20 pt-12 text-center">
          <img class="h-20 w-20" src="/static/logo.png">
          <div class="mt-5 text-xl font-bold">
            礼记
          </div>
        </div>
        <div class="py-12 leading-loose">
          指尖的轻触
          <br>
          系住年轮诗意的轨迹
          <br>
          云端织就人情的绸缎
          <br>
          让礼记替我们留下爱的份量
        </div>
      </wd-transition>

      <wd-transition name="fade-up" duration="2000" :show="showBtn">
        <div class="mt-8 min-w-24">
          <wd-button :loading="loading" @click="onStart">
            开始礼记
          </wd-button>
        </div>
      </wd-transition>
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
