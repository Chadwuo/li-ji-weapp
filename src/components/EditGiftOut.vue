<template>
    <div>
        <uv-popup ref="popup" mode="bottom" round="10" closeable bgColor="#f1f1f1">
            <div class="px-5 pt-4">
                <div class="text-center font-bold">添加记录</div>

                <div class="bg-white rounded-2xl p-4 grid grid-cols-5 gap-2 justify-items-center mt-3">
                    <div v-for="i in columns" @click="onSelectIcont(i)">
                        <div class="rounded-full w-12 h-12 flex"
                            :class="[i.icon == dataSource.icon ? selectedIconStyle : 'bg-gray-100  text-gray']">
                            <div class="m-auto w-8 h-8" :class="i.icon"></div>
                        </div>
                        <div class="text-center text-sm mt-1">{{ i.name }}</div>
                    </div>
                </div>

                <div class="bg-white rounded-xl p-4 mt-3">
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
                        <uv-form-item label="亲友" borderBottom leftIcon="coupon" leftIconStyle="color:#53c21d">
                            <uv-input v-model="dataSource.friendName" border="none" placeholder="点击右侧图标选择亲友">
                            </uv-input>
                        </uv-form-item>
                        <uv-form-item label="事由" borderBottom leftIcon="order" leftIconStyle="color:#b745cb">
                            <uv-input v-model="dataSource.title" border="none" placeholder="随礼事由">
                            </uv-input>
                        </uv-form-item>
                        <uv-form-item label="金额" borderBottom leftIcon="order" leftIconStyle="color:#b745cb">
                            <uv-input v-model="dataSource.money" border="none" placeholder="随礼金额">
                            </uv-input>
                        </uv-form-item>
                        <uv-form-item label="备注" leftIcon="tags" leftIconStyle="color:#a5673f">
                            <uv-input v-model="dataSource.remarks" border="none" placeholder="请输入内容">
                            </uv-input>
                        </uv-form-item>
                    </uv-form>
                </div>

                <div class="flex space-x-4 mt-3">
                    <div class="w-40" v-if="dataSource._id">
                        <uv-button text="删除" shape="circle" @click="onDel"></uv-button>
                    </div>
                    <div class="w-full">
                        <uv-button type="primary" text="保存" shape="circle" @click="onSubmit" :loading="loading"
                            loadingMode="circle"></uv-button>
                    </div>
                </div>
            </div>
            <uv-calendars ref="calendarRef" @confirm="calendarConfirm" lunar color="#F87171" confirmColor="#F87171"
                :date="dataSource.date.value" />
        </uv-popup>
    </div>
</template>

<script setup>
const popup = ref(null)
const show = () => {
    popup.value.open()
}

defineExpose({
    show
})

import { addGiftOut, updateGiftOut, deleteGiftOut, getGiftOut } from '~/alicloud/services/giftOut'
const dataSource = ref({
    date: {},
})
const columns = [
    {
        name: "结婚",
        icon: "i-fluent-emoji-high-contrast-wedding",
    },
    {
        name: "宝宝",
        icon: "i-mingcute-baby-line",
    },
    {
        name: "周岁",
        icon: "i-icon-park-outline-baby-feet",
    },
    {
        name: "乔迁",
        icon: "i-tabler-home-move",
    },
    {
        name: "生日",
        icon: "i-mingcute-cake-line",
    },
    {
        name: "升学",
        icon: "i-carbon-education",
    },
    {
        name: "压岁",
        icon: "i-icon-park-outline-red-envelope",
    },
    {
        name: "探望",
        icon: "i-healthicons-fruits-outline",
    },
    {
        name: "白事",
        icon: "i-tabler-candle",
    },
    {
        name: "其他",
        icon: "i-mingcute-wallet-2-line",
    },
]
const calendarRef = ref(null);

onLoad((option) => {
    if (option.id) {
        uni.setNavigationBarTitle({
            title: '编辑'
        });
        getGiftOut({ _id: option.id }).then(res => {
            dataSource.value = res.result;
        });
    }
});

const onSelectIcont = (i) => {
    dataSource.value.icon = i.icon
    if (i.name == '其他') {
        dataSource.value.title = ''
    } else {
        dataSource.value.title = i.name
    }
}

const selectedIconStyle = computed(() => {
    return dataSource.value.icon != 'i-tabler-candle' ? 'text-white bg-red' : 'text-white bg-gray'
})

const loading = ref(false);
const onSubmit = () => {
    loading.value = true;
    if (dataSource.value._id) {
        updateGiftOut(dataSource.value).then(res => {
            if (res.success) {
                uni.$emit('update_giftout_page')
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
        addGiftOut(dataSource.value).then(res => {
            if (res.success) {
                //dataSource.value._id = res.result;
                uni.$emit('update_giftout_page')
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
        title: '删除来往记录',
        content: '此操作无法恢复，确定删除？',
        confirmColor: '#F87171',
        success: (res) => {
            if (res.confirm) {
                deleteGiftOut(dataSource.value).then(res => {
                    if (res.success) {
                        uni.$emit('update_giftout_page')
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

<style lang="scss" scoped></style>