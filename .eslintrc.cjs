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
		'array-bracket-newline': {
			multiline: true,
			minItems: 3,
		},
		'array-element-newline': {
			multiline: true,
			minItems: 3,
		},
		'comma-dangle': 'always-multiline',
		'function-call-argument-newline': 'always',
		'function-call-spacing': 'never',
		'function-paren-newline': 'multiline',
		'quotes': 'backtick',
		'space-before-function-parentheses': 'never',
		'object-curly-newline': 'always',
		'object-property-newline': {
			allowAllPropertiesOnSameLine: false,
		},
	},
}
