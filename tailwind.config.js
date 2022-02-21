const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,html}'], // Tailwind will look into those files and remove the any css properties that are not being seen in those files' classes (tree shaking).
  mode: 'jit',
  darkMode: false,
  // Here we are over specifying the classes of tailwind to make sure:
  // Because the option below does not prepend the "Preflight" style (normalize) we will use 'postcss-prepend-selector'  => https://github.com/tailwindlabs/tailwindcss/discussions/2682
  // in order to achieve the same result (see postcss.config.js)
  // important: '#splashup-root #splashup-discovery-module',
  theme: {
    extend: {
      colors: {
        // Splashup style guide
        // primary: '#2D14F4', splashup

        // purple: {
        //   DEFAULT: '#7048E8', // secondary
        //   lightest: '#F6F4FF'
        // },

        // GoHock style guide
        secondary: {
          DEFAULT: '#5E1CCF', // secondary
          lightest: '#F6F4FF'
        },

        pink: {
          DEFAULT: '#E2DAEF'
        },
        black: {
          DEFAULT: '#212429'
        },
        gray: {
          darkest: '#212429',
          dark: '#495057',
          DEFAULT: '#ACB5BD',
          light: '#DDE2E5',
          lightest: '#F8F9FA'
        }
      },
      // sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      fontFamily: {},
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '4rem' // not working so far, need to fix
            }
          }
        }
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  },
  // prefix: 'sudm-', // Prefix all the class with 'sudm-' (SplashUp Discovery Module). This will make sure none of our class will interfere with the host website.
  variants: {
    extend: {}
  },
  corePlugins: {
    preflight: true // enable reset/normalize style to be added at build time
  },
  plugins: [require('@tailwindcss/typography')]
}
