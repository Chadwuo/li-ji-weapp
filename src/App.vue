<script setup>
/* At least one <template> or <script> is required in a single file component. */
import mpserverless from '~/alicloud/index'
import { useUserStore } from '~/stores/user'

onLaunch(async () => {
  console.log('App Launch')
  uni.showLoading({
    title: '正在加载数据...',
  })
  try {
    // 初始化阿里云sdk
    await mpserverless.init()
    // 初始化用户store
    await useUserStore().getUserInfo()
    uni.$emit('bookPageUpdate')
    uni.hideLoading()
  }
  catch (error) {
    console.log('App Launch Error :>> ', error)
    router.push('/pages/exception/500')
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
