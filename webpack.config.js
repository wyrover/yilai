import path from 'path';
import minimist from 'minimist';
import vue from 'vue-loader';
import nib from 'nib';
import autoprefixer from 'autoprefixer';
import webpack, { DefinePlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// 获取命令行参数
// --release 生产模式
// --port X 指定端口为 X
// --preview 是否开启预览，开发环境默认开启
const argv = minimist(process.argv.slice(2));

// 调试模式开关
// 指定命令行参数 --release 则为生产环境，否则为开发环境
const DEBUG = !argv.release;

// 资源服务端口
// 如果默认端口8080被占用，可通过命令行参数 --port 手动指定
const PORT = argv.port || 8080;

// 样式表需要兼容的最低系统或浏览器版本
const AUTOPREFIXER_BROWSERS = [
  // 'Android 2.3',
  'Android >= 4',
  'Chrome >= 36',
  'Explorer >= 9',
  'iOS >= 7',
  'Safari >= 7'
];

// 当图片大小小于 2K 时转换为 BASE64，否则直接使用文件
const BASE64_LIMIT = 2048;

// 调试模式下的全局变量
// 形如 `if(__DEV__) { ... } ` 的调试代码会在发布到生产环境时自动被丢弃
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};

// 传入 Jade 文件中的变量
const MARKUP_LOCALS = {
  __DEV__: DEBUG,
  basePath: DEBUG ? `http://localhost:${PORT}/dist/` : '',
  siteName: 'XLink'
};

// 基础目录
const dirs = {
  src: 'src',     // 源文档目录
  pub: 'public',  // 开发调试临时目录
  dist: 'dist'    // 代码发布目录
};

// 基本设置
const config = {
  // 基础目录
  dirs: dirs,

  // 端口
  port: PORT,

  // 详细的日志输出
  verbose: !!argv.verbose,

  // 是否开启预览
  preview: argv.preview,

  // 标记语言
  markup: {
    src: [
      `./${dirs.src}/**/*.jade`,
      '!**/_*.jade'
    ],
    dest: DEBUG ? `./${dirs.pub}` : `./${dirs.dist}`,
    locals: MARKUP_LOCALS
  },

  // 测试
  test: {
    dir: [
      `./${dirs.test}/**/*.js`
    ]
  }
};

export { config };

export default {
  // 开发环境启用 source-map
  devtool: DEBUG ? 'source-map' : false,

  cache: DEBUG,
  debug: DEBUG,

  // 高亮 webpack 输出
  stats: {
    color: true,
    reasons: DEBUG
  },

  // 入口文件
  // 调试模式启用 webpack-dev-server
  entry: {
    app: [
      `./${dirs.src}/main`
    ].concat(DEBUG ? [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?http://localhost:${PORT}`,
    ] : [])
  },

  // 输出
  output: {
    filename: 'scripts/[name].js',
    path: path.join(__dirname, dirs.dist),
    publicPath: `http://localhost:${PORT}/${dirs.dist}`
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    // 设置自动扩展名识别
    extensions: ['', '.js', '.json']
  },

  module: {
    loaders: [{
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: vue.withLoaders({
        // 调试 Stylus 时允许 css-loader 启用 source map
        // !!!在生产环境中禁用 css-loader 的压缩功能，否则会导致单位转换出错等问题!!!!
        stylus: DEBUG ? 'style!css?sourceMap!postcss!stylus' : ExtractTextPlugin.extract('css?-minimize!postcss!stylus')
      })
    }, {
      test: /\.(eot|ttf|woff|woff2|svg|otf)$/,
      loader: 'file?name=fonts/[name].[ext]'
    }, {
      test: /\.png/,
      loader: `url?name=images/[name]_[hash:6].[ext]&limit=${BASE64_LIMIT}&mimetype=image/png`
    }, {
      test: /\.jpg/,
      loader: `url?name=images/[name]_[hash:6].[ext]&limit=${BASE64_LIMIT}&mimetype=image/jpg`
    }, {
      test: /\.gif/,
      loader: `url?name=images/[name]_[hash:6].[ext]&limit=${BASE64_LIMIT}&mimetype=image/gif`
    }]
  },

  // 使用 Nib
  stylus: {
    use: nib()
  },

  // CSS 预处理
  postcss: [autoprefixer(AUTOPREFIXER_BROWSERS)],

  // 如果是调试模式，则不打包库文件以加速编译速度
  externals: DEBUG ? [{
    'vue': 'Vue'
  }] : [],

  plugins: [
    // 优化模块加载顺序
    new webpack.optimize.OccurenceOrderPlugin(true),

    // 变量定义，以便在开发阶段使用
    new DefinePlugin(GLOBALS)
  ].concat(DEBUG ? [
    // 代码热替换
    new webpack.HotModuleReplacementPlugin(),

    // 禁止调试模式报错
    new webpack.NoErrorsPlugin()
  ] : [
    // 抽取 CSS 到独立的文件
    new ExtractTextPlugin('styles/[name].css'),

    // 合并相同
    new webpack.optimize.DedupePlugin(),

    // 代码压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // 最大限度地合并相似模块
    new webpack.optimize.AggressiveMergingPlugin()
  ])
};