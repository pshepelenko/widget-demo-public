// Tool to allow webpack to re-open the application on the existing tab (instead of opening a new one all the time)
const openBrowser = require('react-dev-utils/openBrowser')

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    onListening: () => {
      openBrowser('http://localhost:8080')
    },
    hot: false, //Otherwise the new style won't be applied
    allowedHosts: 'all' //Allow any application to access the discovery module
  }
}
