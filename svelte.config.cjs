const netlify = require('@sveltejs/adapter-netlify');
const pkg = require('./package.json');

module.exports = {
	kit: {
		adapter: netlify(),
		target: '#svelte',
		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			}
		}
	}
};
