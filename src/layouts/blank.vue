<template>
  <wd-message-box></wd-message-box>
  <div class="h-full flex flex-col font-sans color-gray-700 dark:color-gray-200">
    <slot />
    <uv-safe-bottom />
  </div>
</template>
