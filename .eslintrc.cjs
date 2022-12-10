/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'prettier',
  ],
  plugins: ['unused-imports'], // eslint-plugin-unused-imports
  overrides: [
    {
      files: ['cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    /** Auto remove unused inports [eslint-plugin-unused-imports] */
    '@typescript-eslint/no-unused-vars': 0, // 'off'
    'no-unused-vars': 'off', // 0 // khai báo biến mà không sử dụng sẽ lỗi
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    /** End - Auto remove unused inports */
    'max-len': [
      'error',
      { code: 80, ignoreUrls: true, ignorePattern: '<path .* /?>' },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // fix error: delete 'cr'
      },
    ],
  },
};
