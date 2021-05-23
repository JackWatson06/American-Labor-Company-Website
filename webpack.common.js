const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    "index"    : path.resolve(__dirname, 'src/js/pages/index.js'),
    "employee" : path.resolve(__dirname, 'src/js/pages/employee.js'),
    "employer" : path.resolve(__dirname, 'src/js/pages/employer.js'),
    "about-us" : path.resolve(__dirname, 'src/js/pages/about-us.js'),
  },
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'links/*',
          context: path.resolve(__dirname, 'src/php')
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/html/index.html'),
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/html/employee.html'),
      filename: 'employee.html',
      chunks: ['employee']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/html/employer.html'),
      filename: 'employer.html',
      chunks: ['employer']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/html/about-us.html'),
      filename: 'about-us.html',
      chunks: ['about-us']
    })
  ],
  module: {
    rules: [
      // HTML Loader
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // CSS Loader, and Extractor
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // Turns css into commonJS
        ],
      },
      // Asset Resource Loader for images
      {
        test: /\.(png|jpg|jpeg|svg)$/i,
        type: "asset/resource"
      },
      // Asset Resource Loader for font
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource"
      },
    ]
  },
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin()
    ],
  }
};
