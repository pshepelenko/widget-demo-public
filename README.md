# Discovery module
---
## Server Configuration

In order to simulate `cross domain` communication we have created a custom host in our local host file (/etc/hosts) named <Vloggi-MacBook-Jeremy.local>. We can now simulate the loading of the discovery module from a different domain (<Vloggi-MacBook-Jeremy.local>) than the publisher website (<localhost>).

## Distributing and loading your application

### 3 ways to load a script tag:

- Blocking (`<script src="http:..."`>): will stop rendering the page until the script is loaded and executed. Not something we want to on a client's website.
- Non-BLocking: these methods will not interfere with the rendering of page and will process the loading and execution of the script in parallel of rendering the client's website page. These are considered best practices cause obviously we don't want to decrease the client's website performance which will have negative effects on UX and SEO.
  - Defer (`<script defer src="http:..."`>): will load the script but wait until the page is fully loaded execute it.
  - Async (`<script async src="http:..."`>): will load the script and execute it straight away.

However, `async` and `defer` only work on modern browsers so we might encounter some really undesirable behavior on old internet explorer version or on Opera (that do not support `defer`)

As a result, it is preferable to write our own `Dynamic insertion script` that can simulate the `async` behavior along with ensuring full compatibility with all browsers.

e.g:

```
<script>
(function () {
     var script = document.createElement('script')
     script.src = "https://discovery.splashup.co/index.js"
     script.async = true
     var entry = document.getByTagName('script')[0]
     entry.parentNode.insertBefore(script, entry)
}());
</script>
```

But where to insert it?

At the end of the <body> element seems quite a safe place but it could (very rarely though) create some exceptions with some browsers. The safest place to attached this script to is to the first script found in the HTML (there is at least one => the snippet we are providing our client with).

### Application Namespacing

Adding a namespace to your application is really important since we don't want to interfere with Global variables.

### A note on caching files

Using a fragment (#) instead of query string to pass an argument on a script url (e.g. product id) is a great way to ensure proper caching (as opposed to a query string which will make the url different for each product id). A fragment is never sent to the server and so the browser thinks it's the same url...and cache it.

## Rendering HTML & CSS

### Outputting the HTML

To output HTML into publisher website:

- We will create a div element with an id ```<div id="splashup-root-div">``` at the end of the <body> element. This element will be unique and will be used as a parent element for the discovery module.

### Adding style

3 technics to style HTML

- Inline CSS: do not interfere with other style on the publisher website. Hard to maintain for a medium to large application.
- Loading a CSS file: 1 extra http call. Have to write a piece of code to know when the css is fully loaded otherwise the user could see a FOUC (Flash Of Unstyled Content).
- Embedding CSS into JS: no extra call. CSS will be loaded before JS runs (no FOUC). Need to write a special func that converts CSS into string and add it in a variable into a JS file.

For now we'll go with option 2.

### Avoiding conflict with the publisher website style

Best technique is to:

- Namespacing your stylesheet by prefixing your classes with "splashup":
```
  <h3 class="splashup-product">Nikon E90 Digital SLR</h3>
  <img src="http://camerastork.com/img/products/1337-small.png"/>
```
* See `Room for improvement` section

- Over specifying your style using 2 ids:
```
  <div id="splashup-root">
      <div id="splashup-discovery-module">
         ...discovery module
      </div>
  </div>”
```

* This is in case the publisher website is also using ID in his styling sheet to style element. Using 2 ids will prevent any unwanted style to overwrite our style. Also over specifying our CSS selectors allow us to make sure our style will not overwrite any part of the host website.

### Inheriting style

It is possible to inherit publisher style by running a JS script to extract node style (anchor, paragraph, etc...).

For now we will hard code the publisher style updating the Tailwind theme.

# 4 CORS Communication

AJAX requests between the publisher website and SplashUp need to be compliant with Cross Origin Resource Sharing policy.

This means that our server (where the discovery module is hosted) needs to return a header `Access-Control-Allow-Origin: <publisher-domain-name> or *`.

If AJAX call is not a GET POST or HEAD or we are sending custom Headers, a preflight request will be sent to the server and the server needs to return extra headers:

`Access-Control-Allow-Origin—`The allowed origin (must match the Origin header from the request)
`Access-Control-Allow-Methods` A comma-separated list of allowed methods
`Access-Control-Allow-Headers` A comma-separated list of allowed headers
`Access-Control-Max-Age` The amount of time (in seconds) that this preflight request should be cached for
`Access-Control-Allow-Credentials` Indicates whether the requested resource supports dentialed requests (optional)

# Authentication

# Optimization

## Compression

See `Room for improvement` section

## Minification

Webpack uses UglifyJS to minify the js and css files. It removes white spaces and shorten the variables and function names.

## Tree shaking

Tree shaking of css is done by Tailwind.

# Room for improvement

## GZIP compression

At the moment the we only use Uglify plugin during production build time to minify our files.

## Class prefixing

Experimentation: we try to use the webpack loader [tailwind-classname-prefix-loader](https://github.com/frankleng/tailwind-classname-prefix-loader) to automatically add the prefix to the classnames within our JSX elements. It turns out the library is buggy (prefix unwanted classes and missing Tailwind classes). Therefore we'll not use this strategy until we find a proper way of updating those classnames.