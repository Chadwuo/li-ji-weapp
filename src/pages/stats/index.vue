<script setup lang="ts">
import dayjs from 'dayjs'

const lineData = ref({})
const wordData = ref({})
const roseData = ref({})
const radarData = ref({})

const chatOpt = {
  color: ['#F87171', '#2DD4BF', '#FAC858', '#EE6666', '#73C0DE', '#1890FF', '#FC8452', '#9A60B4', '#EA7CCC'],
  dataLabel: false,
  dataPointShape: false,
  xAxis: {
    labelCount: '6',
    title: '年',
  },
  yAxis: {
    gridType: 'dash',
    showTitle: true,
    data: [
      {
        title: '金额（千元）',
      },
    ],
  },
  extra: {
    area: {
      type: 'curve',
      gradient: true,
    },
    rose: {
      type: 'area',
      border: true,
      borderWidth: 2,
      borderColor: '#FFFFFF',
    },
  },
}

const statsData = ref({
  inCount: 0,
  outCount: 0,
  inTotal: 0,
  outTotal: 0,
})

onShow(async () => {
  const { bookItems, gifts } = await apiStatsDashboardGet()

  const rawData: { friendName: string, money: number, title: string, date: string, type: string | number }[] = []

  bookItems.forEach((item) => {
    rawData.push({
      friendName: item.friendName || '未知',
      money: item.money || 0,
      title: item.title || '未知',
      date: item.date || '',
      type: 'in',
    })
  })
  gifts.forEach((item) => {
    rawData.push({
      friendName: item.friendName || '未知',
      money: item.money || 0,
      title: item.title || '未知',
      date: item.date || '',
      type: item.type === 1 ? 'in' : 'out',
    })
  })

  // 总体统计
  statsData.value = {
    inCount: rawData.filter(item => item.type === 'in').length,
    outCount: rawData.filter(item => item.type === 'out').length,
    inTotal: rawData.filter(item => item.type === 'in').reduce((acc, curr) => acc + (curr.money || 0), 0),
    outTotal: rawData.filter(item => item.type === 'out').reduce((acc, curr) => acc + (curr.money || 0), 0),
  }

  // 折线图数据处理
  const yearMap: Record<number, { in: number, out: number }> = {}

  // 处理收礼数据
  if (rawData && rawData.length) {
    for (let i = 0; i < rawData.length; i++) {
      const item = rawData[i]
      const year = dayjs(item.date).year()
      if (!yearMap[year])
        yearMap[year] = { in: 0, out: 0 }
      if (item.type === 'in')
        yearMap[year].in += item.money || 0
      else
        yearMap[year].out += item.money || 0
    }
  }

  // 提取所有年份并排序
  const yearCategories = Object.keys(yearMap)
    .map(Number)
    .sort((a, b) => a - b)

  // 构建折线图数据
  lineData.value = {
    categories: yearCategories.map(year => year.toString()),
    series: [
      {
        name: '收礼金额',
        data: yearCategories.map(year => yearMap[year].in / 1000),
      },
      {
        name: '送礼金额',
        data: yearCategories.map(year => yearMap[year].out / 1000),
      },
    ],
  }

  // 统计所有朋友的收支差，并取前5
  const friendMap: Record<string, number> = {}
  // 使用rawData数据统计每个朋友的收支差
  if (rawData && rawData.length) {
    for (let i = 0; i < rawData.length; i++) {
      const item = rawData[i]
      const friendName = item.friendName || '未知朋友'
      // 根据类型决定是加还是减金额
      if (item.type === 'in') {
        friendMap[friendName] = (friendMap[friendName] || 0) + (item.money || 0)
      }
      else {
        friendMap[friendName] = (friendMap[friendName] || 0) - (item.money || 0)
      }
    }
  }

  // 转为数组并排序，取前5
  const top5Friends = Object.entries(friendMap)
    .map(([friendName, diff]) => ({ friendName, diff }))
    .sort((a, b) => b.diff - a.diff)
    .slice(0, 5)

  roseData.value = {
    series: [
      {
        data: top5Friends.map(item => ({ name: item.friendName, value: item.diff })),
      },
    ],
  }

  // 定义雷达图分类
  const radarCategories = ['结婚', '宝宝', '乔迁', '升学', '其他']
  const radarMap: Record<string, number> = Object.fromEntries(radarCategories.map(key => [key, 0]))

  // 遍历gifts，统计每个分类出现的次数
  rawData.filter(item => item.type === 'out').forEach((item) => {
    const title = item.title || ''
    // 查找是否属于已知分类
    const found = radarCategories.find(cat => title.includes(cat))
    if (found) {
      radarMap[found] += item.money || 0
    }
    else {
      radarMap['其他'] += item.money || 0
    }
  })

  radarData.value = {
    categories: radarCategories,
    series: [
      {
        name: '送礼',
        data: radarCategories.map(cat => radarMap[cat]),
      },
    ],
  }

  // 生成词云数据（统计送礼/收礼对象出现频率）
  const wordMap: Record<string, number> = {}
  rawData.forEach((item) => {
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
})
</script>

<template>
  <div class="h-full bg-[url('https://liji.poetic.ltd/oss/assets/bg/bg_friend.png')] bg-contain bg-no-repeat">
    <safe-area-inset-top />
    <div class="mx-3 space-y-3">
      <div class="text-2xl text-red font-bold">
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
        收支趋势
      </div>
      <div class="h-64 rounded-2xl bg-white p-1">
        <qiun-data-charts type="area" :opts="chatOpt" :chart-data="lineData" />
      </div>
      <div class="pt-2 font-bold">
        收入排行榜
      </div>
      <div class="rounded-2xl bg-white p-1">
        <qiun-data-charts type="rose" :opts="chatOpt" :chart-data="roseData" />
      </div>
      <div class="pt-2 font-bold">
        送礼维度
      </div>
      <div class="rounded-2xl bg-white p-1">
        <qiun-data-charts type="radar" :opts="chatOpt" :chart-data="radarData" />
      </div>
      <div class="pt-2 font-bold">
        年度词云
      </div>
      <div class="h-64 rounded-2xl bg-white p-1">
        <qiun-data-charts type="word" :opts="chatOpt" :chart-data="wordData" />
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
