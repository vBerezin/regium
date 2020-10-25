module.exports = () => {
  $.gulp.task('static', () => $.gulp.src($.paths.static.src)
    .pipe($.gulp.dest($.paths.static.dest)));
};
