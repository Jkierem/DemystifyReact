const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          "plugins":[
            "@babel/plugin-syntax-jsx",
            "@babel/plugin-proposal-class-properties",
            ["@babel/plugin-transform-react-jsx",
              {
                "pragma": "Juan.createElement",
                "pragmaFrag": "Juan.Fragment",
                "useBuiltIns": false,
                "throwIfNamespace": true
              }
            ]
          ]
        }
      },
      {
        test: [/\.scss$/,/\.css$/],
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: "Demystifying",
      inject: true,
      template: "./public/index.html",
    })
  ],
  stats: {
    colors: true
  },
  watch: true,
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    inline: true,
    publicPath: '/'
  }
}
