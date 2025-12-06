<script setup lang="ts">
import type { Week } from 'tyme4ts'
import { SolarDay } from 'tyme4ts'

definePage({
  layout: false,
  style: {
    navigationBarTitleText: '黄历',
    navigationBarBackgroundColor: '#f8f5f0',
    backgroundColor: '#f8f5f0',
  },
})

// 当前选中的日期
const currentDate = ref(new Date())

// 计算属性：阳历日期
const solarDay = computed(() => {
  const d = currentDate.value
  return SolarDay.fromYmd(d.getFullYear(), d.getMonth() + 1, d.getDate())
})

// 计算属性：农历日期
const lunarDay = computed(() => solarDay.value.getLunarDay())

// 星期
const weekDay = computed(() => solarDay.value.getWeek())

// 节气
const solarTerm = computed(() => solarDay.value.getTerm())

// 宜忌
const recommends = computed(() => lunarDay.value.getRecommends())
const avoids = computed(() => lunarDay.value.getAvoids())

// 其他信息
const nineStar = computed(() => lunarDay.value.getNineStar())
const twelveStar = computed(() => lunarDay.value.getTwelveStar())
const duty = computed(() => lunarDay.value.getDuty())
const twentyEightStar = computed(() => lunarDay.value.getTwentyEightStar())
const constellation = computed(() => solarDay.value.getConstellation())
const phase = computed(() => lunarDay.value.getPhase())
const pengZu = computed(() => lunarDay.value.getSixtyCycle().getPengZu())

// 农历节日
const lunarFestival = computed(() => lunarDay.value.getFestival())

// 公历节日
const solarFestival = computed(() => solarDay.value.getFestival())

// 日期选择器
const showDatePicker = ref(false)

function openDatePicker() {
  showDatePicker.value = true
}

// 日期切换
function goToday() {
  currentDate.value = new Date()
}

function goPrevDay() {
  const d = new Date(currentDate.value)
  d.setDate(d.getDate() - 1)
  currentDate.value = d
}

function goNextDay() {
  const d = new Date(currentDate.value)
  d.setDate(d.getDate() + 1)
  currentDate.value = d
}

// 格式化星期
function formatWeek(week: Week): string {
  const names = ['日', '一', '二', '三', '四', '五', '六']
  return `星期${names[week.getIndex()]}`
}

// 判断是否是今天
const isToday = computed(() => {
  const today = new Date()
  const d = currentDate.value
  return today.getFullYear() === d.getFullYear()
    && today.getMonth() === d.getMonth()
    && today.getDate() === d.getDate()
})

// 干支年月日
const yearSixtyCycle = computed(() => lunarDay.value.getYearSixtyCycle())
const monthSixtyCycle = computed(() => lunarDay.value.getMonthSixtyCycle())
const daySixtyCycle = computed(() => lunarDay.value.getSixtyCycle())

// 生肖
const zodiac = computed(() => yearSixtyCycle.value.getEarthBranch().getZodiac())

// 胎神
const fetusDay = computed(() => lunarDay.value.getFetusDay())

// 吉神凶煞
const gods = computed(() => lunarDay.value.getGods())

// 纳音
const sound = computed(() => daySixtyCycle.value.getSound())

// 黄道黑道
const ecliptic = computed(() => twelveStar.value.getEcliptic())

// 冲煞
const dayEarthBranch = computed(() => daySixtyCycle.value.getEarthBranch())
const oppositeZodiac = computed(() => dayEarthBranch.value.getOpposite().getZodiac())
const ominousDirection = computed(() => dayEarthBranch.value.getOminous())

// 六曜
const sixStar = computed(() => lunarDay.value.getSixStar())

// 三伏
const dogDay = computed(() => solarDay.value.getDogDay())

// 数九
const nineDay = computed(() => solarDay.value.getNineDay())

// 五行
const dayElement = computed(() => daySixtyCycle.value.getHeavenStem().getElement())

// 方位信息
const dayHeavenStem = computed(() => daySixtyCycle.value.getHeavenStem())
const joyDirection = computed(() => dayHeavenStem.value.getJoyDirection()) // 喜神方位
const wealthDirection = computed(() => dayHeavenStem.value.getWealthDirection()) // 财神方位
const mascotDirection = computed(() => dayHeavenStem.value.getMascotDirection()) // 福神方位
const yangDirection = computed(() => dayHeavenStem.value.getYangDirection()) // 阳贵方位

