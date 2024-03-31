<template>
    <div>
        <uv-popup ref="popup" mode="bottom" round="10" closeable bgColor="#f1f1f1">
            <div class="px-5 pt-4">
                <div class="text-center font-bold">添加记录</div>
                <div class="bg-white rounded-xl p-4 mt-3">
                    <uv-form labelPosition="left" labelWidth="120">
                        <uv-form-item label="亲友" borderBottom leftIcon="coupon" leftIconStyle="color:#53c21d">
                            <uv-input v-model="dataSource.friendName" border="none" placeholder="点击右侧图标选择亲友">
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

import { addGiftReceive, updateGiftReceive, deleteGiftReceive, getGiftReceive } from '~/alicloud/services/giftReceive'
const dataSource = ref({
    date: {},
})
onLoad((option) => {
    if (option.id) {
        uni.setNavigationBarTitle({
            title: '编辑'
        });
        getGiftReceive({ _id: option.id }).then(res => {
            dataSource.value = res.result;
        });
    }
});

const loading = ref(false);
const onSubmit = () => {
    loading.value = true;
    if (dataSource.value._id) {
        updateGiftReceive(dataSource.value).then(res => {
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
        addGiftReceive(dataSource.value).then(res => {
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
                deleteGiftReceive(dataSource.value).then(res => {
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

</script>

<style lang="scss" scoped></style>