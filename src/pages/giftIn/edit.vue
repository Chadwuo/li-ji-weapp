<script setup lang="ts">
const loading = ref(false)
const dataSource = ref<Api.GiftIn>({})
const formRef = ref()

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
  const { valid } = await formRef.value.validate()
  if (!valid)
    return
  loading.value = true
  const api = dataSource.value.id ? apiGiftInPut : apiGiftInPost
  const res = await api(dataSource.value)
  if (res.succeeded) {
    uni.navigateBack()
    uni.showToast({
      title: `${dataSource.value.id ? '更新' : '新增'}成功`,
      icon: 'none',
    })
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
    <div class="rounded-2xl bg-white p-2 py-5">
      <wd-form ref="formRef" :model="dataSource">
        <wd-input v-model="dataSource.friendName" label="亲友" prop="friendName" placeholder="点击右侧图标选择亲友"
                  :rules="[{ required: true, message: '请输入亲友姓名' }]"
        >
          <template #suffix>
            <div v-show="!dataSource.id" class="i-hugeicons-contact-01 text-lg text-gray" @click="onSelectFriend" />
          </template>
        </wd-input>
        <wd-input v-model="dataSource.money" label="金额" prop="money" placeholder="随礼金额" type="number"
                  :rules="[{ required: true, message: '请填写随礼金额' }]"
        />
        <wd-input v-model="dataSource.attendance" label="出席" prop="attendance" type="number" placeholder="参加宴席人数" />
        <wd-input v-model="dataSource.remarks" label="备注" placeholder="请输入内容" />
      </wd-form>
      <wd-button block :loading="loading" @click="onSubmit">
        保存
      </wd-button>
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
