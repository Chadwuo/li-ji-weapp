<template>
  <wd-message-box></wd-message-box>
  <div class="mx-5 h-full flex flex-col">
    <slot />
    <Footer class="mt-auto" />
    <uv-safe-bottom />
  </div>
</template>
