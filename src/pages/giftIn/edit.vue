<template>
    <div>
        <div class="m-5">
            <div class="bg-white rounded-xl p-4">
                <uv-form labelPosition="left" labelWidth="60">
                    <uv-form-item label="亲友">
                        <uv-input v-model="dataSource.friendName" border="none" placeholder="点击右侧图标选择亲友">
                        </uv-input>
                        <template v-slot:right>
                            <div class="i-system-uicons-contacts text-gray text-lg"></div>
                        </template>
                    </uv-form-item>
                    <uv-form-item label="金额">
                        <uv-input v-model="dataSource.money" border="none" placeholder="随礼金额">
                        </uv-input>
                    </uv-form-item>
                    <uv-form-item label="出席">
                        <uv-input v-model="dataSource.attendance" border="none" placeholder="参加宴席人数">
                        </uv-input>
                    </uv-form-item>
                    <uv-form-item label="备注">
                        <uv-input v-model="dataSource.remarks" border="none" placeholder="请输入内容">
                        </uv-input>
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
        </div>
    </div>
</template>

<script setup>
import { addGiftReceive, updateGiftReceive, deleteGiftReceive, getGiftReceive } from '~/alicloud/services/giftReceive'
const dataSource = ref({
    date: {},
})
onLoad((option) => {
    dataSource.value = { ...router.getQueryParse(option) }
});

const loading = ref(false);
const onSubmit = () => {
    loading.value = true;
    if (dataSource.value._id) {
        updateGiftReceive(dataSource.value).then(res => {
            if (res.success) {
                uni.$emit('gift_in_edit_page_update')
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
                uni.$emit('gift_in_edit_page_update')
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
                        uni.$emit('gift_in_edit_page_update')
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

<route lang="json">{
    "layout": "blank",
    "style": {
        "navigationBarTitleText": "收礼记录"
    }
}</route>