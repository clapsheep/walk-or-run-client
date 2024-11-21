import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default {
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,vue}'],
  extends: [
    'eslint:recommended',
    js.configs.recommended,
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier',
    skipFormatting,
  ],
  plugins: {
    vue: pluginVue,
  },
  rules: {
    // JavaScript 기본 규칙
    'prefer-const': 'warn',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-destructuring': 'warn',
    'prefer-template': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-arrow-callback': 'error',

    // 코드 구조 관련 규칙
    'max-depth': ['error', 2],
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'brace-style': 'error',

    // Import 관련 규칙
    'import/first': 'warn',

    // 기타 오류 방지 규칙
    'no-unreachable': 'error',
    'no-loop-func': 'error',
    'wrap-iife': ['error', 'any'],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
}
