<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { add, del, delFamilyMember } from '@/alicloud/services/family'

const { userInfo } = storeToRefs(useUserStore())

const actionSheetRef = ref(null)
const loading = ref(false)
const actionSheetList = ref([])

async function onCreate() {
  loading.value = true
  await add().then(async (res) => {
    if (res.success)
      await useUserStore().getUserInfo()
  }).finally(() => {
    loading.value = false
  })
}

function onClick(i) {
  if (i.relation === '组织者') {
    actionSheetList.value = [
      {
        name: '解散',
        subname: '移除全部家庭成员并解散家庭',
        data: i,
      },
    ]
  }
  else {
    actionSheetList.value = [
      {
        name: '删除',
        subname: '从你的家庭中移除此成员',
        data: i,
      },
    ]
  }

  actionSheetRef.value.open()
}

async function onSelectedAction(e) {
  const { data, name } = e
  e.loading = true
  if (name === '删除') {
    delFamilyMember({ _id: data._id }).then(async (res) => {
      if (res.success) {
        await useUserStore().getUserInfo()
        actionSheetRef.value.close()
      }
    }).finally(() => {
      e.loading = false
    })
  }
  if (name === '解散') {
    del({ familyId: data.familyId }).then(async (res) => {
      if (res.success) {
        await useUserStore().getUserInfo()
        actionSheetRef.value.close()
      }
    }).finally(() => {
      e.loading = false
    })
  }
}

onShareAppMessage(() => {
  const familyId = userInfo.value.familyMembers[0].familyId
  const word = `${userInfo.value.nickName}邀请你一起记录家庭中的人情往来`
  const avatarUrl = userInfo.value.avatarUrl
  return {
    title: '和我一起记录家庭中的人情往来',
    path: `/pages/family/invite?familyId=${familyId}&word=${word}&avatarUrl=${avatarUrl}`,
    imageUrl: '/static/share2.png',
  }
})
</script>

<template>
  <div class="mt-3 h-full flex flex-col">
    <div v-if="!userInfo.familyMembers" class="rounded-2xl bg-white p-4 space-y-2xl">
      <div class="text-center">
        <img src="/static/home.svg">
        <div class="mt-5 text-xl font-bold">
          家人共享
        </div>
      </div>

      <div class="space-y-xl">
        <div class="flex items-center">
          <div class="m-3 text-red">
            <i class="i-tabler-device-mobile-share text-3xl" />
          </div>
          <div>
            <div class="font-bold">
              协同共享记账
            </div>
            <div class="text-sm text-gray">
              安全共享你的数据，使亲友和你共同记录家庭人情往来
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <div class="m-3 text-red">
            <i class="i-tabler-lock-heart text-3xl" />
          </div>
          <div>
            <div class="font-bold">
              私密且安全
            </div>
            <div class="text-sm text-gray">
              信息会加密，你可以随时停止共享
            </div>
          </div>
        </div>
      </div>

      <div class="w-full">
        <uv-button
          type="primary" shape="circle" text="与他人共享" :loading="loading" loading-mode="circle"
          @click="onCreate"
        />
      </div>
    </div>
    <div v-else>
      <div class="rounded-2xl bg-white p-1">
        <div class="rounded-2xl bg-white px-1 py-3 space-y-3">
          <template v-for="i in userInfo.familyMembers" :key="i._id">
            <uv-cell :title="i.user.nickName" :label="i.relation" :border="false" is-link @click="onClick(i)">
              <template #icon>
                <div class="mr-3">
                  <uv-avatar :src="i.user.avatarUrl" />
                </div>
              </template>
            </uv-cell>
          </template>
        </div>
      </div>
      <div class="mt-3">
        <button openType="share" icon="plus" class="uv-reset-button rounded-2xl bg-white p-2">
          <div class="flex items-center justify-center text-red">
            <div class="i-carbon-add text-2xl" /> 邀请家庭成员
          </div>
        </button>
      </div>
    </div>
    <Advertisement class="mt-auto" />
  </div>
  <uv-action-sheet
    ref="actionSheetRef" :actions="actionSheetList" :safe-area-inset-bottom="true"
    :close-on-click-action="false" cancel-text="取消" round="1rem" @select="onSelectedAction"
  />
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "家人共享"
  }
}
</route>
