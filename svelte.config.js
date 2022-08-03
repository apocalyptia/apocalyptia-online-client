import adapter from '@sveltejs/adapter-auto'


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		files: {
			assets: 'static',
		},
		alias: {
			$components: './src/components',
			$classes: './src/classes',
			$routes: './src/routes',
			$rules: './src/rules',
			$stores: './src/stores',
			$utils: './src/utils'
		}
	}
}

export default config
