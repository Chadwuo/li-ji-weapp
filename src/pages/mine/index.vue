<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { userInfo, userFamilys } = storeToRefs(useAuthStore())
const jinrishici = ref('')
const staticData = ref<Api.StatOverall>({
  inCount: 0,
  outCount: 0,
  inTotal: 0,
  outTotal: 0,
})

const statistics = async () => {
  apiStatisticsOverallGet().then((res) => {
    if (res.succeeded && res.data) {
      staticData.value = res.data
    }
  })
}

onLoad(() => {
  jinrishiciLoad((result: any) => {
    jinrishici.value = result.data.content
  })
})

onShow(() => {
  statistics()
})

const toSettings = () => {
  uni.navigateTo({
    url: '/pages/settings/index',
  })
}

onShareAppMessage(() => {
  return {
    title: '可能是东半球最好用的人情往来记账工具',
    path: `/pages/book/page`,
    imageUrl: '/static/share/1.png',
  }
})
</script>

<template>
  <div class="bg-[url('https://poemcode.cn/liji-oss/assets/bg/bg_mine.png')] bg-contain bg-no-repeat">
    <div class="mx-3 pt-24 space-y-5">
      <div class="flex items-center" @click="toSettings">
        <div class="relative">
          <uv-avatar :src="userInfo?.avatar" :size="55" />
          <img v-if="userInfo?.isVip" class="absolute bottom-0 left-0" width="55" src="/static/avatar/ring.png">
        </div>
        <div class="ml-3">
          <div class="text-lg">
            {{ welcome() }}，{{ userInfo?.nickName }}
          </div>
          <div class="mt-1 text-sm text-gray">
            {{ jinrishici }}
          </div>
        </div>
        <div class="i-hugeicons-settings-03 ml-auto text-lg" />
      </div>
      <div class="grid grid-cols-2 gap-5 rounded-2xl bg-white p-5 divide-x">
        <div class="text-center">
          <div class="text-lg text-black font-bold">
            {{ formatMoney(staticData.inTotal) }}
          </div>
          <div class="flex items-center justify-center text-sm text-gray space-x-1">
            <div class="i-icon-park-outline-income" />
            <div>收礼({{ staticData.inCount }})</div>
          </div>
        </div>
        <div class="text-center">
          <div class="text-lg text-black font-bold">
            {{ formatMoney(staticData.outTotal) }}
          </div>
          <div class="flex items-center justify-center text-sm text-gray space-x-1">
            <div class="i-icon-park-outline-expenses" />
            <div>送礼({{ staticData.outCount }})</div>
          </div>
        </div>
      </div>
      <div class="rounded-2xl bg-white p-2">
        <wd-cell v-if="userFamilys && userFamilys.length" value="家人共享" is-link center to="/pages/family/index">
          <template #title>
            <uv-avatar-group :urls="userFamilys.map((i) => i.avatar)" gap="0.4" />
          </template>
        </wd-cell>
        <wd-cell v-else title="开通家人共享" is-link to="/pages/family/index">
          <template #icon>
            <div class="i-hugeicons-home-12 mx-2 text-lg text-red" />
          </template>
        </wd-cell>
      </div>
      <div class="rounded-2xl bg-white p-2 space-y-3">
        <!-- <wd-cell title="支持礼记" is-link to="/pages/subscription/index">
          <template #icon>
            <div class="i-hugeicons-thumbs-up mx-2 text-lg text-red" />
          </template>
        </wd-cell> -->
        <!-- <wd-cell title="夸夸礼记" is-link @click="openComment">
          <template #icon>
            <div class="i-hugeicons-thumbs-up mx-2 text-lg text-red" />
          </template>
        </wd-cell> -->
        <button class="reset-button" open-type="share">
          <wd-cell is-link title="分享好友">
            <template #icon>
              <div class="i-hugeicons-share-01 pr-4 text-lg text-green" />
            </template>
          </wd-cell>
        </button>
        <wd-cell title="常见问题" is-link to="/pages/faq/index">
          <template #icon>
            <div class="i-hugeicons-bubble-chat-question mx-2 text-lg text-blue" />
          </template>
        </wd-cell>
        <wd-cell title="个人设置" is-link to="/pages/settings/index">
          <template #icon>
            <div class="i-hugeicons-settings-03 mx-2 text-lg text-gray" />
          </template>
        </wd-cell>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationStyle": "custom"
  }
}
</route>
