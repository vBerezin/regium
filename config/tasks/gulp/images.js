const path = require('path');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');

module.exports = () => {
  $.gulp.task('images', () => $.gulp.src($.paths.images.src)
    .pipe($.plugins.cache(
      $.plugins.imagemin([
        $.plugins.imagemin.gifsicle({ interlaced: true }),
        $.plugins.imagemin.jpegtran({ progressive: true }),
        $.plugins.imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: true }],
        }),
        pngquant({
          speed: 1,
          quality: 95,
          strip: true,
          floyd: 1,
        }),
        mozjpeg({ quality: 95 }),
      ], { verbose: true }),
    ))
    .pipe($.gulp.dest($.paths.images.dest)));
};
