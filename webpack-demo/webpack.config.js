// __dirname 是 node 中系统提供的，
// node 系统模块
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  // 入门配置
  // entry output 是必须的，其他的都不是
  entry: {
    index: './src/index.js',
    index2: './src/index2.js',
  },
  // 出口配置
  output: {
    // path: __dirname + '/dist', // path 必须是绝对路径
    path: path.resolve(__dirname, 'dist'),
    // resolve 用于合并路径, 这里的 name 用于指示 entry 的名字
    filename: '[name].bundle.js',
  },
  devServer: {
    // 访问的基本目录
    contentBase: path.resolve(__dirname, 'dist'),
    // 服务器的 IP 地址
    host: 'localhost',
    // 设置端口
    port: 8090,
    open: true, // 自动打开浏览器
    hot: true, // 热更新，但是必须确保 hot module replacement 打开
  },
  // 插件， 数组形式
  plugins: [
    // 开启热更新的模块
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']),
    // new HtmlWebpackPlugin(),
    // 下面可以来带上配置
    new HtmlWebpackPlugin({
      // 要指定不同的 js 到不同的文件，要使用 chunks
      // 这里要写的名字是 entry 中 的 key
      chunks: ['index'],
      title: 'I Love China',
      // 这里是指所用的模板
      template: './src/index.html',
      // 这里是指要输出的文件，默认的是 index.html
      filename: 'index.html',
    }),
    // 这里想要生成多个页面的时候, 必须要声明多次, 并且要定义 filename 来区别多个页面
    // new HtmlWebpackPlugin({
    //   chunks: ['index2'],
    //   title: 'Li Bai',
    //   template: './src/index2.html',
    //   filename: 'index2.html',
    // }),
  ]
};