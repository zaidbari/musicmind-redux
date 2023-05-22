module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					alias: {
						'@/components': './src/components',
						'@/screens': './src/screens',
						'@/assets': './assets',
						'@/constants': './src/constants',
						'@/utils': './src/utils',
						'@/redux': './src/redux',
						'@/context': './src/context',
						'@/services': './src/services',
						'@/types': './src/types',
						'@/hooks': './src/hooks',
						'@/stacks': './src/stacks'
					},
					extensions: ['.js', '.jsx', '.ts', '.tsx']
				}
			],
			'@babel/plugin-proposal-export-namespace-from',
			'react-native-reanimated/plugin'
		]
	}
}
