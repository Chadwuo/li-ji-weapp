<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { add, del, update } from '~/alicloud/services/friend'

const { userInfo } = storeToRefs(useUserStore())
const dataSource = ref({
  date: {},
})
onLoad((option) => {
  dataSource.value = { ...router.getQueryParse(option) }
})
const validInput = computed(() => {
  return dataSource.value.name
})

const loading = ref(false)
function onSubmit() {
  loading.value = true
  if (dataSource.value._id) {
    update(dataSource.value).then((res) => {
      if (res.success) {
        uni.$emit('friendEeditPageUpdate')
        uni.showToast({
          title: '更新成功',
          icon: 'success',
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 2,
          })
        }, 1000)
      }
    }).finally(() => {
      loading.value = false
    })
  }
  else {
    add(dataSource.value).then((res) => {
      if (res.success) {
        uni.$emit('friendEeditPageUpdate')
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
            uni.$emit('friendEeditPageUpdate')
            uni.showToast({
              title: '删除成功',
              icon: 'success',
            })
            setTimeout(() => {
              uni.navigateBack({
                delta: 2,
              })
            }, 1000)
          }
        })
      }
    },
  })
}
</script>

<template>
  <div class="m-5">
    <div class="rounded-2xl bg-white p-4">
      <uv-form label-position="left" label-width="60">
        <uv-form-item label="姓名">
          <uv-input v-model="dataSource.name" border="none" placeholder="请输入姓名" />
        </uv-form-item>
        <uv-form-item label="关系">
          <uv-input v-model="dataSource.relation" border="none" placeholder="请输入内容" />
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
  </div>
  <div v-if="!userInfo.skipAD" class="mt-auto">
    <ad unit-id="adunit-64aefbe92c2dc7bf" />
    <div class="mt-2 flex text-xs text-gray">
      <i class="i-carbon-information-filled mx-3" /><span>广告可以在设置中关闭</span>
    </div>
    <uv-safe-bottom />
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "layout": "blank",
  "style": {
    "navigationBarTitleText": "亲友"
  }
}
</route>
