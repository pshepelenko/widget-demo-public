const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,html}'], //Tailwind will look into those files and remove the any css properties that are not being seen in those files' classes (tree shaking).
  mode: 'jit',
  darkMode: false,
  //Here we are over specifying the classes of tailwind to make sure:
  //1. they won't affect any other element of the host website.
  //2. If the host website uses tailwind classes, our classes won't be overwritten by the host website classes.
  important: '#splashup-root #splashup-discovery-module',
  theme: {
    extend: {
      colors: {
        // Splashup style guide
        // primary: '#2D14F4', splashup

        // purple: {
        //   DEFAULT: '#7048E8', // secondary
        //   lightest: '#F6F4FF'
        // },

        //GoHock styleguide
        secondary: {
          DEFAULT: '#5cceff', // secondary
          lightest: '#F6F4FF'
        },

        pink: {
          DEFAULT: '#F784AD'
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
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
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
  plugins: [require('@tailwindcss/typography')]
}
