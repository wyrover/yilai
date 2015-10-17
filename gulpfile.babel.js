import gulp from 'gulp';
import babel from 'babel-core/register';
import webpackConfig, { config } from './webpack.config';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import browserSync from 'browser-sync';
import sequence from 'gulp-sequence';
import jade from 'gulp-jade';
import data from 'gulp-data';
import watch from 'gulp-watch';
import gutil from 'gulp-util';
import jsonServer from 'json-server';
import merge from 'lodash/object/merge';
import fm from 'front-matter';
import rimraf from 'rimraf';
import fakeData from './data';

const DEBUG = webpackConfig.debug;

// 资源服务
gulp.task('webpack-server', cb => {
  function createServer () {
    const bundler = webpack(webpackConfig);

    const webpackServer = new WebpackDevServer(bundler, {
      contentBase: config.dirs.src,
      hot: true,
      // 此处需要手动设置 `publicPath` 的值
      publicPath: webpackConfig.output.publicPath,
      // quiet: true,
      filename: 'app.js',
      stats: { colors: true },
      historyApiFallback: true
    });

    // 资源伺服
    webpackServer.listen(config.port, config.domain, function () {
      gutil.log(`Webpack-dev-server is serving files from http://${config.domain}:${config.port}...`);
    });

  }

  try {
    createServer();
  } catch (err) {
    console.log(err.toString());
  }

  cb();

});

// JSON 服务器
gulp.task('json-server', function() {
  var server = jsonServer.create();
  var router;

  router = jsonServer.router(fakeData);

  server.use(jsonServer.defaults());
  server.use(router);

  server.listen(3000);
});

// HTTP 服务器
gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: DEBUG ? [`./${config.dirs.pub}`, `./${config.dirs.src}/assets`, 'node_modules'] : [`./${config.dirs.dist}`]
    }
  });
});

// 打包
gulp.task('bundle', cb => {
  const bundler = webpack(webpackConfig);

  function bundle(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    // 打印打包进程消息
    console.log(stats.toString({
      colors: gutil.colors.supportsColor,
      hash: config.verbose,
      version: config.verbose,
      timings: config.verbose,
      // chunks: config.verbose,
      chunkModules: config.verbose,
      cached: config.verbose,
      cachedAssets: config.verbose
    }));

    return cb();
  }

  // 执行打包!
  bundler.run(bundle);

});

// 生成 HTML 文件
gulp.task('markup', ['clean'], () => {
  gulp.src(config.markup.src.concat(config.markup.excluded))
    .pipe(data(function(file) {
      var content = fm(String(file.contents));
      file.contents = new Buffer(content.body);
      return merge(config.markup.locals, content.attributes);
    }))
    .pipe(jade({
      pretty: '  '
    }))
    .pipe(gulp.dest(config.markup.dest))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});

// 清理
gulp.task('clean', cb => {
  rimraf(DEBUG ? `./${config.dirs.pub}` : `./${config.dirs.dist}`, cb);
});

// 资源
gulp.task('assets', function() {
  gulp.src(`./${config.dirs.src}/assets/**/*`)
    .pipe(gulp.dest(`./${config.dirs.dist}`));
});

// 监听
gulp.task('watch', () => {
  watch(config.markup.src, () => {
    gulp.start('markup');
  });
});

// 默认任务
gulp.task('default', (cb) => {
  if (DEBUG) {
    sequence('json-server', 'webpack-server', 'markup', 'serve', 'watch', cb);
  } else {
    if (config.preview) {
      sequence('markup', 'bundle', 'assets', 'serve', cb);
    } else{
      sequence('markup', 'bundle', 'assets', cb);
    }
  }
});
