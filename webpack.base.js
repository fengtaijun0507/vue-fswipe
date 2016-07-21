var path = require('path')
var webpack = require('webpack')

module.exports = {
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: /src/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: /src/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
        include: /src/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: /src/
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.json$/,
        loader: 'json'
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
  vue: {
    preloaders: {
      js: 'eslint',
      css: 'autoprefixer!less'
    },
    loaders: {
      js: 'babel'
    },
    autoprefixer: {
      browsers: ['last 40 versions']
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = ''
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
