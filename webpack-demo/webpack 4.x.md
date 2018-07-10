# webpack 4.x

标签（空格分隔）： webpack

---

1. webpack 构成
    * 入口 entry
    * 出口 output
    * loaders 转化器
    * plugins 插件
    * devServer 开发服务器
    * mode 开发模式和生产模式

2. cli: command line interface
    * npm install webpack-cli-g
    * npm install webapck --save-dev (npm i webpack -D)
    * npm install vue --save (npm i vue -S)

3. 文件目录
    * 源文件：src 文件 -> index.js 
    * 打包：dist 文件 -> index.html (script:src = bundle.js)
    * 打包示例： webpack src/index.js -- output dist/bundle.js (将 src 中 的 index.js 打包到 dist/bundle.js) 

4. 配置文件
    * webpack.config.js 定义 entry output 后，直接运行 webpack
    * 也可以修改 webpack.config.js 的名字为 filename (自定义)，但是运行的命令应该变为 webpack --config filename
    * 想要加上 mode 时，运行 webpack --mode development/production

5. npm 命令
    * npm run start, npm run build 等，这个是在 package.json 中配置 scripts { "build": "webpack --config filename"}

6. 多入口，出口文件
    * entry: ['.src/index.js', '.src/index2.js'], 这个会按顺序依次打包（不建议这种形式）
    * 应该用 key value 的形式
    ```js
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
    ```
    * 打包好之后会有两个问价 `index.bundle.js` 和 `index2.bundle.js`
        
7. plugins
    * html-webpack-plugin: 用于生成页面 `注意这个是依赖 webpack 的， 所以之前要确保项目中安装了 webpack, webpack-cli` 
    * npm i webpack -D, npm i webpack -cli -D,  npm i html-webpack-plugin -D
    * 引入到 webpack.config.js
    ```js
    // 插件， 数组形式
      plugins: [
        // new HtmlWebpackPlugin(),
        // 下面可以来带上配置
        new HtmlWebpackPlugin({
        // 这里的 title 在 index.html 中应该写为 ejs 的形式，<%= htmlWebpackPlugin.options.title%>
          title: 'I Love China',
          // 这里是指所用的模板
          template: './src/index.html',
          // 这里是指要输出的文件名，默认的是 index.html
          filename: 'login.html',
          // 允许注入
          inject: true, 
        }),
      ]
    ```
    * 注意，这里的 `HtmlWebpackPlugin` 可以调用多次，但是要定义 `filename` 来区分，如果要分别引入 js 文件的话还要加上 `chunks` 属性。
    ```js
    // 插件， 数组形式
      plugins: [
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
          filename: 'login.html',
        }),
        // 这里想要生成多个页面的时候, 必须要声明多次, 并且要定义 filename 来区别多个页面
        new HtmlWebpackPlugin({
          chunks: ['index2'],
          title: 'Li Bai',
          template: './src/index2.html',
          filename: 'index2.html',
        }),
      ]
    ```
    
8. clean-webpack-plugin: 删除某些东西
    * npm i clean-webpack-plugin -D 然后引入
    * 配置： 文件夹的名字用数组形式放入即可 `new CleanWebpackPlugin(['dist'])`
    
9. devServer
    * npm i webpack-dev-server -D
    * 不需要引入，直接使用
    ```js
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
      ]
    ```
    * 这里有一个问题要注意的是，如果我们这样配置，当服务器起来之后，dist 实际上还没打包出来，但是如果你没有更改 `HtmlWebpackPlugin` 默认输出的文件，即`filename: 'index.html'` 实际上还是可以访问的，因为他会有缓存
    * 如果想自动打开浏览器：可以添加一个配置 `open: true` 或者在 命令中加 `--open`
    * 开启热更新，设置 `hot: true` 但是要确保开启 `HotModuleReplacementPlugin` 是开启的，这个开启很简单。
    ```js
    const webpack = require('webpack');
    new webpack.HotModuleReplacementPlugin();
    ```