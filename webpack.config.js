const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const path = require('path');

module.exports = {
   mode: 'production',

   entry: {
      app: './src/index.js',
   },

   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.[contenthash].js',
      clean: true,
      assetModuleFilename: 'static/[hash][ext]',
   },

   module: {
      rules: [
         {
            test: /\.html$/,
            use: [
               {
                  loader: 'html-loader',
                  options: { minimize: false },
               },
            ],
         },
         {
            test: /\.js/,
            exclude: /node_modules/,
            use: ['babel-loader'],
         },
         {
            test: /\.(css|scss|sass)$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader',
               'postcss-loader',
            ],
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
            type: 'asset/resource',
            use: ['image-webpack-loader'],
         },
      ],
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: 'src/index.html',
         filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
         filename: 'main.[contenthash].css',
      }),
      new MinifyPlugin(),
   ],

   optimization: {
      minimizer: [new CssMinimizerPlugin()],
   },

   devServer: {
      open: true,
      port: 4040,
      compress: true,
      client: {
         overlay: {
            errors: true,
            warnings: false,
         },
      },
   },
};
