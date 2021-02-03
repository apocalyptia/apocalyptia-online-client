module.exports = {
	extends: '@sveltejs/snowpack-config',
	mount: {
		'src/classes': '/_classes',
		'src/components': '/_components',
		'src/database': '/_database',
		'src/rules': '/_rules',
		'src/stores': '/_stores',
		'src/utils': '/_utils'
	},
	alias: {
		$classes: './src/classes',
		$components: './src/components',
		$database: './src/database',
		$rules: './src/rules',
		$stores: './src/stores',
		$utils: './src/utils'
	}
}