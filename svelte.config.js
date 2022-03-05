import adapter from '@sveltejs/adapter-netlify'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		files: {
			assets: 'static',
		},
		vite: {
			resolve: {
				alias: {
					'$components': path.resolve('./src/components'),
					'$classes': path.resolve('./src/classes'),
					'$routes': path.resolve('./src/routes'),
					'$rules': path.resolve('./src/rules'),
					'$stores': path.resolve('./src/stores'),
					'$utils': path.resolve('./src/utils')
				}
			}
		}
	},
}

export default config
