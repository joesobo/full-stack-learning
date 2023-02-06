module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:vuejs-accessibility/recommended',
		'plugin:astro/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:tailwindcss/recommended',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'vue',
		'svelte3',
		'@typescript-eslint',
		'zod',
		'vuejs-accessibility',
		'tailwindcss',
	],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'zod/prefer-enum': 'error',
		'zod/require-strict': 'error',
	},
	settings: {
		tailwindcss: {
			config: 'astro-client/tailwind.config.cjs',
			cssFiles: [
				'**/*.css',
				'!**/node_modules',
				'!**/.*',
				'!**/dist',
				'!**/build',
			],
		},
		'svelte3/typescript': true,
	},
	overrides: [
		{
			files: ['*.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
			},
		},
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
}
