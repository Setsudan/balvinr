import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 'tab',
    quotes: 'single',
    semi: false,
  },
  vue: true,
  jsonc: false,
  yaml: false,
})
