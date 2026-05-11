import { presetUni } from '@uni-helper/unocss-preset-uni'
import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUni({
      attributify: false,
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      // HBuilderX 必须针对要使用的 Collections 做异步导入
      // collections: {
      //   carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      // },
    }),
  ],
  shortcuts: [
    ['memorial', '!grayscale !filter'],
    ['gradient-card', 'rounded-2xl from-[#fff7f7] via-white to-[#eef9fb] bg-gradient-to-br shadow-[0_8px_24px_rgba(15,23,42,0.06)]'],
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
