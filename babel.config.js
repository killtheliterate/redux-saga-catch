module.exports = function (api) {
  api.cache(false)

  const presets = [
    '@babel/preset-env',
    '@babel/preset-typescript'
  ]

  const plugins = [
    '@babel/plugin-transform-runtime',
    'lodash',
    'macros'
  ]

  return {
    presets,
    plugins
  }
}
