const path = require("path"); // 一个 Node.js 核心模块，用于操作文件路径。
const webpack = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 只作用于生产环境，开始打包前自动清空dist文件夹
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将 css 单独打包成文件通过link方式引入
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩 css
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 静态资源拷贝：将单个文件或整个目录复制到构建目录
// webpack-bundle-analyzer：只作用于生产环境，用来分析打包文件
// const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  mode: "development", // 开发环境
  devtool: "cheap-module-source-map",
  target: "web",
  devServer: {
    static: {
      directory: path.join(__dirname, "./dist"), // 告诉服务器在哪里查找文件
    },
    // historyApiFallback: true,
    port: 8090, // 端口号
    open: "chrome", // 自动启服务器
    // hot: true, // 启用 webpack 的模块热替换特性
    // hotOnly: true, // 注释之后 报错代码后页面自动刷新
    // liveReload: true,
    // overlay: false, // 代码出错弹出浮动层
    // inline: true,
  },
  entry: {
    main: "./src/index.js", // 入口文件
    // xlsxfullmin: "./src/assets/xlsx.full.min.js", // xlsx文件
  },
  output: {
    filename: "[name].js", // 打包出来的文件名
    path: path.resolve(__dirname, "dist"), // 出口目录: dist文件夹
    // publicPath: 'http://cdn.com.cn' // 引入打包出来的js文件名称前加上cdn前缀
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // 匹配.js|x结尾的文件
        exclude: /node_modules/, // 排除依赖包文件夹
        loader: "babel-loader", // 使用babel-loader，配置在.babelrc
      },
      {
        test: /\.tsx?$/, // 匹配.ts|x结尾的文件
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/, // 匹配图片文件
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/", // 图片输出路径，在/dist下
            limit: 1024 * 10, // 超过10k用file-loader，反之用url-loader
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // 将css用link的方式引入就不再需要style-loader了
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2, // 配置「css-loader 作用于 @import 的资源之前」有多少个 loader。
              modules: true, // 启用 CSS 模块化规范
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // title: "",
      // 压缩 HTML 文件
      // minify: {
      //   removeComments: true, // 移除 HTML 中的注释
      //   collapseWhitespace: true, // 删除空白符与换行符
      //   minifyCSS: true, // 压缩内联 css
      // },
      // filename: 'index.html', // 生成后的文件名
      template: "src/index.html", // 根据此模版生成 HTML 文件
    }),
    // new webpack.HotModuleReplacementPlugin(), // 设置target: "web"也实现了热模块更新
    new MiniCssExtractPlugin({
      filename: "./css/[name].css", // 前面加上目录
      chunkFilename: "[id].css",
    }),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.css$/g,
    //   cssProcessor: require("cssnano"), //用于优化\最小化 CSS 的 CSS 处理器，默认为 cssnano
    //   cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}
    //   canPrint: true, //布尔值，指示插件是否可以将消息打印到控制台，默认为 true
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/static/*.js",
          to: `${path.resolve(__dirname, "dist", "js")}/[name][ext]`, // 输出到 dist/js/[name][ext]
        },
        // 还可以继续配置其它要拷贝的文件
      ],
    }),
  ],
  // 模块解析规则
  resolve: {
    // 配置extensions，这样以后引入文件就不需要带扩展名
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
    // 路径别名设置
    alias: {
      "@": path.resolve(__dirname, "src"), // 设置@为src目录的别名
    },
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // modules: [path.resolve(__dirname, "node_modules")],
  },
};
