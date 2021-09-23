// This script is to be copy at the end of the body (just before the closing tag </body>, see ReadMe)
// TODO: find a way to only load the JS script and not the index.css (which should be loaded by the JS script)

(function () {
  // var DOMAIN_URL = 'http://localhost:3001'
  // var DOMAIN_URL = '${DOMAIN_URL}'
  // Load index.css
  var link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'http://vloggi-macbook-jeremy.local:1234/index.css'
  var head = document.getElementsByTagName('head')[0]
  head.parentNode.insertBefore(link, head)

  // Load index.js
  var script = document.createElement('script')
  script.src = 'http://vloggi-macbook-jeremy.local:1234/index.js'
  script.async = true
  var entryScript = document.getElementsByTagName('script')[0]
  entryScript.parentNode.insertBefore(script, entryScript)
})()
