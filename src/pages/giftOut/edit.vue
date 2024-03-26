<template>
    <div>
        <div class="bg-white rounded-2xl p-4 grid grid-cols-5 gap-2 justify-items-center mt-3">
            <div v-for="i in columns">
                <div class="rounded-full bg-gray-100 w-12 h-12 flex">
                    <div class="m-auto w-8 h-8 text-gray" :class="i.icon"></div>
                </div>
                <div class="text-center text-sm mt-1">{{ i.name }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const columns = [
    {
        name: "结婚",
        icon: "i-tabler:baby-bottle",
    },
    {
        name: "宝宝",
        icon: "iconfont icon-qinzi",
    },
    {
        name: "周岁",
        icon: "iconfont icon-zhousui",
    },
    {
        name: "乔迁",
        icon: "iconfont icon-qiaoqian",
    },
    {
        name: "生日",
        icon: "i-mingcute:cake-line",
    },
    {
        name: "升学",
        icon: "i-carbon:education",
    },
    {
        name: "大寿",
        icon: "iconfont icon-laoren",
    },
    {
        name: "探望",
        icon: "iconfont icon-yiyuan",
    },
    {
        name: "白事",
        icon: "iconfont icon-sangzang",
    },
    {
        name: "其他",
        icon: "cicon-moneybag-o",
    },
]
</script>

<style lang="scss" scoped></style>