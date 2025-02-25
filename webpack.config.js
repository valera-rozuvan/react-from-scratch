const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const SOURCE_FOLDER = "src";
const BUILD_FOLDER = "build";

const webpackConfig = {
  entry: path.join(__dirname, SOURCE_FOLDER, "index.tsx"),
  output: {
    path: path.join(__dirname, BUILD_FOLDER),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          context: __dirname,
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: path.join(__dirname, "public", "favicon.ico"),
      hash: true, // For cache busting
      filename: path.join(__dirname, BUILD_FOLDER, "index.html"),
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[name].js.map",
    })
  ],
  devtool: false,
  devServer: {
    port: 3000,
    open: false,
    hot: false,
  },
  mode: "development",
};

module.exports = webpackConfig;
