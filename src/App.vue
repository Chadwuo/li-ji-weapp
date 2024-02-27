<script setup>
/* At least one <template> or <script> is required in a single file component. */
import mpserverless from "~/alicloud/releases";
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
const { userInfo } = storeToRefs(useUserStore())

onLaunch(async (options) => {
    console.log('App Launch')
    await mpserverless.init();
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
