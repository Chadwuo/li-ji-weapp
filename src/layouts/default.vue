<template>
  <wd-message-box />
  <div class="mx-5 h-full flex flex-col color-black font-sans">
    <slot />
    <Footer class="mt-auto" />
    <uv-safe-bottom />
  </div>
</template>
