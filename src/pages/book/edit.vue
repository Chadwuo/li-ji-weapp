<template>
    <div>
        <uv-empty icon="https://cdn.uviewui.com/uview/empty/car.png"></uv-empty>
        <uv-form labelPosition="left" labelWidth="90">
            <uv-form-item label="日期" borderBottom>
                <uv-input v-model="book.title" border="none">
                </uv-input>
            </uv-form-item>
            <uv-form-item label="礼簿名称" borderBottom>
                <uv-input v-model="book.title" border="none">
                </uv-input>
            </uv-form-item>
            <uv-form-item label="备注" borderBottom>
                <uv-input v-model="book.title" border="none">
                </uv-input>
            </uv-form-item>
            <uv-button type="primary" text="提交" customStyle="margin-top: 10px" @click="submit"></uv-button>
            <uv-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset"></uv-button>
        </uv-form>
    </div>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";

// onLoad 接受 A 页面传递的参数
onLoad((option) => {
    console.log("参数", option);
    if (option.id) {
        uni.setNavigationBarTitle({
            title: '新的标题'
        });
    } else {
        uni.setNavigationBarTitle({
            title: '新增礼簿'
        });
    }
});

const book = ref({});
</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "layout": "home"
}</route>