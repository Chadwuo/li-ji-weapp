<template>
  <wd-message-box />
  <div class="mx-3 h-full flex flex-col font-sans">
    <div class="grow">
      <slot />
    </div>
    <Footer />
    <uv-safe-bottom />
  </div>
</template>
