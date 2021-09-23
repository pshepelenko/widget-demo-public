// By default, this plugin will remove all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild.
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// It will search for CSS assets during the Webpack build and will optimize \ minimize the CSS (by default it uses cssnano but a custom CSS processor can be specified).
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// UglifyJS is a JavaScript parser, minifier, compressor and beautifier toolkit.
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    // filename: '[name].[hash].js',
    filename: '[name].js'
  },

  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin(), new UglifyJsPlugin()]
    // splitChunks: {
    //   chunks: 'async',
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   automaticNameDelimiter: '~',
    //   name: false,
    //   cacheGroups: {
    //     // Make a “vendor bundle.” A vendor bundle contains all the frameworks and libraries each application feature depends on.
    //     // By building all this code into a single bundle, the client can effectively cache the bundle, and you only need to rebuild the bundle when a framework or library updates.
    //     vendors: {
    //       chunks: 'initial',
    //       name: 'vendor',
    //       test: 'vendor',
    //       enforce: true
    //     },
    //     styles: {
    //       name: 'styles',
    //       test: /\.css$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   }
    // }
  }
}
