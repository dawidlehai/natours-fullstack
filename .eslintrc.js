module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    no-unused-vars: ['error', { varsIgnorePattern: 'next' }],
  },
  globals: {
    __dirname: 'readonly',
    process: 'readonly',
  },
};
