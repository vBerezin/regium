const path = require('path');
const pugPluginAlias = require('pug-alias');

module.exports = () => {
  $.gulp.task('pug:linter', () => $.gulp.src($.paths.pug.lint)
    .pipe($.plugins.pugLinter({
      reporter: 'default',
      failAfterError: false,
    })));
  $.gulp.task('pug', async () => {
    await $.gulp.src($.paths.pug.src)
      .pipe($.plugins.pug({
        basedir: path.resolve($.paths.src),
        pretty: !$.isProd,
        plugins: [
          pugPluginAlias($.paths.alias),
        ],
        data: {
          $: {
            argv: {
              prod: $.isProd,
            },
            version: $.gitInfo.commit.trim().slice(0,5),
            data: {},
          },
        },
      }))
      .on('error', $.plugins.notify.onError(error => ({
        title: 'pug',
        message: error.message,
      })))
      .pipe($.gulp.dest($.paths.pug.dest));
  });
};
