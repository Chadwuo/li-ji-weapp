<template>
    <div>
        <uv-empty mode="car" icon="https://cdn.uviewui.com/uview/empty/car.png"></uv-empty>
        <uv-form labelPosition="left">
            <uv-form-item label="礼簿名称" >
                <uv-input v-model="book.title" >
                </uv-input>
            </uv-form-item>
            <uv-form-item label="日期" borderBottom @click="showSexSelect">
                <uv-input v-model="book.sex" disabled disabledColor="#ffffff" placeholder="请选择性别" border="none">
                </uv-input>
                <template v-slot:right>
                    <uv-icon name="arrow-right"></uv-icon>
                </template>
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