const ARGV = require('yargs').argv;
const glob = require('glob');

const tasks = glob.sync('./config/tasks/gulp/*.js');

global.$ = {
  gulp: require('gulp'),
  isProd: ARGV.prod || ARGV.production,
  gitInfo: require('./config/utils/git-info'),
  plugins: require('gulp-load-plugins')(),
  webpack: require('webpack'),
  webpackServer: require('webpack-dev-server'),
  webpackConfig: require('./webpack.config'),
};
$.paths = require('./config/paths');

tasks.forEach(task => require(task)());

$.gulp.task('build', (cb) => {
  $.gulp.series(
    'clean',
    $.gulp.parallel('static', 'images', 'icons'),
    $.gulp.parallel('webpack', 'pug'),
  )(cb);
});

$.gulp.task('default', (cb) => {
  $.gulp.series('build', 'server', 'watch')(cb);
});
