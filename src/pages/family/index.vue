<template>
  <div class="mt-3">
    <div class="bg-white rounded-2xl p-4 space-y-2xl" v-if="!userInfo.familyMembers">
      <div class="text-center">
        <img src="/static/home.svg">
        <div class="text-xl font-bold mt-5">家庭共享</div>
      </div>

      <div class="flex items-center">
        <div class="text-red m-3"><i class="i-tabler-device-mobile-share text-3xl"></i></div>
        <div>
          <div class="font-bold">协同共享记账</div>
          <div class="text-gray text-sm">安全共享你的数据，使亲友和你共同记录家庭人情往来</div>
        </div>
      </div>
      <div class="flex items-center">
        <div class="text-red m-3"><i class="i-tabler-lock-heart text-3xl"></i></div>
        <div>
          <div class="font-bold">私密且安全</div>
          <div class="text-gray text-sm">信息会加密，你可以随时停止共享</div>
        </div>
      </div>

      <div class="w-full">
        <uv-button type="primary" shape="circle" text="与他人共享" @click="onCreate" :loading="loading"
          loadingMode="circle"></uv-button>
      </div>
    </div>
    <div v-else>
      <div class="bg-white rounded-2xl p-1">
        <div class="bg-white rounded-2xl py-3 space-y-3 px-1">
          <template v-for="i in userInfo.familyMembers" :key="i._id">
            <uv-cell :title="i.user.nickName" :label="i.relation" :border="false" isLink
              cellStyle="background-color:white">
              <template v-slot:icon>
                <uv-avatar :src="i.user.avatarUrl"></uv-avatar>
              </template>
            </uv-cell>
          </template>
        </div>
      </div>
      <div class="mt-3">
        <button openType="share" icon="plus" class="uv-reset-button bg-white rounded-2xl p-2">
          <div class="text-red flex items-center justify-center"><div class="i-carbon-add text-2xl"></div> 邀请家庭成员</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
const { userInfo } = storeToRefs(useUserStore())

</script>

<style lang="scss" scoped></style>

<route lang="json">{
  "style": {
    "navigationBarTitleText": "家人共享"
  }
}</route>