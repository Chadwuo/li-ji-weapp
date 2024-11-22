<script setup>
import { add, del, update } from '~/alicloud/services/giftReceive'

const dataSource = ref({
  date: {},
  friendInfo: {},
})
const validInput = computed(() => {
  return dataSource.value.friendInfo.name && dataSource.value.money
})

onLoad((option) => {
  const arg = router.getQueryParse(option)
  dataSource.value = { ...dataSource.value, ...arg }
})

const loading = ref(false)
function onSubmit() {
  loading.value = true
  if (dataSource.value._id) {
    update(dataSource.value).then((res) => {
      if (res.success) {
        uni.$emit('bookPageUpdate')
        uni.showToast({
          title: '更新成功',
          icon: 'success',
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 1000)
      }
    }).finally(() => {
      loading.value = false
    })
  }
  else {
    add(dataSource.value).then((res) => {
      if (res.success) {
        uni.$emit('bookPageUpdate')
        uni.showToast({
          title: '添加成功',
          icon: 'success',
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 1000)
      }
    }).finally(() => {
      loading.value = false
    })
  }
}

function onDel() {
  uni.showModal({
    title: '删除来往记录',
    content: '此操作无法恢复，确定删除？',
    confirmColor: '#F87171',
    success: (res) => {
      if (res.confirm) {
        del(dataSource.value).then((res) => {
          if (res.success) {
            uni.$emit('bookPageUpdate')
            uni.showToast({
              title: '删除成功',
              icon: 'success',
            })
            setTimeout(() => {
              uni.navigateBack()
            }, 1000)
          }
        })
      }
    },
  })
}

function onSelectFriend() {
  uni.navigateTo({
    url: '/pages/friend/select',
    events: {
      acceptDataFromOpenedPage(data) {
        dataSource.value.friendInfo = data
      },
    },
  })
}
function onFriendClick(e) {
  const { _id, name, relation, remarks } = e
  router.push({
    path: '/pages/friend/detail',
    query: { _id, name, relation, remarks },
  })
}
</script>

<template>
  <div class="m-5">
    <div class="rounded-2xl bg-white p-4">
      <uv-form label-position="left" label-width="60">
        <uv-form-item label="亲友">
          <uv-input
            v-model="dataSource.friendInfo.name" border="none" placeholder="点击右侧图标选择亲友"
            :disabled="dataSource._id" disabled-color="#fff"
          />
          <template #right>
            <div v-show="!dataSource._id" class="i-system-uicons-contacts text-lg text-gray" @click="onSelectFriend" />
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
          <div class="flex space-x-4">
            <div v-if="dataSource._id" class="w-40">
              <uv-button text="删除" shape="circle" @click="onDel" />
            </div>
            <div class="w-full">
              <uv-button
                type="primary" shape="circle" text="保存" :loading="loading" :disabled="!validInput"
                loading-mode="circle" @click="onSubmit"
              />
            </div>
          </div>
        </uv-form-item>
      </uv-form>
    </div>
    <div v-if="dataSource.friendInfo._id" class="mt-3 rounded-2xl bg-white p-1">
      <uv-cell title="查看往来记录" is-link :border="false" @click="onFriendClick(dataSource.friendInfo)" />
    </div>
  </div>
  <div class="mt-auto">
    <ad unit-id="adunit-64aefbe92c2dc7bf" />
  </div>
  <uv-safe-bottom />
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "layout": "blank",
  "style": {
    "navigationBarTitleText": "收礼记录"
  }
}
</route>
