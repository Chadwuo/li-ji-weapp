<template>
    <div class="mx-4">
        <div class="card mt-4">
            <uv-form labelPosition="left" labelWidth="120">
                <uv-form-item label="日期" borderBottom leftIcon="calendar" leftIconStyle="color:#F87171"
                    @click="calendarRef.open()">
                    <uv-input v-model="dataSource.title" disabled disabledColor="#ffffff" border="none"
                        placeholder="请选择日期">
                    </uv-input>
                    <template v-slot:right>
                        <uv-icon name="arrow-right"></uv-icon>
                    </template>
                </uv-form-item>
                <uv-form-item label="礼簿名称" borderBottom leftIcon="order" leftIconStyle="color:#b745cb">
                    <uv-input v-model="dataSource.title" border="none" placeholder="请选择日期">
                    </uv-input>
                </uv-form-item>
                <uv-form-item label="备注" leftIcon="tags" leftIconStyle="color:#a5673f">
                    <uv-input v-model="dataSource.remarks" border="none" placeholder="请输入内容">
                    </uv-input>
                </uv-form-item>
            </uv-form>
        </div>
        <div class="card mt-4">
            <ad unit-id="adunit-64aefbe92c2dc7bf"></ad>
            <div class="text-xs text-gray mt-1">广告可以在设置中关闭</div>
        </div>
    </div>

    <div class="fixed bottom-12 w-full">
        <div class="flex space-x-4 mx-4">
            <uv-button text="删除" shape="circle" @click="submit" :loading="loading" loadingMode="circle"></uv-button>
            <div class="w-full">
                <uv-button type="primary" text="保存" shape="circle" @click="submit" :loading="loading"
                    loadingMode="circle"></uv-button>
            </div>
        </div>
    </div>

    <uv-calendars ref="calendarRef" @confirm="confirm" lunar />
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
const calendarRef = ref(null);

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
const loading = ref(true);

const submit = () => {
    calendarRef.value.open();
}

const confirm = (date) => {
    console.log(date);
    calendarRef.value.close();
}

const book = ref({});
</script>

<style lang="scss" scoped></style>
