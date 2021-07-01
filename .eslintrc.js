module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },

  plugins: [
    '@typescript-eslint'
  ],

  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },

  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: './',
  }
}
