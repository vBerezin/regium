module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          failOnError: false,
        },
      },
    ],
  },
};
