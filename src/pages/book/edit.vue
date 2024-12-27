<script setup lang="ts">
const calendarRef = ref<any>(null)
const dataSource = ref<Api.GiftBook>({})
const validInput = computed(() => {
  return dataSource.value?.date && dataSource.value?.title
})
const loading = ref(false)

onLoad((option) => {
  if (option?.id) {
    uni.setNavigationBarTitle({
      title: '编辑',
    })
    apiGiftBookGet({ id: option.id }).then((res) => {
      if (res.succeeded && res.data)
        dataSource.value = res.data
    })
  }
})

const onSubmit = async () => {
  loading.value = true
  const api = dataSource.value.id ? apiGiftBookPut : apiGiftBookPost
  const res = await api(dataSource.value)
  uni.showToast({
    title: `${res.succeeded ? (dataSource.value.id ? '更新' : '新增') : ''}成功`,
    icon: res.succeeded ? 'success' : 'error',
  })
  loading.value = false
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
  <div class="mx-5 mt-3 rounded-2xl bg-white p-4">
    <uv-form label-position="left" label-width="60">
      <uv-form-item label="日期" @click="openCalendar">
        <uv-input v-model="dataSource.date" disabled disabled-color="#ffffff" border="none" placeholder="请选择日期" />
        <template #right>
          <uv-icon name="arrow-right" />
        </template>
      </uv-form-item>
      <uv-form-item label="名称">
        <uv-input v-model="dataSource.title" border="none" placeholder="礼簿名称" />
      </uv-form-item>
      <uv-form-item label="成本">
        <uv-input v-model="dataSource.cost" border="none" placeholder="宴席、伴手礼等费用" type="number" />
      </uv-form-item>
      <uv-form-item label="备注">
        <uv-input v-model="dataSource.remarks" border="none" placeholder="请输入内容" />
      </uv-form-item>
      <uv-form-item>
        <div class="mt-3 text-xs text-gray">
          一场宴席活动中，用来登记所有来宾贺礼的名册，称为礼簿。
        </div>
      </uv-form-item>
      <uv-form-item>
        <div class="w-full">
          <wd-button block :loading="loading" :disabled="!validInput" @click="onSubmit">
            保存
          </wd-button>
        </div>
      </uv-form-item>
    </uv-form>
  </div>

  <uv-calendars ref="calendarRef" lunar color="#F87171" confirm-color="#F87171" :date="dataSource.date"
    @confirm="confirmCalendar" />
</template>

<style lang="scss" scoped></style>

<route lang="json">{
  "layout": "blank",
  "style": {
    "navigationBarTitleText": "新增"
  }
}</route>
