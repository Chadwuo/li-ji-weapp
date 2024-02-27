<template>
  <div class="app" :class="{
    dark: isDark,
  }">
    <main font-sans color="gray-700 dark:gray-200">
      <slot />
      <Footer />
    </main>
  </div>
</template>
