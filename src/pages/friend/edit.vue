<script setup lang="ts">
import type { FormInstance, FormSchema } from '@wot-ui/ui/components/wd-form/types'

definePage({
  style: {
    navigationBarTitleText: '亲友',
  },
})
const dataSource = ref<Api.Friend>({
  tagList: [],
})
const { friendTagPickerColumns, loadFriendTags } = useFriendTags()
onLoad(async (option) => {
  await loadFriendTags()
  if (option?.id) {
    uni.setNavigationBarTitle({
      title: '编辑',
    })
    dataSource.value = await apiFriendGet({ id: option.id })
    dataSource.value.tagList ||= []
  }
})
const loading = ref(false)
const formRef = ref<FormInstance>()
const onSubmit = async () => {
  formRef.value?.validate().then(async ({ valid }: { valid: boolean }) => {
    if (valid) {
      loading.value = true
      const api = dataSource.value.id ? apiFriendPut : apiFriendPost
      await api(dataSource.value)
      uni.navigateBack()
      uni.showToast({
        title: '保存成功',
        icon: 'none',
      })
      loading.value = false
    }
  })
}

const rules: FormSchema = {
  validate(formModel) {
    const issues = []
    if (!formModel.name) {
      issues.push({ path: ['name'], message: '请填写亲友姓名' })
    }
    return issues
  },
  isRequired(path: string) {
    return new Set(['name']).has(path)
  },
}
const tagPickerVisible = ref(false)
</script>

<template>
  <div class="mx-3 space-y-3">
    <div class="rounded-2xl bg-white p-2">
      <wd-form ref="formRef" layout="vertical" :model="dataSource" center :schema="rules">
        <wd-form-item title="姓名" prop="name" required>
          <wd-input v-model="dataSource.name" clearable placeholder="请输入姓名" :compact="false" />
        </wd-form-item>
        <wd-form-item title="关系" prop="relation">
          <wd-input v-model="dataSource.relation" placeholder="例如：舅舅" :compact="false" />
        </wd-form-item>
        <wd-form-item title="标签" prop="tagList">
          <div class="w-full">
            <wd-select-picker
              v-model="dataSource.tagList!"
              v-model:visible="tagPickerVisible"
              :columns="friendTagPickerColumns"
            />
            <div class="flex items-center rounded-lg bg-[#F2F3F5] p-2" @click="tagPickerVisible = true">
              <div class="friend-tag-trigger__value" :class="{ 'is-placeholder': !dataSource.tagList?.length }">
                {{ dataSource.tagList?.length ? dataSource.tagList.join('、') : '请选择标签' }}
              </div>
              <wd-icon name="right" />
            </div>
          </div>
        </wd-form-item>
        <wd-form-item title="备注">
          <wd-textarea v-model="dataSource.remarks" placeholder="请输入内容" :compact="false" />
        </wd-form-item>
      </wd-form>
    </div>
    <wd-button :loading="loading" round block @click="onSubmit">
      保存
    </wd-button>
  </div>
</template>

<style lang="scss" scoped>
.friend-tag-trigger {
  display: flex;
  align-items: center;
  border: 1rpx solid #dadbde;
  border-radius: 8rpx;
  background: #fff;
  color: #303133;
  font-size: 15px;
  padding: 6px 9px;
}

.friend-tag-trigger__value {
  min-width: 0;
  flex: 1;
  line-height: 26px;
}

.friend-tag-trigger__value.is-placeholder {
  color: #c0c4cc;
}
</style>
