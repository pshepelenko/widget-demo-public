# Discovery module (DM)
---

## Architecture

`Webpack`: main bundler, uses `TypeScript` and `Babel` to transpile our code to vanilla javascript. It also uses `postcss-loader` as a post CSS processor to run `tailwind` (our CSS utility) that will generate CSS file based on the classes used in our JS code.

## Development

To start the app in dev mode => `yarn start`.

Webpack will build 2 things:
1. It generates a index.html based on the one in `hostWebsite/index.htm` which embeds the `see similar` button and the DM loader. 
2. It will generate 2 files for the DM:
  - index.js (based on `src/index.tsx entry point)
  - index.css (based on `src/index.css entry point)

Those 2 files will not be added automatically to index.html (like in classic app using Webpack as a bundler). Because we want to simulate what will happen in prod on a client website, we are using the loader script to load those 2 files to the `index.html`. This will allow us to simulate a live environment even while developing.

## Deployment to S3

IMPORTANT: For the moment, any push to Github will trigger a a github action (see deploy.yml) to automatically deploy the app to the `S3 GoHock folder`. 

If we want to build another DM for another client, we need to:
- Create another branch called `<new-client-name>`
- Customise the branch:
  1. Update logo
  2. Update style
  3. Update api key
- Create a folder `<new-client-name>` in S3 
- Update the `deploy.yml` file to create another deployment to that folder if a push is made on that branch

## Authentication and multi-tenancy

### One branch per client

As stated above, since we are expecting more than 1 client, and that each client will have some level of customisation, we have created a S3 bucket that contains 1 folder per client currently using the DM:

- S3 bucket `splashup-discovery-module`:
  - /gohock
  - /splashup
  - /...


### AWS architecture

To determinate which client is making the request, we pass an api key in the query string of the URL:

=> e.g. `https://discovery.splashup.co/index.js?apiKey=38d89d-cdsc7908c-cds8c0-cd9`

Once this URL hits our AWS infrastructure, `CloudFront` will forward the request to a `Lambda` function which will then verify the apiKey against a set of locally hardcoded keys and forward the request to the right S3 folder (if authentication is successful).

Note1: to allow a `lamdba@edge` function to have access to the `query string parameters`:
- Go to the cloudfront distribution
- Edit the default behavior
- Select "All" for `Cache key and origin requests` => `Legacy cache settings` => `Query strings`

Note2: to see the `lamdba@edge` logs:
- Go to `CloudFront` => `Monitoring` => `LambdaEdge` 
- Choose your lambda and click `View metrics`
- Then at the top right corner click on `View function logs` and select `Sydney zone`

## Deploying discovery module on client website

### Adding "See similar" button 

In order for the users (shoppers) to trigger the SplashUp Discovery Module (DM), our clients need to add a "See Similar" button to their website:
- Add a button (`alternativeButton.html`) to each product image (top right or top left,...). 
- Each button has an attribute `data-product-id`. The client will have to make sure that the corresponding product id is provided for this attribute (it will later help the DM to know what product the user has just clicked).
- Finally, there is a css file for the button to also add to their codebase (see `alternativeButtonStyle.html`).

Note: if host website is built with React use `Ref` instead of `this` to access the button element that triggers the event `onClick={() => refBtn.current.dispatchEvent(new Event('su-open-discovery-module', { bubbles: false }))}`


### Adding our discovery module

Simply paste the snippet from `discoveryModuleLoader.html` just before the closing tag of your </body>. This will load the javascript and the style for the discovery module.

# General Knowledge
---

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

- We will create a div element with an id `<div id="splashup-root">` at the end of the <body> element. This element will be unique and will be used as a parent element for the discovery module.

### Adding style

3 technics to style HTML

- Inline CSS: do not interfere with other style on the publisher website. Hard to maintain for a medium to large application.
- Loading a CSS file: 1 extra http call. Have to write a piece of code to know when the css is fully loaded otherwise the user could see a FOUC (Flash Of Unstyled Content).
- Embedding CSS into JS: no extra call. CSS will be loaded before JS runs (no FOUC). Need to write a special func that converts CSS into string and add it in a variable into a JS file.

### Avoiding conflict with the publisher website style

Best technique is to:

- Namespacing your stylesheet by prefixing your classes with "su":
```
  <h3 class="su-product">Nikon E90 Digital SLR</h3>
  <img src="http://camerastork.com/img/products/1337-small.png"/>
```
* See `Room for improvement` section

- Over specifying your style using 2 ids:
```
  <div id="su-root">
      <div id="su-discovery-module">
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

## Adding custom event to splashup button

At the moment the discovery module listen to all click event and look for an attribute "data-product-id" to know if it need to get triggered or not. We could look at implementing a custom event instead that the discovery module could subscribe to as listening to all click event seems not a elegant solution.