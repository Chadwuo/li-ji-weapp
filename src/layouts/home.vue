<template>
  <div class="app" :class="{ dark: isDark, }">
    <main class="font-sans color-gray-700 dark:color-gray-200">
      <slot />
    </main>
  </div>
</template>
