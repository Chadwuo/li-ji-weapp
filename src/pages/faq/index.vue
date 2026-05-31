<script setup lang="ts">
definePage({
  layout: false,
  style: {
    navigationBarTitleText: '常见问题',
  },
})

interface FaqItem {
  title: string
  content: string
  icon: string
  tone: string
  link?: {
    text: string
    href: string
  }
}

const faqList: FaqItem[] = [
  {
    title: '礼记 是什么？',
    content: '礼记专注于记录和管理人情往来中的随礼、收礼、份子钱、礼金、心意、礼物、红包等，支持多维度查询和统计亲友间的往来记录，也可以和家人共享记账。',
    icon: 'i-hugeicons-notebook-01',
    tone: 'tone-rose',
  },
  {
    title: '礼记 免费吗？',
    content: '完全免费，并承诺永远免费。',
    icon: 'i-hugeicons-gift',
    tone: 'tone-emerald',
  },
  {
    title: '谁在维护 礼记？',
    content: '礼记是一个独立的开源社区驱动项目，由开发者共同参与项目讨论、开发和代码审查。',
    icon: 'i-hugeicons-user-group',
    tone: 'tone-sky',
  },
  {
    title: '礼记 可靠吗？',
    content: '礼记从 2021 年 11 月写下第一行代码至今，经历了 600+ 次代码提交、60+ 个拉取请求、40+ 个版本迭代，累计为 5w+ 用户提供稳定服务。',
    icon: 'i-hugeicons-shield-01',
    tone: 'tone-indigo',
  },
  {
    title: '为什么选择 礼记？',
    content: '礼记是一个开源项目，更多开发者和用户可以参与改进和优化。公开透明的开发方式也让潜在问题更容易被发现和修复。',
    icon: 'i-hugeicons-thumbs-up',
    tone: 'tone-amber',
  },
  {
    title: '我可以参与 礼记 项目吗？',
    content: '非常欢迎！你可以访问我们的开源社区页面，参与项目的开发、讨论和设计。',
    icon: 'i-hugeicons-github',
    tone: 'tone-slate',
    link: {
      text: '访问开源社区',
      href: 'https://github.com/Chadwuo/li-ji-weapp',
    },
  },
]

const activeFaqIndex = ref<number>()

function toggleFaq(index: number) {
  activeFaqIndex.value = activeFaqIndex.value === index ? undefined : index
}

function goContact() {
  uni.navigateTo({
    url: '/pages/contact/index',
  })
}
</script>

<template>
  <div class="faq-page min-h-full overflow-hidden pb-28">
    <div class="px-4 pb-5 pt-4">
      <div class="hero-card">
        <div>
          <div class="hero-kicker">
            帮助中心
          </div>
          <div class="mt-3 text-2xl text-[#2f2623] font-bold">
            有疑问，先看这里
          </div>
          <div class="mt-2 pr-8 text-sm text-[#7a6a61] leading-6">
            关于免费、开源、可靠性和项目参与方式，这里整理了最常被问到的答案。
          </div>
        </div>

        <div class="hero-icon">
          <div class="i-hugeicons-bubble-chat-question text-8" />
        </div>
      </div>

      <div class="grid grid-cols-3 mt-4 gap-2">
        <div class="metric-card">
          <div class="metric-value">
            免费
          </div>
          <div class="metric-label">
            永久使用
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-value">
            5w+
          </div>
          <div class="metric-label">
            服务用户
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-value">
            GPL-3.0
          </div>
          <div class="metric-label">
            开源协议
          </div>
        </div>
      </div>

      <div class="mt-5 flex items-center justify-between px-1">
        <div class="text-base text-[#2f2623] font-semibold">
          问题列表
        </div>
        <div class="text-xs text-[#9ca3af]">
          点击展开
        </div>
      </div>

      <div class="faq-card mt-3">
        <div class="faq-list">
          <div
            v-for="(item, index) in faqList"
            :key="item.title"
            class="faq-item"
            :class="{ 'faq-item--active': activeFaqIndex === index }"
          >
            <div class="faq-question" hover-class="faq-question--hover" @click="toggleFaq(index)">
              <div class="question-icon" :class="item.tone">
                <div class="text-5" :class="item.icon" />
              </div>
              <div class="min-w-0 flex-1">
                <div class="faq-title">
                  {{ item.title }}
                </div>
              </div>
              <div class="faq-arrow i-carbon-chevron-down" />
            </div>

            <div v-if="activeFaqIndex === index" class="faq-answer-wrap">
              <div class="faq-answer">
                <div class="text-sm text-[#4b5563] leading-7">
                  {{ item.content }}
                </div>
                <div v-if="item.link" class="mt-3">
                  <uv-link color="#ef4444" :href="item.link.href" :text="item.link.text" :under-line="false" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="contact-bar fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3">
      <div class="contact-card">
        <div class="min-w-0 flex-1">
          <div class="text-sm text-[#2f2623] font-semibold">
            没找到想问的？
          </div>
          <div class="mt-1 text-xs text-[#9ca3af]">
            遇到问题、想提建议、反馈错误
          </div>
        </div>
        <!-- <wd-button open-type="contact" icon="service" round>在线客服</wd-button> -->
        <wd-button icon="service" round @click="goContact">
          联系我们
        </wd-button>
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

