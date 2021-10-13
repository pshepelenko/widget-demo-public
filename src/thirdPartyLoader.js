// This script is to be copy at the end of the body (just before the closing tag </body>, see ReadMe)
// TODO: find a way to only load the JS script and not the index.css (which should be loaded by the JS script)

;(function(document, url, apiKey) {
  // Load index.css
  var link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `${url}/index.js?apiKey=${apiKey}`
  var head = document.getElementsByTagName('head')[0]
  head.parentNode.insertBefore(link, head)

  // Load index.js
  var script = document.createElement('script')
  script.src = `${url}/index.css?apiKey=${apiKey}`
  script.async = true
  var entryScript = document.getElementsByTagName('script')[0]
  entryScript.parentNode.insertBefore(script, entryScript)
})(document, 'https://discovery.spashup.co/', '31805389-c240-4d42-8ff9-2cc30f753212')
