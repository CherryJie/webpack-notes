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