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
      padding: '2rem',
    },
    colors: {
      white: {
        default: '#ffffff',
      },
      lightgrey: {
        default: '#eeeeee',
      },
      grey: {
        default: '#cccccc',
      },
      darkgrey: {
        default: '#333333',
      },
      black: '#000000',
      fareastern: {
        default: '#DA0808',
      },
      eastern: {
        default: '#82C606',
      },
      central: {
        default: '#0888DC',
      },
      southern: {
        default: '#F56C0A',
      },
      northern: {
        default: '#9D2C19',
      },
      northwestern: {
        default: '#F5D201',
      },
      western: {
        default: '#099D0D',
      },
      error: 'red',
      success: 'green',
    },
    screens: {
      xsm: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        left: '-5px 0 5px rgba(0, 0, 0, 0.3)',
      },
      zIndex: {
        '1': 1,
        '9999': 9999,
      },
      translate: {
        '105': '105%',
      },
      gridTemplateColumns: {
        // Complex site-specific column configuration
        '12': 'repeat(12, minmax(0, 1fr))',
        'hills-list': 'auto-fill, minmax(260px, 1fr) auto-fill, 2fr',
      },
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
