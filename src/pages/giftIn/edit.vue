<script setup lang="ts">
const loading = ref(false)
const dataSource = ref<Api.GiftIn>({})
const validInput = computed(() => {
  return dataSource.value.friendName && dataSource.value.money
})

onLoad((option) => {
  if (option?.id) {
    uni.setNavigationBarTitle({
      title: '编辑',
    })
    apiGiftInGet({ id: option.id }).then((res) => {
      if (res.succeeded && res.data)
        dataSource.value = res.data
    })
  }
  else {
    dataSource.value.giftBookId = option?.bookId
  }
})

const onSubmit = async () => {
  loading.value = true
  const api = dataSource.value.id ? apiGiftInPut : apiGiftInPost
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
</script>

<template>
  <div class="mx-3">
    <div class="rounded-2xl bg-white p-5">
      <uv-form label-position="left" label-width="60">
        <uv-form-item label="亲友">
          <uv-input v-model="dataSource.friendName" border="none" placeholder="点击右侧图标选择亲友" :disabled="dataSource.id"
                    disabled-color="#fff"
          />
          <template #right>
            <div v-show="!dataSource.id" class="i-system-uicons-contacts text-lg text-gray" @click="onSelectFriend" />
          </template>
        </uv-form-item>
        <uv-form-item label="金额">
          <uv-input v-model="dataSource.money" border="none" placeholder="随礼金额" type="number" />
        </uv-form-item>
        <uv-form-item label="出席">
          <uv-input v-model="dataSource.attendance" border="none" placeholder="参加宴席人数" type="number" />
        </uv-form-item>
        <uv-form-item label="备注">
          <uv-input v-model="dataSource.remarks" border="none" placeholder="请输入内容" />
        </uv-form-item>

        <uv-form-item>
          <div class="w-full flex space-x-4">
            <div class="w-full">
              <wd-button block :loading="loading" loading-color="#F87171" :disabled="!validInput" @click="onSubmit">
                保存
              </wd-button>
            </div>
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
    "navigationBarTitleText": "收礼记录"
  }
}
</route>
