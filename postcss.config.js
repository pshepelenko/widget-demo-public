module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    //The plugin below will prepend all selectors created (css style) to add the 2 ids below.
    //This will ensure that any style generated during the build will not impact the host website
    require('postcss-prepend-selector')({ selector: '#splashup-root #splashup-discovery-module ' })
  ]
}
