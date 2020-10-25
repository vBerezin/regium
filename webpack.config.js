const merge = require('webpack-merge');
const ARGV = require('yargs').argv;

global.$ = {
  isProd: ARGV.prod || ARGV.production,
};

$.paths = require('./config/paths');

$.tasks = {
  js: require('./config/tasks/webpack/js'),
  styles: require('./config/tasks/webpack/styles'),
  fonts: require('./config/tasks/webpack/fonts'),
  images: require('./config/tasks/webpack/images'),
  linterJs: require('./config/tasks/webpack/linter-js'),
  linterStyles: require('./config/tasks/webpack/linter-styles'),
  minify: require('./config/tasks/webpack/minify'),
};

const config = {
  base: require('./config/webpack.config.base'),
  prod: require('./config/webpack.config.production'),
  dev: require('./config/webpack.config.development'),
};

module.exports = merge(config.base, $.isProd ? config.prod : config.dev);
