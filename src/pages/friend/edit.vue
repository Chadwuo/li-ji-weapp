<script setup lang="ts">
import { friendCategory } from '@/constants/app'

const columns = friendCategory.map(i => ({ name: i, value: i }))
const dataSource = ref<Api.Friend>({})
onLoad((option) => {
  if (option?.id) {
    uni.setNavigationBarTitle({
      title: '编辑',
    })
    apiFriendGet({ id: option.id }).then((res) => {
      if (res.succeeded && res.data)
        dataSource.value = res.data
    })
  }
})
const validInput = computed(() => {
  return dataSource.value.name
})

const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  const api = dataSource.value.id ? apiFriendPut : apiFriendPost
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
</script>

<template>
  <div class="mx-3">
    <div class="rounded-2xl bg-white p-4">
      <uv-form label-position="left" label-width="60">
        <uv-form-item label="姓名">
          <uv-input v-model="dataSource.name" border="none" placeholder="请输入姓名" />
        </uv-form-item>
        <uv-form-item label="关系">
          <!-- <uv-input v-model="dataSource.relation" border="none" placeholder="请输入内容" /> -->
          <wd-radio-group v-model="dataSource.relation" cell shape="button">
            <wd-radio v-for="item in columns" :key="item.value" :value="item.value">
              {{ item.name }}
            </wd-radio>
          </wd-radio-group>
        </uv-form-item>
        <uv-form-item label="备注">
          <uv-input v-model="dataSource.remarks" border="none" placeholder="请输入内容" />
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
