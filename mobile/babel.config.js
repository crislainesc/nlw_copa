module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
          alias: {
            '@/assets': './src/assets',
            '@/components': './src/components',
            '@/screens': './src/screens',
            '@/styles': './src/styles',
          },
        },
      ],
    ],
  }
}
