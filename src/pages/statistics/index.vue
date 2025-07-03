<script setup lang="ts">
const columnData = ref({})
const lineData = ref({})
const wordData = ref({})
const bubbleData = ref({})

const chatOpt = {
  color: ['#f87171', '#2dd4bf', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
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
    column: {
      type: 'group',
      width: 10,
    },
    bubble: {
      border: 1,
    },
  },
}

onMounted(() => {
  setTimeout(() => {
    columnData.value = {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      series: [
        {
          name: '收礼',
          data: [35, 136, 31, 31, 33, 13, 34],
        },
        {
          name: '送礼',
          data: [18, 27, 21, 24, 6, 28],
        },
      ],
    }
    lineData.value = {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      series: [
        {
          name: '收礼',
          data: [0, 0, 20, 0, 80, 0, 24, 0, 22, 0, 0, 0],
        },
        {
          name: '送礼',
          data: [0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
    }

    wordData.value = {
      series: [
        {
          name: '跨全端图表',
          textSize: 25,
          data: undefined,
        },
        {
          name: '微信小程序',
          textSize: 20,
          data: undefined,
        },
        {
          name: '支付宝小程序',
          textSize: 20,
          data: undefined,
        },
        {
          name: '百度小程序',
          textSize: 20,
          data: undefined,
        },
        {
          name: 'QQ小程序',
          textSize: 20,
          data: undefined,
        },
        {
          name: '头条小程序',
          textSize: 20,
          data: undefined,
        },
        {
          name: '抖音小程序',
          textSize: 20,
          data: undefined,
        },
        {
          name: '360小程序',
          textSize: 20,
          data: undefined,
        },
        {
          name: '跨全端',
          textSize: 10,
          data: undefined,
        },
        {
          name: '跨全端',
          textSize: 12,
          data: undefined,
        },
        {
          name: '跨全端',
          textSize: 10,
          data: undefined,
        },
        {
          name: '跨全端',
          textSize: 12,
          data: undefined,
        },
        {
          name: '跨全端',
          textSize: 10,
          data: undefined,
        },
        {
          name: '跨全端',
          textSize: 12,
          data: undefined,
        },
        {
          name: '跨全端',
          textSize: 10,
          data: undefined,
        },
        {
          name: '跨全端',
          textSize: 12,
          data: undefined,
        },
      ],
    }

    bubbleData.value = {
      series: [
        {
          name: '气泡一',
          data: [[95, 95, 23, '标题1']],
        },
        {
          name: '气泡二',
          data: [[130, 30, 30, '标题3']],
        },
      ],
    }
  }, 500)
})
</script>

<template>
  <div class="h-full bg-[url('https://liji.poetic.ltd/oss/assets/bg/bg_friend.png')] bg-contain bg-no-repeat">
    <safe-area-inset-top />
    <div class="mx-3 space-y-3">
      <div>
        <div>
          <!-- 2025 -->
        </div>
        <div class="mt-4 flex items-center justify-between">
          <div class="text-2xl text-red font-bold">
            统计
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5 rounded-2xl bg-white p-5">
        <div class="h-16 w-full flex items-center rounded-xl bg-gray-100">
          <div class="mx-3 h-10 w-10 flex flex-shrink-0 rounded-full bg-red">
            <div class="i-tabler-moneybag-plus m-auto h-6 w-6 text-white" />
          </div>
          <div>
            <div class="text-lg font-bold">
              2456
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
              2456
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
              2456
            </div>
            <div class="text-xs text-gray">
              亲友人数
            </div>
          </div>
        </div>
        <div class="h-16 w-full flex items-center rounded-xl bg-gray-100">
          <div class="mx-3 h-10 w-10 flex flex-shrink-0 rounded-full bg-blue">
            <div class="i-mingcute-wallet-2-line m-auto h-6 w-6 text-white" />
          </div>
          <div>
            <div class="text-lg font-bold">
              24562
            </div>
            <div class="text-xs text-gray">
              收支差
            </div>
          </div>
        </div>
      </div>
      <div class="pt-2 font-bold">
        统计
      </div>
      <div class="h-64 rounded-2xl bg-white">
        <qiun-data-charts type="column" :opts="chatOpt" :chart-data="columnData"
                          canvas-id="yYyVHjIKjesnOyIwPugazNNUgJXnomSt"
        />
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
        年度词云
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
