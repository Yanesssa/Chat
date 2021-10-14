const path = require('path');
const webpack = require('webpack');

const sass = require('node-sass');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const ExtractTextPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    index: './js/index',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: ExtractTextPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin(
      {
        filename: "style.css",
        chunkFilename: "style.css",
      }
    ),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/html/index.html'),
      filename: 'index.html',
    }),
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.min.js",
      jQuery: "jquery/dist/jquery.min.js",
      "window.jQuery": "jquery/dist/jquery.min.js"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./images",
          to: "images",
        },
        {
          from: "./fonts",
          to: "./fonts",
        },
        {
          from: "./favicon.ico",
          to: "./favicon.ico",
        },
      ],
    }),
  ]
}