.metric-card {
  min-width: 0;
  padding: 22rpx 12rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.78);
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.86);
  text-align: center;
  box-shadow: 0 8rpx 22rpx rgba(15, 23, 42, 0.04);
}

.metric-value {
  color: #2f2623;
  font-size: 30rpx;
  font-weight: 700;
  line-height: 1.2;
}

.metric-label {
  margin-top: 8rpx;
  color: #9ca3af;
  font-size: 22rpx;
  line-height: 1.2;
}

.faq-card {
  overflow: hidden;
  padding: 10rpx;
  border-radius: 32rpx;
  background: #fff;
  box-shadow: 0 10rpx 30rpx rgba(15, 23, 42, 0.05);
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.faq-item {
  overflow: hidden;
  border-radius: 24rpx;
  transition: background-color 0.18s ease;
}

.faq-item--active {
  background: #f8fafc;
}

.faq-question {
  min-height: 92rpx;
  display: flex;
  align-items: center;
  gap: 18rpx;
  padding: 22rpx;
  border-radius: 24rpx;
}

.faq-question--hover {
  background: #f8fafc;
}

.question-icon {
  width: 58rpx;
  height: 58rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18rpx;
}

.faq-title {
  color: #1f2937;
  font-size: 29rpx;
  font-weight: 600;
  line-height: 1.45;
}

.faq-arrow {
  flex-shrink: 0;
  color: #c4a39d;
  font-size: 30rpx;
  transition: transform 0.18s ease;
}

.faq-item--active .faq-arrow {
  transform: rotate(180deg);
}

.faq-answer-wrap {
  padding: 0 22rpx 22rpx 22rpx;
  animation: answer-in 0.18s ease;
}

.faq-answer {
  padding: 20rpx;
  border-radius: 24rpx;
  background: #fff;
  box-shadow: inset 0 0 0 1rpx rgba(226, 232, 240, 0.72);
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

.tone-indigo {
  color: #5b6fd6;
  background-color: #f0f3ff;
}

.tone-amber {
  color: #c27a18;
  background-color: #fff7e8;
}

.tone-slate {
  color: #64748b;
  background-color: #f3f6f9;
}

.contact-bar {
  background: linear-gradient(180deg, rgba(239, 239, 239, 0), #efefef 28%);
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding: 20rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.82);
  border-radius: 30rpx;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 12rpx 34rpx rgba(15, 23, 42, 0.08);
}

@keyframes answer-in {
  from {
    opacity: 0;
    transform: translateY(-6rpx);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
