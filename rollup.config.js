import { createRollupConfigs } from './scripts/base.config.js'
import autoPreprocess from 'svelte-preprocess'
import postcssImport from 'postcss-import'

const production = !process.env.ROLLUP_WATCH;

export const config = {
  staticDir: 'static',
  distDir: 'dist',
  buildDir: `dist/build`,
  serve: !production,
  production,
  rollupWrapper: rollup => rollup,
  svelteWrapper: svelte => {
    svelte.preprocess = [
      autoPreprocess({
        postcss: { plugins: [postcssImport()] },
        defaults: { style: 'postcss' }
      })]
  },
  swWrapper: worker => worker,
}

const configs = createRollupConfigs(config)

export default configs