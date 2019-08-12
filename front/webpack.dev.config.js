const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log(path.resolve());
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  entry: [path.join(`${path.resolve()}`, 'front/src/index.js')],
  output: {
    path: path.join(`${path.resolve()}`, 'front/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true}
          }
        ]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader',
          options: {url: false}
        },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [`${path.resolve()}/node_modules`]
            }
          }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./front/src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({filename: 'app.css'}),
    new webpack.ProgressPlugin()
  ]
};
