<template>
    <div class="mx-5 bg-white rounded-2xl p-4 mt-3">
        <uv-form labelPosition="left" labelWidth="60">
            <uv-form-item label="日期" @click="calendarRef.open()">
                <uv-input v-model="dataSource.date.value" disabled disabledColor="#ffffff" border="none"
                    placeholder="请选择日期">
                </uv-input>
                <template v-slot:right>
                    <uv-icon name="arrow-right"></uv-icon>
                </template>
            </uv-form-item>
            <uv-form-item label="名称">
                <uv-input v-model="dataSource.title" border="none" placeholder="礼簿名称">
                </uv-input>
            </uv-form-item>
            <uv-form-item label="成本">
                <uv-input v-model="dataSource.cost" border="none" placeholder="宴席、伴手礼等费用" type="number">
                </uv-input>
            </uv-form-item>
            <uv-form-item label="备注">
                <uv-input v-model="dataSource.remarks" border="none" placeholder="请输入内容">
                </uv-input>
            </uv-form-item>
            <uv-form-item>
                <div class="text-xs text-gray mt-3">一场宴席活动中，用来登记所有来宾贺礼的名册，称为礼簿。</div>
            </uv-form-item>
            <uv-form-item>
                <div class="flex space-x-4">
                    <div class="w-40" v-if="dataSource._id">
                        <uv-button text="删除" shape="circle" @click="onDel"></uv-button>
                    </div>
                    <div class="w-full">
                        <uv-button type="primary" shape="circle" text="保存" @click="onSubmit" :loading="loading"
                            loadingMode="circle"></uv-button>
                    </div>
                </div>
            </uv-form-item>
        </uv-form>
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
    if (option.id) {
        uni.setNavigationBarTitle({
            title: '编辑'
        });
        getBookInfo({ _id: option.id }).then(res => {
            dataSource.value = res.result;
        });
    }
});

const dataSource = ref({
    date: {},
});

const loading = ref(false);
const onSubmit = () => {
    loading.value = true;
    if (dataSource.value._id) {
        updateBook(dataSource.value).then(res => {
            if (res.success) {
                uni.$emit('update_book_page')
                uni.showToast({
                    title: '更新成功',
                    icon: 'success'
                })
                setTimeout(() => {
                    uni.navigateBack({
                        delta: 2,
                    });
                }, 1000)
            }
        }).finally(() => {
            loading.value = false;
        });
    } else {
        addBook(dataSource.value).then(res => {
            if (res.success) {
                //dataSource.value._id = res.result;
                uni.$emit('update_book_page')
                uni.showToast({
                    title: '添加成功',
                    icon: 'success'
                })
                setTimeout(() => {
                    uni.navigateBack();
                }, 1000)
            }
        }).finally(() => {
            loading.value = false;
        });
    }
}

const onDel = () => {
    uni.showModal({
        title: '删除礼簿',
        content: '该礼簿所有来往记录都将被删除，确定删除？',
        confirmColor: '#F87171',
        success: (res) => {
            if (res.confirm) {
                deleteBook(dataSource.value).then(res => {
                    if (res.success) {
                        uni.$emit('update_book_page')
                        uni.showToast({
                            title: '删除成功',
                            icon: 'success'
                        })
                        setTimeout(() => {
                            uni.navigateBack({
                                delta: 2,
                            });
                        }, 1000)
                    }
                });
            }
        }
    });
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

<style lang="scss" scoped>

</style>

<route lang="json">{
    "layout": "blank",
    "style": {
        "navigationBarTitleText": "新增"
    }
}</route>
