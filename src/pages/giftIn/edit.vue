<template>
    <div>
        <div class="m-5">
            <div class="bg-white rounded-xl p-4">
                <uv-form labelPosition="top" labelAlign="center">
                    <uv-form-item label="亲友" borderBottom>
                        <uv-input v-model="dataSource.friendName" border="none" placeholder="点击右侧图标选择亲友">
                        </uv-input>
                        <template v-slot:right>
                            <div class="i-system-uicons-contacts text-gray text-lg"></div>
                        </template>
                    </uv-form-item>
                    <uv-form-item label="金额" borderBottom>
                        <uv-input v-model="dataSource.money" border="none" placeholder="随礼金额">
                        </uv-input>
                    </uv-form-item>
                    <uv-form-item label="出席" borderBottom>
                        <uv-input v-model="dataSource.attendance" border="none" placeholder="参加宴席人数">
                        </uv-input>
                    </uv-form-item>
                    <uv-form-item label="备注">
                        <uv-textarea  v-model="dataSource.remarks" border="none" autoHeight>
                        </uv-textarea >
                    </uv-form-item>
                </uv-form>
            </div>
        </div>

        <div class="fixed bottom-12 w-full">
            <div class="flex space-x-4 mx-5">
                <div class="w-40" v-if="dataSource._id">
                    <uv-button text="删除" shape="circle" @click="onDel"></uv-button>
                </div>
                <div class="w-full">
                    <uv-button type="primary" text="保存" shape="circle" @click="onSubmit" :loading="loading"
                        loadingMode="circle"></uv-button>
                </div>
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

<route lang="json">{
    "layout": "blank",
    "style": {
        "navigationBarTitleText": "新增收礼"
    }
}</route>