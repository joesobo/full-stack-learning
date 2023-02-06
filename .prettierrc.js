module.exports = {
	plugins: [
		require('prettier-plugin-import-sort'),
		require('prettier-plugin-astro'),
		require('prettier-plugin-vue'),
		require('prettier-plugin-svelte'),
		require('prettier-plugin-tailwindcss'), // MUST come last
	],
	pluginSearchDirs: false,
	tailwindConfig: './astro-client/tailwind.config.cjs',
	trailingComma: 'es5',
	semi: false,
	singleQuote: true,
	useTabs: true,
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
}
