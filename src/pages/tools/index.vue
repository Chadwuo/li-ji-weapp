<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '小工具',
  },
})

interface ToolEntry {
  title: string
  subtitle: string
  path: string
  icon: string
  iconClass: string
  accentClass: string
  meta: string
}

const tools: ToolEntry[] = [
  {
    title: '万年历',
    subtitle: '看公历、农历、节气、宜忌与当天方位',
    path: '/pages/tools/calendar',
    icon: 'i-hugeicons-calendar-01',
    iconClass: 'from-[#ef4444] to-[#f97316] text-white',
    accentClass: 'from-[#fff1f2] via-white to-[#fff7ed]',
    meta: '今日黄历',
  },
  {
    title: '择吉日',
    subtitle: '按事项筛选近期合适日子，适合提前安排',
    path: '/pages/tools/lucky-day',
    icon: 'i-hugeicons-calendar-love-02',
    iconClass: 'from-[#14b8a6] to-[#22c55e] text-white',
    accentClass: 'from-[#ecfeff] via-white to-[#f0fdf4]',
    meta: '办事择期',
  },
]

const featuredTool = computed(() => tools[0])
const otherTools = computed(() => tools.slice(1))

function openTool(path: string) {
  uni.navigateTo({
    url: path,
  })
}
</script>

<template>
  <div>
    <div class="relative px-4 pb-7 pt-5">
      <div class="absolute right-[-54px] top-[38px] h-42 w-42 rounded-full bg-[#fecaca]/55 blur-3xl" />

      <div class="relative">
        <div class="mt-1 text-xl text-[#3f2b22] font-bold">
          把日子安排得更稳妥
        </div>
        <div
          v-if="featuredTool"
          class="mt-5 overflow-hidden border border-white/80 rounded-3xl bg-gradient-to-br p-5 shadow-[0_18px_40px_rgba(127,29,29,0.10)] active:scale-[0.99]"
          :class="featuredTool.accentClass"
          @click="openTool(featuredTool.path)"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs text-[#9f5b38] font-medium">
                {{ featuredTool.meta }}
              </div>
              <div class="mt-5 text-2xl text-[#3f2b22] font-bold">
                {{ featuredTool.title }}
              </div>
              <div class="mt-2 text-sm text-[#7a6a61] leading-6">
                {{ featuredTool.subtitle }}
              </div>
            </div>

            <div class="h-16 w-16 flex flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-[0_14px_28px_rgba(248,113,113,0.22)]" :class="featuredTool.iconClass">
              <div class="text-8" :class="featuredTool.icon" />
            </div>
          </div>

          <div class="mt-7 flex items-center justify-between">
            <div class="flex items-center gap-2 text-xs text-[#9f5b38]">
              <span class="h-2 w-2 rounded-full bg-[#ef4444]" />
              <span>日历、农历、宜忌</span>
            </div>
            <div class="h-9 w-9 flex items-center justify-center rounded-full bg-white text-[#ef4444] shadow-sm">
              <div class="i-carbon-arrow-right text-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative z-1 px-4">
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="tool in otherTools"
          :key="tool.path"
          class="min-h-39 overflow-hidden border border-white/80 rounded-2xl bg-gradient-to-br p-4 shadow-[0_10px_26px_rgba(63,43,34,0.06)] active:scale-[0.98]"
          :class="[tool.accentClass, otherTools.length === 1 ? 'col-span-2 min-h-34' : '']"
          @click="openTool(tool.path)"
        >
          <div class="flex items-center justify-between">
            <div class="h-11 w-11 flex items-center justify-center rounded-xl bg-gradient-to-br shadow-sm" :class="tool.iconClass">
              <div class="text-6" :class="tool.icon" />
            </div>
            <div class="i-carbon-arrow-up-right text-lg text-[#b7a79d]" />
          </div>

          <div class="mt-5 text-lg text-[#3f2b22] font-semibold">
            {{ tool.title }}
          </div>
          <div class="line-clamp-2 mt-2 text-xs text-[#7a6a61] leading-5">
            {{ tool.subtitle }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
