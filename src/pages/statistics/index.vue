<script setup lang="ts">
const columnData = ref({})
const lineData = ref({})
const wordData = ref({})
const bubbleData = ref({})

const chatOpt = {
  color: ['#f87171', '#4ade80', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
  dataLabel: false,
  dataPointShape: false,
  yAxis: {
    gridType: 'dash',
  },
  extra: {
    line: {
      type: 'curve',
      width: 2,
      activeType: 'hollow',
      onShadow: true,
      animation: 'horizontal',
    },
    column: {
      type: 'group',
      width: 12,
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
          name: '目标值',
          data: [35, 136, 31, 31, 33, 13, 34],
        },
        {
          name: '完成量',
          data: [18, 27, 21, 24, 6, 28],
        },
      ],
    }
    lineData.value = {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      series: [
        {
          name: '成交量A',
          data: [0, 0, 45, 95, 125, 95, 125, 95, 125, 15, 45, 15],
          setShadow: [
            3,
            8,
            10,
            '#f87171',
          ],
        },
        {
          name: '成交量C',
          data: [100, 0, 0, 0, 20, 0, 0, 60, 0, 0, 0, 0],
          setShadow: [
            3,
            8,
            10,
            '#4ade80',
          ],
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
          2025
        </div>
        <div class="mt-4 flex items-center justify-between">
          <div class="text-2xl text-red font-bold">
            统计
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5 rounded-2xl bg-white p-5">
        <div class="h-12 w-full rounded-xl bg-gray-100">
          1
        </div>
        <div class="h-12 w-full rounded-xl bg-gray-100">
          1
        </div>
        <div class="h-12 w-full rounded-xl bg-gray-100">
          1
        </div>
        <div class="h-12 w-full rounded-xl bg-gray-100">
          1
        </div>
      </div>
      <div>
        <div class="py-2 font-bold">
          统计
        </div>
        <qiun-data-charts class="h-64 rounded-2xl bg-white" type="column" :opts="chatOpt" :chart-data="columnData"
                          :canvas2d="true" canvas-id="yYyVHjIKjesnOyIwPugazNNUgJXnomSt"
        />
      </div>
      <div>
        <div class="py-2 font-bold">
          趋势
        </div>
        <qiun-data-charts class="h-64 rounded-2xl bg-white" type="line" :opts="chatOpt" :chart-data="lineData"
                          :canvas2d="true" canvas-id="YEHelcwENZpuKFcATpnkQOWdNesmUPAL"
        />
      </div>
      <div>
        <div class="py-2 font-bold">
          来源
        </div>
        <qiun-data-charts class="h-64 rounded-2xl bg-white" type="bubble" :opts="chatOpt" :chart-data="bubbleData" />
      </div>
      <div>
        <div class="py-2 font-bold">
          词云
        </div>
        <qiun-data-charts class="h-64 rounded-2xl bg-white" type="word" :opts="chatOpt" :chart-data="wordData"
                          :canvas2d="true" canvas-id="cRdrJdXetnAqEMJqtudXKJRhxxuwRmjp"
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
