<script setup lang="ts">
const calendarRef = ref<any>(null)
const dataSource = ref<Api.GiftBook>({})
const formRef = ref()
const loading = ref(false)

onLoad((option) => {
  if (option?.id) {
    uni.setNavigationBarTitle({
      title: '更新礼簿',
    })
    apiGiftBookGet({ id: option.id }).then((res) => {
      if (res.succeeded && res.data)
        dataSource.value = res.data
    })
  }
})

const onSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid)
    return
  loading.value = true
  if (dataSource.value.id) {
    const res = await apiGiftBookPut(dataSource.value)
    if (res.succeeded) {
      uni.navigateBack()
      uni.showToast({
        title: '保存成功',
        icon: 'none',
      })
    }
  }
  else {
    const res = await apiGiftBookPost(dataSource.value)
    if (res.succeeded) {
      uni.redirectTo({
        url: `/pages/book/detail?id=${res.data}`,
      })
    }
  }
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
  <div class="mx-3">
    <div class="rounded-2xl bg-white p-2 py-5">
      <wd-form ref="formRef" :model="dataSource">
        <wd-input v-model="dataSource.date" label="日期" prop="date" placeholder="请选择日期" suffix-icon="calendar" readonly :rules="[{ required: true, message: '请选择日期' }]"
                  @click="openCalendar"
        />
        <wd-input v-model="dataSource.title" label="名称" prop="title" placeholder="礼簿名称" clearable :rules="[{ required: true, message: '请填写礼簿名称' }]" />
        <wd-input v-model="dataSource.cost" label="成本" prop="cost" type="number" placeholder="宴席、伴手礼等费用" />
        <wd-input v-model="dataSource.remarks" label="备注" placeholder="请输入内容" />
      </wd-form>
      <div class="my-3 text-xs text-gray">
        一场宴席活动中，用来登记所有来宾贺礼的名册，称为礼簿。
      </div>
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
    "navigationBarTitleText": "新增礼簿"
  }
}
</route>
