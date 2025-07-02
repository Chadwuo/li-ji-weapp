<script setup lang="ts">
const dataSource = ref<Api.Friend>({})
onLoad(async (option) => {
  if (option?.id) {
    uni.setNavigationBarTitle({
      title: '编辑',
    })
    dataSource.value = await apiFriendGet({ id: option.id })
  }
})
const loading = ref(false)
const formRef = ref()
const onSubmit = async () => {
  const { valid } = await formRef.value.validate()
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
}
</script>

<template>
  <div class="mx-3">
    <div class="rounded-2xl bg-white p-2 py-5">
      <wd-form ref="formRef" :model="dataSource">
        <wd-input v-model="dataSource.name" label="姓名" prop="name" clearable placeholder="请输入姓名"
                  :rules="[{ required: true, message: '请填写亲友姓名' }]"
        />
        <wd-select-picker v-model="dataSource.tag" type="radio" label="标签"
                          :columns="useAuthStore().friendTagPickerColumns"
        />
        <wd-input v-model="dataSource.remarks" label="备注" placeholder="请输入内容" />
      </wd-form>
      <wd-button block :loading="loading" @click="onSubmit">
        保存
      </wd-button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "亲友"
  }
}
</route>
