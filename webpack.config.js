const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (_env, argv = {}) => ({
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Keep Babel JSX output aligned with React’s Webpack runtime.
            envName: argv.mode || 'production',
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  // this helps babel look for .ts and .tsx files to transpile
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico',
    }),
  ],
});
