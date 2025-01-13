<template>
  <wd-toast />
  <wd-message-box />
  <wd-notify />
  <div class="h-full flex flex-col font-sans">
    <div class="grow">
      <slot />
    </div>
    <Footer />
    <uv-safe-bottom />
  </div>
</template>
