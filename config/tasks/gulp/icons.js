module.exports = () => {
  $.gulp.task('icons', async () => {
    const config = {
      shape: {
        id: {
          generator: 'icon-%s',
        },
        dimension: {
          maxWidth: 50,
          maxHeight: 50,
        },
        spacing: {
          padding: 2,
        },
      },
      mode: {
        inline: true,
        symbol: {
          sprite: 'sprite.svg',
          render: {
            scss: {
              template: $.paths.icons.template,
            },
          },
        },
      },
    };
    return $.gulp.src($.paths.icons.src)
      .pipe($.plugins.svgmin({ js2svg: { pretty: true } }))
      .on('error', $.plugins.notify.onError({ title: 'icons' }))
      .pipe($.plugins.cheerio({
        run: function run($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
          $('title').remove();
        },
        parserOptions: { xmlMode: true },
      }))
      .pipe($.plugins.replace('&gt;', '>'))
      .pipe($.plugins.svgSprite(config))
      .pipe($.gulp.dest($.paths.icons.dest));
  });
};
