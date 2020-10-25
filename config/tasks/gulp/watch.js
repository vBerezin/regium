module.exports = () => {
  const options = {
    awaitWriteFinish: true,
  };
  $.gulp.task('watch', () => {
    $.gulp.watch($.paths.pug.watch, options, $.gulp.series('pug'));
    $.gulp.watch($.paths.images.watch, options, $.gulp.series('images'));
    $.gulp.watch($.paths.static.watch, options, $.gulp.series('static'));
    $.gulp.watch($.paths.icons.watch, options, $.gulp.series('icons', 'pug'));
  });
};
