# Discovery module (DM)
---

## Architecture

`Webpack`: main bundler, uses `TypeScript` and `Babel` to transpile our code to vanilla javascript. It also uses `postcss-loader` as a post CSS processor to run `Tailwind` (our CSS utility) that will generate CSS file based on the classes used in our JS code.

## Development

To start the app in dev mode => `yarn start`.

Webpack will build 2 things:
1. It generates a index.html based on the one in `./src/hostWebsite/index.html` which embeds the `see similar` button and the DM loader. 
2. It will generate 2 files for the DM:
  - index.js (from `src/index.tsx entry point)
  - index.css (from `src/index.css entry point)

Those 2 files will not be added automatically to index.html (like in classic app using Webpack as a bundler). Because we want to simulate what will happen in prod on a client website, we are using the loader script to load those 2 files to the `index.html`. This will allow us to simulate a live environment even while developing.

## Deployment to S3

IMPORTANT: At the moment, any commit and push to the master branch in Github will trigger a github action (see `./src/deploy.yml`) to automatically deploy the app to the `S3` (GoHock folder). This means that the current live discovery module deployed on `GoHock` will be updated.

If we want to build another DM for another client, we need to:
- Create a branch called `gohock`
- Update the `deploy.yml` file to deploy the app on the `gohock` S3 folder anytime a push is made to the `gohock` branch.
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

```
'use strict';
const querystring = require('querystring');
const gohockApiKey = '31805389-c240-4d42-8ff9-2cc30f753212'
exports.handler = (event, context, callback) => {
 const request = event.Records[0].cf.request;

 /**
  * Reads query string to check if S3 origin should be used, and
  * if true, sets S3 origin properties.
  */
 console.log('request', request)
 const params = querystring.parse(request.querystring);

 if (params['apiKey'] && params['apiKey'] === gohockApiKey) {
  const s3DomainName = 'splashup-discovery-module.s3.amazonaws.com';

  /* Set S3 origin fields */
  request.origin = {
   s3: {
    domainName: s3DomainName,
    region: 'ap-southeast-2',
    authMethod: 'none',
    path: '/gohock',
    customHeaders: {}
   }
  };
  request.headers['host'] = [{ key: 'host', value: s3DomainName }];
 }
 callback(null, request);
};
```

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
- Add a button (`./src/hostWebsite/alternativeButton.html`) to each product image (top right or top left,...). 
- Each button has an attribute `data-product-id`. The client will have to make sure that the corresponding product id is provided for this attribute (it will later help the DM to know what product the user has just clicked).
- Finally, there is a css file for the button to also add to their codebase (see `./src/hostWebsite/alternativeButtonStyle.html`).

Note: if host website is built with React use `Ref` instead of `this` to access the button element that triggers the event `onClick={() => refBtn.current.dispatchEvent(new Event('su-open-discovery-module', { bubbles: false }))}`


### Adding our discovery module

Simply paste the snippet from `./src/hostWebsite/discoveryModuleLoader.html` just before the closing tag of your </body>. This will load the javascript and the style for the discovery module.

# General Knowledge
---

see [3rd Party JavaScript Documentation](https://www.notion.so/thealternative/DRAFT-3rd-Party-JavaScript-Best-Practices-a11ae2fc5ecb4ef59d9d8b945e558076)

# Considerations

## GZIP compression

At the moment the we only use Uglify plugin during production build time to minify our files.

## Class prefixing

Experimentation: we try to use the webpack loader [tailwind-classname-prefix-loader](https://github.com/frankleng/tailwind-classname-prefix-loader) to automatically add the prefix to the classnames within our JSX elements. It turns out the library is buggy (prefix unwanted classes and missing Tailwind classes). Therefore we'll not use this strategy until we find a proper way of updating those classnames.
