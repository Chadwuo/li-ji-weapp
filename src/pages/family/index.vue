<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMessage } from 'wot-design-uni'

const message = useMessage()
const { userFamilys, userInfo } = storeToRefs(useAuthStore())
const actionSheetShow = ref(false)
const actionSheetList = ref()
const loading = ref(false)

const loadData = async () => {
  const res = await apiUserFamilyListGet()
  if (res.succeeded) {
    userFamilys.value = res.data
  }
}

const onCreate = async () => {
  loading.value = true
  const res = await apiUserFamilyPost({
    role: '组织者',
  })
  if (res.succeeded) {
    loadData()
  }
  loading.value = false
}

onLoad(() => {
  loadData()
})

onPullDownRefresh(async () => {
  await loadData()
  uni.stopPullDownRefresh()
})

function onClick(i: Api.UserFamily) {
  if (i.userId === userInfo.value?.id) {
    actionSheetList.value = [
      {
        name: '退出家庭',
        subname: '退出后将无法共享数据',
        data: i,
      },
    ]
  }
  else {
    actionSheetList.value = [
      {
        name: '移除成员',
        subname: `确定从家庭中移除“${i.nickName}”？`,
        data: i,
      },
    ]
  }

  actionSheetShow.value = true
}

async function onSelectedAction(e: any) {
  e.loading = true
  const { data } = e.item
  const res = await apiUserFamilyDelete({ userId: data.userId, familyId: data.familyId })
  if (res.succeeded) {
    loadData()
  }
}

onShareAppMessage(() => {
  if (userFamilys.value) {
    // if (userFamilys.value.length >= 1 && userInfo.value?.isVip) {
    //   message
    //     .confirm({
    //       msg: '开通会员解锁家庭成员数量上限',
    //       title: '家庭成员超过上限',
    //       confirmButtonText: '开通会员',
    //       cancelButtonText: '再想想',
    //     })
    //     .then(() => {
    //       uni.navigateTo({
    //         url: '/pages/subscription/index',
    //       })
    //     })
    //     .catch(() => {
    //       return {}
    //     })
    //   return {}
    // }

    const familyId = userFamilys.value[0].familyId
    const word = `${userInfo.value?.nickName}邀请你一起记录家庭中的人情往来`
    const avatarUrl = userInfo.value?.avatar
    return {
      title: '和我一起记录家庭中的人情往来',
      path: `/pages/family/invite?familyId=${familyId}&word=${word}&avatarUrl=${avatarUrl}`,
      imageUrl: '/static/share/2.png',
    }
  }
  return {}
})
</script>

<template>
  <div class="mx-3">
    <div class="mt-3 h-full flex flex-col">
      <div v-if="userFamilys && userFamilys.length">
        <div class="rounded-2xl bg-white p-1">
          <div class="rounded-2xl bg-white px-1 py-3 space-y-3">
            <template v-for="i in userFamilys" :key="i.userId">
              <wd-cell center :title="i.nickName" :label="i.role" is-link @click="onClick(i)">
                <template #icon>
                  <div class="mr-3">
                    <uv-avatar :src="i.avatar" />
                  </div>
                </template>
              </wd-cell>
            </template>
          </div>
        </div>
        <div class="mt-3">
          <wd-button block icon="add" open-type="share">
            邀请家庭成员
          </wd-button>
        </div>
      </div>
      <div v-else class="rounded-2xl bg-white p-4 space-y-2xl">
        <div class="text-center">
          <img src="/static/family/index.svg" class="w-full">
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
                协同记账
              </div>
              <div class="text-sm text-gray">
                贴心记账伙伴，让家庭人情往来记录更轻松。
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
                确保记录安全无虞，你能够自由掌控。
              </div>
            </div>
          </div>
        </div>

        <div class="w-full">
          <wd-button block :loading="loading" @click="onCreate">
            与家人共享
          </wd-button>
        </div>
      </div>
    </div>
    <wd-action-sheet v-model="actionSheetShow" :actions="actionSheetList" cancel-text="取消"
                     :close-on-click-action="false" @select="onSelectedAction"
    />
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "家人共享",
    "enablePullDownRefresh": true
  }
}
</route>
