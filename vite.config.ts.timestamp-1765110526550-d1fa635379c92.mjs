// vite.config.ts
import Uni from "file:///E:/Github/li-ji-weapp/node_modules/.pnpm/@uni-helper+plugin-uni@0.1.0_@dcloudio+vite-plugin-uni@3.0.0-4070520250711001_postcss@8.5.6_r_hipdroo4yqlwdwejxtvxsqgpaq/node_modules/@uni-helper/plugin-uni/src/index.js";
import UniHelperComponents from "file:///E:/Github/li-ji-weapp/node_modules/.pnpm/@uni-helper+vite-plugin-uni-components@0.2.3_rollup@4.53.3/node_modules/@uni-helper/vite-plugin-uni-components/dist/index.mjs";
import UniHelperLayouts from "file:///E:/Github/li-ji-weapp/node_modules/.pnpm/@uni-helper+vite-plugin-uni-layouts@0.1.11_rollup@4.53.3/node_modules/@uni-helper/vite-plugin-uni-layouts/dist/index.mjs";
import UniHelperManifest from "file:///E:/Github/li-ji-weapp/node_modules/.pnpm/@uni-helper+vite-plugin-uni-manifest@0.2.11_vite@5.4.21_@types+node@22.19.1_sass@1.78.0_terser@5.44.1_/node_modules/@uni-helper/vite-plugin-uni-manifest/dist/index.mjs";
import UniHelperPages from "file:///E:/Github/li-ji-weapp/node_modules/.pnpm/@uni-helper+vite-plugin-uni-pages@0.3.22_vite@5.4.21_@types+node@22.19.1_sass@1.78.0_terser@5.44.1_/node_modules/@uni-helper/vite-plugin-uni-pages/dist/index.mjs";
import UnoCSS from "file:///E:/Github/li-ji-weapp/node_modules/.pnpm/unocss@65.5.0_postcss@8.5.6_vite@5.4.21_@types+node@22.19.1_sass@1.78.0_terser@5.44.1__vue@3.4.21_typescript@5.7.3_/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///E:/Github/li-ji-weapp/node_modules/.pnpm/unplugin-auto-import@19.3.0/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig } from "file:///E:/Github/li-ji-weapp/node_modules/.pnpm/vite@5.4.21_@types+node@22.19.1_sass@1.78.0_terser@5.44.1/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [
    // https://uni-helper.js.org/vite-plugin-uni-manifest
    UniHelperManifest(),
    // https://uni-helper.js.org/vite-plugin-uni-pages
    UniHelperPages({
      dts: "src/uni-pages.d.ts",
      exclude: ["**/components/**/*.*"]
    }),
    // https://uni-helper.js.org/vite-plugin-uni-layouts
    UniHelperLayouts(),
    // https://uni-helper.js.org/vite-plugin-uni-components
    UniHelperComponents({
      dts: "src/components.d.ts",
      directoryAsNamespace: true
    }),
    // https://uni-helper.js.org/plugin-uni
    Uni(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "uni-app"],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/stores", "src/utils", "src/api"],
      vueTemplate: true
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    UnoCSS()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxHaXRodWJcXFxcbGktamktd2VhcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXEdpdGh1YlxcXFxsaS1qaS13ZWFwcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovR2l0aHViL2xpLWppLXdlYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IFVuaSBmcm9tICdAdW5pLWhlbHBlci9wbHVnaW4tdW5pJ1xyXG5pbXBvcnQgVW5pSGVscGVyQ29tcG9uZW50cyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktY29tcG9uZW50cydcclxuaW1wb3J0IFVuaUhlbHBlckxheW91dHMgZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLWxheW91dHMnXHJcbmltcG9ydCBVbmlIZWxwZXJNYW5pZmVzdCBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktbWFuaWZlc3QnXHJcbmltcG9ydCBVbmlIZWxwZXJQYWdlcyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktcGFnZXMnXHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIC8vIGh0dHBzOi8vdW5pLWhlbHBlci5qcy5vcmcvdml0ZS1wbHVnaW4tdW5pLW1hbmlmZXN0XHJcbiAgICBVbmlIZWxwZXJNYW5pZmVzdCgpLFxyXG4gICAgLy8gaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktcGFnZXNcclxuICAgIFVuaUhlbHBlclBhZ2VzKHtcclxuICAgICAgZHRzOiAnc3JjL3VuaS1wYWdlcy5kLnRzJyxcclxuICAgICAgZXhjbHVkZTogWycqKi9jb21wb25lbnRzLyoqLyouKiddLFxyXG4gICAgfSksXHJcbiAgICAvLyBodHRwczovL3VuaS1oZWxwZXIuanMub3JnL3ZpdGUtcGx1Z2luLXVuaS1sYXlvdXRzXHJcbiAgICBVbmlIZWxwZXJMYXlvdXRzKCksXHJcbiAgICAvLyBodHRwczovL3VuaS1oZWxwZXIuanMub3JnL3ZpdGUtcGx1Z2luLXVuaS1jb21wb25lbnRzXHJcbiAgICBVbmlIZWxwZXJDb21wb25lbnRzKHtcclxuICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXHJcbiAgICAgIGRpcmVjdG9yeUFzTmFtZXNwYWNlOiB0cnVlLFxyXG4gICAgfSksXHJcbiAgICAvLyBodHRwczovL3VuaS1oZWxwZXIuanMub3JnL3BsdWdpbi11bmlcclxuICAgIFVuaSgpLFxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWF1dG8taW1wb3J0XHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCAndW5pLWFwcCddLFxyXG4gICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgICBkaXJzOiBbJ3NyYy9jb21wb3NhYmxlcycsICdzcmMvc3RvcmVzJywgJ3NyYy91dGlscycsICdzcmMvYXBpJ10sXHJcbiAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxyXG4gICAgfSksXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5vY3NzXHJcbiAgICAvLyBzZWUgdW5vY3NzLmNvbmZpZy50cyBmb3IgY29uZmlnXHJcbiAgICBVbm9DU1MoKSxcclxuICBdLFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVQLE9BQU8sU0FBUztBQUN2USxPQUFPLHlCQUF5QjtBQUNoQyxPQUFPLHNCQUFzQjtBQUM3QixPQUFPLHVCQUF1QjtBQUM5QixPQUFPLG9CQUFvQjtBQUMzQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFHN0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBO0FBQUEsSUFFUCxrQkFBa0I7QUFBQTtBQUFBLElBRWxCLGVBQWU7QUFBQSxNQUNiLEtBQUs7QUFBQSxNQUNMLFNBQVMsQ0FBQyxzQkFBc0I7QUFBQSxJQUNsQyxDQUFDO0FBQUE7QUFBQSxJQUVELGlCQUFpQjtBQUFBO0FBQUEsSUFFakIsb0JBQW9CO0FBQUEsTUFDbEIsS0FBSztBQUFBLE1BQ0wsc0JBQXNCO0FBQUEsSUFDeEIsQ0FBQztBQUFBO0FBQUEsSUFFRCxJQUFJO0FBQUE7QUFBQSxJQUVKLFdBQVc7QUFBQSxNQUNULFNBQVMsQ0FBQyxPQUFPLFNBQVM7QUFBQSxNQUMxQixLQUFLO0FBQUEsTUFDTCxNQUFNLENBQUMsbUJBQW1CLGNBQWMsYUFBYSxTQUFTO0FBQUEsTUFDOUQsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBO0FBQUE7QUFBQSxJQUdELE9BQU87QUFBQSxFQUNUO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
