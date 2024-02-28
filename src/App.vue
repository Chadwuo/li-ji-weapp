<script setup>
/* At least one <template> or <script> is required in a single file component. */
import mpserverless from "~/alicloud/releases";
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

onLaunch(async () => {
    console.log('App Launch')
    await mpserverless.init();

    // 初始化用户信息
    await userStore.setUserInfo()
    // 初始化用户数据权限
    await userStore.setUserDataScope()

    router.push({
        path: '/pages/book/index',
        tabBar: true
    })
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
