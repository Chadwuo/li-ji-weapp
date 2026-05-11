<script setup lang="ts">
import { useNotify } from '@wot-ui/ui'
import { useCaptcha } from 'alova/client'
import { storeToRefs } from 'pinia'

definePage({
  style: {
    navigationBarTitleText: '绑定邮箱',
  },
})

const { showNotify } = useNotify()
const { userInfo } = storeToRefs(useAuthStore())
const loading = ref(false)
const formVisible = ref(false)
const showEmail = ref(false)
const form = ref({
  email: '',
  code: '',
})
const emailRegex = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
const currentEmail = computed(() => userInfo.value?.email || '')
const isBound = computed(() => Boolean(currentEmail.value))
const actionText = computed(() => isBound.value ? '更换邮箱' : '绑定邮箱')
const submitText = computed(() => isBound.value ? '确认更换' : '完成绑定')
const maskedEmail = computed(() => currentEmail.value ? maskEmail(currentEmail.value) : '暂未绑定')
const displayEmail = computed(() => currentEmail.value && showEmail.value ? currentEmail.value : maskedEmail.value)

const {
  loading: sending,
  countdown,
  send: sendCaptcha,
} = useCaptcha(() => apiEmailSendVerifyEmailPost({ email: form.value.email }))

function maskEmail(email: string) {
  const [name, domain] = email.split('@')
  if (!domain)
    return email

  const visibleName = name.length <= 2 ? `${name.slice(0, 1)}***` : `${name.slice(0, 2)}***${name.slice(-1)}`
  return `${visibleName}@${domain}`
}

function validateEmail() {
  if (!form.value.email) {
    uni.showToast({
      title: '请输入邮箱',
      icon: 'none',
    })
    return false
  }

  if (!emailRegex.test(form.value.email)) {
    uni.showToast({
      title: '请输入正确的邮箱格式',
      icon: 'none',
    })
    return false
  }

  return true
}

const openForm = () => {
  form.value = {
    email: currentEmail.value,
    code: '',
  }
  formVisible.value = true
}

const closeForm = () => {
  if (loading.value || sending.value)
    return

  formVisible.value = false
}

const onSendCode = async () => {
  if (!validateEmail())
    return

  await sendCaptcha()
  uni.showToast({
    title: '验证码已发送',
    icon: 'success',
  })
}

const onSubmit = async () => {
  if (!validateEmail())
    return

  if (!form.value.code) {
    uni.showToast({
      title: '请输入验证码',
      icon: 'none',
    })
    return
  }

  try {
    loading.value = true
    const wasBound = isBound.value
    await apiEmailVerifyEmailPost(form.value)
    userInfo.value = await apiAuthUserInfoGet()
    showNotify({ type: 'success', message: wasBound ? '邮箱更换成功' : '邮箱绑定成功' })
    uni.navigateBack({
      fail: () => {
        uni.redirectTo({
          url: '/pages/settings/index',
        })
      },
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="px-4 pb-8 pt-5 space-y-4">
    <div class="gradient-card p-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="text-2xl text-[#1f2937] font-semibold">
            绑定邮箱
          </div>
          <div class="mt-2 max-w-[240px] text-sm text-[#6b7280] leading-6">
            绑定后可使用邮箱登录账号，也能在需要时接收账号验证信息。
          </div>
        </div>
        <div class="h-13 w-13 flex flex-shrink-0 items-center justify-center rounded-full bg-white text-[#f87171] shadow-[0_6px_18px_rgba(248,113,113,0.18)]">
          <i class="i-hugeicons-mail-01 text-7" />
        </div>
      </div>

      <div class="mt-5 rounded-xl bg-white/70 px-4 py-3">
        <div class="flex items-center justify-between gap-3">
          <div class="min-w-0">
            <div class="text-xs text-[#9ca3af]">
              当前邮箱
            </div>
            <div class="mt-1 break-all text-base text-[#374151] font-medium">
              {{ displayEmail }}
            </div>
          </div>
          <button
            v-if="currentEmail"
            class="reset-button h-9 w-9 flex flex-shrink-0 items-center justify-center rounded-full bg-white text-[#6b7280]"
            :aria-label="showEmail ? '隐藏完整邮箱' : '显示完整邮箱'"
            @click="showEmail = !showEmail"
          >
            <i :class="showEmail ? 'i-hugeicons-view-off' : 'i-hugeicons-view'" class="text-5" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="!formVisible" class="px-1 pt-2">
      <wd-button round block size="large" @click="openForm">
        {{ actionText }}
      </wd-button>
    </div>

    <div v-else class="rounded-2xl bg-white px-4 py-5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
      <wd-form :model="form" layout="vertical">
        <wd-form-item title="邮箱">
          <wd-input v-model:value="form.email" placeholder="请输入邮箱地址" :compact="false" />
        </wd-form-item>
        <wd-form-item title="验证码">
          <wd-input v-model:value="form.code" placeholder="请输入验证码" :compact="false">
            <template #suffix>
              <wd-button size="small" :loading="sending" :disabled="sending" @click="onSendCode">
                {{ countdown > 0 ? `${countdown}s后重试` : '发送验证码' }}
              </wd-button>
            </template>
          </wd-input>
        </wd-form-item>
      </wd-form>

      <div class="mt-5 flex gap-3">
        <wd-button round block variant="plain" :disabled="loading || sending" @click="closeForm">
          取消
        </wd-button>
        <wd-button round block :loading="loading" @click="onSubmit">
          {{ submitText }}
        </wd-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
