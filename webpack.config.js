var path = require('path')
var webpack = require('webpack')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    preLoaders: [
      {
        test: /.vue$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  // vue: {
  //   loaders: {
  //     css: ExtractTextPlugin.extract('css'),
  //     sass: ExtractTextPlugin.extract('css!sass-loader')
  //   }
  // },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  // plugins: [
  //   new ExtractTextPlugin('style.css', {
  //     allChunks: true
  //   })
  // ],
  devtool: '#eval-source-map'
}

// if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = '#source-map'
//   // http://vuejs.github.io/vue-loader/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.optimize.OccurenceOrderPlugin()
//   ])
// }
