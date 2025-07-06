<script setup lang="ts">
import dayjs from 'dayjs'

const lineData = ref({})
const wordData = ref({})
const bubbleData = ref({})

const chatOpt = {
  color: ['#F87171', '#2DD4BF', '#FAC858', '#EE6666', '#73C0DE', '#1890FF', '#FC8452', '#9A60B4', '#EA7CCC'],
  dataLabel: false,
  dataPointShape: false,
  xAxis: {
    itemCount: 12,
    rotateLabel: true,
  },
  yAxis: {
    gridType: 'dash',
  },
  extra: {
    area: {
      type: 'curve',
      gradient: true,
    },
    bubble: {
      border: 1,
    },
  },
}

const statsData = ref<Api.StatsOverall>({
  inCount: 0,
  outCount: 0,
  inTotal: 0,
  outTotal: 0,
})

onShow(async () => {
  const { giftInList, giftOutList } = await apiStatsDashboardGet()

  const inCount = giftInList?.length || 0
  const outCount = giftOutList?.length || 0
  const inTotal = giftInList?.reduce((acc, curr) => acc + (curr.money || 0), 0) || 0
  const outTotal = giftOutList?.reduce((acc, curr) => acc + (curr.money || 0), 0) || 0

  statsData.value = {
    inCount,
    outCount,
    inTotal,
    outTotal,
  }

  const now = dayjs()
  const monthCategories = Array.from({ length: 12 }, (_, i) =>
    now.subtract(11 - i, 'month').format('YYYY.MM'))

  // 生成折线图数据（按近12个月统计收礼和送礼金额）
  const inMoneyByMonth = Array.from({ length: 12 }).fill(0) as number[]
  const outMoneyByMonth = Array.from({ length: 12 }).fill(0) as number[]

  giftInList?.forEach((item) => {
    const itemDate = dayjs(item.date)
    if (itemDate.isSameOrAfter(now.subtract(1, 'year').add(1, 'day'), 'day') && itemDate.isSameOrBefore(now, 'day')) {
      const diffMonth = now.diff(itemDate, 'month')
      if (diffMonth >= 0 && diffMonth < 12) {
        const idx = 11 - diffMonth
        inMoneyByMonth[idx] += item.money || 0
      }
    }
  })

  giftOutList?.forEach((item) => {
    const itemDate = dayjs(item.date)
    if (itemDate.isSameOrAfter(now.subtract(1, 'year').add(1, 'day'), 'day') && itemDate.isSameOrBefore(now, 'day')) {
      const diffMonth = now.diff(itemDate, 'month')
      if (diffMonth >= 0 && diffMonth < 12) {
        const idx = 11 - diffMonth
        outMoneyByMonth[idx] += item.money || 0
      }
    }
  })

  lineData.value = {
    categories: monthCategories,
    series: [
      {
        name: '收礼金额',
        data: inMoneyByMonth,
      },
      {
        name: '送礼金额',
        data: outMoneyByMonth,
      },
    ],
  }

  // 生成词云数据（统计送礼/收礼对象出现频率）
  const wordMap: Record<string, number> = {}
  giftInList?.forEach((item) => {
    if (item.friendName) {
      wordMap[item.friendName] = (wordMap[item.friendName] || 0) + 1
    }
    if (item.title) {
      wordMap[item.title] = (wordMap[item.title] || 0) + 1
    }
  })
  giftOutList?.forEach((item) => {
    if (item.friendName) {
      wordMap[item.friendName] = (wordMap[item.friendName] || 0) + 1
    }
    if (item.title) {
      wordMap[item.title] = (wordMap[item.title] || 0) + 1
    }
  })
  // 取出现频率最高的前20个词
  const topWords = Object.entries(wordMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
  wordData.value = {
    series: topWords.map(([name, count]) => ({
      name,
      textSize: 12 + Math.min(count, 10) * 2, // 词频越高字号越大
    })),
  }

  // 生成气泡图数据（以金额为维度，以 friendName 为主体，统计每个人的收支情况）
  const bubbleMap: Record<string, { inTotal: number, outTotal: number }> = {}

  // 统计收礼（收入）
  giftInList?.forEach((item) => {
    if (item.friendName) {
      if (!bubbleMap[item.friendName]) {
        bubbleMap[item.friendName] = { inTotal: 0, outTotal: 0 }
      }
      bubbleMap[item.friendName].inTotal += item.money || 0
    }
  })

  // 统计送礼（支出）
  giftOutList?.forEach((item) => {
    if (item.friendName) {
      if (!bubbleMap[item.friendName]) {
        bubbleMap[item.friendName] = { inTotal: 0, outTotal: 0 }
      }
      bubbleMap[item.friendName].outTotal += item.money || 0
    }
  })

  // 计算收支差，并按收支差从高到低排序，取前10
  const bubbleArr = Object.entries(bubbleMap)
    .map(([name, obj]) => ({
      name,
      inTotal: obj.inTotal,
      outTotal: obj.outTotal,
    }))
    .sort(a => a.inTotal)
    .slice(0, 5)

  // 组装气泡图数据：x为收入，y为支出，r为收支差绝对值（最小10），name为名称
  // 每个人都是一个气泡
  bubbleData.value = {
    series: bubbleArr.map(item => ({
      name: item.name,
      data: [
        [
          (item.outTotal + item.inTotal) / 20,
          Math.max(10, Math.abs(item.outTotal - item.inTotal) / 30),
          item.inTotal / 100, // r: 收入
          item.name, // 名称
        ],
      ],
    })),
  }
})
</script>

<template>
  <div class="h-full bg-[url('https://liji.poetic.ltd/oss/assets/bg/bg_friend.png')] bg-contain bg-no-repeat">
    <safe-area-inset-top />
    <div class="mx-3 space-y-3">
      <div class="mt-6 text-2xl text-red font-bold">
        统计
      </div>

      <div class="grid grid-cols-2 gap-5 rounded-2xl bg-white p-5">
        <div class="h-16 w-full flex items-center rounded-xl bg-gray-100">
          <div class="mx-3 h-10 w-10 flex flex-shrink-0 rounded-full bg-red">
            <div class="i-tabler-moneybag-plus m-auto h-6 w-6 text-white" />
          </div>
          <div>
            <div class="text-lg font-bold">
              {{ statsData.inTotal }}
            </div>
            <div class="text-xs text-gray">
              收礼
            </div>
          </div>
        </div>
        <div class="h-16 w-full flex items-center rounded-xl bg-gray-100">
          <div class="mx-3 h-10 w-10 flex flex-shrink-0 rounded-full bg-teal">
            <div class="i-tabler-moneybag-minus m-auto h-6 w-6 text-white" />
          </div>
          <div>
            <div class="text-lg font-bold">
              {{ statsData.outTotal }}
            </div>
            <div class="text-xs text-gray">
              送礼
            </div>
          </div>
        </div>
        <div class="h-16 w-full flex items-center rounded-xl bg-gray-100">
          <div class="mx-3 h-10 w-10 flex flex-shrink-0 rounded-full bg-purple">
            <div class="i-carbon-pedestrian-family m-auto h-6 w-6 text-white" />
          </div>
          <div>
            <div class="text-lg font-bold">
              {{ statsData.inCount + statsData.outCount }}
            </div>
            <div class="text-xs text-gray">
              往来次数
            </div>
          </div>
        </div>
        <div class="h-16 w-full flex items-center rounded-xl bg-gray-100">
          <div class="mx-3 h-10 w-10 flex flex-shrink-0 rounded-full bg-blue">
            <div class="i-mingcute-wallet-2-line m-auto h-6 w-6 text-white" />
          </div>
          <div>
            <div class="text-lg font-bold">
              {{ statsData.inTotal - statsData.outTotal }}
            </div>
            <div class="text-xs text-gray">
              收支差
            </div>
          </div>
        </div>
      </div>
      <div class="pt-2 font-bold">
        趋势
      </div>
      <div class="h-64 rounded-2xl bg-white p-1">
        <qiun-data-charts type="area" :opts="chatOpt" :chart-data="lineData"
                          canvas-id="YEHelcwENZpuKFcATpnkQOWdNesmUPAL"
        />
      </div>
      <div class="pt-2 font-bold">
        来源
      </div>
      <div class="h-64 rounded-2xl bg-white p-1">
        <qiun-data-charts type="bubble" :opts="chatOpt" :chart-data="bubbleData" />
      </div>
      <div class="pt-2 font-bold">
        词云
      </div>
      <div class="h-64 rounded-2xl bg-white p-1">
        <qiun-data-charts type="word" :opts="chatOpt" :chart-data="wordData"
                          canvas-id="cRdrJdXetnAqEMJqtudXKJRhxxuwRmjp"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationStyle": "custom",
    "enablePullDownRefresh": true
  }
}
</route>
