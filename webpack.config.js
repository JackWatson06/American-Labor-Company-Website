const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'index': path.resolve(__dirname, 'src/js/index.js'),
    'employee': path.resolve(__dirname, 'src/js/employee.js'),
    'employer': path.resolve(__dirname, 'src/js/employer.js'),
    'about-us': path.resolve(__dirname, 'src/js/about-us.js')
  },
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/html/index.html'),
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'employee.html',
      template: path.resolve(__dirname, 'src/html/employee.html'),
      chunks: ['employee']
    }),
    new HtmlWebpackPlugin({
      filename: 'employer.html',
      template: path.resolve(__dirname, 'src/html/employer.html'),
      chunks: ['employer']
    }),
    new HtmlWebpackPlugin({
      filename: 'about-us.html',
      template: path.resolve(__dirname, 'src/html/about-us.html'),
      chunks: ['about-us']
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'media/'
            }
          }
        ]
      },
      {
        test: /\.(ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  }
};
