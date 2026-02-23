<script setup lang="ts">
import { useCaptcha } from 'alova/client'

definePage({
  layout: false,
  style: {
    navigationStyle: 'custom',
  },
})

const loading = ref(false)
const loginEmailInput = ref({
  email: '',
  password: '',
})
const signupEmailInput = ref({
  email: '',
  password: '',
  code: '',
})
const tab = ref('login')

const {
  loading: sending,
  countdown,
  send: sendCaptcha,
} = useCaptcha(() => apiEmailSendVerifyEmailPost({ email: signupEmailInput.value.email }))

const onLogin = async () => {
  try {
    loading.value = true
    await apiAuthLoginEmailPost(loginEmailInput.value)
    const authStore = useAuthStore()
    authStore.userInfo = await apiAuthUserInfoGet()
    authStore.userFamilys = await apiUserFamilyListGet()
    authStore.friendTags = await apiFriendTagListGet()
    uni.showToast({
      title: '登录成功',
      icon: 'success',
    })
    // 跳转到首页或其他页面
    uni.switchTab({
      url: '/pages/index/index',
    })
  }
  finally {
    loading.value = false
  }
}

const onSignup = async () => {
  try {
    loading.value = true
    await apiAuthSignupEmailPost(signupEmailInput.value)
    loginEmailInput.value.email = signupEmailInput.value.email
    loginEmailInput.value.password = signupEmailInput.value.password
    onLogin()
  }
  finally {
    loading.value = false
  }
}

const sendVerifyEmail = async () => {
  if (!signupEmailInput.value.email) {
    uni.showToast({
      title: '请输入邮箱',
      icon: 'none',
    })
    return
  }
  // 判断邮箱格式
  const emailRegex = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
  if (!emailRegex.test(signupEmailInput.value.email)) {
    uni.showToast({
      title: '请输入正确的邮箱格式',
      icon: 'none',
    })
    return
  }

  sendCaptcha()
}
</script>

