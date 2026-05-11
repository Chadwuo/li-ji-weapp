<script setup lang="ts">
import type { FormInstance, FormSchema } from '@wot-ui/ui/components/wd-form/types'
import dayjs from 'dayjs'

definePage({
  style: {
    navigationBarTitleText: '添加礼簿',
  },
})

const dataSource = ref<Api.Book>({
  date: dayjs().format('YYYY-MM-DD'),
})
const formRef = ref<FormInstance>()
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
  formRef.value?.validate().then(async ({ valid }: { valid: boolean }) => {
    if (valid) {
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
  })
}

const rules: FormSchema = {
  // 校验逻辑
  validate(formModel) {
    const issues = []
    if (!formModel.date) {
      issues.push({ path: ['date'], message: '请选择日期时间' })
    }
    if (!formModel.title) {
      issues.push({ path: ['title'], message: '请填写礼簿名称' })
    }
    return issues
  },
  // 用于推导必填星号
  isRequired(path: string) {
    return new Set(['date', 'title']).has(path)
  },
}
</script>

<template>
  <div class="mx-3 space-y-3" :class="{ memorial: hasMourningWords(dataSource.title) }">
    <div class="rounded-2xl bg-white p-2">
      <wd-form ref="formRef" layout="vertical" :model="dataSource" center :schema="rules">
        <wd-form-item title="日期时间" prop="date" required>
          <div class="w-full">
            <DatePicker v-model:date="dataSource.date" />
          </div>
        </wd-form-item>
        <wd-form-item title="礼簿名称" prop="title" required>
          <wd-input v-model="dataSource.title" placeholder="例如：新婚礼簿" clearable :compact="false" />
        </wd-form-item>
        <wd-form-item title="是否有宴席" layout="horizontal" value-align="right">
          <wd-switch v-model="dataSource.isBanquet" class="ms-auto" active-color="#F87171" />
        </wd-form-item>
        <wd-form-item v-if="dataSource.isBanquet" title="成本">
          <wd-input v-model="dataSource.cost" type="number" placeholder="宴席、伴手礼等费用" :compact="false" />
        </wd-form-item>
        <wd-form-item title="备注">
          <wd-textarea v-model="dataSource.remarks" placeholder="添加细节，让回忆更完整" :compact="false" />
        </wd-form-item>
      </wd-form>
    </div>
    <wd-button :loading="loading" round block @click="onSubmit">
      保存
    </wd-button>
    <div class="text-xs text-gray">
      一场宴席活动中，用来登记所有来宾贺礼的名册，称为礼簿。
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
