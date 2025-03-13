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
const formRef = ref()

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
  const { valid } = await formRef.value.validate()
  if (!valid)
    return
  loading.value = true
  const api = dataSource.value.id ? apiGiftOutPut : apiGiftOutPost
  const res = await api(dataSource.value)
  if (res.succeeded) {
    uni.navigateBack()
    uni.showToast({
      title: '保存成功',
      icon: 'none',
    })
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

    <div class="mt-3 rounded-2xl bg-white px-2 py-5">
      <wd-form ref="formRef" :model="dataSource">
        <wd-input v-model="dataSource.date" label="日期" prop="date" placeholder="请选择日期" readonly :rules="[{ required: true, message: '请选择日期' }]"
                  @click="openCalendar"
        >
          <template #suffix>
            <div class="i-hugeicons-calendar-01 text-base text-gray" />
          </template>
        </wd-input>
        <wd-input v-model="dataSource.friendName" label="亲友" prop="friendName" placeholder="点击右侧图标选择亲友"
                  :rules="[{ required: true, message: '请输入亲友姓名' }]"
        >
          <template #suffix>
            <div v-show="!dataSource.id" class="i-hugeicons-contact-01 text-base text-gray" @click="onSelectFriend" />
          </template>
        </wd-input>
        <wd-input v-model="dataSource.title" label="事由" prop="title" placeholder="随礼事由" :rules="[{ required: true, message: '请填写随礼事由' }]" />
        <wd-input v-model="dataSource.money" label="礼金" prop="money" placeholder="随礼金额" type="number"
                  :rules="[{ required: true, message: '请填写随礼金额' }]"
        />
        <wd-input v-model="dataSource.remarks" label="备注" placeholder="请输入内容" />
      </wd-form>
      <wd-button block :loading="loading" @click="onSubmit">
        保存
      </wd-button>
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