// 分类吉神凶煞
const luckyGods = computed(() => gods.value.filter(g => g.getLuck().getName() === '吉'))
const unluckyGods = computed(() => gods.value.filter(g => g.getLuck().getName() !== '吉'))
</script>

<template>
  <div class="min-h-screen bg-[#f8f5f0] pb-8">
    <!-- 顶部日期导航 -->
    <div class="from-[#c9463d] to-[#a63830] bg-gradient-to-b px-4 pb-6 pt-4">
      <!-- 日期切换按钮 -->
      <div class="flex items-center justify-between text-white">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 active:bg-white/30" @click="goPrevDay">
            <div class="i-carbon-chevron-left text-xl" />
          </div>
        </div>

        <div class="text-center" @click="openDatePicker">
          <div class="text-lg font-medium">
            {{ solarDay.getYear() }}年{{ solarDay.getMonth() }}月
          </div>
          <div v-if="isToday" class="mt-1 text-white/70">
            <div class="rounded-full bg-white/20 px-4 py-1 text-sm text-white active:bg-white/30" @click="goToday">
              点击选择日期
            </div>
          </div>
          <!-- 回到今天按钮 -->
          <div v-if="!isToday" class="mt-1 flex justify-center">
            <div class="rounded-full bg-white/20 px-4 py-1 text-sm text-white active:bg-white/30" @click="goToday">
              回到今天
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 active:bg-white/30" @click="goNextDay">
            <div class="i-carbon-chevron-right text-xl" />
          </div>
        </div>
      </div>

      <!-- 主日期显示 -->
      <div class="mt-4 flex items-center justify-center gap-6">
        <!-- 阳历日期 -->
        <div class="text-center text-white">
          <div class="text-6xl font-bold">
            {{ solarDay.getDay() }}
          </div>
          <div class="mt-1 text-base">
            {{ formatWeek(weekDay) }}
          </div>
        </div>

        <!-- 分隔线 -->
        <div class="h-16 w-px bg-white/30" />

        <!-- 农历日期 -->
        <div class="text-center text-white">
          <div class="text-xl font-medium">
            {{ lunarDay.getLunarMonth().toString() }}
          </div>
          <div class="mt-1 text-2xl font-bold">
            {{ lunarDay.getName() }}
          </div>
        </div>
      </div>
    </div>

    <!-- 节日显示 -->
    <div v-if="lunarFestival || solarFestival" class="mx-4 mt-4 rounded-xl from-[#ff6b6b] to-[#ff8e53] bg-gradient-to-r p-4 text-white shadow-lg">
      <div class="flex items-center gap-2">
        <div class="i-carbon-star-filled text-lg" />
        <span class="font-medium">{{ solarFestival?.getName() || lunarFestival?.getName() }}</span>
      </div>
    </div>

    <!-- 干支信息卡片 -->
    <div class="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm">
      <div class="mb-3 text-base text-gray-500 font-medium">
        干支纪年
      </div>
      <div class="flex items-center justify-around">
        <div class="text-center">
          <div class="text-sm text-gray-400">
            年
          </div>
          <div class="mt-1 text-lg text-[#c9463d] font-bold">
            {{ yearSixtyCycle.getName() }}
          </div>
          <div class="mt-0.5 text-xs text-gray-500">
            {{ zodiac.getName() }}年
          </div>
        </div>
        <div class="h-10 w-px bg-gray-100" />
        <div class="text-center">
          <div class="text-sm text-gray-400">
            月
          </div>
          <div class="mt-1 text-lg text-[#c9463d] font-bold">
            {{ monthSixtyCycle.getName() }}
          </div>
        </div>
        <div class="h-10 w-px bg-gray-100" />
        <div class="text-center">
          <div class="text-sm text-gray-400">
            日
          </div>
          <div class="mt-1 text-lg text-[#c9463d] font-bold">
            {{ daySixtyCycle.getName() }}
          </div>
        </div>
      </div>
    </div>

    <!-- 宜忌卡片 -->
    <div class="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm">
      <div class="flex justify-between">
        <!-- 宜 -->
        <div class="flex-1">
          <div class="mb-3 flex items-center justify-center gap-2">
            <div class="h-6 w-6 flex items-center justify-center rounded-full bg-green-500 text-xs text-white font-bold">
              宜
            </div>
            <span class="text-sm text-gray-500">今日宜做</span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <span
              v-for="(item, index) in recommends.slice(0, 8)" :key="index"
              class="rounded-md bg-green-50 px-2 py-1 text-center text-sm text-green-700"
            >
              {{ item.getName() }}
            </span>
            <span v-if="recommends.length > 8" class="rounded-md bg-gray-50 px-2 py-1 text-sm text-gray-500">
              +{{ recommends.length - 8 }}
            </span>
          </div>
        </div>

        <!-- 分隔线 -->
        <div class="mx-1 w-px bg-gray-100" />

        <!-- 忌 -->
        <div class="flex-1">
          <div class="mb-3 flex items-center justify-center gap-2">
            <div class="h-6 w-6 flex items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold">
              忌
            </div>
            <span class="text-sm text-gray-500">今日忌做</span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <span
              v-for="(item, index) in avoids.slice(0, 8)" :key="index"
              class="rounded-md bg-red-50 px-2 py-1 text-center text-sm text-red-700"
            >
              {{ item.getName() }}
            </span>
            <span v-if="avoids.length > 8" class="rounded-md bg-gray-50 px-2 py-1 text-sm text-gray-500">
              +{{ avoids.length - 8 }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 详细信息卡片 -->
    <div class="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm">
      <div class="mb-3 text-base text-gray-500 font-medium">
        详细信息
      </div>
      <div class="grid grid-cols-2 gap-y-3">
        <!-- 节气 -->
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-50">
            <div class="i-carbon-sun text-blue-500" />
          </div>
          <div>
            <div class="text-xs text-gray-400">
              节气
            </div>
            <div class="text-sm text-gray-700 font-medium">
              {{ solarTerm.getName() }}
            </div>
          </div>
        </div>

        <!-- 星座 -->
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 flex items-center justify-center rounded-lg bg-purple-50">
            <div class="i-carbon-star text-purple-500" />
          </div>
          <div>
            <div class="text-xs text-gray-400">
              星座
            </div>
            <div class="text-sm text-gray-700 font-medium">
              {{ constellation.getName() }}座
            </div>
          </div>
        </div>

        <!-- 月相 -->
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 flex items-center justify-center rounded-lg bg-amber-50">
            <div class="i-carbon-moon text-amber-500" />
          </div>
          <div>
            <div class="text-xs text-gray-400">
              月相
            </div>
            <div class="text-sm text-gray-700 font-medium">
              {{ phase.getName() }}
            </div>
          </div>
        </div>

        <!-- 值日 -->
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 flex items-center justify-center rounded-lg bg-green-50">
            <div class="i-carbon-calendar text-green-500" />
          </div>
          <div>
            <div class="text-xs text-gray-400">
              值日
            </div>
            <div class="text-sm text-gray-700 font-medium">
              {{ duty.getName() }}日
            </div>
          </div>
        </div>

        <!-- 十二星 -->
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 flex items-center justify-center rounded-lg bg-rose-50">
            <div class="i-carbon-chart-radial text-rose-500" />
          </div>
          <div>
            <div class="text-xs text-gray-400">
              十二星
            </div>
            <div class="text-sm text-gray-700 font-medium">
              {{ twelveStar.getName() }}
            </div>
          </div>
        </div>

        <!-- 二十八宿 -->
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 flex items-center justify-center rounded-lg bg-indigo-50">
            <div class="i-carbon-diagram text-indigo-500" />
          </div>
          <div>
            <div class="text-xs text-gray-400">
              二十八宿
            </div>
            <div class="text-sm text-gray-700 font-medium">
              {{ twentyEightStar.getName() }}
            </div>
          </div>
        </div>

        <!-- 九星 -->
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 flex items-center justify-center rounded-lg bg-teal-50">
            <div class="i-carbon-cloud text-teal-500" />
          </div>
          <div>
            <div class="text-xs text-gray-400">
              九星
            </div>
            <div class="text-sm text-gray-700 font-medium">
              {{ nineStar.toString() }}
            </div>
          </div>
        </div>

        <!-- 胎神 -->
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 flex items-center justify-center rounded-lg bg-pink-50">
            <div class="i-carbon-person text-pink-500" />
          </div>
          <div>
            <div class="text-xs text-gray-400">
              胎神
            </div>
            <div class="text-sm text-gray-700 font-medium">
              {{ fetusDay.getName() }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 今日运势概览 -->
    <div class="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm">
      <div class="mb-3 text-base text-gray-500 font-medium">
        今日运势
      </div>
      <div class="grid grid-cols-4 gap-3">
        <!-- 黄道黑道 -->
        <div class="flex flex-col items-center">
          <div
            class="h-12 w-12 flex items-center justify-center rounded-xl text-lg font-bold"
            :class="ecliptic.getLuck().getName() === '吉' ? 'bg-amber-100 text-amber-600' : 'bg-gray-200 text-gray-600'"
          >
            {{ ecliptic.getName() }}
          </div>
          <div class="mt-1.5 text-xs text-gray-400">
            {{ ecliptic.getLuck().getName() === '吉' ? '黄道日' : '黑道日' }}
          </div>
        </div>

        <!-- 六曜 -->
        <div class="flex flex-col items-center">
          <div class="h-12 w-12 flex items-center justify-center rounded-xl bg-purple-100 text-lg text-purple-600 font-bold">
            {{ sixStar.getName() }}
          </div>
          <div class="mt-1.5 text-xs text-gray-400">
            六曜
          </div>
        </div>

        <!-- 纳音 -->
        <div class="flex flex-col items-center">
          <div class="h-12 w-12 flex items-center justify-center rounded-xl bg-blue-100 text-sm text-blue-600 font-bold">
            {{ sound.getName().substring(0, 2) }}
          </div>
          <div class="mt-1.5 text-xs text-gray-400">
            {{ sound.getName().substring(2) }}
          </div>
        </div>

        <!-- 五行 -->
        <div class="flex flex-col items-center">
          <div class="h-12 w-12 flex items-center justify-center rounded-xl bg-emerald-100 text-lg text-emerald-600 font-bold">
            {{ dayElement.getName() }}
          </div>
          <div class="mt-1.5 text-xs text-gray-400">
            五行
          </div>
        </div>
      </div>
    </div>

    <!-- 冲煞信息 -->
    <div class="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm">
      <div class="mb-3 text-base text-gray-500 font-medium">
        冲煞方位
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-14 w-14 flex flex-col items-center justify-center rounded-xl bg-red-50">
            <div class="text-lg text-red-500 font-bold">
              冲
            </div>
            <div class="text-xs text-red-400">
              {{ oppositeZodiac.getName() }}
            </div>
          </div>
          <div>
            <div class="text-sm text-gray-700 font-medium">
              冲{{ oppositeZodiac.getName() }}
            </div>
            <div class="text-xs text-gray-400">
              {{ oppositeZodiac.getName() }}日冲{{ oppositeZodiac.getName() }}，属{{ oppositeZodiac.getName() }}者慎行
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="h-14 w-14 flex flex-col items-center justify-center rounded-xl bg-orange-50">
            <div class="text-lg text-orange-500 font-bold">
              煞
            </div>
            <div class="text-xs text-orange-400">
              {{ ominousDirection.getName() }}
            </div>
          </div>
          <div>
            <div class="text-sm text-gray-700 font-medium">
              煞{{ ominousDirection.getName() }}
            </div>
            <div class="text-xs text-gray-400">
              {{ ominousDirection.getName() }}方为煞方
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 三伏/数九 -->
    <div v-if="dogDay || nineDay" class="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm">
      <div class="mb-3 text-base text-gray-500 font-medium">
        {{ dogDay ? '三伏天' : '数九天' }}
      </div>
      <div v-if="dogDay" class="flex items-center gap-4 rounded-xl from-orange-50 to-red-50 bg-gradient-to-r p-4">
        <div class="h-16 w-16 flex items-center justify-center rounded-full from-orange-400 to-red-500 bg-gradient-to-br text-white shadow-lg">
          <div class="text-center">
            <div class="text-xl font-bold">
              {{ dogDay.getDog().getName() }}
            </div>
          </div>
        </div>
        <div>
          <div class="text-base text-gray-700 font-medium">
            {{ dogDay.toString() }}
          </div>
          <div class="mt-1 text-sm text-gray-500">
            三伏天注意防暑降温
          </div>
        </div>
      </div>
      <div v-if="nineDay" class="flex items-center gap-4 rounded-xl from-blue-50 to-cyan-50 bg-gradient-to-r p-4">
        <div class="h-16 w-16 flex items-center justify-center rounded-full from-blue-400 to-cyan-500 bg-gradient-to-br text-white shadow-lg">
          <div class="text-center">
            <div class="text-xl font-bold">
              {{ nineDay.getNine().getName() }}
            </div>
          </div>
        </div>
        <div>
          <div class="text-base text-gray-700 font-medium">
            {{ nineDay.toString() }}
          </div>
          <div class="mt-1 text-sm text-gray-500">
            数九寒天注意保暖
          </div>
        </div>
      </div>
    </div>

    <!-- 吉神方位 -->
    <div class="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm">
      <div class="mb-3 text-base text-gray-500 font-medium">
        吉神方位
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="flex items-center gap-3 rounded-xl bg-red-50 p-3">
          <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-red-500 text-white font-bold">
            喜
          </div>
          <div>
            <div class="text-sm text-gray-700 font-medium">
              喜神
            </div>
            <div class="text-base text-red-600 font-bold">
              {{ joyDirection.getName() }}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-xl bg-amber-50 p-3">
          <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-amber-500 text-white font-bold">
            财
          </div>
          <div>
            <div class="text-sm text-gray-700 font-medium">
              财神
            </div>
            <div class="text-base text-amber-600 font-bold">
              {{ wealthDirection.getName() }}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-xl bg-purple-50 p-3">
          <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-500 text-white font-bold">
            福
          </div>
          <div>
            <div class="text-sm text-gray-700 font-medium">
              福神
            </div>
            <div class="text-base text-purple-600 font-bold">
              {{ mascotDirection.getName() }}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
          <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-500 text-white font-bold">
            贵
          </div>
          <div>
            <div class="text-sm text-gray-700 font-medium">
              贵神
            </div>
            <div class="text-base text-blue-600 font-bold">
              {{ yangDirection.getName() }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 彭祖百忌 -->
    <div class="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm">
      <div class="mb-3 text-base text-gray-500 font-medium">
        彭祖百忌
      </div>
      <div class="space-y-2">
        <div class="flex items-start gap-3 rounded-xl from-slate-50 to-gray-50 bg-gradient-to-r p-3">
          <div class="h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-slate-600 text-sm text-white font-bold">
            {{ daySixtyCycle.getHeavenStem().getName() }}
          </div>
          <div class="flex-1">
            <div class="text-sm text-gray-600 leading-relaxed">
              {{ pengZu.getPengZuHeavenStem().getName() }}
            </div>
          </div>
        </div>
        <div class="flex items-start gap-3 rounded-xl from-slate-50 to-gray-50 bg-gradient-to-r p-3">
          <div class="h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-slate-600 text-sm text-white font-bold">
            {{ daySixtyCycle.getEarthBranch().getName() }}
          </div>
          <div class="flex-1">
            <div class="text-sm text-gray-600 leading-relaxed">
              {{ pengZu.getPengZuEarthBranch().getName() }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 吉神凶煞 -->
    <div class="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm">
      <div class="mb-3 text-base text-gray-500 font-medium">
        吉神凶煞
      </div>

      <!-- 吉神 -->
      <div class="mb-4">
        <div class="mb-2 flex items-center gap-2">
          <div class="h-5 w-5 flex items-center justify-center rounded bg-green-500 text-xs text-white">
            吉
          </div>
          <span class="text-sm text-gray-500">吉神宜趋 · {{ luckyGods.length }}个</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(god, index) in luckyGods" :key="`lucky-${index}`"
            class="border border-green-200 rounded-lg from-green-50 to-emerald-50 bg-gradient-to-r px-3 py-1.5 text-sm text-green-700"
          >
            {{ god.getName() }}
          </span>
        </div>
      </div>

      <!-- 凶煞 -->
      <div>
        <div class="mb-2 flex items-center gap-2">
          <div class="h-5 w-5 flex items-center justify-center rounded bg-red-500 text-xs text-white">
            凶
          </div>
          <span class="text-sm text-gray-500">凶神宜避 · {{ unluckyGods.length }}个</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(god, index) in unluckyGods" :key="`unlucky-${index}`"
            class="border border-red-200 rounded-lg from-red-50 to-orange-50 bg-gradient-to-r px-3 py-1.5 text-sm text-red-700"
          >
            {{ god.getName() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