<template>
  <div
    class="relative m-0 min-h-screen flex items-center justify-center overflow-hidden from-[#dbeafe] via-[#fce7f3] to-[#ede9fe] bg-gradient-to-br px-5"
  >
    <!-- 背景装饰元素 -->
    <div
      class="animate-float absolute left-[10%] top-[10%] h-[350px] w-[350px] rounded-full bg-[#fb7185]/50 filter-blur-80"
    />
    <div
      class="animate-float animation-delay-3000 absolute bottom-[10%] right-[10%] h-[450px] w-[450px] rounded-full bg-[#67e8f9]/50 filter-blur-80"
    />
    <div
      class="animate-float animation-delay-6000 absolute right-[15%] top-[20%] h-[280px] w-[280px] rounded-full bg-[#c4b5fd]/50 filter-blur-80"
    />
    <div
      class="animate-float animation-delay-9000 absolute bottom-[30%] left-[20%] h-[200px] w-[200px] rounded-full bg-[#fcd34d]/35 filter-blur-80"
    />

    <!-- 登录卡片容器 -->
    <div
      class="liquid-glass animate-fadeIn relative z-10 max-w-[420px] w-full overflow-hidden rounded-[32px] p-8"
    >
      <!-- 标题区域 -->
      <div class="mb-10 text-center">
        <img class="mb-5 h-16 w-16 drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)]" src="/static/logo.png">
        <h1 class="mb-2 text-3xl text-[#1e293b]/85 font-bold tracking-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]">
          礼记
        </h1>
        <p class="text-base text-[#475569]/70">
          每一份人情都值得礼记
        </p>
      </div>

      <!-- 登录表单 -->
      <div v-if="tab === 'login'" class="space-y-4">
        <!-- 邮箱/用户名 -->
        <div>
          <label class="mb-2 block pl-2 text-sm text-[#475569]/80 font-medium">邮箱</label>
          <div class="group flex items-center">
            <i
              class="i-hugeicons-user absolute left-12 text-lg text-[#94a3b8]/70 transition-all duration-400 group-focus-within:text-[#f87171]"
            />
            <input v-model="loginEmailInput.email" type="text" placeholder="邮箱账号"
                   class="glass-input w-full border border-white/50 rounded-2xl bg-white/30 py-[8px] pl-12 pr-5 text-base text-[#1e293b]/80 backdrop-blur-12 transition-all duration-400 group-focus-within:border-white/70 group-focus-within:bg-white/45 group-focus-within:shadow-[0_0_0_3px_rgba(248,113,113,0.12),inset_0_1px_2px_rgba(255,255,255,0.4)] group-focus-within:outline-none placeholder-[#94a3b8]/60"
            >
          </div>
        </div>

        <!-- 密码 -->
        <div>
          <label class="mb-2 block pl-2 text-sm text-[#475569]/80 font-medium">密码</label>
          <div class="group flex items-center">
            <i
              class="i-hugeicons-circle-password absolute left-12 text-lg text-[#94a3b8]/70 transition-all duration-400 group-focus-within:text-[#f87171]"
            />
            <input v-model="loginEmailInput.password" password placeholder="登录密码"
                   class="glass-input w-full border border-white/50 rounded-2xl bg-white/30 py-[8px] pl-12 pr-5 text-base text-[#1e293b]/80 backdrop-blur-12 transition-all duration-400 group-focus-within:border-white/70 group-focus-within:bg-white/45 group-focus-within:shadow-[0_0_0_3px_rgba(248,113,113,0.12),inset_0_1px_2px_rgba(255,255,255,0.4)] group-focus-within:outline-none placeholder-[#94a3b8]/60"
            >
          </div>
        </div>

        <!-- 登录按钮 -->
        <div class="pt-2">
          <wd-button block :loading="loading" custom-class="glass-button" @click="onLogin">
            登 录
          </wd-button>
        </div>
      </div>

      <!-- 注册表单 -->
      <div v-if="tab === 'signup'" class="space-y-4">
        <!-- 邮箱/用户名 -->
        <div>
          <label class="mb-2 block pl-2 text-sm text-[#475569]/80 font-medium">邮箱</label>
          <div class="group flex items-center">
            <i
              class="i-hugeicons-user absolute left-12 text-lg text-[#94a3b8]/70 transition-all duration-400 group-focus-within:text-[#f87171]"
            />
            <input v-model="signupEmailInput.email" type="text" placeholder="邮箱账号"
                   class="glass-input w-full border border-white/50 rounded-2xl bg-white/30 py-[8px] pl-12 pr-5 text-base text-[#1e293b]/80 backdrop-blur-12 transition-all duration-400 group-focus-within:border-white/70 group-focus-within:bg-white/45 group-focus-within:shadow-[0_0_0_3px_rgba(248,113,113,0.12),inset_0_1px_2px_rgba(255,255,255,0.4)] group-focus-within:outline-none placeholder-[#94a3b8]/60"
            >
          </div>
        </div>

        <!-- 验证码 -->
        <div>
          <label class="mb-2 block pl-2 text-sm text-[#475569]/80 font-medium">验证码</label>
          <div class="group flex items-center">
            <i
              class="i-hugeicons-sms-code absolute left-12 text-lg text-[#94a3b8]/70 transition-all duration-400 group-focus-within:text-[#f87171]"
            />
            <input v-model="signupEmailInput.code" type="number" placeholder="验证码" :maxlength="6"
                   class="glass-input mr-3 w-full border border-white/50 rounded-2xl bg-white/30 py-[8px] pl-12 pr-5 text-base text-[#1e293b]/80 backdrop-blur-12 transition-all duration-400 group-focus-within:border-white/70 group-focus-within:bg-white/45 group-focus-within:shadow-[0_0_0_3px_rgba(248,113,113,0.12),inset_0_1px_2px_rgba(255,255,255,0.4)] group-focus-within:outline-none placeholder-[#94a3b8]/60"
            >
            <div class="glass-send-btn flex-shrink-0 border border-white/40 rounded-2xl bg-[#f87171]/75 p-[8px] text-4 text-white backdrop-blur-8 transition-all duration-300" :loading="sending" :disabled="sending || countdown > 0" @click="sendVerifyEmail">
              {{ loading ? '发送中...' : countdown > 0 ? `${countdown}后可重发` : '发送验证码' }}
            </div>
          </div>
        </div>

        <!-- 密码 -->
        <div>
          <label class="mb-2 block pl-2 text-sm text-[#475569]/80 font-medium">密码</label>
          <div class="group flex items-center">
            <i
              class="i-hugeicons-circle-password absolute left-12 text-lg text-[#94a3b8]/70 transition-all duration-400 group-focus-within:text-[#f87171]"
            />
            <input v-model="signupEmailInput.password" password placeholder="登录密码"
                   class="glass-input w-full border border-white/50 rounded-2xl bg-white/30 py-[8px] pl-12 pr-5 text-base text-[#1e293b]/80 backdrop-blur-12 transition-all duration-400 group-focus-within:border-white/70 group-focus-within:bg-white/45 group-focus-within:shadow-[0_0_0_3px_rgba(248,113,113,0.12),inset_0_1px_2px_rgba(255,255,255,0.4)] group-focus-within:outline-none placeholder-[#94a3b8]/60"
            >
          </div>
        </div>

        <!-- 登录按钮 -->
        <div class="pt-2">
          <wd-button block :loading="loading" custom-class="glass-button" @click="onSignup">
            注 册
          </wd-button>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="mt-8 flex items-center text-sm text-[#64748b]/70">
        <div class="h-px flex-1 from-transparent via-white/50 to-transparent bg-gradient-to-r" />
        <!-- <span class="px-4">或使用其他方式登录</span> -->
        <span v-if="tab === 'login'" class="px-4">没有账号？<span class="cursor-pointer text-[#f87171]/85 font-medium"
                                                             @click="tab = 'signup'"
        >去注册</span></span>
        <span v-else class="px-4">已有账号？<span class="cursor-pointer text-[#f87171]/85 font-medium"
                                             @click="tab = 'login'"
        >去登录</span></span>
        <div class="h-px flex-1 from-transparent via-white/50 to-transparent bg-gradient-to-r" />
      </div>

      <!-- 第三方登录 -->
      <!-- <div class="flex justify-center gap-6">
        <div class="h-12 w-12 flex cursor-pointer items-center justify-center border border-white/40 rounded-full bg-white/25 text-xl text-[#64748b]/70 backdrop-blur-10 transition-all duration-400 hover:bg-white/40 hover:text-green hover:-translate-y-1.5">
          <i class="i-hugeicons-wechat" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* iOS 26 液态玻璃效果 */

