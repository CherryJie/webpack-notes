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
    
