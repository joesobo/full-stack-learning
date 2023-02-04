module.exports = {
	plugins: [
		require('prettier-plugin-astro'),
		require('prettier-plugin-tailwindcss'), // MUST come last
	],
	pluginSearchDirs: false,
	tailwindConfig: './astro-client/tailwind.config.cjs',
	trailingComma: 'es5',
	semi: false,
	singleQuote: true,
	useTabs: true,
}
