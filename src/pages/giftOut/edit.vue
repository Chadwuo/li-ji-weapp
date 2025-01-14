<script setup lang="ts">
import { useMessage } from 'wot-design-uni'

const instance: any = getCurrentInstance()
const eventChannel = instance.proxy.getOpenerEventChannel()
const message = useMessage()
const dataSource = ref<Api.GiftOut>({})
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
    name: '福寿',
    icon: 'i-mingcute-blessing-line',
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

const editSuccess = () => {
  eventChannel.emit('editSuccess')
  setTimeout(() => {
    uni.navigateBack()
  }, 600)
}

const onSubmit = async () => {
  loading.value = true
  const api = dataSource.value.id ? apiGiftOutPut : apiGiftOutPost
  const res = await api(dataSource.value)
  if (res.succeeded) {
    uni.showToast({
      title: `${dataSource.value.id ? '更新' : '新增'}成功`,
      icon: 'success',
    })
    editSuccess()
  }

  loading.value = false
}

const onDel = () => {
  message.confirm({
    msg: '此操作无法恢复，确定删除？',
    title: '删除来往记录',
  }).then(async () => {
    const res = await apiGiftOutDelete({ id: dataSource.value.id })
    if (res.succeeded) {
      uni.showToast({
        title: '删除成功',
        icon: 'success',
      })

      editSuccess()
    }
  })
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

const navigateToFriendDetailPage = (id: string) => {
  uni.navigateTo({
    url: `/pages/friend/detail?id=${id}`,
  })
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
        ]">
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
            disabled-color="#fff" />
          <template #right>
            <div v-show="!dataSource.id" class="i-system-uicons-contacts text-lg text-gray" @click="onSelectFriend" />
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
          <div class="w-full flex space-x-4">
            <div v-if="dataSource.id" class="w-40">
              <wd-button plain @click="onDel">
                删除
              </wd-button>
            </div>
            <div class="w-full">
              <wd-button block :loading="loading" loading-color="#F87171" :disabled="!validInput" @click="onSubmit">
                保存
              </wd-button>
            </div>
          </div>
        </uv-form-item>
      </uv-form>
    </div>

    <div v-if="dataSource.friendId" class="mt-3 rounded-2xl bg-white p-1">
      <uv-cell title="查看往来记录" is-link :border="false" @click="navigateToFriendDetailPage(dataSource.friendId)" />
    </div>
    <uv-calendars ref="calendarRef" lunar color="#F87171" confirm-color="#F87171" :date="dataSource.date"
      @confirm="confirmCalendar" />
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">{
  "style": {
    "navigationBarTitleText": "送礼记录"
  }
}</route>
