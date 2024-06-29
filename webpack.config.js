// webpack.config.js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx", // エントリーポイント
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "client.js",
    publicPath: "/build/", // サーバー上でのバンドルされたファイルのパス
  },
  resolve: {
    alias: {
      "@context": path.resolve(__dirname, "src/context"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"], // 使う拡張子を追加
  },
  module: {
    rules: [
      {
        test: /\.js|.tsx|.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // .cssファイルを対象にする場合
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "client.css",
    }),
  ],
};
