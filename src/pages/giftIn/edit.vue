<script setup lang="ts">
import { useMessage } from 'wot-design-uni'

const message = useMessage()
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
})

const onSubmit = async () => {
  loading.value = true
  const api = dataSource.value.id ? apiGiftInPut : apiGiftInPost
  const res = await api(dataSource.value)
  uni.showToast({
    title: `${res.succeeded ? (dataSource.value.id ? '更新' : '新增') : ''}成功`,
    icon: res.succeeded ? 'success' : 'error',
  })
  loading.value = false
  setTimeout(() => {
    uni.navigateBack()
  }, 1000)
}

const onDel = () => {
  message.confirm({
    msg: '此操作无法恢复，确定删除？',
    title: '删除来往记录',
  }).then(async () => {
    const res = await apiGiftInDelete({ id: dataSource.value.id })
    if (res.succeeded) {
      uni.showToast({
        title: '删除成功',
        icon: 'success',
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 1000)
    }
    else {
      uni.showToast({
        title: res.errors,
        icon: 'error',
      })
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

const onFriendClick = (id: number) => {
  uni.navigateTo({
    url: '/pages/friend/detail',
  })
}
</script>

<template>
  <div class="m-5">
    <div class="rounded-2xl bg-white p-4">
      <uv-form label-position="left" label-width="60">
        <uv-form-item label="亲友">
          <uv-input v-model="dataSource.friendName" border="none" placeholder="点击右侧图标选择亲友" :disabled="dataSource.id"
            disabled-color="#fff" />
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
            <div v-if="dataSource.id" class="w-40">
              <wd-button plain @click="onDel">
                删除
              </wd-button>
            </div>
            <div class="w-full">
              <wd-button block :loading="loading" :disabled="!validInput" @click="onSubmit">
                保存
              </wd-button>
            </div>
          </div>
        </uv-form-item>
      </uv-form>
    </div>
    <div v-if="dataSource.friendId" class="mt-3 rounded-2xl bg-white p-1">
      <uv-cell title="查看往来记录" is-link :border="false" @click="onFriendClick(dataSource.friendId)" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">{
  "layout": "blank",
  "style": {
    "navigationBarTitleText": "收礼记录"
  }
}</route>
