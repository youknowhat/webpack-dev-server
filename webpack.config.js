const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\/jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env', {
              targets: { node: 'current' },
              modules: 'false'
            }
          ],
          '@babel/preset-react',
          '@babel/preset-stage-0'
        ],
      },
      exclude: ['/node_modules'],
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(['production'])
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
  optimization: {
    minimize: true/false,
    splitChunks: {},
    concatenateModules: true,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css']
  }
};