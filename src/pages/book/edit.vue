<script setup lang="ts">
const calendarRef = ref(null)
const dataSource = ref<Api.GiftBook>()
const validInput = computed(() => {
  return dataSource.value?.date && dataSource.value?.title
})
const loading = ref(false)

// onLoad 接受 A 页面传递的参数
onLoad((option) => {
  if (option?.id) {
    wx.setNavigationBarTitle({
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
  const api = dataSource.value?.id ? apiGiftBookPut : apiGiftBookPost
  const res = await api(dataSource.value)
  uni.showToast({
    title: `${res.succeeded ? (dataSource.value?.id ? '更新' : '新增') : ''}成功`,
    icon: res.succeeded ? 'success' : 'error',
  })
  loading.value = false
}

const onDel = () => {
  wx.showModal({
    title: '删除礼簿',
    content: '该礼簿所有来往记录都将被删除，确定删除？',
    confirmColor: '#F87171',
    success: async (e) => {
      if (!e.confirm)
        return
      const res = await apiGiftBookDelete(dataSource.value)
      if (res.succeeded) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 2,
          })
        }, 1000)
      }
      else {
        wx.showToast({
          title: res.errors,
          icon: 'error',
        })
      }
    },
  })
}

const confirmCalendar = (e: any) => {
  const { year, month, date, lunar } = e

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

const openCalendar = () => {
  calendarRef.value?.open()
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
        <div class="flex space-x-4">
          <div v-if="dataSource.id" class="w-40">
            <uv-button text="删除" shape="circle" @click="onDel" />
          </div>
          <div class="w-full">
            <uv-button type="primary" shape="circle" text="保存" :loading="loading" :disabled="!validInput"
                       loading-mode="circle" @click="onSubmit"
            />
          </div>
        </div>
      </uv-form-item>
    </uv-form>
  </div>
  <div class="mt-auto">
    <ad unit-id="adunit-64aefbe92c2dc7bf" />
  </div>
  <uv-safe-bottom />
  <uv-calendars ref="calendarRef" lunar color="#F87171" confirm-color="#F87171" :date="dataSource.date"
                @confirm="confirmCalendar"
  />
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "layout": "blank",
  "style": {
    "navigationBarTitleText": "新增"
  }
}
</route>
