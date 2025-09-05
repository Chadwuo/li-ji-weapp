<script setup lang="ts">
import { useMessage } from 'wot-design-uni'

const message = useMessage()
const dataSource = ref<Api.Gift>({})

const loadData = async () => {
  dataSource.value = await apiGiftGet({ id: dataSource.value.id })
}

onLoad((option) => {
  if (option?.id) {
    dataSource.value.id = option.id
  }
})

onShow(async () => {
  await loadData()
})

const onEdit = () => {
  uni.navigateTo({
    url: `/pages/gift/edit?id=${dataSource.value.id}`,
  })
}

const onDel = () => {
  message.confirm({
    msg: '此操作无法恢复，确定删除？',
    title: '删除来往记录',
  }).then(async () => {
    await apiGiftDelete({ id: dataSource.value.id })
    uni.showToast({
      title: '删除成功',
      icon: 'success',
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1000)
  })
}

const navigateToFriendDetailPage = () => {
  uni.navigateTo({
    url: `/pages/friend/detail?id=${dataSource.value.friendId}`,
  })
}
</script>

<template>
  <div class="mx-3">
    <div class="rounded-2xl bg-white p-5">
      <div class="flex flex-col items-center space-y-3">
        <div class="h-12 w-12 flex flex-shrink-0 rounded-full" :class="[
          dataSource.icon === 'i-tabler-candle'
            ? 'bg-gray-100 text-gray'
            : 'bg-red-50 text-red',
        ]"
        >
          <div class="m-auto h-8 w-8" :class="dataSource.icon" />
        </div>
        <div class="text-xl">
          {{ dataSource.friendName }}
        </div>
        <div class="text-3xl" :class="dataSource.type === 1 ? 'text-red' : 'text-teal'">
          {{ dataSource.type === 1 ? '+' : '-' }}{{ dataSource.money }}
        </div>
        <div>
          {{ dataSource.title }}
        </div>
      </div>
      <div class="mt-6 space-y-2">
        <div class="flex">
          <div class="w-18 text-gray">
            日期
          </div>
          <div>{{ dataSource.date }}</div>
        </div>
        <div class="flex">
          <div class="w-18 text-gray">
            农历
          </div>
          <div>{{ dataSource.lunarDate }}</div>
        </div>
        <div class="flex">
          <div class="w-18 text-gray">
            备注
          </div>
          <div>{{ dataSource.remarks }}</div>
        </div>
        <uv-read-more text-indent="0" show-height="0" close-text="更多" :toggle="true" color="#9ca3af"
                      :shadow-style="{ backgroundImage: 'none' }"
        >
          <div class="space-y-2">
            <div class="flex">
              <div class="w-18 text-gray">
                创建时间
              </div>
              <div>{{ dataSource.createTime }}</div>
            </div>
            <div class="flex">
              <div class="w-18 text-gray">
                更新时间
              </div>
              <div>{{ dataSource.updateTime }}</div>
            </div>
          </div>
        </uv-read-more>
      </div>

      <div class="mt-6 w-full flex space-x-4">
        <div class="w-40">
          <wd-button plain @click="onDel">
            删除
          </wd-button>
        </div>
        <div class="w-full">
          <wd-button block @click="onEdit">
            编辑
          </wd-button>
        </div>
      </div>
    </div>
    <div class="mt-3 rounded-2xl bg-white p-1">
      <wd-cell title="查看往来记录" is-link @click="navigateToFriendDetailPage()" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "送礼记录"
  }
}
</route>
