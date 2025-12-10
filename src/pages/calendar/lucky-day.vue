<script setup lang="ts">
import { SolarDay } from 'tyme4ts'

definePage({
  layout: false,
  style: {
    navigationBarTitleText: '择吉日',
    navigationBarBackgroundColor: '#f8f5f0',
  },
})

// 事项列表
const eventTypes = [
  { key: '嫁娶', label: '结婚', icon: 'i-carbon-favorite-filled', color: 'rose' },
  { key: '入宅', label: '乔迁', icon: 'i-carbon-home', color: 'amber' },
  { key: '开业', label: '开业', icon: 'i-carbon-store', color: 'emerald' },
  { key: '出行', label: '出行', icon: 'i-carbon-plane', color: 'sky' },
  { key: '祈福', label: '祈福', icon: 'i-carbon-star', color: 'purple' },
  { key: '搬家', label: '搬家', icon: 'i-carbon-delivery-truck', color: 'orange' },
  { key: '装修', label: '装修', icon: 'i-carbon-tool-kit', color: 'teal' },
  { key: '订婚', label: '订婚', icon: 'i-carbon-events', color: 'pink' },
]

// 选中的事项
const selectedEvents = ref<string[]>(['嫁娶'])

// 只看周末
const weekendOnly = ref(false)

// 当前选中的月份
const currentMonth = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
})

// 日历变化
function onCalendarChange(e: any) {
  currentMonth.value = {
    year: e.year,
    month: e.month,
  }
}

// 切换事项选择
function toggleEvent(key: string) {
  const index = selectedEvents.value.indexOf(key)
  if (index > -1) {
    // 至少保留一个选中
    if (selectedEvents.value.length > 1) {
      selectedEvents.value.splice(index, 1)
    }
  }
  else {
    selectedEvents.value.push(key)
  }
}

// 判断农历日是否为双日（偶数）
function isLunarEvenDay(lunarDay: any): boolean {
  const dayName = lunarDay.getName() as string
  // 农历日名：初一到三十
  const evenDays = ['初二', '初四', '初六', '初八', '初十', '十二', '十四', '十六', '十八', '二十', '廿二', '廿四', '廿六', '廿八', '三十']
  return evenDays.includes(dayName)
}

// 判断是否是周末
function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6
}

// 计算好日子列表
const luckyDays = computed(() => {
  const { year, month } = currentMonth.value
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const result: Array<{
    date: Date
    solarDay: any
    lunarDay: any
    recommends: string[]
    matchedEvents: string[]
    isWeekend: boolean
  }> = []

  // 获取当月天数
  const daysInMonth = new Date(year, month, 0).getDate()

  // 遍历当月所有日期
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day)

    // 只显示今天及之后的日期
    if (date < today)
      continue

    // 周末筛选
    const weekend = isWeekend(date)
    if (weekendOnly.value && !weekend)
      continue

    const solarDay = SolarDay.fromYmd(year, month, day)
    const lunarDay = solarDay.getLunarDay()

    // 检查农历是否为双日
    if (!isLunarEvenDay(lunarDay))
      continue

    // 获取宜做事项
    const recommends = lunarDay.getRecommends()
    const recommendNames = recommends.map((r: any) => r.getName())

    // 检查是否包含选中的事项
    const matchedEvents = selectedEvents.value.filter(event =>
      recommendNames.some((name: string) => name.includes(event)),
    )

    if (matchedEvents.length > 0) {
      result.push({
        date,
        solarDay,
        lunarDay,
        recommends: recommendNames,
        matchedEvents,
        isWeekend: weekend,
      })
    }
  }

  return result
})

