const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

function resolveAlias(aliases) {
  const alias = {};
  for (const key in aliases) {
    alias[key] = path.relative($.paths.webpack.context, path.resolve(aliases[key]));
  }
  return alias;
}

module.exports = merge(
  $.tasks.js,
  $.tasks.styles,
  $.tasks.fonts,
  $.tasks.images,
  {
    entry: $.paths.webpack.src,
    context: path.resolve($.paths.webpack.context),
    output: {
      path: path.resolve($.paths.webpack.dest),
      publicPath: `${path.relative($.paths.build, $.paths.webpack.dest)}/`,
      filename: '[name].js',
    },
    resolve: {
      alias: resolveAlias($.paths.alias),
      extensions: ['.js', '.scss', '.css'],
      modules: ['node_modules', $.paths.webpack.context, $.paths.build],
    },
    optimization: {
      namedChunks: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        DEV_ENV: !$.isProd,
      }),
    ],
  },
);
