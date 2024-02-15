import antfu from '@antfu/eslint-config'

export default antfu({
    stylistic: {
        indent: "tab",
        quotes: 'single',
        semi: false,
    },
    typescript: true,
    vue: true,
    jsonc: false,
    yaml: false,
})