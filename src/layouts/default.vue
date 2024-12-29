<template>
  <wd-message-box />
  <div class="mx-3 h-full flex flex-col font-sans">
    <slot />
    <Footer class="mt-auto" />
    <uv-safe-bottom />
  </div>
</template>
