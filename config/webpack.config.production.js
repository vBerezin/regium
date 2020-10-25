const merge = require('webpack-merge');

module.exports = merge(
  $.tasks.minify,
  {
    mode: 'development',
    devtool: false,
    optimization: {
      minimize: true,
    },
  },
);
