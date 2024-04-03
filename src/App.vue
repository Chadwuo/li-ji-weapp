<script setup>
/* At least one <template> or <script> is required in a single file component. */
import mpserverless from "~/alicloud/index";
import { useUserStore } from '~/stores/user'

onLaunch(async () => {
    console.log('App Launch')
    try {
        await mpserverless.init()
        // 初始化用户信息
        await useUserStore().initUserInfo()
        router.push({
            path: '/pages/book/index',
            tabBar: true
        })
    } catch (error) {
        console.log('mpserverless error :>>', error)
        uni.showModal({
            title: '提示',
            content: '网络异常，请稍后再试...',
            showCancel: false,
            confirmColor: '#F87171',
            success: function (res) {
                if (res.confirm) {
                    // 重启
                    uni.reLaunch({
                        url: '/pages/index'
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
    }
})
onShow(() => {
    console.log('App Show')
})
onHide(() => {
    console.log('App Hide')
})
</script>

<style lang="scss">
@import './styles/main.css';
@import '@climblee/uv-ui/index.scss';
</style>
