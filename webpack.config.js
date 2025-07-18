const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          context: __dirname,
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[name].js.map",
    }),
    new webpack.DefinePlugin({
      '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })',
    }),
  ],
  devtool: false,
  mode: "development",
  infrastructureLogging: {
    level: "error",
  },
  stats: "errors-only",
};
