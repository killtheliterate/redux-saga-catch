import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

// ---------------------------------------------------------------------------

const extensions = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
]

const baseConfig = {
  plugins: [
    nodeResolve({ 
      extensions
    }),

    commonjs(),

    babel({ 
      extensions,
      babelHelpers: 'runtime' 
    })
  ],

  input: 'src/index.ts',

  external: [
    'lodash',
    'redux',
    'redux-saga',
    'redux-saga/effects',
    /@babel\/runtime/
  ]
}

const esConfig = Object.assign(
  {},
  baseConfig,
  {
    output: {
      exports: 'named',
      file: 'dist/es/index.js',
      format: 'es'
    }
  }
)

const cjsConfig = Object.assign(
  {},
  baseConfig,
  {
    output: {
      exports: 'named',
      file: 'dist/cjs/index.js',
      format: 'cjs'
    }
  }
)

export default [
  cjsConfig,
  esConfig
]
