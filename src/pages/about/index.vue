<script setup lang="ts">
definePage({
  style: {
    navigationStyle: 'custom',
  },
})

const version = ref('5.0.0')
// #ifdef MP-WEIXIN
version.value = uni.getAccountInfoSync().miniProgram.version
// #endif
const handleClickLeft = () => {
  uni.navigateBack()
}

interface ContactItem {
  title: string
  copyText: string
}

const contactItems: ContactItem[] = [
  {
    title: '微信号',
    copyText: 'Chadwuo',
  },
  {
    title: '小红书',
    copyText: '63865490825',
  },
  {
    title: '抖音',
    copyText: 'Chadwuo',
  },
  {
    title: 'GitHub',
    copyText: 'https://github.com/Chadwuo/li-ji-weapp',
  },
]

function copyContact(item: ContactItem) {
  if (!item.copyText) {
    uni.showToast({
      title: `${item.title}待补充`,
      icon: 'none',
    })
    return
  }

  uni.setClipboardData({
    data: item.copyText,
    success: () => {
      uni.showToast({
        title: `${item.title}已复制`,
        icon: 'success',
      })
    },
  })
}
</script>

<template>
  <div class="about-page min-h-full overflow-hidden bg-contain bg-no-repeat">
    <safe-area-inset-top />
    <wd-navbar left-arrow custom-style="background-color: transparent !important;" @click-left="handleClickLeft" />
    <div class="mx-10">
      <div class="w-20 pt-12 text-center">
        <img class="h-20 w-20 drop-shadow-[0_12px_24px_rgba(248,113,113,0.16)]" src="/static/logo.png">
        <div class="mt-5 text-xl text-[#1f2937] font-bold">
          礼记
        </div>
        <div class="mt-2 text-xs text-[#6b7280]">
          当前版本 {{ version }}
        </div>
      </div>
      <div class="pt-12 text-[#374151] leading-loose">
        指尖的轻触
        <br>
        系住年轮诗意的轨迹
        <br>
        云端织就人情的绸缎
        <br>
        让礼记替我们留下爱的份量
      </div>

      <div class="about-footer mt-auto">
        <div class="footer-links">
          <template v-for="(item, index) in contactItems" :key="item.title">
            <button class="reset-button footer-link" :class="{ 'footer-link--disabled': !item.copyText }" @click="copyContact(item)">
              {{ item.title }}
            </button>
            <span v-if="index < contactItems.length - 1" class="footer-separator">|</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-page {
  background:
    linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, #efefef 100%) top / 100% 38vh no-repeat,
    radial-gradient(circle at 84% 0%, rgba(45, 212, 191, 0.14), transparent 35%) top / 100% 33vh no-repeat,
    radial-gradient(circle at 10% 8%, rgba(248, 113, 113, 0.22), transparent 34%) top / 100% 33vh no-repeat,
    linear-gradient(150deg, #fff5f5 0%, #ffffff 52%, #ecfeff 100%) top / 100% 33vh no-repeat,
    #efefef;
}

.about-footer {
  margin-top: 96rpx;
  padding-bottom: 64rpx;
  text-align: center;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
}

.footer-link {
  color: #6b7280;
  font-size: 24rpx;
  line-height: 1.4;
}

.footer-link--disabled {
  color: #9ca3af;
}

.footer-separator {
  color: #d1d5db;
  font-size: 22rpx;
  line-height: 1.4;
}
</style>
