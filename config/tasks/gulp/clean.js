const del = require('del');

module.exports = () => {
  $.gulp.task('clean', (cb) => {
    $.gulp.parallel('clean:build', 'clean:cache')(cb);
  });
  $.gulp.task('clean:build', async () => {
    await del($.paths.clean, { force: true });
  });
  $.gulp.task('clean:cache', async () => {
    await $.plugins.cache.clearAll();
  });
};
