/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      grey: {
        darkest: 'var(--grey-darkest)',
        dark: 'var(--grey-dark)',
        DEFAULT: 'var(--grey-lightest)',
        light: 'var(--grey-light)',
        lightest: 'var(--grey-lightest)',
      },
      fareastern: {
        light: 'var(--fareastern-light)',
        DEFAULT: 'var(--fareastern)',
        dark: 'var(--fareastern-dark)',
        contrast: 'var(--fareastern-contrast)',
      },
      eastern: {
        light: 'var(--eastern-light)',
        DEFAULT: 'var(--eastern)',
        dark: 'var(--eastern-dark)',
        contrast: 'var(--eastern-contrast)',
      },
      central: {
        light: 'var(--central-light)',
        DEFAULT: 'var(--central)',
        dark: 'var(--central-dark)',
        contrast: 'var(--central-contrast)',
      },
      southern: {
        light: 'var(--southern-light)',
        DEFAULT: 'var(--southern)',
        dark: 'var(--southern-dark)',
        contrast: 'var(--southern-contrast)',
      },
      northern: {
        light: 'var(--northern-light)',
        DEFAULT: 'var(--northern)',
        dark: 'var(--northern-dark)',
        contrast: 'var(--northern-contrast)',
      },
      northwestern: {
        light: 'var(--northwestern-light)',
        DEFAULT: 'var(--northwestern)',
        dark: 'var(--northwestern-dark)',
        contrast: 'var(--northwestern-contrast)',
      },
      western: {
        light: 'var(--western-light)',
        DEFAULT: 'var(--western)',
        dark: 'var(--western-dark)',
        contrast: 'var(--western-contrast)',
      },
      error: 'red',
      success: 'green',
      // text colors
      color: {
        body: '#222222',
      },
    },
    // colors: {
    //   white: {
    //     default: '#ffffff',
    //   },
    //   lightlightgrey: {
    //     default: '#fafafa',
    //   },
    //   lightgrey: {
    //     default: '#eeeeee',
    //   },
    //   midgrey: {
    //     default: '#666',
    //   },
    //   grey: {
    //     default: '#cccccc',
    //   },
    //   darkgrey: {
    //     DEFAULT: '#222222',
    //   },
    //   darkdarkgrey: {
    //     default: '#111111',
    //   },
    //   black: {
    //     default: '#000000',
    //   },
    //   fareastern: {
    //     default: '#DA0808',
    //   },
    //   eastern: {
    //     default: '#82C606',
    //   },
    //   central: {
    //     default: '#0888DC',
    //   },
    //   southern: {
    //     default: '#F56C0A',
    //   },
    //   northern: {
    //     default: '#9D2C19',
    //   },
    //   northwestern: {
    //     default: '#F5D201',
    //   },
    //   western: {
    //     default: '#099D0D',
    //   },
    //   primary: {
    //     default: '#099D0D',
    //   },
    //   error: 'red',
    //   success: 'green',
    //   // text colors
    //   color: {
    //     body: '#222222',
    //   },
    // },
    screens: {
      xsm: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      fontFamily: {
        display: ['"Bakbak One"', ...defaultTheme.fontFamily.sans],
        sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        left: '-5px 0 5px rgba(0, 0, 0, 0.3)',
      },
      zIndex: {
        1: 1,
        9999: 9999,
      },
      translate: {
        105: '105%',
      },
      gridTemplateColumns: {
        12: 'repeat(12, minmax(0, 1fr))',
        min15rem: 'repeat(auto-fill, minmax(min(15rem, 100%), 1fr))',
      },
      height: {
        80: '20rem',
        '30rem': '30rem',
      },
      dropShadow: ['hover', 'focus'],
      inset: {
        4: '1rem',
        8: '2rem',
        '1/2': '50%',
      },
      minWidth: {
        '5rem': '5rem',
        '10rem': '10rem',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      maxWidth: {
        '20rem': '20rem',
      },
      fill: (theme) => theme('colors'),
    },
  },
  variants: {
    opacity: ['disabled'],
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
    options: {
      whitelistPatterns: [
        /-eastern$/,
        /-northern$/,
        /-northwestern$/,
        /-southern$/,
        /-western$/,
        /-fareastern$/,
        /-central$/,
      ],
    },
  },
}
