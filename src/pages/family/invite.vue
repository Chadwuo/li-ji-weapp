<template>
    <div>
        <div class="bg-white rounded-xl p-4 mt-3">
            <div class="text-center">
                <img src="/static/img/invite_family.svg" alt="">
                <div class="text-3xl font-blod">家庭共享</div>
            </div>

            <div class="flex items-center">
                <div></div>
                <div>
                    <div class="text-lg font-blod">协同共享记账</div>
                    <div class="text-gray">安全共享你的数据，使亲友和你共同记录家庭人情往来</div>
                </div>
            </div>
            <div class="flex items-center">
                <div></div>
                <div>
                    <div class="text-lg font-blod">私密且安全</div>
                    <div class="text-gray">信息会加密，你可以随时停止共享</div>
                </div>
            </div>

            <div class="w-full">
                <uv-button type="primary" shape="circle" text="同意" @click="onCreate" :loading="loading"
                    loadingMode="circle">
                </uv-button>
                <uv-button type="primary" shape="circle" text="拒绝" @click="onCreate" :loading="loading"
                    loadingMode="circle">
                </uv-button>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "style": {
        "navigationBarTitleText": "家人共享"
    }
}</route>