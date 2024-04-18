<script setup>
import { add, del, update } from '~/alicloud/services/giftOut'

const dataSource = ref({
  date: {},
})
const columns = [
  {
    name: '结婚',
    icon: 'i-bi-postcard-heart',
  },
  {
    name: '宝宝',
    icon: 'i-mingcute-baby-line',
  },
  {
    name: '周岁',
    icon: 'i-icon-park-outline-baby-feet',
  },
  {
    name: '乔迁',
    icon: 'i-tabler-home-move',
  },
  {
    name: '生日',
    icon: 'i-mingcute-cake-line',
  },
  {
    name: '升学',
    icon: 'i-carbon-education',
  },
  {
    name: '压岁',
    icon: 'i-icon-park-outline-red-envelope',
  },
  {
    name: '探望',
    icon: 'i-healthicons-fruits-outline',
  },
  {
    name: '白事',
    icon: 'i-tabler-candle',
  },
  {
    name: '其他',
    icon: 'i-mingcute-wallet-2-line',
  },
]
const calendarRef = ref(null)
const loading = ref(false)

const validInput = computed(() => {
  return dataSource.value.friendName && dataSource.value.date.value && dataSource.value.money && dataSource.value.title
})
onLoad((option) => {
  const arg = router.getQueryParse(option)
  if (arg._id)
    dataSource.value = { ...arg }
})

function onSelectIcont(i) {
  dataSource.value.icon = i.icon
  if (i.name === '其他')
    dataSource.value.title = ''
  else
    dataSource.value.title = i.name
}

const selectedIconStyle = computed(() => {
  return dataSource.value.icon !== 'i-tabler-candle' ? 'text-white bg-red' : 'text-white bg-gray'
})

function onSubmit() {
  loading.value = true
  if (dataSource.value._id) {
    update(dataSource.value).then((res) => {
      if (res.success) {
        uni.$emit('giftOutEditPageUpdate')
        uni.showToast({
          title: '更新成功',
          icon: 'success',
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 2,
          })
        }, 1000)
      }
    }).finally(() => {
      loading.value = false
    })
  }
  else {
    add(dataSource.value).then((res) => {
      if (res.success) {
        // dataSource.value._id = res.result;
        uni.$emit('giftOutEditPageUpdate')
        uni.showToast({
          title: '添加成功',
          icon: 'success',
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 1000)
      }
    }).finally(() => {
      loading.value = false
    })
  }
}

function onDel() {
  uni.showModal({
    title: '删除来往记录',
    content: '此操作无法恢复，确定删除？',
    confirmColor: '#F87171',
    success: (res) => {
      if (res.confirm) {
        del(dataSource.value).then((res) => {
          if (res.success) {
            uni.$emit('giftOutEditPageUpdate')
            uni.showToast({
              title: '删除成功',
              icon: 'success',
            })
            setTimeout(() => {
              uni.navigateBack({
                delta: 2,
              })
            }, 1000)
          }
        })
      }
    },
  })
}

function onSelectFriend() {
  uni.navigateTo({
    url: '/pages/friend/select',
    events: {
      acceptDataFromOpenedPage(data) {
        const { friendName, friendId } = data
        dataSource.value.friendName = friendName
        dataSource.value.friendId = friendId
      },
    },
  })
}

function calendarConfirm(e) {
  const {
    year,
    month,
    date,
    lunar,
  } = e
  console.log(e)

  const selectedDate = {
    year,
    month: Number(month),
    day: date,
    value: `${year}-${Number(month)}-${date}`,
    lunar_day: lunar.IDayCn,
    lunar_month: lunar.IMonthCn,
    lunar_year: `${lunar.gzYear}${lunar.Animal}年`,
    lunar_term: lunar.Term || '',
  }
  dataSource.value.date = selectedDate
  calendarRef.value.close()
}
</script>

<template>
  <div>
    <div class="m-5">
      <div class="grid grid-cols-5 mt-3 justify-items-center gap-2 rounded-2xl bg-white p-4">
        <div v-for="i in columns" :key="i.name" @click="onSelectIcont(i)">
          <div
            class="h-12 w-12 flex rounded-full"
            :class="[i.icon === dataSource.icon ? selectedIconStyle : 'bg-gray-100  text-gray']"
          >
            <div class="m-auto h-8 w-8" :class="i.icon" />
          </div>
          <div class="mt-1 text-center text-sm">
            {{ i.name }}
          </div>
        </div>
      </div>

      <div class="mt-3 rounded-2xl bg-white p-4">
        <uv-form label-position="left" label-width="60">
          <uv-form-item label="日期" @click="calendarRef.open()">
            <uv-input
              v-model="dataSource.date.value" disabled disabled-color="#ffffff" border="none"
              placeholder="请选择日期"
            />
            <template #right>
              <uv-icon name="arrow-right" />
            </template>
          </uv-form-item>
          <uv-form-item label="亲友">
            <uv-input
              v-model="dataSource.friendName" border="none" placeholder="点击右侧图标选择亲友" :disabled="dataSource._id"
              disabled-color="#fff"
            />
            <template #right>
              <div
                v-show="!dataSource._id" class="i-system-uicons-contacts text-lg text-gray"
                @click="onSelectFriend"
              />
            </template>
          </uv-form-item>
          <uv-form-item label="事由">
            <uv-input v-model="dataSource.title" border="none" placeholder="随礼事由" />
          </uv-form-item>
          <uv-form-item label="金额">
            <uv-input v-model="dataSource.money" border="none" placeholder="随礼金额" type="number" />
          </uv-form-item>
          <uv-form-item label="备注">
            <uv-input v-model="dataSource.remarks" border="none" placeholder="请输入内容" />
          </uv-form-item>
          <uv-form-item>
            <div class="flex space-x-4">
              <div v-if="dataSource._id" class="w-40">
                <uv-button text="删除" shape="circle" @click="onDel" />
              </div>
              <div class="w-full">
                <uv-button
                  type="primary" shape="circle" text="保存" :loading="loading" :disabled="!validInput"
                  loading-mode="circle" @click="onSubmit"
                />
              </div>
            </div>
          </uv-form-item>
        </uv-form>
      </div>
    </div>
    <uv-calendars
      ref="calendarRef" lunar color="#F87171" confirm-color="#F87171" :date="dataSource.date.value"
      @confirm="calendarConfirm"
    />
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "layout": "blank",
  "style": {
    "navigationBarTitleText": "送礼记录"
  }
}
</route>
