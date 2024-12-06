<script setup lang="ts">
onLaunch(() => {
    console.log('App Launch')
    uni.login({
        provider: 'weixin', //使用微信登录
        success: function (loginRes) {
            console.log(loginRes.authResult);
        }
    });
})
onShow(() => {
    console.log('App Show')
})

onHide(() => {
    console.log('App Hide')
})
</script>
