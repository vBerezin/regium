module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[path][name].[ext]',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
