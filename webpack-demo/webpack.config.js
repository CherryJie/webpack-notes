// __dirname 是 node 中系统提供的，
// node 系统模块
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  // 插件， 数组形式
  plugins: [
    // new HtmlWebpackPlugin(),
    // 下面可以来带上配置
    new HtmlWebpackPlugin({
      title: 'I Love China',
      // 这里是指所用的模板
      template: './src/index.html',
      // 这里是指要输出的文件，默认的是 index.html
      filename: 'login.html',
    }),
  ]
};