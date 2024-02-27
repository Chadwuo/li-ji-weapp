<template>
    <div>
        <uni-nav-bar :statusBar="true" :border="false" backgroundColor="#f1f1f1" fixed :leftWidth="100">
            <template v-slot:left>
                <div flex items-center ms-4>
                    <div text-lg font-bold ms-2>亲友</div>
                </div>
            </template>
        </uni-nav-bar>
        <div grid grid-cols-1 gap-5 mx-6>

        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>

<route lang="json">
{
    "style": {
        "navigationStyle": "custom"
    }
}
</route>