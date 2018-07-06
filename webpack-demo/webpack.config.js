// __dirname 是 node 中系统提供的，
// const path = require('path'); node 系统模块
module.exports = {
  // 入门配置
  // entry output 是必须的，其他的都不是
  entry: {
    entry: './src/index.js'
  },
  // 出口配置
  output: {
    path: __dirname + '/dist', // path 必须是绝对路径
    // path: path.resolve(__dirname, 'dist');  resolve 用于合并路径
    filename: 'bundle.js',
  },
};