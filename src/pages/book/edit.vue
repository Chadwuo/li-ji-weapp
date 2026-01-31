<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '添加礼簿',
  },
})

const calendarRef = ref<any>(null)
const dataSource = ref<Api.Book>({})
const formRef = ref()
const loading = ref(false)

onLoad(async (option) => {
  if (option?.id) {
    uni.setNavigationBarTitle({
      title: '编辑礼簿',
    })
    dataSource.value = await apiBookGet({ id: option.id })
  }
})

const onSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid)
    return
  loading.value = true
  if (dataSource.value.id) {
    await apiBookPut(dataSource.value)
    uni.navigateBack()
    uni.showToast({
      title: '保存成功',
      icon: 'none',
    })
  }
  else {
    const id = await apiBookPost(dataSource.value)
    uni.redirectTo({
      url: `/pages/book/detail?id=${id}`,
    })
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
  <div class="mx-3 space-y-3" :class="{ memorial: hasMourningWords(dataSource.title) }">
    <div class="rounded-2xl bg-white p-2 py-5">
      <wd-form ref="formRef" :model="dataSource">
        <wd-input v-model="dataSource.date" label="日期" prop="date" placeholder="选择日期" readonly
                  :rules="[{ required: true, message: '请选择日期' }]" @click="openCalendar"
        >
          <template #suffix>
            <div class="i-hugeicons-calendar-01 text-base text-gray" />
          </template>
        </wd-input>
        <wd-input v-model="dataSource.title" label="名称" prop="title" placeholder="例如：新婚礼簿" clearable
                  :rules="[{ required: true, message: '请填写礼簿名称' }]"
        />
        <wd-input v-model="dataSource.cost" label="成本" prop="cost" type="number" placeholder="宴席、伴手礼等费用" />
        <wd-input v-model="dataSource.remarks" label="备注" placeholder="请输入内容" />
      </wd-form>
    </div>
    <wd-button block :loading="loading" @click="onSubmit">
      保存
    </wd-button>
    <div class="text-xs text-gray">
      一场宴席活动中，用来登记所有来宾贺礼的名册，称为礼簿。
    </div>
    <uv-calendars ref="calendarRef" lunar color="#F87171" confirm-color="#F87171" :date="dataSource.date" :close-on-click-overlay="false"
                  @confirm="confirmCalendar"
    />
  </div>
</template>

<style lang="scss" scoped></style>
