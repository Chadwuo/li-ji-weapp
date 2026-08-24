import uni from '@uni-helper/eslint-config'

export default uni(
  {
    ignores: [
      'deploy/**',
      'dist/**',
      'doc/**',
      'landing/**',
      'src/components/qiun-*/**',
      'src/components/u-charts/**',
      'src/utils/jinrishici.ts',
    ],
    unocss: true,
    stylistic: {
      overrides: {
        'antfu/top-level-function': 'off',
      },
    },
    rules: {
      'vue/first-attribute-linebreak': [
        'error',
        {
          multiline: 'ignore',
        },
      ],
    },
  },
)