// 格式化日期显示
function formatDate(date: Date): string {
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

// 格式化星期
function formatWeekday(date: Date): string {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekdays[date.getDay()]
}

// 判断是否是今天
function isToday(date: Date): boolean {
  const today = new Date()
  return date.getFullYear() === today.getFullYear()
    && date.getMonth() === today.getMonth()
    && date.getDate() === today.getDate()
}

// 获取事项的配置
function getEventConfig(key: string) {
  return eventTypes.find(e => e.key === key)
}
</script>

<template>
  <div class="min-h-screen bg-[#f8f5f0]">
    <!-- 月历 -->
    <div class="bg-white shadow-sm">
      <uv-calendars insert color="#F87171" confirm-color="#F87171" @change="onCalendarChange" />
    </div>

    <!-- 事项选择区域 -->
    <div class="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm">
      <div class="mb-3 flex items-center justify-between">
        <div class="text-base text-gray-700 font-medium">
          选择事项
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500">只看周末</span>
          <div
            class="relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200"
            :class="weekendOnly ? 'bg-[#c9463d]' : 'bg-gray-300'"
            @click="weekendOnly = !weekendOnly"
          >
            <div
              class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200"
              :class="weekendOnly ? 'translate-x-5.5' : 'translate-x-0.5'"
            />
          </div>
        </div>
      </div>

      <!-- 事项标签 -->
      <div class="flex flex-wrap gap-2">
        <div
          v-for="event in eventTypes"
          :key="event.key"
          class="flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1.5 transition-all duration-200"
          :class="[
            selectedEvents.includes(event.key)
              ? `bg-${event.color}-100 text-${event.color}-600 ring-2 ring-${event.color}-300`
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
          ]"
          @click="toggleEvent(event.key)"
        >
          <div :class="event.icon" class="text-sm" />
          <span class="text-sm">{{ event.label }}</span>
        </div>
      </div>
    </div>

    <!-- 好日子列表 -->
    <div class="mx-4 mt-4 pb-8">
      <div class="mb-3 flex items-center justify-between">
        <div class="text-base text-gray-700 font-medium">
          本月好日子
        </div>
        <div class="text-sm text-gray-400">
          共 {{ luckyDays.length }} 天
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="luckyDays.length === 0" class="rounded-2xl bg-white p-8 text-center shadow-sm">
        <div class="i-carbon-calendar-heat-map mx-auto text-5xl text-gray-300" />
        <div class="mt-4 text-gray-400">
          本月暂无符合条件的好日子
        </div>
        <div class="mt-2 text-sm text-gray-300">
          试试选择其他事项或取消周末筛选
        </div>
      </div>

      <!-- 日期列表 -->
      <div v-else class="space-y-3">
        <div
          v-for="(day, index) in luckyDays"
          :key="index"
          class="overflow-hidden rounded-2xl bg-white shadow-sm"
        >
          <!-- 日期头部 -->
          <div class="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div class="flex items-center gap-3">
              <!-- 日期数字 -->
              <div class="relative">
                <div
                  class="h-12 w-12 flex items-center justify-center rounded-xl text-xl font-bold"
                  :class="isToday(day.date) ? 'bg-[#c9463d] text-white' : 'bg-gradient-to-br from-amber-50 to-orange-50 text-[#c9463d]'"
                >
                  {{ day.date.getDate() }}
                </div>
                <div
                  v-if="day.isWeekend"
                  class="absolute h-4 w-4 flex items-center justify-center rounded-full bg-purple-500 text-white -right-1 -top-1"
                >
                  <span class="text-xs">休</span>
                </div>
              </div>
              <!-- 日期信息 -->
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-800 font-medium">{{ formatDate(day.date) }}</span>
                  <span class="text-sm text-gray-400">{{ formatWeekday(day.date) }}</span>
                  <span
                    v-if="isToday(day.date)"
                    class="rounded bg-[#c9463d] px-1.5 py-0.5 text-xs text-white"
                  >
                    今天
                  </span>
                </div>
                <div class="mt-0.5 text-sm text-gray-500">
                  农历 {{ day.lunarDay.getLunarMonth().toString() }}{{ day.lunarDay.getName() }}
                </div>
              </div>
            </div>
            <!-- 干支 -->
            <div class="text-right">
              <div class="text-sm text-[#c9463d] font-medium">
                {{ day.lunarDay.getSixtyCycle().getName() }}
              </div>
            </div>
          </div>

          <!-- 匹配的事项 -->
          <div class="from-green-50/50 to-emerald-50/50 bg-gradient-to-r px-4 py-3">
            <div class="mb-2 text-xs text-gray-400">
              适宜
            </div>
            <div class="flex flex-wrap gap-2">
              <template v-for="event in day.matchedEvents" :key="event">
                <div
                  v-if="getEventConfig(event)"
                  class="flex items-center gap-1 rounded-full px-2.5 py-1"
                  :class="`bg-${getEventConfig(event)!.color}-100 text-${getEventConfig(event)!.color}-600`"
                >
                  <div :class="getEventConfig(event)!.icon" class="text-xs" />
                  <span class="text-xs font-medium">{{ getEventConfig(event)!.label }}</span>
                </div>
              </template>
            </div>
          </div>

          <!-- 其他宜做事项 -->
          <div class="px-4 py-3">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="(recommend, rIndex) in day.recommends.slice(0, 8)"
                :key="rIndex"
                class="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500"
              >
                {{ recommend }}
              </span>
              <span
                v-if="day.recommends.length > 8"
                class="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-400"
              >
                +{{ day.recommends.length - 8 }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 动态颜色类 - UnoCSS safelist */
.bg-rose-100 { --un-bg-opacity: 1; background-color: rgb(255 228 230 / var(--un-bg-opacity)); }
.text-rose-600 { --un-text-opacity: 1; color: rgb(225 29 72 / var(--un-text-opacity)); }
.ring-rose-300 { --un-ring-opacity: 1; --un-ring-color: rgb(253 164 175 / var(--un-ring-opacity)); }

.bg-amber-100 { --un-bg-opacity: 1; background-color: rgb(254 243 199 / var(--un-bg-opacity)); }
.text-amber-600 { --un-text-opacity: 1; color: rgb(217 119 6 / var(--un-text-opacity)); }
.ring-amber-300 { --un-ring-opacity: 1; --un-ring-color: rgb(252 211 77 / var(--un-ring-opacity)); }

.bg-emerald-100 { --un-bg-opacity: 1; background-color: rgb(209 250 229 / var(--un-bg-opacity)); }
.text-emerald-600 { --un-text-opacity: 1; color: rgb(5 150 105 / var(--un-text-opacity)); }
.ring-emerald-300 { --un-ring-opacity: 1; --un-ring-color: rgb(110 231 183 / var(--un-ring-opacity)); }

.bg-sky-100 { --un-bg-opacity: 1; background-color: rgb(224 242 254 / var(--un-bg-opacity)); }
.text-sky-600 { --un-text-opacity: 1; color: rgb(2 132 199 / var(--un-text-opacity)); }
.ring-sky-300 { --un-ring-opacity: 1; --un-ring-color: rgb(125 211 252 / var(--un-ring-opacity)); }

.bg-purple-100 { --un-bg-opacity: 1; background-color: rgb(243 232 255 / var(--un-bg-opacity)); }
.text-purple-600 { --un-text-opacity: 1; color: rgb(147 51 234 / var(--un-text-opacity)); }
.ring-purple-300 { --un-ring-opacity: 1; --un-ring-color: rgb(216 180 254 / var(--un-ring-opacity)); }

.bg-orange-100 { --un-bg-opacity: 1; background-color: rgb(255 237 213 / var(--un-bg-opacity)); }
.text-orange-600 { --un-text-opacity: 1; color: rgb(234 88 12 / var(--un-text-opacity)); }
.ring-orange-300 { --un-ring-opacity: 1; --un-ring-color: rgb(253 186 116 / var(--un-ring-opacity)); }

.bg-teal-100 { --un-bg-opacity: 1; background-color: rgb(204 251 241 / var(--un-bg-opacity)); }
.text-teal-600 { --un-text-opacity: 1; color: rgb(13 148 136 / var(--un-text-opacity)); }
.ring-teal-300 { --un-ring-opacity: 1; --un-ring-color: rgb(94 234 212 / var(--un-ring-opacity)); }

.bg-pink-100 { --un-bg-opacity: 1; background-color: rgb(252 231 243 / var(--un-bg-opacity)); }
.text-pink-600 { --un-text-opacity: 1; color: rgb(219 39 119 / var(--un-text-opacity)); }
.ring-pink-300 { --un-ring-opacity: 1; --un-ring-color: rgb(249 168 212 / var(--un-ring-opacity)); }
</style>
