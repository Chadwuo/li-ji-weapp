<script setup lang="ts">
import { giftCategory } from '@/constants/app'

// '结婚': 'i-bi-postcard-heart',
// '宝宝': 'i-hugeicons-baby-01',
// '周岁': 'i-icon-park-outline-baby-feet',
// '乔迁': 'i-tabler-home-move',
// '生日': 'i-mingcute-cake-line',
// '升学': 'i-hugeicons-student',
// '福寿': 'i-mingcute-blessing-line',
// '探望': 'i-healthicons-fruits-outline',
// '白事': 'i-tabler-candle',
// '其他': 'i-mingcute-wallet-2-line',
const columns = Object.entries(giftCategory)
  .map(([name, icon]) => ({ name, icon }))
const dataSource = ref<Api.GiftOut>({})

const calendarRef = ref<any>(null)
const loading = ref(false)

const validInput = computed(() => {
  return (
    dataSource.value.friendName
    && dataSource.value.date
    && dataSource.value.money
    && dataSource.value.title
  )
})

onLoad((option) => {
  if (option?.id) {
    uni.setNavigationBarTitle({
      title: '编辑',
    })
    apiGiftOutGet({ id: option.id }).then((res) => {
      if (res.succeeded && res.data)
        dataSource.value = res.data
    })
  }
})

function onSelectIcont(i: any) {
  dataSource.value.icon = i.icon
  if (i.name === '其他')
    dataSource.value.title = ''
  else dataSource.value.title = i.name
}

const selectedIconStyle = computed(() => {
  return dataSource.value.icon !== 'i-tabler-candle'
    ? 'text-white bg-red'
    : 'text-white bg-gray'
})

const onSubmit = async () => {
  loading.value = true
  const api = dataSource.value.id ? apiGiftOutPut : apiGiftOutPost
  const res = await api(dataSource.value)
  if (res.succeeded) {
    uni.showToast({
      title: `${dataSource.value.id ? '更新' : '新增'}成功`,
      icon: 'success',
    })
    uni.navigateBack()
  }

  loading.value = false
}

const onSelectFriend = () => {
  uni.navigateTo({
    url: '/pages/friend/select',
    events: {
      acceptDataFromOpenedPage(e: Api.Friend) {
        dataSource.value.friendId = e.id
        dataSource.value.friendName = e.name
      },
    },
  })
}

const confirmCalendar = (e: any) => {
  const { lunar, fulldate } = e
  dataSource.value.date = fulldate
  dataSource.value.lunarDate = `${lunar.IMonthCn} ${lunar.IDayCn} ${lunar.gzYear}${lunar.Animal}年`
  calendarRef.value.close()
}

const openCalendar = () => {
  calendarRef.value.open()
}
</script>

<template>
  <div class="mx-3">
    <div class="grid grid-cols-5 mt-3 justify-items-center gap-2 rounded-2xl bg-white p-4">
      <div v-for="i in columns" :key="i.name" @click="onSelectIcont(i)">
        <div class="h-12 w-12 flex rounded-full" :class="[
          i.icon === dataSource.icon
            ? selectedIconStyle
            : 'bg-gray-100  text-gray',
        ]"
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
        <uv-form-item label="日期" @click="openCalendar">
          <uv-input v-model="dataSource.date" disabled disabled-color="#ffffff" border="none" placeholder="请选择日期" />
          <template #right>
            <uv-icon name="arrow-right" />
          </template>
        </uv-form-item>
        <uv-form-item label="亲友">
          <uv-input v-model="dataSource.friendName" border="none" placeholder="点击右侧图标选择亲友" :disabled="dataSource.id"
                    disabled-color="#fff"
          />
          <template #right>
            <div v-show="!dataSource.id" class="i-hugeicons-contact-01 text-lg text-gray" @click="onSelectFriend" />
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
          <div class="w-full">
            <wd-button block :loading="loading" loading-color="#F87171" :disabled="!validInput" @click="onSubmit">
              保存
            </wd-button>
          </div>
        </uv-form-item>
      </uv-form>
    </div>

    <uv-calendars ref="calendarRef" lunar color="#F87171" confirm-color="#F87171" :date="dataSource.date"
                  @confirm="confirmCalendar"
    />
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "送礼记录"
  }
}
</route>
