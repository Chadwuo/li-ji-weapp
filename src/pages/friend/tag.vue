<script setup lang="ts">
import { useDialog, useNotify } from '@wot-ui/ui'
import { friendCategory } from '@/constants/app'

definePage({
  style: {
    navigationBarTitleText: '亲友标签',
  },
})

const { showNotify } = useNotify()
const dialog = useDialog()
const popupShow = ref(false)
const dataSource = ref<Api.FriendTag>({})
const { friendTags, loadFriendTags } = useFriendTags()

const loadData = async () => {
  await loadFriendTags()
}

onLoad(() => {
  loadData()
})

const openPopup = (item?: Api.FriendTag) => {
  dataSource.value = item ?? {}
  popupShow.value = true
}

const onSave = async () => {
  if (!dataSource.value.name) {
    uni.showToast({
      title: '请输入标签名称',
      icon: 'none',
    })
    return
  }

  dataSource.value.id ? await apiFriendTagPut(dataSource.value) : await apiFriendTagPost(dataSource.value)
  showNotify({ type: 'success', message: '保存成功' })
  popupShow.value = false
  loadData()
}

const onDel = () => {
  dialog.confirm({
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
      <wd-cell v-for="(item, index) in friendTags" :key="index" is-link :title="item.name"
               @click="openPopup(item)"
      />
    </div>
    <div class="mt-3">
      <wd-button icon="add" round block @click="openPopup()">
        添加
      </wd-button>
    </div>
    <wd-popup v-model="popupShow" safe-area-inset-bottom custom-class="rounded-2xl w-3/4">
      <div class="px-5 pt-4 text-center text-lg">
        {{ dataSource.id ? '编辑' : '新建' }}标签
      </div>
      <div class="px-5 pt-4">
        <wd-form :model="dataSource">
          <wd-input v-model="dataSource.name" label="标签名称" placeholder="请输入标签名称" />
        </wd-form>
        <div class="my-5 w-full flex space-x-4">
          <div v-if="dataSource.id">
            <wd-button variant="plain" round block @click="onDel">
              删除
            </wd-button>
          </div>
          <div class="w-full">
            <wd-button round block @click="onSave">
              保存
            </wd-button>
          </div>
        </div>
      </div>
    </wd-popup>
  </div>
</template>

<style lang="scss" scoped></style>