/* 液态玻璃卡片 */
.liquid-glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0.2) 40%,
    rgba(255, 255, 255, 0.35) 100%
  );
  backdrop-filter: blur(40px) saturate(1.8);
  -webkit-backdrop-filter: blur(40px) saturate(1.8);
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 1px 0 rgba(255, 255, 255, 0.6) inset,
    0 -1px 0 rgba(255, 255, 255, 0.15) inset,
    0 0 0 0.5px rgba(255, 255, 255, 0.3) inset;
}

/* 玻璃输入框内光影 */
.glass-input {
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.02),
    inset 0 1px 2px rgba(255, 255, 255, 0.5),
    inset 0 -1px 1px rgba(0, 0, 0, 0.02);
}

/* 玻璃发送按钮 */
.glass-send-btn {
  box-shadow:
    0 2px 10px rgba(248, 113, 113, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.3);
}

/* 玻璃按钮覆盖 */
:deep(.glass-button) {
  backdrop-filter: blur(12px) saturate(1.5) !important;
  -webkit-backdrop-filter: blur(12px) saturate(1.5) !important;
  box-shadow:
    0 4px 16px rgba(248, 113, 113, 0.25),
    inset 0 1px 1px rgba(255, 255, 255, 0.3) !important;
}

/* 自定义动画 */
@keyframes float {
  0% {
    transform: translate(0, 0) scale(1) rotate(0deg);
  }

  25% {
    transform: translate(80px, -120px) scale(1.05) rotate(3deg);
  }

  50% {
    transform: translate(-60px, 60px) scale(0.95) rotate(-2deg);
  }

  75% {
    transform: translate(40px, -40px) scale(1.02) rotate(1deg);
  }

  100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-float {
  animation: float 16s infinite ease-in-out;
}

.animate-fadeIn {
  animation: fadeIn 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.15) forwards;
}

.animation-delay-3000 {
  animation-delay: 3s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

.animation-delay-9000 {
  animation-delay: 9s;
}
</style>
