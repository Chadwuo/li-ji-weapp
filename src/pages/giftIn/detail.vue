<script setup lang="ts">
import { useMessage } from 'wot-design-uni'

const message = useMessage()
const dataSource = ref<Api.GiftIn>({})

const loadData = async () => {
  apiGiftInGet({ id: dataSource.value.id }).then((res) => {
    if (res.succeeded && res.data)
      dataSource.value = res.data
  })
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
    url: `/pages/giftIn/edit?id=${dataSource.value.id}`,
  })
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
      uni.navigateBack()
    }
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
      <div class="space-y-3">
        <div class="text-center text-xl">
          {{ dataSource.friendName }}
        </div>
        <div class="text-center text-3xl text-red">
          +{{ dataSource.money }}
        </div>
        <div class="text-center">
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
            出席
          </div>
          <div>{{ dataSource.attendance }}</div>
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
        "navigationBarTitleText": "收礼记录"
    }
}
</route>
