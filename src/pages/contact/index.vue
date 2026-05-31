<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '联系开发者',
  },
})

const qrCodeUrl = 'https://liji.poetic.ltd/oss/assets/contact/wechat.jpg'

function previewImage(url: string) {
  uni.previewImage({
    urls: [url],
  })
}
</script>

<template>
  <div class="contact-page min-h-full overflow-hidden px-4 pb-8 pt-4">
    <div class="hero-card">
      <div>
        <div class="hero-kicker">
          联系与反馈
        </div>
        <div class="mt-3 text-2xl text-[#2f2623] font-bold">
          有建议，欢迎来聊
        </div>
        <div class="mt-2 text-sm text-[#7a6a61] leading-6">
          使用中遇到的任何问题，或您认为可以改进之处，都欢迎向开发者提出。
        </div>
      </div>
      <div class="hero-icon">
        <div class="i-hugeicons-customer-service text-8" />
      </div>
    </div>

    <div class="qr-card mt-5">
      <div class="text-center">
        <div class="text-lg text-[#2f2623] font-semibold">
          联系开发者
        </div>
        <div class="mt-2 text-xs text-[#9ca3af]">
          长按识别或截图后扫码联系
        </div>
      </div>

      <div class="qr-frame">
        <image v-if="qrCodeUrl" class="h-full w-full" :src="qrCodeUrl" mode="aspectFit" @click="previewImage(qrCodeUrl)" />
        <div v-else class="qr-placeholder">
          <div class="placeholder-icon">
            <div class="i-hugeicons-qr-code text-9" />
          </div>
          <div class="mt-4 text-base text-[#6b7280] font-medium">
            微信二维码区域
          </div>
          <div class="mt-2 text-xs text-[#9ca3af]">
            这里会展示你的联系二维码
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 mt-4 gap-2">
      <div class="support-card">
        <div class="support-icon tone-rose">
          <div class="i-hugeicons-bug-02 text-5" />
        </div>
        <div class="support-title">
          问题反馈
        </div>
      </div>
      <div class="support-card">
        <div class="support-icon tone-emerald">
          <div class="i-hugeicons-bulb text-5" />
        </div>
        <div class="support-title">
          功能建议
        </div>
      </div>
      <div class="support-card">
        <div class="support-icon tone-sky">
          <div class="i-hugeicons-message-question text-5" />
        </div>
        <div class="support-title">
          使用咨询
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-card {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  min-height: 268rpx;
  padding: 40rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.86);
  border-radius: 36rpx;
  background: linear-gradient(135deg, rgba(255, 247, 247, 0.95), rgba(255, 255, 255, 0.9) 52%, rgba(236, 254, 255, 0.92));
  box-shadow: 0 18rpx 44rpx rgba(127, 29, 29, 0.08);
}

.hero-card::after {
  content: '';
  position: absolute;
  right: -62rpx;
  bottom: -86rpx;
  width: 220rpx;
  height: 220rpx;
  border-radius: 999rpx;
  background: rgba(248, 113, 113, 0.12);
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  padding: 8rpx 18rpx;
  border-radius: 999rpx;
  color: #ef4444;
  background: rgba(255, 255, 255, 0.78);
  font-size: 22rpx;
  font-weight: 600;
}

.hero-icon {
  position: relative;
  z-index: 1;
  width: 112rpx;
  height: 112rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32rpx;
  color: #ef4444;
  background: #fff;
  box-shadow: 0 14rpx 30rpx rgba(248, 113, 113, 0.18);
}

.qr-card {
  padding: 36rpx 28rpx 28rpx;
  border-radius: 36rpx;
  background: #fff;
  box-shadow: 0 12rpx 34rpx rgba(15, 23, 42, 0.06);
}

.qr-frame {
  width: 420rpx;
  height: 420rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 36rpx auto 0;
  padding: 22rpx;
  border: 2rpx dashed #fecaca;
  border-radius: 36rpx;
  background: linear-gradient(145deg, #fff7f7, #ffffff 52%, #f8fafc);
}

.qr-placeholder {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 28rpx;
  background: rgba(255, 255, 255, 0.72);
  text-align: center;
}

.placeholder-icon {
  width: 104rpx;
  height: 104rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30rpx;
  color: #ef4444;
  background: #fff1f2;
}

.support-card {
  min-width: 0;
  min-height: 148rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 28rpx;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8rpx 22rpx rgba(15, 23, 42, 0.04);
}

.support-icon {
  width: 58rpx;
  height: 58rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18rpx;
}

.support-title {
  margin-top: 14rpx;
  color: #374151;
  font-size: 24rpx;
  font-weight: 500;
  line-height: 1.2;
}

.tone-rose {
  color: #df5b57;
  background-color: #fff1ef;
}

.tone-emerald {
  color: #18a47f;
  background-color: #ecfdf7;
}

.tone-sky {
  color: #2d8edb;
  background-color: #eef7ff;
}
</style>
