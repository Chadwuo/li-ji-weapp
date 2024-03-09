<template>
    <div>
        <uv-form labelPosition="left" labelWidth="90">
            <uv-form-item label="日期" borderBottom rightIcon="arrow-right" leftIcon="calendar"
                leftIconStyle="color:#F87171">
                <uv-input v-model="dataSource.title" border="none">
                </uv-input>
            </uv-form-item>
            <uv-form-item label="礼簿名称" borderBottom>
                <uv-input v-model="dataSource.title" border="none">
                </uv-input>
            </uv-form-item>
            <uv-form-item label="备注" borderBottom>
                <uv-input v-model="dataSource.remarks" border="none">
                </uv-input>
            </uv-form-item>
            <uv-button type="primary" text="提交" shape="circle" @click="submit" :loading="loading"
                loadingMode="circle"></uv-button>
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

const dataSource = ref({});
const loading = ref(false);

const submit = () => {
    console.log('object :>> ', dataSource.value);
}

const book = ref({});
</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "layout": "home"
}</route>