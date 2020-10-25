const process = require('process');

module.exports = () => {
  $.gulp.task('webpack', (callback) => {
    $.webpack($.webpackConfig, (error, stats) => {
      callback();
      if (stats.hasErrors()) {
        console.error(stats.compilation.errors[0].message);
      } else {
        console.info(stats.toString());
      }
      if (error) {
        $.plugins.notify.onError({
          title: 'webpack',
          message: error,
        });
        process.exit(1);
      }
    });
  });
};
