const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/html/index.html'),
      hash: true,
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'employee.html',
      template: path.resolve(__dirname, 'src/html/employee.html'),
      hash: true,
      chunks: ['employee']
    }),
    new HtmlWebpackPlugin({
      filename: 'employer.html',
      template: path.resolve(__dirname, 'src/html/employer.html'),
      hash: true,
      chunks: ['employer']
    }),
    new HtmlWebpackPlugin({
      filename: 'about-us.html',
      template: path.resolve(__dirname, 'src/html/about-us.html'),
      hash: true,
      chunks: ['about-us']
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
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
    ],
  }
};
