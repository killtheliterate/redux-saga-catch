module.exports = function (api) {
  api.cache(false)

  const presets = [
    ['@babel/env', { targets: { node: 6 } }],
    '@babel/preset-typescript'
  ]

  const plugins = [
    // '@babel/plugin-proposal-class-properties',
    // '@babel/plugin-proposal-object-rest-spread',
    // '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    'lodash',
    'macros'
  ]

  return {
    presets,
    plugins
  }
}
