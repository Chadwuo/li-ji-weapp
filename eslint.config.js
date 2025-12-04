import uni from '@uni-helper/eslint-config'

export default uni(
  {
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
