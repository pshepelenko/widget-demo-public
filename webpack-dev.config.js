const path = require('path')
// Tool to allow webpack to re-open the application on the existing tab (instead of opening a new one all the time)
const openBrowser = require('react-dev-utils/openBrowser')
// Allow webpack to add the script and link to stylesheet in the head of our HTML (in dev mode). We don't need this script in production since we don't use any HTML file.
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    //In development, we need a base html file (representing the host website) to attach the discovery module to.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public', 'index.html'),
      fileName: './index.html',
      inject: true
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    onListening: () => {
      openBrowser('http://localhost:8080')
    },
    hot: false, //Otherwise the new style won't be applied
    allowedHosts: 'all' //Allow any application to access the discovery module
  }
}
