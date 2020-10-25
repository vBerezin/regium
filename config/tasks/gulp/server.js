module.exports = () => {
  $.gulp.task('server', () => new Promise((resolve) => {
    const Server = $.webpackServer;
    const webpack = $.webpack($.webpackConfig);
    const options = Object.assign($.webpackConfig.devServer, {
      open: true,
      contentBase: $.paths.server.base,
      watchContentBase: true,
      hot: true,
      liveReload: true,
      overlay: true,
      stats: {
        colors: true,
      },
    });
    const server = new Server(webpack, options);
    server.listen(8080, 'localhost', () => {
      console.log('Starting server on http://localhost:8080');
      resolve(server);
    });
  }));
};
