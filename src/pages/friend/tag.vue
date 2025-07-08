<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMessage, useNotify } from 'wot-design-uni'
import { friendCategory } from '@/constants/app'

const { showNotify } = useNotify()
const message = useMessage()
const popupShow = ref(false)
const dataSource = ref<Api.FriendTag>({})
const { friendTags } = storeToRefs(useAuthStore())

const loadData = async () => {
  friendTags.value = await apiFriendTagListGet()
}

onLoad(() => {
  loadData()
})

const openPopup = (item?: Api.FriendTag) => {
  dataSource.value = item ?? {}
  popupShow.value = true
}

const onSave = async () => {
  dataSource.value.id ? await apiFriendTagPut(dataSource.value) : await apiFriendTagPost(dataSource.value)
  showNotify({ type: 'success', message: '保存成功' })
  popupShow.value = false
  loadData()
}

const onDel = () => {
  message.confirm({
    msg: '此操作无法恢复，确定删除？',
    title: '删除亲友标签',
  }).then(async () => {
    await apiFriendTagDelete({ id: dataSource.value.id })
    showNotify({ type: 'warning', message: '删除成功' })
    popupShow.value = false
    loadData()
  })
}
</script>

<template>
  <div class="mx-3">
    <div class="rounded-2xl bg-white p-2">
      <wd-cell v-for="(item, index) in friendCategory" :key="index" :title="item" />
      <wd-cell v-for="(item, index) in useAuthStore().friendTags" :key="index" is-link :title="item.name"
               @click="openPopup(item)"
      />
    </div>
    <div class="mt-3">
      <wd-button icon="add" block @click="openPopup()">
        添加
      </wd-button>
    </div>
    <wd-popup v-model="popupShow" safe-area-inset-bottom position="bottom" custom-class="rounded-t-2xl">
      <div class="px-5 pt-4 text-center text-lg">
        {{ dataSource.id ? '编辑' : '新建' }}标签
      </div>
      <div class="px-5 pt-4">
        <wd-form :model="dataSource">
          <wd-input v-model="dataSource.name" label="标签名称" placeholder="请输入标签名称" />
        </wd-form>
        <div class="my-5 w-full flex space-x-4">
          <div v-if="dataSource.id" class="w-40">
            <wd-button plain @click="onDel">
              删除
            </wd-button>
          </div>
          <div class="w-full">
            <wd-button block @click="onSave">
              保存
            </wd-button>
          </div>
        </div>
      </div>
    </wd-popup>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "亲友标签"
  }
}
</route>
