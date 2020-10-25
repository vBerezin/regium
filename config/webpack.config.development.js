const merge = require('webpack-merge');

module.exports = merge(
  // TODO: донастроить линтеры
  // $.tasks.linterJs,
  // $.tasks.linterStyles,
  {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
      minimize: false,
    },
    devServer: {
      contentBase: $.paths.server,
    },
  },
);
