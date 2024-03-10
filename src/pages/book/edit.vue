<template>
    <div class="mx-4">
        <div class="card mt-4">
            <uv-form labelPosition="left" labelWidth="120">
                <uv-form-item label="日期" borderBottom leftIcon="calendar" leftIconStyle="color:#F87171"
                    @click="calendarRef.open()">
                    <uv-input v-model="dataSource.date.value" disabled disabledColor="#ffffff" border="none"
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
        <view class="card mt-4">
            <ad unit-id="adunit-64aefbe92c2dc7bf"></ad>
            <view class="text-xs text-gray mt-1">广告可以在设置中关闭</view>
        </view>
    </div>

    <div class="fixed bottom-12 w-full">
        <div class="flex space-x-4 mx-4">
            <uv-button text="删除" shape="circle" @click="submit" :loading="loading" loadingMode="circle"
                v-if="dataSource._id"></uv-button>
            <div class="w-full">
                <uv-button type="primary" text="保存" shape="circle" @click="submit" :loading="loading"
                    loadingMode="circle"></uv-button>
            </div>
        </div>
    </div>

    <uv-calendars ref="calendarRef" @confirm="calendarConfirm" lunar color="#F87171" confirmColor="#F87171"
        :date="dataSource.date.value" />
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { getBookInfo, addBook, updateBook, deleteBook } from '~/alicloud/services/book'
const calendarRef = ref(null);

// onLoad 接受 A 页面传递的参数
onLoad((option) => {
    console.log("参数", option);
    if (!option.id) {
        uni.setNavigationBarTitle({
            title: '新增礼簿'
        });
    } else {
        uni.setNavigationBarTitle({
            title: '礼簿详情'
        });
        getBookInfo({ _id: option.id }).then(res => {
            console.log('object :>> ', res);
            dataSource.value = res.result;
        });
    }
});

const dataSource = ref({
    date: {},
});
const loading = ref(false);

const submit = () => {
    calendarRef.value.open();
}

const calendarConfirm = (e) => {
    let {
        year,
        month,
        date,
        lunar
    } = e;
    console.log(e);

    let selectedDate = {
        year,
        month: Number(month),
        day: date,
        value: `${year}-${Number(month)}-${date}`,
        lunar_day: lunar.IDayCn,
        lunar_month: lunar.IMonthCn,
        lunar_year: `${lunar.gzYear}${lunar.Animal}年`,
        lunar_term: lunar.Term || '',
    };
    dataSource.value.date = selectedDate;
    calendarRef.value.close();
}



</script>

<style lang="scss" scoped></style>
