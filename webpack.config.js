/** webpack module */
const webpack = require('webpack');

/** css-loader를 통해 문자열화된 파일을 다시 css 파일 형태로 변환해준다. */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** html을 생성하고 빌드된 static file들을 연결해준다. */
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** node 환경에서 쓰는 path module. */
const path = require('path');

const sassRegex = /\.s(a|c)ss/;
const sassModuleRegex = /\.module\.s(a|c)ss/;

module.exports = {
  context: __dirname,
  mode: 'development', // 값으로 'production' or 'development'이 가능하고, 값에 따라 기본적으로 적용되는 플러그인이 다르다.
  entry: { 
    main: './src/index.jsx', // webpack이 읽어들일 파일. key name으로 빌드된 파일명이 결졍된다.
  },
  output: {
    path: path.join(__dirname, 'dist'), // 빌드된 파일이 위치할 경로.
    filename: '[name].js', // [name]은 entry의 key와 동일하다.
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // 정규식을 통해 js, jsx를 찾는다.
        loader: 'babel-loader', // 사용할 로더 정의.
        options: { // 로더의 옵션 정의
          presets: [
            [
              '@babel/preset-env', {
                targets: { node: 'current' },
                modules: false
              }
            ],
            '@babel/preset-react',
          ],
        },
        exclude: ['/node_modules'],
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: sassModuleRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'sass-loader'
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(['development']) }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new MiniCssExtractPlugin({ filename: 'main.css' }),
    new HtmlWebpackPlugin(
      {
        template: path.join(__dirname, 'public/index.html')
      }
    ),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  }
};