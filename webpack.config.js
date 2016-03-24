var webpack = require('webpack');

module.exports = {
  entry: {
    "happy-query": "./src/index.js",
    "happy-query.min": "./src/index.js"
  },
  devtool: "source-map",
  output: {
    path: "./dist",
    filename: "[name].js",
    libraryTarget: "umd",
    library: "HappyQuery"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};