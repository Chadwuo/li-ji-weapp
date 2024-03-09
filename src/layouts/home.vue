<template>
  <div class="app" :class="{ dark: isDark, }">
    <main class="px-5 font-sans color-gray-700 dark:color-gray-200">
      <slot />
    </main>
  </div>
</template>
