<script setup lang="ts">
import dayjs from 'dayjs'

const lineData = ref({})
const wordData = ref({})
const roseData = ref({})

const chatOpt = {
  color: ['#F87171', '#2DD4BF', '#FAC858', '#EE6666', '#73C0DE', '#1890FF', '#FC8452', '#9A60B4', '#EA7CCC'],
  dataLabel: false,
  dataPointShape: false,
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

  // 总体统计
  statsData.value = {
    inCount,
    outCount,
    inTotal,
    outTotal,
  }

  // 折线图
  const processGifts = (list: any[]) => {
    return list.reduce((acc, item) => {
      const year = dayjs(item.date).year()
      acc.years.add(year)
      acc.money[year] = (acc.money[year] || 0) + (item.money || 0)
      return acc
    }, { years: new Set<number>(), money: {} as Record<number, number> })
  }

  const inResult = processGifts(giftInList || [])
  const outResult = processGifts(giftOutList || [])
  const yearCategories = Array.from(new Set([...inResult.years, ...outResult.years])).sort((a, b) => a - b)
  const inMoneyByYear = yearCategories.map(year => inResult.money[year] || 0)
  const outMoneyByYear = yearCategories.map(year => outResult.money[year] || 0)

  lineData.value = {
    categories: yearCategories.map(year => year.toString()),
    series: [
      {
        name: '收礼金额',
        data: inMoneyByYear,
      },
      {
        name: '送礼金额',
        data: outMoneyByYear,
      },
    ],
  }

  // 聚合收礼数据（按朋友名称）
  const friendIncomes = (giftInList || []).reduce((acc, item) => {
    const friendName = item.friendName || '未知朋友'
    acc[friendName] = (acc[friendName] || 0) + (item.money || 0)
    return acc
  }, {} as Record<string, number>)

  // 聚合送礼数据（按朋友名称）
  const friendExpenses = (giftOutList || []).reduce((acc, item) => {
    const friendName = item.friendName || '未知朋友'
    acc[friendName] = (acc[friendName] || 0) + (item.money || 0)
    return acc
  }, {} as Record<string, number>)

  // 计算所有朋友的收支差额
  const allFriends = new Set([...Object.keys(friendIncomes), ...Object.keys(friendExpenses)])

  const friendDiffs = Array.from(allFriends).map(friend => ({
    friendName: friend,
    diff: (friendIncomes[friend] || 0) - (friendExpenses[friend] || 0),
  }))

  // 按差额绝对值排序，取前5名
  const top5Friends = friendDiffs
    .sort((a, b) => b.diff - a.diff)
    .slice(0, 5)

  roseData.value = {
    series: [
      {
        data: top5Friends.map(item => ({ name: item.friendName, value: item.diff })),
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
        <qiun-data-charts type="area" :opts="chatOpt" :chart-data="lineData" />
      </div>
      <div>
        收支差前5
      </div>
      <div class="rounded-2xl bg-white p-1">
        <qiun-data-charts type="rose" :opts="chatOpt" :chart-data="roseData" />
      </div>
      <div class="pt-2 font-bold">
        词云
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
