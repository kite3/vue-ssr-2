const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
  mode: 'none',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 如果图片体积小于limit，url-loader会将图片转为base64
              // 反之，则调用file-loader来处理
              limit: 1024,
              name: '[name].[contenthash:8].[ext]',
              // 存放图片的文件夹
              outputPath: 'img'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 解析vue单文件组件，不加打包会报错
    new VueLoaderPlugin()
  ]
}

module.exports = config
