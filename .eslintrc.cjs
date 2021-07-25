module.exports = {
	root: true,
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['svelte3'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		'function-paren-newline': 'multiline',
		'function-call-spacing': 'never',
		'function-call-argument-newline': 'consistent',
		'quotes': 'backtick',
		'space-before-function-parentheses': 'never',
	},
}
