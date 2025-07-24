<script setup lang="ts">
const loading = ref(false)
const onLogin = async () => {
  loading.value = true
  // 模拟登录请求
  await new Promise(resolve => setTimeout(resolve, 2000))
  loading.value = false
  uni.showToast({
    title: '登录成功',
    icon: 'success',
  })
  // 跳转到首页或其他页面
  uni.switchTab({
    url: '/pages/index/index',
  })
}
</script>

<template>
  <div class="relative m-0 min-h-screen flex items-center justify-center overflow-hidden from-[#f0f5ff] to-[#e6eeff] bg-gradient-to-br px-5">
    <!-- 背景装饰元素 -->
    <div class="animate-float absolute left-[10%] top-[10%] h-[350px] w-[350px] rounded-full bg-[#f87171] opacity-40 filter-blur-70" />
    <div class="animate-float animation-delay-3000 absolute bottom-[10%] right-[10%] h-[450px] w-[450px] rounded-full bg-[#7dd3fc] opacity-40 filter-blur-70" />
    <div class="animate-float animation-delay-6000 absolute right-[15%] top-[20%] h-[280px] w-[280px] rounded-full bg-[#a78bfa] opacity-40 filter-blur-70" />

    <!-- 登录卡片容器 -->
    <div class="animate-fadeIn relative z-10 max-w-[420px] w-full overflow-hidden border border-white/40 rounded-[28px] bg-white/60 p-8 shadow-[0_10px_35px_rgba(0,0,0,0.08),inset_0_0_15px_rgba(255,255,255,0.5)] backdrop-blur-20">
      <!-- 顶部装饰条 -->
      <div class="absolute left-0 top-0 h-[6px] w-full from-[#f87171] via-[#7dd3fc] to-[#a78bfa] bg-gradient-to-r" />

      <!-- 标题区域 -->
      <div class="mb-10 text-center">
        <img class="mb-5 h-16 w-16" src="/static/logo.png">
        <h1 class="mb-2 text-3xl text-[#334155] font-bold tracking-tight">
          礼记
        </h1>
        <p class="text-base text-[#64748b]">
          每一份人情都值得礼记
        </p>
      </div>

      <!-- 登录表单 -->
      <form>
        <!-- 邮箱/用户名 -->
        <div class="relative mb-6">
          <label class="mb-2 block pl-2 text-sm text-[#475569] font-medium">手机</label>
          <div class="group relative">
            <i class="i-hugeicons-call-02 absolute left-5 top-1/2 transform text-lg text-[#94a3b8] transition-all duration-300 -translate-y-1/2 group-focus-within:text-[#f87171]" />
            <input type="text" placeholder="手机" class="border border-[#e2e8f0]/80 rounded-xl bg-white/70 py-2 pl-14 pr-5 text-base text-[#334155] shadow-[0_5px_15px_rgba(0,0,0,0.03)] transition-all duration-300 focus:border-[#f87171]/50 focus:bg-white/90 focus:shadow-[0_0_0_4px_rgba(248,113,113,0.15),0_8px_25px_rgba(0,0,0,0.08)] focus:outline-none">
          </div>
        </div>

        <!-- 登录按钮 -->
        <wd-button block size="large" :loading="loading" @click="onLogin">
          登 录
        </wd-button>
      </form>

      <!-- 分割线 -->
      <div class="my-8 flex items-center text-sm text-[#cbd5e1]">
        <div class="h-px flex-1 from-transparent via-[#e2e8f0] to-transparent bg-gradient-to-r" />
        <!-- <span class="px-4">或使用其他方式登录</span> -->
        <span class="px-4">未注册的手机验证后自动创建账号</span>
        <div class="h-px flex-1 from-transparent via-[#e2e8f0] to-transparent bg-gradient-to-r" />
      </div>

      <!-- 第三方登录 -->
      <!-- <div class="flex justify-center gap-6">
        <div class="h-12 w-12 flex cursor-pointer items-center justify-center border border-[#e2e8f0]/80 rounded-full bg-white/70 text-xl text-[#64748b] shadow-[0_5px_15px_rgba(0,0,0,0.05)] backdrop-blur-5 transition-all duration-400 hover:bg-green hover:text-white hover:shadow-[0_12px_25px_rgba(0,0,0,0.12)] hover:-translate-y-1.5">
          <i class="i-hugeicons-wechat" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
 /* 自定义动画 */
 @keyframes float {
      0% { transform: translate(0, 0) rotate(0deg); }
      33% { transform: translate(10px, -15px) rotate(5deg); }
      66% { transform: translate(-10px, 10px) rotate(-5deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-float {
      animation: float 12s infinite ease-in-out;
    }

    .animate-fadeIn {
      animation: fadeIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    .animation-delay-3000 {
      animation-delay: 3s;
    }

    .animation-delay-6000 {
      animation-delay: 6s;
    }

    /* 自定义模糊效果 */
    .filter-blur-70 {
      filter: blur(70px);
    }

    .backdrop-blur-20 {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .backdrop-blur-5 {
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    }
</style>

<route lang="json">
{
  "layout": false,
  "style": {
    "navigationStyle": "custom"
  }
}
</route>
