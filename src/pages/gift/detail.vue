<script setup lang="ts">
import { useDialog } from '@wot-ui/ui'

definePage({
  style: {
    navigationBarTitleText: '人情往来',
  },
})

const dialog = useDialog()
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
  dialog.confirm({
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
  <div class="mx-3" :class="{ memorial: hasMourningWords(dataSource.title) }">
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
        <div class="flex items-center">
          <div class="text-xl">
            {{ dataSource.friendName }}
          </div>
          <div v-if="dataSource.friendRelation" class="ml-1 text-gray">
            @{{ dataSource.friendRelation }}
          </div>
        </div>
        <div>
          {{ dataSource.title }}
        </div>
        <div class="flex items-center space-x-2">
          <money-amount :money="dataSource.money" size="text-3xl" />
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
          <div>{{ generateLunarDate(dataSource.date) }}</div>
        </div>
        <div v-if="dataSource.moneyType === 0" class="flex">
          <div class="w-18 text-gray">
            支付方式
          </div>
          <div>{{ dataSource.payway }}</div>
        </div>
        <div v-if="dataSource.moneyType === 1" class="flex">
          <div class="w-18 text-gray">
            实物内容
          </div>
          <div>{{ dataSource.entityName }}</div>
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
        <div class="w-1/3">
          <wd-button variant="plain" round block @click="onDel">
            删除
          </wd-button>
        </div>
        <div class="w-2/3">
          <wd-button round block @click="onEdit">
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
