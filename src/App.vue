<script setup>
/* At least one <template> or <script> is required in a single file component. */
import mpserverless from "~/alicloud/releases";
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
onLaunch(async () => {
    console.log('App Launch')
    await mpserverless.init()
    // 初始化用户信息
    const res = await userStore.setUserInfo()
    if (res.success) {
        router.push({
            path: '/pages/book/index',
            tabBar: true
        })
    } else {
        uni.showModal({
            title: '提示',
            content: '网络异常，请稍后再试...',
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    // 重启
                    uni.reLaunch({
                        url: '/pages/index/index'
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
</style>
