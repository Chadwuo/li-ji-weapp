<template>
  <div class="h-full" :class="{ dark: isDark, }">
    <main class="font-sans color-gray-700 dark:color-gray-200 h-full flex flex-col">
      <slot />
    </main>
  </div>
</template>
