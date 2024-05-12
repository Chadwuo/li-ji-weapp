<script setup>
/* At least one <template> or <script> is required in a single file component. */
import mpserverless from '~/alicloud/index'
import { useUserStore } from '~/stores/user'

onLaunch(async () => {
  console.log('App Launch')
  try {
    // 初始化阿里云sdk
    await mpserverless.init()
    // 初始化用户store
    await useUserStore().getUserInfo()
    uni.$emit('bookPageUpdate')
  }
  catch {
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
